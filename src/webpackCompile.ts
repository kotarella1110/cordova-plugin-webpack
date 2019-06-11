import 'source-map-support/register';
import argvParse from 'yargs-parser';
import webpack from 'webpack';
import * as webpackHelpers from './utils/webpackHelpers';

module.exports = (ctx: any) =>
  new Promise((resolve, reject) => {
    const platforms = ['browser', 'android', 'ios'];
    if (!platforms.some(platform => ctx.opts.platforms.includes(platform))) {
      resolve();
      return;
    }

    const argv = argvParse(ctx.opts.options.argv.join(' '));
    if (argv.livereload || argv.l) {
      resolve();
      return;
    }

    const customWebpackConfig: webpack.Configuration = webpackHelpers.webpackConfig(
      ctx.opts.projectRoot,
      argv.webpackConfig || argv.w,
    );
    const compiler = webpack(customWebpackConfig);

    compiler.run((err, stats) => {
      if (err && err.message) {
        console.log(err.message);
        reject();
        return;
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
