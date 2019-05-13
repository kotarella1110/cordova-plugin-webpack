import currentDevice from 'current-device';

const injectCordovaScript = (platform: 'ios' | 'android') => {
  const existingScriptEl = document.querySelector<HTMLScriptElement>(
    'script[src="cordova.js"]',
  );
  if (existingScriptEl) existingScriptEl.remove();

  const scriptEl = document.createElement('script');
  scriptEl.setAttribute('type', 'text/javascript');
  scriptEl.setAttribute('src', `${platform}/cordova.js`);
  document.body.appendChild(scriptEl);

  console.log(`Injected cordova.js of ${platform} platform.`);
};

if (currentDevice.ios()) injectCordovaScript('ios');
if (currentDevice.android()) injectCordovaScript('android');
