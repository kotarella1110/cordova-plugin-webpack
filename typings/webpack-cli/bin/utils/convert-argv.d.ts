import webpack from 'webpack';
import yargs from 'yargs';

declare function convertArgv<T>(
  // eslint-disable-next-line no-shadow
  yargs: yargs.Argv<T> | yargs.Arguments<T>,
  argv?: yargs.Arguments<T>,
): webpack.Configuration | Promise<webpack.Configuration>;

export default convertArgv;
