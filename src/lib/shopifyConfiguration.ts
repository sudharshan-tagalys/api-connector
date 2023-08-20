import configuration from './configuration'

class ShopifyConfiguration{
  canWaitForStorefrontAPI() {
    const platformConfiguration = configuration.getPlatformConfiguration()
    if (!platformConfiguration.hasOwnProperty("waitForStorefrontAPI")){
      return true
    }
    return platformConfiguration.waitForStorefrontAPI
  }

  hasMetafields(){
    const platformConfiguration = configuration.getPlatformConfiguration()
    return (platformConfiguration && platformConfiguration.hasOwnProperty('metafields'))
  }

  getMetafields(){
    const platformConfiguration = configuration.getPlatformConfiguration()
    return (platformConfiguration.metafields)
  }

  isMetafieldConfigured(namespace, key, scope){
    const metafields = this.getMetafields()
    if(Object.keys(metafields).length > 0){
      const configured = metafields[scope].find((metafield)=>((metafield.namespace === namespace) && (metafield.key === key)))
      return (configured || false)
    }
    return false
  }

  getStorefrontAPIAccessToken() {
    return configuration.getPlatformConfiguration().storefrontAPI.accessToken
  }

  getMyShopifyDomain() {
    return configuration.getPlatformConfiguration().storefrontAPI.myShopifyDomain
  }

  useStorefrontAPIForSecondaryMarkets(){
    return (configuration.isShopify() && configuration.getPlatformConfiguration().useStorefrontAPIForSecondaryMarkets === true)
  }
}

export default new ShopifyConfiguration()