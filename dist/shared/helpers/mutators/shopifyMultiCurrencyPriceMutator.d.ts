declare class ShopifyMultiCurrencyPriceMutator {
    mutate(response: any): Promise<any>;
    mutateProductPrice(product: any, priceInfo: any): void;
    resetProductPrices(response: any): any;
    getVariantPrices(variants: any): any;
    getVariantCompareAtPrices(variants: any): any;
    getMin(prices: any): number;
    getMax(prices: any): number;
    resetProductPrice(product: any): void;
}
export default ShopifyMultiCurrencyPriceMutator;
