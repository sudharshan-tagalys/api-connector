import { applyCurrencyConversion } from '../common';
import Formatter from './formatter';

const unique = (value, index, self) => {
  return self.indexOf(value) === index
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
      images: (data) => {
        // slice before sorting is a non destructive way (sort is a destructive array utility)
        const sortedImages = data.images.slice().sort((img1,img2) => img1.position - img2.position)
        return {
          key: "images",
          value: sortedImages
        }
      },
      variants: 'variants',
      available: 'available',
      metafields: 'metafields',
      media: 'media'
    }
  }

  additionalPlatformFields(detail){
    let additionalPlatformFields = {
      handle: detail.link.split("/products/")[1]
    }
    if(detail.hasOwnProperty('variants')){
      const variantCompareAtPrices =  detail.variants.filter((variant)=>variant.compare_at_price !== null).map(variant => variant.compare_at_price)
      const variantPrices = detail.variants.filter((variant)=>variant.price !== null).map(variant => variant.price)
      additionalPlatformFields['price_varies'] = variantPrices.filter(unique).length > 1
      additionalPlatformFields['compare_at_price_varies'] = variantCompareAtPrices.filter(unique).length > 1
      additionalPlatformFields['options_with_values'] = detail.options
      additionalPlatformFields['price'] = detail.sale_price
      additionalPlatformFields['compare_at_price'] = variantCompareAtPrices.length > 0 ? Math.min(...variantCompareAtPrices) : null
      additionalPlatformFields['price_min'] = variantPrices.length > 0 ? Math.min(...variantPrices) : 0
      additionalPlatformFields['price_max'] = variantPrices.length > 0 ? Math.max(...variantPrices) : 0
      additionalPlatformFields['compare_at_price_min'] = variantCompareAtPrices.length > 0 ?  Math.min(...variantCompareAtPrices) : 0
      additionalPlatformFields['compare_at_price_max'] = variantCompareAtPrices.length > 0 ? Math.max(...variantCompareAtPrices) : 0
      if(detail.hasOwnProperty('options')){
        const options = detail.options.map((option)=>option.name)
        additionalPlatformFields['options'] = options
        additionalPlatformFields['options_with_values'] = detail.options.map((option)=>{
          return {
            name: option.name,
            position: option.position,
            values: option.values
          }
        })
        additionalPlatformFields['has_only_default_variant'] = this.hasOnlyDefaultVariant(options, detail.variants)
      }
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
    return ['sku', 'options', 'compare_at_price', 'price']
  }

  applyCurrencyConversions(productDetail){
    if(productDetail.price){
      productDetail.price = applyCurrencyConversion(productDetail.price)
    }
    if(productDetail.compare_at_price){
      productDetail.compare_at_price = applyCurrencyConversion(productDetail.compare_at_price)
    }
    if(productDetail.variants && productDetail.variants.length){
      productDetail.variants = productDetail.variants.map((variant)=>{
        if(variant.price){
          variant.price = applyCurrencyConversion(variant.price)
        }
        if(variant.compare_at_price){
          variant.compare_at_price = applyCurrencyConversion(variant.compare_at_price)
        }
        return variant
      })
    }
    return productDetail
  }
}

export default ShopifyResponseFormatter;