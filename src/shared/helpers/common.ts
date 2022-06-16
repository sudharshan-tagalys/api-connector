import queryStringManager from '../../lib/queryStringManager';

const getUrlEncodedQueryString = (baseUrl, params) => {
  return `${baseUrl}${getEncodedQueryString(params)}`
}

const getEncodedQueryString = ({ query = '', queryFilter = {}, filter = {} }) => {
  const { query: queryReplacement, queryFilter: queryFilterReplacement, filter: filterReplacement } = queryStringManager.getConfiguration()
  let params: any = {}
  if(query.length){
    params[queryReplacement] = query 
  }
  const hasQueryFilters = (Object.keys(queryFilter).length !== 0)
  const hasFilters = (Object.keys(filter).length !== 0)
  if (hasQueryFilters) {
    const queryFilterValue = Object.keys(queryFilter).map(function(key){
      return `${encodeURIComponent(key)}-${encodeURIComponent(queryFilter[key])}`
    }).join('~');
    params[queryFilterReplacement] = queryFilterValue
  }
  if(hasFilters){
    params[filterReplacement] = filter
  }
  return  '?' + queryStringManager.stringify(params);
}

export {
  getUrlEncodedQueryString,
  getEncodedQueryString
}