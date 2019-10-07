type Hook =
  | 'before_platform_add'
  | 'after_platform_add'
  | 'before_platform_rm'
  | 'after_platform_rm'
  | 'before_platform_ls'
  | 'after_platform_ls'
  | 'before_prepare'
  | 'after_prepare'
  | 'before_compile'
  | 'after_compile'
  | 'before_deploy'
  | 'before_build'
  | 'after_build'
  | 'before_emulate'
  | 'after_emulate'
  | 'before_run'
  | 'after_run'
  | 'before_serve'
  | 'after_serve'
  | 'before_clean'
  | 'after_clean'
  | 'before_plugin_add'
  | 'after_plugin_add'
  | 'before_plugin_rm'
  | 'after_plugin_rm'
  | 'before_plugin_ls'
  | 'after_plugin_ls'
  | 'before_plugin_install'
  | 'after_plugin_install'
  | 'before_plugin_uninstall';

type Platform = 'android' | 'browser' | 'ios' | 'osx' | 'windows' | 'electron';

type Cordova = {
  platforms: Platform[];
  plugins: string[];
  version: string;
};

type Plugin = {
  id: string;
  pluginInfo: any;
  dir: string;
};

type Opts = {
  options?: {
    verbose?: boolean;
    'update-notifier'?: boolean;
    nohooks?: string[];
    telemetry?: boolean;
    debug?: boolean;
    release?: boolean;
    prepare?: boolean;
    build?: boolean;
    device?: boolean;
    emulator?: boolean;
    target?: string;
    buildConfig?: string;
    argv?: string[];
  };
  projectRoot: string;
  cordova: Cordova;
  verbose?: boolean;
  silent?: boolean;
  nohooks?: string[];
  platforms?: Platform[];
  plugin?: Plugin;
  plugins?: string[];
  // eslint-disable-next-line camelcase
  cli_variables?: {
    [key: string]: string;
  };
  searchpath?: string;
  noregistry?: boolean;
  link?: boolean;
  save?: boolean;
  // eslint-disable-next-line camelcase
  save_exact?: boolean;
  shrikwrap?: boolean;
  force?: boolean;
  production?: boolean;
  paths?: string[];
};

export type Context = {
  hook: Hook;
  opts: Opts;
  cmdLine: string;
  scriptLocation: string;
  cordova: any;
  requireCordovaModule(modulePath: string): any;
};
