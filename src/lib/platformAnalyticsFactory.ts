import configuration from './configuration';
import ShopifyAnalyticsTracker from './shopifyAnalyticsTracker';
import MagentoAnalyticsTracker from './magentoAnalyticsTracker';
import PlatformAnalyticsTracker from './platformAnalyticsTracker';


const platformAnalyticsTracker = (eventTypes) => {
  if(configuration.getPlatform() === 'shopify'){
    return new ShopifyAnalyticsTracker(eventTypes)
  }
  if (configuration.getPlatform() === 'magento') {
    return new MagentoAnalyticsTracker(eventTypes)
  }
  return new PlatformAnalyticsTracker(eventTypes)
}

export default {
  tracker: platformAnalyticsTracker
}