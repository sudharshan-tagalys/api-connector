import Widget from "../lib/widget"
import { AnalyticsData } from "../shared/types"
class SmartWidget extends Widget {

  static exporterName(): string{
    return 'SmartWidget'
  }

  path(): string{
    return `custom_widgets/${this.requestOptions.params.widgetId}`
  }

  getParams(){
    return {
      request: ["result", "details"],
      per_page: this.requestOptions.params.limit || 16,
    }
  }

  plType(): string{
    return 'widget-custom'
  }

  formatResponse(response){
    return this.responseFormatter.smartWidgets(response)
  }

  extractAnalyticsData(response) : AnalyticsData {
    let plDetails: any = {
      id: this.requestOptions.params.widgetId,
      title: response.name
      // TODO: confirm url
    }
    const productSkus = response["details"].map((product) => product.sku)
    return {
      event_type: "product_list",
      event_details: {
        pl_type: "widget-custom",
        pl_details: plDetails,
        pl_products: productSkus,
        pl_total: productSkus.length
      }
    }
  }
}

export default SmartWidget;