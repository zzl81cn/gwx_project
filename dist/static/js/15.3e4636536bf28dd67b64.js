webpackJsonp([15],{"1zEg":function(n,t){},RVhM:function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=e("Xxa5"),i=e.n(o),c=e("//Fk"),s=e.n(c),r=e("exGp"),u=e.n(r),a=i.a.mark(l);function l(){return i.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,setTimeout(function(){console.log("第一步")},1e3);case 2:return n.next=4,setTimeout(function(){console.log("第二步")},1e3);case 4:return n.next=6,setTimeout(function(){console.log("最后一步")},1e3);case 6:case"end":return n.stop()}},a,this)}var f,h=(f=u()(i.a.mark(function n(){return i.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,new s.a(function(n){setTimeout(function(){console.log("第一步"),n()},1e3)});case 2:return n.next=4,new s.a(function(n){setTimeout(function(){console.log("第二步"),n()},2e3)});case 4:return n.next=6,new s.a(function(n){setTimeout(function(){console.log("第三步"),n()},3e3)});case 6:case"end":return n.stop()}},n,this)})),function(){return f.apply(this,arguments)});function v(){return new s.a(function(n,t){setTimeout(function(){n("异步后的值")},1e3)})}var d=e("Zrlr"),m=e.n(d),_=e("wxAW"),p=e.n(_),k="pending",g=function(){function n(t){m()(this,n),this.state=k,this.value=null,this.resolveFnList=[],this.rejectFnList=[];try{t(this.resolve.bind(this),this.reject.bind(this))}catch(n){this.reject(n)}}return p()(n,[{key:"resolve",value:function(n){var t=this;this.state===k&&(this.value=n,this.state="resolve",this.resolveFnList.forEach(function(n){n(t.value)}))}},{key:"reject",value:function(n){var t=this;this.state===k&&(this.value=n,this.state="reject",this.rejectFnList.forEach(function(n){n(t.value)}))}},{key:"then",value:function(n,t){t="function"==typeof(n="function"==typeof n?n:function(n){return n})?n:function(n){throw n},this.state===k&&(this.resolveFnList.push(n),this.rejectFnList.push(t)),"resolve"===this.state&&n(this.value),"reject"===this.state&&t(this.value)}}]),n}(),w={name:"promise",data:function(){return{gen:{},thenable:{then:function(n,t){console.log("执行then"),n("菜已做好")}},disheList:[{name:"fish",time:1},{name:"fish1",time:2},{name:"fish3",time:1}],iteratorFn:function(){},arr:[12,15],p1:new s.a(function(n,t){setTimeout(function(t){console.log("p1执行了"),n(t)},500,"P1")}),fnc:function(){return console.log("fnc"),15}}},methods:{onAsyncClick:function(){h()},onGeneratorClick:function(){var n=this;setTimeout(function(){n.gen.next()},1e3)},onPromiseRaceClick:function(){var n=s.a.all([this.p1,this.fnc]);console.log("newPromise",n.then(function(){console.log("success")}).catch(function(){console.log("error")}))},createGenerator:function(){this.iteratorFn=i.a.mark(function n(t){var e;return i.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:e=0;case 1:if(!(e<t.length)){n.next=7;break}return n.next=4,t[e];case 4:e++,n.next=1;break;case 7:case"end":return n.stop()}},n,this)})},createIterator:function(n){this.iteratorFn=function(n){var t=0;return{next:function(){return t<n.length?{value:n[t++],done:!1}:{done:!0}}}}},onDishCreateClick:function(n){var t=this;this.createPromise(n).then(function(n){return t.createPromise(n)}).then(function(n){return t.createPromise(n)})},createPromise:function(n){var t=this;return new s.a(function(e,o){var i=parseInt(2*Math.random()*1e3);setTimeout(function(){console.log("dish 名称 :",t.disheList[n].name,"\n","time : ",i),e(++n)},i)})},onFnClick:function(){console.log(s.a.resolve(this.fn).then(function(n){console.log(n),n("传入fn的值")}))},fn:function(n){setTimeout(function(){console.log(n)},2e3)},onCreateClick:function(){new g(function(n,t){setTimeout(function(){n("异步后的值")},1e3)}).then(function(n){console.log(n)})},step:function(n,t){return new s.a(function(e,o){e(""+n+t)})},onStartClick:function(){v().then(function(n){console.log(n)})}},created:function(){this.gen=l()},mounted:function(){window.addEventListener("scroll",function(){console.log(document.documentElement.scrollTop)})}},C={render:function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",[n._m(0),n._v(" "),e("div",{on:{click:n.onStartClick}},[n._v("生成一个promise")]),n._v(" "),e("div",{on:{click:n.onCreateClick}},[n._v("转为Promise对象")]),n._v(" "),e("div",{on:{click:n.onFnClick}},[n._v("fn")]),n._v(" "),e("div",{on:{click:function(t){n.onDishCreateClick(0)}}},[n._v("依次生成菜名")]),n._v(" "),e("div",{on:{click:function(t){n.onPromiseRaceClick(0)}}},[n._v("PromiseRace")]),n._v(" "),e("dir",{on:{click:n.onGeneratorClick}},[n._v("next执行")]),n._v(" "),e("dir",{on:{click:n.onAsyncClick}},[n._v("asyncDelayLog")])],1)},staticRenderFns:[function(){var n=this.$createElement,t=this._self._c||n;return t("div",{staticClass:"wrap"},[t("div",{staticClass:"wrap__content"},[t("div",{staticClass:"content__item"},[this._v("这里是第一行")]),this._v(" "),t("div",{staticClass:"content__item"},[this._v("第二行")])]),this._v(" "),t("div",{staticClass:"content__right"},[this._v("右侧")])])}]};var x=e("VU/8")(w,C,!1,function(n){e("1zEg")},"data-v-162e99e6",null);t.default=x.exports},exGp:function(n,t,e){"use strict";t.__esModule=!0;var o,i=e("//Fk"),c=(o=i)&&o.__esModule?o:{default:o};t.default=function(n){return function(){var t=n.apply(this,arguments);return new c.default(function(n,e){return function o(i,s){try{var r=t[i](s),u=r.value}catch(n){return void e(n)}if(!r.done)return c.default.resolve(u).then(function(n){o("next",n)},function(n){o("throw",n)});n(u)}("next")})}}}});
//# sourceMappingURL=15.3e4636536bf28dd67b64.js.map