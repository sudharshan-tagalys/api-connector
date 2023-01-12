import { DEFAULT_REQUEST_CALLBACKS, REQUEST_FORMAT } from "../../shared/constants";
import SearchSuggestions  from "..";

class LegacySearchSuggestions extends SearchSuggestions {
  getRequestOptions() {
    return {
      path: `ss`,
      format: REQUEST_FORMAT.JSON,
      params: {
        q: this.requestOptions.params.query,
        ...LegacySearchSuggestions.defaultRequestOptions().params.request,
        products: this.requestOptions.params.request.products,
        queries: this.requestOptions.params.request.queries,
      },
    };
  }

  static exporterName() {
    return "LegacySearchSuggestions";
  }

  formatResponse(response: any) {
    return this.responseFormatter.legacySearchSuggestions(
      response,
      this.requestOptions.configuration
    );
  }

  static defaultRequestOptions() :any {
    return {
      ...DEFAULT_REQUEST_CALLBACKS,
      params: {
        request: {
          products: 10,
          queries: 10,
        },
      },
      configuration: {
        categorySeparator: "▸",
        hierarchySeparator: "➜",
      },
    };
  }
}

export default LegacySearchSuggestions;