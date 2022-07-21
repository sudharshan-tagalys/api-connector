const hasNoSearchResults = function() {
  return (this.productHelpers.getTotalProductsCount() === 0 || this.responseState.hasOwnProperty("error"))
}

const getProducts = function() {
  return this.responseState.products
}

const getTotalProductsCount = function(){
  return this.responseState.total
}

// ==== PUBLICLY EXPOSED HELPERS ====

const getRequestHelpers = function(){
  return {}
}

const getResponseHelpers = function(){
  const { getProducts, getTotalProductsCount, hasNoSearchResults } = this.productHelpers
  return {
    getProducts,
    hasNoSearchResults,
    getTotalProductsCount
  }
}

export default {
  getProducts,
  getTotalProductsCount,
  getRequestHelpers,
  getResponseHelpers,
  hasNoSearchResults,
}