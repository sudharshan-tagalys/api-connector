import { APIConfiguration } from "../shared/types";
declare class Configuration {
    private configuration;
    setConfiguration(configuration: any): void;
    getConfiguration(): APIConfiguration;
    getApiServer(): string;
    getApiIdentification(): import("../shared/types").APIIdentification;
    canTrackAnalytics(): boolean;
}
declare const _default: Configuration;
export default _default;
