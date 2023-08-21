import configuration from "../configuration";
import localStorage from "../localStorage";

const TAGALYS_API_STATUS = "TAGALYS_API_STATUS"

class TagalysAPI{
  async call(method: string, path: string, requestOptions, headers = { contentType: "application/x-www-form-urlencoded" }){
    const response = await fetch(this.url(path), {
      body: requestOptions.params,
      headers: {
        "Content-Type": headers.contentType,
      },
      method: method,
    });
    if(response.status === 200){
      const parsedResponse = await response.json()
      if(requestOptions.hasOwnProperty("onSuccess")){
        return requestOptions.onSuccess(parsedResponse)
      }
      return parsedResponse
    }else{
      // this.setAsOffline()
      if(typeof(requestOptions.onFailure) != 'undefined') {
        return requestOptions.onFailure(response);
      }
      return response
    }
  }

  url(path): string{
    return `${configuration.getServerUrl()}/v1/${path}`
  }

  isOnline(){
    return !localStorage.getItem(TAGALYS_API_STATUS)
  }

  static isOffline(){
    return (localStorage.getItem(TAGALYS_API_STATUS) === "offline")
  }

  setAsOffline(){
    const AN_HOUR = 3600000
    localStorage.setValue(TAGALYS_API_STATUS, "offline", AN_HOUR)
  }

  setAsOnline(){
    localStorage.removeItem(TAGALYS_API_STATUS)
  }

  async isAPIHealthy(){
    const response = await fetch(this.url("api_health"), {
      body: null,
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    if(response.status === 200){
      return true
    }
    return false
  }
}

export default TagalysAPI;