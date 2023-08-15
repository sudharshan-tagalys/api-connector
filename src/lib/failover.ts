import TagalysAPI from './api/tagalysApi'
import configuration from './configuration';

class Failover {
  private apiClient
  private intervalId;

  constructor() {
    this.apiClient = new TagalysAPI()
  }

  activate() {
    this.apiClient.setAsOffline()
    this.pollUntilAPIisHealthy()
    if(configuration.onFailover){
      return configuration.onFailover()
    }
    this.reloadWithoutQueryParams()
  }

  deactivate() {
    console.log("Deactivating failover since api health returned to normal")
    this.apiClient.setAsOnline()
    clearInterval(this.intervalId)
  }

  hasFailedover() {
    return !this.apiClient.isOnline()
  }

  reloadWithoutQueryParams(){
    const url = window.location.href;
    window.location.href = url.split('?')[0];
  }

  pollUntilAPIisHealthy(){
    if(!this.intervalId){
      this.intervalId = setInterval(async function(){
        const isAPIHealthy = await this.apiClient.isAPIHealthy()
        if(isAPIHealthy){
          this.deactivate()
        }
      }.bind(this), 180000)
    }
  }
}

export default new Failover()