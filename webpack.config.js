const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");

const environments = require("./environments");

const MODE = {
  DEV: "development",
  PROD: "production",
};

module.exports = ({ mode, server } = { mode: MODE.DEV, server: "local" }) => ({
  mode,
  devServer: {
    host: "0.0.0.0",
    port: "3000",
    proxy: {
      "/api": { target: environments[server], secure: false },
      "**": {
        bypass(req) {
          if (req.headers.accept.includes("html")) {
            return "/index.html";
          }
        },
      },
    },
    hot: true,
    overlay: true,
    https: server !== "local",
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    historyApiFallback: true,
  },
  resolve: { extensions: [".js", ".jsx", ".ts", ".tsx", ".css", ".scss"] },
  entry: {
    polyfill: ["core-js/stable", "regenerator-runtime/runtime"],
    application: "./index.tsx",
  },
  module: {
    rules: [
      {
        loader: "babel-loader",
        exclude: /node_modules/,
        test: /\.(tsx|ts)?$/,
      },
      {
        test: /\.(scss|css)?$/,
        use: [
          "style-loader",
          { loader: MiniCssExtractPlugin.loader, options: { hmr: mode === MODE.DEV } },
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
  output: {
    path: path.join(__dirname, "./build/"),
    filename: "js/[name].[hash].js",
    publicPath: "/",
  },
  plugins: [
    new CleanWebpackPlugin({ verbose: true }),
    new HTMLWebpackPlugin({
      title: "Shopping Cart",
      filename: "index.html",
      template: "public/index.html",
      favicon: "public/favicon.ico",
      chunks: ["polyfill", "application"],
      hash: true,
      xhtml: true,
      inject: true,
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[id].css",
    }),
  ],
});
