const getCurrentPage = function(){
  return this.responseState.page
}

const getTotalPages = function(){
  return this.responseState.total_pages
}

const hasNextPage = function () {
  const helpers = this.paginationHelpers
  const totalPages = helpers.getTotalPages()
  const nextPage = helpers.getCurrentPage() + 1
  if (typeof totalPages === 'number') return (nextPage <= totalPages)
  return true
}

const hasPreviousPage = function () {
  const helpers = this.paginationHelpers
  const previousPage = helpers.getCurrentPage() - 1
  return (previousPage > 0)
}

const goToNextPage = function () {
  if (!this.paginationHelpers.hasNextPage()) {
    console.error('Max pages reached')
    return false
  }
  this.setRequestState((reqState) => {
    reqState.page += 1
    return reqState
  })
}

const loadPreviousPage = function () {
  this.paginationHelpers.goToPreviousPage("load_previous_page")
}

const goToPreviousPage = function(action = "go_to_previous_page"){
  if (!this.paginationHelpers.hasPreviousPage()) {
    console.error("Min pages reached")
    return false
  }
  this.setRequestState((reqState) => {
    reqState.page -= 1
    reqState.action = action
    return reqState
  })
}

const goToPage = function (page) {
  this.setRequestState((reqState) => {
    reqState.page = page
    return reqState
  })
}

// ==== PUBLICLY EXPOSED HELPERS ====

const getRequestHelpers = function(){
  const { goToNextPage, goToPreviousPage, goToPage, loadPreviousPage } = this.paginationHelpers
  return {
    goToNextPage,
    goToPreviousPage,
    goToPage,
    loadPreviousPage
  }
}

const getResponseHelpers = function(){
  const { getCurrentPage, getTotalPages, hasNextPage, hasPreviousPage } = this.paginationHelpers
  return {
    getCurrentPage,
    getTotalPages,
    hasNextPage,
    hasPreviousPage
  }
}

export default {
  goToNextPage,
  goToPreviousPage,
  getCurrentPage,
  getTotalPages,
  loadPreviousPage,
  hasNextPage,
  hasPreviousPage,
  goToPage,
  getRequestHelpers,
  getResponseHelpers
}