import * as qs from "qs";

const DEFAULT_QUERY_STRING_CONFIGURATION = {
  queryParameter: 'q',
  queryFilterParameter: 'qf',
  filterParameter: 'f',
  pageParameter: 'page',
  sortParameter: 'sort'
}

class QueryStringManager{
  private configuration;

  constructor(){
    this.configuration = DEFAULT_QUERY_STRING_CONFIGURATION
  }

  parse(params){
    return qs.parse(params)
  }

  stringify(params){
    return qs.stringify(params, { encode: false })
  }

  setConfiguration(configuration){
    this.configuration = {
      ...DEFAULT_QUERY_STRING_CONFIGURATION,
      ...configuration
    };
  }

  getConfiguration(){
    return this.configuration;
  }
}

export default new QueryStringManager();