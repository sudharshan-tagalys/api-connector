import { applyCurrencyConversion, getIdFromGraphqlId, getPriceDetails, METAFIELD_TYPES } from "./common";

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

  formatProducts(products) {
    return products.edges.map((product_edge) => {
      return this.formatProduct(product_edge.node)
    })
  }

  formatProduct(product, level = 1) {
    //TODO:// consider currency and display formatting for price related fields
    const variants = this.formatVariants(product.variants)
    const media = this.formatMedia(product.media)
    const images = this.formatImages(product.images)
    const priceDetails = getPriceDetails(product)

    return {
      id: getIdFromGraphqlId(product.id),
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
      metafields: this.formatMetafields(product.metafields, level),
      handle: product.handle,
      options_with_values: GraphqlResponseFormatter.formatOptions(product.options),
      price: priceDetails.price,
      compare_at_price: priceDetails.compare_at_price,
      price_varies: priceDetails.price_varies,
      compare_at_price_varies: priceDetails.compare_at_price_varies,
      price_min: priceDetails.price_min,
      price_max: priceDetails.price_max,
      compare_at_price_min: priceDetails.compare_at_price_min,
      compare_at_price_max: priceDetails.compare_at_price_max,
      options: product.options.map((option) => option.name),
      has_only_default_variant: this.hasOnlyDefaultVariant(product.options, variants),
      in_stock: (product.totalInventory > 0),
    }
  }

  static formatOptions(options) {
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
    if (images.length > 0) {
      return images.find((image) => image.position === 1)
    }
    return null
  }


  formatVariants(variants) {
    return variants.edges.map((variantEdge, index) => {
      return {
        id: getIdFromGraphqlId(variantEdge.node.id),
        title: variantEdge.node.title,
        sku: variantEdge.node.sku,
        price: variantEdge.node.price ? applyCurrencyConversion(variantEdge.node.price.amount) : null,
        compare_at_price: variantEdge.node.compareAtPrice ? applyCurrencyConversion(variantEdge.node.compareAtPrice.amount) : null,
        available: variantEdge.node.availableForSale,
        position: index + 1,
        metafields: {},
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


  formatMetafields(metafields, level) {
    let formattedMetafields = {}
    metafields.forEach((metafield) => {
      if (metafield) {
        formattedMetafields[metafield.namespace] ||= {}
        formattedMetafields[metafield.namespace][metafield.key] = this.formatMetafield(metafield, level)
      }
    })
    return formattedMetafields
  }


  formatMetafield(metafield, level) {
    const type = metafield.type
    let value = metafield.value
    if (type === METAFIELD_TYPES.COLLECTION_REFERENCE) {
      if (metafield.reference) {
        value = {
          id: getIdFromGraphqlId(metafield.reference.id),
          title: metafield.reference.title,
          products: metafield.reference.products.edges.map((edge) => {
            return this.formatProduct(edge.node, level + 1)
          })
        }
      } else {
        // SECOND LEVEL
        return {
          type: type,
          id: getIdFromGraphqlId(metafield.value)
        }
      }
    }
    if (type === METAFIELD_TYPES.LIST_PRODUCT_REFERENCE) {
      if (metafield.references) {
        value = metafield.references.edges.map((reference) => {
          return this.formatProduct(reference.node, level + 1)
        })
      } else {
        // SECOND LEVEL
        return {
          type: type,
          ids: JSON.parse(value).map((productId) => getIdFromGraphqlId(productId))
        }
      }
    }
    if (type === METAFIELD_TYPES.LIST_SINGLE_LINE_TEXT_FIELD) {
      value = JSON.parse(value)
    }
    return {
      type: type,
      value: value
    }
  }


  formatFilters(filters, selectedFiltersFromRequestState, initialPriceRanges) {
    return filters.map((filter) => {
      const selectedFilter = selectedFiltersFromRequestState[filter.id]
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
        const hasPriceRanges = initialPriceRanges.price_ranges
        let filterItem = {
          id: filter.id,
          name: filter.label,
          type: "range",
          display_format: "{{currency_label}}{{value}}",
          min: hasPriceRanges ? initialPriceRanges.price_ranges.min : parsedInput.price.min,
          max: hasPriceRanges ? initialPriceRanges.price_ranges.max : parsedInput.price.max,
        }
        if (selectedFilter && selectedFilter.hasOwnProperty('selected_min')) {
          filterItem['selected_min'] = selectedFilter.selected_min.toString()
          filterItem['selected_max'] = selectedFilter.selected_max.toString()
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