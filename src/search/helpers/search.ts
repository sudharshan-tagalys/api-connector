const setQuery = function(query){
  this.setRequestState((reqState)=>{
    reqState.query = query
    return reqState
  })
}

export default {
  setQuery
}