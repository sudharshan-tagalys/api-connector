const setQuery = function(query){
  this.setRequestState((reqState)=>{
    reqState.query = query
    return reqState
  })
}

// ==== PUBLICLY EXPOSED HELPERS ====

const getRequestHelpers = function(){
  const { setQuery } = this.searchHelpers
  return {
    setQuery
  }
}

const getResponseHelpers = function(){
  return {}
}

export default {
  setQuery,
  getRequestHelpers,
  getResponseHelpers
}