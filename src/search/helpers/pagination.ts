const getCurrentPage = function(){
  return this.responseState.page
}

const getTotalPages = function(){
  return this.responseState.total_pages
}

const hasNextPage = function () {
  const helpers = this.getHelpersToExpose()
  const totalPages = helpers.getTotalPages()
  const nextPage = helpers.getCurrentPage() + 1
  if (totalPages) return (nextPage <= totalPages)
  return true
}

const hasPreviousPage = function () {
  const helpers = this.getHelpersToExpose()
  const previousPage = helpers.getCurrentPage() - 1
  return (previousPage > 0)
}

const goToNextPage = function () {
  if (!this.getHelpersToExpose().hasNextPage()) {
    console.error('Max pages reached')
    return false
  }
  this.setRequestState((reqState) => {
    reqState.page += 1
    return reqState
  })
}

const goToPrevPage = function(){
  if (!this.getHelpersToExpose().hasPreviousPage()) {
    console.error("Min pages reached")
    return false
  }
  this.setRequestState((reqState) => {
    reqState.page -= 1
    return reqState
  })
}

export default {
  goToNextPage,
  goToPrevPage,
  getCurrentPage,
  getTotalPages,
  hasNextPage,
  hasPreviousPage
}