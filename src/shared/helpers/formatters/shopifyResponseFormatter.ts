import Formatter from './formatter';
import SuggestionsFormatter from "../../../search-suggestions/suggestionsFormatter"

const unique = (value, index, self) => {
  return self.indexOf(value) === index
}

// has_only_default_variant
// compare_at_price_varies
// price_varies
// price_min
// compare_at_price_min
// options
// -- options_with_values

const hasOnlyDefaultVariant = (detail) => {
  if(detail.options.length > 1){
    return false
  }
  if(detail.variants.length > 1){
    return false
  }
  if(detail.options[0] === 'Title' && detail.variants[0].option1 === 'Default Title'  && detail.variants[0].option2 === null && detail.variants[0].option3 === null){
    return true
  }
  return false
}
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
    const variantCompareAtPrices = detail.variants.map(variant => variant.compare_at_price)
    const variantPrices = detail.variants.map(variant => variant.price)
    return {
      handle: detail.link.split("/products/")[1],
      compare_at_price_min: detail.price,
      price_min: detail.sale_price,
      options: detail.options,
      compare_at_price_varies: variantCompareAtPrices.filter(unique).length > 1,
      price_varies: variantPrices.filter(unique).length > 1,
      has_only_default_variant: hasOnlyDefaultVariant(detail)
    }
  }

  fieldsToIgnore(){
    return ['sku']
  }
}

export default ShopifyResponseFormatter;