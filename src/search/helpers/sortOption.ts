const applySortOption = function (sortOptionId, sortDirection) {
  this.setRequestState((reqState)=>{
    reqState.sortField = sortOptionId
    reqState.sortDirection = sortDirection
    reqState.page = 1
    return reqState
  })
}

const getAppliedSortOption = function () {
  const sortOptions = this.getHelpersToExpose().getSortOptions()
  return sortOptions.find((sortOption) => sortOption.selected === true)
}

const getSortOptions = function () {
  return this.responseState.sort_options
}

const getSortOptionById = function (sortOptionId) {
  const sortOptions = this.getHelpersToExpose().getSortOptions()
  return sortOptions.find((sortOption) => sortOption.id === sortOptionId)
}

const getRequestHelpers = function(){
  const { applySortOption } = this.sortOptionHelpers;
  return {
    applySortOption
  }
}

const getResponseHelpers = function(){
  const { getSortOptions, getSortOptionById, getAppliedSortOption } = this.sortOptionHelpers;
  return {
    getSortOptions,
    getSortOptionById,
    getAppliedSortOption
  }
}

export default {
  applySortOption,
  getAppliedSortOption,
  getSortOptions,
  getSortOptionById,
  getRequestHelpers,
  getResponseHelpers
}