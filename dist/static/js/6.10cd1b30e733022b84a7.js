webpackJsonp([6],{AZcN:function(e,n,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t=r("BO1k"),i=r.n(t),o=r("gRE1"),c=r.n(o),u=r("uqrR"),a=r.n(u),f=r("Zrlr"),s=r.n(f),l=r("wxAW"),v=r.n(l),b=function(){function e(){s()(this,e),this.observerTeacher={}}return v()(e,[{key:"subscribe",value:function(e){var n=e.id,r=e.name,t=e.fn;this.observerTeacher[r]||(this.observerTeacher[r]={}),this.observerTeacher[r][n]=t}},{key:"takeOff",value:function(e){var n=e.name;e.id;a()(this.observerTeacher[n],"id")}},{key:"trigger",value:function(e){if(this.observerTeacher[e]){var n=c()(this.observerTeacher[e]),r=!0,t=!1,o=void 0;try{for(var u,a=i()(n);!(r=(u=a.next()).done);r=!0){(0,u.value)()}}catch(e){t=!0,o=e}finally{try{!r&&a.return&&a.return()}finally{if(t)throw o}}}}}]),e}(),d={name:"observer",data:function(){return{observer:{}}},methods:{onSubscribeClick:function(e,n){this.observer.subscribe({id:e,name:"guan",fn:function(){console.log(n)}}),console.log("添加一条订阅"+n)},onTriggerClick:function(){this.observer.trigger("guan"),console.log("开始上课了")},onTakeOffClick:function(e){this.observer.takeOff({name:"guan",id:e}),console.log(e+"取消关注")}},created:function(){this.observer=new b}},k={render:function(){var e=this,n=e.$createElement,r=e._self._c||n;return r("div",{staticClass:"observer"},[r("div",{on:{click:function(n){e.onSubscribeClick(111,"111学习者")}}},[e._v("订阅者1")]),e._v(" "),r("div",{on:{click:function(n){e.onSubscribeClick(222,"222学习者")}}},[e._v("订阅者2")]),e._v(" "),r("div",{on:{click:e.onTriggerClick}},[e._v("发布")]),e._v(" "),r("div",{on:{click:function(n){e.onTakeOffClick(111)}}},[e._v("订阅者1取关")]),e._v(" "),r("div",{on:{click:function(n){e.onTakeOffClick(222)}}},[e._v("订阅者2取关")])])},staticRenderFns:[]};var h=r("VU/8")(d,k,!1,function(e){r("WyY5")},"data-v-0ac9abe0",null);n.default=h.exports},Cbyi:function(e,n,r){r("Nkia"),e.exports=r("FeBl").Reflect.deleteProperty},Nkia:function(e,n,r){var t=r("kM2E"),i=r("LKZe").f,o=r("77Pl");t(t.S,"Reflect",{deleteProperty:function(e,n){var r=i(o(e),n);return!(r&&!r.configurable)&&delete e[n]}})},TmV0:function(e,n,r){r("fZOM"),e.exports=r("FeBl").Object.values},WyY5:function(e,n){},fZOM:function(e,n,r){var t=r("kM2E"),i=r("mbce")(!1);t(t.S,"Object",{values:function(e){return i(e)}})},gRE1:function(e,n,r){e.exports={default:r("TmV0"),__esModule:!0}},mbce:function(e,n,r){var t=r("lktj"),i=r("TcQ7"),o=r("NpIQ").f;e.exports=function(e){return function(n){for(var r,c=i(n),u=t(c),a=u.length,f=0,s=[];a>f;)o.call(c,r=u[f++])&&s.push(e?[r,c[r]]:c[r]);return s}}},uqrR:function(e,n,r){e.exports={default:r("Cbyi"),__esModule:!0}}});
//# sourceMappingURL=6.10cd1b30e733022b84a7.js.map