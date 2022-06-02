import APIConnector from "../lib/apiConnector"
import { AnalyticsData } from "../shared/types"

class PopularSearches extends APIConnector {
  getRequestOptions(){
    return {
      path: "popular_searches"
    }
  }

  exporterName(){
    return 'PopularSearches'
  }
}

export default new PopularSearches();