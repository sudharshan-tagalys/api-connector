"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var analyticsTracker_1 = require("./analyticsTracker");
var cookie_1 = require("./cookie");
var platformAnalyticsTracker_1 = require("./platformAnalyticsTracker");
var MagentoAnalyticsTracker = /** @class */ (function (_super) {
    __extends(MagentoAnalyticsTracker, _super);
    function MagentoAnalyticsTracker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MagentoAnalyticsTracker.prototype.trackUser = function () {
        var loggedInUserId = cookie_1.default.get("__ta_logged_in");
        if (loggedInUserId !== "") {
            cookie_1.default.set(analyticsTracker_1.COOKIES.TA_USER_ID, loggedInUserId, 3600 * 1000 * 24 * 365 * 10);
            analyticsTracker_1.default.track("analytics/users/track", {
                user_id: loggedInUserId
            });
            cookie_1.default.delete("__ta_login_id");
        }
    };
    MagentoAnalyticsTracker.prototype.track = function () {
        this.trackUser();
    };
    return MagentoAnalyticsTracker;
}(platformAnalyticsTracker_1.default));
exports.default = MagentoAnalyticsTracker;
//# sourceMappingURL=magentoAnalyticsTracker.js.map