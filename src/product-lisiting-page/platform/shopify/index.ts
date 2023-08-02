import ShopifyAPI from '../../../lib/api/shopifyApi';
import ProductListingPage from '../../index'
import PaginationHelpers from './helpers/pagination'
import GraphqlQueryConstructor from './helpers/graphql-query-constructor'
import GraphqlResponseFormatter from './helpers/grapqhl-response-formatter'

class ShopifyProductListingPage extends ProductListingPage {
  constructor() {
    super()
    this.paginationHelpers = this.bindThisToHelpers(PaginationHelpers);
  }

  apiClient() {
    return new ShopifyAPI()
  }

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
      sort: "trending",
      startCursor: null,
      endCursor: null
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
      pageInfo: {},
      filterInputs: {},
      filterRanges: {}
    }
  };

  getRequestParams(state) {
    const graphqlQueryConstructor = new GraphqlQueryConstructor(state, this.responseState)
    return {
      query: graphqlQueryConstructor.getQuery(),
      variables: graphqlQueryConstructor.getQueryVariables()
    }
  }

  getRequestOptions() {
    return {
      params: this.requestOptions.params,
      path: "/",
      format: "GRAPHQL",
    }
  }


  formatResponse(response: any, params = {}) {
    const graphqlResponseFormatter = new GraphqlResponseFormatter(this.requestState, response)
    return graphqlResponseFormatter.format()
  }
}

export default ShopifyProductListingPage
