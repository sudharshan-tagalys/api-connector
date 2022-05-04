interface RequestOptions {
    method: string;
    path: string;
    headers: {
        contentType: string;
    };
}
interface AnalyticsData {
    event_type: string;
    event_details: Object;
}
interface SimilarProductsWidgetRequestOptions extends RequestOptions {
    params: {
        request: string[];
        max_products?: number;
    };
}
interface APIIdentification {
    client_code: string;
    api_key: string;
    store_id: string;
    api_client: {
        vendor: string;
        language: string;
        version: string;
        release: string;
    };
}
interface APIConfiguration {
    identification: APIIdentification;
    apiServer: string;
    currency: Object;
}
export { SimilarProductsWidgetRequestOptions, AnalyticsData, APIIdentification, APIConfiguration };
