import configuration from '../../lib/configuration';
import localStorage from '../../lib/localStorage';
import queryStringManager from '../../lib/queryStringManager';
import ShopifyMultiCurrencyPriceMutator from './mutators/shopifyMultiCurrencyPriceMutator';

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

const getReplacementParam = (param) => {
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

const getFilterQueryString = (filters) => {
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

const getFiltersFromQueryString = (filterQueryString) => {
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

const getProductPrices = async (productIds, countryCode) => {
  if (!productIds.length) return {}
  try {
    await loadTagalysHelperScript();
    const windowInstance: any = window
    const myShopifyDomain = configuration.getMyShopifyDomain()
    const storeFrontAPIAccessToken = configuration.getStoreFrontAPIAccessToken()
    const response = await windowInstance.TagalysPlatformHelpers.getProductPrices(productIds, countryCode, {
      myShopifyDomain,
      storeFrontAPIAccessToken,
      applyCurrencyConversion
    })
    return response
  }catch(error){
    console.error(error);
    console.log("Issue in loading tagalys-platform-helpers")
    return {}
  }
}

const appendProductPricesFromStoreFrontAPI = async (response, callbacks) => {
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
  appendProductPricesFromStoreFrontAPI
}