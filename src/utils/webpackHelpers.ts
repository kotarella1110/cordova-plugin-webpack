import yargs from 'yargs';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import createDevServerConfig from 'webpack-dev-server/lib/utils/createConfig';
import { version as webpackVersion } from 'webpack/package.json';
import { version as webpackCliVersion } from 'webpack-cli/package.json';
import { version as devServerVersion } from 'webpack-dev-server/package.json';
import isPromise from './isPromise';

export const defaultHost = '0.0.0.0';
export const defaultPort = 8080;

export function createConfig(
  config: webpack.Configuration | Promise<webpack.Configuration>,
): Promise<webpack.Configuration>;

export function createConfig<T>(
  config: webpack.Configuration | Promise<webpack.Configuration>,
  argv: yargs.Argv<T>['argv'],
): Promise<[webpack.Configuration, WebpackDevServer.Configuration]>;

export async function createConfig<T>(
  config: webpack.Configuration | Promise<webpack.Configuration>,
  argv?: yargs.Argv<T>['argv'],
) {
  if (isPromise(config)) {
    if (argv) {
      return createConfig(await config, argv);
    }
    return createConfig(await config);
  }

  if (argv) {
    const options = createDevServerConfig(config, argv, {
      port: defaultPort,
    });
    // host localhost to 0.0.0.0
    return [config, options];
  }

  return config;
}

export function getVersion() {
  return [
    `webpack ${webpackVersion}`,
    `webpack-cli ${webpackCliVersion}`,
    `webpack-dev-server ${devServerVersion}`,
  ].join('\n');
}
