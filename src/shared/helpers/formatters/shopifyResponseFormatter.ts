import Formatter from './formatter';

class ShopifyResponseFormatter extends Formatter{
  platformFieldTranslations(){
    return {
      // __id: 'id',
      // name: 'title',
      // price: 'compare_at_price',
      // sale_price: 'price',
      introduced_at: 'published_at',
      // shopify_tags: 'tags',
      _vendor: 'vendor',
      // images: 'images',
      // variants: 'variants',
      // handle: 'handle'
    }
  }

  fieldsToIgnore(){
    return ['sku']
  }
}

class SimilarProductsResponseFormatter extends ShopifyResponseFormatter{
  getFormattedResponse(response) {
    delete response.sku;
    super.getFormattedResponse(response)
  }
}

const similarProductsResponseFormatter = new SimilarProductsResponseFormatter()
export {
  similarProductsResponseFormatter
}