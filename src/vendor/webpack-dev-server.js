const path = require('path');

module.exports = (ctx => {
  try {
    return require(path.resolve(ctx.opts.projectRoot, 'node_modules', 'webpack-dev-server')); // eslint-disable-line
  } catch (e) {
    return require('webpack-dev-server'); // eslint-disable-line
  }
})();
