## 前言
在学习了解组件复用的时候查看资料，看到了`mixins,extend`方法同时也查到了`高级函数(Higher-Order Components)和jsx`等字眼。听上去高级和jsx挺流皮的，那得好好研究下。接下来我们就探讨下他们的基本使用。
## 概念
> **高阶组件定义** : 高阶组件是一个方法，这个方法接收一个原始组件作为参数，并返回新的组件。

> **jsx定义** : JSX 是一种类似于 XML 的 JavaScript 语法扩展 JSX 不是由引擎或浏览器实现的。相反，我们将使用像 Babel 这样的转换器将 JSX 转换为常规 JavaScript。基本上，JSX 允许我们在 JavaScript 中使用类似 HTML 的语法。

## template模板生成方式
> Vue 推荐使用在绝大多数情况下使用 template 来创建你的 HTML。然而在一些场景中，你真的需要 JavaScript 的完全编程的能力，这就是 render 函数，它比 template 更接近编译器。  

其实我们传入template模板之后，在`vue底层也会将其转换成render函数` vue源码 src/platform/web/entry-runtime-with-compiler.js文件中代码如下，我们只需要`关注tempalte变量`，首先判断配置项中有无传入render，如果没有也会有很多种情况，无论哪种情况都会给template变量`赋值一个DOM字符串`，最终通过`compileToFunctions函数将其转换成render函数`，通过`结构赋值的方式赋值给render变量`，然后添加到实例上 具体可以看[这篇文章](https://juejin.im/post/5be520e8e51d450f9c6cf31c)

```
if (!options.render) {
    let template = options.template
    if (template) {
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template)
        }
      } else if (template.nodeType) {
        template = template.innerHTML
      }
    } else if (el) {
      template = getOuterHTML(el)
    }
    if (template) {
      const { render, staticRenderFns } = compileToFunctions(template, {
        shouldDecodeNewlines,
        delimiters: options.delimiters,
        comments: options.comments
      }, this)
      options.render = render
    }
  }
```
## render语法
使用之前[需要的配置和使用语法](https://github.com/vuejs/babel-plugin-transform-vue-jsx)这里我们主要来看`props 、class、on(事件)、slots`这四个属性，首先来看代码
```
// 子组件
<script>
export default {
  name: 'judge',
  props: {
    type: {
      type: Number | String,
      default: 1
    }
  },
  render(h) {
    return h(
      'div',
      {
        class: {
          default: true,
          first: this.type == 1,
          second: this.type == 2,
          third: this.type == 3
        },
        on: {
          click: this.onShowTypeClick
        }
      },
      [this.$slots.default, this.$slots.tag]
    )
  },
  methods: {
    onShowTypeClick() {
      console.log(this.type)
    }
  }
}
</script>

<style lang='scss' scoped>
.default {
  text-align: center;
  width: 200px;
  line-height: 50px;
  background-color: #eee;
}
.first {
  background-color: #f66;
}
.second {
  background-color: #c66;
}
.third {
  background-color: #804;
}
</style>

```

```
// 父组件
   <input type="text"
      v-model="number">
    <judge :type="number">
      <span class="render__incoming"> 外来者</span>
      <p class="render__incoming-p"
        slot="tag">我是p标签</p>
    </judge>
```

![效果图](https://user-gold-cdn.xitu.io/2018/12/8/1678c2b3573cbeb7?w=377&h=259&f=gif&s=16611)

 render函数的`功能创建虚拟节点`就是代替template所以 在.vue 文件中`必须省略template标签`。       
 ### createElement
 render函数默认接受`createElement 函数`createElement默认接受三个参数
 ```
 createElement(
  // {String | Object | Function}
  // 一个 HTML 标签字符串，组件选项对象，或者
  // 解析上述任何一种的一个 async 异步函数。必需参数。
  'div',

  // {Object}
  // 一个包含模板相关属性的数据对象
  // {String | Array}
  // 子虚拟节点 (VNodes)，由 `createElement()` 构建而成，
  [
    '先写一些文字',
    createElement('h1', '一则头条'),
    this.$slots.default
  ]
)
 ```
 除了第一个参数，`后面两个都为可选参数`,第二个参数是`配置选项`如:style、attrs、props等，`注意的是使用了domProps属性下的innerHTML后，会覆盖子节点和slot插入的元素`，`第三个参数是关于子节点`如：再用createElement函数创建一个虚拟子节点，或者是接受slot传递过来的DOM节点
 
 ## hoc高阶函数
 同样来看`props 、class、on(事件)、slots`这四个属性的实现。
 ```
 // hoc 组件
 export default componentA => {
  return {
    // hoc 组件本身没有设置props 需要设置传入的组件相同的props
    props: componentA.props,
    render(h) {
      let slots = {}
      Object.keys(this.$slots).map(item => {
        slots[item] = () => this.$slots[item]
        return slots
      })
      return h(componentA, {
        attrs: this.$attrs,
        props: this.$props,
        scopedSlots: slots,
        on:this.$listeners
      })
    }
  }
}

 ```
 ```
 // 父组件
    <packer :test="15"
      v-on:customize-click="onCuClick">
      插入信息
      <p slot="test">1516545</p>
    </packer>
 ```
 ```
 // componentA 组件
<template>
  <div>
    <span @click="handleClick">props: {{prop}}</span>
    <slot name="test"></slot>
    ============
    <slot></slot>
  </div>
</template>
 ```
 ### 实现过程
 在vue中`组件可以看作是一个对象`，里面包括一些方法属性如：`data、props、methods、钩子函数等`，那hoc函数最终也是要返回这样一个对象。我们重新来温习下hoc高阶组件的定义，`一个函数接收一个组件，并且返回一个新的组件`。可以这样理解，`接受一个组件，并且对整个组件进行包装然后返回出去`。当然hoc函数返回出去的对象应该也具有组件应该有的options如：`data、props、methods、钩子函数等`。  
 来解释下本例中的实现过程，给hoc函数设置props和`componentA`相同的props属性，这样我们也可以通过packer向hoc组件传入props。在hoc接受到外部传入的值后通过this.$props将hoc实例中的props值都传递给`componentA`，当然我们也可以给hoc设置多于`componentA`的props值。
 > attrs 指的是那些没有被声明为 props 的属性      
 
 通过scopedSlots实现hoc组件传入slot插槽
 ```
  scopedSlots: {
    // 实现默认插槽和具名插槽
    default: ()=>this.$slots.default,
    test: ()=>this.$slots.test
  }
 ```
> listeners: (2.3.0+) 一个包含了所有在父组件上注册的事件侦听器的对象。这只是一个指向 data.on 的别名。   

listeners指的就是在父组件上绑定的所有事件(是一个对象)格式为
{ [key: string]: Function | Array<Function> } 键名为字符串，值为函数多个用数组

```
<packer v-on:customize-click="onCuClick"></packer>
```
所以我们需要在hoc组件中设置`componentA`的父组件事件
 ## jsx
 首先我们来看下用render函数实现使用element-ui table组件
 
 ```
 export default {
  render(h) {
      return  h(
          'el-table',
          {
            props: {
              data: [
                {
                  date: '2016-05-02',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1518 弄'
                }
              ]
            }
          },
          [
            h('el-table-column', {
              attrs: {
                prop: 'date',
                label: '日期',
                width: '180'
              }
            })
          ]
        )
  }
 ```
 可以看到只是两次嵌套关系的render函数写起来的代码很难维护，这里就要用到jsx语法。它可以让我们回到更接近于模板的语法上。
 
```
export default {
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ]
    }
  },
  render(h) {
    return (
      <el-table data={this.tableData}>
        <el-table-column prop="date" label="日期" width="180" />
      </el-table>
    )
  }
}

```
### 实现jsx中v-model

![效果图](https://user-gold-cdn.xitu.io/2018/12/8/1678e3fcd97468f7?w=406&h=209&f=gif&s=44148)
```
<script>
export default {
  data() {
    return {
      initValue: ''
    }
  },
  render() {
    return (
      <div class="input__wrap">
        <div>initValue的值:{this.initValue}</div>
        <el-input
          value={this.initValue}
          on-input={val => {
            this.initValue = val
          }}
        />
      </div>
    )
  }
}
</script>

<style lang='scss' scoped>
.input__wrap {
  width: 200px;
}
</style>

```
### 实现jsx中 v-for
```
<script>
export default {
  data() {
    return {
      tagList: ['标签1', '标签2', '标签3']
    }
  },
  render() {
    return (
      <div>
        {this.tagList.map((item, index) => {
          return <el-tag key={index}>{item}</el-tag>
        })}
      </div>
    )
  }
}
</script>
```