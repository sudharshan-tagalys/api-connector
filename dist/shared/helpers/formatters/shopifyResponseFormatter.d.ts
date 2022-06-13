import Formatter from './formatter';
declare class ShopifyResponseFormatter extends Formatter {
    platformFieldTranslations(): {
        __id: (data: any) => {
            key: string;
            value: number;
        };
        name: string;
        price: string;
        sale_price: string;
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
    fieldsToIgnore(): string[];
}
export default ShopifyResponseFormatter;
