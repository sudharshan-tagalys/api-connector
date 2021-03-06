import Widget from "../lib/widget"

class SimilarProductsWidget extends Widget {

  static exporterName() {
    return 'SimilarProducts'
  }

  path(): string {
    return `products/${this.requestOptions.params.productId}/similar`
  }

  plType(): string{
    return "widget-similar_products"
  }

  formatResponse(response){
    return this.responseFormatter.similarProducts(response)
  }

  isFailureResponse(response) {
    return response.status != "OK"
  }
}

export default SimilarProductsWidget;