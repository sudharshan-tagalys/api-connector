import APIConnector from "../lib/apiConnector"
import FilterHelpers from './helpers/filter';
import SearchHelpers from './helpers/search';
import PaginationHelpers from './helpers/pagination'
import SortOptionHelpers from './helpers/sortOption'

import { DEFAULT_REQUEST_OPTIONS, REQUEST_FORMAT } from "../shared/constants";

interface SearchRequestParams {
  query: string
  queryMode: string
  filters: Array<any>
  request: Array<string>
  cache: boolean
  queryFilter: Array<any>
  perPage: number
}

const DEFAULT_REQUEST_STATE =  {
  query: "",
  queryMode: "",
  filters: {},
  queryFilters: {},
  request: [],
  page: 1,
  perPage: 16,
  sortField: null,
  sortDirection: null,
  cache: true,
}

class Search extends APIConnector {
  public filterHelpers;
  public paginationHelpers;
  public searchHelpers;
  public sortOptionHelpers;
  public responseState = {
    filters: [],
    sort_options: [],
    page: null,
    total_pages: null,
    products: [],
    variables: [],
    banners: []
  };

  public requestState = DEFAULT_REQUEST_STATE

  constructor(){
    super()
    this.filterHelpers = this.bindThisToHelpers(FilterHelpers)
    this.paginationHelpers = this.bindThisToHelpers(PaginationHelpers);
    this.searchHelpers = this.bindThisToHelpers(SearchHelpers);
    this.sortOptionHelpers = this.bindThisToHelpers(SortOptionHelpers)
  }

  bindThisToHelpers(helpers: object){
    return Object.entries(helpers).reduce((acc, [actionName, action]) => {
      return {
          ...acc,
          [actionName]: action.bind(this)
        };
      },
      {}
    )
  }

  setResponseState(responseState){
    this.responseState = {
      ...this.responseState,
      ...responseState
    }
  }

  setRequestState(mutationCallback){
    const newRequestState = mutationCallback(this.requestState);
    console.log("NEW STATE", newRequestState)
    this.requestState = newRequestState;
    this.requestOptions.params = this.getParamsFromRequestState()
    this.call(this.requestOptions)
  }

  getRequestOptions() {
    return {
      path: 'search',
      params: this.requestOptions.params,
    }
  }

  static exporterName(){
    return 'Search'
  }

  extractAnalyticsData(response) {
    return response
  }

  onSuccessfulResponse(response) {
    const formattedResponse = this.responseFormatter.search(response)
    this.setResponseState(formattedResponse)
    this.requestOptions.onSuccess(formattedResponse, this.getHelpersToExpose())
  }

  getRequestStateFromParams(params){
    let requestState = {}
    if(params.query){
      requestState['query'] = params.query
    }
    if(params.queryMode){
      requestState['queryMode'] = params.queryMode
    }
    if(params.request){
      requestState['request'] = params.request
    }
    if(params.filters){
      requestState['filters'] = params.filters
    }
    if(params.page){
      requestState['pagination'] = {
        page: params.page
      }
    }
    if(params.perPage){
      requestState['pagination']['perPage'] = params.perPage
    }
    if(params.sort){
      const sort = params.sort.split("-")
      requestState['sort'] = {
        id: sort[0],
        direction: sort[1]
      } 
    }
    return {
      ...DEFAULT_REQUEST_STATE,
      ...requestState
    }
  }

  getParamsFromRequestState(){
    const {
      query,
      queryMode,
      queryFilters,
      filters,
      cache,
      request,
      page,
      perPage,
      sortField,
      sortDirection
    } = this.requestState;
    let params: any = {}
    if(query){
      params['q'] = query
    }
    if(queryMode){
      params['qm'] = queryMode
    }
    if(queryFilters){
      params['qf'] = queryFilters
    }
    if(filters){
      params['f'] = filters
    }
    if(request){
      params['request'] = request
    }
    if(page){
      params['page'] = page
    }
    if(perPage){
      params['per_page'] = perPage
    }
    if(cache){
      params['cache'] = cache
    }
    if(sortField && sortDirection){
      params['sort'] = `${sortField}-${sortDirection}`
    }
    return params
  }

  isRequested(requestItem){
   return this.requestState.request.includes(requestItem)
  }

  getHelpersToExpose(){
    let helpersToExpose = {
      ...this.paginationHelpers,
      ...this.searchHelpers,
      ...this.sortOptionHelpers
    }
    // if(this.isRequested('filters')){
      helpersToExpose = { ...helpersToExpose, ...this.filterHelpers }
    // }
    return helpersToExpose
  }

  new(requestOptions){
    this.requestOptions = requestOptions
    const requestState : any = this.getRequestStateFromParams(this.requestOptions.params);
    if(Object.keys(requestState).length){
      this.requestState = requestState
    }
    return this.getHelpersToExpose()
  }

  static defaultRequestOptions(){
    return {
      ...DEFAULT_REQUEST_OPTIONS
    }
  }
}

export default Search