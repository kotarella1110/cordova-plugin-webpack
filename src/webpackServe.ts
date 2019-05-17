import 'source-map-support/register';
import * as path from 'path';
import * as fs from 'fs';
import * as glob from 'glob';
import * as ip from 'ip';
import argvParse from 'yargs-parser';
import webpack from 'webpack';
import WebpackInjectPlugin from 'webpack-inject-plugin';
import WebpackDevServer from 'webpack-dev-server';
import * as express from 'express';
import { choosePort } from 'react-dev-utils/WebpackDevServerUtils';
import * as webpackHelper from './utils/webpackHelper';
import CordovaConfigParser from './utils/CordovaConfigParser';

module.exports = (ctx: any) =>
  new Promise(async (resolve, reject) => {
    const platforms = ['android', 'ios'];
    if (!platforms.some(platform => ctx.opts.platforms.includes(platform))) {
      resolve();
      return;
    }

    const argv = argvParse(ctx.opts.options.argv.join(' '));
    if (!argv.livereload && !argv.l) {
      resolve();
      return;
    }

    const defaultHost = '0.0.0.0';
    const defaultPort = 8080;
    const defaultAccessHosts = {
      android: '10.0.2.2',
      ios: 'localhost',
    };

    const port = await choosePort(defaultHost, defaultPort);
    if (!port) {
      resolve();
      return;
    }

    platforms.forEach(platform => {
      glob
        .sync(
          `${path.join(
            ctx.opts.projectRoot,
            'platforms',
            platform,
          )}/**/*/config.xml`,
        )
        .forEach(configXmlPath => {
          const configXml = new CordovaConfigParser(configXmlPath);
          configXml.setContent(
            `http://${
              platform === 'android'
                ? ip.address() || defaultAccessHosts.android
                : ip.address() || defaultAccessHosts.ios
            }:${port}`,
          );
          if (platform === 'ios')
            configXml.setElement('allow-navigation', { href: '*' });
          configXml.write();
        });
    });

    const customWebpackConfig: webpack.Configuration = webpackHelper.webpackConfig(
      ctx.opts.projectRoot,
      argv.webpackConfig || argv.w,
    );
    const webpackConfig: webpack.Configuration = {
      ...customWebpackConfig,
      mode: 'development',
      plugins: [
        ...(customWebpackConfig.plugins || []),
        new WebpackInjectPlugin(() =>
          fs.readFileSync(
            path.resolve(__dirname, '../scripts/www/injectCSP.js'),
            'utf8',
          ),
        ),
        new WebpackInjectPlugin(() =>
          fs.readFileSync(
            path.resolve(__dirname, '../scripts/www/injectCordovaScript.js'),
            'utf8',
          ),
        ),
      ],
    };

    const platformWwwPaths = {
      android: path.join(
        ctx.opts.projectRoot,
        'platforms/android/platform_www',
      ),
      ios: path.join(ctx.opts.projectRoot, 'platforms/ios/platform_www'),
    };

    const customDevServerConfig: WebpackDevServer.Configuration =
      webpackConfig.devServer || {};
    const devServerConfig: WebpackDevServer.Configuration = {
      contentBase: path.join(ctx.opts.projectRoot, 'www'),
      historyApiFallback: true,
      host: defaultHost,
      port,
      watchContentBase: true,
      hot: true,
      ...customDevServerConfig,
      before: (app, server) => {
        if (customDevServerConfig.before)
          customDevServerConfig.before(app, server);
        (Object.keys(platformWwwPaths) as Array<
          keyof typeof platformWwwPaths
        >).forEach(platform => {
          app.use(`/${platform}`, express.static(platformWwwPaths[platform]));
        });
      },
    };

    // HMR
    WebpackDevServer.addDevServerEntrypoints(webpackConfig, devServerConfig);

    const compiler = webpack(webpackConfig);
    const server = new WebpackDevServer(compiler, devServerConfig);
    server.listen(
      devServerConfig.port || defaultPort,
      devServerConfig.host || defaultHost,
      err => {
        if (err && err.message) {
          console.log(err.message);
          reject();
          return;
        }
        console.log('Starting the development server...\n');
        resolve();
      },
    );
  });
