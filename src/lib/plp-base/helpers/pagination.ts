import { ACTIONS as FILTER_ACTIONS } from "./filter"
import { ACTIONS as SORT_OPTION_ACTIONS } from "./sortOption"

export const ACTIONS = {
  GO_TO_NEXT_PAGE: 'GO_TO_NEXT_PAGE',
  GO_TO_PREVIOUS_PAGE: 'GO_TO_PREVIOUS_PAGE',
  GO_TO_PAGE: 'GO_TO_PAGE'
}

const getCurrentPage = function(){
  return this.responseState.page
}

const getTotalPages = function(){
  return this.responseState.total_pages
}

const hasNextPage = function () {
  const helpers = this.paginationHelpers
  const totalPages = helpers.getTotalPages()
  const nextPage = helpers.getCurrentPage() + 1
  if (typeof totalPages === 'number') return (nextPage <= totalPages)
  return true
}

const hasPreviousPage = function () {
  const helpers = this.paginationHelpers
  const previousPage = helpers.getCurrentPage() - 1
  return (previousPage > 0)
}

const goToNextPage = function () {
  if (!this.paginationHelpers.hasNextPage()) {
    console.error('Max pages reached')
    return false
  }
  this.setRequestState((reqState) => {
    reqState.page += 1
    reqState.action = ACTIONS.GO_TO_NEXT_PAGE
    return reqState
  })
}

const goToPreviousPage = function(){
  if (!this.paginationHelpers.hasPreviousPage()) {
    console.error("Min pages reached")
    return false
  }
  this.setRequestState((reqState) => {
    reqState.page -= 1
    reqState.action = ACTIONS.GO_TO_PREVIOUS_PAGE
    return reqState
  })
}

const goToPage = function (page, actionSrc = ACTIONS.GO_TO_PAGE) {
  this.setRequestState((reqState) => {
    reqState.page = page
    reqState.action = actionSrc
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
  const { goToNextPage, goToPreviousPage, goToPage, canResetPagination } = this.paginationHelpers
  return {
    canResetPagination,
    goToNextPage,
    goToPreviousPage,
    goToPage,
  }
}

const getResponseHelpers = function(){
  const { getCurrentPage, getTotalPages, hasNextPage, hasPreviousPage } = this.paginationHelpers
  return {
    getCurrentPage,
    getTotalPages,
    hasNextPage,
    hasPreviousPage
  }
}

export default {
  goToNextPage,
  goToPreviousPage,
  getCurrentPage,
  getTotalPages,
  hasNextPage,
  hasPreviousPage,
  goToPage,
  getRequestHelpers,
  getResponseHelpers,
  canResetPagination
}