export declare const unique: (value: any, index: any, self: any) => boolean;
export declare const applyCurrencyConversion: (number: any) => number;
export declare const getVariantPrices: (variants: any) => any;
export declare const getVariantCompareAtPrices: (variants: any) => any;
export declare const getProductPriceAndCompareAtPrice: (variants: any) => {
    price: number;
    compareAtPrice: number;
};
export declare const getMin: (prices: any) => number;
export declare const getMax: (prices: any) => number;
export declare const getPriceDetails: (product: any) => {
    price: number;
    compare_at_price: number;
    price_varies: boolean;
    compare_at_price_varies: boolean;
    price_min: number;
    price_max: number;
    compare_at_price_min: number;
    compare_at_price_max: number;
    variantPricesMap: {};
};
export declare const API_VERSION = "2023-04";
export declare const METAFIELD_TYPES: {
    LIST_PRODUCT_REFERENCE: string;
    COLLECTION_REFERENCE: string;
    SINGLE_LINE_TEXT_FIELD: string;
    LIST_SINGLE_LINE_TEXT_FIELD: string;
};
export declare const getIdFromGraphqlId: (graphqlId: any) => number;
