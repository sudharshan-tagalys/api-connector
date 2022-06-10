interface RequestOptions {
  path: string;
}

interface AnalyticsData {
  event_type: string;
  event_details: Object;
}

interface WidgetParams {
  request: string[];
  max_products?: number;
}
interface WidgetRequestOptions extends RequestOptions {
  params: WidgetParams
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
  }
}

interface APIConfiguration {
  identification: APIIdentification,
  platform: string,
  serverUrl: string,
  track: boolean,
  analyticsStorageConsentProvided: () => boolean
}

export {
  RequestOptions,
  AnalyticsData,
  WidgetParams,
  APIIdentification,
  APIConfiguration,
  WidgetRequestOptions
}