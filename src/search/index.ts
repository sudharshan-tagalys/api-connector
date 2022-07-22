import SearchHelpers from './helpers/search';
import { recordRecentSearch, getEncodedQueryString } from "../shared/helpers/common";
import Base from "../lib/plp-base"

class Search extends Base {
  // == HELPERS ==
  public searchHelpers;

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

  constructor(){
    super()
    this.searchHelpers = this.bindThisToHelpers(SearchHelpers);
  }

  static exporterName(){
    return 'SearchResults'
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
      eventDetails['pl_details']['f'] = this.requestState.filters
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
    if(params.queryFilters){
      requestState['queryFilters'] = params.queryFilters
    }
    return {
      ...this.getDefaultRequestState(),
      ...super.getRequestStateFromParams(params),
      ...requestState
    }
  }

  getRequestParams(state){
    const {
      query,
      queryMode,
      queryFilters,
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
    return {
      ...params,
      ...super.getRequestParams(state)
    }
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
      ...super.commonHelpers(),
      recordRecentSearch: (queryString) => recordRecentSearch(queryString)
    }
  }

  getHelpers(type){
    const functionToCall = (type === 'request' ? 'getRequestHelpers' : 'getResponseHelpers')
    const baseHelpers = super.getHelpers(type)
    return {
      ...baseHelpers,
      ...this.searchHelpers[functionToCall](),
      hasNoSearchResults: ()=>{
        return (this.productHelpers.getTotalProductsCount() === 0 || this.responseState.hasOwnProperty("error"))
      }
    }
  }

}

export default Search