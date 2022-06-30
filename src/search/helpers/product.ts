const getProducts = function(){
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
  const { getProducts, getTotalProductsCount } = this.productHelpers
  return {
    getProducts,
    getTotalProductsCount
  }
}

export default {
  getProducts,
  getTotalProductsCount,
  getRequestHelpers,
  getResponseHelpers
}