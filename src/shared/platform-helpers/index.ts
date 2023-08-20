import TagalysToCommonResponseFormatter from "./lib/tagalys-to-common-response-formatter";
import ProductListingPage from "./product-listing-page";
import MultiMarket from './lib/multi-market'
import ShopifyAPI from "./lib/shopifyApi";

export default {
  apiClient: () => new ShopifyAPI(),
  ...TagalysToCommonResponseFormatter.export(),
  ...ProductListingPage.export(),
  ...MultiMarket.export()
}