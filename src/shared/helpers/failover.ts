import TagalysAPI from '../../lib/api/tagalysApi'



class Failover {
  private apiClient
  constructor() {
    this.apiClient = new TagalysAPI()
    setInterval(this.pollUntilAPIisHealthy.bind(this), 180000)
  }

  activate() {
    this.apiClient.setAsOffline()
  }

  deactivate() {
    console.log("deactivating failover since api health returned to normal")
    this.apiClient.setAsOnline()
  }

  inFailoverMode() {
    return !this.apiClient.isOnline()
  }

  pollUntilAPIisHealthy(){
    console.log("checking api health")
    this.deactivate()
    return
    this.apiClient.call("GET", "/health", {
      onSuccess: function(){
        console.log("success")
      },
      onFailure: function(){

      }
    })
  }
}

export default new Failover()