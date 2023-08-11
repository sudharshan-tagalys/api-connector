import TagalysAPI from '../../lib/api/tagalysApi'



class Failover {
  private apiClient
  private intervalId;
  constructor() {
    this.apiClient = new TagalysAPI()
    if(this.inFailoverMode()){
      this.intervalId = setInterval(this.pollUntilAPIisHealthy.bind(this), 180000)
    }
  }

  activate() {
    this.apiClient.setAsOffline()
    window.location.href = this.getUrlWithoutQueryParams(); 
    this.intervalId = setInterval(this.pollUntilAPIisHealthy.bind(this), 180000)
  }

  deactivate() {
    console.log("Deactivating failover since api health returned to normal")
    this.apiClient.setAsOnline()
    clearInterval(this.intervalId)
  }

  inFailoverMode() {
    return !this.apiClient.isOnline()
  }

  getUrlWithoutQueryParams(){
    const url = window.location.href;
    return url.split('?')[0];
  }

  pollUntilAPIisHealthy(){
    this.apiClient.call("GET", "/health", { onSuccess: this.deactivate })
  }
}

export default new Failover()