## 前言

在学习了解组件复用的时候查看资料，看到了`mixins,extend`方法同时也查到了`高级函数(Higher-Order Components)和jsx`等字眼。听上去 hoc 和 jsx 有种高级的感觉，那得好好研究下。

## 概念

> **高阶组件定义** : 高阶组件是一个方法，这个方法接收一个原始组件作为参数，并返回新的组件。

> **jsx 定义** : JSX 是一种类似于 XML 的 JavaScript 语法扩展 JSX 不是由引擎或浏览器实现的。相反，我们将使用像 Babel 这样的转换器将 JSX 转换为常规 JavaScript。基本上，JSX 允许我们在 JavaScript 中使用类似 HTML 的语法。

## template 模板生成方式

> Vue 推荐使用在绝大多数情况下使用 template 来创建你的 HTML。然而在一些场景中，你真的需要 JavaScript 的完全编程的能力，这就是 render 函数，它比 template 更接近编译器。

其实我们传入 template 模板之后，在`vue底层也会将其转换成render函数` vue 源码 src/platform/web/entry-runtime-with-compiler.js 文件中代码如下，我们只需要`关注tempalte变量`，首先判断配置项中有无传入 render，如果没有也会有很多种情况，无论哪种情况都会给 template 变量`赋值一个DOM字符串`，最终通过`compileToFunctions函数将其转换成render函数`，通过`结构赋值的方式赋值给render变量`，然后添加到实例上 具体可以看[这篇文章](https://juejin.im/post/5be520e8e51d450f9c6cf31c)

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

## render 语法

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

render 函数的`功能创建虚拟节点`就是代替 template 所以 在.vue 文件中`必须省略template标签`。

### createElement

render 函数默认接受`createElement 函数`createElement 默认接受三个参数

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

除了第一个参数，`后面两个都为可选参数`,第二个参数是`配置选项`如:style、attrs、props 等，`注意的是使用了domProps属性下的innerHTML后，会覆盖子节点和slot插入的元素`，`第三个参数是关于子节点`如：再用 createElement 函数创建一个虚拟子节点，或者是接受 slot 传递过来的 DOM 节点

## hoc 高阶函数

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

在 vue 中`组件可以看作是一个对象`，里面包括一些方法属性如：`data、props、methods、钩子函数等`，那 hoc 函数最终也是要返回这样一个对象。我们重新来温习下 hoc 高阶组件的定义，`一个函数接收一个组件，并且返回一个新的组件`。可以这样理解，`接受一个组件，并且对整个组件进行包装然后返回出去`。当然 hoc 函数返回出去的对象应该也具有组件应该有的 options 如：`data、props、methods、钩子函数等`。  
 来解释下本例中的实现过程，给 hoc 函数设置 props 和`componentA`相同的 props 属性，这样我们也可以通过 packer 向 hoc 组件传入 props。在 hoc 接受到外部传入的值后通过 this.$props 将 hoc 实例中的 props 值都传递给`componentA`，当然我们也可以给 hoc 设置多于`componentA`的 props 值。

> attrs 指的是那些没有被声明为 props 的属性

通过 scopedSlots 实现 hoc 组件传入 slot 插槽

```
 scopedSlots: {
   // 实现默认插槽和具名插槽
   default: ()=>this.$slots.default,
   test: ()=>this.$slots.test
 }
```

> listeners: (2.3.0+) 一个包含了所有在父组件上注册的事件侦听器的对象。这只是一个指向 data.on 的别名。

listeners 指的就是在父组件上绑定的所有事件(是一个对象)格式为
{ [key: string]: Function | Array<Function> } 键名为字符串，值为函数多个用数组

```
<packer v-on:customize-click="onCuClick"></packer>
```

所以我们需要在 hoc 组件中设置`componentA`的父组件事件

## jsx

首先我们来看下用 render 函数实现使用 element-ui table 组件

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

可以看到只是两次嵌套关系的 render 函数写起来的代码很难维护，这里就要用到 jsx 语法。它可以让我们回到更接近于模板的语法上。

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

### 实现 jsx 中 v-model

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

### 实现 jsx 中 v-for

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
      <div class="tag__wrap">
        {this.tagList.map((item, index) => {
          return <el-tag key={index}>{item}</el-tag>
        })}
      </div>
    )
  }
}
</script>
<style>
.tag__wrap {
  width: 200px;
  display: flex;
  justify-content: space-between;
}
</style>
```

![](https://user-gold-cdn.xitu.io/2018/12/9/16790836ab424cf1?w=468&h=76&f=png&s=2637)

### jsx 扩展符

扩展符将一个对象的属性智能的合并到组件 optiion 中

```
<script>
export default {
  name: 'sync',
  created() {
    console.log(this)
  },
  data() {
    return {
      obj: {
        class: ['sync__class1', 'sync__class2']
      }
    }
  },
  render() {
    return <div {...this.obj} />
  }
}
</script>
```

使用扩展符能方便我们插入多个 class 时,案例中发现如下报错

![](https://user-gold-cdn.xitu.io/2018/12/9/167909d4ee33778a?w=910&h=66&f=png&s=8431)
提示我们这个对象以及 observed 查看源码如下，定义在 src/core/vdom/create-element.js 中的\_createElement 函数中

```
 if (isDef(data) && isDef((data: any).__ob__)) {
    process.env.NODE_ENV !== 'production' && warn(
      `Avoid using observed data object as vnode data: ${JSON.stringify(data)}\n` +
      'Always create fresh vnode data objects in each render!',
      context
    )
    return createEmptyVNode()
  }
