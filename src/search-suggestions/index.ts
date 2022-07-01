import APIConnector from "../lib/apiConnector"
import { DEFAULT_REQUEST_CALLBACKS, REQUEST_FORMAT } from "../shared/constants"
import localStorage from "../lib/localStorage"
import PopularSearches from "../popular-searches"
import { getEncodedQueryString, getRequestParamsFromQueryString, getRequestParamsFromWindowLocation } from '../shared/helpers/common'
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

  static exporterName(){
    return 'SearchSuggestions'
  }

  extractAnalyticsData(response) {
    return response
  }

  formatResponse(response: any) {
    return this.responseFormatter.searchSuggestions(response, this.requestOptions.configuration)
  }

  setQuery(query, callAPI = true) {
    this.requestOptions.params.query = query
    callAPI && this.call(this.requestOptions)
  }

  getHelpersToExpose(){
    return {
      setQuery: (query, callAPI = true) => this.setQuery(query, callAPI),
      getPopularSearches: () => this.getPopularSearches(),
      addRecentSearch: (query) => this.addRecentSearch(query),
      removeRecentSearch: (query) => this.removeRecentSearch(query),
      getRequestParamsFromQueryString: (queryString) => getRequestParamsFromQueryString(queryString),
      getRequestParamsFromWindowLocation: () => getRequestParamsFromWindowLocation()
    }
  }

  new(requestOptions){
    this.requestOptions = requestOptions
    return this.getHelpersToExpose()
  }

  getPopularSearches() {
    return new Promise((resolve, reject) => {
      const recentSearches = localStorage.getItem("tagalysRecentSearches") || { queries: [] }
      const popularSearches = new PopularSearches()
      // TODO: A way to have configuration inside the popularSearches interface itself.
      popularSearches.fetchPopularSearches(this.requestOptions.configuration).then((popularSearches: any) => {
        // move slice value to constant
        resolve({
          recentSearches: recentSearches.queries.slice(0,5),
          popularSearches: popularSearches.queries
        })
      })
    })
  }

  addRecentSearch(query) {
    const recentSearches = localStorage.getItem("tagalysRecentSearches") || { queries: [] }
    recentSearches.queries = recentSearches.concat([query])
    localStorage.setValue("tagalysRecentSearches", recentSearches, 3600000)
  }

  removeRecentSearch(displayString: string) {
    const recentSearches = localStorage.getItem("tagalysPopularSearches") || { queries: [] }
    recentSearches.queries = recentSearches.queries.filter(recentSearch => recentSearch.displayString !== displayString)
    localStorage.setValue("tagalysPopularSearches", recentSearches, 3600000)
  }

  static defaultRequestOptions(){
    return {
      ...DEFAULT_REQUEST_CALLBACKS,
      configuration: {
        queryString: {
          query: "q",
          queryFilter: "qf"
        },
        categorySeperator: "▸",
        hierachySeperator: "->"
      }
    }
  }
}

export default SearchSuggestions