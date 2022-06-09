import Widget from "../lib/widget"

class ViewedAlsoViewed extends Widget {

  static exporterName(): string{
    return 'ViewedAlsoViewed'
  }

  path(): string {
    return `products/${this.requestOptions.params.productId}/viewed_also_viewed`
  }

  plType(): string{
    return "widget-viewed_also_viewed"
  }

  formatResponse(response){
    return this.responseFormatter.viewedAlsoViewed(response)
  }

}

export default ViewedAlsoViewed;