import Widget from "../lib/widget";
declare class AddedToCartAlsoAddedToCart extends Widget {
    static exporterName(): string;
    path(): string;
    plType(): string;
    formatResponse(response: any): any;
}
export default AddedToCartAlsoAddedToCart;
