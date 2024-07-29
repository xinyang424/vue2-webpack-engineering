const HtmlWebpackPlugin = require("html-webpack-plugin"); // 引入html-webpack-plugin插件，使得我们运行时打开的页面是index.html
const VueLoaderPlugin = require("vue-loader/lib/plugin"); // 引入 vue-loader 插件，使得我们可以使用vue单文件组件
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const LifecycleLoggerPlugin = require("./utils/lifecycle-logger-plugin");
const path = require("path"); // 引入path模块
const isProd = process.env.NODE_ENV === "production";
const webpackConfig = {
  mode: process.env.NODE_ENV, //动态配置为开发模式还是生产模式
  entry: "./src/test/index.js", // 配置入口文件
  output: {
    //output 的配置 在mode 为development模式下并不会起作用，而是需要在production模式下才会起作用
    path: path.resolve(__dirname, "dist"), //配置文件输出目录
    filename: "js/[name].[chunkhash:8].js",
    chunkFilename: "js/[name].[chunkhash:8].js", //分割的代码输出文件和文件名格式
  },
  module: {
    rules: [
      // 处理 SFC 文件
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      //   处理css文件
      {
        test: /\.(s[ac]ss|css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"],
      },
      // 使用自己的 loader 处理 js 文件
      // {
      //   test: /\.js$/,
      //   use: path.resolve(process.cwd(), "./utils/my-loader.js"), // 使用自定义 Loader
      //   exclude: /node_modules/,
      // },
      // 使用 babel 对 js 文件进行降级处理
      {
        test: /\.js$/,
        loader: "babel-loader",
        // exclude: /node_modules/, // 按需要看是否对node_modules里的js文件也进行降级处理
      },
      // 处理字体文件
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name].[contenthash:8][ext]",
        },
      },
      //  处理媒体文件，将小于指定大小的文件，以base64编码嵌入代码中，对于大于指定大小的文件，打包为静态资源文件
      {
        test: /\.(png|jpe?g|gif|webp|mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
        type: isProd ? "asset" : "asset/resource",
        parser: isProd
          ? {
              dataUrlCondition: {
                maxSize: 30000, // 超过 30kb 的图片不转base64
              },
            }
          : undefined,
        generator: {
          filename: "img/[name].[contenthash:8][ext]",
        },
      },
    ],
  },
  devServer: {
    hot: true, //配置开发热更新
    port: 8080, // 配置启动的端口号
    open: true, // 配置启动完成自动打开，若不想打开也可以设为false或不设置，其默认为false
  },
  optimization: {
    // minimize: true,
    minimizer: [
      // new TerserPlugin({
      //   terserOptions: {
      //     output: {
      //       comments: false,
      //     },
      //     compress: {
      //       drop_console: true,
      //       pure_funcs: ["console.log"],
      //     },
      //   },
      // }),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            // Lossless optimization with custom option
            // Feel free to experiment with options for better result for you
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              // Svgo configuration here https://github.com/svg/svgo#configuration
              [
                "svgo",
                {
                  plugins: [
                    {
                      name: "preset-default",
                      params: {
                        overrides: {
                          removeViewBox: false,
                          addAttributesToSVGElement: {
                            params: {
                              attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              ],
            ],
          },
        },
      }),
    ],
    splitChunks: {
      minSize: 30000, // 对需要大于30KB的文件进行分割
      maxSize: 0, // 对需要小于0的文件进行分割
      minChunks: 1, // 最小分块数量，也就是大于前面指定的文件大小，并且被引用的次数大于或等于1的文件才会被分割
      maxAsyncRequests: 5, // 最大异步请求数为5
      maxInitialRequests: 3, // 最大初始化页面请求数为3
      automaticNameDelimiter: "~", // 若为异步，则用 ~ 进行文件名拼接
      name: (module, chunks, cacheGroupKey) => {
        const allChunksNames = chunks.map(chunk => chunk.name).join("~");
        return `${cacheGroupKey}~${allChunksNames}`;
      },
      cacheGroups: {
        // 只对 css 文件进行分割
        styles: {
          name: "styles",
          test: /\.css$/,
          chunks: "all",
          enforce: true,
        },
        // 只对 js 文件进行分割
        scripts: {
          name: "scripts",
          test: /\.js$/,
          chunks: "all",
          enforce: true,
        },
      },
    },
  },
  // devtool: "source-map",
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      // html 模板路径
      template: "./public/index.html",
    }),
    // 阻止打包生成 xxx.LICENSE.txt
    new TerserPlugin({
      extractComments: false,
    }),
    // 打包时候自动清空 dist 文件夹下的内容（尽在生产环境下起作用）
    isProd ? new CleanWebpackPlugin() : undefined,
    // 拆分 css 样式并生成文件
    new MiniCssExtractPlugin({
      filename: "css/[name].[contenthash:8].css",
      chunkFilename: "css/[name].[contenthash:8].css", //分割的代码输出文件和文件名格式
    }),
    // 配置支持 gzip
    isProd
      ? new CompressionPlugin({
          filename: "[path][base].gz", //生成的压缩文件的名称模式。
          algorithm: "gzip", //使用的压缩算法，这里使用的是 gzip。
          test: /\.(js|css|html|svg)$/, //匹配要压缩的文件的正则表达式。
          threshold: 8192, //只有大小超过该值的文件才会被压缩，单位为字节。
          minRatio: 0.8, //只有压缩率小于这个值的文件才会被压缩。
          deleteOriginalAssets: true, // 是否删除源文件
        })
      : undefined,
    // 使用自己定义的 plugins
    new LifecycleLoggerPlugin(),
  ],
};

module.exports = webpackConfig;
