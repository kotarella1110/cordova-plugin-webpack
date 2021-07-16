import 'source-map-support/register';
import yargs from 'yargs';
import yargsUnparser from 'yargs-unparser';
import webpack from 'webpack';
import convertArgv from 'webpack-cli/bin/utils/convert-argv';
import is from '@sindresorhus/is';
import { Context } from './types';
// eslint-disable-next-line import/no-named-as-default
import options from './options';
import { createConfig } from './utils/webpackHelpers';
import { createArguments, getVersion } from './utils/yargsHelpers';

module.exports = async (ctx: Context) => {
  const platforms = ['browser', 'android', 'ios', 'electron'] as const;
  if (!platforms.some((platform) => ctx.opts.platforms && ctx.opts.platforms.includes(platform))) {
    return;
  }

  if (!ctx.opts.options || !ctx.opts.options.argv) {
    return;
  }

  const pluginYargs = yargs(ctx.opts.options.argv);
  const pluginArgv = pluginYargs
    .options(options.plugin) // set cordova-plugin-webpack options
    .version(
      `${ctx.opts.plugin!.pluginInfo.id} ${
        ctx.opts.plugin!.pluginInfo.version
      }`,
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
    .options(options.webpack) // set webpack yargs options
    .version(getVersion()).argv;

  const customWebpackConfig = await createConfig(
    convertArgv(webpackArgv), // create webpack configuration from yargs.argv and webpack.config.js
  );

  const webpackConfig = ([] as webpack.Configuration[]).concat(
    customWebpackConfig,
  );
  const compiler = webpack(webpackConfig);
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
