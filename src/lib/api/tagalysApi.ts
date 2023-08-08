import configuration from "../configuration";
import localStorage from "../localStorage";

const TAGALYS_API_STATUS = "TAGALYS_API_STATUS"
class TagalysAPI{
  call(method: string, path: string, requestOptions, headers = { contentType: "application/x-www-form-urlencoded" }){
    var xhr = new XMLHttpRequest();
    xhr.open(method, this.url(path));
    xhr.setRequestHeader('Content-Type', headers.contentType);
    xhr.onload = function () {
      if (xhr.status === 200) {
        requestOptions.onSuccess(JSON.parse(xhr.responseText))
      } else {
        // Handling API failure callback
        this.setAsOffline()
        if(typeof(requestOptions.onFailure) != 'undefined') {
          requestOptions.onFailure(JSON.parse(xhr.response));
        }
      }
    }.bind(this);
    xhr.onerror = function () {
      if(typeof(requestOptions.onFailure) != 'undefined') {
        requestOptions.onFailure(JSON.parse(xhr.response));
      }
    }
    xhr.send(requestOptions.params);
    return xhr
  }

  url(path): string{
    return `${configuration.getServerUrl()}/v1/${path}`
  }

  isOnline(){
    return (localStorage.getItem(TAGALYS_API_STATUS) !== "offline")
  }

  setAsOffline(){
    localStorage.setValue(TAGALYS_API_STATUS, "offline", 3600000)
  }

  setAsOnline(){
    localStorage.removeItem(TAGALYS_API_STATUS)
  }
}

export default TagalysAPI;