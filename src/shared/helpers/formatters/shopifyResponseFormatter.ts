import configuration from '../../../lib/configuration';
import { applyCurrencyConversion } from '../common';
import Formatter from './formatter';

const unique = (value, index, self) => {
  return self.indexOf(value) === index
}

class ShopifyResponseFormatter extends Formatter {

  formatDetail = (detail: any): any => {
    let formattedDetail : any= {}
    for(const key in detail){
      switch (key) {
        case "__id":
          formattedDetail.id = detail.__id
          break
        case "name":
          formattedDetail.title = detail.name
          break
        case "available":
          formattedDetail.available = detail.available
          break
        case "shopify_tags":
          formattedDetail.tags = this.formatTags(detail.shopify_tags)
          break
        case "variants":
          formattedDetail = {
            ...formattedDetail,
            variants: this.formatVariants(detail.variants),
            ...this.getOptionRelatedFields(detail),
            ...this.getPriceRelatedFields(detail)
          }
          break
        case "_vendor":
          formattedDetail.vendor = detail._vendor
          break
        case "images":
          formattedDetail.images = this.formatImages(detail.images)
          break
        case "metafields":
          formattedDetail.metafields = this.formatMetafields(detail)
          break
        case "handle":
          formattedDetail.handle = detail.link.split("/products/")[1]
          break
        case "introduced_at":
          formattedDetail.published_at = detail.introduced_at
          break
        case "media":
          formattedDetail.featured_image = this.getFeaturedImage(detail.media)
          formattedDetail.media = detail.media
        case "in_stock":
          formattedDetail.in_stock = detail.in_stock
          break
        case "_product_type":
          formattedDetail.product_type = detail._product_type
          break
        default:
          // TODO:// CONSIDER TAGALYS CUSTOM FIELDS AND TAG SETS HERE
          break;
      }
    }
    return formattedDetail
  };

  formatImages(images) {
    return images.map((image) => {
      return {
        position: image.position,
        alt: image.alt,
        width: image.width,
        height: image.height,
        src: image.src,
      }
    })
  }

  getFeaturedImage(media) {
    const images = media.filter((mediaItem) => mediaItem.type === "image").sort((mediaItem) => mediaItem['position'])
    if (images.length) {
      return images[0]
    }
    return null
  }

  formatTags(tags) {
    if (Array.isArray(tags)) {
      return tags
    }
    return tags.split(", ").sort()
  }

  formatVendor(_vendor) {
    if (Array.isArray(_vendor)) {
      return _vendor[0]
    }
    return _vendor
  }

  formatMetafields(detail) {
    for (const namespace in detail.metafields) {
      for (const key in detail.metafields[namespace]) {
        if(configuration.isMetafieldConfigured(namespace, key, "products")){
          if (detail._references) {
            if (detail._references.metafields.hasOwnProperty(namespace) && detail._references.metafields[namespace].hasOwnProperty(key)) {
              const metafieldReference = detail._references.metafields[namespace][key]
              if (detail.metafields[namespace][key]['type'] === "list.product_reference") {
                detail.metafields[namespace][key]['value'] = metafieldReference.value.map((product_detail) => {
                  return this.formatDetail(product_detail)
                })
              }
              if (detail.metafields[namespace][key]['type'] === "collection_reference") {
                detail.metafields[namespace][key]['value'] = metafieldReference.value.product_details.map((product_detail) => {
                  return this.formatDetail(product_detail)
                })
              }
            }
          }
        }else{
          delete detail.metafields[namespace][key]
          if(Object.keys(detail.metafields[namespace]).length === 0){
            delete detail.metafields[namespace]
          }
        }
      }
    }
    return detail.metafields
  }

  getPriceRelatedFields(detail) {
    if (detail.hasOwnProperty('variants')) {

      const variantCompareAtPrices = detail.variants.filter((variant) => variant.compare_at_price !== null).map(variant => variant.compare_at_price)
      const variantPrices = detail.variants.filter((variant) => variant.price !== null).map(variant => variant.price)
      const price = detail.sale_price
      const compareAtPrice = variantCompareAtPrices.length > 0 ? Math.min(...variantCompareAtPrices) : null
      const priceMin = variantPrices.length > 0 ? Math.min(...variantPrices) : 0
      const priceMax = variantPrices.length > 0 ? Math.max(...variantPrices) : 0
      const compareAtPriceMin = variantCompareAtPrices.length > 0 ? Math.min(...variantCompareAtPrices) : 0
      const compareAtPriceMax = variantCompareAtPrices.length > 0 ? Math.max(...variantCompareAtPrices) : 0
      const priceVaries = variantPrices.filter(unique).length > 1
      const compareAtPriceVaries = variantCompareAtPrices.filter(unique).length > 1

      return {
        price_varies: priceVaries,
        compare_at_price_varies: compareAtPriceVaries,
        price: applyCurrencyConversion(price),
        compare_at_price: applyCurrencyConversion(compareAtPrice),
        price_min: applyCurrencyConversion(priceMin),
        price_max: applyCurrencyConversion(priceMax),
        compare_at_price_min: applyCurrencyConversion(compareAtPriceMin),
        compare_at_price_max: applyCurrencyConversion(compareAtPriceMax)
      }
    }
    return {}
  }

  getOptionRelatedFields(detail) {
    let optionRelatedFields = {}
    if (detail.hasOwnProperty('variants')) {
      if (detail.hasOwnProperty('options')) {
        const options = detail.options.map((option) => option.name)
        optionRelatedFields['options'] = options
        optionRelatedFields['options_with_values'] = detail.options.map((option) => {
          return {
            name: option.name,
            position: option.position,
            values: option.values
          }
        })
        optionRelatedFields['has_only_default_variant'] = this.hasOnlyDefaultVariant(options, detail.variants)
      }
    }
    return optionRelatedFields
  }

  formatVariants(variants) {
    if (variants && variants.length) {
      return variants.map((variant) => {
        if (variant.price) {
          variant.price = applyCurrencyConversion(variant.price)
        }
        if (variant.compare_at_price) {
          variant.compare_at_price = applyCurrencyConversion(variant.compare_at_price)
        }
        return variant
      })
    }
    return []
  }


  hasOnlyDefaultVariant(options, variants) {
    if (options.length > 1) {
      return false
    }
    if (variants.length > 1) {
      return false
    }
    if (options[0] === 'Title' && variants[0].option1 === 'Default Title' && variants[0].option2 === null && variants[0].option3 === null) {
      return true
    }
    return false
  }
}

export default ShopifyResponseFormatter;