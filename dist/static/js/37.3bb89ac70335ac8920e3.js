webpackJsonp([37],{"/hzx":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={name:"chart",computed:{AllLength:function(){return this.currentLength>this.screenWidth?this.currentLength:this.screenWidth},currentLength:function(){return 38*this.chartList.length},moveLength:function(){return this.AllLength-this.screenWidth},selectIndex:function(){return this.isCenter?parseInt((this.scrollLength+this.screenWidth/2)/38):-1},maxStep:function(){var t=0;return this.chartList.forEach(function(e){t=e>t?e:t}),t}},data:function(){var t=this;return{screenWidth:0,scrollLength:0,chartList:[115,52,55,44,45,115,52,55,44,45,115,52,55,44,45],dateList:["12/1","12/2","12/3","12/4","12/5","12/2","12/1","12/2","12/2","12/1","12/2","12/1","12/2","12/1","12/2"],scrollListenHandle:function(){console.log("正在滚动"),t.scrollLength=t.$refs.scroll.scrollLeft},isCenter:!1,clickIndex:-1,currentLeft:0,speed:0}},mounted:function(){this.screenWidth=screen.width,this.currentLength&&this.$refs.scroll.addEventListener("scroll",this.scrollListenHandle)},methods:{onButtonClick:function(){this.chartList.push(15,15,2,121,1)},onTouchMove:function(){this.isCenter=!0,this.clickIndex=-1},update:function(){var t=this;this.rAF=setInterval(function(){var e=new Date-t.startTime;t.$refs.scroll.scrollLeft=e*t.speed+t.currentLeft,e>100&&clearInterval(t.rAF)})},onSelectDateClick:function(t){this.clickIndex=t,console.log("正在点击"),this.isCenter=!1;var e=38*t-this.screenWidth/2;this.currentLeft=this.$refs.scroll.scrollLeft,this.speed=(e-this.currentLeft)/100,this.startTime=new Date,this.update()}},watch:{chartList:{handler:function(t){console.log(t)},deep:!0},"chartList.length":function(t){this.$refs.scroll.removeEventListener("scroll",this.scrollListenHandle),console.log(this.$refs.scroll.addEventListener),console.log(1111,t)}},destroyed:function(){this.$refs.scroll.removeEventListener("scroll",this.scrollListenHandle)}},c={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"chart"},[s("div",{on:{click:t.onButtonClick}},[t._v("按钮")]),t._v(" "),s("div",{ref:"scroll",staticClass:"chart__move",on:{touchmove:t.onTouchMove}},[s("div",{ref:"child",staticClass:"move__child",style:{width:t.AllLength+"px"}},t._l(t.chartList,function(e,n){return s("div",{key:n,staticClass:"child__wrap",on:{click:function(e){t.onSelectDateClick(n)}}},[s("div",{staticClass:"child__chart",class:{"child__chart--white":t.selectIndex===n||t.clickIndex===n},style:{height:e/t.maxStep*180+"px"}}),t._v(" "),s("div",{staticClass:"child__date",class:{"child__date--blue":t.selectIndex===n||t.clickIndex===n}},[t._v(t._s(t.dateList[n]))])])}))])])},staticRenderFns:[]};var i=s("VU/8")(n,c,!1,function(t){s("3BRC")},"data-v-08dc0b2b",null);e.default=i.exports},"3BRC":function(t,e){}});
//# sourceMappingURL=37.3bb89ac70335ac8920e3.js.map