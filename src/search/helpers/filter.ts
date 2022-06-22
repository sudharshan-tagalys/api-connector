
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
    reqState.page = 1
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
    reqState.page = 1
    return reqState
  })
}

const clearAllFilters = function(){
  this.setRequestState((reqState)=>{
    reqState.filters = {}
    reqState.page = 1
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
  getResponseHelpers
};