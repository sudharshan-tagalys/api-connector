const setQuery = function(query){
  this.setRequestState((reqState)=>{
    reqState.query = query
    return reqState
  })
}

const isValidQuery = function () {
  return !(
    this.searchHelpers.isPartialResults() ||
    this.searchHelpers.isRedirected() ||
    this.searchHelpers.isSpellingCorrectedQuery()
  )
}

const isSpellingCorrectedQuery = function () {
  return this.responseState.hasOwnProperty("query_original")
}

const getQuery = function () {
  if(this.searchHelpers.isRedirected()){
    return false
  }
  return this.responseState.query
}

const getOriginalQuery = function () {
  return this.responseState.hasOwnProperty("query_original") ? this.responseState.query_original : false
}

const isPartialResults = function () {
  return this.responseState.query_mode === "or"
}

const isRedirected = function () {
  return this.responseState.hasOwnProperty("redirect_to_url")
}

const getRedirectURL = function () {
  if (this.responseState.hasOwnProperty("redirect_to_url")) {
    return this.responseState.redirect_to_url
  }
  return false
}


// ==== PUBLICLY EXPOSED HELPERS ====

const getRequestHelpers = function(){
  const { setQuery } = this.searchHelpers
  return {
    setQuery
  }
}

const getResponseHelpers = function () {
  const {
    isValidQuery,
    isSpellingCorrectedQuery,
    getQuery,
    getOriginalQuery,
    isPartialResults,
    isRedirected,
    getRedirectURL
  } = this.searchHelpers
  return {
    isValidQuery,
    isSpellingCorrectedQuery,
    getQuery,
    getOriginalQuery,
    isPartialResults,
    isRedirected,
    getRedirectURL
  }
}

export default {
  setQuery,
  getRequestHelpers,
  getResponseHelpers,
  isValidQuery,
  isSpellingCorrectedQuery,
  getQuery,
  getOriginalQuery,
  isPartialResults,
  isRedirected,
  getRedirectURL
}