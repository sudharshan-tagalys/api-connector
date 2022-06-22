import queryStringManager from '../../lib/queryStringManager';

const getUrlEncodedQueryString = (baseUrl, params) => {
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

const getFilterQueryString = (filter) => {
  return Object.keys(filter).map(function(key){
    return `${key}-${filter[key]}`
  }).join('~');
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
  getUrlEncodedQueryString,
  getEncodedQueryString
}
