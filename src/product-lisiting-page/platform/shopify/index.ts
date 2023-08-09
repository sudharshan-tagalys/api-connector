import ShopifyAPI from '../../../lib/api/shopifyApi';
import ProductListingPage from '../../index'
import PaginationHelpers from './helpers/pagination'
import GraphqlQueryConstructor from './helpers/graphql-query-constructor'
import GraphqlResponseFormatter from './helpers/grapqhl-response-formatter'
import { getFilterQueryString, getFiltersFromQueryString, getReplacementParam } from '../../../shared/helpers/common';
import queryStringManager from '../../../lib/queryStringManager';
class ShopifyProductListingPage extends ProductListingPage {
  constructor() {
    super()
    this.paginationHelpers = this.bindThisToHelpers(PaginationHelpers);
  }

  apiClient() {
    return new ShopifyAPI()
  }

  resetPagination(requestState) {
    requestState.startCursor = null
    requestState.endCursor = null
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
      sort: "manual",
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

  async setFilterInputsOnInitialLoadIfRequired(requestOptions) {
    const initialRequest = (Object.keys(this.responseState).length === 0)
    if (initialRequest) {
      const filterInputsQuery = GraphqlQueryConstructor.getFilterInputsQuery()
      // const response = await this.apiClient().storefront.query(filterInputsQuery, {
      //   variables: requestOptions.params.variables
      // })
      const response = await this.apiClient().storefront.query(filterInputsQuery, {
        variables: {
          id: `gid://shopify/Collection/${requestOptions.params.product_listing_page_id}`
        }
      })
      const filterInputs = GraphqlResponseFormatter.getFilterInputs(response.collection.products.filters)
      this.setResponseState({
        ...this.responseState,
        filter_inputs: filterInputs
      })
    }
  }

  async call(requestOptions: any) {
    // HACK: WE CAN'T DIRECTLY GET THE FILTER INPUTS FROM QUERY PARAMS
    await this.setFilterInputsOnInitialLoadIfRequired(requestOptions)
    await super.call()
  }

  getRequestParams(state) {
    const graphqlQueryConstructor = new GraphqlQueryConstructor(state, this.responseState.filter_inputs)
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

  getRequestStateFromParams(params){
    let cursorBasedPaginationParams = {}
    if(params.startCursor){
      cursorBasedPaginationParams['startCursor'] = params.startCursor
    }
    if(params.endCursor){
      cursorBasedPaginationParams['endCursor'] = params.endCursor
    }
    return {
      ...super.getRequestStateFromParams(params),
      ...cursorBasedPaginationParams
    }
  }

  getEncodedQueryString(except = []){
    const {
      filterParameter: filterReplacement,
      startCursorParameter: startCursorReplacement,
      endCursorParameter: endCursorReplacement,
      sortParameter: sortReplacement
     } = queryStringManager.getConfiguration()

    const filters = this.requestState.filters
    const sort = this.requestState.sort
    let params: any = {}
    const hasFilters = (Object.keys(filters).length !== 0)
    if(hasFilters){
      params[filterReplacement] = getFilterQueryString(filters)
    }
    if(this.requestState.startCursor){
      params[startCursorReplacement] = this.requestState.startCursor
    }
    if(this.requestState.endCursor){
      params[endCursorReplacement] = this.requestState.endCursor
    }
    if(sort && sort.length){
      params[sortReplacement] = sort
    }
    except.forEach((paramToDelete) => {
      delete params[getReplacementParam(paramToDelete)]
    })
    return  `${queryStringManager.stringify(params)}`;
  }

  getRequestParamsFromWindowLocation(){
    const queryString = window.location.search.replace("?", '')
    const parsedObjectFromQueryString = queryStringManager.parse(queryString.replace("?", ''))
    const { queryParameter, queryFilterParameter, filterParameter, startCursorParameter, endCursorParameter, sortParameter } =  queryStringManager.getConfiguration()
    let params = {}
    if(parsedObjectFromQueryString[queryParameter]){
      params['query'] = parsedObjectFromQueryString[queryParameter]
    }
    if(parsedObjectFromQueryString[queryFilterParameter]){
      params['queryFilters'] = getFiltersFromQueryString(parsedObjectFromQueryString[queryFilterParameter])
    }
    if(parsedObjectFromQueryString[filterParameter]){
      params['filters'] = getFiltersFromQueryString(parsedObjectFromQueryString[filterParameter])
    }
    if(parsedObjectFromQueryString[startCursorParameter]){
      params['startCursor'] = parsedObjectFromQueryString[startCursorParameter]
    }
    if(parsedObjectFromQueryString[endCursorParameter]){
      params['endCursor'] = parsedObjectFromQueryString[endCursorParameter]
    }
    if(parsedObjectFromQueryString[sortParameter]){
      params['sort'] = parsedObjectFromQueryString[sortParameter]
    }
    return params
  }

}

export default ShopifyProductListingPage
