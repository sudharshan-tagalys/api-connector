import shopifyConfiguration from '../shopifyConfiguration';


const API_VERSION = "2023-01"

class ShopifyAPI{
  async call(method: string, path: string, requestOptions, headers = { contentType: "application/x-www-form-urlencoded" }){
    const response = await fetch(this.url(path), {
      body: requestOptions.params,
      headers: {
        "Content-Type": headers.contentType,
        "Accept": "application/json",
        "X-Shopify-Storefront-Access-Token": shopifyConfiguration.getStoreFrontAPIAccessToken()
      },
      method: method,
    });
    if(response.status === 200){
      const parsedResponse = await response.json()
      if(requestOptions.hasOwnProperty("onSuccess")){
        return requestOptions.onSuccess(parsedResponse)
      }
      return parsedResponse
    }else{
      if(typeof(requestOptions.onFailure) != 'undefined') {
        return requestOptions.onFailure(response);
      }
      return response
    }
  }

  url(path): string{
    return `https://${shopifyConfiguration.getMyShopifyDomain()}/api/${API_VERSION}/${path}`
  }
}

export default ShopifyAPI;