```

这段代码判断 data 中中定义的对象以及 data 的**ob**，如果已经定义（代表已经被 observed，上面绑定了 Oberver 对象）则提示`Avoid using observed data object ...`错误信息。

![](https://user-gold-cdn.xitu.io/2018/12/9/16790a0d0e7294b6?w=649&h=304&f=png&s=32402)
经过分析后，改写成

```
<script>
export default {
  name: 'sync',
  render() {
    const obj = {
      class: ['sync__class1', 'sync__class2']
    }
    return <div {...obj} />
  }
}
</script>
```

![](https://user-gold-cdn.xitu.io/2018/12/9/16790a4f5f772e27?w=600&h=65&f=png&s=7514)

### jsx sync 实现

```
<script>
export default {
  name: 'sync',
  render() {
    return (
      <div class="sync__click" onClick={this.onClick}>
        <el-pagination
          total={10}
          current-page={this.index}
          page-size={5}
          {...{
            on: {
              'update:currentPage': value => {
                this.index = value
                console.log('页数改变了')
              }
            }
          }}
        />
      </div>
    )
  },
  data() {
    return {
      index: 1
    }
  },
  methods: {
    onClick() {
      console.log('点击事件触发了')
    }
  }
}
</script>
<style>
.sync__click {
  width: 400px;
  height: 500px;
  background-color: #efefef;
}
</style>
```

![](https://user-gold-cdn.xitu.io/2018/12/9/16790bd815873f74?w=590&h=493&f=gif&s=44895)

###

## 总结

本文主要是认识了`高阶组件和jsx的定义和基本的使用方`式。再这之前梳理了 template 生成的过程，底层都是`通过render函数`来实现的。接下来讲了`render的相关语`法，以及书写 render 会带来维护的困难，不易读懂的困扰。最后使用`jsx语法简化render书写`，并且`举了几个vue常用的指令，除了v-show其他的实现都要通过自己来实现`。当然 jsx 的知识点还有很多，在有了以上知识的基础上，再去研究 jsx 的更多语法以及使用场景也会更加轻松些。本文也是我写的较长的一篇了，感觉大家阅读完！<img class="emoji" title=":blush:" alt=":blush:" src="https://user-gold-cdn.xitu.io/2018/12/9/16790c74debefb37?w=128&h=128&f=png&s=6181" height="20" width="20" align="absmiddle">

## 参考 functional

```
export default{
      functional: true,
      // 在functional设置为true的情况下 相当于代替了this,并且this值为undefined
      render(h,context){
      }
}
```

[hoc issues](https://github.com/vuejs/vue/issues/6201)

[babel-plugin-transform-vue-jsx](https://github.com/vuejs/babel-plugin-transform-vue-jsx#usage)

[腾讯 web](http://www.alloyteam.com/2017/07/12918/)

[vue 官网](https://cn.vuejs.org/v2/guide/render-function.html)

[render 函数](http://doc.vue-js.com/v2/guide/render-function.html)
