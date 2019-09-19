import 'source-map-support/register';
import yargs from 'yargs';
import yargsUnparser from 'yargs-unparser';
import webpack from 'webpack';
import configYargs from 'webpack-cli/bin/config/config-yargs';
import convertArgv from 'webpack-cli/bin/utils/convert-argv';
import {
  createConfig,
  getVersion as getWebpackVersion,
} from './utils/webpackHelpers';
import {
  options as pluginYargsOptions,
  createArguments,
} from './utils/yargsHelpers';

module.exports = async (ctx: any) => {
  const platforms = ['browser', 'android', 'ios'] as const;
  if (!platforms.some(platform => ctx.opts.platforms.includes(platform))) {
    return;
  }

  if (!ctx.opts.options || !ctx.opts.options.argv) {
    return;
  }

  const pluginYargs = yargs(ctx.opts.options.argv);
  // set cordova-plugin-webpack options
  const pluginArgv = pluginYargs
    .options(pluginYargsOptions)
    .version(
      `${ctx.opts.plugin.pluginInfo.id} ${ctx.opts.plugin.pluginInfo.version}`,
    ).argv;

  if (pluginArgv.livereload) {
    return;
  }

  const webpackYargs = yargs(
    yargsUnparser(
      createArguments(
        typeof pluginArgv.webpack === 'object' ? pluginArgv.webpack! : {},
      ),
    ),
  );
  // set webpack yargs options
  configYargs(webpackYargs);
  const webpackArgv = webpackYargs.version(getWebpackVersion()).argv;

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
