!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.SKUFilter=e():t.SKUFilter=e()}(window,function(){return function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e){function n(t){return function(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}(t)||function(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}()}function r(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=[],r=!0,i=!1,u=void 0;try{for(var o,s=t[Symbol.iterator]();!(r=(o=s.next()).done)&&(n.push(o.value),!e||n.length!==e);r=!0);}catch(t){i=!0,u=t}finally{try{r||null==s.return||s.return()}finally{if(i)throw u}}return n}(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}()}function i(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var u=function(){function t(e){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.data=e.data.slice(),this.format_skus=[],this.sku_types=[],this.convenient_render=null,this.conditions=[],this.selected_types=[],this.selected_detail="",this.match_skus=[],this.mismatch_skus=[],this.final_sku=null,this.target=null}return function(t,e,n){e&&i(t.prototype,e),n&&i(t,n)}(t,[{key:"initial",value:function(){var t=this.data;if(Array,t.length>0){var e=new Set,i=new Set,u=new Map;return t.map(function(t){var n={};Object.entries(t.type).map(function(t){var i=r(t,2),o=i[0],s=i[1];e.add(o),n[o.toString()]=s.toString(),u.get(o)?u.set(o,u.get(o).add(s)):u.set(o,new Set([s]))}),i.add(n)}),this.format_skus=n(i),this.sku_types=n(e),this.convenient_render=u,{skus:n(i),sku_types:n(e),convenient_render:u}}return!1}},{key:"filter",value:function(t){var e=[],n=[],i=[],u="";this.format_skus.map(function(r,o){t.every(function(t){var e=Object.keys(t)[0];if(0===o&&(u+="".concat(e,": ").concat(t[e]," ")),!i.includes(e)&&i.push(e),r[e]===t[e])return!0})?e.push(r):n.push(r)}),this.selected_types=i,this.selected_detail=u,this.match_skus=e,this.mismatch_skus=n;var o=[],s=new Map;e.map(function(t){Object.entries(t).map(function(t){var e=r(t,2),n=e[0],i=e[1],u=null;s.get(n)?(s.get(n).has(i)||((u={})[n]=i),s.set(n,s.get(n).add(i))):(s.set(n,new Set([i])),(u={})[n]=i),u&&o.push(u)})});var a=null;t.length===this.sku_types.length&&1===this.match_skus.length&&(this.sku_types.every(function(t){var n=null;return Object.keys(e[0]).map(function(e){t===e&&(n=!0)}),n})&&(a=e[0]));this.final_sku=a;var c=null;return a&&(c=this.data.find(function(t){return Object.entries(a).every(function(e){var n=r(e,2),i=n[0],u=n[1];if(t.type[i]===u)return!0})})),{selected_types:i,selected_detail:u,match_skus:e,mismatch_skus:n,render_list:o,final_sku:a,target:c}}}]),t}();t.exports=u}])});
//# sourceMappingURL=main.js.map