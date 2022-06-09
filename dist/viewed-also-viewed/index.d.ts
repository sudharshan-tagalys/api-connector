import Widget from "../lib/widget";
declare class ViewedAlsoViewed extends Widget {
    static exporterName(): string;
    path(): string;
    plType(): string;
    formatResponse(response: any): any;
}
export default ViewedAlsoViewed;
