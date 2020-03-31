<h1 align="center">cordova-plugin-webpack</h1>

<p align="center">This plugin integrates <a href="https://webpack.js.org">webpack</a> into your Cordova workflow.</p>

<p align="center">
  <a href="LICENSE">
    <img alt="License" src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square" />
  </a>
  <a href="https://www.npmjs.com/package/cordova-plugin-webpack">
    <img alt="NPM Version" src="https://img.shields.io/npm/v/cordova-plugin-webpack?style=flat-square" />
  </a>
  <a href="https://www.npmjs.com/package/cordova-plugin-webpack">
    <img alt="Downloads Month" src="https://img.shields.io/npm/dm/cordova-plugin-webpack?style=flat-square" />
  </a>
  <a href="https://www.npmjs.com/package/cordova-plugin-webpack">
    <img alt="Downloads Total" src="https://img.shields.io/npm/dt/cordova-plugin-webpack?style=flat-square" />
  </a>
  <a href="https://david-dm.org/kotarella1110/cordova-plugin-webpack" title="dependencies status">
    <img src="https://david-dm.org/kotarella1110/cordova-plugin-webpack/status.svg?style=flat-square"/>
  </a>
  <a href="https://david-dm.org/kotarella1110/cordova-plugin-webpack?type=dev" title="devDependencies status">
    <img src="https://david-dm.org/kotarella1110/cordova-plugin-webpack/dev-status.svg?style=flat-square"/>
  </a>
  <a href="https://codeclimate.com/github/kotarella1110/cordova-plugin-webpack/maintainability">
    <img src="https://api.codeclimate.com/v1/badges/f51fd5b6e3c7f43649c2/maintainability" />
  </a>
  <a href="http://commitizen.github.io/cz-cli/">
    <img alt="Commitizen friendly" src="https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square" />
  </a>
  <a href="#contributors">
    <img alt="All Contributors" src="https://img.shields.io/badge/all_contributors-1-orange.svg?style=flat-square" />
  </a>
  <a href="CONTRIBUTING.md">
    <img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-green.svg?style=flat-square" />
  </a>
</p>

## Motivation

Module bundlers such as webpack are essential for SPA (Single Page Application) development. Unfortunately, the Cordova workflow does not integrate webpack as a standard feature.

Simply install this plugin to easily integrate webpack into your Cordova workflow.

## Demo

![Demo](https://github.com/kotarella1110/cordova-plugin-webpack/blob/master/media/cordova-plugin-webpack-demo.gif?raw=true)

## Features

- Ability to have build scripts by webpack when you build or run Cordova app
- Ability to have LiveReload ([Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement 'Hot Module Replacement | webpack')) run by Webpack Dev Server when you’re testing on a device or emulator for Android and iOS

## Supported Platforms

- Browser
- Android
- iOS

## Installation

```shell
$ npm install -D webpack@4 webpack-cli@3 webpack-dev-server@3
$ cordova plugin add cordova-plugin-webpack
```

## CLI Reference

### Syntax

```shell
$ cordova { prepare | platform add | build | run } [<platform> [...]]
    [-- [--webpack.<option> <value> | --livereload]]
```

| Option               | Description                                                                                                                                                                                                                                                                                                                                                                               | Default | Aliases |
| -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------- |
| `--webpack.<option>` | Passed to [webpack-cli options](https://webpack.js.org/api/cli/) or [webpack-dev-server options](https://webpack.js.org/configuration/dev-server/). eg: `--webpack.config example.config.js` <br> **Note: Some options such as [Stats Options](https://webpack.js.org/api/cli/#stats-options) and [Watch Options](https://webpack.js.org/api/cli/#watch-options) are not yet supported.** |         | `-w`    |
| `--livereload`       | Enables LiveReload (HMR)                                                                                                                                                                                                                                                                                                                                                                  | `false` | `-l`    |

### Examples

#### Build

**Before preparing** your Cordova app, build scripts by webpack.

```shell
$ cordova prepare
$ cordova build -- --webpack.config path/to/dir/webpack.config.js
$ cordova build android -- --webpack.mode=production
$ cordova build ios -- --webpack.env.prod
```

#### Live Reload (HMR)

**After preparing** your Cordova app, run LiveReload by Webpack Dev Server.

```shell
$ cordova prepare -- --livereload
$ cordova run ios -- -w.config path/to/dir/webpack.config.babel.js -l
$ cordova run android -- --livereload --webpack.port=8888 --webpack.watch-content-base=false
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

4. Create a JavaScript file ([entry point](https://webpack.js.org/concepts/entry-points/ 'entry points'))

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

| Option                         | Default   |
| ------------------------------ | --------- |
| `devServer.contentBase`        | `www`     |
| `devServer.historyApiFallBack` | `true`    |
| `devServer.host`               | `0.0.0.0` |
| `devServer.port`               | `8080`    |
| `devServer.watchContentBase`   | `true`    |
| `devServer.hot`                | `true`    |

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

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://qiita.com/kotarella1110"><img src="https://avatars1.githubusercontent.com/u/12913947?v=4" width="100px;" alt=""/><br /><sub><b>Kotaro Sugawara</b></sub></a><br /><a href="https://github.com/kotarella1110/cordova-plugin-webpack/commits?author=kotarella1110" title="Code">💻</a> <a href="https://github.com/kotarella1110/cordova-plugin-webpack/commits?author=kotarella1110" title="Documentation">📖</a> <a href="#ideas-kotarella1110" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-kotarella1110" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/kotarella1110/cordova-plugin-webpack/commits?author=kotarella1110" title="Tests">⚠️</a></td>
    <td align="center"><a href="http://jimmymultani.com"><img src="https://avatars0.githubusercontent.com/u/1281284?v=4" width="100px;" alt=""/><br /><sub><b>Jimmy Multani</b></sub></a><br /><a href="https://github.com/kotarella1110/cordova-plugin-webpack/commits?author=JimmyMultani" title="Documentation">📖</a> <a href="https://github.com/kotarella1110/cordova-plugin-webpack/commits?author=JimmyMultani" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!

## License

[Apache-2.0](./LICENSE) © [Kotaro Sugawara](https://twitter.com/kotarella1110)
