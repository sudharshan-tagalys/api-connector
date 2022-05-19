declare class Formatter {
    formatDetails(details: any): any;
    platformFieldTranslations(): {};
    additionalPlatformFields(detail: any): {};
    fieldsToIgnore(): any[];
    isPlatformField(fieldName: any): boolean;
    isIgnoredField(fieldName: any): boolean;
    translatePlatformField(fieldName: any, detail: any): any;
    similarProducts(response: any): any;
    smartWidgets(response: any): any;
    searchSuggestions(response: any): any;
    formatDetail: (detail: any) => {
        __tagalys_fields: {};
    };
}
export default Formatter;
