const applySortOption = function (sortOptionId) {
  const sortOptions = this.getHelpersToExpose().getSortOptions()
  return sortOptions.map((sortOption) => {
    sortOption.selected = sortOption.id === sortOptionId
    return sortOption
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