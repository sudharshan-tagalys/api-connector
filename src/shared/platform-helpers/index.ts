import configuration from "../../lib/configuration";
import shopifyConfiguration from "../../lib/shopifyConfiguration";
import TagalysPlatformHelpers from 'platform-helpers'

export const setGlobalContextToPlatformHelpers = () => {
  TagalysPlatformHelpers.globalContext.set({
    configuration: configuration,
    shopifyConfiguration: shopifyConfiguration
  })
}

export default TagalysPlatformHelpers