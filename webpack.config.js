const path = require("path");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV,
  entry: "./src/index.ts",
  plugins: [new CompressionPlugin()],
  devServer: {
    static: {
      directory: path.join(__dirname, "public"),
    },
    compress: true,
    port: 9000,
  },
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
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
    },
    port: 9002,
  },
};
