import configuration from "../../../lib/configuration";

export const unique = (value, index, self) => {
  return self.indexOf(value) === index
}

export const applyCurrencyConversion = (number) => {
  if(number !== null){
    const exchangeRate = configuration.getExchangeRate();
    const fractionalDigits = configuration.getFractionalDigits();
    let convertedNumber = number * exchangeRate;
    convertedNumber = Math.round(convertedNumber * Math.pow(10, fractionalDigits)) / Math.pow(10, fractionalDigits);
    return convertedNumber;
  }
  return null
}

export const getVariantPrices = (variants) => {
  return variants.filter((variant) => variant.node.price !== null).map(variant => parseFloat(variant.node.price.amount))
}

export const getVariantCompareAtPrices = (variants) => {
  return variants.filter((variant) => variant.node.compareAtPrice !== null).map(variant => parseFloat(variant.node.compareAtPrice.amount))
}

export const getProductPriceAndCompareAtPrice = (variants) => {
  const prices = variants.map((productVariant) =>
    parseFloat(productVariant.node.price.amount)
  );

  const variantCompareAtPrices = variants.map((productVariant) => {
    var price = parseFloat(productVariant.node.price.amount);
    if (productVariant.node.compareAtPrice) {
      var compareAtPrice = parseFloat(
        productVariant.node.compareAtPrice.amount
      );
      if (compareAtPrice > price) {
        return compareAtPrice;
      }
    }
    return price;
  })

  var price = prices.length > 0 ? Math.min(...prices) : null;
  var compareAtPrice = variantCompareAtPrices.length > 0 ? Math.min(...variantCompareAtPrices) : null;

  if (compareAtPrice !== null && price !== null) {
    compareAtPrice = Math.max(...[price, compareAtPrice]);
  }

  return {
    price: price !== null ? applyCurrencyConversion(price) : null,
    compareAtPrice: compareAtPrice !== null ? applyCurrencyConversion(compareAtPrice) : null
  }
}

export const getMin = (prices) => {
  return prices.length > 0 ? Math.min(...prices) : 0
}

export const getMax = (prices) => {
  return prices.length > 0 ? Math.max(...prices) : 0
}

export const getPriceDetails = (product) => {
  const productVariants = product.variants.edges;
  const priceAndCompareAtPrice = getProductPriceAndCompareAtPrice(productVariants)
  const variantCompareAtPrices = getVariantCompareAtPrices(productVariants)
  const variantPrices = getVariantPrices(productVariants)

  let variantPricesMap = {}
  productVariants.forEach((productVariant) => {
    const variantId = productVariant.node.id.split("/").pop();
    const variantPrice = parseFloat(productVariant.node.price.amount)
    const variantCompareAtPrice = productVariant.node.compareAtPrice ? parseFloat(productVariant.node.compareAtPrice.amount) : null

    variantPricesMap[variantId] = {
      price: applyCurrencyConversion(variantPrice),
      compare_at_price: applyCurrencyConversion(variantCompareAtPrice)
    }
  })

  return {
    price: priceAndCompareAtPrice.price,
    compare_at_price: priceAndCompareAtPrice.compareAtPrice,
    price_varies: variantPrices.filter(unique).length > 1,
    compare_at_price_varies: variantCompareAtPrices.filter(unique).length > 1,
    price_min: applyCurrencyConversion(getMin(variantPrices)),
    price_max: applyCurrencyConversion(getMax(variantPrices)),
    compare_at_price_min: applyCurrencyConversion(getMin(variantCompareAtPrices)),
    compare_at_price_max: applyCurrencyConversion(getMax(variantCompareAtPrices)),
    variantPricesMap: variantPricesMap
  }
}

export const API_VERSION = '2023-04'

export const METAFIELD_TYPES = {
  LIST_PRODUCT_REFERENCE: 'list.product_reference',
  COLLECTION_REFERENCE: 'collection_reference',
  SINGLE_LINE_TEXT_FIELD: "single_line_text_field",
  LIST_SINGLE_LINE_TEXT_FIELD: "list.single_line_text_field"
}

export const getIdFromGraphqlId = (graphqlId) => {
  const id = graphqlId.split("/").slice(-1)[0]
  return parseInt(id)
}