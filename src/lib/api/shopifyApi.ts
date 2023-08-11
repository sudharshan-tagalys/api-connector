import {createStorefrontClient} from '@shopify/hydrogen';
import configuration from '../configuration';

class ShopifyAPI{
  public storefront;
  constructor(){
    const {storefront} = createStorefrontClient({
      publicStorefrontToken: configuration.getStoreFrontAPIAccessToken(),
      storefrontApiVersion: "2023-01",
      storeDomain: configuration.getMyShopifyDomain(),
    });
    this.storefront = storefront
  }
  async call(method: string, path: string, requestOptions, headers = { contentType: "application/x-www-form-urlencoded" }){
    const params = requestOptions.params
    const response = await this.storefront.query(params.query, { variables: params.variables })
    requestOptions.onSuccess(response)
  }

  url(path): string{
    return ""
  }
}

export default ShopifyAPI;