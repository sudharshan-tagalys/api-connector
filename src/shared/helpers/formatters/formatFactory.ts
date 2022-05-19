import configuration from '../../../lib/configuration';
import Formatter from './formatter';
import ShopifyResponseFormatter from './shopifyResponseFormatter';

const responseFormatter = () => {
  if(configuration.getPlatform() === 'shopify'){
    return new ShopifyResponseFormatter()
  }
  return new Formatter()
}

export default {
  responseFormatter: responseFormatter
}