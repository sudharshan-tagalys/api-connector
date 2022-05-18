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
    var flattenedObject = flattenObject(ob);
    var formData = Object.keys(flattenedObject).map(function (k) {
        var formatted = "";
        if (k.indexOf('.') == -1) {
            formatted = k;
        }
        else {
            formatted = k.replace(/.\d+/g, '.').split('.').join('][').replace(']', '') + ']';
        }
        return encodeURIComponent(formatted) + '=' + encodeURIComponent(flattenedObject[k]);
    }).join('&');
    return formData;
};
export { objectToFormData };
