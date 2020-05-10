import currentDevice from 'current-device';
import isWebview from 'is-ua-webview';

const platforms = ['browser', 'android', 'ios'] as const;
const injectCordovaScript = (platform: typeof platforms[number]) => {
  const existingScriptEl = document.querySelector<HTMLScriptElement>(
    'script[src="cordova.js"]',
  );
  if (existingScriptEl) existingScriptEl.remove();

  const scriptEl = document.createElement('script');
  scriptEl.setAttribute('type', 'text/javascript');
  scriptEl.setAttribute('src', `/${platform}/cordova.js`);
  document.body.appendChild(scriptEl);

  console.log(`Injected cordova.js of ${platform} platform.`);
};

if (!isWebview(navigator.userAgent)) {
  injectCordovaScript('browser');
} else if (currentDevice.android()) {
  injectCordovaScript('android');
} else if (currentDevice.ios()) {
  injectCordovaScript('ios');
}
