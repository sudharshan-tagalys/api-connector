import packageDetails from "../packageDetails"

const SHOPIFY_PLATFORM = "shopify"

const DEFAULT_CONFIGURATION = {
  platform: "custom",
  platformVariables: {},
  apiClient: packageDetails,
  track: true,
  analyticsStorageConsentProvided: function(){
    return false
  }
}

const DEFAULT_REQUEST_CALLBACKS = {
  onSuccess: (response) => {
    console.log("API response:", response)
  },
  beforeAPICall: (params) => { return params },
  onFailure: (response) => {
    console.error("Failed API response:", response)
  }
}

const REQUEST_FORMAT = {
  FORM_DATA: "FormData",
  JSON: "JSON",
  GRAPQHL: "GRAPHQL"
}

export {
  SHOPIFY_PLATFORM,
  DEFAULT_CONFIGURATION,
  DEFAULT_REQUEST_CALLBACKS,
  REQUEST_FORMAT
}