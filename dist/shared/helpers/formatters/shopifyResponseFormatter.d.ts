import Formatter from './formatter';
declare class ShopifyResponseFormatter extends Formatter {
    platformFieldTranslations(): {
        __id: string;
        name: string;
        price: string;
        sale_price: string;
        introduced_at: string;
        shopify_tags: string;
        _vendor: string;
        images: string;
        variants: string;
        handle: string;
    };
    fieldsToIgnore(): string[];
}
declare const _default: ShopifyResponseFormatter;
export default _default;
