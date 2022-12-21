import Formatter from './formatter';
declare class BigCommerceResponseFormatter extends Formatter {
    platformFieldTranslations(): {
        __id: (data: any) => {
            key: string;
            value: number;
        };
        name: string;
        introduced_at: string;
        images: string;
        price: string;
        sale_price: string;
    };
}
export default BigCommerceResponseFormatter;
