import supportsColor from 'supports-color';

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
    group: string;
  };
  'hot-only': {
    type: 'boolean';
    describe: string;
    group: string;
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
    group: string;
    describe: string;
  };
  info: {
    type: 'boolean';
    group: string;
    default: boolean;
    describe: string;
  };
  quiet: {
    type: 'boolean';
    group: string;
    describe: string;
  };
  'client-log-level': {
    type: 'string';
    group: string;
    default: string;
    describe: string;
  };
  https: {
    type: 'boolean';
    group: string;
    describe: string;
  };
  http2: {
    type: 'boolean';
    group: string;
    describe: string;
  };
  key: {
    type: 'string';
    describe: string;
    group: string;
  };
  cert: {
    type: 'string';
    describe: string;
    group: string;
  };
  cacert: {
    type: 'string';
    describe: string;
    group: string;
  };
  pfx: {
    type: 'string';
    describe: string;
    group: string;
  };
  'pfx-passphrase': {
    type: 'string';
    describe: string;
    group: string;
  };
  'content-base': {
    type: 'string';
    describe: string;
    group: string;
  };
  'watch-content-base': {
    type: 'boolean';
    describe: string;
    group: string;
  };
  'history-api-fallback': {
    type: 'boolean';
    describe: string;
    group: string;
  };
  compress: {
    type: 'boolean';
    describe: string;
    group: string;
  };
  port: {
    describe: string;
    group: string;
  };
  'disable-host-check': {
    type: 'boolean';
    describe: string;
    group: string;
  };
  socket: {
    type: 'string';
    describe: string;
    group: string;
  };
  public: {
    type: 'string';
    describe: string;
    group: string;
  };
  host: {
    type: 'string';
    default: string;
    describe: string;
    group: string;
  };
  'allowed-hosts': {
    type: 'string';
    describe: string;
    group: string;
  };
};

declare const options: Options;

export default options;
