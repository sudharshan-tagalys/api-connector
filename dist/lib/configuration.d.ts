import { APIConfiguration } from "../shared/types";
declare class Configuration {
    private configuration;
    setConfiguration(configuration: any): void;
    validateConfiguration(configuration: any): void;
    getConstructedErrorLabel(missingConfiguration: any): string;
    getConfiguration(): APIConfiguration;
    getServerUrl(): string;
    getApiIdentification(): import("../shared/types").APIIdentification;
    getPlatform(): string;
    analyticsStorageConsentProvided(): boolean;
    canTrackAnalytics(): boolean;
}
declare const _default: Configuration;
export default _default;
