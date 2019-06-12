import 'source-map-support/register';
import path from 'path';
import fs from 'fs';
import glob from 'glob';
import argvParse from 'yargs-parser';
import webpack from 'webpack';
import WebpackInjectPlugin from 'webpack-inject-plugin';
import WebpackDevServer from 'webpack-dev-server';
import express from 'express';
import createHTML from 'create-html';
import { choosePort, prepareUrls } from 'react-dev-utils/WebpackDevServerUtils';
import * as webpackHelpers from './utils/webpackHelpers';
import CordovaConfigParser from './utils/CordovaConfigParser';

module.exports = (ctx: any) =>
  new Promise(async (resolve, reject) => {
    const platforms = ['browser', 'android', 'ios'] as const;
    if (!platforms.some(platform => ctx.opts.platforms.includes(platform))) {
      resolve();
      return;
    }

    const argv = argvParse(ctx.opts.options.argv.join(' '));
    if (!argv.livereload && !argv.l) {
      resolve();
      return;
    }

    const customWebpackConfig: webpack.Configuration = webpackHelpers.webpackConfig(
      ctx.opts.projectRoot,
      argv.webpackConfig || argv.w,
    );
    const customDevServerConfig: WebpackDevServer.Configuration =
      customWebpackConfig.devServer || {};

    const protocol = customDevServerConfig.https ? 'https' : 'http';
    const host = customDevServerConfig.host || '0.0.0.0';
    const defaultPort = customDevServerConfig.port || 8080;
    const port = await choosePort(host, defaultPort);
    if (!port) {
      resolve();
      return;
    }
    const urls = prepareUrls(protocol, host, port);
    const defaultAccessHost = {
      android: `10.0.2.2`,
      ios: `localhost`,
    };

    const webpackConfig: webpack.Configuration = {
      ...customWebpackConfig,
      mode: 'development',
      plugins: [
        ...(customWebpackConfig.plugins || []),
        new WebpackInjectPlugin(() =>
          fs.readFileSync(path.join(__dirname, 'www/injectCSP.js'), 'utf8'),
        ),
        new WebpackInjectPlugin(() =>
          fs.readFileSync(
            path.join(__dirname, 'www/injectCordovaScript.js'),
            'utf8',
          ),
        ),
      ],
    };
    const devServerConfig: WebpackDevServer.Configuration = {
      contentBase: path.join(ctx.opts.projectRoot, 'www'),
      historyApiFallback: true,
      watchContentBase: true,
      hot: true,
      ...customDevServerConfig,
      host,
      port,
      before: (app, server) => {
        if (customDevServerConfig.before) {
          customDevServerConfig.before(app, server);
        }
        platforms.forEach(platform => {
          glob
            .sync(
              path.join(
                ctx.opts.projectRoot,
                'platforms',
                platform,
                'platform_www',
              ),
            )
            .forEach(platformWwwPath => {
              app.use(`/${platform}`, express.static(platformWwwPath));
            });
        });
      },
    };

    // HMR
    if (devServerConfig.hot)
      WebpackDevServer.addDevServerEntrypoints(webpackConfig, devServerConfig);

    platforms.forEach(platform => {
      if (platform === 'browser') {
        const html = createHTML({
          head: `<meta http-equiv="refresh" content="0;URL=${urls.localUrlForBrowser}">`,
        });
        fs.writeFileSync(
          path.join(
            ctx.opts.projectRoot,
            'platforms',
            platform,
            'www/index.html',
          ),
          html,
        );
        return;
      }
      glob
        .sync(
          path.join(
            ctx.opts.projectRoot,
            'platforms',
            platform,
            '**/config.xml',
          ),
        )
        .forEach(configXmlPath => {
          const configXml = new CordovaConfigParser(configXmlPath);
          configXml.setContent(
            `${protocol}://${urls.lanUrlForConfig ||
              defaultAccessHost[platform]}:${port}`,
          );
          if (platform === 'ios') {
            configXml.setElement('allow-navigation', { href: '*' });
          }
          configXml.write();
        });
    });

    const compiler = webpack(webpackConfig);
    const server = new WebpackDevServer(compiler, devServerConfig);
    server.listen(port, host, err => {
      if (err && err.message) {
        console.log(err.message);
        reject();
        return;
      }
      console.log('Starting the development server...\n');
      resolve();
    });
  });
