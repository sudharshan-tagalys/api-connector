import APIConnector from "../lib/apiConnector"
import FilterHelpers from './helpers/filter';
import SearchHelpers from './helpers/search';
import PaginationHelpers from './helpers/pagination'
import SortOptionHelpers from './helpers/sortOption'
import ProductHelpers from './helpers/product'
import { DEFAULT_REQUEST_OPTIONS } from "../shared/constants";
import { getEncodedQueryString, getRequestParamsFromQueryString, getRequestParamsFromWindowLocation } from "../shared/helpers/common";

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
    const productSkus = response["details"].map((product) => product.sku)
    let eventDetails = {
      pl_type: 'search',
      pl_details: {
        q: this.requestState.query,
        qm: this.requestState.queryMode,
        f: this.requestState.filters
      },
      pl_products: productSkus,
      pl_page: this.requestState.page,
      pl_total: productSkus.length
    }
    if(this.getSortString().length){
      eventDetails['pl_sort'] = this.getSortString()
    }
    return {
      event_type: "product_list",
      event_details: eventDetails
    }
  }

  formatResponse(response: any) {  
    return this.responseFormatter.search(response)
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
    if(this.getSortString().length){
      params['sort'] = this.getSortString()
    }
    return params
  }

  getSortString(){
    const { sortField, sortDirection } = this.requestState;
    if(sortField){
      if(sortDirection){
        return `${sortField}-${sortDirection}`
      }else{
        return sortField
      }
    }
    return ''
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

  getQueryStringHelpers(){
    return {
      getEncodedQueryString: this.getEncodedQueryString.bind(this),
      getRequestParamsFromQueryString: (queryString) => getRequestParamsFromQueryString(queryString),
      getRequestParamsFromWindowLocation: () => getRequestParamsFromWindowLocation()
    }
  }

  internalSuccessCallback(_, formattedResponse){
    this.setResponseState(formattedResponse)
  }

  getHelpersToExpose(type = 'request'){
    const functionToCall = type === 'request' ? 'getRequestHelpers' : 'getResponseHelpers'
    let helpers = {
      ...this.paginationHelpers[functionToCall](),
      ...this.searchHelpers[functionToCall](),
      ...this.getQueryStringHelpers()
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