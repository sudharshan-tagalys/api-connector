import Formatter from './formatter';
declare class ShopifyResponseFormatter extends Formatter {
    platformFieldTranslations(): {
        introduced_at: string;
        _vendor: string;
    };
    fieldsToIgnore(): string[];
}
declare class SimilarProductsResponseFormatter extends ShopifyResponseFormatter {
    getFormattedResponse(response: any): void;
}
declare const similarProductsResponseFormatter: SimilarProductsResponseFormatter;
export { similarProductsResponseFormatter };
