webpackJsonp([22],{ZDuw:function(e,a){},pK0S:function(e,a,i){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s={name:"radio",data:function(){return{radioList:[{linkLabel:"label1",value:"1",isDisabled:!1,isFocus:!1,label:"标签1"},{linkLabel:"label2",value:"2",isDisabled:!1,isFocus:!1,label:"标签2"},{linkLabel:"label3",value:"3",isDisabled:!1,isFocus:!1,label:"标签3"}],selectedRadio:"1",isShow:!1}},methods:{onRedClick:function(){this.radioList.forEach(function(e){console.log(e)}),this.isShow=!this.isShow}},created:function(){}},l={render:function(){var e=this,a=e.$createElement,i=e._self._c||a;return i("div",[i("div",{staticClass:"example",on:{click:e.onRedClick}},e._l(e.radioList,function(a,s){return i("label",{key:a.value,attrs:{for:a.linkLabel,accesskey:s}},[i("span",{staticClass:"content__input"},[i("span",{staticClass:"radio__replace",class:{"radio__replace--checked":e.selectedRadio===a.value,"radio__replace--disable":a.isDisabled}}),e._v(" "),i("input",{directives:[{name:"model",rawName:"v-model",value:e.selectedRadio,expression:"selectedRadio"}],staticClass:"radio__button",attrs:{type:"radio",name:"radio",id:a.linkLabel,tabindex:s,disabled:a.isDisabled},domProps:{value:a.value,checked:e._q(e.selectedRadio,a.value)},on:{focus:function(e){a.isFocus=!0},blur:function(e){a.isFocus=!1},change:function(i){e.selectedRadio=a.value}}})]),e._v(" "),i("span",{staticClass:"content__text"},[e._v(e._s(a.label))])])})),e._v(" "),i("div",{class:{test:e.isShow},on:{click:e.onRedClick}},[i("div",{staticClass:"text__item"})])])},staticRenderFns:[]};var t=i("VU/8")(s,l,!1,function(e){i("ZDuw")},"data-v-90f8388e",null);a.default=t.exports}});
//# sourceMappingURL=22.021a561ea890876fb06d.js.map