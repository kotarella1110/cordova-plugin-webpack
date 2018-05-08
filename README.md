# cordova-plugin-webpack

[![npm version](https://badge.fury.io/js/cordova-plugin-webpack.svg)](https://badge.fury.io/js/cordova-plugin-webpack)
[![Downloads](https://img.shields.io/npm/dm/cordova-plugin-webpack.svg)](https://www.npmjs.com/package/cordova-plugin-webpack)
[![dependencies Status](https://david-dm.org/kotarella1110/cordova-plugin-webpack/status.svg)](https://david-dm.org/kotarella1110/cordova-plugin-webpack)
[![devDependencies Status](https://david-dm.org/kotarella1110/cordova-plugin-webpack/dev-status.svg)](https://david-dm.org/kotarella1110/cordova-plugin-webpack?type=dev)
[![Maintainability](https://api.codeclimate.com/v1/badges/f51fd5b6e3c7f43649c2/maintainability)](https://codeclimate.com/github/kotarella1110/cordova-plugin-webpack/maintainability)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/dwyl/esta/issues)

This plugin integrates [webpack](https://webpack.js.org "webpack") into your Cordova workflow.

## Installation

```
cordova plugin add cordova-plugin-webpack
```

You can bundle using webpack you installed.
By default, the this plugin's webpack is used.

```
npm install webpack
cordova plugin add cordova-plugin-webpack
```

## Usage

**Just create _webpack.config.js_ file in project root!**

Example:

_webpack.config.js_

```js
const path = require('path');

module.exports = {
  entry: './src/entry.js',
  output: {
    path: path.resolve(__dirname, 'www'),
    filename: 'bundle.js'
  }
};
```

Specify _www_ folder for `output.path` property.

Before preparing your application, it is bundled with webpack.

※ Specifically, to be bundlled before executing the following cordova commands.

- `cordova prepare`
- `cordova platform add`
- `cordova build`
- `cordova run`

## TODO

- [x] Bundle with webpack before preparing.
- [ ] Live Reload (Hot Module Replacement) with webpack-dev-server.

## License

[Apache-2.0](./LICENSE)

## Author Information

This plugin was created in 2018 by Kotaro Sugawara.