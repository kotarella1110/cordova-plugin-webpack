import 'source-map-support/register';
import * as path from 'path';
import * as fs from 'fs';
import * as glob from 'glob';
import webpack from 'webpack';
import WebpackInjectPlugin from 'webpack-inject-plugin';
import WebpackDevServer from 'webpack-dev-server';
import * as express from 'express';
import CordovaConfigParser from './utils/CordovaConfigParser';

module.exports = (ctx: any) =>
  new Promise(resolve => {
    const platforms = ['android', 'ios'];
    const argv = ['--livereload', '-l'];

    if (!platforms.some(platform => ctx.opts.platforms.includes(platform))) {
      return;
    }
    if (!argv.some(val => ctx.opts.options.argv.includes(val))) {
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
            `http://${platform === 'android' ? '10.0.2.2' : 'localhost'}:8080`,
          );
          if (platform === 'ios')
            configXml.setElement('allow-navigation', { href: '*' });
          configXml.write();
        });
    });

    const webpackConfigPath = path.join(
      ctx.opts.projectRoot,
      'webpack.config.js',
    );
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const webpackConfig: webpack.Configuration = require(webpackConfigPath);

    webpackConfig.mode = 'development';

    webpackConfig.plugins = webpackConfig.plugins || [];
    // Inject scripts
    webpackConfig.plugins = [
      ...webpackConfig.plugins,
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
    ];

    const platformWwwPaths = {
      android: path.join(
        ctx.opts.projectRoot,
        'platforms/android/platform_www',
      ),
      ios: path.join(ctx.opts.projectRoot, 'platforms/ios/platform_www'),
    };

    const devServerConfig: WebpackDevServer.Configuration = {
      before: app => {
        (Object.keys(platformWwwPaths) as Array<
          keyof typeof platformWwwPaths
        >).forEach(platform => {
          app.use(`/${platform}`, express.static(platformWwwPaths[platform]));
        });
      },
      contentBase: path.join(ctx.opts.projectRoot, 'www'),
      historyApiFallback: true,
      hot: true,
      inline: true,
      host: '0.0.0.0',
      port: 8080,
    };

    // HMR
    WebpackDevServer.addDevServerEntrypoints(webpackConfig, devServerConfig);

    const compiler = webpack(webpackConfig);
    const server = new WebpackDevServer(compiler, devServerConfig);
    server.listen(8080, '0.0.0.0', () => {
      console.log('dev server listening on port 8080');
      resolve();
    });
  });
