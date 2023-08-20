import ProductListingPage from '../../index'
import PaginationHelpers from './helpers/pagination'
import { getFilterQueryString, getFiltersFromQueryString, getReplacementParam } from '../../../shared/helpers/common';
import queryStringManager from '../../../lib/queryStringManager';
import { REQUEST_FORMAT } from '../../../shared/constants';
import PlatformHelpers from '../../../shared/platform-helpers';

class ShopifyProductListingPage extends ProductListingPage {
  constructor() {
    super()
    this.paginationHelpers = this.bindThisToHelpers(PaginationHelpers);
  }

  platformHelper() {
    return PlatformHelpers.ProductListingPage.new(this.requestState, this.responseState)
  }

  apiClient() {
    return PlatformHelpers.apiClient()
  }

  resetPagination(requestState) {
    requestState.startCursor = null
    requestState.endCursor = null
  }

  getDefaultRequestState = (): any => {
    return {
      product_listing_page_id: "",
      filters: {},
      perPage: 16,
      sort: null,
      startCursor: null,
      endCursor: null
    }
  }

  getDefaultResponseState = (): any => {
    return {
      total: null,
      products: [],
      filters: [],
      sort_options: [],
      page_info: {},
      filterInputs: {},
      filterRanges: {}
    }
  };

  async handleInitialRequest(requestOptions) {
    const dataForInitialRequest = await this.platformHelper().getDataForInitialRequest(requestOptions)
    this.setResponseState({
      ...this.responseState,
      filter_inputs: dataForInitialRequest.filter_inputs,
      price_ranges: dataForInitialRequest.price_ranges
    })
    this.setRequestState((reqState) => {
      reqState.filters = dataForInitialRequest.filtersForRequestParams
      return reqState
    }, false, false)
  }

  async call(initialRequestOptions: any) {
    const initialRequest = (Object.keys(this.responseState).length === 0)
    if (initialRequest) {
      await this.handleInitialRequest(initialRequestOptions)
      await super.call(initialRequestOptions)
      return
    }
    await super.call()
  }

  formatRequestParams(params, format) {
    return JSON.stringify({
      query: this.platformHelper().getQuery(),
      variables: this.platformHelper().getQueryVariables()
    })
  }

  getRequestOptions() {
    return {
      params: this.requestOptions.params,
      path: "graphql.json",
      format: REQUEST_FORMAT.GRAPHQL,
    }
  }

  formatResponse(response: any) {
    return this.platformHelper().formatResponse(this.requestOptions, response)
  }

  getRequestStateFromParams(params) {
    let paramsToInclude = {}
    if (params.startCursor) {
      paramsToInclude['startCursor'] = params.startCursor
    }
    if (params.endCursor) {
      paramsToInclude['endCursor'] = params.endCursor
    }
    if(params.sort_options){
      paramsToInclude['sort_options'] = params.sort_options
    }
    return {
      ...super.getRequestStateFromParams(params),
      ...paramsToInclude
    }
  }

  getRequestParams(state){
    let params = {
      ...super.getRequestParams(state)
    }
    if(state.sort_options){
      params['sort_options'] = state.sort_options
    }
    return params
  }


  getEncodedQueryString(except = []) {
    const {
      filterParameter: filterReplacement,
      startCursorParameter: startCursorReplacement,
      endCursorParameter: endCursorReplacement,
      sortParameter: sortReplacement
    } = queryStringManager.getConfiguration()

    const filters = this.requestState.filters
    let filtersForQueryParams = {}
    for (const [filterId, filterValues] of Object.entries(filters)) {
      // checkbox filter
      if (Array.isArray(filterValues)) {
        let formattedFilterValues = []
        filterValues.forEach((filterValue) => {
          formattedFilterValues.push(this.responseState.filter_inputs[filterValue].label)
        })
        filtersForQueryParams[filterId] = formattedFilterValues
      } else {
        filtersForQueryParams[filterId] = filterValues
      }
    }
    const sort = this.requestState.sort
    let params: any = {}
    const hasFilters = (Object.keys(filters).length !== 0)
    if (hasFilters) {
      params[filterReplacement] = getFilterQueryString(filtersForQueryParams)
    }
    if (this.requestState.startCursor) {
      params[startCursorReplacement] = this.requestState.startCursor
    }
    if (this.requestState.endCursor) {
      params[endCursorReplacement] = this.requestState.endCursor
    }
    if (sort && sort.length) {
      params[sortReplacement] = sort
    }
    except.forEach((paramToDelete) => {
      delete params[getReplacementParam(paramToDelete)]
    })
    return `${queryStringManager.stringify(params)}`;
  }

  getRequestParamsFromWindowLocation() {
    const queryString = window.location.search.replace("?", '')
    const parsedObjectFromQueryString = queryStringManager.parse(queryString.replace("?", ''))
    const { filterParameter, startCursorParameter, endCursorParameter, sortParameter } = queryStringManager.getConfiguration()
    let params = {}
    if (parsedObjectFromQueryString[filterParameter]) {
      params['filters'] = getFiltersFromQueryString(parsedObjectFromQueryString[filterParameter])
    }
    if (parsedObjectFromQueryString[startCursorParameter]) {
      params['startCursor'] = parsedObjectFromQueryString[startCursorParameter]
    }
    if (parsedObjectFromQueryString[endCursorParameter]) {
      params['endCursor'] = parsedObjectFromQueryString[endCursorParameter]
    }
    if (parsedObjectFromQueryString[sortParameter]) {
      params['sort'] = parsedObjectFromQueryString[sortParameter]
    }
    return params
  }

  async mutateResponse(formattedResponse: any) {
    return formattedResponse
  }

  static exporterName(){
    return 'ShopifyProductListingPage'
  }
}

export default ShopifyProductListingPage
