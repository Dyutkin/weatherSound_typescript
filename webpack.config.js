const path  = require ('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: ['./src/index.ts', './src/styles.css'],
    output: {
      filename: 'boundle.js',
      path: path.resolve(__dirname, 'public')
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/i,
                loader: 'ts-loader',
                // include: [path.resolve(__dirname, 'src')],
                exclude: ['/node_modules/'],
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
              test: /\.(png|jpe?g|gif|ttf)$/,
              type: "asset/resource", // правило с type: 'asset/resource' будут складываться в директорию с бандлом
              generator: {
                outputPath: 'assets/',
                publicPath: 'assets/',
                filename: '[name][ext]',
              },
            },
            {
              test: /\.(svg)$/,
              type: "asset/resource", // правило с type: 'asset/resource' будут складываться в директорию с бандлом
              generator: {
                outputPath: 'assets/icons/',
                publicPath: 'assets/icons/',
                filename: '[name][ext]',
              },
            },
            {
              test: /\.(mp3)$/,
              type: "asset/resource", // правило с type: 'asset/resource' будут складываться в директорию с бандлом
              generator: {
                outputPath: 'assets/sounds/',
                publicPath: 'assets/sounds/',
                filename: '[name][ext]',
              },
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: './src/index.html',
        }),
        // new CopyWebpackPlugin({
        //   patterns: [
        //     {
        //       from: '**/*',
        //       context: path.resolve(__dirname, 'src', 'assets'),
        //       to: './assets',
        //     },
        //   ],
        // }),
      ],

    devServer: {
        static: {
          directory: path.join(__dirname, 'dist'),
        },
        port: 3000,
        open: true,
        hot: true,
      
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".css", ".scss", "..."]
  },
    mode: 'development'
}