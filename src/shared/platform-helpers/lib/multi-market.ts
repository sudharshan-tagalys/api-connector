import configuration from "../../../lib/configuration";
import shopifyConfiguration from "../../../lib/shopifyConfiguration";
import { API_VERSION, getIdFromGraphqlId, getPriceDetails, METAFIELD_TYPES } from "./common";

class MultiMarket {
  async getProductDetailsForMarket(productIds) {
    if (!productIds.length) return {}

    const productNodeIds = productIds.map(
      (productId) => `gid://shopify/Product/${productId}`
    );
    const priceQuery = `
      variants(first: 250){
        edges{
          node{
            id
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

    const metafieldsToQuery = shopifyConfiguration.getMetafields()
    let metafieldsQuery = ""
    if (Object.keys(metafieldsToQuery).length > 0) {
      const identifier = metafieldsToQuery.products.map((product_metafield) => `{namespace: "${product_metafield.namespace}", key: "${product_metafield.key}"}`)
      metafieldsQuery = `
        metafields(identifiers: [${identifier}]){
          id
          key
          namespace
          type
          value
          reference{
            ... on Collection{
              products(first: 10){
                edges{
                  node{
                    id
                    ${priceQuery}
                    metafields(identifiers: [${identifier}]){
                      id
                      key
                      namespace
                      type
                      value
                    }
                  }
                }
              }
            }
          }
          references(first: 10){
            edges{
              node{
                ... on Product{
                  id
                  ${priceQuery}
                  metafields(identifiers: [${identifier}]){
                    id
                    key
                    namespace
                    type
                    value
                  }
                }
              }
            }
          }
        }
      `
    }

    var response = await fetch(`https://${shopifyConfiguration.getMyShopifyDomain()}/api/${API_VERSION}/graphql.json`, {
      body: ` query allProducts @inContext(country: ${configuration.getCountryCode()}) {
        nodes(ids: ${JSON.stringify(productNodeIds)})
        {
          ... on Product{
            id
            ${metafieldsQuery}
            ${priceQuery}
          }
        }
      }
      `,
      headers: {
        "Content-Type": "application/graphql",
        "X-Shopify-Storefront-Access-Token": shopifyConfiguration.getStorefrontAPIAccessToken(),
      },
      method: "POST",
    });
    const responseJson = await response.json();
    const products = responseJson.data.nodes;
    let productDetailsForMarket = {};

    products.forEach((product) => {
      if (product) {
        const productId = getIdFromGraphqlId(product.id);
        productDetailsForMarket[productId] = this.getMarketSpecificDetails(product)
      }
    });

    return productDetailsForMarket;
  }

  getMarketSpecificDetails(product) {
    let metafields = {}
    if (product.hasOwnProperty("metafields")) {
      product.metafields.forEach((metafield) => {
        if (metafield) {
          metafields[metafield.namespace] ||= {}
          metafields[metafield.namespace][metafield.key] = {
            type: metafield.type,
            value: this.getMetafieldValue(metafield)
          }
        }
      })
    }

    const priceDetails = getPriceDetails(product)
    return {
      ...priceDetails,
      productId: getIdFromGraphqlId(product.id),
      metafields: metafields
    };
  }

  getMetafieldValue(metafield) {
    const type = metafield.type
    let value = metafield.value

    if (type === METAFIELD_TYPES.COLLECTION_REFERENCE) {
      if (metafield.reference) {
        value = {
          products: metafield.reference.products.edges.map((edge) => {
            return this.getMarketSpecificDetails(edge.node)
          })
        }
      }
    }
    if (type === METAFIELD_TYPES.LIST_PRODUCT_REFERENCE) {
      if (metafield.references) {
        value = metafield.references.edges.map((reference) => {
          return this.getMarketSpecificDetails(reference.node)
        })
      } 
      // else {
      //   value = JSON.parse(value)
      // }
    }
    return value
  }

  async updateProductDetailsForMarket(response) {
    if (response.hasOwnProperty("products")) {
      console.log("BEFORE MUTATION", JSON.stringify(response.products[0]))
      const productIds = response.products.map((product) => product.id)
      let marketSpecificDetails = await this.getProductDetailsForMarket(productIds)
      
      response.products.forEach((product) => {
        const hasMarketSpecificDetails = marketSpecificDetails.hasOwnProperty(product.id)
        hasMarketSpecificDetails ? this.mutateProductDetails(product, marketSpecificDetails[product.id]) : this.resetProductPrice(product)
      })
      console.log("AFTER MUTATION", JSON.stringify(response.products[0]))
    }
    return response
  }

  mutateProductDetails(product, marketSpecificProductDetails) {
    product.variants.forEach((variant) => {
      variant.price = marketSpecificProductDetails.variantPricesMap[variant.id].price
      variant.compare_at_price = marketSpecificProductDetails.variantPricesMap[variant.id].compare_at_price
    })
    product.price_varies = marketSpecificProductDetails.price_varies
    product.compare_at_price_varies = marketSpecificProductDetails.compare_at_price_varies
    product.price = marketSpecificProductDetails.price
    product.compare_at_price = marketSpecificProductDetails.compare_at_price
    product.price_min = marketSpecificProductDetails.price_min
    product.price_max = marketSpecificProductDetails.price_max
    product.compare_at_price_min = marketSpecificProductDetails.compare_at_price_min
    product.compare_at_price_max = marketSpecificProductDetails.compare_at_price_max
    this.updateMetafieldPrices(product.metafields, marketSpecificProductDetails.metafields)
  }

  updateMetafieldPrices(metafields, marketSpecificMetafields) {
    for (const namespace in metafields) {
      for (const key in metafields[namespace]) {
        if (marketSpecificMetafields.hasOwnProperty(namespace) && marketSpecificMetafields[namespace].hasOwnProperty(key)) {
          const marketSpecificValue = marketSpecificMetafields[namespace][key].value
          if (metafields[namespace][key]['type'] === METAFIELD_TYPES.COLLECTION_REFERENCE) {
            this.updateCollectionReferenceMetafield(metafields[namespace][key], marketSpecificValue)
          }
          if (metafields[namespace][key]['type'] === METAFIELD_TYPES.LIST_PRODUCT_REFERENCE) {
            this.updateProductListReferenceMetafield(metafields[namespace][key], marketSpecificValue)
          }
        }else{
          delete metafields[namespace][key]
          if(Object.keys(metafields[namespace]).length === 0){
            delete metafields[namespace]
          }
        }
      }
    }
  }

  idPresentInGivenList(ListOfIds, id){
    const found = ListOfIds.find((listId) => listId === id);
    return found === id;
  };

  updateCollectionReferenceMetafield(data, marketSpecificValue) {
    const hasProducts = (data.value && data.value.hasOwnProperty("products"))
    if (hasProducts) {
      if(Array.isArray(marketSpecificValue.products)){
        const productsFromShopify = marketSpecificValue.products.map((value)=>parseInt(value.productId))
        data.value.products = data.value.products.filter((product)=>this.idPresentInGivenList(productsFromShopify, parseInt(product.id)))
  
        data.value.products.forEach((product) => {
          if (marketSpecificValue.hasOwnProperty("products")) {
            marketSpecificValue.products.forEach((priceInfoForProduct) => {
              if (product.id === priceInfoForProduct.productId) {
                this.mutateProductDetails(product, priceInfoForProduct)
              }
            })
          }
        })
      }
    } else {
      // RECURSIVE CALL, SECOND LEVEL METAFIELDS WON'T HAVE REFERENCES
    }
  }


  updateProductListReferenceMetafield(data, marketSpecificValue) {
    if(Array.isArray(marketSpecificValue)){
      const productsFromShopify = marketSpecificValue.map((value)=>parseInt(value.productId))
      data.value = data.value.filter((product)=>this.idPresentInGivenList(productsFromShopify, parseInt(product.id)))
  
      data.value.forEach((product) => {
        marketSpecificValue.forEach((priceInfoForProduct) => {
          if (product.id === priceInfoForProduct.productId) {
            this.mutateProductDetails(product, priceInfoForProduct)
          }
        })
      })
    }
  }

  resetProductPrices(response) {
    if (response.products) {
      return response.products.forEach((product) => this.resetProductPrice(product))
    }
    return response
  }

  resetProductPrice(product) {
    product.price_varies = null
    product.compare_at_price_varies = null
    product.price = null
    product.compare_at_price = null
    product.price_min = null
    product.price_max = null
    product.compare_at_price_min = null
    product.compare_at_price_max = null
    product.variants.map((variant) => {
      variant.price = null
      variant.compare_at_price = null
    })
    this.resetMetafieldPrices(product.metafields)
  }

  resetMetafieldPrices(metafields) {
    for (const namespace in metafields) {
      for (const key in metafields[namespace]) {
        const metafield = metafields[namespace][key]
        if (metafield['type'] === METAFIELD_TYPES.COLLECTION_REFERENCE) {
          if (metafield.value && metafield.value.hasOwnProperty("products")) {
            metafields[namespace][key].value.products.map((product) => {
              this.resetProductPrice(product)
            })
          }
        }
        if (metafield['type'] === METAFIELD_TYPES.LIST_PRODUCT_REFERENCE) {
          if (metafield.value) {
            metafield.value.map((product) => {
              if(typeof product === 'object'){
                this.resetProductPrice(product)
              }
            })
          }
        }
      }
    }
  }

  helpersToExpose() {
    return {
      updateProductDetailsForMarket: (response) => this.updateProductDetailsForMarket(response),
      resetProductPrices: (response) => this.resetProductPrices(response)
    }
  }

  static export() {
    return {
      MultiMarket: {
        new: () => {
          const instance = new this()
          return instance.helpersToExpose()
        }
      }
    }
  }
}

export default MultiMarket