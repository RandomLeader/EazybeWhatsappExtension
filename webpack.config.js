const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// import css from "file.css";
module.exports = {
  mode: "development",
  // mode: "production",
  // devServer: {
  //   contentBase: path.resolve(__dirname, "./src"),
  //   historyApiFallback: true,
  // },
  devServer: {
    static: "./src",
  },
  entry: {
    store: path.resolve(__dirname, "./src/inject_store.js"),
  
    options: path.resolve(__dirname, "./src/index-options.js"),
    foreground: path.resolve(__dirname, "./src/index-foreground.js"),

    background: path.resolve(__dirname, "./src/background.js"),
    injecter: path.resolve(__dirname, "./src/inject_script.js"),
    
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                {
                  plugins: ["@babel/plugin-proposal-class-properties"],
                },
              ],
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test:/\.css$/,
        use:['style-loader','css-loader']
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "popup.html",
      template: "src/popup.html",
      chunks: ["popup"],
    }),
    new HtmlWebpackPlugin({
      filename: "options.html",
      template: "src/options.html",
      chunks: ["options"],
    }),
    new HtmlWebpackPlugin({
      filename: "foreground.html",
      template: "src/foreground.html",
      chunks: ["foreground"],
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/manifest.json", to: "[name][ext]" },
        // { from: "src/background.js", to: "[name][ext]" },
        { from: "src/inject_script.js", to: "[name][ext]" },
        { from: "src/inject_store.js", to: "[name][ext]" },
          // { from: "assets/js/wapi.js", to: "[name][ext]" },
        { from: "assets/", to: "assets/" },
        { from: "src/*.png", to: "[name][ext]" },
      ],
    }),
    new CleanWebpackPlugin(),
  ],
};
