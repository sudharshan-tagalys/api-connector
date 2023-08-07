export const SORT_OPTION_ACTIONS = {
  APPLY_SORT_OPTION: "APPLY_SORT_OPTION"
}

const applySortOption = function (sort) {
  this.setRequestState((reqState)=>{
    reqState.action = SORT_OPTION_ACTIONS.APPLY_SORT_OPTION
    reqState.sort = sort
    this.resetPagination(reqState)
    return reqState
  })
}

const getAppliedSortOption = function () {
  const sortOptions = this.sortOptionHelpers.getSortOptions()
  return sortOptions.find((sortOption) => sortOption.selected === true)
}

const getSortOptions = function () {
  return this.responseState.sort_options
}

const getSortOptionById = function (sortOptionId) {
  const sortOptions = this.sortOptionHelpers.getSortOptions()
  return sortOptions.find((sortOption) => sortOption.id === sortOptionId)
}

// ==== PUBLICLY EXPOSED HELPERS ====

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