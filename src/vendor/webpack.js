const path = require('path');

module.exports = (ctx => {
  try {
    return require(path.resolve(ctx.opts.projectRoot, 'node_modules', 'webpack')); // eslint-disable-line
  } catch (e) {
    return require('webpack'); // eslint-disable-line
  }
})();
