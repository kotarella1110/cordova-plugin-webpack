// https://github.com/webpack/webpack-cli/blob/v3.3.9/bin/config/config-yargs.js
import supportsColor from 'supports-color';

const CONFIG_GROUP = "Config options:";
const BASIC_GROUP = "Basic options:";
const MODULE_GROUP = "Module options:";
const OUTPUT_GROUP = "Output options:";
const ADVANCED_GROUP = "Advanced options:";
const RESOLVE_GROUP = "Resolving options:";
const OPTIMIZE_GROUP = "Optimizing options:";
const DISPLAY_GROUP = "Stats options:";

const options = {
  config: {
    type: 'string' as const,
    describe: 'Path to the config file',
    group: CONFIG_GROUP,
    defaultDescription: 'webpack.config.js or webpackfile.js',
    requiresArg: true,
  },
  'config-register': {
    type: 'array' as const,
    alias: 'r',
    describe:
      'Preload one or more modules before loading the webpack configuration',
    group: CONFIG_GROUP,
    defaultDescription: 'module id or path',
    requiresArg: true,
  },
  'config-name': {
    type: 'string' as const,
    describe: 'Name of the config to use',
    group: CONFIG_GROUP,
    requiresArg: true,
  },
  env: {
    describe: 'Environment passed to the config, when it is a function',
    group: CONFIG_GROUP,
  },
  mode: {
    type: 'string' as const,
    choices: ['development', 'production', 'none'],
    describe: 'Enable production optimizations or development hints.',
    group: CONFIG_GROUP,
    requiresArg: true,
  },
  context: {
    type: 'string' as const,
    describe:
      'The base directory (absolute path!) for resolving the `entry` option. If `output.pathinfo` is set, the included pathinfo is shortened to this directory.',
    group: BASIC_GROUP,
    defaultDescription: 'The current directory',
    requiresArg: true,
  },
  entry: {
    type: 'string' as const,
    describe: 'The entry point(s) of the compilation.',
    group: BASIC_GROUP,
    requiresArg: true,
  },
  'module-bind': {
    type: 'string' as const,
    describe: 'Bind an extension to a loader',
    group: MODULE_GROUP,
    requiresArg: true,
  },
  'module-bind-post': {
    type: 'string' as const,
    describe: 'Bind an extension to a post loader',
    group: MODULE_GROUP,
    requiresArg: true,
  },
  'module-bind-pre': {
    type: 'string' as const,
    describe: 'Bind an extension to a pre loader',
    group: MODULE_GROUP,
    requiresArg: true,
  },
  output: {
    alias: 'o',
    describe: 'The output path and file for compilation assets',
    group: OUTPUT_GROUP,
    requiresArg: true,
  },
  'output-path': {
    type: 'string' as const,
    describe: 'The output directory as **absolute path** (required).',
    group: OUTPUT_GROUP,
    defaultDescription: 'The current directory',
    requiresArg: true,
  },
  'output-filename': {
    type: 'string' as const,
    describe:
      'Specifies the name of each output file on disk. You must **not** specify an absolute path here! The `output.path` option determines the location on disk the files are written to, filename is used solely for naming the individual files.',
    group: OUTPUT_GROUP,
    defaultDescription: '[name].js',
    requiresArg: true,
  },
  'output-chunk-filename': {
    type: 'string' as const,
    describe:
      'The filename of non-entry chunks as relative path inside the `output.path` directory.',
    group: OUTPUT_GROUP,
    defaultDescription: 'filename with [id] instead of [name] or [id] prefixed',
    requiresArg: true,
  },
  'output-source-map-filename': {
    type: 'string' as const,
    describe:
      'The filename of the SourceMaps for the JavaScript files. They are inside the `output.path` directory.',
    group: OUTPUT_GROUP,
    requiresArg: true,
  },
  'output-public-path': {
    type: 'string' as const,
    describe: 'Add public path information',
    group: OUTPUT_GROUP,
    requiresArg: true,
  },
  'output-jsonp-function': {
    type: 'string' as const,
    describe: 'The JSONP function used by webpack for async loading of chunks.',
    group: OUTPUT_GROUP,
    requiresArg: true,
  },
  'output-pathinfo': {
    type: 'boolean' as const,
    describe: 'Include comments with information about the modules.',
    group: OUTPUT_GROUP,
  },
  'output-library': {
    type: 'array' as const,
    describe: 'Expose the exports of the entry point as library',
    group: OUTPUT_GROUP,
    requiresArg: true,
  },
  'output-library-target': {
    type: 'string' as const,
    describe: 'Type of library',
    choices: [
      'var',
      'assign',
      'this',
      'window',
      'self',
      'global',
      'commonjs',
      'commonjs2',
      'commonjs-module',
      'amd',
      'umd',
      'umd2',
      'jsonp',
    ],
    group: OUTPUT_GROUP,
    requiresArg: true,
  },
  'records-input-path': {
    type: 'string' as const,
    describe: 'Store compiler state to a json file.',
    group: ADVANCED_GROUP,
    requiresArg: true,
  },
  'records-output-path': {
    type: 'string' as const,
    describe: 'Store compiler state to a json file.',
    group: ADVANCED_GROUP,
    requiresArg: true,
  },
  'records-path': {
    type: 'string' as const,
    describe:
      'Store/Load compiler state from/to a json file. This will result in persistent ids of modules and chunks. An absolute path is expected. `recordsPath` is used for `recordsInputPath` and `recordsOutputPath` if they left undefined.',
    group: ADVANCED_GROUP,
    requiresArg: true,
  },
  define: {
    type: 'string' as const,
    describe: 'Define any free var in the bundle',
    group: ADVANCED_GROUP,
    requiresArg: true,
  },
  target: {
    type: 'string' as const,
    choices: [
      'web',
      'webworker',
      'node',
      'async-node',
      'node-webkit',
      'electron-main',
      'electron-renderer',
    ],
    describe: 'Environment to build for',
    group: ADVANCED_GROUP,
    requiresArg: true,
  },
  cache: {
    type: 'boolean' as const,
    describe:
      'Cache generated modules and chunks to improve performance for multiple incremental builds.',
    default: null,
    group: ADVANCED_GROUP,
    defaultDescription: "It's enabled by default when watching",
  },
  watch: {
    type: 'boolean' as const,
    alias: 'w',
    describe: 'Enter watch mode, which rebuilds on file change.',
    group: BASIC_GROUP,
  },
  'watch-stdin': {
    type: 'boolean' as const,
    alias: 'stdin',
    describe: 'Stop watching when stdin stream has ended',
    group: ADVANCED_GROUP,
  },
  'watch-aggregate-timeout': {
    describe:
      'Delay the rebuilt after the first change. Value is a time in ms.',
    type: 'number' as const,
    group: ADVANCED_GROUP,
    requiresArg: true,
  },
  'watch-poll': {
    type: 'string' as const,
    describe: 'Enable polling mode for watching',
    group: ADVANCED_GROUP,
  },
  hot: {
    type: 'boolean' as const,
    describe: 'Enables Hot Module Replacement',
    group: ADVANCED_GROUP,
  },
  debug: {
    type: 'boolean' as const,
    describe: 'Switch loaders to debug mode',
    group: BASIC_GROUP,
  },
  devtool: {
    type: 'string' as const,
    describe: 'A developer tool to enhance debugging.',
    group: BASIC_GROUP,
    requiresArg: true,
  },
  'resolve-alias': {
    type: 'string' as const,
    describe: 'Redirect module requests',
    group: RESOLVE_GROUP,
    requiresArg: true,
  },
  'resolve-extensions': {
    type: 'array' as const,
    describe: 'Extensions added to the request when trying to find the file',
    group: RESOLVE_GROUP,
    requiresArg: true,
  },
  'resolve-loader-alias': {
    type: 'string' as const,
    describe: 'Setup a loader alias for resolving',
    group: RESOLVE_GROUP,
    requiresArg: true,
  },
  'optimize-max-chunks': {
    describe: 'Try to keep the chunk count below a limit',
    group: OPTIMIZE_GROUP,
    requiresArg: true,
  },
  'optimize-min-chunk-size': {
    describe: 'Minimal size for the created chunk',
    group: OPTIMIZE_GROUP,
    requiresArg: true,
  },
  'optimize-minimize': {
    type: 'boolean' as const,
    describe: 'Enable minimizing the output. Uses optimization.minimizer.',
    group: OPTIMIZE_GROUP,
  },
  prefetch: {
    type: 'string' as const,
    describe: 'Prefetch this request (Example: --prefetch ./file.js)',
    group: ADVANCED_GROUP,
    requiresArg: true,
  },
  provide: {
    type: 'string' as const,
    describe:
      'Provide these modules as free vars in all modules (Example: --provide jQuery=jquery)',
    group: ADVANCED_GROUP,
    requiresArg: true,
  },
  'labeled-modules': {
    type: 'boolean' as const,
    describe: 'Enables labeled modules',
    group: ADVANCED_GROUP,
  },
  plugin: {
    type: 'string' as const,
    describe: 'Load this plugin',
    group: ADVANCED_GROUP,
    requiresArg: true,
  },
  bail: {
    type: 'boolean' as const,
    describe: 'show reasons why optimization bailed out for modules',
    group: ADVANCED_GROUP,
    default: null,
  },
  profile: {
    type: 'boolean' as const,
    describe: 'Capture timing information for each module.',
    group: ADVANCED_GROUP,
    default: null,
  },
  d: {
    type: 'boolean' as const,
    describe:
      'shortcut for --debug --devtool eval-cheap-module-source-map --output-pathinfo',
    group: BASIC_GROUP,
  },
  p: {
    type: 'boolean' as const,
    // eslint-disable-next-line quotes
    describe:
      'shortcut for --optimize-minimize --define process.env.NODE_ENV="production"',
    group: BASIC_GROUP,
  },
  silent: {
    type: 'boolean' as const,
    describe: 'Prevent output from being displayed in stdout',
  },
  json: {
    type: 'boolean' as const,
    alias: 'j',
    describe: 'Prints the result as JSON.',
  },
  progress: {
    type: 'boolean' as const,
    describe: 'Print compilation progress in percentage',
    group: BASIC_GROUP,
  },
  color: {
    type: 'boolean' as const,
    alias: 'colors',
    default: () => supportsColor.stdout,
    group: DISPLAY_GROUP,
    describe: 'Force colors on the console',
  },
  'no-color': {
    type: 'boolean' as const,
    alias: 'no-colors',
    group: DISPLAY_GROUP,
    describe: 'Force no colors on the console',
  },
  'sort-modules-by': {
    type: 'string' as const,
    group: DISPLAY_GROUP,
    describe: 'Sorts the modules list by property in module',
  },
  'sort-chunks-by': {
    type: 'string' as const,
    group: DISPLAY_GROUP,
    describe: 'Sorts the chunks list by property in chunk',
  },
  'sort-assets-by': {
    type: 'string' as const,
    group: DISPLAY_GROUP,
    describe: 'Sorts the assets list by property in asset',
  },
  'hide-modules': {
    type: 'boolean' as const,
    group: DISPLAY_GROUP,
    describe: 'Hides info about modules',
  },
  'display-exclude': {
    type: 'string' as const,
    group: DISPLAY_GROUP,
    describe: 'Exclude modules in the output',
  },
  'display-modules': {
    type: 'boolean' as const,
    group: DISPLAY_GROUP,
    describe: 'Display even excluded modules in the output',
  },
  'display-max-modules': {
    type: 'number' as const,
    group: DISPLAY_GROUP,
    describe: 'Sets the maximum number of visible modules in output',
  },
  'display-chunks': {
    type: 'boolean' as const,
    group: DISPLAY_GROUP,
    describe: 'Display chunks in the output',
  },
  'display-entrypoints': {
    type: 'boolean' as const,
    group: DISPLAY_GROUP,
    describe: 'Display entry points in the output',
  },
  'display-origins': {
    type: 'boolean' as const,
    group: DISPLAY_GROUP,
    describe: 'Display origins of chunks in the output',
  },
  'display-cached': {
    type: 'boolean' as const,
    group: DISPLAY_GROUP,
    describe: 'Display also cached modules in the output',
  },
  'display-cached-assets': {
    type: 'boolean' as const,
    group: DISPLAY_GROUP,
    describe: 'Display also cached assets in the output',
  },
  'display-reasons': {
    type: 'boolean' as const,
    group: DISPLAY_GROUP,
    describe: 'Display reasons about module inclusion in the output',
  },
  'display-depth': {
    type: 'boolean' as const,
    group: DISPLAY_GROUP,
    describe: 'Display distance from entry point for each module',
  },
  'display-used-exports': {
    type: 'boolean' as const,
    group: DISPLAY_GROUP,
    describe:
      'Display information about used exports in modules (Tree Shaking)',
  },
  'display-provided-exports': {
    type: 'boolean' as const,
    group: DISPLAY_GROUP,
    describe: 'Display information about exports provided from modules',
  },
  'display-optimization-bailout': {
    type: 'boolean' as const,
    group: DISPLAY_GROUP,
    describe:
      'Display information about why optimization bailed out for modules',
  },
  'display-error-details': {
    type: 'boolean' as const,
    group: DISPLAY_GROUP,
    describe: 'Display details about errors',
  },
  display: {
    type: 'string' as const,
    choices: [
      '',
      'verbose',
      'detailed',
      'normal',
      'minimal',
      'errors-only',
      'none',
    ],
    group: DISPLAY_GROUP,
    describe: 'Select display preset',
  },
  verbose: {
    type: 'boolean' as const,
    group: DISPLAY_GROUP,
    describe: 'Show more details',
  },
  'info-verbosity': {
    type: 'string' as const,
    default: 'info',
    choices: ['none', 'info', 'verbose'],
    group: DISPLAY_GROUP,
    describe:
      'Controls the output of lifecycle messaging e.g. Started watching files...',
  },
  'build-delimiter': {
    type: 'string' as const,
    group: DISPLAY_GROUP,
    describe: 'Display custom text after build output',
  },
};

export default options;
