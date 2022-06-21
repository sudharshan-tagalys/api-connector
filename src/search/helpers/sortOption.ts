const applySortOption = function (sortOptionId, sortDirection) {
  this.setRequestState((reqState)=>{
    reqState.sortField = sortOptionId
    reqState.sortDirection = sortDirection
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

export default {
  applySortOption,
  getAppliedSortOption,
  getSortOptions,
  getSortOptionById
}