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
        shopify_tags: string;
        _vendor: string;
        images: string;
        variants: string;
    };
    additionalPlatformFields(detail: any): {
        handle: any;
    };
    similarProducts(response: any): {
        products: any;
    };
    smartWidgets(response: any): {
        name: any;
        widget_name: any;
        products: any;
    };
    searchSuggestions(response: any): any;
    fieldsToIgnore(): string[];
}
export default ShopifyResponseFormatter;
