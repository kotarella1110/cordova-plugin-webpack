import { Arguments } from 'yargs';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import createDevServerConfig from 'webpack-dev-server/lib/utils/createConfig';
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
    const options = createDevServerConfig(config, argv, {
      port: defaultPort,
    });
    // host localhost to 0.0.0.0
    return [config, options];
  }

  return config;
}

function isIpAddress(address: string) {
  var match = address.match(/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/);
  return (
    match != null &&
    parseInt(match[1], 10) <= 255 &&
    parseInt(match[2], 10) <= 255 &&
    parseInt(match[3], 10) <= 255 &&
    parseInt(match[4], 10) <= 255
  );
}

export function guessIpAddress(address: string) {
  if (address !== '0.0.0.0' && isIpAddress(address)) {
    return address;
  }
  return undefined;
}
