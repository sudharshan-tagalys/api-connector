class API{
  private identification: any;
  call(method, path, requestOptions){
    var xhr = new XMLHttpRequest();
    xhr.open(method, this.url(path));
    xhr.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");
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

  url(path) {
    return `http://172.17.0.1:3003/v1/${path}`;
  }

  getCredentials() {
    return this.identification;
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