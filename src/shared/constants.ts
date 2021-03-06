const SHOPIFY_PLATFORM = "shopify"

const DEFAULT_CONFIGURATION = {
  platform: "custom",
  apiClient: {
    vendor: "tagalys-api-connector",
    language: "js",
    version: "1",
    release: "1",
  },
  track: true,
  analyticsStorageConsentProvided: function(){
    return false
  }
}

const DEFAULT_REQUEST_OPTIONS = {
  onSuccess: (response) => {
    console.log("API response:", response)
  },
  onFailure: (response) => {
    console.error("Failed API response:", response)
  }
}

const REQUEST_FORMAT = {
  FORM_DATA: "FormData",
  JSON: "JSON"
}

export {
  SHOPIFY_PLATFORM,
  DEFAULT_CONFIGURATION,
  DEFAULT_REQUEST_OPTIONS,
  REQUEST_FORMAT
}