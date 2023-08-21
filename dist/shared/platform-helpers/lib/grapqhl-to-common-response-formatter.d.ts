declare class GraphqlResponseFormatter {
    hasOnlyDefaultVariant(options: any, variants: any): boolean;
    formatProducts(products: any): any;
    formatProduct(product: any, level?: number): {
        id: number;
        title: any;
        published_at: any;
        available: any;
        tags: any;
        variants: any;
        featured_image: any;
        images: any;
        media: any[];
        vendor: any;
        product_type: any;
        metafields: {};
        handle: any;
        options_with_values: any;
        price: number;
        compare_at_price: number;
        price_varies: boolean;
        compare_at_price_varies: boolean;
        price_min: number;
        price_max: number;
        compare_at_price_min: number;
        compare_at_price_max: number;
        options: any;
        has_only_default_variant: boolean;
        in_stock: boolean;
    };
    static formatOptions(options: any): any;
    formatImages(images: any): any;
    formatMedia(media: any): any[];
    formatImage(image: any): {
        alt: any;
        width: any;
        height: any;
        src: any;
    };
    formatVideoSources(videoSources: any): any;
    formatVideoSource(videoSource: any): {
        file_size: any;
        format: any;
        mime_type: any;
        height: any;
        width: any;
        url: any;
    };
    getFeaturedImage(images: any): any;
    formatVariants(variants: any): any;
    formatSelectedVariantOptions(variant: any): {};
    formatMetafields(metafields: any, level: any): {};
    formatMetafield(metafield: any, level: any): {
        type: any;
        id: number;
        ids?: undefined;
        value?: undefined;
    } | {
        type: any;
        ids: any;
        id?: undefined;
        value?: undefined;
    } | {
        type: any;
        value: any;
        id?: undefined;
        ids?: undefined;
    };
    formatFilters(filters: any, selectedFiltersFromRequestState: any, initialPriceRanges: any): any;
    static getFilterInputs(filters: any): {};
    getImagesToVariantIdsMap(variants: any): {};
}
export default GraphqlResponseFormatter;
