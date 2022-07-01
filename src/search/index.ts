import APIConnector from "../lib/apiConnector"
import FilterHelpers from './helpers/filter';
import SearchHelpers from './helpers/search';
import PaginationHelpers from './helpers/pagination'
import SortOptionHelpers from './helpers/sortOption'
import ProductHelpers from './helpers/product'
import { DEFAULT_REQUEST_CALLBACKS } from "../shared/constants";
import { getEncodedQueryString, getRequestParamsFromQueryString, getRequestParamsFromWindowLocation } from "../shared/helpers/common";
import localStorage from "../lib/localStorage"

const DEFAULT_REQUEST_STATE =  {
  query: "",
  queryMode: "",
  filters: {},
  queryFilters: {},
  request: ['details', 'filters', 'sort_options'],
  page: 1,
  perPage: 16,
  sort: "trending"
}

const DEFAULT_RESPONSE_STATE = {
  query: "",
  total_pages: null,
  page: null,
  total: null,
  query_original: null,
  query_mode: null,
  products: [],
  filters: [],
  sort_options: []
};

class Search extends APIConnector {
  // == HELPERS ==
  public filterHelpers;
  public paginationHelpers;
  public searchHelpers;
  public sortOptionHelpers;
  public productHelpers;

  // == STATE ==
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

  static exporterName(){
    return 'Search'
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

  setRequestState(mutationCallback, callAPI = true){
    const newRequestState = mutationCallback(this.requestState);
    this.requestState = newRequestState;
    if(this.requestOptions.onStateChange){
      this.requestOptions.onStateChange(this.requestState)
    }
    this.setRequestParamsFromRequestState()
    callAPI && this.call(this.requestOptions)
  }

  addToRecentSearch() {
    const requestParams: any= getRequestParamsFromWindowLocation()
    const recentSearches: any = localStorage.getItem("tagalysRecentSearches") || { queries: [] }
    recentSearches.queries = recentSearches.queries.concat([{
      displayString: requestParams.query,
      queryString: getEncodedQueryString(requestParams)
    }])
    localStorage.setValue("tagalysRecentSearches", recentSearches, 3600000)
  }

  getRequestOptions() {
    return {
      path: 'search',
      params: this.requestOptions.params,
    }
  }

  extractAnalyticsData(response) {
    let eventDetails = {
      pl_type: 'search',
      pl_details: {
        q: this.requestState.query,
        qm: this.requestState.queryMode,
        f: this.requestState.filters
      },
      pl_page: this.requestState.page,
    }
    if(response.details){
      eventDetails['pl_products'] = response["details"].map((product) => product.sku)
      eventDetails['pl_total'] = response["details"].length
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
      requestState['page'] = params.page
    }
    if (params.perPage) {
      requestState["perPage"] = params.perPage
    }
    if(params.sort){
      requestState['sort'] = params.sort
    }
    return {
      ...DEFAULT_REQUEST_STATE,
      ...requestState
    }
  }

  getParamsFromRequestState(){
    return this.getRequestParams(this.requestState)
  }

  getRequestParams(state){
    const {
      query,
      queryMode,
      queryFilters,
      filters,
      request,
      page,
      perPage,
    } = state;
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
      params['f'] = this.getFilterParams(filters)
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
    if(this.getSortString().length){
      params['sort'] = this.getSortString()
    }
    return params
  }

  getFilterParams(filters: object){
    let filterParamsForRequest = {}
    for (const [filterId, filterParams] of Object.entries(filters)) {
      if(Array.isArray(filterParams)){
        let parentIdsToRemove = []
        filterParams.forEach((appliedFilterItemId)=>{
          const parentFilterItemIds = this.filterHelpers.getParentFilterItemIds(appliedFilterItemId)
          parentIdsToRemove = parentIdsToRemove.concat(parentFilterItemIds)
        })
        filterParamsForRequest[filterId] = filterParams.filter((appliedFilterItemId)=>!parentIdsToRemove.includes(appliedFilterItemId))
      }else{
        filterParamsForRequest[filterId] = filterParams
      }
    }
    return filterParamsForRequest
  }

  getSortString(){
    const { sort } = this.requestState;
    if (sort) {
      return sort
    }
    return ''
  }

  isRequested(requestItem){
   return this.requestState.request.includes(requestItem)
  }

  getEncodedQueryString(except = []){
    return getEncodedQueryString({
      query: this.requestState.query,
      queryFilter: this.requestState.queryFilters,
      filter: this.requestState.filters,
      page: this.requestState.page,
      sort: this.requestState.sort,
      except: except
    })
  }

  commonHelpers(){
    return {
      getEncodedQueryString: (except = []) => this.getEncodedQueryString.call(this, except),
      getRequestParamsFromQueryString: (queryString) => getRequestParamsFromQueryString(queryString),
      getRequestParamsFromWindowLocation: () => getRequestParamsFromWindowLocation(),
      getRequestState: () => this.requestState,
      getResponseState: () => this.responseState,
      addToRecentSearch: () => this.addToRecentSearch()
    }
  }

  internalSuccessCallback(_, formattedResponse){
    this.setResponseState(formattedResponse)
  }

  getHelpersToExpose(type = 'request'){
    const functionToCall = (type === 'request' ? 'getRequestHelpers' : 'getResponseHelpers')
    let helpers = {
      ...this.searchHelpers[functionToCall](),
      ...this.filterHelpers[functionToCall](),
      ...this.sortOptionHelpers[functionToCall](),
      ...this.productHelpers[functionToCall](),
      ...this.paginationHelpers[functionToCall](),
      ...this.commonHelpers(),
    }
    if(type === 'request'){
      helpers = {
        ...helpers,
        setParams: (params) => {
          const requestState : any = this.getRequestStateFromParams(params);
          if(Object.keys(requestState).length){
            this.requestState = requestState
          }
          this.setRequestParamsFromRequestState()
        }
      }
    }
    return helpers
  }

  setRequestParamsFromRequestState(){
    this.requestOptions.params = this.getParamsFromRequestState();
  }

  beforeAPICall(_: any) {
    const updatedState = this.requestOptions.beforeAPICall(this.requestState)
    return this.getRequestParams(updatedState)
  }

  new(requestOptions){
    this.requestOptions = requestOptions
    const requestState : any = this.getRequestStateFromParams(this.requestOptions.params);
    if(Object.keys(requestState).length){
      this.requestState = requestState
    }
    this.setRequestParamsFromRequestState()
    return this.getHelpersToExpose('request')
  }
}

export default Search