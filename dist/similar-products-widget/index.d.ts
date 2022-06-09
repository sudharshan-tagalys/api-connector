import Widget from "../lib/widget";
export declare class SimilarProductsWidget extends Widget {
    exporterName(): string;
    path(): string;
    plType(): string;
    formatResponse(response: any): any;
    isFailureResponse(response: any): boolean;
}
declare const _default: SimilarProductsWidget;
export default _default;
