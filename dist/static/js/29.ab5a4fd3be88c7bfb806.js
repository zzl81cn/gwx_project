webpackJsonp([29],{IhIN:function(n,i){},jfdK:function(n,i,t){"use strict";function r(n,i,t,e){if(t===e)return n[t]===i?t:-1;var o=Math.floor((e+t)/2);if(e-t==1){if(n[t]===i)return t;if(n[e]===i)return e}return n[o]===i?-1===r(n,i,t,o)?o:r(n,i,t,o):n[o]>i?r(n,i,t,o):n[o]<i?r(n,i,o,e):-1}function e(n){var i=[];return n.forEach(function(n){i=i.concat(Array.isArray(n)?e(n):n)}),i}Object.defineProperty(i,"__esModule",{value:!0});var o={name:"",data:function(){return{numberList:[1,1,2,2,4,4,4,6,6],index:0,expandList:[[112,[1544,[1]]],1],minList:[3,1,5,1,7,2]}},methods:{onFindTargetClick:function(){for(var n=[1,5,5,9],i=n.length,t=0;t<i;t++)if(n[t]>=10)return t;return i},onFindIndexClick:function(){this.index=r(this.numberList,2,0,this.numberList.length-1),console.log(this.index)},onExpandArrayClick:function(){var n=e(this.expandList);console.log(n)},onFindMinClick:function(n){for(var i=n.length,t=0;t<2;t++)for(var r=0;r<i-1;r++)if(n[r]>n[r+1]){var e=[n[r+1],n[r]];n[r]=e[0],n[r+1]=e[1]}return n[0]+n[1]},onMinClick:function(){this.onFindMinClick(this.minList),console.log(this.onFindMinClick(this.minList))},onAllInStringClick:function(){for(var n="DF".length,i=[],t=0;t<n;t++)i.push(new RegExp("DF".charAt(t)).test("ADF"));return i.every(function(n){return n&&/[A-Z]/.test("ADFDF")})}}},c={render:function(){var n=this,i=n.$createElement,t=n._self._c||i;return t("div",[t("div",{staticClass:"button",on:{click:n.onFindIndexClick}},[n._v("找出目标值最小序号")]),n._v(" "),t("div",{on:{click:n.onExpandArrayClick}},[n._v("展开数组")]),n._v(" "),t("div",{on:{click:n.onMinClick}},[n._v("最小两个数")]),n._v(" "),t("div",{on:{click:n.onAllInStringClick}},[n._v("判断字符串是否包含(全大写)")]),n._v(" "),t("div",{on:{click:n.onFindTargetClick}},[n._v("找出插入目标序号")])])},staticRenderFns:[]};var l=t("VU/8")(o,c,!1,function(n){t("IhIN")},"data-v-4cad91be",null);i.default=l.exports}});
//# sourceMappingURL=29.ab5a4fd3be88c7bfb806.js.map