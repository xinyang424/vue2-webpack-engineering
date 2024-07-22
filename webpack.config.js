const { Configuration } = require("webpack");
/**
 * @type {Configuration}
 */

const path = require("path");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const isProd = process.env.NODE_ENV === "production";

const webpackConfig = {
  watchOptions: {
    ignored: /node_modules/, //不监听的 node_modules 目录下的文件
  },
  mode: "production",
  entry: "./src/main.js",
  output: {
    publicPath: "/",
    path: path.resolve(process.cwd(), "dist"),
    filename: "js/[name].[hash:8].js",
    chunkFilename: "js/[name].[chunkhash:8].js",
  },
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "src"),
    },
    extensions: [".vue", ".js"],
    modules: ["node_modules"],
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: true, // 去除注释
          },
          compress: {
            drop_console: true,
            pure_funcs: ["console.debug"], // 保留 console.debug
          },
          mangle: {
            safari10: true, // 解决ie，safari10.1不支持ES6语句
          },
        },
      }),
    ],
    splitChunks: {
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: "~",
      name: (module, chunks, cacheGroupKey) => {
        const allChunksNames = chunks.map(chunk => chunk.name).join("~");
        return `${cacheGroupKey}~${allChunksNames}`;
      },
      cacheGroups: {
        styles: {
          name: "styles",
          test: /\.css$/,
          chunks: "all",
          enforce: true,
        },
        scripts: {
          name: "scripts",
          test: /\.js$/,
          chunks: "all",
          enforce: true,
        },
      },
    },
  },
  module: {
    rules: [
      // 处理 SFC 文件
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      // 处理css文件
      {
        test: /\.(s[ac]ss|css)$/,
        use: [isProd ? MiniCssExtractPlugin.loader : "style-loader", "css-loader", "sass-loader"],
      },
      // 处理字体文件
      {
        test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name].[hash:8][ext]",
        },
      },
      // 处理媒体文件，将小于指定大小的文件，以base64编码嵌入代码中，对于大于指定大小的文件，打包为静态资源文件
      {
        test: /\.(png|jpe?g|gif|webp|mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
        type: isProd ? "asset" : "asset/resource",
        parser: isProd
          ? {
              dataUrlCondition: {
                maxSize: 30000, // 30kb
              },
            }
          : undefined,
        generator: {
          filename: "img/[name].[hash:8][ext]",
        },
      },
    ],
  },
  stats: "errors-only", //仅展示运行成功后的提示
  performance: {
    hints: "error",
    maxAssetSize: 3000000, // 整数类型（以字节为单位）3MB
    maxEntrypointSize: 5000000, // 整数类型，以字节为单位，5MB
    assetFilter: function (assetFilename) {
      // 只给出js文件的性能提示
      return assetFilename.endsWith(".js");
    },
  },
  devServer: {
    compress: true,
    hot: true,
    port: 8080,
    historyApiFallback: true,
  },
  devtool: isProd ? false : "source-map",
  plugins: [
    new VueLoaderPlugin(),
    new ProgressBarPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash:8].css",
      chunkFilename: "css/[name].[contenthash:8].css",
    }),
    // 阻止打包生成 xxx.LICENSE.txt
    new TerserPlugin({
      extractComments: false,
    }),
    isProd ? new CleanWebpackPlugin() : undefined,
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      // 注入环境变量
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
    // 配置支持 gzip
    new CompressionPlugin({
      filename: "[path][base].gz", //生成的压缩文件的名称模式。
      algorithm: "gzip", //使用的压缩算法，这里使用的是 gzip。
      test: /\.(js|css|html|svg)$/, //匹配要压缩的文件的正则表达式。
      threshold: 8192, //只有大小超过该值的文件才会被压缩，单位为字节。
      minRatio: 0.8, //只有压缩率小于这个值的文件才会被压缩。
    }),
  ],
};

module.exports = webpackConfig;
