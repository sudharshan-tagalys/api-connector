import { APIIdentification } from "../types"
class API{
  private identification: APIIdentification;
  private apiServer: string;
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
    return `${this.apiServer}/v1/${path}`
  }

  getIdentification() {
    return this.identification;
  }

  setConfiguration(configuration) {
    this.identification = {
      client_code: configuration.credentials.clientCode,
      api_key: configuration.credentials.apiKey,
      store_id: configuration.storeId,
      // TODO: Confirm whether the API client should be dynamic
      api_client: {
        vendor: "tagalys",
        language: "js",
        version: "3",
        release: "1",
      }
    }
    this.apiServer = configuration.apiServer
  }

}
export default new API();