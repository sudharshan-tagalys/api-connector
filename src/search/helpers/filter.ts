const getFilters = function () {
  return this.responseState.filters
}

const getFlattenedAppliedFilters = function(){
  const responseState = deepClone(this.responseState)
  let appliedFilters = []
  responseState.filters.map((filter)=>{
    if(filter.type === 'range'){
      if(this.requestState['filters']){
        const selectedRangeFilter = this.requestState['filters'][filter.id]
        if(selectedRangeFilter && filter.selected_min && filter.selected_max){
          appliedFilters.push(filter)
        }
      }
    }else{
      const flattenedFilterItems = this.filterHelpers.flattenFilterItems(filter.items);
      const selectedFilterItems = flattenedFilterItems.filter((filter)=>{
        if(filter.hasOwnProperty('selected')){
          return (filter.selected)
        }
      })
      if(selectedFilterItems.length > 0){
        appliedFilters.push({
          ...filter,
          items: selectedFilterItems
        })
      }
    }
  })
  return appliedFilters
}

const getAppliedFilterItems = (items) =>
items.filter((item) => {
  if (item.items) item.items = getAppliedFilterItems(item.items);
  return item.selected;
});

const getAppliedFilters = function (){
  const responseState = deepClone(this.responseState)
  let appliedFilters = [];
  responseState.filters.map((filter) => {
    if(filter.type === 'range'){
      if(filter.selected_min){
        appliedFilters.push(filter)
      }
    }
    if (filter.items) {
      const appliedFilterItems = getAppliedFilterItems(filter.items);
      if (appliedFilterItems.length) {
        appliedFilters.push({
          ...filter,
          items: appliedFilterItems,
        });
      }
    }
  });
  return appliedFilters;
};

const setFilter = function (filterId, appliedFilter, callAPI = false) {
  const filter = this.filterHelpers.getFilterById(filterId)
  this.setRequestState((reqState) => {
    let filterItems = []
    if(filter.type === "range"){
      reqState.filters[filterId] = appliedFilter
    } else {
      filterItems = (reqState.filters[filterId] || [])
      if(Array.isArray(appliedFilter)){
        const updatedFilterItems = filterItems.concat(appliedFilter)
        const uniqueFilterItems = updatedFilterItems.filter((filterItem, index, arrayInstance) => arrayInstance.indexOf(filterItem) === index);
        filterItems = uniqueFilterItems;
      }else{
        if(!filterItems.includes(appliedFilter)){
          filterItems.push(appliedFilter)
        }
      }
      let parentIdsToRemove = []
      filterItems.forEach((appliedFilterItemId)=>{
        const parentFilterItemIds = this.filterHelpers.getParentFilterItemIds(filterId, appliedFilterItemId)
        parentIdsToRemove = parentIdsToRemove.concat(parentFilterItemIds)
      })
      reqState.filters[filterId] = filterItems.filter((appliedFilterItemId)=>!parentIdsToRemove.includes(appliedFilterItemId))
    }
    reqState.page = 1
    return reqState
  }, callAPI)
}

const applyFilter = function(filterId, appliedFilter){
  this.filterHelpers.setFilter(filterId, appliedFilter, true)
}

const getFilterById = function(filterId){
  const responseState = deepClone(this.responseState)
  const filter = responseState.filters.find((filter)=>filter.id === filterId)
  if(!filter) return false
  return filter
}

const getFilterItemById = function(filterId, filterItemId){
  const filter = this.filterHelpers.getFilterById(filterId);
  const filterItems = flattenFilterItems(filter.items)
  const filterItem = filterItems.find((filterItem)=>filterItem.id === filterItemId)
  if(!filterItem) return false
  return filterItem
}

const isFilterApplied = function(filterId){
  const appliedFilters =  this.filterHelpers.getFlattenedAppliedFilters()
  const appliedFilter = appliedFilters.find((filter)=>filter.id === filterId)
  if(appliedFilter) return true
  return false
}

const clearFilter = function(filterId, filterItemIds = []){
  this.setRequestState((reqState)=>{
    if(Array.isArray(filterItemIds)){
      if(filterItemIds.length === 0){
        delete reqState.filters[filterId]
      }else{
        filterItemIds.forEach((filterItemId)=>{
          if(reqState.filters[filterId]){
            const filter = this.filterHelpers.getFilterById(filterId)
            const childFilterItemIds = this.filterHelpers.getChildFilterItemIds(filter.items, filterItemId)
            const updatedFilterItemIds = reqState.filters[filterId].filter((filterItemId)=>!childFilterItemIds.includes(filterItemId))
            if(updatedFilterItemIds.length === 0){
              delete reqState.filters[filterId]
            }else{
              reqState.filters[filterId] = updatedFilterItemIds
            }
          }
        })
      }
    }else{
      this.filterHelpers.clearFilter(filterId, [filterItemIds])
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


const flattenFilterItems = function(items){
  let children = [];
  const flattenItems = items.map(item => {
    if (item.items && item.items.length) {
     children = [...children, ...item.items];
    }
    return item;
  });
  return flattenItems.concat(children.length ? this.filterHelpers.flattenFilterItems(children) : children);
}

const getPath = function(object, search) {
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


// ==== PUBLICLY EXPOSED HELPERS ====

const getResponseHelpers = function(){
  const {
    getFilters,
    getFlattenedAppliedFilters,
    getFilterById,
    getFilterItemById,
    isFilterApplied,
    getAppliedFilters,
  } = this.filterHelpers
  return {
    getFilters,
    getAppliedFilters,
    getFlattenedAppliedFilters,
    getFilterById,
    getFilterItemById,
    isFilterApplied
  }
}

const getRequestHelpers = function(){
  const { applyFilter, clearFilter, clearAllFilters } = this.filterHelpers
  return {
    applyFilter,
    setFilter,
    clearFilter,
    clearAllFilters
  }
}

const getParentFilterItemIds = function(filterId, filterItemId){
  const filter = this.filterHelpers.getFilterById(filterId)
  const path = getPath(filter.items, filterItemId)
  if(path){
    return path.filter((p)=>p!==filterItemId)
  }
  return []
}


const deepClone = (data) => JSON.parse(JSON.stringify(data))


export default {
  getFilters,
  getFlattenedAppliedFilters,
  applyFilter,
  getFilterById,
  getFilterItemById,
  clearFilter,
  clearAllFilters,
  getRequestHelpers,
  getResponseHelpers,
  flattenFilterItems,
  getChildFilterItemIds,
  getAppliedFilters,
  isFilterApplied,
  setFilter,
  getParentFilterItemIds
};