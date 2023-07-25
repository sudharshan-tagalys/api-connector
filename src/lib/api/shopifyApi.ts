import {createStorefrontClient} from '@shopify/hydrogen';

class ShopifyAPI{
  public storefront;
  constructor(){
    const {storefront} = createStorefrontClient({
      publicStorefrontToken: "942cf991dbd2f945a7f671ea36f4761d",
      storefrontApiVersion: "2023-04",
      storeDomain: `https://replication-one.myshopify.com`,
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