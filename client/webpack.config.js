const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (env) => {
  const paths = {
    entry: path.resolve(__dirname, "src", "index.tsx"),
    build: path.resolve(__dirname, "build"),
    html: path.resolve(__dirname, "public", "index.html"),
    src: path.resolve(__dirname, "src"),
  };

  const mode = env.mode || "development";
  const PORT = env.port || 3001;
  const isDev = mode === "development";

  return {
    entry: paths.entry,
    output: {
      path: paths.build,
      filename: "bundle.js",
      publicPath: "/",
    },
    mode,
    devtool: isDev ? "eval-cheap-module-source-map" : false,
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "[path][name].[ext]",
              },
            },
          ],
        },
        {
          test: /\.module\.scss$/, // Обработка SCSS-модулей
          exclude: /node_modules/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName: isDev
                    ? "[path][name]__[local]"
                    : "[hash:base64]", // Удобные имена классов в dev-режиме
                },
              },
            },
            "sass-loader", // Добавляем sass-loader
          ],
        },
        {
          test: /\.scss$/, // Обработка обычных SCSS-файлов
          exclude: /\.module\.scss$/,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.css$/,
          exclude: /\.module\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: "babel-loader",
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      alias: {
        "@": path.resolve(__dirname, "src"), // Алиас для src
      },
    },
    devServer: {
      historyApiFallback: true,
      port: PORT,
      proxy: [
        {
          context: ["/products", "/navigation_elements"],
          target: `http://localhost:3000`,
          changeOrigin: true,
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: paths.html,
      }),
    ],
  };
};
