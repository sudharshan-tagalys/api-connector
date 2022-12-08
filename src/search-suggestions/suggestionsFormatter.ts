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
        const displayString = item.query.join(` ${this.configuration.hierarchySeparator} `)
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
}
export default SuggestionsFormatter