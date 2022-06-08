import Formatter from './formatter';
import suggestionsFormatter from "../../../search-suggestions/suggestionsFormatter"

class ShopifyResponseFormatter extends Formatter {
  platformFieldTranslations(){
    return {
      __id: (data) => {
        return {
          key: 'id',
          value: parseInt(data.__id)
        }
      },
      name: 'title',
      price: 'compare_at_price',
      sale_price: 'price',
      introduced_at: 'published_at',
      shopify_tags: (data) => {
        if(Array.isArray(data.shopify_tags)){
          return {
            key: 'tags',
            value: data.shopify_tags
          }
        }
        return {
          key: 'tags',
          value: data.shopify_tags.split(", ").sort()
        }
      },
      _vendor: (data) => {
        if(Array.isArray(data._vendor)){
          return {
            key: 'vendor',
            value: data._vendor[0]
          }
        }
        return {
          key: 'vendor',
          value: data._vendor
        }
      },
      images: 'images',
      variants: 'variants'
    }
  }

  additionalPlatformFields(detail){
    return {
      handle: detail.link.split("/products/")[1]
    }
  }

  similarProducts(response){
    return {
      products: this.formatDetails(response.details)
    }
  }

  boughtAlsoBought(response) {
    return {
      products: this.formatDetails(response.details)
    }
  }

  viewedAlsoViewed(response) {
    return {
      products: this.formatDetails(response.details)
    }
  }

  smartWidgets(response){
    return {
      name: response.name,
      widget_name: response.widget_name,
      products: this.formatDetails(response.details)
    }
  }

  searchSuggestions(response, configuration) {
    // move into searchSuggestions formatter class
    return {
      queries: suggestionsFormatter.format(response, configuration),
      products: this.formatDetails(response.products)
    }
  }

  popularSearches(response, configuration) {
    return {
      queries: suggestionsFormatter.format({ queries: response.popular_searches}, configuration),
    }
  }

  fieldsToIgnore(){
    return ['sku']
  }
}

export default ShopifyResponseFormatter;