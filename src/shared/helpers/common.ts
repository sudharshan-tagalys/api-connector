import configuration from '../../lib/configuration';
import localStorage from '../../lib/localStorage';
import queryStringManager from '../../lib/queryStringManager';
import ShopifyMultiCurrencyPriceMutator from './mutators/shopifyMultiCurrencyPriceMutator';

//TODO:// MOVE THIS TO PLATFORM HELPERS
async function getProductPricesFromAPI(productIds, countryCode, { myShopifyDomain, storeFrontAPIAccessToken, applyCurrencyConversion }, metafields = { products: [] }) {
  if (!productIds.length) return {}
  var productNodeIds = productIds.map(
    (productId) => `gid://shopify/Product/${productId}`
  );
  var priceQuery = `
    id
    price {
      amount
    }
    compareAtPrice{
      amount
    }
  ` 
  var productPriceInfoQuery = `
    id
    variants(first: 250){
      edges{
        node{
          ${priceQuery}
        }
      }
    }
  `

  var identifier = metafields.products.map((product_metafield)=>`{namespace: "${product_metafield.namespace}", key: "${product_metafield.key}"}`)
  var response = await fetch(`https://${myShopifyDomain}/api/2023-01/graphql.json`, {
    body: `
    query allProducts @inContext(country: ${countryCode}) {
      nodes(ids: ${JSON.stringify(productNodeIds)})
      {
        ... on Product{
          id
          metafields(identifiers: [${identifier}]){
            id
            key
            namespace
            type
            description
            reference{
              ... on Collection{
                id
                title
                products(first: 50){
                  edges{
                    node{
                      ${productPriceInfoQuery}
                    }
                  }
                }
              }
            }
            references(first: 50){
              edges{
                node{
                  ... on Product{
                    ${productPriceInfoQuery}
                  }
                }
              }
            }
          }
          ${productPriceInfoQuery}
        }
      }
    }
    `,
    headers: {
      "Content-Type": "application/graphql",
      "X-Shopify-Storefront-Access-Token": storeFrontAPIAccessToken,
    },
    method: "POST",
  });
  var responseJson = await response.json();
  var products = responseJson.data.nodes;
  var productToPriceMap = {};

  products.forEach((product) => {
    if (product) {
      var productId = product.id.split("/").pop();
      productToPriceMap[productId] = getProductPriceInfo(product)
    }
  });

  return productToPriceMap;
}

function getProductPriceInfo(product){
  var productVariants = product.variants.edges;
  var variantPrices = {}
  var variantCompareAtPrices = productVariants.map((productVariant) => {
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
  });
  var prices = productVariants.map((productVariant) =>
    parseFloat(productVariant.node.price.amount)
  );

  var price = prices.length > 0 ? Math.min(...prices) : null;
  var compareAtPrice =
    variantCompareAtPrices.length > 0
      ? Math.min(...variantCompareAtPrices)
      : null;

  if (compareAtPrice !== null && price !== null) {
    compareAtPrice = Math.max(...[price, compareAtPrice]);
  }

  let metafieldPriceInfo = {}
  if(product.metafields){
    product.metafields.forEach((metafield)=>{
      if(metafield){
        metafieldPriceInfo[metafield.namespace] ||= {}
        metafieldPriceInfo[metafield.namespace][metafield.key] = {
          type: metafield.type,
          priceInfo: getMetafieldPriceInfo(metafield)
        }
      }
    })
  }

  // constructing variant prices
  productVariants.forEach((productVariant) => {
    var variantId = productVariant.node.id.split("/").pop();
    var variantPrice = parseFloat(productVariant.node.price.amount)
    var variantCompareAtPrice = productVariant.node.compareAtPrice ? parseFloat(productVariant.node.compareAtPrice.amount) : null
    variantPrices[variantId] = {
      price: variantPrice,
      compareAtPrice: variantCompareAtPrice
    }
  })
  return {
    productId: product.id.split("/").pop(),
    compareAtPrice:
      compareAtPrice !== null
        ? applyCurrencyConversion(compareAtPrice)
        : null,
    price: price !== null ? applyCurrencyConversion(price) : null,
    variantPrices: variantPrices,
    metafields: metafieldPriceInfo
  };
}


function getMetafieldPriceInfo(metafield) {
  const type = metafield.type
  if (type === "collection_reference") {
    if (metafield.reference) {
      return {
        products: metafield.reference.products.edges.map((edge) => {
          return getProductPriceInfo(edge.node)
        })
      }
    }
  }
  if (type === "list.product_reference") {
    if (metafield.references) {
      return metafield.references.edges.map((reference) => {
        return getProductPriceInfo(reference.node)
      })
    }
  }
  return null
}


const getURLEncodedQueryString = (baseUrl, params) => {
  return `${baseUrl}?${getEncodedQueryString(params)}`
}

