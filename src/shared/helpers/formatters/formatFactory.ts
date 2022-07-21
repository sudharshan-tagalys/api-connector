import configuration from '../../../lib/configuration';
import Formatter from './formatter';
import ShopifyResponseFormatter from './shopifyResponseFormatter';
import MagentoResponseFormatter from './magentoResponseFormmater';


const responseFormatter = () => {
  if(configuration.getPlatform() === 'shopify'){
    return new ShopifyResponseFormatter()
  }
  if (configuration.getPlatform() === 'magento') {
    return new MagentoResponseFormatter()
  }
  return new Formatter()
}

export default {
  responseFormatter: responseFormatter
}