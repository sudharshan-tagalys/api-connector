
// ====== PUBLICLY EXPOSED HELPERS =======

const getFilters = function () {
  return this.responseState.filters
}

const getAppliedFilters = function(){
  const flattenedFilterItems = this.filterHelpers.flattenFilterItems(this.responseState.filters);
  const appliedFilterItems = flattenedFilterItems.filter((filter)=>{
    if(filter.type === 'checkbox'){
      return filter.selected
    }
    if(filter.type === 'range'){
      if(this.requestState['filters']){
        const selectedRangeFilter = this.requestState['filters'][filter.id]
        if(selectedRangeFilter && filter.selected_min && filter.selected_max){
          return (selectedRangeFilter.selected_min !== filter.min || selectedRangeFilter.selected_max !== filter.max)
        }
      }
    }
  })
  return appliedFilterItems
}

const applyFilter = function(filterId, filterType, filterItemsToApply){
  this.setRequestState((reqState) => {
    let filter = []
    if(filterType === "range"){
      filter = filterItemsToApply
    } else {
      filter = (reqState.filters[filterId] || [])
      if(Array.isArray(filterItemsToApply)){
        // filter out the exisiting items
        filter = filter.concat(filterItemsToApply)
      }else{
        if(!filter.includes(filterItemsToApply)){
          filter.push(filterItemsToApply)
        }
      }
    }
    reqState.filters[filterId] = filter;
    reqState.page = 1
    return reqState
  })
}

const getFilterById = function(filterId){
  const flattenedFilterItems = this.filterHelpers.flattenFilterItems(this.responseState.filters);
  const filter = flattenedFilterItems.find((filter)=>filter.id === filterId)
  if(!filter) return false
  return filter
}

const getAppliedFilterById = function(filterId){
  const appliedFilters = this.filterHelpers.getAppliedFilters()
  const appliedFilter = appliedFilters.find((filter)=>filter.id === filterId)
  if(!appliedFilter) return false
  return appliedFilter
}

const isFilterApplied = function(filterId){
  const appliedFilters = this.filterHelpers.getAppliedFilters()
  const appliedFilter = appliedFilters.find((filter)=>filter.filterId === filterId)
  if(appliedFilter) return true
  return false
}

const clearFilter = function(filterId, filterItemIds = []){
  this.setRequestState((reqState)=>{
    if(filterItemIds.length === 0){
      delete reqState.filters[filterId]
    }else{
      filterItemIds.forEach((filterItemId)=>{
        const childFilterItemIds = this.filterHelpers.getChildFilterItemIds(this.responseState.filters, filterItemId)
        const updatedFilterItemIds = reqState.filters[filterId].filter((filterItemId)=>!childFilterItemIds.includes(filterItemId))
        if(updatedFilterItemIds.length === 0){
          delete reqState.filters[filterId]
        }else{
          reqState.filters[filterId] = updatedFilterItemIds 
        }
      })
    }
    reqState.page = 1
    return reqState
  })
}

const getChildFilterItemIds = function(filterItems, filterItemId){
  let childFilterIds = []
  filterItems.forEach((item)=>{
    if(item.id === filterItemId){
      const flattenedFilterItems = this.filterHelpers.flattenFilterItems([item])
      childFilterIds = flattenedFilterItems.map((filterItem)=>filterItem.id)
    }
    if(item.hasOwnProperty('items')){
      childFilterIds = childFilterIds.concat(this.filterHelpers.getChildFilterItemIds(item.items, filterItemId))
    }
  })
  return childFilterIds
}

const getParentFilterItemIds = function(filterItemId){
  const path = getPath(this.responseState.filters, filterItemId)
  if(path){
    return path.filter((p)=>p!==filterItemId)
  }
  return []
}

const getFilterId = function(filterItemId){
  const parentFilterItemIds = this.filterHelpers.getParentFilterItemIds(filterItemId)
  return parentFilterItemIds[0]
}

const clearAllFilters = function(){
  this.setRequestState((reqState)=>{
    reqState.filters = {}
    reqState.page = 1
    return reqState
  })
}

// ==== UTILITY METHODS ====


const flattenFilterItems = function(items){
  let children = [];
  const flattenItems = items.map(item => {
    if (item.items && item.items.length) {
      item.items = item.items.map((item)=>{
        return {...item, filterId: this.filterHelpers.getFilterId(item.id) }
      })
     children = [...children, ...item.items];
    }
    return item;
  });
  return flattenItems.concat(children.length ? this.filterHelpers.flattenFilterItems(children) : children);
}

function getPath(object, search) {
  if (object.id === search) return [object.id];
  else if ((object.items) || Array.isArray(object)) {
    let children = Array.isArray(object) ? object : object.items;
    for (let child of children) {
      let result = getPath(child, search);
      if (result) {
        if (object.id )result.unshift(object.id);
        return result;
      }
    }
  }
}

const getResponseHelpers = function(){
  const { 
    getFilters,
    getAppliedFilters,
    getAppliedFilterById,
    getFilterById,
    isFilterApplied
  } = this.filterHelpers
  return {
    getFilters,
    getAppliedFilterById,
    getAppliedFilters,
    getFilterById,
    isFilterApplied
  }
}

const getRequestHelpers = function(){
  const { applyFilter, clearFilter, clearAllFilters } = this.filterHelpers
  return {
    applyFilter,
    clearFilter,
    clearAllFilters
  }
}

export default {
  getFilters,
  getAppliedFilters,
  applyFilter,
  getFilterById,
  getAppliedFilterById,
  isFilterApplied,
  clearFilter,
  clearAllFilters,
  getRequestHelpers,
  getResponseHelpers,
  getParentFilterItemIds,
  getFilterId,
  flattenFilterItems,
  getChildFilterItemIds
};