import 'source-map-support/register';
import webpack from 'webpack';
import * as webpackHelper from './utils/webpackHelper';

module.exports = (ctx: any) =>
  new Promise((resolve, reject) => {
    const customWebpackConfig: webpack.Configuration = webpackHelper.webpackConfig(
      webpackHelper.webpackConfigPath(ctx.opts.projectRoot),
    );
    const compiler = webpack(customWebpackConfig);

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
