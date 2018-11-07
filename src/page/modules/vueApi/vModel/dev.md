## 前言

- 在使用 v-model 时习惯的想到数据双向绑定，但是关于 v-model 的使用场景和原理并不熟悉。接下来说说 v-model 的使用场景，和 vue 的源码。
- v-model 的使用限制`input(checkbox,radio,text),select,textarea,components`

## HTML 原生的输入元素

```
<input v-model="text"
      type="text">
<input v-model="checkbox"
  type="checkbox">
data() {
    return {
      text: '',
      checkbox: true
    }
  }
```

![原生元素](https://user-gold-cdn.xitu.io/2018/11/4/166dc7266b127d5d?w=377&h=167&f=png&s=4705)
原理:  
通过使用 v-model 指令在元素的输入元素上创建双向数据绑定，它会根据控件类型自动选取正确的方法来更新元素。v-model 本质上不过是语法糖。它负责监听用户的输入事件以更新数据。
当 input 输入框值改变/复选框值改变时，text/checkbox 值也会同时改变，它负责监听用户的输入事件以更新数据。
radio 和 checkbox 用法当我们选中时，会用之前设定好的值

```
 <input type="radio"
      v-model="radio"
      value="radio"> {{radio}}
```

```
 <input v-model="checkbox"
      type="checkbox"
      true-value="yes"
      false-value="no"> {{checkbox}}
```

### input 事件

对于 input，select，textarea 原生都有 input 事件，值更改时，input 事件会同步触发。

```
 methods: {
    // event是原生dom事件
    onValueInput(event) {
      // srcElement Event.target 属性用来区分元素的
      console.log(`${event.srcElement.type}变成了${event.target.value}`)
    }
  }
```

![input事件](https://user-gold-cdn.xitu.io/2018/11/4/166dc91e424d48de?w=1034&h=294&f=png&s=29200)

### 修饰符

.lazy 取代 input 监听 change 事件因为 change 事件触发的条件是值改变失去焦点时触发，而 input 是实时，加上 lazy 修饰符后等于多了一个失去焦点才能触发的条件。  
.number - 输入字符串转为有效的数字如果原值的转换结果为 NaN 则返回原值  
注意:

1. 修饰符不能限制输入内容仅仅是把用户输入的内容尝试转换一下
2. 如输入 1+1 结果为 1 它不会去计算只是碰到 1 是数字，碰到+就停止了
3. .trim - 输入首尾空格过滤

## 自定义组件的 v-model

父组件中在子组件上使用 v-model，默认会用 value 的 prop 来接受父组件 v-model 绑定的值，然后子组件通过 input 事件将更新后的值传递给父组件

```
child组件中
<input :value="value"
    @input="onChildClick($event.target.value)">
props:{
    value: {
      type: String,
      default: ''
    }
},
methods: {
    onChildClick(value) {
      // 需要将更新后的值传递给父组件
      this.$emit('input', value)
    }
}
```

```
父组件中
 // 相当于<child :value="name" @input="name = arguments[0]"></child>
 <child v-model="name"></child>
 data(){
     return{
         name:""
     }
 }
```

## 源码学习

vscode 中安装了[Search node_modules](https://marketplace.visualstudio.com/items?itemName=jasonnutter.search-node-modules)后查找依赖包中的 vue，或者直接去[vue 官网](https://github.com/vuejs/vue)将项目 pull 下来。  
vue/src/compiler/codegen/index.js 中 先看第一个函数，这个书写格式跟我们的习惯不太一样。

```
function genDirectives (el: ASTElement, state: CodegenState): string | void {
    // 省略内容
}
```

这种书写方式是 flow 的语法。首先我们需要了解下什么是[flow](https://zhenyong.github.io/flowtype/docs/type-annotations.html#_)

### flow

1. 它是 JavaScript 静态类型检查工具。
2. 使用的原因:js 是动态类型语言，太灵活容易出现非常隐蔽的隐患代码，在运行阶段各种 bug，类型检查是当前动态类语言的发展趋势。
3. 所谓类型检查，就是在编译期尽早发现（由类型错误引起的）bug，又不影响代码运行（不需要运行时动态检查类型）。
4. 使用场景: 项目越复杂就越需要通过工具的手段来保证项目的维护性和增强代码的可读性。

### flow 常用的类型注释语法

1.  借助类型注释来指明期望的类型。类型注释是以冒号 : 开头

```
// x,y期待类型为number add函数的返回值期待值为number
function add(x: number, y: number): number {
  return x + y
}
```

2.  类型注释的使用场景:在函数参数，返回值，变量声明。

```
class Bar {
  x: string;           // x 是字符串
  y: string | number;  // y 可以是字符串或者数字
  bar(): string {      // bar返回值为string
    return this.foo;
  }
}
```

3. 标记为可选参数

```
是在定义函数的参数后面加一个 ?，标记为可选参数
function foo(x?) {
  if (x != undefined) {
  }
}
```

4. 数组类型注释

```
// 数组类型注释的格式是 Array<T>，T 表示数组中每项的数据类型。在上述代码中，arr 是每项均为数字的数组
var arr: Array<number> = [1, 2, 3]
```

5. callable 对象
   callable 对象 (可调用的) 函数也是一个对象，也可以拥有属性，于是函数拥有一个 callable 属性

```
function makeCallable(): { (x: number): string; foo: number } {
  function callable(x) {
    return number.toFixed(2);
  }
  callable.foo = 123;
  return callable;
}
```

上面的代码可以拆成两部分看,下面的函数返回一个 callable 函数，并在返回之前给这个函数添加了 foo 属性。

```
function makeCallable() {
  function callable(x) {
    return number.toFixed(2);
  }
  callable.foo = 123;
  return callable;
}
```

然后分析: { (x: number): string; foo: number }这段，(x:number):string 对应的就是 callable 函数，意思是 callable 的入参必须是一个 number 类型，并且返回值是一个 string 类型。  
foo:number 对应的就是 callable.foo 必须为 number 类型

6. null 和 void
   JavaScript 有 null 和 undefined，Flow 中， null(值) 有 null 类型， undefined 有 void 类型

### genDirectives 函数

1. 在了解了 flow 语法后我们继续来看 vue 源码，打开 github 上拉下来的项目，examples/commits/index.html

```
 <input type="radio"
          :id="branch"
          :value="branch"
          name="branch"
          v-model="currentBranch">
```

2. js 部分先从编译阶段分析，首先是 parse 阶段， v-model 被当做普通的指令解析到 el.directives 中，然后在 codegen 阶段定义在 src/compiler/codegen/index.js 中

```
function genDirectives (el: ASTElement, state: CodegenState): string | void {
  const dirs = el.directives
}
```

有了 folw 语法的了解，我们知道:之后的是对前面变量的期望类型。但是在编译过程是 el 和 state 到底是什么呢?

![ASTElement](https://user-gold-cdn.xitu.io/2018/11/6/166e91fdf3634700?w=1179&h=644&f=png&s=71213)

![CodegenState](https://user-gold-cdn.xitu.io/2018/11/6/166e922487db2125?w=1302&h=578&f=png&s=56578)
可以看到 el.directives 是一个数组，它的子项包括(arg: null
modifiers: undefined
name: "model"
rawName: "v-model"
value: "currentBranch")  
state.directives 是一个对象，他的子项都是函数包括(
bind: ƒ (e,t)
cloak: ƒ O(e,t,n)
html: ƒ (e,t)
model: ƒ (e,t,n)
on: ƒ (e,t)
text: ƒ (e,t))这些函数
了解了这些参数是什么，继续看下面的代码

```
function genDirectives (el: ASTElement, state: CodegenState): string | void {
  const dirs = el.directives
  // 判断有无指令
  if (!dirs) return
  let hasRuntime = false
  let i, l, dir, needRuntime
  // dirs.length表示指令的个数，这里就是将指令都遍历
  for (i = 0, l = dirs.length; i < l; i++) {
    dir = dirs[i]
    needRuntime = true
    // 例如我们上面提到的model指令，在此将指令名字对应的函数赋值给gen变量，前面提到state.directives是一个包含(bind,model...)函数的对象
    // :DirectiveFunction就是表示gen的类型是一个指令函数
    const gen: DirectiveFunction = state.directives[dir.name]
    if (gen) {
      // gen函数返回一个Boolean之后我们会提到，这里将结果赋值给needRuntime来表示函数执行是否结束
      needRuntime = !!gen(el, dir, state.warn)
    }
     if (needRuntime) {
      hasRuntime = true
      res += `{name:"${dir.name}",rawName:"${dir.rawName}"${
        dir.value ? `,value:(${dir.value}),expression:${JSON.stringify(dir.value)}` : ''
      }${
        dir.arg ? `,arg:"${dir.arg}"` : ''
      }${
        dir.modifiers ? `,modifiers:${JSON.stringify(dir.modifiers)}` : ''
      }},`
    }
    if (hasRuntime) {
        return res.slice(0, -1) + ']'
      }
  }
}
```

dir 就是上面提到的数组下，res 不过就是将这些参数拼接起来，让我们看看它最终长什么样子
![dir](https://user-gold-cdn.xitu.io/2018/11/6/166e9376ea9931d7?w=794&h=22&f=png&s=4449)
加上后面的 slice 方法就是将 res 字符串的最后一位去掉然后拼接上']'组成一个完整的数组。

### model 函数

上面 const gen: DirectiveFunction = state.directives[dir. name]是拿出指令名对应的函数，拿 model 举例。定义在 src/platforms/web/compiler/directives/model.js

```
export default function model (
  el: ASTElement,
  dir: ASTDirective,
  _warn: Function
): ?boolean{
  // 就是needRuntime = !!gen(el, dir, state.warn)传递过来的参数
  const value = dir.value
  const modifiers = dir.modifiers
  const tag = el.tag
  const type = el.attrsMap.type
   // process该对象表示Node所处的当前进程（全局变量）process.env属性返回一个包含用户环境信息的对象使用场景:在development和production不同环境上，配置会有些不同
   if (process.env.NODE_ENV !== 'production') {
    if (tag === 'input' && type === 'file') {
      warn(
        `<${el.tag} v-model="${value}" type="file">:\n` +
          `File inputs are read only. Use a v-on:change listener instead.`
      )
    }
  }

  if (el.component) {
    genComponentModel(el, value, modifiers)
    return false
  } else if (tag === 'select') {
    genSelect(el, value, modifiers)
  } else if (tag === 'input' && type === 'checkbox') {
    genCheckboxModel(el, value, modifiers)
  } else if (tag === 'input' && type === 'radio') {
    genRadioModel(el, value, modifiers)
  } else if (tag === 'input' || tag === 'textarea') {
    genDefaultModel(el, value, modifiers)
  } else if (!config.isReservedTag(tag)) {
    genComponentModel(el, value, modifiers)
    return false
  } else if (process.env.NODE_ENV !== 'production') {
    warn()
  }
  return true
}
```

这段代码比较简单，判断下用户环境是不是 production，如果是判断下 tag(标签名)然后执行不同的函数

### 事件绑定和修饰符

1.由于 index.html 中 input 的 type 为 radio 不太常用，我将其改为如下

```
 <input :id="branch" :value="branch" name="branch" v-model.lazy.number.trim="currentBranch">
```

将 html 改为如上后在 model 函数中经过判断后会执行 genDefaultModel 函数

```
function genDefaultModel(
  el: ASTElement,
  value: string,
  modifiers: ?ASTModifiers
): ?boolean {
  const type = el.attrsMap.type
  // 判断不是production的情况下执行的代码
  if (process.env.NODE_ENV !== 'production') {
    const value = el.attrsMap['v-bind:value'] || el.attrsMap[':value']
    const typeBinding = el.attrsMap['v-bind:type'] || el.attrsMap[':type']
    if (value && !typeBinding) {
      const binding = el.attrsMap['v-bind:value'] ? 'v-bind:value' : ':value'
      warn(
        `${binding}="${value}" conflicts with v-model on the same element ` +
          'because the latter already expands to a value binding internally'
      )
    }
  }
  // modify是一个对象判断，如果使用了lazy则{lazy:true}然后用对象结构赋值的方法取出Boolean作为判断
  const { lazy, number, trim } = modifiers || {}
  const needCompositionGuard = !lazy && type !== 'range'

  // event是设置事件类型，如果是lazy则定义change类型，如果不是lazy再判断type是不是range，如果不是，则定义input事件类型

  const event = lazy ? 'change' : type === 'range' ? RANGE_TOKEN : 'input'
  // valueExpression是一个字符串，$event.target.value代表原生的DOM事件获取到当前值
  let valueExpression = '$event.target.value'
  if (trim) {
    // 如果使用trim修饰符，valueExpression字符串拼接.trim()
    valueExpression = `$event.target.value.trim()`
    console.log(valueExpression, 'trim')
  }
  if (number) {
    valueExpression = `_n(${valueExpression})`
    console.log(valueExpression, 'trim')
  }

  let code = genAssignmentCode(value, valueExpression)
  if (needCompositionGuard) {
    code = `if($event.target.composing)return;${code}`
  }
  // 添加value属性
  addProp(el, 'value', `(${value})`)
  // 给事件
  addHandler(el, event, code, null, true)
  if (trim || number) {
    addHandler(el, 'blur', '$forceUpdate()')
  }
}
```

![modifiers](https://user-gold-cdn.xitu.io/2018/11/7/166e9c5ac1280a17?w=920&h=125&f=png&s=8132)

### genAssignmentCode 函数

作用:返回 code  
按照我们分析的路线我们可以知道，函数接受值`value`就是我们在 html 定义的 currentBranch，如果不清除，可以返回按照介绍的路线重新捋一遍。  
`assignment`就是 genDefaultModel 中的 valueExpression 变量是一个字符串

```
function genAssignmentCode(value, assignment) {
    var res = parseModel(value);
    if (res.key === null) {
      return (value + "=" + assignment)
    } else {
      return ("$set(" + (res.exp) + ", " + (res.key) + ", " + assignment + ")")
    }
  }
```

parseModel 就是对 value 也就是 currentBranch 值做了很多情况的处理，可以来看下具体的返回值如下
![返回值](https://user-gold-cdn.xitu.io/2018/11/7/166ebd6e1e835293?w=660&h=70&f=png&s=4579)
然后我们得到 \${value}=\${assignment}结构赋值的结果就是 message=\$event.target.value  
回到 genDefaultModel 函数中 code = 'message=$event.target.value'  
code 生成完又执行了 2 句非常关键的代码

```
addProp(el, 'value', `(${value})`)
addHandler(el, event, code, null, true)
```

这实际上就是 input 实现 v-model 的精髓，通过修改 AST 元素，给 el 添加一个 prop，相当于我们在 input 上动态绑定了 value，又给 el 添加了事件处理，相当于在 input 上绑定了 input 事件，其实转换成模板如下：

```
<input
  v-bind:value="currentBranch"
  v-on:input="currentBranch=$event.target.value">
```

其实就是动态绑定了 input 的 value 指向了 messgae 变量，并且在触发 input 事件的时候去动态把 message 设置为目标值，这样实际上就完成了数据双向绑定了，所以说 v-model 实际上就是语法糖。

## 组件

从编译阶段说起，对于父组件而言，在编译阶段会解析 v-modle 指令，依然会执行 genData 函数中的 genDirectives 函数，接着执行 src/platforms/web/compiler/directives/model.js 中定义的 model 函数

```
genComponentModel(el, value, modifiers)
```

genComponentModel 函数定义在 src/compiler/directives/model.js 中

```
export function genComponentModel(
  el: ASTElement,
  value: string,
  modifiers: ?ASTModifiers
): ?boolean {
  const { number, trim } = modifiers || {}
  // 给baseValueExpression赋值一个默认的字符串
  const baseValueExpression = '$$v'
  let valueExpression = baseValueExpression
  if (trim) {
    // 判断类型是否为字符串，如果是使用去空格方法，如果不是返回原值
    valueExpression =
      `(typeof ${baseValueExpression} === 'string'` +
      `? ${baseValueExpression}.trim()` +
      `: ${baseValueExpression})`
  }
  if (number) {
    valueExpression = `_n(${valueExpression})`
  }
  const assignment = genAssignmentCode(value, valueExpression)

  el.model = {
    value: `(${value})`,
    expression: `"${value}"`,
    callback: `function (${baseValueExpression}) {${assignment}}`
  }
}
```

这个函数最终得到的结果是

```
el.model = {
  callback:'function ($$v) {currentBranch=$$v}',
  expression:'"currentBranch"',
  value:'(currentBranch)'
}
```

在创建 vnode 阶段会执行 createComponent 函数定义在 src/core/vdom/create-component.js

```
export function createComponent (
 Ctor: Class<Component> | Function | Object | void,
 data: ?VNodeData,
 context: Component,
 children: ?Array<VNode>,
 tag?: string
): VNode | Array<VNode> | void {
    // 当v-mode值发生差异时，执行 transformModel
    if (isDef(data.model)) {
        transformModel(Ctor.options, data)
 }
}
```

### transformModel 函数

```
function transformModel (options, data: any) {
  // 设置安全模式首先判断options.model存在，如果存在prop属性存在，就使用prop对应的名字，否则在不设置的情况下默认使用value做完prop接收
  const prop = (options.model && options.model.prop) || 'value'
  // 和上面同理
  const event = (options.model && options.model.event) || 'input'
  // 给data设置值，如果之前定义了options.model.prop则使用，如果没有则使用data.props.value = data.model.value
  ;(data.props || (data.props = {}))[prop] = data.model.value
  const on = data.on || (data.on = {})
  if (isDef(on[event])) {
    on[event] = [data.model.callback].concat(on[event])
  } else {
    on[event] = data.model.callback
  }
}
```

以上代码效果如下

```
data.props = {
  value: (message),
}
data.on = {
  input: function ($$v) {
    message=$$v
  }
}
```

其实就相当于我们在这样编写父组件：

```
let vm = new Vue({
  el: '#app',
  template: '<div>' +
  '<child :value="message" @input="message=arguments[0]"></child>' +
  '<p>Message is: {{ message }}</p>' +
  '</div>',
  data() {
    return {
      message: ''
    }
  },
  components: {
    Child
  }
})
```

注意点:子组件的 prop 和 input 事件名是可以自定义的在定义子组件的时候通过 model 选项配置子组件接收的 prop 名以及派发的事件名

```
 const prop = (options.model && options.model.prop) || 'value'
  const event = (options.model && options.model.event) || 'input'
```

我们可以做如下修改,也可以达到同样的效果

```
props: ['msg'],
  model: {
    prop: 'msg',
    event: 'change'
  },
  methods: {
    updateValue(e) {
      this.$emit('change', e.target.value)
    }
  }
```

## 总结

我们了解到它是 Vue 双向绑定的真正实现，但本质上就是一种语法糖，它即可以支持原生表单元素，也可以支持自定义组件。在组件的实现中，我们是可以配置子组件接收的 prop 名称，以及派发的事件名称。