const getLegacyEncodedQueryString = ({
  query = '',
  queryFilters = {},
  filters = {},
  page = null,
  sort = null,
  except = [],
 }) => {
  const {
    queryParameter: queryReplacement,
    queryFilterParameter: queryFilterReplacement,
    filterParameter: filterReplacement,
    pageParameter: pageReplacement,
    sortParameter: sortReplacement
   } = queryStringManager.getConfiguration()

  let params: any = {}
  if(query.length){
    params[queryReplacement] = query
  }
  const hasQueryFilters = (Object.keys(queryFilters).length !== 0)
  const hasFilters = (Object.keys(filters).length !== 0)
  if (hasQueryFilters) {
    params[queryFilterReplacement] = getFilterQueryString(queryFilters)
  }
  if(hasFilters){
    params[filterReplacement] = getFilterQueryString(filters)
  }
  if(page){
    params[pageReplacement] = page
  }
  if(sort && sort.length){
    params[sortReplacement] = sort
  }
  except.forEach((paramToDelete) => {
    delete params[getReplacementParam(paramToDelete)]
  })
  return  `${queryStringManager.stringify(params)}`;
}

const getEncodedQueryString = ({
  query = '',
  queryFilters = {},
  filters = {},
  page = null,
  sort = null,
  except = [],
 }) => {
  const {
    queryParameter: queryReplacement,
    queryFilterParameter: queryFilterReplacement,
    filterParameter: filterReplacement,
    pageParameter: pageReplacement,
    sortParameter: sortReplacement
   } = queryStringManager.getConfiguration()

  let params: any = {}
  if(query.length){
    params[queryReplacement] = query
  }
  const hasQueryFilters = (Object.keys(queryFilters).length !== 0)
  const hasFilters = (Object.keys(filters).length !== 0)
  if (hasQueryFilters) {
    params[queryFilterReplacement] = getQueryFilterQueryString(queryFilters)
  }
  if(hasFilters){
    params[filterReplacement] = getFilterQueryString(filters)
  }
  if(page){
    params[pageReplacement] = page
  }
  if(sort && sort.length){
    params[sortReplacement] = sort
  }
  except.forEach((paramToDelete) => {
    delete params[getReplacementParam(paramToDelete)]
  })
  return  `${queryStringManager.stringify(params)}`;
}

export const getReplacementParam = (param) => {
  const replacementParams = queryStringManager.getConfiguration()
  return replacementParams[param]
}

const getRequestParamsFromWindowLocation = () => {
  return getRequestParamsFromQueryString(window.location.search.replace("?", ''))
}

const getRequestParamsFromQueryString = (queryString) => {
  const parsedObjectFromQueryString = queryStringManager.parse(queryString.replace("?", ''))
  const { queryParameter, queryFilterParameter, filterParameter, pageParameter, sortParameter } =  queryStringManager.getConfiguration()
  let params = {}
  if(parsedObjectFromQueryString[queryParameter]){
    params['query'] = parsedObjectFromQueryString[queryParameter]
  }
  if(parsedObjectFromQueryString[queryFilterParameter]){
    params['queryFilters'] = getFiltersFromQueryString(parsedObjectFromQueryString[queryFilterParameter])
  }
  if(parsedObjectFromQueryString[filterParameter]){
    params['filters'] = getFiltersFromQueryString(parsedObjectFromQueryString[filterParameter])
  }
  if(parsedObjectFromQueryString[pageParameter]){
    params['page'] = parseInt(parsedObjectFromQueryString[pageParameter].toString())
  }
  if(parsedObjectFromQueryString[sortParameter]){
    params['sort'] = parsedObjectFromQueryString[sortParameter]
  }
  return params
}

const getQueryFilterQueryString = (filters) => {
  let filtersQueryStrings = []
  Object.keys(filters).forEach(function(key){
    filtersQueryStrings.push(`${key}-${filters[key]}`)
  })
  return filtersQueryStrings.join('~');
}

export const getFilterQueryString = (filters) => {
  let filtersQueryStrings = []
  Object.keys(filters).forEach(function(key){
    if(Array.isArray(filters[key]) && filters[key].length){
      filtersQueryStrings.push(`${key}-${filters[key].join(',')}`)
    }else{
      filtersQueryStrings.push(`${key}-${filters[key].selected_min}-${filters[key].selected_max}`)
    }
  })
  return filtersQueryStrings.join('~');
}

export const getFiltersFromQueryString = (filterQueryString) => {
  const filtersFromQueryString = filterQueryString.split("~");
  let filters = {}
  filtersFromQueryString.forEach(filterFromQueryString => {
    const filter = filterFromQueryString.split('-')
    const isRangeFilter = (filter.length === 3)
    const filterKey = filter[0]
    if(isRangeFilter){
      filters[filterKey] = {
        selected_min: filter[1],
        selected_max: filter[2]
      }
    }else{
      const filterValueString = filter[1]
      const appliedFilterValues = filterValueString.split(',')
      if(appliedFilterValues.length){
        filters[filterKey] = appliedFilterValues
      }
    }
  });
  return filters
}

