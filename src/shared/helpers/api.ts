const flattenObject = function(ob) {
  let toReturn = {};
  for (let i in ob) {
    if (!ob.hasOwnProperty(i)) continue;
    if ((typeof ob[i]) == 'object' && ob[i] !== null) {
      let flatObject = flattenObject(ob[i]);
      for (let x in flatObject) {
        if (!flatObject.hasOwnProperty(x)) continue;

        toReturn[i + '.' + x] = flatObject[x];
      }
    } else {
      toReturn[i] = ob[i];
    }
  }
  return toReturn;
}

const objectToFormData = function (ob) {
  let flattenedObject = flattenObject(ob);
  let formData = Object.keys(flattenedObject).map(function (k) {
    let formatted = ""
    if(k.indexOf('.') == -1) {
      formatted = k;
    } else {
      formatted = k.replace(/.\d+/g, '.').split('.').join('][').replace(']', '') + ']';
    }
    return encodeURIComponent(formatted) + '=' + encodeURIComponent(flattenedObject[k])
  }).join('&');
  return formData;
}

export { objectToFormData }