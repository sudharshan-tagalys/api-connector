import queryStringManager from '../../lib/queryStringManager';

const getURLEncodedQueryString = (baseUrl, params) => {
  return `${baseUrl}${getEncodedQueryString(params)}`
}

const getEncodedQueryString = ({
  query = '', 
  queryFilter = {}, 
  filter = {},
  page = null,
  sort = null
 }) => {
  const { 
    query: queryReplacement,
    queryFilter: queryFilterReplacement,
    filter: filterReplacement,
    page: pageReplacement,
    sort: sortReplacement
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
  if(sort.length){
    params[sortReplacement] = sort
  }
  return  `?${queryStringManager.stringify(params)}`;
}

const getRequestParamsFromWindowLocation = () => {
  return getRequestParamsFromQueryString(window.location.search.replace("?", ''))
}

const getRequestParamsFromQueryString = (queryString) => {
  const parsedObjectFromQueryString = queryStringManager.parse(queryString)
  const { query, queryFilter, filter, page, sort } =  queryStringManager.getConfiguration()
  let params = {}
  if(parsedObjectFromQueryString[query]){
    params['q'] = parsedObjectFromQueryString[query]
  }
  if(parsedObjectFromQueryString[queryFilter]){
    params['qf'] = getFiltersFromQueryString(parsedObjectFromQueryString[queryFilter])
  }
  if(parsedObjectFromQueryString[filter]){
    params['f'] = getFiltersFromQueryString(parsedObjectFromQueryString[filter])
  }
  if(parsedObjectFromQueryString[page]){
    params['page'] = parseInt(parsedObjectFromQueryString[page].toString())
  }
  if(parsedObjectFromQueryString[sort]){
    params['sort'] = parsedObjectFromQueryString[sort]
  }
  return params
}

const getFilterQueryString = (filter) => {
  let filtersQueryStrings = []
  Object.keys(filter).forEach(function(key){
    if(filter[key].length){
      filtersQueryStrings.push(`${key}-${filter[key].join(',')}`)
    }
  })
  return filtersQueryStrings.join('~');
}

const getFiltersFromQueryString = (filterQueryString) => {
  const filtersFromQueryString = filterQueryString.split("~");
  let filters = {}
  filtersFromQueryString.forEach(filterFromQueryString => {
    const filter = filterFromQueryString.split('-')
    const filterKey = filter[0]
    const filterValueString = filter[1]
    const appliedFilterValues = filterValueString.split(',')
    if(appliedFilterValues.length){
      filters[filterKey] = appliedFilterValues
    }
  });
  return filters
}

export {
  getURLEncodedQueryString,
  getEncodedQueryString,
  getRequestParamsFromQueryString,
  getRequestParamsFromWindowLocation
}
