import APIConnector from "../lib/apiConnector"
import FilterHelpers from './helpers/filter';
import { DEFAULT_REQUEST_OPTIONS, REQUEST_FORMAT } from "../shared/constants";

interface SearchRequestParams {
  query: string
  queryMode: string
  filters: Array<any>
  request: Array<string>
  cache: boolean
  queryFilter: Array<any>
  limit: number
}

class Search extends APIConnector {
  public filterHelpers;
  public responseState = {
    filters: [],
    sortOptions: [],
    pagination: {
      page: null,
      total: null
    },
    products: [],
    variables: [],
    banners: []
  };

  public requestState = {
    filters: {},
    query: "",
    queryMode: ""
  }

  constructor(){
    super()
    this.filterHelpers = Object.entries(FilterHelpers).reduce((acc, [actionName, action]) => {
      return {
          ...acc,
          [actionName]: action.bind(this)
        };
      },
      {}
    )
  }

  setResponseState(responseState){
    this.responseState = {
      ...this.responseState,
      ...responseState
    }
  }

  setRequestState(requestState){
    this.requestState = {
      ...this.requestState,
      ...requestState
    }
  }

  getRequestOptions() {
    const searchRequestParams: SearchRequestParams = this.requestOptions.params
    let params: any = {}
    const paramsTranslations = {
      query: 'q',
      queryMode: 'qm',
      filters: 'f',
      request: 'request',
      queryFilter: 'f',
      limit: 'per_page',
      page: 'page'
    }
    for (const [key, value] of Object.entries(searchRequestParams)) {
      params[paramsTranslations[key]] = value
    }
    this.filterHelpers.getFilters()
    console.log(this.responseState)
    return {
      path: 'search',
      params: params,
    }
  }

  static exporterName(){
    return 'Search'
  }

  extractAnalyticsData(response) {
    return response
  }

  onSuccessfulResponse(response) {
    this.requestOptions.onSuccess(this.responseFormatter.search(response))
  }


  new(requestOptions){
    this.requestOptions = requestOptions
    return {
      
    }
  }

  static defaultRequestOptions(){
    return {
      ...DEFAULT_REQUEST_OPTIONS
    }
  }
}

export default Search