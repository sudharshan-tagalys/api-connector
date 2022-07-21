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
}

export default MagentoResponseFormmater;