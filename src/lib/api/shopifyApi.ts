import configuration from '../configuration';

const API_VERSION = "2023-01"

class ShopifyAPI{
  public storefront;

  async call(method: string, path: string, requestOptions, _){
    var xhr = new XMLHttpRequest();
    xhr.open(method, this.url(path));
    xhr.setRequestHeader('Content-Type', "application/json");
    xhr.setRequestHeader("Accept", "application/json")
    xhr.setRequestHeader("X-Shopify-Storefront-Access-Token", configuration.getStoreFrontAPIAccessToken())
    xhr.onload = function () {
      if (xhr.status === 200) {
        requestOptions.onSuccess(JSON.parse(xhr.responseText))
      } else {
        if(typeof(requestOptions.onFailure) != 'undefined') {
          requestOptions.onFailure(JSON.parse(xhr.response));
        }
      }
    }.bind(this);
    xhr.onerror = function () {
      if(typeof(requestOptions.onFailure) != 'undefined') {
        requestOptions.onFailure(JSON.parse(xhr.response));
      }
    }
    xhr.send(requestOptions.params);
    return xhr
  }

  url(path): string{
    return `https://${configuration.getMyShopifyDomain()}/api/${API_VERSION}/${path}`
  }
}

export default ShopifyAPI;