import * as path from 'path';
import webpack from 'webpack';

module.exports = (ctx: any) =>
  new Promise((resolve, reject) => {
    const webpackConfigPath = path.resolve(
      ctx.opts.projectRoot,
      'webpack.config.js',
    );
    const webpackConfig: webpack.Configuration = require(webpackConfigPath);
    const compiler = webpack(webpackConfig);

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
