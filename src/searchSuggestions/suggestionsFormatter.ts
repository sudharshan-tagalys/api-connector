interface Configuration{
  queryString: {
    query: string
    queryFilter: string
  },
  categorySeperator: string,
  hierachySeperator: string
}
class SuggestionsFormatter {
  private configuration: Configuration
  getQueryString (q, qf={}) {
    const { query, queryFilter } = this.configuration.queryString
    const baseQueryString = `?${query}=`;
    if (typeof(qf) == 'undefined' || Object.keys(qf).length === 0) {
      return (baseQueryString + encodeURIComponent(q));
    } else {
      const str = Object.keys(qf).map(function(key){
          return `${encodeURIComponent(key)}-${encodeURIComponent(qf[key])}`
      }).join('~');
      const qf_param = `${encodeURIComponent(queryFilter)}=${str}`;
      return baseQueryString.concat(encodeURIComponent(q) +"&"+ qf_param);
    }
  }

  format(response, configuration) {
    this.configuration = configuration;
    if (!response.queries) return []
    return response.queries.map((queryObj) => {
      let formattedQuery = {
        displayString: "",
        queryString: "",
        rawQuery: queryObj
      }

      if (typeof queryObj.query === 'string') {
        formattedQuery.displayString = queryObj.query
        formattedQuery.queryString = this.getQueryString(queryObj.query)
        return formattedQuery
      }

      if (Array.isArray(queryObj.query)) {
        if (queryObj.hasOwnProperty('in')) {
          const prefix = queryObj.query[0]
          const suffix = queryObj.in.hierarchy.map((item) => item.name).join(` ${configuration.hierachySeperator} `)
          const qf = {
            ...queryObj.filter,
            [`${queryObj.in.tag_set.id}`]: queryObj.in.hierarchy.map((item) => item.id),
          }
          formattedQuery.displayString = `${prefix} ${configuration.hierachySeperator} ${suffix}`
          formattedQuery.queryString = this.getQueryString(formattedQuery.displayString, qf)
        } else {
          formattedQuery.displayString = queryObj.query.join(` ${configuration.categorySeperator} `)
          formattedQuery.queryString = this.getQueryString(formattedQuery.displayString, queryObj.filter)
        }
      }
      return formattedQuery
    })
  }
}
export default new SuggestionsFormatter()