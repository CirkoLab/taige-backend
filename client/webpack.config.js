const path = require('path');
const WebpackBar = require('webpackbar');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV === 'production';

const BUILD_LOCAL_PATH = path.join(__dirname, '../static/local');
const BUILD_PATH = path.join(__dirname, '../build');

module.exports = {
  entry: `${__dirname}/src/index.tsx`,
  output: {
    filename: isProduction ? 'vote.[hash].js' : 'vote.js',
    path: isProduction ? BUILD_PATH : BUILD_LOCAL_PATH,
  },
  cache: !isProduction,
  stats: 'errors-only',
  mode: isProduction ? 'production' : 'development',
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json'],
    modules: [path.join(__dirname, './node_modules')],
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts)?$/,
        exclude: /node_modules/,
        use: 'awesome-typescript-loader',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
        sideEffects: true,
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg|gif|otf)(\?v=\d+\.\d+\.\d+)?$/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new WebpackBar(),
    new MiniCssExtractPlugin({
      filename: isProduction ? 'vote.[hash].css' : 'vote.css',
      chunkFilename: '[name].css',
    }),
  ],
};
