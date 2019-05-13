import 'source-map-support/register';
import * as path from 'path';
import * as glob from 'glob';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import * as express from 'express';
import CordovaConfigParser from './utils/CordovaConfigParser';

module.exports = (ctx: any) =>
  new Promise(resolve => {
    if (
      typeof ctx.opts.options.argv === 'undefined' &&
      !ctx.opts.options.argv.includes('--live-reload')
    ) {
      return;
    }

    const platforms = ['android', 'ios'];
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
    webpackConfig.plugins = webpackConfig.plugins || [];

    // HMR
    webpackConfig.plugins = [
      ...webpackConfig.plugins,
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
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
