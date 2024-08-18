/*! For license information please see application.js.LICENSE.txt */
(()=>{"use strict";var t={d:(e,n)=>{for(var o in n)t.o(n,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})},o:(t,e)=>Object.prototype.hasOwnProperty.call(t,e),r:t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}},e={};t.r(e),t.d(e,{_m:()=>z,sV:()=>q,Yo:()=>h,k6:()=>O,R0:()=>P,GE:()=>H,Sd:()=>M,q9:()=>y,d$:()=>_,NL:()=>Y});function n(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=Array(e);n<e;n++)o[n]=t[n];return o}var o=function(t){var e=document.getElementById("message");e?(e.style.display=t&&t.trim().length>0?"block":"none",e.textContent=t):console.error("Message element not found. Error message:",t)},r=function(){localStorage.clear(),localStorage.setItem("proofingPhase","Hamburgers"),location.reload()};function a(){var t=document.body;"dark"===t.getAttribute("data-theme")?(t.removeAttribute("data-theme"),document.querySelector("#btn__mode-toggle .material-symbols-outlined").textContent="light_mode"):(t.setAttribute("data-theme","dark"),document.querySelector("#btn__mode-toggle .material-symbols-outlined").textContent="dark_mode")}var c=function(t){var e={"t__size-xxl":"140","t__size-xl":"100","t__size-l":"84","t__size-m":"56","t__size-s":"28","t__size-xs":"14"};if(e[t])return e[t];var n=t.length;return n<25?"t__size-xxl":n<50?"t__size-xl":n<95?"t__size-l":n<200?"t__size-m":n<1e3?"t__size-s":"t__size-xs"},i=function(t,e){if("undefined"!=typeof Storage)if("thisContent"!==e)localStorage.setItem(t,e);else{var n=document.getElementById(t).textContent;localStorage.setItem(t,n)}};function l(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var o,r,a,c,i=[],l=!0,s=!1;try{if(a=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;l=!1}else for(;!(l=(o=a.call(n)).done)&&(i.push(o.value),i.length!==e);l=!0);}catch(t){s=!0,r=t}finally{try{if(!l&&null!=n.return&&(c=n.return(),Object(c)!==c))return}finally{if(s)throw r}}return i}}(t,e)||s(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function s(t,e){if(t){if("string"==typeof t)return u(t,e);var n={}.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?u(t,e):void 0}}function u(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,o=Array(e);n<e;n++)o[n]=t[n];return o}function f(t){return f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},f(t)}function d(){d=function(){return e};var t,e={},n=Object.prototype,o=n.hasOwnProperty,r=Object.defineProperty||function(t,e,n){t[e]=n.value},a="function"==typeof Symbol?Symbol:{},c=a.iterator||"@@iterator",i=a.asyncIterator||"@@asyncIterator",l=a.toStringTag||"@@toStringTag";function s(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{s({},"")}catch(t){s=function(t,e,n){return t[e]=n}}function u(t,e,n,o){var a=e&&e.prototype instanceof b?e:b,c=Object.create(a.prototype),i=new A(o||[]);return r(c,"_invoke",{value:j(t,n,i)}),c}function p(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}e.wrap=u;var m="suspendedStart",g="suspendedYield",v="executing",h="completed",y={};function b(){}function _(){}function w(){}var S={};s(S,c,(function(){return this}));var x=Object.getPrototypeOf,E=x&&x(x(C([])));E&&E!==n&&o.call(E,c)&&(S=E);var L=w.prototype=b.prototype=Object.create(S);function I(t){["next","throw","return"].forEach((function(e){s(t,e,(function(t){return this._invoke(e,t)}))}))}function k(t,e){function n(r,a,c,i){var l=p(t[r],t,a);if("throw"!==l.type){var s=l.arg,u=s.value;return u&&"object"==f(u)&&o.call(u,"__await")?e.resolve(u.__await).then((function(t){n("next",t,c,i)}),(function(t){n("throw",t,c,i)})):e.resolve(u).then((function(t){s.value=t,c(s)}),(function(t){return n("throw",t,c,i)}))}i(l.arg)}var a;r(this,"_invoke",{value:function(t,o){function r(){return new e((function(e,r){n(t,o,e,r)}))}return a=a?a.then(r,r):r()}})}function j(e,n,o){var r=m;return function(a,c){if(r===v)throw Error("Generator is already running");if(r===h){if("throw"===a)throw c;return{value:t,done:!0}}for(o.method=a,o.arg=c;;){var i=o.delegate;if(i){var l=F(i,o);if(l){if(l===y)continue;return l}}if("next"===o.method)o.sent=o._sent=o.arg;else if("throw"===o.method){if(r===m)throw r=h,o.arg;o.dispatchException(o.arg)}else"return"===o.method&&o.abrupt("return",o.arg);r=v;var s=p(e,n,o);if("normal"===s.type){if(r=o.done?h:g,s.arg===y)continue;return{value:s.arg,done:o.done}}"throw"===s.type&&(r=h,o.method="throw",o.arg=s.arg)}}}function F(e,n){var o=n.method,r=e.iterator[o];if(r===t)return n.delegate=null,"throw"===o&&e.iterator.return&&(n.method="return",n.arg=t,F(e,n),"throw"===n.method)||"return"!==o&&(n.method="throw",n.arg=new TypeError("The iterator does not provide a '"+o+"' method")),y;var a=p(r,e.iterator,n.arg);if("throw"===a.type)return n.method="throw",n.arg=a.arg,n.delegate=null,y;var c=a.arg;return c?c.done?(n[e.resultName]=c.value,n.next=e.nextLoc,"return"!==n.method&&(n.method="next",n.arg=t),n.delegate=null,y):c:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,y)}function T(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function B(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function A(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(T,this),this.reset(!0)}function C(e){if(e||""===e){var n=e[c];if(n)return n.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var r=-1,a=function n(){for(;++r<e.length;)if(o.call(e,r))return n.value=e[r],n.done=!1,n;return n.value=t,n.done=!0,n};return a.next=a}}throw new TypeError(f(e)+" is not iterable")}return _.prototype=w,r(L,"constructor",{value:w,configurable:!0}),r(w,"constructor",{value:_,configurable:!0}),_.displayName=s(w,l,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===_||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,w):(t.__proto__=w,s(t,l,"GeneratorFunction")),t.prototype=Object.create(L),t},e.awrap=function(t){return{__await:t}},I(k.prototype),s(k.prototype,i,(function(){return this})),e.AsyncIterator=k,e.async=function(t,n,o,r,a){void 0===a&&(a=Promise);var c=new k(u(t,n,o,r),a);return e.isGeneratorFunction(n)?c:c.next().then((function(t){return t.done?t.value:c.next()}))},I(L),s(L,l,"Generator"),s(L,c,(function(){return this})),s(L,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var e=Object(t),n=[];for(var o in e)n.push(o);return n.reverse(),function t(){for(;n.length;){var o=n.pop();if(o in e)return t.value=o,t.done=!1,t}return t.done=!0,t}},e.values=C,A.prototype={constructor:A,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(B),!e)for(var n in this)"t"===n.charAt(0)&&o.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=t)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var n=this;function r(o,r){return i.type="throw",i.arg=e,n.next=o,r&&(n.method="next",n.arg=t),!!r}for(var a=this.tryEntries.length-1;a>=0;--a){var c=this.tryEntries[a],i=c.completion;if("root"===c.tryLoc)return r("end");if(c.tryLoc<=this.prev){var l=o.call(c,"catchLoc"),s=o.call(c,"finallyLoc");if(l&&s){if(this.prev<c.catchLoc)return r(c.catchLoc,!0);if(this.prev<c.finallyLoc)return r(c.finallyLoc)}else if(l){if(this.prev<c.catchLoc)return r(c.catchLoc,!0)}else{if(!s)throw Error("try statement without catch or finally");if(this.prev<c.finallyLoc)return r(c.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc<=this.prev&&o.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var a=r;break}}a&&("break"===t||"continue"===t)&&a.tryLoc<=e&&e<=a.finallyLoc&&(a=null);var c=a?a.completion:{};return c.type=t,c.arg=e,a?(this.method="next",this.next=a.finallyLoc,y):this.complete(c)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),y},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),B(n),y}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var o=n.completion;if("throw"===o.type){var r=o.arg;B(n)}return r}}throw Error("illegal catch attempt")},delegateYield:function(e,n,o){return this.delegate={iterator:C(e),resultName:n,nextLoc:o},"next"===this.method&&(this.arg=t),y}},e}function p(t,e,n,o,r,a,c){try{var i=t[a](c),l=i.value}catch(t){return void n(t)}i.done?e(l):Promise.resolve(l).then(o,r)}function m(t){return function(){var e=this,n=arguments;return new Promise((function(o,r){var a=t.apply(e,n);function c(t){p(a,o,r,c,i,"next",t)}function i(t){p(a,o,r,c,i,"throw",t)}c(void 0)}))}}var g=null,v={truetype:"ttf",opentype:"otf"},h=function(t){var e=t.target.files,n=document.getElementById("section__header-file-buttons");n.innerHTML="",Array.from(e).forEach(function(){var t=m(d().mark((function t(e){var o;return d().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,I(e,"server");case 2:o=t.sent,n.appendChild(o);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}()),setTimeout((function(){var t=n.querySelector(".btn__setfont");t&&t.click()}),0)},y=function(t,e){console.log("Attempting to load font: ".concat(e," from ").concat(t)),opentype.load(t,(function(n,r){if(n)console.error("Error loading font:",n),o("Error loading font: ".concat(n));else{console.log("Font loaded successfully: ".concat(e)),g=r;try{(function(t,e,n){new Promise((function(o,r){try{g=t,console.log("Font assigned globally: ".concat(n));var a="\n\t\t  @font-face {\n\t\t\tfont-family: '".concat(n,"';\n\t\t\tsrc: url('").concat(e,"') format('").concat("truetype"===t.outlinesFormat?"truetype":"opentype","');\n\t\t  }\n\t\t"),c=document.createElement("style");c.textContent=a,document.head.appendChild(c),console.log("Font-face rule applied: ".concat(a)),window.fontFamily=n,console.log("Window.fontFamily set to: ".concat(n)),b(n),["localhost","127.0.0.1",""].includes(location.hostname)&&(localStorage.setItem("fontFamily",n),localStorage.setItem("fontFamilySource",e),console.log("Font information saved to localStorage")),window.pendingStage?(_(window.pendingStage),window.pendingStage=null):_("Hamburgers"),console.log("Stage set successfully"),o()}catch(t){console.error("Error in onFontLoaded:",t),r(t)}}))})(r,t,e),_(localStorage.getItem("proofingPhase")||"Hamburgers")}catch(t){console.error("Error in onFontLoaded:",t),o("Error processing font: ".concat(t))}}}))},b=function(t){var e,n="";for(e in g.tables){if(g.tables[e],"cmap"===e){var o=g.tables.cmap.glyphIndexMap,r=Object.keys(o).length;window.proofingPhase=r<=100?"Hamburgers":r>=400?"Diacritics":"Spacing"}var a=g.outlinesFormat;if(a=v[a],"name"!==e);else{var c="";if(g.names.designer)var i=g.names.designer.en;else i="No Designer Name :(";if(g.names.postScriptName)var l=g.names.postScriptName.en;else l="Font Name";c+='<div class="section__header-name d-flex-grow t__left" contenteditable="true" spellcheck="false">'+i+"</div>",c+='<div class="section__header-name d-flex-grow t__center" spellcheck="false">'+l+"</div>",n+='.t__importedfontfamily { font-family: "'.concat(t,'" }'),c+='<div class="section__header-name  d-flex-grow t__right">'+(new Date).toJSON().slice(0,10).replace(/-/g,"/")+"</div>",document.getElementById("section__header-names").innerHTML=c}}document.getElementById("style__fontfamily").innerHTML=n,localStorage.getItem("proofingPhase")?_(localStorage.getItem("proofingPhase")):_(window.proofingPhase)},_=function(t){var e=document.getElementById("section__article-app"),n=document.getElementById("section__header-stage-buttons");if(!g)return console.warn("Font not loaded yet. Deferring stage setting."),void(window.pendingStage=t);fetch("src/js/proof.json").then((function(t){return t.json()})).then((function(o){var r=w(o,t),a=V(o,t);e.innerHTML=r,n.innerHTML=a,document.getElementById("style__opentype-features").innerHTML="",i("proofingPhase",t)})).catch((function(t){return console.error("Error loading JSON:",t)}))},w=function(t,e){if(!t[e])return'<div class="item d-flex t__center"><div class="item__proof">No features found! :...(</div></div>';var n=g.tables.gsub.features,o=Object.values(n).filter((function(t){return"object"===f(t)&&t.tag})).map((function(t){return t.tag})).filter((function(e){return void 0!==t.Features[e]})),r="";for(var a in t[e])if("Features"!==e||o.includes(a)){var i=c(t[e][a]),l="section__proofing-".concat(a),s="item--".concat(a),u="".concat(s),d=S(u,i),p=d.fontSize,m=d.lineHeight,v=d.letterSpacing,h=d.inlineStyle,y=x(s);r+='\n        <div id="'.concat(s,'" class="item">\n          <button class="btn btn-link add-item-above chip" onclick="insertField(\'').concat(s,'\')">+ Add Proof Window</button>\n          <div class="item__container d-flex">\n            <div class="item__sliders pt-2">\n              <div class="item__sliders-wrapper">\n                ').concat(E(s,u,p,m,v),"\n                ").concat(L(s,u),"\n                ").concat(j(s),"\n                ").concat(F(s,t,o),'\n                <button class="btn btn-secondary mr-1 mb-1 mt-6" title="Apply these styles to all visible proof sheets." onclick="passStyleValue(\'').concat(s,"','idiocracy','global')\">Global Idiocracy</button>\n              </div>\n            </div>\n            <div class=\"item__proof\">\n              <button class=\"btn btn-link remove-item-this invisible\" onclick=\"removeElementsByID('").concat(s,"')\">×</button>\n              ").concat(T(e,a,t,l,h,y,i),"\n            </div>\n          </div>\n        </div>\n      ")}return r},S=function(t,e){var n=localStorage.getItem("".concat(t,"-fontSize"))||c(e),o=localStorage.getItem("".concat(t,"-lineHeight"))||"1.2",r=localStorage.getItem("".concat(t,"-letterSpacing"))||"0em",a=localStorage.getItem("".concat(t,"-column-count"))||"1",i=localStorage.getItem("".concat(t,"-column-gap"))||"1em";return{fontSize:n,lineHeight:o,letterSpacing:r,columnCount:a,columnGap:i,inlineStyle:"\n\t  font-size: ".concat(n,"pt;\n\t  line-height: ").concat(o,";\n\t  letter-spacing: ").concat(r,";\n\t  column-count: ").concat(a,";\n\t  column-gap: ").concat(i,";\n\t")}},x=function(t){var e="";return g.tables.fvar&&(g.tables.fvar.axes.map((function(t){return t.tag})),e="font-variation-settings: "+g.tables.fvar.axes.map((function(e){var n=localStorage.getItem("".concat(t,"-").concat(e.tag,"-val")),o=null!==n?n:e.defaultValue;return"'".concat(e.tag,"' ").concat(o)})).join(", ")+";"),e},E=function(t,e,n,o,r){return'\n    <label for="'.concat(e,'-fontSize">Font Size </label>\n    <span class="t__right text-small" id="').concat(e,'-fontSize-val">').concat(n,'pt</span>\n    <input id="').concat(e,'-fontSize" type="range" class="slider" min="4" max="160" step="2" value="').concat(n,'" oninput="passStyleValue(\'').concat(t,"', 'fontSize', this.value)\">\n    \n    <label for=\"").concat(e,'-lineHeight">Line Height </label>\n    <span class="t__right text-small" id="').concat(e,'-lineHeight-val">').concat(o,'</span>\n    <input id="').concat(e,'-lineHeight" type="range" class="slider" min="0.6" max="3.0" step="0.01" value="').concat(o,'" oninput="passStyleValue(\'').concat(t,"', 'lineHeight', this.value)\">\n    \n    <label for=\"").concat(e,'-letterSpacing">Letter Spacing </label>\n    <span class="t__right text-small" id="').concat(e,'-letterSpacing-val">').concat(r,'</span>\n    <input id="').concat(e,'-letterSpacing" type="range" class="slider" min="-0.4" max="0.4" step="0.01" value="').concat(r,'" oninput="passStyleValue(\'').concat(t,"', 'letterSpacing', this.value)\">\n  ")},L=function(t,e){return g.tables.fvar?g.tables.fvar.axes.map((function(n){var o=localStorage.getItem("".concat(t,"-").concat(n.tag,"-val")),r=null!==o?o:n.defaultValue;return'\n        <label for="'.concat(e,"-").concat(n.tag,'">').concat(n.name.en,' </label>\n        <span class="t__right text-small" id="').concat(e,"-").concat(n.tag,'-val">').concat(r,'</span>\n        <input id="').concat(e,"-").concat(n.tag,'" type="range" class="slider" min="').concat(n.minValue,'" max="').concat(n.maxValue,'" value="').concat(r,'" oninput="passfvarValue(\'').concat(t,"', '").concat(n.tag,"', this.value, '").concat(g.tables.fvar.axes.map((function(t){return t.tag})).join(","),"')\">\n      ")})).join(""):""},I=function(){var t=m(d().mark((function t(e){var n,o,r,a,c,i,l,s=arguments;return d().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if("local"!==(n=s.length>1&&void 0!==s[1]?s[1]:"local")){t.next=11;break}return o=e.replace(".","-"),r="fonts/".concat(e),c=e.replace("-"," ").replace(/\.[^/.]+$/,""),a=e.split(".").pop().toUpperCase(),t.next=8,k(r);case 8:i=t.sent,t.next=18;break;case 11:return o=e.name.replace(".","-"),r=URL.createObjectURL(e),c=e.name.replace("-"," ").replace(/\.[^/.]+$/,""),a=e.name.split(".").pop().toUpperCase(),t.next=17,k(e);case 17:i=t.sent;case 18:return i&&(a="VF"),(l=document.createElement("div")).className="btn__setfont chip btn d-flex justify-content-between",l.title="local"===n?e:e.name,l.id="btn__setfont-".concat(o),l.innerHTML="".concat(c,'<span class="d-flex-grow text-small text-right">').concat(a,"</span>"),l.onclick=function(){return y(r,o)},t.abrupt("return",l);case 26:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),k=function(){var t=m(d().mark((function t(e){var n,o,r;return d().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(t.prev=0,"string"!=typeof e){t.next=10;break}return t.next=4,fetch(e);case 4:return o=t.sent,t.next=7,o.arrayBuffer();case 7:n=t.sent,t.next=13;break;case 10:return t.next=12,e.arrayBuffer();case 12:n=t.sent;case 13:return r=opentype.parse(n),t.abrupt("return",void 0!==r.tables.fvar);case 17:return t.prev=17,t.t0=t.catch(0),console.error("Error checking if font is variable:",t.t0),t.abrupt("return",!1);case 21:case"end":return t.stop()}}),t,null,[[0,17]])})));return function(e){return t.apply(this,arguments)}}();window.updateColumns=function(t){var e=document.getElementById("".concat(t,"-column-count")).value,n=document.getElementById("".concat(t,"-column-gap")).value;O(t,"column-count",e),O(t,"column-gap",n)};var j=function(t){return'\n  <div id="btn__wrapper-case">\n    <label>Case</label>\n    <div class="d-flex g-1 btn__wrapper">\n      <button class="btn btn-link textTransform-uppercase" title="Uppercase" onclick="passStyleValue(\''.concat(t,"','textTransform', 'uppercase')\">TT</button>\n      <button class=\"btn btn-link textTransform-capitalize\" title=\"Capitalize\" onclick=\"passStyleValue('").concat(t,"','textTransform', 'capitalize')\">Tt</button>\n      <button class=\"btn btn-link textTransform-lowercase\" title=\"Lowercase\" onclick=\"passStyleValue('").concat(t,'\',\'textTransform\', \'lowercase\')">tt</button>\n    </div>\n  </div>\n  <div id="btn__wrapper-columns">\n    <label>Columns</label>\n    <div class="d-flex g-1 btn__wrapper">\n\t<span class="text-small">Count</span>\n      <input class="input" type="number" id="').concat(t,'-column-count" min="1" max="6" value="1" onchange="updateColumns(\'').concat(t,'\')" style="width: 50px;">\n\t<span class="text-small">Gap</span>\n      <input class="input" type="text" id="').concat(t,'-column-gap" value="10px" onchange="updateColumns(\'').concat(t,'\')" style="width: 50px;">\n    </div>\n  </div>\n')},F=function(t,e,n){var o,r=function(t){if(Array.isArray(t))return u(t)}(o=new Set(n))||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(o)||s(o)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}();return'\n\t  <label>Features</label>  \n\t  <div class="btn__wrapper d-flex flex-wrap g-0">\n\t\t'.concat(r.map((function(n){var o=e.Features[n].abstract;return'\n\t\t\t<div class="chip d-flex align-items-center justify-content-between d-flex-grow" onclick="document.getElementById(\''.concat(t,"-checkbox-").concat(n,'\').click()">\n\t\t\t  <input id="').concat(t,"-checkbox-").concat(n,'" type="checkbox" onclick="passfeatValue(\'').concat(t,"', '").concat(n,"', '").concat(r.join(","),'\')">\n\t\t\t  <span class="d-flex-grow">').concat(o,'</span>\n\t\t\t  <span class="tag-label text-small">').concat(n,"</span>\n\t\t\t</div>\n\t\t  ")})).join(""),"\n\t  </div>\n\t")},T=function(t,e,n,o,r,a,c){var i,l,s=S(o,c),u=s.fontSize,f=s.lineHeight,d=s.letterSpacing,p=s.columnCount,m=s.columnGap;if("Features"===t){var g=n[t][e].definition,v=localStorage.getItem(o)||n[t][e].sample;l='<h6 class="h6" title="'.concat(g,'" contentEditable="true" onkeyup="saveData(\'').concat(o,"-title', 'thisContent')\">").concat(e,"</h6>"),i=v}else{var h=localStorage.getItem(o)||n[t][e];l='<h6 contentEditable="true" onkeyup="saveData(\''.concat(o,"-title', 'thisContent')\">").concat(e,"</h6>"),i=h}var y="\n\t  ".concat(l,'\n\t  <span class="testarea-values small">').concat(A(r),'</span>\n\t  <div id="').concat(o,'" style="').concat(r," ").concat(a,'" class="t__importedfontfamily ').concat(c,' testarea" contenteditable="true" spellcheck="false" onkeyup="saveData(\'').concat(o,"', 'thisContent')\">\n\t\t").concat(i,"\n\t  </div>\n\t");return setTimeout((function(){var t=document.getElementById("".concat(o,"-fontSize")),e=document.getElementById("".concat(o,"-lineHeight")),n=document.getElementById("".concat(o,"-letterSpacing"));t&&(t.value=u.replace("pt","")),e&&(e.value=f),n&&(n.value=d.replace("em",""));var r=document.getElementById("".concat(o,"-column-count")),a=document.getElementById("".concat(o,"-column-gap"));r&&(r.value=p),a&&(a.value=m),B(o,{fontSize:u,lineHeight:f,letterSpacing:d,columnCount:p,columnGap:m})}),0),y},B=function(t,e){Object.entries(e).forEach((function(e){var n=l(e,2),o=n[0],r=n[1],a=document.getElementById("".concat(t,"-").concat(o,"-val"));a&&(a.textContent=r)}))},A=function(t){return t.split(";").filter((function(t){return t.trim()})).map((function(t){var e=l(t.split(":").map((function(t){return t.trim()})),2),n=e[0],o=e[1];return'<span class="'.concat(n,'">').concat(n,": ").concat(o,"</span>")})).join(" ")},C=function(t,e,n){var o=document.querySelector("#".concat(t," .testarea-values")),r=o.querySelector(".".concat(e));if(r)r.textContent="".concat(e,": ").concat(n);else{var a=document.createElement("span");a.className=e,a.textContent="".concat(e,": ").concat(n),o.appendChild(a)}},z=function(t){var e=document.getElementById(t),n=e.cloneNode(!0);n.id="".concat(t,"-clone-").concat(Date.now()),n.querySelectorAll("[id]").forEach((function(t){t.id="".concat(t.id,"-clone-").concat(Date.now())})),n.querySelectorAll("input").forEach((function(t){t.value=""})),e.parentNode.insertBefore(n,e),n.style.height="0px",n.style.overflow="hidden",n.style.transition="height 0.6s ease",setTimeout((function(){n.style.height="".concat(n.scrollHeight,"px")}),0),setTimeout((function(){n.style.height="auto",n.style.overflow="visible"}),600)},O=function(t,e,n){var o="-".concat(e,"-val"),r=document.querySelector('[id$="'.concat(t).concat(o,'"]'));["fontSize","lineHeight","letterSpacing","column-count","column-gap"].includes(e)?(i("".concat(t,"-").concat(e),n),"fontSize"===e&&(n+="pt"),"letterSpacing"===e&&(n+="em"),r&&(r.textContent=n)):i(t+e,n);var a=document.querySelector("#".concat(t," .testarea"));if("idiocracy"===e){var c=a.getAttribute("style");document.querySelectorAll(".testarea").forEach((function(t){return t.setAttribute("style",c)}))}else a.style[e]=n;C(t,e,n),["fontSize","lineHeight","letterSpacing","column-count","column-gap"].includes(e)||N(e,n)},H=function(t,e,n,o){var r=document.getElementById("".concat(t,"-").concat(e,"-val"));r?r.textContent=n:console.warn("Element with ID ".concat(t,"-").concat(e,"-val not found.")),i("".concat(t,"-").concat(e,"-val"),n);var a=o.split(",").map((function(o){var r,a=o===e?n:null===(r=document.getElementById("".concat(t,"-").concat(o)))||void 0===r?void 0:r.value;return"'".concat(o,"' ").concat(a)})).join(", "),c=document.querySelector("#".concat(t," .testarea"));c?c.style.fontVariationSettings=a:console.warn("Test area with ID ".concat(t," not found.")),C(t,"fvar",a)},P=function(t,e,n){for(var o=n.split(","),r="",a=0;a<o.length;a++)document.getElementById("".concat(t,"-checkbox-").concat(o[a])).checked&&(r+="'".concat(o[a],"',"));r=r.replace(/,\s*$/,""),document.querySelector("#".concat(t," .testarea")).style.fontFeatureSettings=r},N=function(t,e){document.querySelectorAll(".btn.".concat(t,"-").concat(e)).forEach((function(e){e.classList.add("active");var n=e.closest(".btn__wrapper");n?n.querySelectorAll(".btn").forEach((function(t){t!==e&&t.classList.remove("active")})):document.querySelectorAll('.btn[class*="'.concat(t,'-"]')).forEach((function(t){t!==e&&t.classList.remove("active")}))}))},V=function(t,e){return Object.keys(t).map((function(t){return'\n        <div class="tab-item '.concat(t===e?"active":"",' tab__setstage" onclick="setStage(\'').concat(t,'\')">\n          <a href="#" class="stage-button">').concat(t,"</a>\n        </div>\n      ")})).join("")},q=function(){var t=document.getElementById("section__header-file-buttons");t.innerHTML="Place fonts you want to proof into <code>/fonts</code> to begin",fetch("../src/txt/fonts.txt").then((function(t){return t.text()})).then(function(){var e=m(d().mark((function e(o){var r,a,c,i,l;return d().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=o.split("fonts/").filter((function(t){return""!==t.trim()})).map((function(t){return t.trim()})),u=r.sort(),s=new Set(u),a=function(t){if(Array.isArray(t))return n(t)}(s)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(s)||function(t,e){if(t){if("string"==typeof t)return n(t,e);var o={}.toString.call(t).slice(8,-1);return"Object"===o&&t.constructor&&(o=t.constructor.name),"Map"===o||"Set"===o?Array.from(t):"Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o)?n(t,e):void 0}}(s)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}(),c=a.map((function(t){return I(t,"local")})),e.next=5,Promise.all(c);case 5:e.sent.forEach((function(e){return t.appendChild(e)})),i=localStorage.getItem("fontFamilySource")||"fonts/".concat(a[a.length-1]),l=localStorage.getItem("fontFamily")||i.replace(".","-"),y(i,l);case 10:case"end":return e.stop()}var s,u}),e)})));return function(t){return e.apply(this,arguments)}}()).catch((function(t){return console.error("Error loading fonts:",t)}))},M=function(){var t=document.getElementById("section__header-file-buttons");y("fonts/gooper-VF.ttf","gooper-VF-ttf"),document.getElementById("style__fontface").innerHTML='@font-face { font-family: "gooper-VF-ttf"; src: url("fonts/gooper-VF.ttf");}',t.innerHTML='\n\t  <div id="drag-drop-area" class="drag-drop-area">\n\t\t<p>Drag & drop font files here</p>\n\t\t<p>or</p>\n\t\t<label for="fontInput" class="file-input-label">Choose Files</label>\n\t\t<input id="fontInput" type="file" class="file-input" multiple accept=".ttf,.otf" />\n\t  </div>\n\t';var e=document.getElementById("drag-drop-area"),n=document.getElementById("fontInput");["dragenter","dragover","dragleave","drop"].forEach((function(t){e.addEventListener(t,D,!1),document.body.addEventListener(t,D,!1)})),["dragenter","dragover"].forEach((function(t){e.addEventListener(t,G,!1)})),["dragleave","drop"].forEach((function(t){e.addEventListener(t,U,!1)})),e.addEventListener("drop",$,!1),n.addEventListener("change",R,!1)};function D(t){t.preventDefault(),t.stopPropagation()}function G(t){document.getElementById("drag-drop-area").classList.add("highlight")}function U(t){document.getElementById("drag-drop-area").classList.remove("highlight")}function $(t){R(t.dataTransfer.files)}function R(t){var e;e=t instanceof Event?t.target.files:t;var n=(e=Array.from(e)).map((function(t){return function(t){return new Promise((function(e){h({target:{files:[t]}}),setTimeout(e,50)}))}(t)}));Promise.all(n).then((function(){setTimeout((function(){var t=document.querySelector(".btn__setfont");t&&t.click()}),100)}))}var Y=function(){var t=document.getElementById("section__header-file-buttons"),e=document.getElementById("section__header-stage-buttons"),n=document.getElementById("btn__view-tools-toggle"),o=document.getElementById("btn__mode-toggle"),c=document.getElementById("btn__reset-local-storage");t&&t.addEventListener("click",J),e&&e.addEventListener("click",W),n&&n.addEventListener("click",K),o&&o.addEventListener("click",a),c&&c.addEventListener("click",r)},J=function(t){t.target.classList.contains("btn__setfont")&&(t.target.classList.add("active","visited"),Array.from(t.target.parentNode.children).filter((function(e){return e!==t.target})).forEach((function(t){return t.classList.remove("active")})))},W=function(t){t.target.classList.contains("btn__setstage")&&(t.target.classList.add("active"),Array.from(t.target.parentNode.children).filter((function(e){return e!==t.target})).forEach((function(t){return t.classList.remove("active")})))},K=function(){document.body.classList.toggle("tools-visible")};window.addEventListener("unhandledrejection",(function(t){console.error("Unhandled promise rejection:",t.reason)})),window.addEventListener("error",(function(t){console.error("Uncaught error:",t.error)})),window.setFont=y,window.onReadFile=h,window.setStage=_,window.passStyleValue=O,window.passfvarValue=H,window.passfeatValue=P,window.insertField=z,window.localStorageClear=e.localStorageClear,document.addEventListener("DOMContentLoaded",(function(){return function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];try{t||!["localhost","127.0.0.1",""].includes(location.hostname)?M():q(),Y(),document.body.classList.add("loaded")}catch(t){console.error("Error during initialization:",t)}}(!1)}))})();
//# sourceMappingURL=application.js.map