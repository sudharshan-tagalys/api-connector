import configuration from './configuration'

class ShopifyConfiguration{
  waitForStoreFrontAPI() {
    if (configuration.isShopify()) {
      const platformVariables = configuration.getPlatformVariables()
      if (!platformVariables.hasOwnProperty("waitForStoreFrontAPI")){
        return true
      }
      return platformVariables.waitForStoreFrontAPI
    }
    return false
  }

  hasMetafields(){
    const platformVariables = configuration.getPlatformVariables()
    return (platformVariables && platformVariables.hasOwnProperty('metafields'))
  }

  getMetafields(){
    if(!this.hasMetafields()){
      return {}
    }
    const platformVariables = configuration.getPlatformVariables()
    return (platformVariables.metafields)
  }

  isMetafieldConfigured(namespace, key, scope){
    const metafields = this.getMetafields()
    const configured = metafields[scope].find((metafield)=>metafield.namespace === namespace && metafield.key === key)
    if(configured){
      return true
    }
    return false
  }

  getStoreFrontAPIAccessToken() {
    return configuration.getPlatformVariables().storeFrontAPIAccessToken
  }

  getMyShopifyDomain() {
    return configuration.getPlatformVariables().myShopifyDomain
  }
}

export default new ShopifyConfiguration()