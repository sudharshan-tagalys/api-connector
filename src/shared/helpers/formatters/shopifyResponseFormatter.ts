import Formatter from './formatter';

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
      shopify_tags: 'tags',
      _vendor: 'vendor',
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

  smartWidgets(response){
    return {
      name: response.name,
      widget_name: response.widget_name,
      products: this.formatDetails(response.details)
    }
  }

  searchSuggestions(response){
    return response
  }

  fieldsToIgnore(){
    return ['sku']
  }
}

export default ShopifyResponseFormatter;