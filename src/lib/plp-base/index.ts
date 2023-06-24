import APIConnector from "../apiConnector"
import FilterHelpers from './helpers/filter';
import PaginationHelpers from './helpers/pagination'
import SortOptionHelpers from './helpers/sortOption'
import ProductHelpers from './helpers/product'
import {
  getEncodedQueryString,
  getRequestParamsFromQueryString,
  getRequestParamsFromWindowLocation
} from "../../shared/helpers/common";

class Base extends APIConnector {
  // == HELPERS ==
  public filterHelpers;
  public paginationHelpers;
  public sortOptionHelpers;
  public productHelpers;

  getDefaultRequestState(): any {
    return {}
  }
  getDefaultResponseState(): any {
    return {}
  }
  // == STATE ==
  public requestState = this.getDefaultRequestState()
  public responseState = this.getDefaultResponseState()

  constructor(){
    super()
    this.filterHelpers = this.bindThisToHelpers(FilterHelpers)
    this.paginationHelpers = this.bindThisToHelpers(PaginationHelpers);
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

  postSuccessCallback(response, formattedResponse) {
    this.setResponseState({
      action: ""
    })
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

  getParamsFromRequestState(){
    return this.getRequestParams(this.requestState)
  }

  getSortString(){
    const { sort } = this.requestState;
    if (sort) {
      return sort
    }
    return ''
  }

  internalSuccessCallback(_, formattedResponse){
    this.setResponseState(formattedResponse)
  }

  getHelpers(type) {
    const functionToCall = (type === 'request' ? 'getRequestHelpers' : 'getResponseHelpers')
    let helpers = {
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

  getHelpersToExpose(response, formattedResponse){
    return {
      ...super.getHelpersToExpose(response, formattedResponse),
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

  new(requestOptions) {
    this.requestOptions = requestOptions
    let requestState : any = this.getDefaultRequestState()
    if(this.requestOptions.hasOwnProperty('params')){
      requestState = this.getRequestStateFromParams(this.requestOptions.params);
    }else {
      const params = getRequestParamsFromWindowLocation()
      requestState = this.getRequestStateFromParams(params)
    }
    if(Object.keys(requestState).length){
      this.requestState = requestState
    }else{
      console.error("Something went wrong in the request state")
    }
    // this.setRequestParamsFromRequestState()
    return this.getHelpersToExpose(false, false)
  }

  getEncodedQueryString(except = []){
    return getEncodedQueryString({
      filters: this.requestState.filters,
      page: this.requestState.page,
      sort: this.requestState.sort,
      except: except
    })
  }

  getRequestStateFromParams(params){
    let requestState = {}
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
  getRequestParams(state){
    const {
      filters,
      request,
      page,
      perPage,
    } = state;
    let params: any = {}
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
    if(this.getSortString().length){
      params['sort'] = this.getSortString()
    }
    return params
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
    }
  }
}

export default Base