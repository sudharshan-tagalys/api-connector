import configuration from './configuration'

class ShopifyConfiguration{
  canWaitForStoreFrontAPI() {
    const platformVariables = configuration.getPlatformVariables()
    if (!platformVariables.hasOwnProperty("waitForStoreFrontAPI")){
      return true
    }
    return platformVariables.waitForStoreFrontAPI
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
    if(Object.keys(metafields).length > 0){
      const configured = metafields[scope].find((metafield)=>((metafield.namespace === namespace) && (metafield.key === key)))
      return (configured || false)
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