## 前言

_在使用 vue 开发过程中经常会接触到生命周期的问题，但对于每个钩子函数都做了什么，应用场景比较模糊，希望通过这次梳理让自己清楚一些。初次写文章，有不对的地方还望各位多多指正！_

### 1. vue 实例化过程

从 vue 实例化开始分析，我们通过 new Vue 来实例化来查看一下源码 在 src/core/instance/init.js 中定义 使用 vscode 的小伙伴推荐使用[Search node_modules 插件](https://marketplace.visualstudio.com/items?itemName=jasonnutter.search-node-modules)查找 node_modules 中的插件方便多了，妈妈再也不用担心我迷路了

```
Vue.prototype._init = function (options?: Object) {
  // ... 省略代码
  initLifecycle(vm)
  initEvents(vm)
  initRender(vm)
  callHook(vm, 'beforeCreate')
  initInjections(vm) // resolve injections before data/props
  initState(vm)
  initProvide(vm) // resolve provide after data/props
  callHook(vm, 'created')

  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    vm._name = formatComponentName(vm, false)
    mark(endTag)
    measure(`vue ${vm._name} init`, startTag, endTag)
  }

  if (vm.$options.el) {
    vm.$mount(vm.$options.el)
  }
}
```

Vue 初始化主要就干了几件事情，合并配置，初始化生命周期，初始化事件中心，初始化渲染，初始化 data、props、computed、watcher 等等，vue 把不同的功能逻辑拆成一些单独的函数执行。

我们关注到，在这个过程中插入钩子函数，提供给开发者调用的机会。在初始化的最后，检测到如果有 el 属性，则调用 vm.$mount 方法挂载 vm，挂载的目标就是把模板渲染成最终的 DOM。

### 2.生命周期钩子

1.  生命周期钩子自动绑定 this 到实例上，因此你可以通过 this.操作访问到数据和方法。注意不能使用箭头函数例如下方代码，因为箭头函数绑定外层的 this 会一直往上找。

```
created:()=>{// ...代码}
```

2.  下面用在各个生命周期中打印下 el，data，dom 节点

```
export default {
  name: 'App',
  data() {
    return {
      title: '标题'
    }
  },
   methods: {
    onDestoryClick() {
      this.$destroy()
    }
  },
  beforeCreate() {
    console.log(
      `\n\nbeforeCreate打头\n$el    :${this.$el}\n$data     :${JSON.stringify(
        this.$data
      )}\n$refs.head   :${JSON.stringify(
        this.$refs.head
      )}\nbeforeCreate结尾\n\n`
    )
    console.log(this.$vnode)
  },
  created() {
    console.log(
      `\n\ncreated打头\n$el    :${this.$el}\n$data     :${JSON.stringify(
        this.$data
      )}\n$refs.head   :${JSON.stringify(this.$refs.head)}\ncreated结尾\n\n`
    )
    console.log(this.$vnode)
  },
  beforeMount() {
    console.log(
      `\n\nbeforeMount打头\n$el    :${this.$el}\n$data     :${JSON.stringify(
        this.$data
      )}\n$refs.head   :${JSON.stringify(this.$refs.head)}\nbeforeMount结尾\n\n`
    )
    console.log(this.$vnode)
  },
  mounted() {
    console.log(
      `\n\nmounted打头\n$el    :${this.$el}\n$data     :${JSON.stringify(
        this.$data
      )}\n$refs.head   :${JSON.stringify(this.$refs.head)}\nmounted结尾\n\n`
    )
    console.log(this.$vnode)
  }
}
```

![结果图](https://user-gold-cdn.xitu.io/2018/10/27/166b35126ce4a2a8?w=713&h=582&f=png&s=30516)
可以发现

1.  beforeCreate 中拿不到任何数据，它在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。
2.  created 中已经可以拿到 data 中的数据了，但是 dom 还没有挂载。会判断有无 el，如果没有 el 则停止后面的模板挂载。

    在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (data observer)，属性和方法的运算，watch/event 事件回调。

    使用场景:ajax 请求和页面初始化

3.  beforeMount 和 created 拿到的数据相同 在挂载开始之前被调用：相关的 render 函数首次被调用。
4.  mounted 中 el 被创建 dom 已经更新，vue 实例对象中有 template 参数选项，则将其作为模板编译成 render 函数，编译优先级 render 函数选项 > template 选项

    使用场景:常用于获取 VNode 信息和操作，ajax 请求

    注意 mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted

5.  由于 beforeUpdate 和 updated 使用的比较少，一般用计算属性和 watch 代替所以在此不在说明
6.  destroyed Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。

### 客户端渲染过程

1.  处理 HTML 标记并构建 DOM 树。
2.  处理 CSS 标记并构建 CSSOM 树。
3.  将 DOM 与 CSSOM 合并成一个渲染树。
4.  根据渲染树来布局，以计算每个节点的几何信息。
5.  将各个节点绘制到屏幕上。

### 参考资料

1.  [vue.js](https://cn.vuejs.org/v2/api/#destroyed)
2.  [浏览器渲染过程](https://zhuanlan.zhihu.com/p/29418126)
