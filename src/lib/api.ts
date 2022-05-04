import { APIConfiguration, APIIdentification } from "../types"
class API{
  private configuration: APIConfiguration
  call(method: string, path: string, requestOptions, headers = { contentType: "application/x-www-form-urlencoded" }){
    var xhr = new XMLHttpRequest();
    xhr.open(method, this.url(path));
    xhr.setRequestHeader('Content-Type', headers.contentType);
    xhr.onload = function() {
      if (xhr.status === 200) {
        requestOptions.onSuccess(JSON.parse(xhr.responseText))
      }
    };
    xhr.onerror = function() {
      if(typeof(requestOptions.failure) != 'undefined') {
        requestOptions.onFailure(xhr);
      }
    }
    xhr.send(requestOptions.params);
  }

  url(path): string{
    return `${this.configuration.apiServer}/v1/${path}`
  }

  getIdentification() {
    return this.configuration.identification;
  }

  getCurrency() {
    return this.configuration.currency;
  }

  setConfiguration(configuration) {
    this.configuration = {
      identification: {
        client_code: configuration.credentials.clientCode,
        api_key: configuration.credentials.apiKey,
        store_id: configuration.storeId,
        // TODO: Confirm whether the API client should be dynamic
        api_client: {
          vendor: "tagalys",
          language: "js",
          version: "3",
          release: "1",
        },
      },
      apiServer: configuration.apiServer,
      currency: configuration.currency
    }
  }

}
export default new API();