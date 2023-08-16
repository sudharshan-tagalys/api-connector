import { getPlatformHelpers } from '../platform-helpers';
import Formatter from './formatter';

class ShopifyResponseFormatter extends Formatter {
  formatDetail = (detail: any): any => {
    const TagalysPlatformHelpers = getPlatformHelpers()
    const tagalysToCommonResponseFormatter = TagalysPlatformHelpers.TagalysToCommonResponseFormatter.new()
    return tagalysToCommonResponseFormatter.formatDetail(detail)
  };
}

export default ShopifyResponseFormatter;