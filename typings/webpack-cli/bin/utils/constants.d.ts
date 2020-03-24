type NON_COMPILATION_ARGS = [
  'init',
  'migrate',
  'serve',
  'generate-loader',
  'generate-plugin',
  'info',
];

type CONFIG_GROUP = 'Config options:';
type BASIC_GROUP = 'Basic options:';
type MODULE_GROUP = 'Module options:';
type OUTPUT_GROUP = 'Output options:';
type ADVANCED_GROUP = 'Advanced options:';
type RESOLVE_GROUP = 'Resolving options:';
type OPTIMIZE_GROUP = 'Optimizing options:';
type DISPLAY_GROUP = 'Stats options:';

type GROUPS = {
  CONFIG_GROUP: CONFIG_GROUP;
  BASIC_GROUP: BASIC_GROUP;
  MODULE_GROUP: MODULE_GROUP;
  OUTPUT_GROUP: OUTPUT_GROUP;
  ADVANCED_GROUP: ADVANCED_GROUP;
  RESOLVE_GROUP: RESOLVE_GROUP;
  OPTIMIZE_GROUP: OPTIMIZE_GROUP;
  DISPLAY_GROUP: DISPLAY_GROUP;
};

type WEBPACK_OPTIONS_FLAG = 'WEBPACK_OPTIONS';

type Constants = {
  NON_COMPILATION_ARGS: NON_COMPILATION_ARGS;
  GROUPS: GROUPS;
  WEBPACK_OPTIONS_FLAG: WEBPACK_OPTIONS_FLAG;
};

declare const constants: Constants;

export default constants;
