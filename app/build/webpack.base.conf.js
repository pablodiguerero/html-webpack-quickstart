/**
 * General webpack congfiguration file
 * - Handling SASS/SCSS files
 * - Handling Pug files
 * - Handling static files
 */
const fs = require("fs");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const rootDir = path.join(__dirname, "..");
const paths = {
  src: path.join(rootDir, "src"),
  dist: path.join(rootDir, "dist"),
  public: path.join(rootDir, "src/public"),
  templates: path.join(rootDir, "src/templates"),
};

const pugFiles = fs
  .readdirSync(paths.templates)
  .filter((fileName) => fileName.endsWith(".pug"));

module.exports = {
  entry: ["./src/main.js", "./src/main.scss"],
  mode: "development",
  output: {
    path: paths.dist,
    publicPath: "/",
    filename: "[name].js",
    assetModuleFilename: "public/[name]-[hash][ext][query]",
  },
  devServer: {
    compress: true,
    port: 8000,
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  plugins: [
    ...pugFiles.map(
      (page) =>
        new HtmlWebpackPlugin({
          template: `${paths.templates}/${page}`,
          filename: `./${page.replace(/\.pug/, ".html")}`,
        })
    ),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|gif|png|svg|woff|eot|woff2|ttf|wav|mp3)$/,
        type: "asset/resource",
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: "html-loader",
          },
          {
            loader: "pug-html-loader",
            options: { pretty: true },
          },
        ],
      },
    ],
  },
};
