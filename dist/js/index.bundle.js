(()=>{"use strict";var t=JSON.parse(localStorage.getItem("products"));function n(t,n){var r="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!r){if(Array.isArray(t)||(r=function(t,n){if(t){if("string"==typeof t)return e(t,n);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?e(t,n):void 0}}(t))||n&&t&&"number"==typeof t.length){r&&(t=r);var o=0,a=function(){};return{s:a,n:function(){return o>=t.length?{done:!0}:{done:!1,value:t[o++]}},e:function(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var c,i=!0,u=!1;return{s:function(){r=r.call(t)},n:function(){var t=r.next();return i=t.done,t},e:function(t){u=!0,c=t},f:function(){try{i||null==r.return||r.return()}finally{if(u)throw c}}}}function e(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,r=new Array(n);e<n;e++)r[e]=t[e];return r}function r(t,n,e,r,o,a,c){try{var i=t[a](c),u=i.value}catch(t){return void e(t)}i.done?n(u):Promise.resolve(u).then(r,o)}function o(t){return function(){var n=this,e=arguments;return new Promise((function(o,a){var c=t.apply(n,e);function i(t){r(c,o,a,i,u,"next",t)}function u(t){r(c,o,a,i,u,"throw",t)}i(void 0)}))}}var a=function(){var t=o(regeneratorRuntime.mark((function t(){var n,e;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,fetch("http://localhost:3000/api/cameras/");case 2:return n=t.sent,t.next=5,n.json();case 5:return e=t.sent,t.abrupt("return",e);case 7:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();(function(){var t=o(regeneratorRuntime.mark((function t(){var e,r,o,c,i,u,l;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,a();case 3:e=t.sent,r=document.getElementById("divProducts"),o=n(e);try{for(o.s();!(c=o.n()).done;)i=c.value,u="€ ".concat(Number(i.price/100).toFixed(2)),l='\n            <li class="col-6">\n                <div class="card border-light">\n                    <img class="card-img-top" src="'.concat(i.imageUrl,'" alt="">\n                    <div class="card-body px-0">\n                        <a class="text-decoration-none text-dark stretched-link" href="./pages/product.html?id=').concat(i._id,'">\n                            <h3 id="productTitle" class="card-title h6 mb-1">\n                                ').concat(i.name,'\n                            </h3>\n                        </a>\n                        <p id="productPrice" class="card-text">\n                            ').concat(u,"\n                        </p>\n                    </div>\n                </div>\n            </li>"),r.innerHTML+=l}catch(t){o.e(t)}finally{o.f()}t.next=12;break;case 9:t.prev=9,t.t0=t.catch(0),window.alert(t.t0);case 12:case"end":return t.stop()}}),t,null,[[0,9]])})));return function(){return t.apply(this,arguments)}})()(),null==t||""==t?document.getElementById("cartNotif").style.display="none":(document.getElementById("cartNotifNum").textContent=t.length,document.getElementById("cartNotif").style.display="block")})();