const getFilters = function () {
  return this.responseState.filters
}

const getFlattenedAppliedFilters = function(){
  const responseState = deepClone(this.responseState)
  const flattenedFilterItems = this.filterHelpers.flattenFilterItems(responseState.filters);
  const appliedFilterItems = flattenedFilterItems.filter((filter)=>{
    if(filter.hasOwnProperty('selected')){
      return (filter.selected)
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
      filterItems = appliedFilter
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
    }
    reqState.filters[filterId] = filterItems;
    reqState.page = 1
    return reqState
  }, callAPI)
}

const applyFilter = function(filterId, appliedFilter){
  this.filterHelpers.setFilter(filterId, appliedFilter, true)
}

const getFilterById = function(filterId){
  const responseState = deepClone(this.responseState)
  const flattenedFilterItems = this.filterHelpers.flattenFilterItems(responseState.filters);
  const filter = flattenedFilterItems.find((filter)=>filter.id === filterId)
  if(!filter) return false
  return filter
}

const getFilterItemById = function(filterItemId){
  return this.filterHelpers.getFilterById(filterItemId)
}

const isFilterItemApplied = function(id){
  const appliedFilters = this.filterHelpers.getFlattenedAppliedFilters()
  const appliedFilter = appliedFilters.find((filter)=>{
    if(filter.type === 'range'){
      return (filter.id === id)
    }
    if(filter.filterId){
      return (filter.filterId === id)
    }
    return (filter.id === id)
  })
  if(appliedFilter) return true
  return false
}

const clearFilter = function(filterId, filterItemIds = []){
  const responseState = deepClone(this.responseState)
  this.setRequestState((reqState)=>{
    if(Array.isArray(filterItemIds)){
      if(filterItemIds.length === 0){
        delete reqState.filters[filterId]
      }else{
        filterItemIds.forEach((filterItemId)=>{
          if(reqState.filters[filterId]){
            const childFilterItemIds = this.filterHelpers.getChildFilterItemIds(responseState.filters, filterItemId)
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

const getParentFilterItemIds = function(filterItemId){
  const responseState = deepClone(this.responseState)
  const path = getPath(responseState.filters, filterItemId)
  if(path){
    return path.filter((p)=>p!==filterItemId)
  }
  return []
}

const getFilterId = function(filterItemId){
  const parentFilterItemIds = this.filterHelpers.getParentFilterItemIds(filterItemId)
  return parentFilterItemIds[0]
}

// ==== PUBLICLY EXPOSED HELPERS ====

const getResponseHelpers = function(){
  const {
    getFilters,
    getFlattenedAppliedFilters,
    getFilterById,
    getFilterItemById,
    isFilterItemApplied,
    getAppliedFilters,
  } = this.filterHelpers
  return {
    getFilters,
    getAppliedFilters,
    getFlattenedAppliedFilters,
    getFilterById,
    getFilterItemById,
    isFilterItemApplied
  }
}

const getRequestHelpers = function(){
  const { applyFilter, setFilter, clearFilter, clearAllFilters } = this.filterHelpers
  return {
    applyFilter,
    setFilter,
    clearFilter,
    clearAllFilters
  }
}

const deepClone = (data) => JSON.parse(JSON.stringify(data))


export default {
  getFilters,
  getFlattenedAppliedFilters,
  applyFilter,
  getFilterById,
  getFilterItemById,
  isFilterItemApplied,
  clearFilter,
  clearAllFilters,
  setFilter,
  getRequestHelpers,
  getResponseHelpers,
  getParentFilterItemIds,
  getFilterId,
  flattenFilterItems,
  getChildFilterItemIds,
  getAppliedFilters
};