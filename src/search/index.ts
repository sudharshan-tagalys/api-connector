import APIConnector from "../lib/apiConnector"
import FilterHelpers from './helpers/filter';
import SearchHelpers from './helpers/search';
import PaginationHelpers from './helpers/pagination'
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
  pagination: {
    page: 1,
    perPage: 16
  },
  sort: {
    id: null,
    direction: null
  },
  cache: true,
}

class Search extends APIConnector {
  public filterHelpers;
  public paginationHelpers;
  public searchHelpers;
  public responseState = {
    filters: [],
    sortOptions: [],
    pagination: {
      page: null,
      total: null
    },
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
    this.requestOptions.onSuccess(this.responseFormatter.search(response))
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
    console.log(this.requestState)
    const { query, queryMode, queryFilters, filters, pagination, sort, cache, request } = this.requestState;
    console.log(pagination)
    let params: any = {
      q: query,
      qm: queryMode,
      qf: queryFilters,
      request: request,
      f: filters,
      page: pagination.page,
      per_page: pagination.perPage,
      cache: cache,
    }
    if(sort.id && sort.direction){
      params['sort'] = `${sort.id}-${sort.direction}`
    }
    return params
  }


  new(requestOptions){
    this.requestOptions = requestOptions
    const requestState : any = this.getRequestStateFromParams(this.requestOptions.params);
    if(Object.keys(requestState).length){
      this.requestState = requestState
    }
    return {
      ...this.filterHelpers,
      ...this.searchHelpers,
      ...this.paginationHelpers
    }
  }

  static defaultRequestOptions(){
    return {
      ...DEFAULT_REQUEST_OPTIONS
    }
  }
}

export default Search