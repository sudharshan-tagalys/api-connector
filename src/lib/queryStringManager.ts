import * as qs from "qs";

class QueryStringManager{
  private configuration;

  parse(params){
    return qs.parse(params)
  }

  stringify(params){
    return qs.stringify(params)
  }

  setConfiguration(configuration: any){
    this.configuration = configuration;
  }

  getConfiguration(){
    return this.configuration;
  }
}

export default new QueryStringManager();