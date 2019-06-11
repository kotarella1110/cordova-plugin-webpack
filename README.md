# cordova-plugin-webpack

[![npm version](https://badge.fury.io/js/cordova-plugin-webpack.svg)](https://badge.fury.io/js/cordova-plugin-webpack)
[![Downloads](https://img.shields.io/npm/dm/cordova-plugin-webpack.svg)](https://www.npmjs.com/package/cordova-plugin-webpack)
[![dependencies Status](https://david-dm.org/kotarella1110/cordova-plugin-webpack/status.svg)](https://david-dm.org/kotarella1110/cordova-plugin-webpack)
[![devDependencies Status](https://david-dm.org/kotarella1110/cordova-plugin-webpack/dev-status.svg)](https://david-dm.org/kotarella1110/cordova-plugin-webpack?type=dev)
[![Maintainability](https://api.codeclimate.com/v1/badges/f51fd5b6e3c7f43649c2/maintainability)](https://codeclimate.com/github/kotarella1110/cordova-plugin-webpack/maintainability)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen.svg?style=flat)](https://github.com/kotarella1110/cordova-plugin-webpack/issues)

This plugin integrates [webpack](https://webpack.js.org "webpack") into your Cordova workflow.

## Motivation

Module bundlers such as webpack are essential for SPA (Single Page Application) development. Unfortunately, the Cordova workflow does not integrate webpack as a standard feature.

Simply install this plugin to easily integrate webpack into your Cordova workflow.

## Demo

![Demo](./media/cordova-plugin-webpack-demo.gif)

## Features

* Ability to have build scripts by webpack when you build or run Cordova app
* Ability to have LiveReload ([Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement "Hot Module Replacement | webpack")) run by Webpack Dev Server when you’re testing on a device or emulator for Android and iOS

## Supported Platforms

* Browser
* Android
* iOS

## Installation

```shell
$ cordova plugin add cordova-plugin-webpack
```

## CLI Reference

### Syntax

```shell
$ cordova { prepare | platform add | build | run } [<platform> [...]]
    [-- [--webpackConfig <webpackConfig> | --livereload]]
```

| Option | Description | Default | Aliases |
|--------|-------------|---------|---------|
| `--webpackConfig` | Path to a webpack configuration file | `webpack.config.js` or `webpackfile.js` in your project root directory. | `-w` |
| `--livereload` | Enables LiveReload (HMR) | `false` | `-l` |

### Examples

#### Build

**Before preparing** your Cordova app, build scripts by webpack.

```shell
$ cordova prepare
$ cordova build -- --webpackConfig path/to/dir/webpack.config.js
```

#### Live Reload (HMR)

**After preparing** your Cordova app, run LiveReload by Webpack Dev Server.

```shell
$ cordova prepare -- --livereload
$ cordova run -- -w path/to/dir/webpack.config.babel.js -l
```

## Usage

1. [Add this plugin](#Installation)

2. Create a webpack configuration file (`webpack.config.js`) in your project root folder

    ```js
    const path = require('path');

    module.exports = {
      mode: 'development',
      entry: './src/index.js',
      output: {
        path: path.resolve(__dirname, 'www'),
        filename: 'index.bundle.js',
      },
      devtool: 'inline-source-map',
    };
    ```

3. Execute the commands

    ```shell
    $ cordova build
    $ cordova run -- --livereload
    ```

<details>
<summary>For more information...</summary>

1. Create a Cordova app

    ```shell
    $ cordova create cordova-plugin-webpack-example cordova.plugin.webpack.example CordovaPluginWebpackExample
    ```

2. Add platforms

    ```shell
    $ cd cordova-plugin-webpack-example
    $ cordova platform add android ios
    ```

3. [Add this plugin](#Installation)

4. Create a JavaScript file ([entry point](https://webpack.js.org/concepts/entry-points/ "entry points"))

    ```shell
    $ mkdir src
    $ mv www/js/index.js src/index.js
    ```

5. Create a webpack configuration file (`webpack.config.js`) in your project root folder

    ```js
    const path = require('path');

    module.exports = {
      mode: 'development',
      entry: './src/index.js',
      output: {
        path: path.resolve(__dirname, 'www'),
        filename: 'index.bundle.js',
      },
      devtool: 'inline-source-map',
    };
    ```

6. Fix a HTML file (`www/index.html`)

    ```diff
    -         <script type="text/javascript" src="js/index.js"></script>
    +         <script type="text/javascript" src="index.bundle.js"></script>
    ```

7. Execute the commands

    ```shell
    $ cordova build
    $ cordova run -- --livereload
    ```

</details>

---

**NOTE**

Starting with Android 9 (API level 28), cleartext support is disabled by default. Therefore, LiveReload does not work on Android 9.0 and higher devices and emulators. Also see [this issue](https://github.com/kotarella1110/cordova-plugin-webpack/issues/9#issuecomment-495048614).

To resolve this, you must modify your `config.xml` file to enable cleartext support.

1. Add `xmlns:android="http://schemas.android.com/apk/res/android"` in `widget` root element

    ```xml
    <widget id="cordova.plugin.webpack.example" version="1.0.0" xmlns="http://www.w3.org/ns/widgets" xmlns:android="http://schemas.android.com/apk/res/android" xmlns:cdv="http://cordova.apache.org/ns/1.0">
    ```

2. Enable `android:usesCleartextTraffic` attribute in `application` element

    ```xml
    <platform name="android">
        <edit-config file="AndroidManifest.xml" mode="merge" target="/manifest/application">
            <application android:usesCleartextTraffic="true" />
        </edit-config>
    </platform>
    ```

---

## Custom webpack configuration

Basically, it works according to your webpack configuration file.
If you want to custom webpack configuration, modify your `webpack.config.js` file.

```js
...
module.exports = {
  ...
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'www'),
    filename: 'bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin(),
  ],
  ...
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    host: 'localhost',
    port: '8000',
    hot: false,
  },
  ...
};
```

| Option | Default |
|--------|---------|
| `devServer.contentBase`  | `www` |
| `devServer.historyApiFallBack` | `true` |
| `devServer.host` | `0.0.0.0` |
| `devServer.port` | `8080` |
| `devServer.watchContentBase` | `true` |
| `devServer.hot` | `true` |

For example, if you want page reloading (LiveReload) instead of hot module reloading (HMR), specify the `devServer.hot` option as `false`.

```js
...
module.exports = {
  ...
  devServer: {
    hot: false,
  },
  ...
};
```

## Contribute

Contributions are always welcome! Please read the [contributing](./CONTRIBUTING.md) first.

## License

[Apache-2.0](./LICENSE) © [Kotaro Sugawara](https://twitter.com/kotarella1110)
