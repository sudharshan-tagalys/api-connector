import APIConnector from "../lib/apiConnector"

class Recommendations extends APIConnector {

  static exporterName(): string{
    return 'Recommendations'
  }

  formatResponse(response){
    return this.responseFormatter.recommendations(response)
  }

  getRequestOptions() {
    return {
      path: `recommendations/${this.requestOptions.params.recommendationId}`,
      params: {
        product_id: this.requestOptions.params.productId,
        limit: (this.requestOptions.params.limit || 16)
      }
    }
  }

  getHelpersToExpose(response, formattedResponse): {} {
    return {
      getAnalyticsData: () => this.extractAnalyticsData(response),
      getProducts: () => formattedResponse ? formattedResponse.products : []
    }
  }

  extractAnalyticsData(response) {
    if(response === false){
      return {}
    }

    let plDetails: any = {
      id: this.requestOptions.params.recommendationId,
      product_id: this.requestOptions.params.productId,
      name: response.name,
      widget_name: response.widget_name
    }
    if (response.hasOwnProperty("sku")) {
      plDetails["product"] = response.sku
    }
    const productSkus = response["details"].map((product) => product.sku)
    return {
      event_type: "product_list",
      event_details: {
        pl_type: "product-based-widget",
        pl_details: plDetails,
        pl_products: productSkus,
        pl_total: productSkus.length
      }
    }
  }
}

export default Recommendations