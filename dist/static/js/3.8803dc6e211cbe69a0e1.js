webpackJsonp([3],{"9ooT":function(t,e,n){var o=n("kM2E"),r=n("PzxK"),i=n("77Pl");o(o.S,"Reflect",{getPrototypeOf:function(t){return r(i(t))}})},EGKm:function(t,e,n){n("9ooT"),t.exports=n("FeBl").Reflect.getPrototypeOf},K6ED:function(t,e,n){t.exports={default:n("cnlX"),__esModule:!0}},Kh5d:function(t,e,n){var o=n("sB3e"),r=n("PzxK");n("uqUo")("getPrototypeOf",function(){return function(t){return r(o(t))}})},OPyX:function(t,e,n){n("HpRW")("WeakMap")},OvRC:function(t,e,n){t.exports={default:n("oM7Q"),__esModule:!0}},Pf15:function(t,e,n){"use strict";e.__esModule=!0;var o=u(n("kiBT")),r=u(n("OvRC")),i=u(n("pFYg"));function u(t){return t&&t.__esModule?t:{default:t}}e.default=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+(void 0===e?"undefined":(0,i.default)(e)));t.prototype=(0,r.default)(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(o.default?(0,o.default)(t,e):t.__proto__=e)}},PlIm:function(t,e,n){n("M6a0"),n("+tPU"),n("aY9x"),n("tGP/"),n("OPyX"),t.exports=n("FeBl").WeakMap},XFB5:function(t,e,n){t.exports={default:n("PlIm"),__esModule:!0}},XVP1:function(t,e,n){"use strict";var o=n("xH/j"),r=n("06OY").getWeak,i=n("77Pl"),u=n("EqjI"),s=n("2KxR"),a=n("NWt+"),c=n("ALrJ"),f=n("D2L2"),l=n("LIJb"),p=c(5),h=c(6),d=0,_=function(t){return t._l||(t._l=new v)},v=function(){this.a=[]},g=function(t,e){return p(t.a,function(t){return t[0]===e})};v.prototype={get:function(t){var e=g(this,t);if(e)return e[1]},has:function(t){return!!g(this,t)},set:function(t,e){var n=g(this,t);n?n[1]=e:this.a.push([t,e])},delete:function(t){var e=h(this.a,function(e){return e[0]===t});return~e&&this.a.splice(e,1),!!~e}},t.exports={getConstructor:function(t,e,n,i){var c=t(function(t,o){s(t,c,e,"_i"),t._t=e,t._i=d++,t._l=void 0,void 0!=o&&a(o,n,t[i],t)});return o(c.prototype,{delete:function(t){if(!u(t))return!1;var n=r(t);return!0===n?_(l(this,e)).delete(t):n&&f(n,this._i)&&delete n[this._i]},has:function(t){if(!u(t))return!1;var n=r(t);return!0===n?_(l(this,e)).has(t):n&&f(n,this._i)}}),c},def:function(t,e,n){var o=r(i(e),!0);return!0===o?_(t).set(e,n):o[t._i]=n,t},ufstore:_}},ZaQb:function(t,e,n){var o=n("EqjI"),r=n("77Pl"),i=function(t,e){if(r(t),!o(e)&&null!==e)throw TypeError(e+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,e,o){try{(o=n("+ZMJ")(Function.call,n("LKZe").f(Object.prototype,"__proto__").set,2))(t,[]),e=!(t instanceof Array)}catch(t){e=!0}return function(t,n){return i(t,n),e?t.__proto__=n:o(t,n),t}}({},!1):void 0),check:i}},Zx67:function(t,e,n){t.exports={default:n("fS6E"),__esModule:!0}},aY9x:function(t,e,n){"use strict";var o,r=n("ALrJ")(0),i=n("880/"),u=n("06OY"),s=n("To3L"),a=n("XVP1"),c=n("EqjI"),f=n("S82l"),l=n("LIJb"),p=u.getWeak,h=Object.isExtensible,d=a.ufstore,_={},v=function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}},g={get:function(t){if(c(t)){var e=p(t);return!0===e?d(l(this,"WeakMap")).get(t):e?e[this._i]:void 0}},set:function(t,e){return a.def(l(this,"WeakMap"),t,e)}},y=t.exports=n("qo66")("WeakMap",v,g,a,!0,!0);f(function(){return 7!=(new y).set((Object.freeze||Object)(_),7).get(_)})&&(s((o=a.getConstructor(v,"WeakMap")).prototype,g),u.NEED=!0,r(["delete","has","get","set"],function(t){var e=y.prototype,n=e[t];i(e,t,function(e,r){if(c(e)&&!h(e)){this._f||(this._f=new o);var i=this._f[t](e,r);return"set"==t?this:i}return n.call(this,e,r)})}))},cnlX:function(t,e,n){n("iInB");var o=n("FeBl").Object;t.exports=function(t,e){return o.getOwnPropertyDescriptor(t,e)}},exh5:function(t,e,n){var o=n("kM2E");o(o.S,"Object",{setPrototypeOf:n("ZaQb").set})},fS6E:function(t,e,n){n("Kh5d"),t.exports=n("FeBl").Object.getPrototypeOf},hmzz:function(t,e){},"i/C/":function(t,e,n){n("exh5"),t.exports=n("FeBl").Object.setPrototypeOf},iInB:function(t,e,n){var o=n("TcQ7"),r=n("LKZe").f;n("uqUo")("getOwnPropertyDescriptor",function(){return function(t,e){return r(o(t),e)}})},kiBT:function(t,e,n){t.exports={default:n("i/C/"),__esModule:!0}},lJb1:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=n("txCj"),r=n.n(o),i=n("Zx67"),u=n.n(i),s=n("Zrlr"),a=n.n(s),c=n("wxAW"),f=n.n(c),l=n("zwoO"),p=n.n(l),h=n("yEsh"),d=n.n(h),_=n("Pf15"),v=n.n(_),g=n("woOf"),y=n.n(g);function b(t){this.name=t}b.prototype.getName=function(){console.log("获取姓名 : ",this.name)};var x=function(t){function e(t,n){a()(this,e);var o=p()(this,(e.__proto__||u()(e)).call(this,t));return o.number=n,o}return v()(e,t),f()(e,[{key:"getFatherName",value:function(){d()(e.prototype.__proto__||u()(e.prototype),"getName",this).call(this)}},{key:"age",get:function(){return this.number>18?"年龄是个秘密":"今年"+this.number+"岁"}}]),e}(b),O=function(){function t(e){a()(this,t),this.name=e}return f()(t,[{key:"getName",value:function(){console.log(this.name)}},{key:"age",get:function(){return 15}}]),t}(),P=n("XFB5"),M=n.n(P);new M.a;function k(t){return"Object"===j(t)||"Array"===j(t)}function j(t){return Reflect.toString(t).slice(8,-1)}function m(t){for(var e=new M.a,n={},o=[{parent:n,key:void 0,value:t}];o.length>0;){var r=o.pop(),i=r.parent,u=r.key,s=r.value;if(void 0!==u&&(i=r.parent[u]={}),!k(s))return s;for(var a in s)k(s[a])?e.has(s)?i[a]=e.get(s):(o.push({parent:i,key:a,value:s[a]}),e.set(s,i)):i[a]=s[a]}return n}var w={name:"",data:function(){return{obj:{a:12,parent:{mother:"cc",father:"dd",son:{age:14}}},obj1:{},str:null,str1:void 0,instance:{}}},methods:{onResizeChange:function(){y()(this.$refs.wrap.style,{background:"red",fontSize:"20px"})},sub1:function(){new(function(t){function e(t){return a()(this,e),p()(this,(e.__proto__||u()(e)).call(this,t))}return v()(e,t),f()(e,[{key:"getParent",value:function(){console.log(d()(e.prototype.__proto__||u()(e.prototype),"age",this))}}]),e}(O))("zs").getParent(),console.log(r()(this.instance))}},created:function(){this.obj1=m(this.obj),this.str1=m(this.str)},mounted:function(){this.onResizeChange(),this.instance=new x("guan",29),console.log("instance",this.instance),console.log(this.instance.age),console.log(b),console.log(r()(x)),console.log("是否继承于parent",r()(x)===b.proto)}},E={render:function(){var t=this.$createElement;return(this._self._c||t)("div",{ref:"wrap"},[this._v("\n  文字\n")])},staticRenderFns:[]};var F=n("VU/8")(w,E,!1,function(t){n("hmzz")},"data-v-1d90243e",null);e.default=F.exports},oM7Q:function(t,e,n){n("sF+V");var o=n("FeBl").Object;t.exports=function(t,e){return o.create(t,e)}},"sF+V":function(t,e,n){var o=n("kM2E");o(o.S,"Object",{create:n("Yobk")})},"tGP/":function(t,e,n){n("9Bbf")("WeakMap")},txCj:function(t,e,n){t.exports={default:n("EGKm"),__esModule:!0}},yEsh:function(t,e,n){"use strict";e.__esModule=!0;var o=i(n("Zx67")),r=i(n("K6ED"));function i(t){return t&&t.__esModule?t:{default:t}}e.default=function t(e,n,i){null===e&&(e=Function.prototype);var u=(0,r.default)(e,n);if(void 0===u){var s=(0,o.default)(e);return null===s?void 0:t(s,n,i)}if("value"in u)return u.value;var a=u.get;return void 0!==a?a.call(i):void 0}},zwoO:function(t,e,n){"use strict";e.__esModule=!0;var o,r=n("pFYg"),i=(o=r)&&o.__esModule?o:{default:o};e.default=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!==(void 0===e?"undefined":(0,i.default)(e))&&"function"!=typeof e?t:e}}});
//# sourceMappingURL=3.8803dc6e211cbe69a0e1.js.map