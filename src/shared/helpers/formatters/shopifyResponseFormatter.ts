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
    let additionalPlatformFields = {
      handle: detail.link.split("/products/")[1],
      compare_at_price_min: detail.price,
      price_min: detail.sale_price,
      options: detail.options,
    }
    if(detail.hasOwnProperty('options') && detail.hasOwnProperty('variants')){
      const variantCompareAtPrices =  detail.variants.map(variant => variant.compare_at_price)
      const variantPrices = detail.variants.map(variant => variant.price)
      additionalPlatformFields['price_varies'] = variantPrices.filter(unique).length > 1
      additionalPlatformFields['compare_at_price_varies'] = variantCompareAtPrices.filter(unique).length > 1
      additionalPlatformFields['options_with_values'] = detail.options
      additionalPlatformFields['options_with_values'] = detail.options.map((option)=>{
        return {
          name: option.name,
          position: option.position,
          values: option.values
        }
      })
      const options = detail.options.map((option)=>option.name)
      additionalPlatformFields['options'] = options
      additionalPlatformFields['has_only_default_variant'] = this.hasOnlyDefaultVariant(options, detail.variants)
    }
    return additionalPlatformFields
  }

  hasOnlyDefaultVariant(options, variants){
    if(options.length > 1){
      return false
    }
    if(variants.length > 1){
      return false
    }
    if(options[0] === 'Title' && variants[0].option1 === 'Default Title'  && variants[0].option2 === null && variants[0].option3 === null){
      return true
    }
    return false
  }

  fieldsToIgnore(){
    return ['sku']
  }
}

export default ShopifyResponseFormatter;