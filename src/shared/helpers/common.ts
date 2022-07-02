import localStorage from '../../lib/localStorage';
import queryStringManager from '../../lib/queryStringManager';

const getURLEncodedQueryString = (baseUrl, params) => {
  return `${baseUrl}${getEncodedQueryString(params)}`
}

const getEncodedQueryString = ({
  query = '',
  queryFilter = {},
  filter = {},
  page = null,
  sort = null,
  except = []
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
  const hasQueryFilters = (Object.keys(queryFilter).length !== 0)
  const hasFilters = (Object.keys(filter).length !== 0)
  if (hasQueryFilters) {
    params[queryFilterReplacement] = getFilterQueryString(queryFilter)
  }
  if(hasFilters){
    params[filterReplacement] = getFilterQueryString(filter)
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
  return  `?${queryStringManager.stringify(params)}`;
}

const getReplacementParam = (param) => {
  const replacementParams = queryStringManager.getConfiguration()
  return replacementParams[param]
}

const getRequestParamsFromWindowLocation = () => {
  return getRequestParamsFromQueryString(window.location.search.replace("?", ''))
}

const getRequestParamsFromQueryString = (queryString) => {
  const parsedObjectFromQueryString = queryStringManager.parse(queryString)
  const { queryParameter, queryFilterParameter, filterParameter, pageParameter, sortParameter } =  queryStringManager.getConfiguration()
  let params = {}
  if(parsedObjectFromQueryString[queryParameter]){
    params['query'] = parsedObjectFromQueryString[queryParameter]
  }
  if(parsedObjectFromQueryString[queryFilterParameter]){
    params['queryFilter'] = getFiltersFromQueryString(parsedObjectFromQueryString[queryFilterParameter])
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

const getFilterQueryString = (filter) => {
  let filtersQueryStrings = []
  Object.keys(filter).forEach(function(key){
    if(Array.isArray(filter[key]) && filter[key].length){
      filtersQueryStrings.push(`${key}-${filter[key].join(',')}`)
    }else{
      filtersQueryStrings.push(`${key}-${filter[key].selected_min}-${filter[key].selected_max}`)
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

const addToRecentSearch = (requestParams) => {
  removeRecentSearch(requestParams.query)
  const recentSearches: any = getRecentSearches()
  recentSearches.queries = recentSearches.queries.concat([{
    displayString: requestParams.query,
    queryString: getEncodedQueryString(requestParams),
    expiry: (localStorage.getCurrentTime() + 3600000)
  }])
  localStorage.setValue("tagalysRecentSearches", recentSearches)
}

const removeRecentSearch = (displayString: string) => {
  const recentSearches = getRecentSearches()
  recentSearches.queries = recentSearches.queries.filter(recentSearch => caseInsensitiveString(recentSearch.displayString) !== caseInsensitiveString(displayString))
  localStorage.setValue("tagalysRecentSearches", recentSearches)
}

const formatSearchItem = (searchItem) => {
  let item = {
    displayString: searchItem.displayString,
    queryString: searchItem.displayString,
  }
  if(searchItem.hasOwnProperty('rawQuery')){
    item['rawQuery'] = searchItem.rawQuery
  }
  return item
}

export {
  getURLEncodedQueryString,
  getEncodedQueryString,
  getRequestParamsFromQueryString,
  getRequestParamsFromWindowLocation,
  addToRecentSearch,
  removeRecentSearch,
  caseInsensitiveString,
  formatSearchItem,
  sortRecentSeaches
}
