declare class Failover {
    private apiClient;
    private intervalId;
    constructor();
    activate(): void;
    deactivate(): void;
    hasFailedOver(): boolean;
    reloadWithoutQueryParams(): void;
    pollUntilAPIisHealthy(params: any): void;
}
declare const _default: Failover;
export default _default;
