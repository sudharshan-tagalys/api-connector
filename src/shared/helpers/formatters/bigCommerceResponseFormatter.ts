import Formatter from './formatter';

class BigCommerceResponseFormatter extends Formatter {
  platformFieldTranslations(){
    return {
      __id: (data) => {
        return {
          key: 'id',
          value: parseInt(data.__id)
        }
      },
      name: 'name',
      introduced_at: 'date_created',
      images: "images",
      price: "price",
      sale_price: "sale_price",
    }
  }

}

export default BigCommerceResponseFormatter;