webpackJsonp([39],{AQ7j:function(e,r,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var c={name:"replace",data:function(){return{msg:"Welcome to Your Vue.js App"}},methods:{onRegClick:function(e){console.log(e);var r=e.length-1,n=new Array(r+1),c=0;return e.replace(/\d/g,function(e){var t="元拾佰仟万拾佰仟亿拾佰仟".charAt(r-c);n[c]="零壹贰叁肆伍陆柒捌玖".charAt(e)+("0"===e&&"元万亿".indexOf(t)<0?"":t),c++}),console.log(n.join("").replace(/(零)\1+/g,"零").replace(/零(十|百|千|万|亿|元)/g,function(e){return e.replace(/零/,"")})),this.onClick("111010"),n.join("").replace(/(零)\1+/g,"零").replace(/零(十|百|千|万|亿|元)/g,function(e){return e.replace(/零/,"")})},onClick:function(e){for(var r=(e=String(parseInt(e))).length,n=r-2,c="",t=0;t<r;t++){var l=e.charAt(t),o="十百千万十百千亿十百千".charAt(n);c+="零一二三四五六七八九".charAt(l),c+="0"===l&&"万亿".indexOf(o)<0?"":o,n--}return console.log(this.clearZero(c)),this.clearZero(c)},clearZero:function(e){return(e=(e=e.replace(/零{2}/g,"零")).replace(/一十/g,"十")).replace(/零?零$/,"")}}},t={render:function(){var e=this,r=e.$createElement,n=e._self._c||r;return n("div",{staticClass:"hello"},[n("h1",{on:{click:function(r){e.onRegClick("111010")}}},[e._v(" 正则")]),e._v(" "),n("h2",[e._v("四位匹配")])])},staticRenderFns:[]},l=n("VU/8")(c,t,!1,null,null,null);r.default=l.exports}});
//# sourceMappingURL=39.36fbea39e27f03d4d052.js.map