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
        compare_at_price_min: any;
        price_min: any;
        options: any;
        compare_at_price_varies: boolean;
        price_varies: boolean;
        has_only_default_variant: boolean;
    };
    fieldsToIgnore(): string[];
}
export default ShopifyResponseFormatter;
