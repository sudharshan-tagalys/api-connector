import TagalysAPI from '../../lib/api/tagalysApi'



class Failover {
  private apiClient
  private intervalId;

  constructor() {
    this.apiClient = new TagalysAPI()
  }

  activate() {
    this.apiClient.setAsOffline()
    window.location.href = this.getUrlWithoutQueryParams(); 
    this.pollUntilAPIisHealthy()
  }

  deactivate() {
    console.log("Deactivating failover since api health returned to normal")
    this.apiClient.setAsOnline()
    clearInterval(this.intervalId)
  }

  hasFailedover() {
    return !this.apiClient.isOnline()
  }

  getUrlWithoutQueryParams(){
    const url = window.location.href;
    return url.split('?')[0];
  }

  pollUntilAPIisHealthy(){
    if(!this.intervalId){
      this.intervalId = setInterval(function(){
        this.apiClient.call("GET", "/health", { onSuccess: this.deactivate })
      }.bind(this), 180000)
    }
  }
}

export default new Failover()