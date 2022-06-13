var Tagalys;(()=>{"use strict";var t={683:function(t,e,r){var n,o=this&&this.__extends||(n=function(t,e){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])},n(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)});Object.defineProperty(e,"__esModule",{value:!0});var i=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return o(e,t),e.exporterName=function(){return"AddedToCartAlsoAddedToCart"},e.prototype.path=function(){return"products/".concat(this.requestOptions.params.productId,"/atc_also_atc")},e.prototype.plType=function(){return"widget-atc_also_atc"},e.prototype.formatResponse=function(t){return this.responseFormatter.addedToCartAlsoAddedToCart(t)},e}(r(939).default);e.default=i},95:function(t,e,r){var n,o=this&&this.__extends||(n=function(t,e){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])},n(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)});Object.defineProperty(e,"__esModule",{value:!0});var i=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return o(e,t),e.exporterName=function(){return"BoughtAlsoBought"},e.prototype.path=function(){return"products/".concat(this.requestOptions.params.productId,"/bought_also_bought")},e.prototype.plType=function(){return"widget-bought_also_bought"},e.prototype.formatResponse=function(t){return this.responseFormatter.boughtAlsoBought(t)},e}(r(939).default);e.default=i},607:function(t,e,r){var n=this&&this.__assign||function(){return n=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++)for(var o in e=arguments[r])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},n.apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0}),e.APIConnector=void 0;var o=r(395),i=r(628),a=r(834),u=r(722),s=r(95),c=r(288),p=r(683);e.APIConnector=n(n(n(n(n(n({},a.default.export()),u.default.export()),s.default.export()),c.default.export()),p.default.export()),{setConfiguration:function(t){return o.default.setConfiguration(n(n({},i.DEFAULT_CONFIGURATION),t))}}),window.addEventListener("load",(function(){var t=new Event("tagalys:ready");document.dispatchEvent(t)}))},618:function(t,e,r){var n=this&&this.__assign||function(){return n=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++)for(var o in e=arguments[r])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},n.apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0}),e.COOKIES=void 0;var o=r(963),i=r(395),a=r(997);e.COOKIES={TA_DEVICE:"__ta_device",TA_VISIT:"__ta_visit",TA_LAST_PA_TIME:"__ta_last_pa_time"};var u=function(){function t(){this.lastEventTimestamp=!1,this.analyticsRapidEventSequence=0}return t.prototype.trackEvent=function(t,e){this.track("analytics/events/track",{eventType:t,details:e})},t.prototype.track=function(t,r,u){var s=r.eventType,c=r.details;if(void 0===u&&(u=3),a.default.isEnabled()){a.default.batchUpdate([{name:e.COOKIES.TA_DEVICE,expiryTime:63072e6},{name:e.COOKIES.TA_VISIT,expiryTime:18e5}]);var p={device_id:a.default.get(e.COOKIES.TA_DEVICE),visit_id:a.default.get(e.COOKIES.TA_VISIT)};this.analyticsRapidEventSequence=this.getAnalyticsRapidEventSequence(),this.lastEventTimestamp=Date.now();var l={event_type:s,details:c,rapid_event_sequence:this.analyticsRapidEventSequence,tracker_version:u,device_info:{},identification:n(n({},i.default.getApiIdentification()),{user:p})};o.default.call("POST",t,{params:JSON.stringify(l),onSuccess:function(t){if(s&&"product_action"==s&&t.hasOwnProperty("timestamp")){var r=t.timestamp.split("T")[1].substring(0,6);a.default.set(e.COOKIES.TA_LAST_PA_TIME,r,12e5)}}})}},t.prototype.getAnalyticsRapidEventSequence=function(){var t=999999,e=this.analyticsRapidEventSequence;return 0!=this.lastEventTimestamp&&(t=Math.floor((Date.now()-this.lastEventTimestamp)/1e3)),t<2?e+=1:e=0,e},t}();e.default=new u},963:(t,e,r)=>{Object.defineProperty(e,"__esModule",{value:!0});var n=r(395),o=function(){function t(){}return t.prototype.call=function(t,e,r,n){void 0===n&&(n={contentType:"application/x-www-form-urlencoded"});var o=new XMLHttpRequest;o.open(t,this.url(e)),o.setRequestHeader("Content-Type",n.contentType),o.onload=function(){200===o.status?r.onSuccess(JSON.parse(o.responseText)):void 0!==r.onFailure&&r.onFailure(JSON.parse(o.response))},o.onerror=function(){void 0!==r.onFailure&&r.onFailure(JSON.parse(o.response))},o.send(r.params)},t.prototype.url=function(t){return"".concat(n.default.getServerUrl(),"/v1/").concat(t)},t}();e.default=new o},43:function(t,e,r){var n=this&&this.__assign||function(){return n=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++)for(var o in e=arguments[r])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},n.apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var o=r(628),i=r(286),a=r(869),u=r(618),s=r(963),c=r(395),p=r(997),l={method:"POST",path:"",format:o.REQUEST_FORMAT.FORM_DATA,headers:{contentType:"application/x-www-form-urlencoded"},params:{}},f=function(){function t(){}return t.prototype.setResponseFormatter=function(){this.responseFormatter||(this.responseFormatter=a.default.responseFormatter())},t.prototype.call=function(t){var e=this;this.requestOptions=t,this.setResponseFormatter();var r=n(n({},l),this.getRequestOptions()),o=r.method,i=r.path,a=r.params,u=r.format;s.default.call(o,i,{params:this.formatRequestParams(n(n({},a),{identification:c.default.getApiIdentification()}),u),onSuccess:function(t){e.isFailureResponse(t)?e.requestOptions.onFailure(t):e.onSuccessfulResponse(t)},onFailure:function(t){e.requestOptions.onFailure(t)}})},t.prototype.formatRequestParams=function(t,e){return e===o.REQUEST_FORMAT.FORM_DATA?(0,i.objectToFormData)(t):e===o.REQUEST_FORMAT.JSON?JSON.stringify(t):t},t.prototype.onSuccessfulResponse=function(t){var e=this.extractAnalyticsData(t),r=this.formatResponse(t);this.requestOptions.onSuccess(r,e),c.default.canTrackAnalytics()&&u.default.trackEvent(e.event_type,e.event_details),c.default.analyticsStorageConsentProvided()||p.default.batchDelete(Object.values(u.COOKIES))},t.prototype.extractAnalyticsData=function(t){return t},t.prototype.formatResponse=function(t){return t},t.prototype.getRequestOptions=function(){return{}},t.prototype.isFailureResponse=function(t){return!1},t.defaultRequestOptions=function(){return{}},t.prototype.new=function(t){},t.exporterName=function(){throw new Error("Should specify exporter name")},t.export=function(){var t,e=this;return(t={})[this.exporterName()]={call:function(t,r){return void 0===r&&(r=e.defaultRequestOptions()),(new e).call(n({defaultRequestOptions:r},t))},new:function(t,r){return void 0===r&&(r=e.defaultRequestOptions()),(new e).new(n(n({},r),t))}},t},t}();e.default=f},395:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(){}return t.prototype.setConfiguration=function(t){this.validateConfiguration(t),this.configuration={identification:{client_code:t.credentials.clientCode,api_key:t.credentials.apiKey,store_id:t.storeId,currency:t.currencyCode,api_client:t.apiClient},platform:t.platform,serverUrl:t.serverUrl,track:t.track,analyticsStorageConsentProvided:t.analyticsStorageConsentProvided}},t.prototype.validateConfiguration=function(t){var e=this;["serverUrl","credentials","storeId","currencyCode"].forEach((function(r){if(!t.hasOwnProperty(r)||void 0===t[r])throw new Error(e.getConstructedErrorLabel(r))})),["clientCode","apiKey"].forEach((function(r){if(!t.credentials.hasOwnProperty(r))throw new Error(e.getConstructedErrorLabel(r))}))},t.prototype.getConstructedErrorLabel=function(t){return"".concat(t," configuration is missing. Refer docs.")},t.prototype.getConfiguration=function(){return this.configuration},t.prototype.getServerUrl=function(){return this.configuration.serverUrl},t.prototype.getApiIdentification=function(){return this.configuration.identification},t.prototype.getPlatform=function(){return this.configuration.platform.toLowerCase()},t.prototype.analyticsStorageConsentProvided=function(){return this.configuration.analyticsStorageConsentProvided()},t.prototype.canTrackAnalytics=function(){return this.configuration.track&&this.configuration.analyticsStorageConsentProvided()},t}();e.default=new r},997:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(){}return t.prototype.isEnabled=function(){var t=navigator.cookieEnabled;return t||(document.cookie="testcookie",t=-1!=document.cookie.indexOf("testcookie")),t},t.prototype.batchUpdate=function(t){var e=this;t.forEach((function(t){return e.update(t)}))},t.prototype.update=function(t){var e=t.name,r=t.value,n=void 0===r?"":r,o=t.expiryTime,i=this.get(n);""===i&&(i=function(t){for(var e="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",r="",n=32;n>0;--n)r+=e[Math.round(Math.random()*(e.length-1))];return r}()),this.set(e,i,o)},t.prototype.get=function(t){for(var e=t+"=",r=document.cookie.split(";"),n=0;n<r.length;n++){for(var o=r[n];" "==o.charAt(0);)o=o.substring(1);if(0==o.indexOf(e)){var i=o.substring(e.length,o.length);return i.replace(/%3B/g,";")}}return""},t.prototype.set=function(t,e,r){var n=new Date;n.setTime(n.getTime()+r);var o="expires="+n.toUTCString();e=e.replace(/;/g,"%3B"),-1===window.location.hostname.indexOf(".")?document.cookie=t+"="+e+"; "+o+"; path=/; domain="+window.location.hostname:document.cookie=t+"="+e+"; "+o+"; path=/; domain=."+window.location.hostname},t.prototype.delete=function(t){this.set(t,"",-1)},t.prototype.batchDelete=function(t){var e=this;t.forEach((function(t){return e.delete(t)}))},t}();e.default=new r},939:function(t,e,r){var n,o=this&&this.__extends||(n=function(t,e){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])},n(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)});Object.defineProperty(e,"__esModule",{value:!0});var i=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return o(e,t),e.prototype.getRequestOptions=function(){return{path:this.path(),params:this.getParams()}},e.prototype.getParams=function(){return{request:["result","details"],max_products:this.requestOptions.params.limit||16}},e.prototype.path=function(){return""},e.prototype.plType=function(){return""},e.prototype.extractAnalyticsData=function(t){var e={};t.hasOwnProperty("sku")&&(e.product=t.sku);var r=t.details.map((function(t){return t.sku}));return{event_type:"product_list",event_details:{pl_type:this.plType(),pl_details:e,pl_products:r,pl_total:r.length}}},e}(r(43).default);e.default=i},394:function(t,e){var r=this&&this.__assign||function(){return r=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++)for(var o in e=arguments[r])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},r.apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(){}return t.prototype.getQueryString=function(t,e){void 0===e&&(e={});var r=this.configuration.queryString,n=r.query,o=r.queryFilter,i="?".concat(n,"=");if(void 0===e||0===Object.keys(e).length)return i+encodeURIComponent(t);var a=Object.keys(e).map((function(t){return"".concat(encodeURIComponent(t),"-").concat(encodeURIComponent(e[t]))})).join("~"),u="".concat(encodeURIComponent(o),"=").concat(a);return i.concat(encodeURIComponent(t)+"&"+u)},t.prototype.format=function(t,e){var n=this;return this.configuration=e,t.queries?t.queries.map((function(t){var o,i={displayString:"",queryString:"",rawQuery:t};if("string"==typeof t.query)return i.displayString=t.query,i.queryString=n.getQueryString(t.query),i;if(Array.isArray(t.query))if(t.hasOwnProperty("in")){var a=t.query[0],u=t.in.hierarchy.map((function(t){return t.name})).join(" ".concat(e.hierachySeperator," ")),s=r(r({},t.filter),((o={})["".concat(t.in.tag_set.id)]=t.in.hierarchy.map((function(t){return t.id})),o));i.displayString="".concat(a," ").concat(e.hierachySeperator," ").concat(u),i.queryString=n.getQueryString(i.displayString,s)}else i.displayString=t.query.join(" ".concat(e.categorySeperator," ")),i.queryString=n.getQueryString(i.displayString,t.filter);return i})):[]},t}();e.default=n},628:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.REQUEST_FORMAT=e.DEFAULT_REQUEST_OPTIONS=e.DEFAULT_CONFIGURATION=e.SHOPIFY_PLATFORM=void 0,e.SHOPIFY_PLATFORM="shopify",e.DEFAULT_CONFIGURATION={platform:"custom",apiClient:{vendor:"tagalys-api-connector",language:"js",version:"1",release:"1"},track:!0,analyticsStorageConsentProvided:function(){return!1}};var r={onSuccess:function(t){console.log("API response:",t)},onFailure:function(t){console.error("Failed API response:",t)}};e.DEFAULT_REQUEST_OPTIONS=r,e.REQUEST_FORMAT={FORM_DATA:"FormData",JSON:"JSON"}},286:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.objectToFormData=void 0;var r=function(t){var e={};for(var n in t)if(t.hasOwnProperty(n))if("object"==typeof t[n]&&null!==t[n]){var o=r(t[n]);for(var i in o)o.hasOwnProperty(i)&&(e[n+"."+i]=o[i])}else e[n]=t[n];return e};e.objectToFormData=function(t){var e=r(t);return Object.keys(e).map((function(t){var r;return r=-1==t.indexOf(".")?t:t.replace(/.\d+/g,".").split(".").join("][").replace("]","")+"]",encodeURIComponent(r)+"="+encodeURIComponent(e[t])})).join("&")}},869:(t,e,r)=>{Object.defineProperty(e,"__esModule",{value:!0});var n=r(395),o=r(357),i=r(670);e.default={responseFormatter:function(){return"shopify"===n.default.getPlatform()?new i.default:new o.default}}},357:function(t,e,r){var n=this&&this.__assign||function(){return n=Object.assign||function(t){for(var e,r=1,n=arguments.length;r<n;r++)for(var o in e=arguments[r])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},n.apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0});var o=r(394),i=function(){function t(){var t=this;this.formatDetail=function(e){for(var r={},o={},i=0,a=Object.entries(e);i<a.length;i++){var u=a[i],s=u[0],c=u[1];if(!t.isIgnoredField(s))if(t.isPlatformField(s)){var p=t.translatePlatformField(s,e),l=p.key,f=p.value;o[l]=f}else r[s]=c}return n(n(n({},o),t.additionalPlatformFields(e)),{__tagalys_fields:r})}}return t.prototype.formatDetails=function(t){return t.map(this.formatDetail)},t.prototype.platformFieldTranslations=function(){return{}},t.prototype.additionalPlatformFields=function(t){return{}},t.prototype.fieldsToIgnore=function(){return[]},t.prototype.isPlatformField=function(t){return this.platformFieldTranslations().hasOwnProperty(t)},t.prototype.isIgnoredField=function(t){return this.fieldsToIgnore().includes(t)},t.prototype.translatePlatformField=function(t,e){var r=this.platformFieldTranslations();return"function"==typeof r[t]?(0,r[t])(e):{key:r[t],value:e[t]}},t.prototype.similarProducts=function(t){return{products:this.formatDetails(t.details)}},t.prototype.boughtAlsoBought=function(t){return{products:this.formatDetails(t.details)}},t.prototype.viewedAlsoViewed=function(t){return{products:this.formatDetails(t.details)}},t.prototype.addedToCartAlsoAddedToCart=function(t){return{products:this.formatDetails(t.details)}},t.prototype.smartWidgets=function(t){return{name:t.name,widget_name:t.widget_name,products:this.formatDetails(t.details)}},t.prototype.searchSuggestions=function(t,e){return{queries:(new o.default).format(t,e),products:this.formatDetails(t.products)}},t.prototype.popularSearches=function(t,e){return{queries:(new o.default).format({queries:t.popular_searches},e)}},t}();e.default=i},670:function(t,e,r){var n,o=this&&this.__extends||(n=function(t,e){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])},n(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)});Object.defineProperty(e,"__esModule",{value:!0});var i=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return o(e,t),e.prototype.platformFieldTranslations=function(){return{__id:function(t){return{key:"id",value:parseInt(t.__id)}},name:"title",price:"compare_at_price",sale_price:"price",introduced_at:"published_at",shopify_tags:function(t){return Array.isArray(t.shopify_tags)?{key:"tags",value:t.shopify_tags}:{key:"tags",value:t.shopify_tags.split(", ").sort()}},_vendor:function(t){return Array.isArray(t._vendor)?{key:"vendor",value:t._vendor[0]}:{key:"vendor",value:t._vendor}},images:"images",variants:"variants"}},e.prototype.additionalPlatformFields=function(t){return{handle:t.link.split("/products/")[1]}},e.prototype.fieldsToIgnore=function(){return["sku"]},e}(r(357).default);e.default=i},834:function(t,e,r){var n,o=this&&this.__extends||(n=function(t,e){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])},n(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)});Object.defineProperty(e,"__esModule",{value:!0});var i=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return o(e,t),e.exporterName=function(){return"SimilarProducts"},e.prototype.path=function(){return"products/".concat(this.requestOptions.params.productId,"/similar")},e.prototype.plType=function(){return"widget-similar_products"},e.prototype.formatResponse=function(t){return this.responseFormatter.similarProducts(t)},e.prototype.isFailureResponse=function(t){return"OK"!=t.status},e}(r(939).default);e.default=i},722:function(t,e,r){var n,o=this&&this.__extends||(n=function(t,e){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])},n(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)});Object.defineProperty(e,"__esModule",{value:!0});var i=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return o(e,t),e.exporterName=function(){return"SmartWidget"},e.prototype.path=function(){return"custom_widgets/".concat(this.requestOptions.params.widgetId)},e.prototype.plType=function(){return"widget-custom"},e.prototype.formatResponse=function(t){return this.responseFormatter.smartWidgets(t)},e.prototype.extractAnalyticsData=function(t){var e={id:this.requestOptions.params.widgetId,title:t.name},r=t.details.map((function(t){return t.sku}));return{event_type:"product_list",event_details:{pl_type:"widget-custom",pl_details:e,pl_products:r,pl_total:r.length}}},e}(r(939).default);e.default=i},288:function(t,e,r){var n,o=this&&this.__extends||(n=function(t,e){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r])},n(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function r(){this.constructor=t}n(t,e),t.prototype=null===e?Object.create(e):(r.prototype=e.prototype,new r)});Object.defineProperty(e,"__esModule",{value:!0});var i=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return o(e,t),e.exporterName=function(){return"ViewedAlsoViewed"},e.prototype.path=function(){return"products/".concat(this.requestOptions.params.productId,"/viewed_also_viewed")},e.prototype.plType=function(){return"widget-viewed_also_viewed"},e.prototype.formatResponse=function(t){return this.responseFormatter.viewedAlsoViewed(t)},e}(r(939).default);e.default=i}},e={},r=function r(n){var o=e[n];if(void 0!==o)return o.exports;var i=e[n]={exports:{}};return t[n].call(i.exports,i,i.exports,r),i.exports}(607);Tagalys=r})();