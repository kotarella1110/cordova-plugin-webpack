import supportsColor from 'supports-color';

type ADVANCED_GROUP = 'Advanced options:';
type DISPLAY_GROUP = 'Stats options:';
type SSL_GROUP = 'SSL options:';
type CONNECTION_GROUP = 'Connection options:';
type RESPONSE_GROUP = 'Response options:';
type BASIC_GROUP = 'Basic options:';

type Options = {
  bonjour: {
    type: 'boolean';
    describe: string;
  };
  lazy: {
    type: 'boolean';
    describe: string;
  };
  liveReload: {
    type: 'boolean';
    describe: string;
    default: true;
  };
  serveIndex: {
    type: 'boolean';
    describe: string;
    default: true;
  };
  inline: {
    type: 'boolean';
    default: true;
    describe: string;
  };
  profile: {
    type: 'boolean';
    describe: string;
  };
  progress: {
    type: 'boolean';
    describe: string;
    group: BASIC_GROUP;
  };
  'hot-only': {
    type: 'boolean';
    describe: string;
    group: ADVANCED_GROUP;
  };
  stdin: {
    type: 'boolean';
    describe: string;
  };
  open: {
    type: 'string';
    describe: string;
  };
  useLocalIp: {
    type: 'boolean';
    describe: string;
  };
  'open-page': {
    type: 'string';
    describe: string;
    requiresArg: true;
  };
  color: {
    type: 'boolean';
    alias: 'colors';
    default: () => supportsColor.supportsColor.SupportsColor;
    group: DISPLAY_GROUP;
    describe: string;
  };
  info: {
    type: 'boolean';
    group: DISPLAY_GROUP;
    default: boolean;
    describe: string;
  };
  quiet: {
    type: 'boolean';
    group: DISPLAY_GROUP;
    describe: string;
  };
  'client-log-level': {
    type: 'string';
    group: DISPLAY_GROUP;
    default: string;
    describe: string;
  };
  https: {
    type: 'boolean';
    group: SSL_GROUP;
    describe: string;
  };
  http2: {
    type: 'boolean';
    group: SSL_GROUP;
    describe: string;
  };
  key: {
    type: 'string';
    describe: string;
    group: SSL_GROUP;
  };
  cert: {
    type: 'string';
    describe: string;
    group: SSL_GROUP;
  };
  cacert: {
    type: 'string';
    describe: string;
    group: SSL_GROUP;
  };
  pfx: {
    type: 'string';
    describe: string;
    group: SSL_GROUP;
  };
  'pfx-passphrase': {
    type: 'string';
    describe: string;
    group: SSL_GROUP;
  };
  'content-base': {
    type: 'string';
    describe: string;
    group: SSL_GROUP;
  };
  'watch-content-base': {
    type: 'boolean';
    describe: string;
    group: RESPONSE_GROUP;
  };
  'history-api-fallback': {
    type: 'boolean';
    describe: string;
    group: RESPONSE_GROUP;
  };
  compress: {
    type: 'boolean';
    describe: string;
    group: RESPONSE_GROUP;
  };
  port: {
    describe: string;
    group: CONNECTION_GROUP;
  };
  'disable-host-check': {
    type: 'boolean';
    describe: string;
    group: CONNECTION_GROUP;
  };
  socket: {
    type: 'string';
    describe: string;
    group: CONNECTION_GROUP;
  };
  public: {
    type: 'string';
    describe: string;
    group: CONNECTION_GROUP;
  };
  host: {
    type: 'string';
    default: string;
    describe: string;
    group: CONNECTION_GROUP;
  };
  'allowed-hosts': {
    type: 'string';
    describe: string;
    group: CONNECTION_GROUP;
  };
};

declare const options: Options;

export default options;
