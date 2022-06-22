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
  if(sort){
    if(sort.field){
      if(sort.direction){
        params[sortReplacement] = `${sort.field}-${sort.direction}`
      }else{
        params[sortReplacement] = sort.field
      }
    }
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
    params['query'] = parsedObjectFromQueryString[query]
  }
  if(parsedObjectFromQueryString[queryFilter]){
    params['queryFilter'] = getFiltersFromQueryString(parsedObjectFromQueryString[queryFilter])
  }
  if(parsedObjectFromQueryString[filter]){
    params['filter'] = getFiltersFromQueryString(parsedObjectFromQueryString[filter])
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
  return Object.keys(filter).map(function(key){
    return `${key}-${filter[key]}`
  }).join('~');
}

const getFiltersFromQueryString = (filterQueryString) => {
  const filtersFromQueryString = filterQueryString.split("~");
  let filters = {}
  filtersFromQueryString.forEach(filterFromQueryString => {
    const filter = filterFromQueryString.split('-')
    const filterKey = filter[0]
    const filterValueString = filter[1]
    const appliedFilterValues = filterValueString.split(',')
    filters[filterKey] = appliedFilterValues
  });
  return filters
}

const omit = function(obj, omitKey) {
  return Object.keys(obj).reduce((result, key) => {
    if(key !== omitKey) {
       result[key] = obj[key];
    }
    return result;
  }, {});
}

export {
  omit,
  getURLEncodedQueryString,
  getEncodedQueryString,
  getRequestParamsFromQueryString,
  getRequestParamsFromWindowLocation
}
