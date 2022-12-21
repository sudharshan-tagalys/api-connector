import configuration from '../../../lib/configuration';
import Formatter from './formatter';
import ShopifyResponseFormatter from './shopifyResponseFormatter';
import MagentoResponseFormatter from './magentoResponseFormmater';
import BigCommerceResponseFormatter from './bigCommerceResponseFormatter'


const responseFormatter = () => {
  if(configuration.getPlatform() === 'shopify'){
    return new ShopifyResponseFormatter()
  }
  if (configuration.getPlatform() === 'magento') {
    return new MagentoResponseFormatter()
  }
  if (configuration.getPlatform() === 'bigcommerce') {
    return new BigCommerceResponseFormatter()
  }
  return new Formatter()
}

export default {
  responseFormatter: responseFormatter
}