# cordova-plugin-webpack

[![npm version](https://badge.fury.io/js/cordova-plugin-webpack.svg)](https://badge.fury.io/js/cordova-plugin-webpack)
[![Downloads](https://img.shields.io/npm/dm/cordova-plugin-webpack.svg)](https://www.npmjs.com/package/cordova-plugin-webpack)
[![dependencies Status](https://david-dm.org/kotarella1110/cordova-plugin-webpack/status.svg)](https://david-dm.org/kotarella1110/cordova-plugin-webpack)
[![devDependencies Status](https://david-dm.org/kotarella1110/cordova-plugin-webpack/dev-status.svg)](https://david-dm.org/kotarella1110/cordova-plugin-webpack?type=dev)
[![Maintainability](https://api.codeclimate.com/v1/badges/f51fd5b6e3c7f43649c2/maintainability)](https://codeclimate.com/github/kotarella1110/cordova-plugin-webpack/maintainability)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/kotarella1110/cordova-plugin-webpack/issues)

This plugin integrates [webpack](https://webpack.js.org "webpack") into your Cordova workflow.

## Installation

```shell
$ cordova plugin add cordova-plugin-webpack
```

## Usage

### Create the App

```shell
$ cordova create cordova-plugin-webpack-example cordova.plugin.webpack.example CordovaPluginWebpackExample
$ cd cordova-plugin-webpack-example
```

### Add Platforms

```shell
$ cordova platform add android ios
```

### Add Plugin

```shell
$ cordova plugin add cordova-plugin-webpack
```

### Create JavaScript file you want to bundle

```shell
$ mkdir src
$ cp www/js/index.js src/index.js
```

### Create webpack configuration file

**Just create a `webpack.config.js` file in the project root folder!**

`webpack.config.js`:

```js
const path = require('path');

module.exports = {
  mode: 'development'
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'www'),
    filename: 'index.bundle.js'
  },
  devtool: 'inline-source-map',
};
```

### Fix the HTML file

`www/index.html`:

```diff
-         <script type="text/javascript" src="js/index.js"></script>
+         <script type="text/javascript" src="index.bundle.js"></script>
```

### Build the App

Before preparing your application, it is bundled with webpack.

```
$ cordova build
```

Processing flow:

`webpack compile` > `cordova prepare` > `cordova compile`

### Live Reload (Hot Module Replacement) the App

```
$ cordova prepare -- --livereload
$ cordova build -- --livereload
$ cordova run -- -l
```

Processing flow:

`webpack compile` > `cordova prepare` > `webpack serve` > `cordova compile`

### Customize webpack configuration

#### Build

If you want to customize `webpack` options, modify `webpack.config.js` file as follows:

```js
...
module.exports = {
  ...
  mode: 'production'
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'www'),
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin()
  ]
  ...
}
```

#### Live Reload (Hot Module Replacement)

By defaults:

| option | default |
|--------|---------|
| `devServer.contentBase`  | `www` |
| `devServer.historyApiFallBack` | `true` |
| `devServer.host` | `0.0.0.0` |
| `devServer.port` | `8080` |
| `devServer.watchContentBase` | `true` |


If you want to customize `devServer` options, modify `webpack.config.js` file as follows:

```
...
module.exports = {
  ...
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    host: 'localhost',
    port: '8000',
  },
};
```

## TODO

- [x] Bundle with webpack before preparing.
- [x] Live Reload (Hot Module Replacement) with webpack-dev-server.
    - [x] Emulator
    - [x] Device

## License

[Apache-2.0](./LICENSE)

## Author Information

This plugin was created in 2018 by Kotaro Sugawara.
