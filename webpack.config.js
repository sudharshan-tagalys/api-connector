const path = require("path");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV,
  entry: "./src/index.ts",
  plugins: [new CompressionPlugin()],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    filename: "bundle.js",
    library: "Tagalys",
    path: path.resolve(__dirname, "dist/client"),
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 9002,
  },
};
