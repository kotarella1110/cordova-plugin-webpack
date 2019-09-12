import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import yargs from 'yargs';

declare function createConfig<T>(
  config: webpack.Configuration,
  argv: yargs.Arguments<T>,
  opts: { port: number },
): WebpackDevServer.Configuration;

export default createConfig;
