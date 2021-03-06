import SuggestionsFormatter from "../../../search-suggestions/suggestionsFormatter";

class Formatter {
  formatDetails(details) {
    return details.map(this.formatDetail);
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

  searchSuggestions(response, configuration) {
    const suggestionsFormatter = new SuggestionsFormatter()
    return {
      queries: suggestionsFormatter.format(response, configuration),
      products: this.formatDetails(response.products)
    }
  }

  popularSearches(response, configuration) {
    const suggestionsFormatter = new SuggestionsFormatter()
    return {
      queries: suggestionsFormatter.format({ queries: response.popular_searches}, configuration),
    }
  }
}

export default Formatter;