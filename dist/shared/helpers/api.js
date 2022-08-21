"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectToFormData = void 0;
var qs_1 = require("qs");
var flattenObject = function (ob) {
    var toReturn = {};
    for (var i in ob) {
        if (!ob.hasOwnProperty(i))
            continue;
        if ((typeof ob[i]) == 'object' && ob[i] !== null) {
            var flatObject = flattenObject(ob[i]);
            for (var x in flatObject) {
                if (!flatObject.hasOwnProperty(x))
                    continue;
                toReturn[i + '.' + x] = flatObject[x];
            }
        }
        else {
            toReturn[i] = ob[i];
        }
    }
    return toReturn;
};
var objectToFormData = function (ob) {
    return (0, qs_1.stringify)(ob, { arrayFormat: 'brackets' });
};
exports.objectToFormData = objectToFormData;
//# sourceMappingURL=api.js.map