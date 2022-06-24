
// ====== PUBLICLY EXPOSED HELPERS =======

import { flatten, getPath, omit } from "../../shared/helpers/common"

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
      // filter out the exisiting items
      filter = filter.concat(filterItemsToApply)
    }else{
      if(!filter.includes(filterItemsToApply)){
        filter.push(filterItemsToApply)
      }
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
      filterItemIds.forEach((filterItemId)=>{
        const childFilterItemIds = getChildFilterItemIds(this.responseState.filters, filterItemId)
        console.log("CHILD", childFilterItemIds)
        reqState.filters[filterId] = reqState.filters[filterId].filter((filterItemId)=>!childFilterItemIds.includes(filterItemId))
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
      const flattenedFilterItems = flattenFilterItems([item])
      childFilterIds = flattenedFilterItems.map((filterItem)=>filterItem.id)
    }
    if(item.hasOwnProperty('items')){
      childFilterIds = childFilterIds.concat(getChildFilterItemIds(item.items, filterItemId))
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

const clearAllFilters = function(){
  this.setRequestState((reqState)=>{
    reqState.filters = {}
    reqState.page = 1
    return reqState
  })
}

// ==== UTILITY METHODS ====

const flattenFilterItems = function(items){
  return flatten(items)
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
  getResponseHelpers,
  getParentFilterItemIds
};