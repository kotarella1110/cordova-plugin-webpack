import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { Arguments } from 'yargs';

declare function createConfig<T>(
  config: webpack.Configuration | webpack.Configuration[],
  argv: Arguments<T>,
  opts: { port: number },
): WebpackDevServer.Configuration;

export default createConfig;
