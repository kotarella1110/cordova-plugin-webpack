import path from 'path';
import webpack from 'webpack';

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
    extensions: ['.ts'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
      },
    ],
  },
};

export default config;
