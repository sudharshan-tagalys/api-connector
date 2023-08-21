declare class Failover {
    private apiClient;
    private intervalId;
    constructor();
    activate(): any;
    deactivate(): void;
    hasFailedOver(): boolean;
    reloadWithoutQueryParams(): void;
    pollUntilAPIisHealthy(): void;
}
declare const _default: Failover;
export default _default;
