import APIConnector from "../lib/apiConnector"
import { DEFAULT_REQUEST_OPTIONS, REQUEST_FORMAT } from "../shared/constants"
import localStorage from "../lib/localStorage"
import popularSearches from "../popular-searches"
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
    this.requestOptions.onSuccess(this.responseFormatter.searchSuggestions(response, this.requestOptions.configuration))
  }

  setQuery(query, callAPI = true) {
    this.requestOptions.params.query = query
    callAPI && this.call(this.requestOptions)
  }

  new(requestOptions){
    this.requestOptions = requestOptions
    return {
      setQuery: (query, callAPI = true) => this.setQuery(query, callAPI),
      getPopularSearches: () => this.getPopularSearches(),
      addRecentSearch: (query) => this.addRecentSearch(query),
      removeRecentSearch: (query) => this.removeRecentSearch(query)
    }
  }

  getPopularSearches() {
    return new Promise((resolve, reject) => {
      const recentSearches = localStorage.getItem("tagalysRecentSearches") || { queries: [] }
      // TODO: A way to have configuration inside the popularSearches interface itself.
      popularSearches.fetchPopularSearches(this.requestOptions.configuration).then((popularSearches: any) => {
        resolve({
          recentSearches: recentSearches.queries.slice(0,5),
          popularSearches: popularSearches.queries
        })
      })
    })
  }

  addRecentSearch(displayString: string) {
    const recentSearches = localStorage.getItem("tagalysRecentSearches") || { queries: [] }
    recentSearches.queries = recentSearches.concat([displayString])
    localStorage.setValue("tagalysRecentSearches", recentSearches, 3600000)
  }

  removeRecentSearch(displayString: string) {
    const recentSearches = localStorage.getItem("tagalysPopularSearches") || { queries: [] }
    recentSearches.queries = recentSearches.queries.filter(recentSearch => recentSearch.displayString !== displayString)
    localStorage.setValue("tagalysPopularSearches", recentSearches, 3600000)
  }

  defaultRequestOptions(){
    return {
      ...DEFAULT_REQUEST_OPTIONS,
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

export default new SearchSuggestions()