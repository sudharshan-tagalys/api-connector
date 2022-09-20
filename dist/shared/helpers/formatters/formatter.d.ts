declare class Formatter {
    formatDetails(details: any): any;
    platformFieldTranslations(): {};
    additionalPlatformFields(detail: any): {};
    fieldsToIgnore(): any[];
    isPlatformField(fieldName: any): boolean;
    isIgnoredField(fieldName: any): boolean;
    translatePlatformField(fieldName: any, detail: any): any;
    formatDetail: (detail: any) => {
        __tagalys_fields: {};
    };
    similarProducts(response: any): {
        products: any;
    };
    boughtAlsoBought(response: any): {
        products: any;
    };
    personalizedRecommendations(response: any): {
        products: any;
        personalized: any;
    };
    viewedAlsoViewed(response: any): {
        products: any;
    };
    addedToCartAlsoAddedToCart(response: any): {
        products: any;
    };
    smartWidgets(response: any): {
        name: any;
        widget_name: any;
        products: any;
    };
    productListingPage(response: any): {
        total_pages: number;
        page: any;
        total: any;
        name: any;
    };
    searchSuggestions(response: any, configuration: any): {
        queries: any;
        products: any;
    };
    search(response: any): any;
    getBasePlpResponse(response: any): {
        total_pages: number;
        page: any;
        total: any;
    };
    popularSearches(response: any, configuration: any): {
        queries: any;
    };
    recommendations(response: any): {
        name: any;
        widget_name: any;
        products: any;
    };
}
export default Formatter;
