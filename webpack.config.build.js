const { Configuration } = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const path = require("path");
/**
 * @type {Configuration}
 */

const webpackConfig = {
  mode: "production",
  entry: "./packages/index.js",
  output: {
    clean: true,
    path: path.resolve(__dirname, "lib"),
    filename: "polestar-ui.common.js",
    chunkFilename: "[id].cjs",
    libraryExport: "default",
    library: "POLESTAR",
    libraryTarget: "commonjs2",
  },
  resolve: {
    extensions: [".js", ".vue"],
    modules: ["node_modules"],
  },
  performance: {
    hints: false,
  },
  stats: {
    children: false,
  },
  optimization: {
    minimize: false,
  },

  module: {
    rules: [
      // 处理 SFC 文件
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          compilerOptions: {
            preserveWhitespace: false,
          },
        },
      },
      //   处理css文件
      {
        test: /\.(s[ac]ss|css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      // 使用 babel 对 js 文件进行降级处理
      {
        test: /\.js$/,
        loader: "babel-loader",
      },
      // 处理字体文件
      //   {
      //     test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
      //     type: "asset/resource",
      //     generator: {
      //       filename: "fonts/[name].[contenthash:8][ext]",
      //     },
      //   },
      //  处理媒体文件，将小于指定大小的文件，以base64编码嵌入代码中，对于大于指定大小的文件，打包为静态资源文件
      //   {
      //     test: /\.(png|jpe?g|gif|webp|mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
      //     type: isProd ? "asset" : "asset/resource",
      //     parser: isProd
      //       ? {
      //           dataUrlCondition: {
      //             maxSize: 30000, // 超过 30kb 的图片不转base64
      //           },
      //         }
      //       : undefined,
      //     generator: {
      //       filename: "img/[name].[contenthash:8][ext]",
      //     },
      //   },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "styles/index.css",
      chunkFilename: "styles/[name].css", //分割的代码输出文件和文件名格式
    }),
    new ProgressBarPlugin(),
  ],
};

module.exports = webpackConfig;
