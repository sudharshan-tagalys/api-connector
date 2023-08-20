const MAX_LEVEL_SUPPORTED = 1

class GraphqlQueries{
  getImages = () => {
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
  
  getBasicProductDetails = () => {
    return `
      id
      title
      handle
      onlineStoreUrl
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
  
  getMedia = () => {
    return `
      media(first: 250){
        edges{
          node{
            alt
            mediaContentType
            ... on Video {
              id
              mediaContentType
              previewImage{
                id
                altText
                width
                height
                url
              }
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
              previewImage{
                id
                altText
                width
                height
                url
              }
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
  
  getVariants = () => {
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
          }
        }
      }
    `
  }
  
  
  getReferenceMetafields = (level) =>{
    if(level >= MAX_LEVEL_SUPPORTED){
      return ""
    }
    level += 1
    return `
      reference{
        ... on Product{
          ${this.getBasicProductDetails()}
          ${this.getVariants()}
          ${this.getImages()}
          ${this.getMedia()}     
          ${this.getProductMetafields(level)}
        }
        ... on Collection{
          id
          title
          products(first: 10){
            edges{
              node{
                ${this.getBasicProductDetails()}
                ${this.getVariants()}
                ${this.getImages()}
                ${this.getMedia()}     
                ${this.getProductMetafields(level)}           
              }
            }
          }
        }
      }
      references(first: 10){
        edges{
          node{
            ... on Product{
              ${this.getBasicProductDetails()}
              ${this.getVariants()}
              ${this.getImages()}
              ${this.getMedia()}
              ${this.getProductMetafields(level)}
            }
          }
        }
      }
    `
  }
  
  getProductMetafields = (level = 0) => {
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
  
  
  getProductDetails = () => {
    return `
      ${this.getBasicProductDetails()}
      ${this.getVariants()}
      ${this.getImages()}
      ${this.getMedia()}
      ${this.getProductMetafields()}
    `
  }
  
  
  static getFilters = () => {
    return `
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
    `
  }
}

export default GraphqlQueries