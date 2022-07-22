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
    console.log(this.requestOptions.params)
    return {
      path: `mpages/_platform/${this.requestOptions.params.product_listing_page_id}`,
      params: this.requestOptions.params,
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

  setRequestParamsFromRequestState(){
    this.requestOptions.params = {
      ...this.getParamsFromRequestState(),
      product_listing_page_id: this.requestOptions.params.product_listing_page_id
    }
  }

}

export default ProductListingPage