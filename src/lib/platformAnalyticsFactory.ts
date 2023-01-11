import configuration from './configuration';
import ShopifyAnalyticsTracker from './shopifyAnalyticsTracker';
import MagentoAnalyticsTracker from './magentoAnalyticsTracker';
import PlatformAnalyticsTracker from './platformAnalyticsTracker';


const platformAnalyticsTracker = () => {
  if(configuration.getPlatform() === 'shopify'){
    return new ShopifyAnalyticsTracker()
  }
  if (configuration.getPlatform() === 'magento') {
    return new MagentoAnalyticsTracker()
  }
  return new PlatformAnalyticsTracker()
}

export default {
  tracker: platformAnalyticsTracker
}