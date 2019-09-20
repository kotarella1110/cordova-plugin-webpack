import { Arguments } from 'yargs';

export const options = {
  livereload: {
    type: 'boolean' as const,
    alias: 'l',
    describe: 'Enables LiveReload (HMR)',
    default: false,
  },
  webpack: {
    alias: 'w',
    describe: 'Passed to the webpack-cli or webpack-dev-server options',
  },
};

export function createArguments<T extends object>(obj: T): Arguments<T> {
  return {
    _: [],
    $0: '',
    ...obj,
  };
}
