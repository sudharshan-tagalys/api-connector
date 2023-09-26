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
        images: (data: any) => {
            key: string;
            value: any;
        };
        variants: string;
        available: string;
        metafields: string;
        _product_type: (data: any) => {
            key: string;
            value: any;
        };
        media: string;
        published_collections_on_online_store: string;
    };
    additionalPlatformFields(detail: any): {
        handle: any;
    };
    hasOnlyDefaultVariant(options: any, variants: any): boolean;
    fieldsToIgnore(): string[];
    applyCurrencyConversions(productDetail: any): any;
}
export default ShopifyResponseFormatter;
