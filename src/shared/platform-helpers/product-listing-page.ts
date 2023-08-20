import { API_VERSION } from './lib/common';
import GraphqlQueries from './lib/graphql-queries'
import ShopifyAPI from './lib/shopifyApi'
import GraphqlResponseFormatter from './lib/grapqhl-to-common-response-formatter';
import shopifyConfiguration from '../../lib/shopifyConfiguration';
import configuration from '../../lib/configuration';

const DEFAULT_SORT_OPTIONS = [
  {
    "id": "best-selling",
    "label": "Best selling",
  },
  {
    "id": "manual",
    "label": "Manual",
  },
  {
    "id": "created-desc",
    "label": "Newest",
  },
  {
    "id": "created-asc",
    "label": "Oldest",
  },
  {
    "id": "price-desc",
    "label": "Price descending",
  },
  {
    "id": "price-asc",
    "label": "Price ascending",
  },
  {
    "id": "title",
    "label": "Title",
  }
]

class ProductListingPage {
  private requestState
  private responseState
  private queries
  private graphqlResponseFormatter;

  constructor(requestState, responseState) {
    this.requestState = requestState;
    this.responseState = responseState
    this.queries = new GraphqlQueries()
    this.graphqlResponseFormatter = new GraphqlResponseFormatter()
  }

  getSortVariables() {
    const sortOptionToSortKeyMap = {
      'manual': {
        sortKey: "MANUAL",
        reverse: false
      },
      'best-selling': {
        sortKey: "BEST_SELLING",
        reverse: false
      },
      'created-desc': {
        sortKey: 'CREATED',
        reverse: true
      },
      'created-asc': {
        sortKey: 'CREATED',
        reverse: false
      },
      'price-desc': {
        sortKey: 'PRICE',
        reverse: true,
      },
      'price-asc': {
        sortKey: 'PRICE',
        reverse: false
      },
      'title': {
        sortKey: 'TITLE',
        reverse: false
      },
      'id': {
        sortKey: 'ID',
        reverse: false
      },
      'collection-default': {
        sortKey: 'COLLECTION_DEFAULT',
        reverse: false
      }
    }
    return sortOptionToSortKeyMap[this.requestState.sort]
  }

  getPaginationVariables() {
    let paginationVariables = {}
    if (this.requestState.endCursor) {
      paginationVariables['after'] = this.requestState.endCursor
      paginationVariables['first'] = this.requestState.perPage
    }
    if (this.requestState.startCursor) {
      paginationVariables['before'] = this.requestState.startCursor
      paginationVariables['last'] = this.requestState.perPage
    }
    if (!this.requestState.startCursor && !this.requestState.endCursor) {
      paginationVariables['first'] = this.requestState.perPage
    }
    return paginationVariables
  }

  getFilterVariables() {
    let filterVariables = {}
    if (Object.keys(this.requestState.filters).length) {
      let filtersToApply = []
      for (const [_, filterValues] of Object.entries(this.requestState.filters)) {
        const values: any = filterValues
        if (filterValues.hasOwnProperty("selected_min")) {
          filtersToApply.push({
            price: {
              min: parseFloat(filterValues['selected_min']),
              max: parseFloat(filterValues['selected_max'])
            }
          })
        } else {
          values.forEach((filterValue) => {
            if (this.responseState.filter_inputs && this.responseState.filter_inputs[filterValue]) {
              const selectedFilterValue = this.responseState.filter_inputs[filterValue]
              filtersToApply.push(JSON.parse(selectedFilterValue.input))
            }
          })
        }
      }
      filterVariables['filters'] = filtersToApply
    }
    return filterVariables
  }

  getMetafieldVariables() {
    if (!shopifyConfiguration.hasMetafields()) {
      return {
        product_metafields: [],
      }
    }
    const metafieldsToQuery = shopifyConfiguration.getMetafields()
    return {
      product_metafields: (metafieldsToQuery.products || []),
    }
  }

  getQueryVariables() {
    return {
      id: `gid://shopify/Collection/${this.requestState.product_listing_page_id}`,
      ...this.getSortVariables(),
      ...this.getPaginationVariables(),
      ...this.getFilterVariables(),
      ...this.getMetafieldVariables()
    }
  }

