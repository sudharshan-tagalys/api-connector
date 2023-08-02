import { applyCurrencyConversion } from "../../../../shared/helpers/common"

const FILTER_TYPES = {
  LIST: "LIST",
  PRICE_RANGE: "PRICE_RANGE",
  BOOLEAN: "BOOLEAN"
}

class GraphqlResponseFormatter{

  private requestState
  private shopifyResponse

  constructor(requestState, shopifyResponse){
    this.shopifyResponse = shopifyResponse
    this.requestState = requestState
  }
  
  getSortOptions() {
    let sortOptions = [
      {
        "id": "manual",
        "label": "Most Relevant",
      },
      {
        "id": "newest-oldest",
        "label": "Newest",
      },
      {
        "id": "sale_price-asc",
        "label": "Price Ascending",
      },
      {
        "id": "sale_price-desc",
        "label": "Price Descending",
      }
    ]
    sortOptions.forEach((sortOption : any)=>{
      if(sortOption.id === this.requestState.sort){
        sortOption.selected = true
      }
    })
    return sortOptions
  }

  format(){
    return {
      name: this.shopifyResponse.collection.title,
      products: this.formatProducts(this.shopifyResponse.collection.products.edges),
      filters: this.formatFilters(this.shopifyResponse.collection.products.filters),
      sort_options: this.getSortOptions(),
      page_info: this.shopifyResponse.collection.products.pageInfo,
      filterInputs: this.getFilterInputs(this.shopifyResponse.collection.products.filters),
      // filterRanges: filtersInfo.filterRanges,
    }
  }

  hasOnlyDefaultVariant(options, variants) {
    if (options.length > 1) {
      return false
    }
    if (variants.length > 1) {
      return false
    }
    if (options[0] === 'Title' && variants[0].option1 === 'Default Title' && variants[0].option2 === null && variants[0].option3 === null) {
      return true
    }
    return false
  }

  formatProducts(product_edges) {
    return product_edges.map((product_edge) => {
      return this.formatProduct(product_edge.node)
    })
  }

  formatProduct(product) {
    //TODO:// consider currency and display formatting for price related fields
    const imagesToVariantIdsMap = this.getImagesToVariantIdsMap(product.variants)
    console.log(imagesToVariantIdsMap)
    const variants = this.formatVariants(product.variants)
    const priceVaries = (product.priceRange.minVariantPrice.amount != product.priceRange.maxVariantPrice.amount)
    const compareAtPriceVaries = (product.compareAtPriceRange.minVariantPrice.amount != product.compareAtPriceRange.maxVariantPrice.amount)
    return {
      id: this.getIdFromGraphqlId(product.id),
      title: product.title,
      published_at: product.publishedAt,
      available: product.availableForSale,
      tags: product.tags,
      variants: variants,
      images: this.formatImages(product.images, imagesToVariantIdsMap),
      media: this.formatMedia(product.media),
      vendor: product.vendor,
      // metafields: this.formatMetafields(product),
      handle: product.handle,
      price_varies: priceVaries,
      compare_at_price_varies: compareAtPriceVaries,
      options_with_values: this.formatOptions(product.options),
      price: applyCurrencyConversion(product.priceRange.minVariantPrice.amount),
      compare_at_price: applyCurrencyConversion(product.compareAtPriceRange.minVariantPrice.amount),
      price_min: applyCurrencyConversion(product.priceRange.minVariantPrice.amount),
      price_max: applyCurrencyConversion(product.priceRange.maxVariantPrice.amount),
      compare_at_price_min: applyCurrencyConversion(product.compareAtPriceRange.minVariantPrice.amount),
      compare_at_price_max: applyCurrencyConversion(product.compareAtPriceRange.maxVariantPrice.amount),
      options: product.options.map((option) => option.name),
      has_only_default_variant: this.hasOnlyDefaultVariant(product.options, variants),
      in_stock: (product.totalInventory > 0),
    }
  }

  formatOptions(options){
    return options.map((option, index) => {
      return {
        name: option.name,
        position: index + 1,
        values: option.values
      }
    })
  }

