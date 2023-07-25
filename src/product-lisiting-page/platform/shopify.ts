import ProductListingPage from '../index'
import PaginationHelpers from './helpers/pagination'

class ShopifyProductListingPage extends ProductListingPage {
  constructor() {
    super()
    this.paginationHelpers = this.bindThisToHelpers(PaginationHelpers);
  }

  formatProducts(product_edges){
    return product_edges.map((product_edge)=>{
      console.log(this.formatProduct(product_edge.node))
      return this.formatProduct(product_edge.node)
    })
  }

  hasOnlyDefaultVariant(options, variants){
    if(options.length > 1){
      return false
    }
    if(variants.length > 1){
      return false
    }
    if(options[0] === 'Title' && variants[0].option1 === 'Default Title'  && variants[0].option2 === null && variants[0].option3 === null){
      return true
    }
    return false
  }

  formatProduct(product){
    const id = product.id.split("/").slice(-1)[0]
    return {
      available: product.availableForSale,
      compare_at_price: product.compareAtPriceRange.minVariantPrice.amount,
      compare_at_price_max: product.compareAtPriceRange.maxVariantPrice.amount,
      compare_at_price_min: product.compareAtPriceRange.minVariantPrice.amount,
      compare_at_price_varies: product.compareAtPriceRange.minVariantPrice.amount != product.compareAtPriceRange.maxVariantPrice.amount,
      handle: product.handle,
      // has_only_default_variant: this.hasOnlyDefaultVariant(product.options, product.variants),
      id: id,
      images: product.images.edges.map((image_edge, index)=>{
        const image = image_edge.node
        return {
          alt: image.altText,
          height: image.height,
          position: index + 1,
          src: image.url,
          width: image.width
        }
      }),
      metafields: {},
      options: product.options.map((option)=>option.name),
      options_with_values: product.options.map((option, index)=>{
        return {
          name: option.name,
          values: option.values
        }
      }),
      price: product.priceRange.minVariantPrice.amount,
      price_max: product.priceRange.maxVariantPrice.amount,
      price_min: product.priceRange.minVariantPrice.amount,
      price_varies: (product.priceRange.minVariantPrice.amount != product.priceRange.maxVariantPrice.amount),
      published_at: product.publishedAt,
      variants: [],
      vendor: product.vendor,
      __tagalys_fields: {
        image_url: product.featuredImage.url
      }

    }
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
      filterInputs: {}
    }
  };


  getSortOptions() {
    return [
      {
        "id": "trending",
        "label": "Most Relevant",
        "selected": (this.requestState.sort === "trending")
      },
      {
        "id": "last_received",
        "label": "Newest",
        "selected": (this.requestState.sort === "last_received"),
      },
      {
        "id": "sale_price-asc",
        "label": "Price Ascending",
        "selected": (this.requestState.sort === "sale_price-asc"),
      },
      {
        "id": "sale_price-desc",
        "label": "Price Descending",
        "selected": (this.requestState.sort === "sale_price-desc"),
      }
    ]
  }


  getFormattedFiltersAndInputs(filters) {
    let filterInputs = {}
    const formattedFilters = filters.map((filter) => {
      if (filter.type === "LIST") {
        const selectedFilter = this.requestState.filters[filter.id]
        return {
          id: filter.id,
          name: filter.label,
          type: "checkbox",
          items: filter.values.filter((filterItem)=>filterItem.count > 0).map((filterItem) => {
            filterInputs[filterItem.id] = filterItem.input
            const isSelected = (selectedFilter && selectedFilter.includes(filterItem.id))
            return ({
              id: filterItem.id,
              name: filterItem.label,
              count: filterItem.count,
              selected: isSelected ? true : false
            })
          })
        }
      } else {
        const parsedInput = JSON.parse(filter.values[0].input)
        filterInputs[filter.id] = filter.values[0].input
        return {
          id: filter.values[0].input,
          name: filter.label,
          type: "range",
          min: parsedInput.price.min,
          max: parsedInput.price.max,
        }
      }
    })
    return {
      formattedFilters: formattedFilters,
      filterInputs: filterInputs
    }
  }

  getQueryVariables(state) {
    state.perPage = 48
    let sortKey = "MANUAL"
    let reverse = false
    if (state.sort === "trending") {
      sortKey = "MANUAL"
    }
    if (state.sort === "last_received") {
      sortKey = "CREATED"
      reverse = true
    }
    if (state.sort === "sale_price-asc") {
      sortKey = "PRICE"
    }
    if (state.sort === "sale_price-desc") {
      sortKey = "PRICE"
      reverse = true
    }
    let variables = {
      sortKey: sortKey,
      reverse: reverse,
      id: 'gid://shopify/Collection/452577591598'
    }

    if (state.endCursor) {
      variables['after'] = state.endCursor
      variables['first'] = state.perPage
    }

    if (state.startCursor) {
      variables['before'] = state.startCursor
      variables['last'] = state.perPage
    }

    if (!state.startCursor && !state.endCursor) {
      variables['first'] = state.perPage
    }

    if (Object.keys(state.filters).length) {
      let filtersToApply = []
      for (const [_, filterValues] of Object.entries(state.filters)) {
        const values: any = filterValues
        values.forEach((filterValue) => {
          filtersToApply.push(JSON.parse(this.responseState.filterInputs[filterValue]))
        })
      }
      variables['filters'] = filtersToApply
    }
    return variables
  }

  getRequestParams(state) {
    let params = {}
    if (state.product_listing_page_id) {
      params['product_listing_page_id'] = state.product_listing_page_id
    }
    return {
      query: `
        query Collection($id: ID, $first: Int, $last: Int, $before: String, $after: String, $sortKey: ProductCollectionSortKeys, $reverse: Boolean, $filters: [ProductFilter!]) {
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
              edges {
                node {
                  id
                  title
                  handle
                  productType
                  vendor
                  tags
                  totalInventory
                  publishedAt
                  availableForSale
                  options{
                    id
                    name
                    values
                  }
                  featuredImage{
                    altText
                    height
                    url
                    width
                    id
                  }
                  images(first: 250, sortKey: POSITION){
                    edges{
                      node{
                        altText
                        height
                        url
                        width
                        id  
                      }
                    }
                  }
                  media(first: 250){
                    edges{
                      node{
                        alt
                        mediaContentType
                        ... on Video {
                          id
                          mediaContentType
                          alt
                          sources {
                            format
                            height
                            mimeType
                            width
                            url
                          }
                        }
                        ... on MediaImage{
                          id
                          mediaContentType
                          image{
                            id
                            altText
                            width
                            height
                            url
                          }
                        }
                        ... on ExternalVideo{
                          id
                          mediaContentType
                        }
                        ... on Model3d{
                          id
                          mediaContentType
                        }
                      }
                    }
                  }
                  priceRange{
                    minVariantPrice{
                      amount
                    }
                    maxVariantPrice{
                      amount
                    }
                  }
                  compareAtPriceRange{
                    minVariantPrice{
                      amount
                    }
                    maxVariantPrice{
                      amount
                    }
                  }
                  variants(first: 250){
                    edges{
                      node{
                        id
                        title
                        quantityAvailable
                        sku
                        selectedOptions{
                          name
                          value
                        }
                        availableForSale
                        price {
                          amount
                        }
                        compareAtPrice{
                          amount
                        }      
                      }
                    }
                  }
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
      `,
      variables: this.getQueryVariables(state)
    }
  }

  getRequestOptions() {
    return {
      params: this.requestOptions.params,
      path: "",
      format: "GRAPHQL",
    }
  }


  formatResponse(response: any, params = {}) {
    console.log("RESPONSE >> SHOPIFY API", response, params)
    console.log(response.collection.products)
    const filtersInfo = this.getFormattedFiltersAndInputs(response.collection.products.filters)
    return {
      name: response.collection.title,
      total_pages: 10,
      total: 10,
      page: 1,
      products: this.formatProducts(response.collection.products.edges),
      filters: filtersInfo.formattedFilters,
      sort_options: this.getSortOptions(),
      page_info: response.collection.products.pageInfo,
      filterInputs: filtersInfo.filterInputs
    }
  }
}

export default ShopifyProductListingPage
