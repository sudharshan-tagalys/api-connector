import api from "./api"

class Connector{
  public requestOptions: any;
  call(requestOptions) {
    this.requestOptions = requestOptions;
    api.call(this.method(), this.url(), requestOptions, this.extractAnalyticsData);
  }
  extractAnalyticsData(data) {
    return data
  }
  method() {
    return "post";
  }
  url() {
    return `http://172.17.0.1:3003/v1${this.path()}`;
  }
  path() {
    return "";
  }
}

export default Connector;