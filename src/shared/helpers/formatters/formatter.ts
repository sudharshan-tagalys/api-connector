import SuggestionsFormatter from "../../../search-suggestions/suggestionsFormatter";

class Formatter {
  formatDetails(details) {
    return details.filter((detail) => detail !== false).map(this.formatDetail);
  }

  platformFieldTranslations(){
    return {}
  }

  additionalPlatformFields(detail){
    return {}
  }

  fieldsToIgnore(){
    return []
  }

  isPlatformField(fieldName){
    const platformFieldTranslations = this.platformFieldTranslations()
    return platformFieldTranslations.hasOwnProperty(fieldName)
  }

  isIgnoredField(fieldName){
    const fieldsToIgnore = this.fieldsToIgnore()
    return fieldsToIgnore.includes(fieldName)
  }

  translatePlatformField(fieldName, detail){
    const platformFieldTranslations = this.platformFieldTranslations()
    if(typeof platformFieldTranslations[fieldName] === 'function'){
      const formatter = platformFieldTranslations[fieldName]
      return formatter(detail)
    }
    return {
      key: platformFieldTranslations[fieldName],
      value: detail[fieldName]
    }
  }

  formatDetail = (detail) => {
    let __tagalys_fields = {}
    let platform_fields = {}

    for (const [fieldName, fieldValue] of Object.entries(detail)) {
      if(!this.isIgnoredField(fieldName)){
        if(this.isPlatformField(fieldName)){
          const { key, value } = this.translatePlatformField(fieldName, detail)
          platform_fields[key] = value
        }else{
          __tagalys_fields[fieldName] = fieldValue
        }
      }
    }

    return {
      ...platform_fields,
      ...this.additionalPlatformFields(detail),
      __tagalys_fields
    }
  }

  similarProducts(response){
    return {
      products: this.formatDetails(response.details)
    }
  }

  boughtAlsoBought(response) {
    return {
      products: this.formatDetails(response.details)
    }
  }

  personalizedRecommendations(response) {
    let formattedResponse = {
      products: this.formatDetails(response.details),
      personalized: response.personalized
    }
    if (response.hasOwnProperty('name')) {
      formattedResponse["name"] = response.name
    }
    return formattedResponse
  }

  viewedAlsoViewed(response) {
    return {
      products: this.formatDetails(response.details)
    }
  }


  addedToCartAlsoAddedToCart(response) {
    return {
      products: this.formatDetails(response.details)
    }
  }

  smartWidgets(response){
    return {
      name: response.name,
      widget_name: response.widget_name,
      products: this.formatDetails(response.details)
    }
  }

  productListingPage(response) {
    return {
      name: response.name,
      ...this.getBasePlpResponse(response)
    }
  }

  searchSuggestions(response, configuration) {
    const suggestionsFormatter = new SuggestionsFormatter(configuration)
    return {
      queries: suggestionsFormatter.format(response),
      products: this.formatDetails(response.products)
    }
  }

  search(response) {
    if (response.error) return response
    if (response.redirect_to_url) return { redirect_to_url:  response.redirect_to_url}
    const formattedResponse = {}
    if (response.query) {
      formattedResponse["query"] = response.query
    }
    if (response.query_original) {
      formattedResponse["query_original"] = response.query_original
    }
    if (response.query_mode) {
      formattedResponse["query_mode"] = response.query_mode
    }
    return {
      ...formattedResponse,
      ...this.getBasePlpResponse(response)
    }
  }

  getBasePlpResponse(response) {
    const totalPages = Math.ceil(response.total / response.per_page)
    let basePlpResponse = {
      total_pages: totalPages,
      page: response.page,
      total: response.total
    }
    if(response.details){
      basePlpResponse["products"] = this.formatDetails(response.details)
    }
    if(response.filters){
      basePlpResponse['filters'] = response.filters
    }
    if (response.sort_options) {
      let sortOptions = []
      response.sort_options.forEach((sortOption) => {
        if (sortOption.hasOwnProperty("directions")) {
          sortOption.directions.forEach((sortDirection) => {
            sortOptions.push({
              id: `${sortOption.id}-${sortDirection.direction}`,
              label: sortDirection.label,
              selected: sortDirection.selected
            })
          })
        } else {
          sortOptions.push(sortOption)
        }
      })
      basePlpResponse["sort_options"] = sortOptions
    }
    return basePlpResponse
  }

  popularSearches(response, configuration) {
    const suggestionsFormatter = new SuggestionsFormatter(configuration)
    return {
      queries: suggestionsFormatter.format({ queries: response.popular_searches}),
    }
  }
}

export default Formatter;