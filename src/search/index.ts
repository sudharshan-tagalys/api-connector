import APIConnector from "../lib/apiConnector"
import FilterHelpers from './helpers/filter';
import SearchHelpers from './helpers/search';
import PaginationHelpers from './helpers/pagination'
import SortOptionHelpers from './helpers/sortOption'
import ProductHelpers from './helpers/product'
import { DEFAULT_REQUEST_OPTIONS } from "../shared/constants";
import queryStringManager from "../lib/queryStringManager";
import { getEncodedQueryString } from "../shared/helpers/common";

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

const DEFAULT_RESPONSE_STATE = {
  filters: [],
  sort_options: [],
  page: null,
  total_pages: null,
  products: [],
  variables: [],
  banners: []
};

class Search extends APIConnector {
  public filterHelpers;
  public paginationHelpers;
  public searchHelpers;
  public sortOptionHelpers;
  public productHelpers;
  public requestState = DEFAULT_REQUEST_STATE
  public responseState = DEFAULT_RESPONSE_STATE

  constructor(){
    super()
    this.filterHelpers = this.bindThisToHelpers(FilterHelpers)
    this.paginationHelpers = this.bindThisToHelpers(PaginationHelpers);
    this.searchHelpers = this.bindThisToHelpers(SearchHelpers);
    this.sortOptionHelpers = this.bindThisToHelpers(SortOptionHelpers);
    this.productHelpers = this.bindThisToHelpers(ProductHelpers);
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
    this.requestOptions.onSuccess(formattedResponse, this.getHelpersToExpose('response'))
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
  
  getEncodedQueryString(){
    return getEncodedQueryString({
      query: this.requestState.query,
      queryFilter: this.requestState.queryFilters,
      filter: this.requestState.filters,
      page: this.requestState.page,
      sort: {
        field: this.requestState.sortField,
        direction: this.requestState.sortDirection
      }
    })
  }

  getHelpersToExpose(type){
    const functionToCall = type === 'request' ? 'getRequestHelpers' : 'getResponseHelpers'
    const queryStringHelpers = {
      getURLEncodedQueryString: this.getEncodedQueryString.bind(this)
    }
    let helpers = {
      ...this.paginationHelpers[functionToCall](),
      ...this.searchHelpers[functionToCall](),
      ...queryStringHelpers
    }
    if(this.isRequested('filters')){
      helpers = {
        ...helpers,
        ...this.filterHelpers[functionToCall]()
      }
    }
    if(this.isRequested('sort_options')){
      helpers = {
        ...helpers,
        ...this.sortOptionHelpers[functionToCall]()
      }
    }
    if(this.isRequested('details')){
      helpers = {
        ...helpers,
        ...this.productHelpers[functionToCall]()
      }
    }
    return helpers
  }

  new(requestOptions){
    this.requestOptions = requestOptions
    const requestState : any = this.getRequestStateFromParams(this.requestOptions.params);
    if(Object.keys(requestState).length){
      this.requestState = requestState
    }
    return this.getHelpersToExpose('request')
  }

  static defaultRequestOptions(){
    return {
      ...DEFAULT_REQUEST_OPTIONS
    }
  }
}

export default Search