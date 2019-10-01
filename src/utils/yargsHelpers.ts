import { Arguments } from 'yargs';
import { version as webpackVersion } from 'webpack/package.json';
import { version as webpackCliVersion } from 'webpack-cli/package.json';
import { version as devServerVersion } from 'webpack-dev-server/package.json';

export function createArguments<T extends object>(obj: T): Arguments<T> {
  return {
    _: [],
    $0: '',
    ...obj,
  };
}

export function getVersion() {
  return [
    `webpack ${webpackVersion}`,
    `webpack-cli ${webpackCliVersion}`,
    `webpack-dev-server ${devServerVersion}`,
  ].join('\n');
}
