import { RequestOptions } from "../shared/types";
interface SimilarProductsWidgetRequestOptions extends RequestOptions {
    params: {
        request: string[];
        max_products?: number;
    };
}
export { SimilarProductsWidgetRequestOptions };
