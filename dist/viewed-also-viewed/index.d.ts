import Widget from "../lib/widget";
declare class ViewedAlsoViewed extends Widget {
    exporterName(): string;
    path(): string;
    plType(): string;
    formatResponse(response: any): any;
}
declare const _default: ViewedAlsoViewed;
export default _default;
