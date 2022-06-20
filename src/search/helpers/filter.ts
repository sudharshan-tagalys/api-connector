function getFilters(){
  console.log(this)
  this.setResponseState({
    hi: 'thambi'
  })
  console.log(this)
}

function getAppliedFilters(){

}

export default {
  getFilters,
  getAppliedFilters
};