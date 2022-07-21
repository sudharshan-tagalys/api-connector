import APIConnector from "../apiConnector";
declare class Base extends APIConnector {
    filterHelpers: any;
    paginationHelpers: any;
    sortOptionHelpers: any;
    productHelpers: any;
    getDefaultRequestState(): any;
    getDefaultResponseState(): any;
    requestState: any;
    responseState: any;
    constructor();
    bindThisToHelpers(helpers: object): {};
    setResponseState(responseState: any): void;
    setRequestState(mutationCallback: any, callAPI?: boolean): void;
    getParamsFromRequestState(): any;
    getSortString(): any;
    internalSuccessCallback(_: any, formattedResponse: any): void;
    getHelpers(type: any): any;
    getHelpersToExpose(response: any, formattedResponse: any): any;
    setRequestParamsFromRequestState(): void;
    beforeAPICall(_: any): any;
    new(requestOptions: any): any;
    getRequestStateFromParams(params: any): any;
    getRequestParams(state: any): any;
    commonHelpers(): any;
}
export default Base;
