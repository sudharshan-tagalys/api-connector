import Widget from "../lib/widget"

class BoughtAlsoBought extends Widget {

  static exporterName(): string{
    return 'BoughtAlsoBought'
  }

  path(): string {
    return `products/${this.requestOptions.params.productId}/bought_also_bought`
  }

  plType(): string{
    return "widget-bought_also_bought"
  }

  formatResponse(response){
    return this.responseFormatter.boughtAlsoBought(response)
  }
}

export default BoughtAlsoBought;