const caseInsensitiveString = (string) => {
  return string.toLowerCase().trim()
}

const sortRecentSeaches =  (arr) => {
  arr.sort(function(a, b) {
    var keyA = new Date(a.expiry),
      keyB = new Date(b.expiry);
    // Compare the 2 dates
    if (keyA < keyB) return 1;
    if (keyA > keyB) return -1;
    return 0;
  });
  return arr
}
const getRecentSearches = () => {
  const tagalysRecentSearches = localStorage.getItem('tagalysRecentSearches')
  if (tagalysRecentSearches) {
    tagalysRecentSearches.queries = tagalysRecentSearches.queries.filter((recentSearch)=>{
      return (localStorage.getCurrentTime() <= recentSearch.expiry)
    })
    localStorage.setValue('tagalysRecentSearches', tagalysRecentSearches);
    return tagalysRecentSearches
  }
  return {
    queries: []
  }
}

const recordRecentSearch = (queryString: string) => {
  const requestParams: any = getRequestParamsFromQueryString(queryString.replace("?", ""))
  removeRecentSearch(queryString)
  const recentSearches: any = getRecentSearches()
  recentSearches.queries = recentSearches.queries.concat([{
    displayString: requestParams.query,
    queryString: getEncodedQueryString({
      query: requestParams.query,
      queryFilters: requestParams.queryFilters
    }),
    expiry: (localStorage.getCurrentTime() + 3600000)
  }])
  localStorage.setValue("tagalysRecentSearches", recentSearches)
}

const removeRecentSearch = (queryString: string) => {
  const requestParams: any = getRequestParamsFromQueryString(queryString.replace("?", ""))
  const requiredQueryString = getEncodedQueryString({
    query: requestParams.query,
    queryFilters: requestParams.queryFilters
  })
  const recentSearches = getRecentSearches()
  recentSearches.queries = recentSearches.queries.filter(recentSearch => caseInsensitiveString(recentSearch.queryString) !== caseInsensitiveString(requiredQueryString))
  localStorage.setValue("tagalysRecentSearches", recentSearches)
}

const formatSearchItem = (searchItem) => {
  let item = {
    displayString: searchItem.displayString,
    queryString: searchItem.queryString,
  }
  if(searchItem.hasOwnProperty('rawQuery')){
    item['rawQuery'] = searchItem.rawQuery
  }
  return item
}

const applyCurrencyConversion = (number) => {
  const exchangeRate = configuration.getExchangeRate();
  const fractionalDigits = configuration.getFractionalDigits();
  let convertedNumber = number * exchangeRate;
  convertedNumber = Math.round(convertedNumber * Math.pow(10, fractionalDigits)) / Math.pow(10, fractionalDigits);
  return convertedNumber;
}

const getProductPrices = async (productIds, countryCode, metafields = { products: [] }) => {
  if (!productIds.length) return {}
  try {
    // TODO:// UNCOMMENT AND USE PLATFORM HELPERS HERE
    // await loadTagalysHelperScript();
    // const windowInstance: any = window
    const myShopifyDomain = configuration.getMyShopifyDomain()
    const storeFrontAPIAccessToken = configuration.getStoreFrontAPIAccessToken()
    const response = await getProductPricesFromAPI(productIds, countryCode, {
      myShopifyDomain,
      storeFrontAPIAccessToken,
      applyCurrencyConversion
    }, metafields)
    return response
  }catch(error){
    console.error(error);
    console.log("Issue in loading tagalys-platform-helpers")
    return {}
  }
}

const updateProductPricesFromStoreFrontAPI = async (response, callbacks) => {
  try {
    const shopifyMultiCurrencyPriceMutator = new ShopifyMultiCurrencyPriceMutator()
    callbacks.onSuccess(await shopifyMultiCurrencyPriceMutator.mutate(response))
  } catch (error) {
    callbacks.onFailure(error)
  }
}

function loadTagalysHelperScript() {
  const _window: any = window
  if(_window.TagalysPlatformHelpers) return
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = "https://storage.googleapis.com/tagalys-front-end-components/tagalys-platform-helpers-v1.0.0.js";
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

export {
  getURLEncodedQueryString,
  getEncodedQueryString,
  getRequestParamsFromQueryString,
  getRequestParamsFromWindowLocation,
  recordRecentSearch,
  removeRecentSearch,
  caseInsensitiveString,
  formatSearchItem,
  getRecentSearches,
  sortRecentSeaches,
  applyCurrencyConversion,
  getLegacyEncodedQueryString,
  getProductPrices,
  updateProductPricesFromStoreFrontAPI
}