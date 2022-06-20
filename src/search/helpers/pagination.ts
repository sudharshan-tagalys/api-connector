const getCurrentPage = function(){

}

const getTotalPages = function(){

}

const goToNextPage = function() {
  this.setRequestState((reqState)=>{
    reqState.page += 1
    return reqState
  })
}

const goToPrevPage = function(){
  this.setRequestState((reqState)=>{
    reqState.page -= 1
    return reqState
  })
}

export default {
  goToNextPage,
  goToPrevPage,
  getCurrentPage,
  getTotalPages
}