const path = require('path');

module.exports = {
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
