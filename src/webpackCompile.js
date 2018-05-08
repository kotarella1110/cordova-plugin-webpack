const path = require('path');
const webpack = require('./vendor/webpack');

module.exports = ctx => {
  const deferral = ctx.requireCordovaModule('q').defer();

  const webpackConfigPath = path.resolve(
    ctx.opts.projectRoot,
    'webpack.config.js'
  );
  const webpackConfig = require(webpackConfigPath); // eslint-disable-line
  const compiler = webpack(webpackConfig);

  compiler.run((err, stats) => {
    if (err) {
      deferral.reject(err);
    }

    console.log(
      stats.toString({
        chunks: false,
        colors: true,
      })
    );
    deferral.resolve();
  });

  return deferral.promise;
};
