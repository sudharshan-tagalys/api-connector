import TagalysAPI from './api/tagalysApi'
import configuration from './configuration';

class Failover {
  private apiClient
  // private intervalId;

  constructor() {
    this.apiClient = new TagalysAPI()
  }

  activate() {
    this.apiClient.setAsOffline()
    // this.pollUntilAPIisHealthy()
    if(configuration.getFailoverCallback()){
      const callback = configuration.getFailoverCallback()
      return callback()
    }
    this.reloadWithoutQueryParams()
  }

  deactivate() {
    this.apiClient.setAsOnline()
    // clearInterval(this.intervalId)
  }

  hasFailedOver() {
    return !this.apiClient.isOnline()
  }

  reloadWithoutQueryParams(){
    const url = window.location.href;
    window.location.href = url.split('?')[0];
  }

  pollUntilAPIisHealthy(){
    // if(!this.intervalId){
    //   this.intervalId = setInterval(async function(){
    //     const isAPIHealthy = await this.apiClient.isAPIHealthy()
    //     if(isAPIHealthy){
    //       this.deactivate()
    //     }
    //   }.bind(this), 180000)
    // }
  }
}

export default new Failover()