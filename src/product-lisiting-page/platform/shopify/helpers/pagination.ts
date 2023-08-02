const hasNextPage = function () {
  return this.responseState.page_info.hasNextPage
}

const getCurrentPage = function(){
  return this.responseState.page
}


const hasPreviousPage = function () {
  return this.responseState.page_info.hasPreviousPage
}

const goToNextPage = function () {
  if (!this.paginationHelpers.hasNextPage()) {
    console.error('Max pages reached')
    return false
  }
  this.setRequestState((reqState) => {
    reqState.page += 1
    reqState.startCursor = null
    reqState.endCursor = this.responseState.page_info.endCursor
    return reqState
  })
}

const goToPreviousPage = function(){
  if (!this.paginationHelpers.hasPreviousPage()) {
    console.error("Min pages reached")
    return false
  }
  this.setRequestState((reqState) => {
    reqState.page -= 1
    reqState.startCursor = this.responseState.page_info.startCursor
    reqState.endCursor = null
    return reqState
  })
}

// ==== PUBLICLY EXPOSED HELPERS ====

const getRequestHelpers = function(){
  const { goToNextPage, goToPreviousPage } = this.paginationHelpers
  return {
    goToNextPage,
    goToPreviousPage,
  }
}

const getResponseHelpers = function(){
  const { hasNextPage, hasPreviousPage, getCurrentPage } = this.paginationHelpers
  return {
    hasNextPage,
    hasPreviousPage,
    getCurrentPage
  }
}

export default {
  goToNextPage,
  goToPreviousPage,
  hasNextPage,
  hasPreviousPage,
  getRequestHelpers,
  getResponseHelpers,
  getCurrentPage
}