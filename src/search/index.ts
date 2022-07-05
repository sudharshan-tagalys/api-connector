import APIConnector from "../lib/apiConnector"
import FilterHelpers from './helpers/filter';
import SearchHelpers from './helpers/search';
import PaginationHelpers from './helpers/pagination'
import SortOptionHelpers from './helpers/sortOption'
import ProductHelpers from './helpers/product'
import { recordRecentSearch, getEncodedQueryString, getRequestParamsFromQueryString, getRequestParamsFromWindowLocation } from "../shared/helpers/common";


class Search extends APIConnector {
  // == HELPERS ==
  public filterHelpers;
  public paginationHelpers;
  public searchHelpers;
  public sortOptionHelpers;
  public productHelpers;

  getDefaultRequestState = () => {
    return {
      query: "",
      queryMode: "",
      filters: {},
      queryFilters: {},
      request: ['details', 'filters', 'sort_options'],
      page: 1,
      perPage: 16,
      sort: ""
    }
  }

  getDefaultResponseState = () => {
    return {
      query: "",
      total_pages: null,
      page: null,
      total: null,
      query_mode: null,
      products: [],
      filters: [],
      sort_options: []
    }
  };

  // == STATE ==
  public requestState = this.getDefaultRequestState()
  public responseState = this.getDefaultResponseState()

  constructor(){
    super()
    this.filterHelpers = this.bindThisToHelpers(FilterHelpers)
    this.paginationHelpers = this.bindThisToHelpers(PaginationHelpers);
    this.searchHelpers = this.bindThisToHelpers(SearchHelpers);
    this.sortOptionHelpers = this.bindThisToHelpers(SortOptionHelpers);
    this.productHelpers = this.bindThisToHelpers(ProductHelpers);
  }

  static exporterName(){
    return 'SearchResults'
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

  getRequestOptions() {
    return {
      path: 'search',
      params: this.requestOptions.params,
    }
  }

  extractAnalyticsData(response) {
    if(response === false){
      return {}
    }

    if(response.hasOwnProperty('error')){
      return false
    }
    if(response.hasOwnProperty('redirect_to_url')){
      return false
    }
    let eventDetails = {
      pl_type: 'search',
      pl_details: {
        q: response.query,
        qm: response.query_mode,
      },
      pl_products: [],
      pl_page: response.page,
      pl_total: response.total
    }
    if(Object.keys(this.requestState.filters).length){
      eventDetails['pl_details']['f'] = this.getFilterParams(this.requestState.filters)
    }
    if(response.details){
      eventDetails['pl_products'] = response["details"].map((product) => product.sku)
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
    if(params.queryFilters){
      requestState['queryFilters'] = params.queryFilters
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
      ...this.getDefaultRequestState(),
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
      queryFilters: this.requestState.queryFilters,
      filters: this.requestState.filters,
      page: this.requestState.page,
      sort: this.requestState.sort,
      except: except
    })
  }

  commonHelpers(){
    return {
      getEncodedQueryString: (requestParameters) => getEncodedQueryString(requestParameters),
      getEncodedQueryStringFromRequestState: (except = []) => this.getEncodedQueryString.call(this, except),
      getRequestParamsFromQueryString: (queryString) => getRequestParamsFromQueryString(queryString),
      getRequestParamsFromWindowLocation: () => getRequestParamsFromWindowLocation(),
      getRequestState: () => this.requestState,
      getRequestParams: () => this.requestState,
      getResponseState: () => this.responseState,
      recordRecentSearch: (queryString) => recordRecentSearch(queryString)
    }
  }

  internalSuccessCallback(_, formattedResponse){
    this.setResponseState(formattedResponse)
  }

  getHelpers(type){
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

  getHelpersToExpose(response = false){
    return {
      ...this.getHelpers('request'),
      ...this.getHelpers('response'),
      getAnalyticsData: () => this.extractAnalyticsData(response)
    }
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
    let requestState : any = this.getDefaultRequestState()
    if(this.requestOptions.hasOwnProperty('params')){
      requestState = this.getRequestStateFromParams(this.requestOptions.params);
    }else{
      const params = getRequestParamsFromWindowLocation()
      requestState = this.getRequestStateFromParams(params)
    }
    if(Object.keys(requestState).length){
      this.requestState = requestState
    }else{
      console.error("Something went wrong in the request state")
    }
    this.setRequestParamsFromRequestState()
    return this.getHelpersToExpose()
  }
}

export default Search