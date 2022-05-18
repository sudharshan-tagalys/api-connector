import configuration from "./configuration";

class API{
  call(method: string, path: string, requestOptions, headers = { contentType: "application/x-www-form-urlencoded" }){
    var xhr = new XMLHttpRequest();
    xhr.open(method, this.url(path));
    xhr.setRequestHeader('Content-Type', headers.contentType);
    xhr.onload = function () {
      if (xhr.status === 200) {
        requestOptions.onSuccess(JSON.parse(xhr.responseText))
      } else {
        // Handling API failure callback
        if(typeof(requestOptions.onFailure) != 'undefined') {
          requestOptions.onFailure(JSON.parse(xhr.response));
        }
      }
    };
    xhr.onerror = function () {
      if(typeof(requestOptions.onFailure) != 'undefined') {
        requestOptions.onFailure(JSON.parse(xhr.response));
      }
    }
    xhr.send(requestOptions.params);
  }

  url(path): string{
    return `${configuration.getApiServer()}/v1/${path}`
  }
}
export default new API();