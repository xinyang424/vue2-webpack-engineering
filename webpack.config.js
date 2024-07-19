const { Configuration } = require("webpack");
/**
 * @type {Configuration}
 */

const path = require("path");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); //每次打包清空dist
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isProd = process.env.NODE_ENV === "production";

const webpackConfig = {
  mode: "production",
  entry: "./src/main.js",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    extensions: [".vue", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.(s[ac]ss|css)$/,
        use: [isProd ? MiniCssExtractPlugin.loader : "style-loader", "css-loader", "sass-loader"],
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
    client: {
      logging: "error",
      reconnect: 10,
      progress: false,
      overlay: {
        errors: true,
      },
    },
    open: false,
    port: 8080,
  },
  // devtool: isProd ? false : "source-map",
  plugins: [
    new htmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new ProgressBarPlugin(),
  ],
};

module.exports = webpackConfig;
