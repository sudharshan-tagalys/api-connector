import configuration from "../../lib/configuration";
import shopifyConfiguration from "../../lib/shopifyConfiguration";

export const loadTagalysHelperScriptIfRequired = () => {
  const _window: any = window
  if (_window.TagalysPlatformHelpers) return
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = "http://localhost:9999/bundle.js";
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
}


export const setGlobalContextToPlatformHelpers = () => {
  const TagalysPlatformHelpers = getPlatformHelpers()
  TagalysPlatformHelpers.globalContext.set({
    configuration: configuration,
    shopifyConfiguration: shopifyConfiguration
  })
}

export const getPlatformHelpers = () => {
  const _window: any = window
  return _window.TagalysPlatformHelpers.default
}