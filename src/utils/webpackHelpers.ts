import { Arguments } from 'yargs';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import is from '@sindresorhus/is';

export const defaultHost = '0.0.0.0';
export const defaultPort = 8080;

export function createConfig(
  config:
    | webpack.Configuration
    | webpack.Configuration[]
    | Promise<webpack.Configuration | webpack.Configuration[]>,
): Promise<webpack.Configuration | webpack.Configuration[]>;

export function createConfig<T>(
  config:
    | webpack.Configuration
    | webpack.Configuration[]
    | Promise<webpack.Configuration | webpack.Configuration[]>,
  argv: Arguments<T>,
): Promise<
  [
    webpack.Configuration | webpack.Configuration[],
    WebpackDevServer.Configuration,
  ]
>;

export async function createConfig<T>(
  config:
    | webpack.Configuration
    | webpack.Configuration[]
    | Promise<webpack.Configuration | webpack.Configuration[]>,
  argv?: Arguments<T>,
) {
  if (is.promise(config)) {
    if (argv) {
      return createConfig(await config, argv);
    }
    return createConfig(await config);
  }

  if (argv) {
    return [config, { argv }];
  }

  return config;
}
