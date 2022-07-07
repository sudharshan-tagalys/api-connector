import Formatter from './formatter';
declare class ShopifyResponseFormatter extends Formatter {
    platformFieldTranslations(): {
        __id: (data: any) => {
            key: string;
            value: number;
        };
        name: string;
        introduced_at: string;
        shopify_tags: (data: any) => {
            key: string;
            value: any;
        };
        _vendor: (data: any) => {
            key: string;
            value: any;
        };
        images: string;
        variants: string;
    };
    additionalPlatformFields(detail: any): {
        handle: any;
    };
    hasOnlyDefaultVariant(options: any, variants: any): boolean;
    fieldsToIgnore(): string[];
}
export default ShopifyResponseFormatter;
