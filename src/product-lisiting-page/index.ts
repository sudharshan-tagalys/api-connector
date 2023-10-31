import Base from "../lib/plp-base"

class ProductListingPage extends Base {
  // == HELPERS ==
  getDefaultRequestState = () => {
    return {
      product_listing_page_id: "",
      filters: {},
      request: [
        'total',
        'results',
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
    return {
      path: `mpages/_platform/${this.requestOptions.params.product_listing_page_id}`,
      params: this.requestOptions.params,
    }
  }

  getHealthCheckDetails() {
    return ProductListingPage.getHealthCheckDetails()
  }

  static getHealthCheckDetails() {
    return {
      path: "mpages/_health"
    }
  }

  extractAnalyticsData(response) {
    if(response === false){
      return {}
    }
    let eventDetails = {
      pl_type: 'mpage-platform',
      pl_details: {
        url: this.requestOptions.params.product_listing_page_id,
        title: response.name
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

  getRequestParams(state){
    let params = {
      ...super.getRequestParams(state)
    }
    if(state.product_listing_page_id){
      params['product_listing_page_id'] = state.product_listing_page_id
    }
    if(state.sort_options){
      params['sort_options'] = state.sort_options
    }
    return params
  }

  getRequestStateFromParams(params){
    let state = {
      ...super.getRequestStateFromParams(params),
    }
    if(params.product_listing_page_id){
      state['product_listing_page_id'] = params.product_listing_page_id
    }
    return state
  }

  getHelpers(type) {
    return {
      ...super.getHelpers(type),
      hasNoProducts: () => {
        return this.productHelpers.getTotalProductsCount() === 0
      }
    }
  }

}

export default ProductListingPage