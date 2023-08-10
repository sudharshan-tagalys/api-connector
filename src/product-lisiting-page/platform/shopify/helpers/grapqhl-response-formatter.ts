import { applyCurrencyConversion } from "../../../../shared/helpers/common"

const FILTER_TYPES = {
  LIST: "LIST",
  PRICE_RANGE: "PRICE_RANGE",
  BOOLEAN: "BOOLEAN"
}

const MEDIA_CONTENT_TYPES = {
  VIDEO: "VIDEO",
  EXTERNAL_VIDEO: "EXTERNAL_VIDEO",
  IMAGE: "IMAGE",
  MODEL_3D: "MODEL_3D"
};


class GraphqlResponseFormatter {

  private requestState
  private shopifyResponse
  private responseState;

  constructor(requestState, responseState, shopifyResponse) {
    this.shopifyResponse = shopifyResponse
    this.requestState = requestState
    this.responseState = responseState
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
        "id": "price-asc",
        "label": "Price Ascending",
      },
      {
        "id": "price-desc",
        "label": "Price Descending",
      }
    ]
    sortOptions.forEach((sortOption: any) => {
      if (sortOption.id === this.requestState.sort) {
        sortOption.selected = true
      }
    })
    return sortOptions
  }

  format() {
    return {
      name: this.shopifyResponse.collection.title,
      products: this.formatProducts(this.shopifyResponse.collection.products.edges),
      filters: this.formatFilters(this.shopifyResponse.collection.products.filters),
      sort_options: this.getSortOptions(),
      page_info: this.shopifyResponse.collection.products.pageInfo,
      filter_inputs: GraphqlResponseFormatter.getFilterInputs(this.shopifyResponse.collection.products.filters),
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
    // CHECK NULL VAULES IN APPLY CURRENCY CONVERSION
    const variants = this.formatVariants(product.variants)
    const priceVaries = (product.priceRange.minVariantPrice.amount != product.priceRange.maxVariantPrice.amount)
    const compareAtPriceVaries = (product.compareAtPriceRange.minVariantPrice.amount != product.compareAtPriceRange.maxVariantPrice.amount)
    const media = this.formatMedia(product.media)
    const images = this.formatImages(product.images)
    return {
      id: this.getIdFromGraphqlId(product.id),
      title: product.title,
      published_at: product.publishedAt,
      available: product.availableForSale,
      tags: product.tags,
      variants: variants,
      featured_image: this.getFeaturedImage(images),
      images: images,
      media: media,
      vendor: product.vendor,
      product_type: product.productType,
      metafields: this.formatMetafields(product.metafields),
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

  formatOptions(options) {
    return options.map((option, index) => {
      return {
        name: option.name,
        position: index + 1,
        values: option.values
      }
    })
  }

  formatImages(images) {
    return images.edges.map((image_edge, index) => {
      const image = image_edge.node
      return {
        position: index + 1,
        alt: image.altText,
        width: image.width,
        height: image.height,
        src: image.url
      }
    })
  }

  formatMedia(media) {
    let formattedMedia = [];
    media.edges.forEach((mediaItem, index) => {
      const position = index + 1;
      if (mediaItem.node.mediaContentType === MEDIA_CONTENT_TYPES.IMAGE) {
        formattedMedia.push({
          position: position,
          media_type: "image",
          alt: mediaItem.node.image.altText,
          width: mediaItem.node.image.width,
          height: mediaItem.node.image.height,
          src: mediaItem.node.image.url,
          preview_image: this.formatImage(mediaItem.node.previewImage)
        });
      }
      if (mediaItem.node.mediaContentType === MEDIA_CONTENT_TYPES.VIDEO) {
        formattedMedia.push({
          position: position,
          media_type: "video",
          alt: mediaItem.node.alt,
          duration: mediaItem.node.duration,
          sources: this.formatVideoSources(mediaItem.node.sources),
          preview_image: this.formatImage(mediaItem.node.preview.image)
        })
      }
    });
    return formattedMedia;
  }

  formatImage(image) {
    return {
      alt: image.altText,
      width: image.width,
      height: image.height,
      src: image.url
    };
  }

  formatVideoSources(videoSources) {
    return videoSources.map(this.formatVideoSource);
  }

  formatVideoSource(videoSource) {
    return {
      file_size: videoSource.fileSize,
      format: videoSource.format,
      mime_type: videoSource.mime_type,
      height: videoSource.height,
      width: videoSource.width,
      url: videoSource.url
    };
  }


  getFeaturedImage(images) {
    if(images.length > 0){
      return images.find((image) => image.position === 1)
    }
    return null
  }


  formatVariants(variants) {
    return variants.edges.map((variantEdge, index) => {
      return {
        id: this.getIdFromGraphqlId(variantEdge.node.id),
        title: variantEdge.node.title,
        sku: variantEdge.node.sku,
        price: variantEdge.node.price ? applyCurrencyConversion(variantEdge.node.price.amount) : null,
        compare_at_price: variantEdge.node.compareAtPrice ? applyCurrencyConversion(variantEdge.node.compareAtPrice.amount) : null,
        available: variantEdge.node.availableForSale,
        position: index + 1,
        ...this.formatSelectedVariantOptions(variantEdge.node),
      }
    })
  }

  formatSelectedVariantOptions(variant) {
    const MAX_NUM_OF_OPTIONS = 3
    let selectedVariantOptions = {}
    for (let index = 0; index < MAX_NUM_OF_OPTIONS; index++) {
      selectedVariantOptions[`option${index + 1}`] = variant.selectedOptions[index] ? variant.selectedOptions[index].value : null
    }
    return selectedVariantOptions
  }


  formatMetafields(metafields) {
    let formattedMetafields = {}
    metafields.forEach((metafield) => {
      if (metafield) {
        formattedMetafields[metafield.namespace] ||= {}
        formattedMetafields[metafield.namespace][metafield.key] = this.formatMetafield(metafield)
      }
    })
    return formattedMetafields
  }


  formatMetafield(metafield) {
    const type = metafield.type
    let value = metafield.value
    if (type === "collection_reference") {
      // DELETE IF NOT FOUND?
      if (metafield.reference) {
        value = {
          id: this.getIdFromGraphqlId(metafield.reference.id),
          title: metafield.reference.title,
          products: metafield.reference.products.edges.map((edge) => {
            return this.formatProduct(edge.node)
          })
        }
      }
    }
    if (type === "list.product_reference") {
      if (metafield.references) {
        value = metafield.references.edges.map((reference) => {
          // DELETE IF NOT FOUND? -> reference.node
          return this.formatProduct(reference.node)
        })
      }
    }
    return {
      type: type,
      value: value
    }
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
            const selected = (selectedFilter && selectedFilter.includes(filterItem.id)) ? true : false
            return ({
              id: filterItem.id,
              name: filterItem.label,
              count: filterItem.count,
              selected: selected
            })
          })
        }
      }

      if (isPriceRangeFilter) {
        const parsedInput = JSON.parse(filter.values[0].input)
        const hasPriceRanges = this.responseState.price_ranges
        let filterItem = {
          id: filter.id,
          name: filter.label,
          type: "range",
          display_format: "{{currency_label}}{{value}}",
          min: hasPriceRanges ? this.responseState.price_ranges.min : parsedInput.price.min,
          max: hasPriceRanges ? this.responseState.price_ranges.max : parsedInput.price.max,
        }
        if (selectedFilter && selectedFilter.hasOwnProperty('selected_min')) {
          filterItem['selected_min'] = selectedFilter.selected_min
          filterItem['selected_max'] = selectedFilter.selected_max
        }
        return filterItem
      }
    })
  }

  static getFilterInputs(filters) {
    let filterInputs = {}
    filters.forEach((filter) => {
      const isCheckboxFilter = (filter.type === FILTER_TYPES.LIST || filter.type === FILTER_TYPES.BOOLEAN)
      const isPriceRangeFilter = (filter.type === FILTER_TYPES.PRICE_RANGE)
      if (isCheckboxFilter) {
        filter.values.forEach((filterItem) => {
          filterInputs[filterItem.id] = { type: "checkbox", input: filterItem.input, label: filterItem.label }
        })
      }
      if (isPriceRangeFilter) {
        filterInputs[filter.id] = {
          type: "range",
          input: filter.values[0].input,
          label: filter.label
        }
      }
    })
    return filterInputs
  }

  getIdFromGraphqlId(graphqlId) {
    const productId = graphqlId.split("/").slice(-1)[0]
    return parseInt(productId)
  }

  getImagesToVariantIdsMap(variants) {
    let imagesToVariantIdsMap = {}
    variants.edges.forEach((variantEdge) => {
      if (variantEdge.node.image) {
        if (!imagesToVariantIdsMap[variantEdge.node.image.id]) {
          imagesToVariantIdsMap[variantEdge.node.image.id] = []
        }
        imagesToVariantIdsMap[variantEdge.node.image.id].push(variantEdge.node.id)
      }
    })
    return imagesToVariantIdsMap
  }
}

export default GraphqlResponseFormatter