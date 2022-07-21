import {
  getEncodedQueryString,
  getRequestParamsFromQueryString,
  getRequestParamsFromWindowLocation
} from "../shared/helpers/common";
import Base from "../lib/plp-base"

class ProductListingPage extends Base {
  // == HELPERS ==
  getDefaultRequestState = () => {
    return {
      product_listing_page_id: "",
      filters: {},
      request: [
        'details',
        'filters',
        'sort_options',
        'variables',
        'banners'
      ],
      page: 1,
      perPage: 16,
      sort: ""
    }
  }

  getDefaultResponseState = () => {
    return {
      name: "",
      total_pages: null,
      page: null,
      total: null,
      products: [],
      filters: [],
      sort_options: [],
      // TODO: do we need to consider banners and variables?
      banners: [],
      variants: [],
    }
  };

  static exporterName(){
    return 'ProductListingPage'
  }

  getRequestOptions() {
    console.log(this.requestOptions.params)
    return {
      path: `mpages/${this.requestOptions.params.product_listing_page_id}`,
      params: this.requestOptions.params,
    }
  }

  extractAnalyticsData(response) {
    if(response === false){
      return {}
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
    return this.responseFormatter.productListingPage(response)
  }

  setRequestParamsFromRequestState(){
    this.requestOptions.params = {
      ...this.getParamsFromRequestState(),
      product_listing_page_id: this.requestOptions.params.product_listing_page_id
    }
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

  getEncodedQueryString(except = []){
    return getEncodedQueryString({
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
    }
  }

}

export default ProductListingPage