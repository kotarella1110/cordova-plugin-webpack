import yargs from 'yargs';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import createDevServerConfig from 'webpack-dev-server/lib/utils/createConfig';
import is from '@sindresorhus/is';

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
  if (is.promise(config)) {
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
