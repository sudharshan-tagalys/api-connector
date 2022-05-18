import { RequestOptions } from "../shared/types";

interface SmartWidgetRequestOptions extends RequestOptions {
  params: {
    request: string[];
    max_products?: number;
  }
}
export { SmartWidgetRequestOptions }