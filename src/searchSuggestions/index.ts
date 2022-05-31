import APIConnector from "../lib/apiConnector"
import { DEFAULT_REQUEST_OPTIONS } from "../shared/constants"
class SearchSuggestions extends APIConnector {
  getRequestOptions() {
    return {
      path: `ss`,
      params: {
        q: this.requestOptions.params.query,
        products: this.requestOptions.params.request.products,
        queries: this.requestOptions.params.request.queries
      },
    }
  }

  extractAnalyticsData(response) {
    return response
  }

  onSuccessfulResponse(response) {
    this.requestOptions.onSuccess(this.responseFormatter.searchSuggestions(response, this.requestOptions.configuration))
  }

  formatRequestParams(params) {
    return JSON.stringify(params)
  }

  setQuery(query, makeApiRequest) {
    this.requestOptions = {
      ...this.requestOptions,
      params: {
        ...this.requestOptions.params,
        query: query,
      }
    }
    makeApiRequest && this.call(this.requestOptions)
  }

  new(requestOptions) {
    this.requestOptions = requestOptions
    return {
      setQuery: (query, makeApiRequest = true) => this.setQuery(query, makeApiRequest)
    }
  }
}

export default {
  instance: new SearchSuggestions(),
  defaultRequestOptions: {
    ...DEFAULT_REQUEST_OPTIONS,
    configuration: {
      queryString: {
        query: "q",
        queryFilter: "qf"
      },
      categorySeperator: ">",
      hierachySeperator: "->"
    }
  }
}