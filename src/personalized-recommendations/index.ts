import { COOKIES } from "../lib/analyticsTracker"
import APIConnector from "../lib/apiConnector"
import cookie from "../lib/cookie"

class PersonalizedRecommendations extends APIConnector {

  static exporterName(): string{
    return 'PersonalizedRecommendations'
  }

  formatResponse(response){
    return this.responseFormatter.personalizedRecommendations(response)
  }

  getRequestOptions() {
    return {
      path: "recommendations/personalized",
      params: {
        per_page: this.getLimit(),
        zero_state: this.getZeroStateParams(), //
        request: ["results", "details"],
        user: {
          // user_id: "", //
          device_id: cookie.get(COOKIES.TA_DEVICE), //TA_DEVICE
        }
      }
    }
  }

  getLimit() {
    if (this.requestOptions.hasOwnProperty("params") && this.requestOptions.params.hasOwnProperty("limit")) {
      return this.requestOptions.params.limit
    }
    return 16
  }

  getZeroStateParams(){
    if (this.requestOptions.hasOwnProperty("params") && this.requestOptions.params.hasOwnProperty("zero_state")) {
      return this.requestOptions.params.zero_state
    }
    return 'bestsellers'
  }

  getHelpersToExpose(response, formattedResponse): {} {
    return {
      ...super.getHelpersToExpose(response, formattedResponse),
      getAnalyticsData: () => this.extractAnalyticsData(response),
      getProducts: () => formattedResponse ? formattedResponse.products : []
    }
  }

  extractAnalyticsData(response) {
    if(response === false){
      return {}
    }

    let plDetails: any = {}
    if (response.hasOwnProperty("sku")) {
      plDetails["product"] = response.sku
    }
    const productSkus = response["details"].map((product) => product.sku)
    return {
      event_type: "product_list",
      event_details: {
        pl_type: "widget-personalized",
        pl_details: plDetails,
        pl_products: productSkus,
        pl_total: productSkus.length
      }
    }
  }
}

export default PersonalizedRecommendations