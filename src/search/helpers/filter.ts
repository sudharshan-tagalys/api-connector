
// ====== PUBLICLY EXPOSED HELPERS =======

import { omit } from "../../shared/helpers/common"

const getFilters = function(){
  return this.responseState.filters
}

const getAppliedFilters = function(){
  return getAppliedFilterItems(this.responseState.filters)
}

const applyFilter = function(filterId, filterItemsToApply){
  this.setRequestState((reqState)=>{
    let filter = (reqState.filters[filterId] || [])
    if(Array.isArray(filterItemsToApply)){
      filter = filter.concat(filterItemsToApply)
    }else{
      filter.push(filterItemsToApply)
    }
    reqState.filters[filterId] = filter;
    return reqState
  })
}

const getFilterById = function(filterId){
  const flattenedFilterItems = flattenFilterItems(this.responseState.filters);
  const filter = flattenedFilterItems.find((filter)=>filter.id === filterId)
  if(!filter) return false 
  return filter
}

const getAppliedFilterById = function(filterId){
  const appliedFilters = getAppliedFilters.call(this)
  const appliedFilter = appliedFilters.find((filter)=>filter.id === filterId)
  if(!appliedFilter) return false
  return appliedFilter
}

const isFilterApplied = function(filterId){
  const appliedFilter = getAppliedFilterById.call(this, filterId)
  if(appliedFilter) return true
  return false
}

const clearFilter = function(filterId, filterItemIds = []){
  this.setRequestState((reqState)=>{
    if(filterItemIds.length === 0){
      delete reqState.filters[filterId]
    }else{
      reqState.filters[filterId] = reqState.filters[filterId].filter((filterItemId)=>!filterItemIds.includes(filterItemId))
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

// ==== UTILITY METHODS ====

const flattenFilterItems = function(items, flattenedItems = []){
  items.forEach((item)=>{
    if(item.hasOwnProperty('items')){
      flattenedItems.push(omit(item, 'items'))
      flattenedItems.concat(flattenFilterItems(item.items, flattenedItems))
    }else{
      flattenedItems.push(item);
    }
  })
  return flattenedItems
}

const getAppliedFilterItems = function(items){
  const flattenedFilterItems = flattenFilterItems(items);
  const appliedFilterItems = flattenedFilterItems.filter((filter)=>filter.selected)
  return appliedFilterItems
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