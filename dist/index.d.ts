export declare const APIConnector: {
    SimilarProducts: {
        call: (requestOptions: any) => void;
    };
    SmartWidget: {
        call: (requestOptions: any) => void;
    };
    SearchSuggestions: {
        call: (requestOptions: any) => void;
        new: (requestOptions: any) => {
            setQuery: (query: any, makeApiRequest?: boolean) => void;
        };
    };
    setConfiguration: (config: any) => void;
};
