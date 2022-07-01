import * as qs from "qs";

class QueryStringManager{
  private configuration;

  parse(params){
    return qs.parse(params)
  }

  stringify(params){
    return qs.stringify(params, { encode: false })
  }

  setConfiguration(configuration: any = {
    queryParameter: 'q',
    queryFilterParameter: 'qf',
    filterParameter: 'f',
    pageParameter: 'page',
    sortParameter: 'sort'
  }){
    this.configuration = configuration;
  }

  getConfiguration(){
    return this.configuration;
  }
}

export default new QueryStringManager();