import { getLegacyEncodedQueryString } from "../../shared/helpers/common";
import SuggestionsFormatter from "../suggestionsFormatter"

class LegacySearchSuggestionsFormatter extends SuggestionsFormatter{
  format(response) {
    if (!response.queries) return []
    return response.queries.map((queryObj) => {
      let formattedQuery = {
        displayString: "",
        queryString: "",
        rawQuery: queryObj
      }

      if (typeof queryObj.query === 'string') {
        formattedQuery.displayString = queryObj.query
        formattedQuery.queryString = this.getEncodedQueryString({
          query: queryObj.query
        })
        return formattedQuery
      }

      if (Array.isArray(queryObj.query)) {
        if (queryObj.hasOwnProperty('in')) {
          const prefix = queryObj.query[0]
          const suffix = queryObj.in.hierarchy.map((item) => item.name).join(` ${this.configuration.hierarchySeparator} `)
          const qf = {
            ...queryObj.filter,
            [`${queryObj.in.tag_set.id}`]: queryObj.in.hierarchy.map((item) => item.id),
          }
          formattedQuery.displayString = `${prefix} ${this.configuration.hierarchySeparator} ${suffix}`
          formattedQuery.queryString = this.getEncodedQueryString({
            query: formattedQuery.displayString,
            queryFilters: qf
          })
        } else {
          formattedQuery.displayString = queryObj.query.join(` ${this.configuration.categorySeparator} `)
          formattedQuery.queryString = this.getEncodedQueryString({
            query: formattedQuery.displayString,
            queryFilters: queryObj.filter
          })
        }
      }
      return formattedQuery
    })
  }

  getEncodedQueryString(options) {
    return getLegacyEncodedQueryString(options)
  }
}
export default LegacySearchSuggestionsFormatter