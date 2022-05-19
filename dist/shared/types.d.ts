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
interface APIIdentification {
    client_code: string;
    api_key: string;
    store_id: string;
    currency: string;
    api_client: {
        vendor: string;
        language: string;
        version: string;
        release: string;
    };
}
interface APIConfiguration {
    identification: APIIdentification;
    platform: string;
    apiServer: string;
    track: boolean;
    analyticsStorageConsentProvided: () => boolean;
}
export { RequestOptions, AnalyticsData, APIIdentification, APIConfiguration };
