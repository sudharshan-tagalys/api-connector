const getFilters = function(){
  return this.responseState.filters
}

const getAppliedFilters = function(){
  return getAppliedFilterItems(this.responseState.filters)
}

const flattenFilterItems = function(items){
  let appliedFilterItems = []
  items.forEach((item)=>{
    if(item.hasOwnProperty('items')){
      appliedFilterItems.concat(flattenFilterItems(item.items))
    }else{
      appliedFilterItems.push(item);
    }
  })
  return appliedFilterItems
}

const getAppliedFilterItems = function(items){
  const flattenedFilterItems = flattenFilterItems(items);
  return flattenedFilterItems.filter((filter)=>filter.selected)
}

const applyFilter = function(filterId, filterItemsToApply){
  this.setRequestState((reqState)=>{
    let filter = (reqState.filters[filterId] || [])
    if(Array.isArray(filterItemsToApply)){
      filter = filter.concat(filterItemsToApply)
    }else{
      filter = filter.push(filterItemsToApply)
    }
    reqState.filters[filterId] = filter;
    return reqState
  })
}
const getFilterById = function(filterId){
  const flattenedFilterItems = flattenFilterItems(this.responseState.filters);
  return flattenedFilterItems.find((filter)=> filter.id === filterId)
}

const getAppliedFilterById = function(filterId){
  const appliedFilters = getAppliedFilters.call(this)
  return appliedFilters.find((filter)=>filter.id === filterId)
}

const isFilterApplied = function(filterId){
  const appliedFilter = getAppliedFilterById.call(this)
  if(appliedFilter && Object.keys(appliedFilter).length){
    return true
  }
  return false
}

const clearFilter = function(filterId, filterItemIds = []){
  this.setRequestState((reqState)=>{
    if(filterItemIds.length === 0){
      delete reqState.filters[filterId]
    }else{
      reqState.filters[filterId] = reqState.filters[filterId].filter((filterItemId)=>filterItemIds.includes(filterItemId))
    }
    return reqState
  })
}

const clearAllFilters = function(){
  this.setRequestState((reqState)=>{
    reqState.filters = {}
    return reqState
  })
} 

export default {
  getFilters,
  getAppliedFilters,
  applyFilter,
  getFilterById,
  getAppliedFilterById,
  isFilterApplied,
  clearFilter,
  clearAllFilters
};