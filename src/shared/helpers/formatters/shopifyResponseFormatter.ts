import PlatformHelpers from '../../platform-helpers'
import Formatter from './formatter';

class ShopifyResponseFormatter extends Formatter {
  formatDetail = (detail: any): any => {
    const tagalysToCommonResponseFormatter = PlatformHelpers.TagalysToCommonResponseFormatter.new()
    return tagalysToCommonResponseFormatter.formatDetail(detail)
  };
}

export default ShopifyResponseFormatter;