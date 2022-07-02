import { getEncodedQueryString } from "../shared/helpers/common";

interface Configuration{
  categorySeperator: string,
  hierachySeperator: string
}
class SuggestionsFormatter {
  private configuration: Configuration

  constructor(configuration: Configuration){
    this.configuration = configuration;
  }

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
        formattedQuery.queryString = getEncodedQueryString({
          query: queryObj.query
        })
        return formattedQuery
      }

      if (Array.isArray(queryObj.query)) {
        if (queryObj.hasOwnProperty('in')) {
          const prefix = queryObj.query[0]
          const suffix = queryObj.in.hierarchy.map((item) => item.name).join(` ${this.configuration.hierachySeperator} `)
          const qf = {
            ...queryObj.filter,
            [`${queryObj.in.tag_set.id}`]: queryObj.in.hierarchy.map((item) => item.id),
          }
          formattedQuery.displayString = `${prefix} ${this.configuration.hierachySeperator} ${suffix}`
          formattedQuery.queryString = getEncodedQueryString({
            query: formattedQuery.displayString,
            queryFilters: qf
          })
        } else {
          formattedQuery.displayString = queryObj.query.join(` ${this.configuration.categorySeperator} `)
          formattedQuery.queryString = getEncodedQueryString({
            query: formattedQuery.displayString,
            queryFilters: queryObj.filter
          })
        }
      }
      return formattedQuery
    })
  }
}
export default SuggestionsFormatter