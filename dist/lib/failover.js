"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tagalysApi_1 = require("./api/tagalysApi");
var configuration_1 = require("./configuration");
var Failover = /** @class */ (function () {
    // private intervalId;
    function Failover() {
        this.apiClient = new tagalysApi_1.default();
    }
    Failover.prototype.activate = function () {
        this.apiClient.setAsOffline();
        // this.pollUntilAPIisHealthy()
        if (configuration_1.default.getFailoverCallback()) {
            var callback = configuration_1.default.getFailoverCallback();
            return callback();
        }
        this.reloadWithoutQueryParams();
    };
    Failover.prototype.deactivate = function () {
        this.apiClient.setAsOnline();
        // clearInterval(this.intervalId)
    };
    Failover.prototype.hasFailedOver = function () {
        return !this.apiClient.isOnline();
    };
    Failover.prototype.reloadWithoutQueryParams = function () {
        var url = window.location.href;
        window.location.href = url.split('?')[0];
    };
    Failover.prototype.pollUntilAPIisHealthy = function () {
        // if(!this.intervalId){
        //   this.intervalId = setInterval(async function(){
        //     const isAPIHealthy = await this.apiClient.isAPIHealthy()
        //     if(isAPIHealthy){
        //       this.deactivate()
        //     }
        //   }.bind(this), 180000)
        // }
    };
    return Failover;
}());
exports.default = new Failover();
//# sourceMappingURL=failover.js.map