class Formatter {
  getFormattedResponse(response) {
    response.formatted_details = response.details.map(this.formatDetail);
    return response
  }

  platformFieldTranslations(){
    return {}
  }

  fieldsToIgnore(){
    return []
  }

  isPlatformField(fieldName){
    const platformFieldTranslations = this.platformFieldTranslations()
    return platformFieldTranslations.hasOwnProperty(fieldName)
  }

  ignoredField(fieldName){
    const fieldsToIgnore = this.fieldsToIgnore()
    return fieldsToIgnore.includes(fieldName)
  }

  translatedPlatformFieldName(fieldName){
    const platformFieldTranslations = this.platformFieldTranslations()
    return platformFieldTranslations[fieldName]
  }

  formatDetail = (detail) => {
    let __tagalys_fields = {}
    let platform_fields = {}

    for (const [fieldName, fieldValue] of Object.entries(detail)) {
      if(!this.ignoredField(fieldName)){
        if(this.isPlatformField(fieldName)){
          platform_fields[this.translatedPlatformFieldName(fieldName)] = fieldValue
        }else{
          __tagalys_fields[fieldName] = fieldValue
        }
      }
    }

    return {
      ...platform_fields,
      __tagalys_fields
    }
  }
}

export default Formatter;