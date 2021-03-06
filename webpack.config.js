const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const DEV_MODE = process.env.NODE_ENV === "development";
const SRC_DIR = path.resolve(__dirname, "src");
const BUILD_DIR = path.resolve(__dirname, "build");

const types = ["billboard", "leaderboard", "mpu", "skyscraper", "half-page"];

const templates = types.map((type) => {
  return new HtmlWebpackPlugin({
    template: path.join(SRC_DIR, "index.ejs"),
    inject: true,
    filename: `${type}.html`,
    templateParameters: {
      type,
      mode: process.env.NODE_ENV,
    },
    minify: {
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true,
    },
  });
});

const config = {
  mode: DEV_MODE ? "development" : "production",
  target: DEV_MODE ? "web" : "browserslist",
  stats: "minimal",
  entry: [path.join(SRC_DIR, "main.js"), path.join(SRC_DIR, "main.css")],
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
        test: /\.(png|jpg|jpeg|gif|svg|pdf)$/i,
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
  plugins: [...templates, new MiniCssExtractPlugin({ filename: "[name].css" })],
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
