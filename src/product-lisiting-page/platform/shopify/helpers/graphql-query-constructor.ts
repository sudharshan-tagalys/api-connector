import configuration from '../../../../lib/configuration';

const MAX_LEVEL_SUPPORTED = 1

class GraphqlQueryConstructor {

  private requestState
  private filterInputs
  
  constructor(requestState, filterInputs) {
    this.requestState = requestState;
    this.filterInputs = filterInputs
  }

  getSortVariables(){
    const sortOptionToSortKeyMap = {
      'manual': {
        sortKey: "MANUAL",
        reverse: false
      },
      'newest-oldest': {
        sortKey: 'CREATED',
        reverse: true
      },
      'price-desc': {
        sortKey: 'PRICE',
        reverse: true,
      },
      'price-asc': {
        sortKey: 'PRICE',
        reverse: false 
      }
    }
    return sortOptionToSortKeyMap[this.requestState.sort]
  }

  getPaginationVariables(){
    let paginationVariables = {}
    if(this.requestState.endCursor){
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

  getFilterVariables(){
    let filterVariables = {}
    if (Object.keys(this.requestState.filters).length) {
      let filtersToApply = []
      for (const [_, filterValues] of Object.entries(this.requestState.filters)) {
        const values: any = filterValues
        if(filterValues.hasOwnProperty("selected_min")){
          filtersToApply.push({
            price: {
              min: filterValues['selected_min'],
              max: filterValues['selected_max']
            }
          })
        }else{
          values.forEach((filterValue) => {
            if(this.filterInputs && this.filterInputs[filterValue]){
              const selectedFilterValue = this.filterInputs[filterValue]
              filtersToApply.push(JSON.parse(selectedFilterValue.input))
            }
          })
        }
      }
      filterVariables['filters'] = filtersToApply
    }
    return filterVariables
  }

  getMetafieldVariables(){
    if(!configuration.hasMetafields()){
      return {
        product_metafields: [],
        variant_metafields: [],
        collection_metafields: []
      }
    }
    const metafieldsToQuery = configuration.getMetafields()
    return {
      product_metafields: (metafieldsToQuery.products || []),
      variant_metafields: (metafieldsToQuery.product_variants || []),
      collection_metafields: (metafieldsToQuery.collection_metafields || [])
    }
  }

  getQueryVariables(){
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
        $variant_metafields: [HasMetafieldsIdentifier!]!,
        $collection_metafields: [HasMetafieldsIdentifier!]!
      ) @inContext(country: ${configuration.getCountryCode()}) {
        collection(id: $id){
          title
          handle
          ${this.getCollectionMetafields()}
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
                ${this.getBasicDetails()}
                ${this.getVariants()}
                ${this.getImages()}
                ${this.getMedia()}
                ${this.getProductMetafields()}
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

  getImages() {
    return `
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
    `
  }


  getBasicDetails() {
    return `
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
      featuredImage{
        altText
        height
        url
        width
        id
      }
    `
  }

  getMedia() {
    return `
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
    `
  }

  getVariants(level = 0) {
    return `
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
            image{
              id
            }
            availableForSale
            price {
              amount
            }
            compareAtPrice{
              amount
            }
            ${this.getVariantMetafields(level)}
          }
        }
      }
    `
  }

  getReferenceMetafields(level){
    if(level >= MAX_LEVEL_SUPPORTED){
      return ""
    }
    level += 1
    return `
      reference{
        ... on Product{
          id
          title
        }
        ... on Collection{
          id
          products(first: 10){
            edges{
              node{
                ${this.getBasicDetails()}
                ${this.getVariants(level)}
                ${this.getImages()}
                ${this.getMedia()}     
                ${this.getProductMetafields(level)}           
              }
            }
          }
        }
      }
      references(first: 250){
        edges{
          node{
            ... on Product{
              ${this.getBasicDetails()}
              ${this.getVariants(level)}
              ${this.getImages()}
              ${this.getMedia()}
              ${this.getProductMetafields(level)}
            }
          }
        }
      }
    `
  }

  getProductMetafields(level = 0) {
    return `
      metafields(identifiers: $product_metafields){
        id
        key
        namespace
        type
        value
        description
        ${this.getReferenceMetafields(level)}
      }
    `
  }

  getVariantMetafields(level = 0){
    return `
      metafields(identifiers: $variant_metafields){
        id
        key
        namespace
        type
        value
        description
        ${this.getReferenceMetafields(level)}
      }
    `
  }

  getCollectionMetafields(level = 0){
    return `
      metafields(identifiers: $collection_metafields){
        id
        key
        namespace
        type
        value
        description
        ${this.getReferenceMetafields(level)}
      }
    `
  }


  static getFilterInputsQuery(){
    return `
    query Collection(
      $id: ID,
    ) {
      collection(id: $id){
        products(first: 1) {
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
        }
      }
    }
    `
  }
}

export default GraphqlQueryConstructor