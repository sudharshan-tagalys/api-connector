declare class TagalysToCommonResponseFormatter {
    formatDetail: (detail: any) => any;
    formatImages(images: any): any;
    getFeaturedImage(images: any): any;
    formatTags(tags: any): any;
    formatVendor(_vendor: any): any;
    formatMetafields(detail: any): any;
    getPriceRelatedFields(detail: any): {
        price_varies: boolean;
        compare_at_price_varies: boolean;
        price: number;
        compare_at_price: number;
        price_min: number;
        price_max: number;
        compare_at_price_min: number;
        compare_at_price_max: number;
    };
    getOptionRelatedFields(detail: any): {};
    formatVariants(variants: any): any;
    hasOnlyDefaultVariant(options: any, variants: any): boolean;
    helpersToExpose(): {
        formatDetail: (detail: any) => any;
    };
    static export(): {
        TagalysToCommonResponseFormatter: {
            new: () => {
                formatDetail: (detail: any) => any;
            };
        };
    };
}
export default TagalysToCommonResponseFormatter;
