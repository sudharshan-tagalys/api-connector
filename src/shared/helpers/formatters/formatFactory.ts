import configuration from '../../../lib/configuration';
import ShopifyResponseFormatter from './shopifyResponseFormatter';

const responseFormatter = () => {
  if(configuration.getPlatform() === 'shopify'){
    return new ShopifyResponseFormatter()
  }
}

export default {
  responseFormatter: responseFormatter
}