  getQuery() {
    return `
      query Collection(
        $id: ID,
        $first: Int,
        $last: Int,
        $before: String,
        $after: String,
        $sortKey: ProductCollectionSortKeys,
        $reverse: Boolean,
        $filters: [ProductFilter!],
        $product_metafields: [HasMetafieldsIdentifier!]!,
      ) @inContext(country: ${configuration.getCountryCode()}) {
        collection(id: $id){
          title
          handle
          products(first: $first, last: $last, after: $after, before: $before, sortKey: $sortKey, reverse: $reverse, filters: $filters) {
            filters {
              id
              label
              type
              values {
                id
                label
                count
                input
              }
            }
            edges{
              node{
                ${this.queries.getProductDetails()}
              }
            }
            pageInfo{
              hasNextPage
              hasPreviousPage
              endCursor
              startCursor
            }
          }
        }
      }
    `
  }

  static getFilterInputsQuery() {
    return `
    query Collection(
      $id: ID,
    ) {
      collection(id: $id){
        products(first: 1) {
          ${GraphqlQueries.getFilters()}
        }
      }
    }
    `
  }

  getRequestOptions() {
    return {
      path: "graphql.json",
      apiVersion: API_VERSION
    }
  }


  getSortOptions(requestOptions) {
    let sortOptions = (requestOptions.params.sort_options || DEFAULT_SORT_OPTIONS )
    sortOptions.forEach((sortOption: any) => {
      if (sortOption.id === this.requestState.sort) {
        sortOption.selected = true
      }else{
        sortOption.selected = false
      }
    })
    if(this.requestState.sort === null && sortOptions.length > 0){
      sortOptions[0].selected = true
    }
    return sortOptions
  }

  formatResponse(requestOptions, shopifyResponse) {
    return {
      name: shopifyResponse.collection.title,
      products: this.graphqlResponseFormatter.formatProducts(shopifyResponse.collection.products),
      filters: this.graphqlResponseFormatter.formatFilters(shopifyResponse.collection.products.filters, this.requestState.filters, this.responseState.price_ranges),
      sort_options: this.getSortOptions(requestOptions),
      page_info: shopifyResponse.collection.products.pageInfo,
      filter_inputs: GraphqlResponseFormatter.getFilterInputs(shopifyResponse.collection.products.filters)
    }
  }

  apiClient() {
    return new ShopifyAPI()
  }

  async getDataForInitialRequest(requestOptions) {
    const filterInputsQuery = ProductListingPage.getFilterInputsQuery()
    const response = await this.apiClient().call("POST", "graphql.json", {
      params: JSON.stringify({
        query: filterInputsQuery,
        variables: {
          id: `gid://shopify/Collection/${requestOptions.params.product_listing_page_id}`
        }
      })
    })
    const filterInputs = GraphqlResponseFormatter.getFilterInputs(response.collection.products.filters)
    const rangeFilter = response.collection.products.filters.find((filter) => filter.type === "PRICE_RANGE")
    let price_ranges = {}
    if (rangeFilter) {
      price_ranges = JSON.parse(rangeFilter.values[0].input).price
    }


    let filtersForRequestParams = {}
    for (const [filterId, appliedFilterValues] of Object.entries(this.requestState.filters)) {
      // checkbox filter
      const appliedFilter = response.collection.products.filters.find((filter) => filter.id === filterId)
      if (Array.isArray(appliedFilterValues)) {
        let formattedFilterValues = []
        appliedFilterValues.forEach((filterLabel) => {
          if (appliedFilter.type === "LIST" || appliedFilter.type === "BOOLEAN") {
            appliedFilter.values.forEach((filterValue) => {
              if (filterLabel === filterValue.label) {
                formattedFilterValues.push(filterValue.id)
              }
            })
          }
        })
        filtersForRequestParams[filterId] = formattedFilterValues
      } else {
        filtersForRequestParams[filterId] = appliedFilterValues
      }
    }

    return {
      filtersForRequestParams: filtersForRequestParams,
      filter_inputs: filterInputs,
      price_ranges: price_ranges
    }
  }

  helpersToExpose() {
    return {
      getQuery: () => this.getQuery(),
      getQueryVariables: () => this.getQueryVariables(),
      formatResponse: (requestOptions, shopifyResponse) => this.formatResponse(requestOptions, shopifyResponse),
      getFilterInputs: (filtersFromResponse) => GraphqlResponseFormatter.getFilterInputs(filtersFromResponse),
      getDataForInitialRequest: (requestOptions) => this.getDataForInitialRequest(requestOptions),
    }
  }

  static export() {
    return {
      ProductListingPage: {
        new: (requestState, responseState) => {
          const instance = new this(requestState, responseState)
          return instance.helpersToExpose()
        }
      }
    }
  }
}

export default ProductListingPage