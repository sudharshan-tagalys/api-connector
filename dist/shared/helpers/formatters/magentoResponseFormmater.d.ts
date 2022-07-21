import Formatter from './formatter';
declare class MagentoResponseFormmater extends Formatter {
    platformFieldTranslations(): {
        __id: string;
        name: string;
        sku: string;
        image_url: string;
        price: string;
        sale_price: string;
        link: string;
        in_stock: string;
        introduced_at: string;
        __magento_type: string;
        __categories__ids: string;
    };
    fieldsToIgnore(): string[];
}
export default MagentoResponseFormmater;
