/* eslint-disable import/no-extraneous-dependencies */
import webpack from 'webpack';
import path from 'path';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const config: webpack.Configuration = {
  mode: 'development',
  entry: {
    injectCSP: './src/www/injectCSP.ts',
    injectCordovaScript: './src/www/injectCordovaScript.ts',
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'scripts/www'),
  },
  devtool: 'eval-source-map',
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
    ],
  },
  plugins: [new CleanWebpackPlugin()],
};

export default config;
