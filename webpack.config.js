const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const DEV_MODE = process.env.NODE_ENV === "development";
const SRC_DIR = path.resolve(__dirname, "src");
const BUILD_DIR = path.resolve(__dirname, "build");

const config = {
  mode: DEV_MODE ? "development" : "production",
  target: DEV_MODE ? "web" : "browserslist",
  stats: "minimal",
  entry: path.join(SRC_DIR, "styles.css"),
  devServer: {
    hot: true,
    devMiddleware: {
      writeToDisk: true,
    },
    static: {
      directory: BUILD_DIR,
      publicPath: "",
      watch: true,
    },
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "[name][ext]",
        },
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: DEV_MODE,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(SRC_DIR, "index.ejs"),
      inject: true,
      filename: "billboard.html",
      templateParameters: {
        type: "billboard",
      },
    }),
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
  ],
  output: {
    path: BUILD_DIR,
    clean: true,
    publicPath: "",
  },
};

module.exports = () => {
  if (!DEV_MODE) {
    //
  }
  return config;
};