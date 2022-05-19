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

  ignoredField(fieldName){
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
      if(!this.ignoredField(fieldName)){
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
}

export default Formatter;