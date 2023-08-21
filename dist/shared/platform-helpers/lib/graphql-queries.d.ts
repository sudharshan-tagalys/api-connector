declare class GraphqlQueries {
    getImages: () => string;
    getBasicProductDetails: () => string;
    getMedia: () => string;
    getVariants: () => string;
    getReferenceMetafields: (level: any) => any;
    getProductMetafields: (level?: number) => any;
    getProductDetails: () => string;
    static getFilters: () => string;
}
export default GraphqlQueries;
