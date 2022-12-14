import { getEncodedQueryString } from "../shared/helpers/common";

interface Configuration{
  categorySeparator: string,
  hierarchySeparator: string
}
class SuggestionsFormatter {
  private configuration: Configuration

  constructor(configuration: Configuration){
    this.configuration = configuration;
  }

  format(response) {
    if (!response.queries) return []
    return response.queries.map((section) => {
      const thisSection = { ...section }
      const thisItems = thisSection.items
      const formattedItems = thisItems.map((item) => {
        if (item.hasOwnProperty("link")) {
          return {
            displayString: item.title,
            link: item.link,
            rawQuery: item
          }
        }
        const displayString = Array.isArray(item.query) ? item.query.join(` ${this.configuration.hierarchySeparator} `) : item.query
        return {
          displayString: displayString,
          queryString: getEncodedQueryString({
            query: displayString,
            queryFilters: item.query_filters
          }),
          rawQuery: item
        }
      })
      return {
        section_title: thisSection.section_title,
        section_id: thisSection.section_id,
        items: formattedItems
      }
    })
  }

  formatPopularSearches(response) {
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
          const suffix = queryObj.in.hierarchy.map((item) => item.name).join(` ${this.configuration.hierarchySeparator} `)
          const qf = {
            ...queryObj.filter,
            [`${queryObj.in.tag_set.id}`]: queryObj.in.hierarchy.map((item) => item.id),
          }
          formattedQuery.displayString = `${prefix} ${this.configuration.hierarchySeparator} ${suffix}`
          formattedQuery.queryString = getEncodedQueryString({
            query: formattedQuery.displayString,
            queryFilters: qf
          })
        } else {
          formattedQuery.displayString = queryObj.query.join(` ${this.configuration.categorySeparator} `)
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