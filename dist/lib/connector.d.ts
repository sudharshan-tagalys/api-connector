declare class Connector {
    requestOptions: any;
    call(requestOptions: any): void;
    extractAnalyticsData(data: any): any;
    method(): string;
    url(): string;
    path(): string;
}
export default Connector;
