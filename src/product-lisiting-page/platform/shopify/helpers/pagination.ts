import { ACTIONS as FILTER_ACTIONS } from "../../../../lib/plp-base/helpers/filter"
import { ACTIONS as SORT_OPTION_ACTIONS } from "../../../../lib/plp-base/helpers/sortOption"

const ACTIONS = {
  GO_TO_NEXT_PAGE: 'GO_TO_NEXT_PAGE',
  GO_TO_PREVIOUS_PAGE: 'GO_TO_PREVIOUS_PAGE',
}

const hasNextPage = function () {
  return this.responseState.page_info.hasNextPage
}

const getCurrentPage = function(){
  return this.responseState.page
}


const hasPreviousPage = function () {
  return this.responseState.page_info.hasPreviousPage
}

const goToNextPage = function (cursor) {
  if (!this.paginationHelpers.hasNextPage()) {
    console.error('Max pages reached')
    return false
  }
  this.setRequestState((reqState) => {
    reqState.action = ACTIONS.GO_TO_NEXT_PAGE
    reqState.startCursor = null
    reqState.endCursor = cursor ? cursor : this.responseState.page_info.endCursor
    return reqState
  })
}

const goToPreviousPage = function(cursor = null){
  if (!this.paginationHelpers.hasPreviousPage()) {
    console.error("Min pages reached")
    return false
  }
  this.setRequestState((reqState) => {
    reqState.action = ACTIONS.GO_TO_PREVIOUS_PAGE
    reqState.startCursor = (cursor ? cursor : this.responseState.page_info.startCursor)
    reqState.endCursor = null
    return reqState
  })
}

const canResetPagination = function(){
  const actionsToResetPagination = [
    FILTER_ACTIONS.APPLY_FILTER,
    FILTER_ACTIONS.CLEAR_FILTER,
    FILTER_ACTIONS.CLEAR_ALL_FILTERS,
    SORT_OPTION_ACTIONS.APPLY_SORT_OPTION
  ]
  return actionsToResetPagination.includes(this.requestState.action)
}

// ==== PUBLICLY EXPOSED HELPERS ====

const getRequestHelpers = function(){
  const { goToNextPage, goToPreviousPage, canResetPagination } = this.paginationHelpers
  return {
    goToNextPage,
    canResetPagination,
    goToPreviousPage,
  }
}

const getResponseHelpers = function(){
  const { hasNextPage, hasPreviousPage, getCurrentPage } = this.paginationHelpers
  return {
    hasNextPage,
    hasPreviousPage,
    getCurrentPage
  }
}

export default {
  goToNextPage,
  goToPreviousPage,
  hasNextPage,
  hasPreviousPage,
  getRequestHelpers,
  canResetPagination,
  getResponseHelpers,
  getCurrentPage
}