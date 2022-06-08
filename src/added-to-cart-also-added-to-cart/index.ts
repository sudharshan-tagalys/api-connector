import Widget from "../lib/widget"

class AddedToCartAlsoAddedToCart extends Widget {

  exporterName(){
    return 'AddedToCartAlsoAddedToCart'
  }

  path(): string {
    return  `products/${this.requestOptions.params.productId}/atc_also_atc`
  }

  plType(): string{
    return 'widget-atc_also_atc'
  }

  formatResponse(response){
    return this.responseFormatter.addedToCartAlsoAddedToCart(response)
  }

}

export default new AddedToCartAlsoAddedToCart();