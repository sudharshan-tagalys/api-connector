import { applyCurrencyConversion } from '../common';
import Formatter from './formatter';

class MagentoResponseFormmater extends Formatter {
  platformFieldTranslations(){
    return {
      __id: "id",
      name: "name",
      sku: "sku",
      image_url: "image_url",
      price: "price",
      sale_price: "special_price",
      link: "link",
      in_stock: "in_stock",
      introduced_at: "created_at",
      __magento_type: "type_id",
      __categories__ids: "category_ids"
    }
  }

  fieldsToIgnore(){
    return ['']
  }

  applyCurrencyConversions(productDetail: any) {
    if(productDetail.price){
      productDetail.price = applyCurrencyConversion(productDetail.price)
    }
    if(productDetail.special_price){
      productDetail.special_price = applyCurrencyConversion(productDetail.special_price)
    }
    return productDetail
  }
}

export default MagentoResponseFormmater;