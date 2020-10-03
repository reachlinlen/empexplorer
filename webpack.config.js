const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (env, options) => {
  const isDevelopment = options.mode !== "production";

  return {
    mode: isDevelopment ? "development" : "production",
    target: "web",
    entry: "./src/index.js",
    output: {
      filename: isDevelopment ? "[name].js" : "[name].[contenthash:8].js",
      path: path.join(__dirname, "/dist"),
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
    },
    module: {
      rules: [
        {
          test: /\.js(x)?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
              options: {
                cacheDirectory: true,
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: isDevelopment ? true : false,
              },
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: isDevelopment ? true : false,
              },
            },
          ],
        },
      ],
    },
    devtool: isDevelopment
      ? "eval-cheap-module-source-map"
      : "",
    optimization: {
      minimizer: [
        new OptimizeCssAssetsPlugin({
          cssProcessorOptions: {
            map: {
              annotation: true,
              inline: false,
            },
          },
        }),
        new TerserPlugin({
          extractComments: false,
        }),
      ],
      runtimeChunk: {
        name: "runtime",
      },
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          vendor: {
            name: "vendors",
            test: /[\\/]node_modules[\\/]/,
          },
        },
        name: false,
      },
    },
    performance: {
      hints: false,
    },
    plugins: [
      new HtmlWebpackPlugin({
        minify: isDevelopment
          ? false
          : {
            collapseWhitespace: true,
            keepClosingSlash: true,
            minifyCSS: true,
            minifyJS: true,
            minifyURLs: true,
            removeComments: true,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true,
          },
        template: "./src/index.html",
      }),
      new MiniCssExtractPlugin({
        filename: isDevelopment ? "[name].css" : "[name].[contenthash:8].css",
      }),
      ...(isDevelopment ? [new webpack.HotModuleReplacementPlugin()] : []),
    ],
    stats: {
      assetsSort: "!size",
      builtAt: false,
      children: false,
      entrypoints: false,
      errors: true,
      errorDetails: true,
      hash: false,
      modules: false,
      timings: false,
    },
    devServer: {
      contentBase: "dist",
      historyApiFallback: true,
      host: "0.0.0.0",
      hot: true,
      port: 8080,
    },
    watchOptions: {
      aggregateTimeout: 300,
      ignored: /node_modules/,
      poll: true,
    },
  };
};