  formatImages(images, imagesToVariantIdsMap){
    return images.edges.map((image_edge, index) => {
      const image = image_edge.node
      return {
        position: index + 1,
        alt: image.altText,
        width: image.width,
        height: image.height,
        src: image.url,
        variant_ids: (imagesToVariantIdsMap[image_edge.node.id] || [])
      }
    })
  }

  formatMedia(media){
    return []
  }

  formatVariants(variants){
    return variants.edges.map((variantEdge, index)=>{
      return {
        id: this.getIdFromGraphqlId(variantEdge.node.id),
        title: variantEdge.node.title,
        sku: variantEdge.node.sku,
        price: applyCurrencyConversion(variantEdge.node.price.amount),
        compare_at_price: applyCurrencyConversion(variantEdge.node.compareAtPrice.amount),
        available: variantEdge.node.availableForSale,
        position: index + 1,
        ...this.formatSelectedVariantOptions(variantEdge.node),
        // metafields
      }
    })
  }

  formatSelectedVariantOptions(variant){
    const MAX_NUM_OF_OPTIONS = 3
    let selectedVariantOptions = {}
    for (let index = 0; index < MAX_NUM_OF_OPTIONS; index++) {
      selectedVariantOptions[`option${index+1}`] = variant.selectedOptions[index] ? variant.selectedOptions[index].value : null
    }
    return selectedVariantOptions
  }


  formatMetafields(product){

  }


  formatFilters(filters) {
    return filters.map((filter) => {
      const selectedFilter = this.requestState.filters[filter.id]
      const isCheckboxFilter = (filter.type === FILTER_TYPES.LIST || filter.type === FILTER_TYPES.BOOLEAN)
      const isPriceRangeFilter = (filter.type === FILTER_TYPES.PRICE_RANGE)

      if (isCheckboxFilter) {
        return {
          id: filter.id,
          name: filter.label,
          type: "checkbox",
          items: filter.values.map((filterItem) => {
            const selected = (selectedFilter && selectedFilter.includes(filterItem.id))
            return ({
              id: filterItem.id,
              name: filterItem.label,
              count: filterItem.count,
              selected: selected
            })
          })
        }
      }

      if(isPriceRangeFilter){
        const parsedInput = JSON.parse(filter.values[0].input)
        let filterItem = {
          id: filter.id,
          name: filter.label,
          type: "range",
          display_format: "{{currency_label}}{{value}}",
          min: parsedInput.price.min,
          max: parsedInput.price.max
        }
        if (selectedFilter && selectedFilter.hasOwnProperty('selected_min')) {
          filterItem['selected_min'] = selectedFilter.selected_min
          filterItem['selected_max'] = selectedFilter.selected_max
        }
        return filterItem
      }
    })
  }

  getFilterInputs(filters){
    let filterInputs = {}
    filters.forEach((filter) => {
      const isCheckboxFilter = (filter.type === FILTER_TYPES.LIST || filter.type === FILTER_TYPES.BOOLEAN)
      const isPriceRangeFilter = (filter.type === FILTER_TYPES.PRICE_RANGE)
      if (isCheckboxFilter) {
        filter.values.forEach((filterItem) => {
          filterInputs[filterItem.id] = { type: "checkbox", input: filterItem.input }
        })
      }
      if(isPriceRangeFilter){
        filterInputs[filter.id] = {
          type: "range",
          input: filter.values[0].input
        }
      }
    })
    return filterInputs
  }

  getIdFromGraphqlId(graphqlId){
    return graphqlId.split("/").slice(-1)[0]
  }

  getImagesToVariantIdsMap(variants){
    let imagesToVariantIdsMap = {}
    variants.edges.forEach((variantEdge)=>{
      if(!imagesToVariantIdsMap[variantEdge.node.image.id]){
        imagesToVariantIdsMap[variantEdge.node.image.id] = []
      }
      imagesToVariantIdsMap[variantEdge.node.image.id].push(variantEdge.node.id)
    })
    return imagesToVariantIdsMap
  }
}

export default GraphqlResponseFormatter