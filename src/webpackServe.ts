import 'source-map-support/register';
import path from 'path';
import fs from 'fs';
import glob from 'glob';
import url from 'url';
import address from 'address';
import yargs from 'yargs/yargs';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
// import convertArgv from 'webpack-cli/bin/utils/convert-argv';
import WebpackCLI from 'webpack-cli'
import WebpackInjectPlugin from '@bpnetguy/webpack-inject-plugin';
import createHTML from 'create-html';
import { Context } from './types';
// eslint-disable-next-line import/no-named-as-default
import options from './options';
import { defaultHost, defaultPort } from './utils/webpackHelpers';
import ConfigParser from './utils/ConfigParser';

function prepareUrls(protocol: string, host: string, port: number, pathname: string = '/') {
  const formatUrl = (hostname: string) =>
    url.format({
      protocol,
      hostname,
      port,
      pathname,
    });

  const isUnspecifiedHost = host === '0.0.0.0' || host === '::';
  let prettyHost; let lanUrlForConfig; let lanUrlForTerminal;
  if (isUnspecifiedHost) {
    prettyHost = 'localhost';
    try {
      // This can only return an IPv4 address
      lanUrlForConfig = address.ip();
      if (lanUrlForConfig) {
        // Check if the address is a private ip
        // https://en.wikipedia.org/wiki/Private_network#Private_IPv4_address_spaces
        if (
          /^10[.]|^172[.](1[6-9]|2[0-9]|3[0-1])[.]|^192[.]168[.]/.test(
            lanUrlForConfig
          )
        ) {
          // Address is private, format it for later use
          lanUrlForTerminal = formatUrl(lanUrlForConfig);
        } else {
          // Address is not private, so we will discard it
          lanUrlForConfig = undefined;
        }
      }
    } catch (_e) {
      // ignored
    }
  } else {
    prettyHost = host;
  }
  const localUrlForTerminal = formatUrl(prettyHost);
  const localUrlForBrowser = formatUrl(prettyHost);
  return {
    lanUrlForConfig,
    lanUrlForTerminal,
    localUrlForTerminal,
    localUrlForBrowser,
  };
}

module.exports = async (ctx: Context) => {
  const platforms = ['browser', 'android', 'ios'] as const;
  const targetPlatforms = platforms.filter((platform) =>
    ctx.opts.platforms!.includes(platform),
  );
  if (!platforms.some((platform) => ctx.opts.platforms && ctx.opts.platforms.includes(platform))) {
    return;
  }

  if (!ctx.opts.options || !ctx.opts.options.argv) {
    return;
  }

  const pluginYargs = yargs(ctx.opts.options.argv);
  const pluginArgv = pluginYargs
    .options(options.plugin) // set cordova-plugin-webpack options
    .version(
      `${ctx.opts.plugin!.pluginInfo.id} ${
        ctx.opts.plugin!.pluginInfo.version
      }`,
    ).argv;

  if (!pluginArgv.livereload) {
    return;
  }

  const webpackcli = new WebpackCLI()

  const webpackConfigFromArgs = await webpackcli.loadConfig({ argv: pluginArgv.webpack })
  const customWebpackConfig = webpackConfigFromArgs.options
  const customDevServerConfig = customWebpackConfig.devServer ?? {}

  const protocol = customDevServerConfig.https ? 'https' : 'http';
  const host =
    !customDevServerConfig.host || customDevServerConfig.host === 'localhost'
      ? defaultHost
      : customDevServerConfig.host;
  const customPort = (typeof customDevServerConfig.port === 'string' ? parseInt(customDevServerConfig.port, 10) : customDevServerConfig.port)
  const port = customPort || defaultPort
  if (!port) {
    return;
  }
  const urls = prepareUrls(protocol, host, port);
  const defaultAccessHost = {
    android: '10.0.2.2',
    ios: 'localhost',
  };

  const webpackConfig = ([] as webpack.Configuration[]).concat(
    customWebpackConfig,
  );
  webpackConfig[0] = {
    ...webpackConfig[0],
    mode: 'development',
    plugins: [
      ...(webpackConfig[0].plugins || []),
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
  const staticConfig = [{
    directory: path.join(ctx.opts.projectRoot, 'www'),
    publicPath: '/',
    watch: true
  }]

  targetPlatforms.forEach((platform: string) => {
    staticConfig.push({
      directory: path.join(
        ctx.opts.projectRoot,
        'platforms',
        platform,
        'platform_www',
      ),
      publicPath: `/${platform}`,
      watch: true
    })
  })

  const devServerConfig: WebpackDevServer.Configuration = {
    historyApiFallback: true,
    hot: true,
    ...customDevServerConfig,
    static: staticConfig,
    host,
    port
  };

  // HMR
  if (devServerConfig.hot)
    // WebpackDevServer.addDevServerEntrypoints(webpackConfig, devServerConfig);

  targetPlatforms.forEach((platform) => {
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
        path.join(ctx.opts.projectRoot, 'platforms', platform, '**/config.xml'),
      )
      .forEach((configXmlPath) => {
        const configXml = new ConfigParser(configXmlPath);
        configXml.setElement('content', {
          src: `${protocol}://${
            urls.lanUrlForConfig || defaultAccessHost[platform]
          }:${port}`,
        });
        if (platform === 'ios') {
          configXml.setElement('allow-navigation', { href: '*' });
        }
        configXml.write();
      });
  });

  const compiler = webpack(webpackConfig);
  const server = new WebpackDevServer(compiler, devServerConfig);

  const signals = ['SIGINT', 'SIGTERM'] as const;
  signals.forEach((signal) => {
    process.on(signal, () => {
      server.close();
      process.exit();
    });
  });

  await new Promise<void>((resolve, reject) => {
    server.listen(port, host, (err) => {
      if (err) {
        reject(err);
      }
      console.log('Starting the development server...\n');
      resolve();
    });
  });
};
