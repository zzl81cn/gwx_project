webpackJsonp([26],{"8sHM":function(e,t){},NIzl:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o={name:"inputHtml",data:function(){return{text:"",checkbox:!0,textarea:"",selected:"",radio:""}},methods:{onTextInput:function(e){console.log(e.srcElement.type+"变成了"+e.target.value)},onCheckboxChange:function(e){console.log(e.target.value)}}},a={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("input",{directives:[{name:"model",rawName:"v-model.number.trim",value:e.text,expression:"text",modifiers:{number:!0,trim:!0}}],attrs:{type:"text"},domProps:{value:e.text},on:{input:[function(t){t.target.composing||(e.text=e._n(t.target.value.trim()))},e.onTextInput],blur:function(t){e.$forceUpdate()}}}),e._v(" "+e._s(e.text)+"\n  "),n("br"),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.checkbox,expression:"checkbox"}],attrs:{type:"checkbox","true-value":"yes","false-value":"no"},domProps:{checked:Array.isArray(e.checkbox)?e._i(e.checkbox,null)>-1:e._q(e.checkbox,"yes")},on:{input:e.onTextInput,change:[function(t){var n=e.checkbox,o=t.target,a=o.checked?"yes":"no";if(Array.isArray(n)){var r=e._i(n,null);o.checked?r<0&&(e.checkbox=n.concat([null])):r>-1&&(e.checkbox=n.slice(0,r).concat(n.slice(r+1)))}else e.checkbox=a},e.onCheckboxChange]}}),e._v(" "+e._s(e.checkbox)+"\n  "),n("br"),e._v(" "),n("textarea",{directives:[{name:"model",rawName:"v-model",value:e.textarea,expression:"textarea"}],domProps:{value:e.textarea},on:{input:[function(t){t.target.composing||(e.textarea=t.target.value)},e.onTextInput]}}),e._v("\n  "+e._s(e.textarea)),n("br"),e._v(" "),n("select",{directives:[{name:"model",rawName:"v-model",value:e.selected,expression:"selected"}],on:{input:e.onTextInput,change:function(t){var n=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){return"_value"in e?e._value:e.value});e.selected=t.target.multiple?n:n[0]}}},[n("option",{attrs:{disabled:"",value:""}},[e._v("请选择")]),e._v(" "),n("option",[e._v("A")]),e._v(" "),n("option",[e._v("B")]),e._v(" "),n("option",[e._v("C")])]),e._v("\n  "+e._s(e.selected)+"\n  "),n("br"),e._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:e.radio,expression:"radio"}],attrs:{type:"radio",value:"radio"},domProps:{checked:e._q(e.radio,"radio")},on:{input:e.onTextInput,change:function(t){e.radio="radio"}}}),e._v(" "+e._s(e.radio)+"\n")])},staticRenderFns:[]};var r=n("VU/8")(o,a,!1,function(e){n("8sHM")},"data-v-5d35fbd6",null);t.default=r.exports}});
//# sourceMappingURL=26.ff630c3850df6820709f.js.map