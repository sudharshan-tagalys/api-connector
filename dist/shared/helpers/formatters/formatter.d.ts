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
    productListingPage(response: any): any;
    searchSuggestions(response: any, configuration: any): {
        queries: any;
        products: any;
    };
    search(response: any): any;
    popularSearches(response: any, configuration: any): {
        queries: any;
    };
}
export default Formatter;
