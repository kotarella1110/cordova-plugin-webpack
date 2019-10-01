import 'source-map-support/register';
import yargs from 'yargs';
import yargsUnparser from 'yargs-unparser';
import webpack from 'webpack';
import convertArgv from 'webpack-cli/bin/utils/convert-argv';
import is from '@sindresorhus/is';
import {
  plugin as pluginYargsOptions,
  webpack as webpackYargsOptions,
} from './options';
import { createConfig } from './utils/webpackHelpers';
import { createArguments, getVersion } from './utils/yargsHelpers';

module.exports = async (ctx: any) => {
  const platforms = ['browser', 'android', 'ios'] as const;
  if (!platforms.some(platform => ctx.opts.platforms.includes(platform))) {
    return;
  }

  if (!ctx.opts.options || !ctx.opts.options.argv) {
    return;
  }

  const pluginYargs = yargs(ctx.opts.options.argv);
  const pluginArgv = pluginYargs
    .options(pluginYargsOptions) // set cordova-plugin-webpack options
    .version(
      `${ctx.opts.plugin.pluginInfo.id} ${ctx.opts.plugin.pluginInfo.version}`,
    ).argv;

  if (pluginArgv.livereload) {
    return;
  }

  const webpackYargs = yargs(
    yargsUnparser(
      createArguments(is.object(pluginArgv.webpack) ? pluginArgv.webpack : {}),
    ),
  );
  const webpackArgv = webpackYargs
    .options(webpackYargsOptions) // set webpack yargs options
    .version(getVersion()).argv;

  const customWebpackConfig = await createConfig(
    convertArgv(webpackArgv), // create webpack configuration from yargs.argv and webpack.config.js
  );
  const compiler = webpack(customWebpackConfig);
  await new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) {
        reject(err);
      }
      console.log(
        stats.toString({
          chunks: false,
          colors: true,
        }),
      );
      resolve();
    });
  });
};
