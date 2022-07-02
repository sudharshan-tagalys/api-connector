import APIConnector from "../lib/apiConnector"
import localStorage from "../lib/localStorage"

class PopularSearches extends APIConnector {
  getRequestOptions(){
    return {
      path: "popular_searches"
    }
  }

  extractAnalyticsData(response) {
    return false
  }

  // rename to fetch
  // configuration to requestOptions
  fetchPopularSearches(configuration) {
    // if popular searches exist in user's local storage, then merge it with recentSearches and return it
    return new Promise((resolve, reject) => {
      const localPopularSearches = localStorage.getItem("tagalysPopularSearches") || { queries: [] }
      if (localPopularSearches.queries.length > 0) {
        resolve(localPopularSearches)
      } else {
        this.call({
          onSuccess: (response) => {
            const popularSearchesFromResponse = this.responseFormatter.popularSearches(response, configuration)
            localStorage.setValue('tagalysPopularSearches', popularSearchesFromResponse, 3600000)
            resolve(popularSearchesFromResponse)
          },
          onFailure: (response) => {
            reject(response)
          }
        })
      }
    })
  }

  beforeAPICall(params){
    return params
  }

  static exporterName(){
    return 'PopularSearches'
  }
}

export default PopularSearches;