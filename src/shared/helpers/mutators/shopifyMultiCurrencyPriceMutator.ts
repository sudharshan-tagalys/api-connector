
import configuration from '../../../lib/configuration';
import { getProductPrices } from '../common';

const unique = (value, index, self) => {
  return self.indexOf(value) === index
}

class ShopifyMultiCurrencyPriceMutator {
  async mutate(response) {
    if (response.products) {
      const productIds = response.products.map((product) => product.id)
      let prices;
      if (configuration.hasMetafields) {
        prices = await getProductPrices(productIds, configuration.getCountryCode(), configuration.getMetafields())
      } else {
        prices = await getProductPrices(productIds, configuration.getCountryCode())
      }
      response.products.forEach((product) => {
        const hasPriceInfo = prices.hasOwnProperty(product.id)
        hasPriceInfo ? this.mutateProductPrice(product, prices[product.id]) : this.resetProductPrice(product)
      })
    }
    return response
  }

  mutateProductPrice(product, priceInfo) {
    product.variants.forEach((variant) => {
      variant.price = priceInfo.variantPrices[variant.id].price
      variant.compare_at_price = priceInfo.variantPrices[variant.id].compareAtPrice
    })
    const variantCompareAtPrices = this.getVariantCompareAtPrices(product.variants)
    const variantPrices = this.getVariantPrices(product.variants)
    product.price_varies = variantPrices.filter(unique).length > 1
    product.compare_at_price_varies = variantCompareAtPrices.filter(unique).length > 1
    product.price = priceInfo.price
    product.compare_at_price = priceInfo.compareAtPrice
    product.price_min = this.getMin(variantPrices)
    product.price_max = this.getMax(variantPrices)
    product.compare_at_price_min = this.getMin(variantCompareAtPrices)
    product.compare_at_price_max = this.getMax(variantCompareAtPrices)
    this.updateMetafieldPrices(product.metafields, priceInfo)
  }

  updateMetafieldPrices(metafields, priceInfo){
    for (const namespace in metafields) {
      for (const key in metafields[namespace]) {
        if (priceInfo.metafields.hasOwnProperty(namespace)) {
          if (priceInfo.metafields[namespace].hasOwnProperty(key)) {
            if (metafields[namespace][key]['type'] == "collection_reference") {
              this.updateCollectionReferenceMetafield(metafields[namespace][key], priceInfo.metafields[namespace][key])
            }
            if (metafields[namespace][key]['type'] == "list.product_reference") {
              this.updateProductListReferenceMetafield(metafields[namespace][key], priceInfo)
            }
          }
        }
      }
    }
  }

  updateCollectionReferenceMetafield(data, priceInfo) {
    data.value.products.forEach((product) => {
      priceInfo.forEach((priceInfoForProduct) => {
        if (product.id === priceInfoForProduct.productId) {
          this.mutateProductPrice(product, priceInfoForProduct)
        }
      })
    })
  }

  updateProductReferenceMetafield(data, priceInfo) {
    if (data.value.id === priceInfo.productId) {
      this.mutateProductPrice(data.value, priceInfo)
    }
  }

  updateProductListReferenceMetafield(data, priceInfo){
    data.value.forEach((product) => {
      priceInfo.forEach((priceInfoForProduct) => {
        if (product.id === priceInfoForProduct.productId) {
          this.mutateProductPrice(product, priceInfoForProduct)
        }
      })
    })
  }

  resetProductPrices(response) {
    if (response.products) {
      return response.products.forEach((product) => this.resetProductPrice(product))
    }
    return response
  }

  getVariantPrices(variants) {
    return variants.filter((variant) => variant.price !== null).map(variant => variant.price)
  }

  getVariantCompareAtPrices(variants) {
    return variants.filter((variant) => variant.compare_at_price !== null).map(variant => variant.compare_at_price)
  }

  getMin(prices) {
    return prices.length > 0 ? Math.min(...prices) : 0
  }

  getMax(prices) {
    return prices.length > 0 ? Math.max(...prices) : 0
  }

  resetProductPrice(product) {
    product.price_varies = null
    product.compare_at_price_varies = null
    product.price = null
    product.compare_at_price = null
    product.price_min = null
    product.price_max = null
    product.compare_at_price_min = null
    product.compare_at_price_max = null
    product.variants.map((variant) => {
      variant.price = null
      variant.compare_at_price = null
    })
  }
}

export default ShopifyMultiCurrencyPriceMutator