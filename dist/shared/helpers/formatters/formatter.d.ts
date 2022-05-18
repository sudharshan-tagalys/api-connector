declare class Formatter {
    getFormattedResponse(response: any): any;
    platformFieldTranslations(): {};
    fieldsToIgnore(): any[];
    isPlatformField(fieldName: any): boolean;
    ignoredField(fieldName: any): boolean;
    translatedPlatformFieldName(fieldName: any): any;
    formatDetail: (detail: any) => {
        __tagalys_fields: {};
    };
}
export default Formatter;
