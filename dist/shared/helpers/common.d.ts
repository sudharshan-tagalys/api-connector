declare const getUrlEncodedQueryString: (baseUrl: any, params: any) => string;
declare const getEncodedQueryString: ({ query, queryFilter, filter }: {
    query?: string;
    queryFilter?: {};
    filter?: {};
}) => string;
export { getUrlEncodedQueryString, getEncodedQueryString };
