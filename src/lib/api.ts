import { objectToFormData } from "../utils/api"
class API{
  private identification: any;
  call(method, url, requestOptions, analyticsDataFormatter){
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");
    xhr.onload = function() {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        requestOptions.onSuccess(response, analyticsDataFormatter(response))
      }
    };
    xhr.onerror = function() {
      if(typeof(requestOptions.failure) != 'undefined') {
        requestOptions.onFailure(xhr);
      }
    }
    xhr.send(objectToFormData({
      ...requestOptions.params,
      identification: this.identification
    }));
  }

  // TODO: Perform validation of identification
  isInValidIdentification(identification) {
    return false;
  }

  setApiIdentification(identification) {
    this.identification = {
      client_code: identification.credentials.client_code,
      api_key: identification.credentials.api_key,
      store_id: identification.store_id,
      // TODO: Confirm whether the API client should be dynamic
      api_client: {
        vendor: "tagalys",
        language: "js",
        version: "3",
        release: "1",
      }
    };
  }
}
export default new API();