const options = {
  webpack: {
    alias: 'w',
    describe: 'Passed to the webpack-cli or webpack-dev-server options',
  },
  livereload: {
    type: 'boolean' as const,
    alias: 'l',
    describe: 'Enables LiveReload (HMR)',
    default: false,
  },
};

export default options;
