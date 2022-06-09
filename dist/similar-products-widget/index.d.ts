import Widget from "../lib/widget";
declare class SimilarProductsWidget extends Widget {
    static exporterName(): string;
    path(): string;
    plType(): string;
    formatResponse(response: any): any;
    isFailureResponse(response: any): boolean;
}
export default SimilarProductsWidget;
