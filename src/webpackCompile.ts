import 'source-map-support/register';
import argvParse from 'yargs-parser';
import webpack from 'webpack';
import * as webpackHelpers from './utils/webpackHelpers';

module.exports = async (ctx: any) => {
  const platforms = ['browser', 'android', 'ios'] as const;
  if (!platforms.some(platform => ctx.opts.platforms.includes(platform))) {
    return;
  }

  if (!ctx.opts.options || !ctx.opts.options.argv) {
    return;
  }

  const argv = argvParse(ctx.opts.options.argv.join(' '));
  if (argv.livereload || argv.l) {
    return;
  }

  const customWebpackConfig: webpack.Configuration = webpackHelpers.webpackConfig(
    ctx.opts.projectRoot,
    argv.webpackConfig || argv.w,
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
