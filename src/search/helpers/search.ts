const setQuery = function(query){
  this.setRequestState((reqState)=>{
    reqState.query = query
    return reqState
  })
}

const setQueryMode = function(queryMode){
  this.setRequestState((reqState)=>{
    reqState.queryMode = queryMode
    return reqState
  })
}

const getRequestHelpers = function(){
  const { setQuery, setQueryMode } = this.searchHelpers
  return {
    setQuery,
    setQueryMode
  }
}

const getResponseHelpers = function(){
  return {}
}

export default {
  setQuery,
  setQueryMode,
  getRequestHelpers,
  getResponseHelpers
}