## 前言

由于在实际项目开发中会经常合 Vue 组件生命周期打交道，我写了一篇[vue 生命周期梳理](https://juejin.im/post/5bd3b97f6fb9a05ce874246b)来记录学习的过程，这份记录中主要分析了`_init函数`以及通过打印输出各个生命周期时`el，data，dom节点`的结果来反推生命周期中做了些什么。今天想通过分析 Vue 中源码来提升对生命周期的理解。

### callHook 方法

源码中最终执行生命周期的函数定义在 src/core/instance/lifecycle 中

```
export function callHook (vm: Component, hook: string) {
 const handlers = vm.$options[hook]
 // ...
}
```

这里先省略后面的代码，我们得知道 vm.$options 是什么，在 new Vue 在执行 this.\_init(options) 的时候会执行一下代码

```
vm.$options = mergeOptions(
 resolveConstructorOptions(vm.constructor),
 options || {},
 vm
)
```

![options](https://user-gold-cdn.xitu.io/2018/11/16/1671bb2a089f01c2?w=267&h=159&f=png&s=10600)
可以看到实际上是一个 JavaScript 对象，对象的描述就是各种配置，其中包括 created 钩子函数  
接下来看完整的函数如下:

```
export function callHook(vm: Component, hook: string) {
  const handlers = vm.$options[hook]
  if (handlers) {
    for (let i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm)
      } catch (e) {
        handleError(e, vm, `${hook} hook`)
      }
    }
  }
}
```

这样分析之后，上面的代码逻辑就很简单,当执行如下代码时，callHook 会去除对应的钩子函数并执行它。

```
Vue.prototype._init = function (options?: Object) {
  // ...
  initLifecycle(vm)
  initEvents(vm)
  initRender(vm)
  callHook(vm, 'beforeCreate')
  initInjections(vm)
  initState(vm)
  initProvide(vm)
  callHook(vm, 'created')
  // ...
}
```

1. 上面代码中`initState` 的作用是初始化 props、data、methods、watch、computed 等属性所以在 created 之后才能拿到这些数据和方法
2. `initProvide` data、props 已经生成

### mountComponent 函数

定义在 src/core/instance/lifecycle.js 中

```
export function mountComponent(
  vm: Component,
  el: ?Element,
  hydrating?: boolean
): Component {
  vm.$el = el
  callHook(vm, 'beforeMount')
  let updateComponent
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
  // ...
  } else {
    updateComponent = () => {
      vm._update(vm._render(), hydrating)
    }
  }
  vm._watcher = new Watcher(vm, updateComponent, noop)
  hydrating = false
  if (vm.$vnode == null) {
    vm._isMounted = true
    callHook(vm, 'mounted')
  }
  return vm
}
```

1. 可以看到`vm._render()`函数发生在 beforeMount 之后,它的作用是生成 VNode
2. 将生成的 VNode 作为入参，调用 update 方法，在 vm.\_update 方法中调用 patch 方法，patch 的作用就是将差异应用到真实 DOM 树 。所以在 mounted 的时候`DOM已经更新了`。

### lifecycleMixin 函数

同样定义在 src/core/instance/lifecycle.js 中

```
export function lifecycleMixin(Vue: Class<Component>) {
  Vue.prototype._update = function(vnode: VNode, hydrating?: boolean) {
    const vm: Component = this
    // 判断是否已经挂载过才会去执行更新
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate')
    }
  }
}
```

### callUpdatedHooks 函数

它的定义在 src/core/observer/scheduler.js 中：

```
function callUpdatedHooks (queue) {
  let i = queue.length
  while (i--) {
    const watcher = queue[i]
    const vm = watcher.vm
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated')
    }
  }
}
```

queue 是一个 wathcer 数组。里面包括很多个需要监听的对象

![update](https://user-gold-cdn.xitu.io/2018/11/16/1671bfb437c6634f?w=798&h=81&f=png&s=15112)
在 callUpdatedHooks 函数中遍历 queue 数字满足当前 watcher 为 vm.\_watcher 监听的对象是当前 watcher 以及已经 mounted 这两个条件，才会执行 updated 钩子函数。
