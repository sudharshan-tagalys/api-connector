import APIConnector from "../lib/apiConnector"
import { DEFAULT_REQUEST_OPTIONS, REQUEST_FORMAT } from "../shared/constants"
class SearchSuggestions extends APIConnector {
  getRequestOptions() {
    return {
      path: `ss`,
      format: REQUEST_FORMAT.JSON,
      params: {
        q: this.requestOptions.params.query,
        products: this.requestOptions.params.request.products,
        queries: this.requestOptions.params.request.queries
      },
    }
  }

  exporterName(){
    return 'SearchSuggestions'
  }

  extractAnalyticsData(response) {
    return response
  }

  onSuccessfulResponse(response) {
    console.log("ind",this.requestOptions)
    this.requestOptions.onSuccess(this.responseFormatter.searchSuggestions(response, this.requestOptions.configuration))
  }

  setQuery(query, callAPI = true) {
    this.requestOptions.params.query = query
    callAPI && this.call(this.requestOptions)
  }

  new = (requestOptions) => {
    this.requestOptions = requestOptions
    return {
      setQuery: (query, callAPI = true) => this.setQuery(query, callAPI)
    }
  }

  defaultRequestOptions(){
    return {
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
}

export default new SearchSuggestions()