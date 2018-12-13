- dom2 级的事件流规定：事件流包括三个阶段：事件捕获阶段、目标阶段、冒泡阶段

## dom2 级事件方法

```
// 添加事件监听 同类型的监听事件可以累加
target.addEventListener(type,listener,Boolean)
// 移出事件监听
target.removeEventListener(type,listener,Boolean)
```

- 第三个参数 `确定侦听器是运行于捕获阶段`、目标阶段还是冒泡阶段。 如果将 Boolean 设置为 true，则侦听器只在捕获阶段处理事件，而不在目标或冒泡阶段处理事件。 如果 Boolean 为 false，则侦听器只在目标或冒泡阶段处理事件。要在所有三个阶段都侦听事件，请调用两次 addEventListener，一次将 Boolean 设置为 true，第二次再将 Boolean 设置为 false

## 滚动 监听 的条件

1. 父子两个元素

2. 子元素的高 > 父元素的高, 并且父元素 overflow:scroll 监听设置在父级上

- [滚动形成条件，监听](https://segmentfault.com/a/1190000010281497)

## 监听的函数中的 this

- 如果使用箭头函数则可以通过 this 拿到 vue 实例
- 如果使用 function 的方式定义回调，需要在外部重新\_this = this 用\_this 拿到 vue 实例

## window 上监听 scroll

- 会监听所以子元素的滚动事件，不仅仅是页面的滚动，如:页面内局部有个 div 的滚动事件也会触发

```
 window.addEventListener(
        'scroll',
        () => {
          this.scrollHandle()
        },
        true
      )
```

## 移出监听

- 添加事件监听会影响浏览器性能

* 在`组件销毁的时 destroyed`候要用 target.removeEventListener(type,listener,Boolean)移除监听或者判断条件，不符合条件的情况下移出监听事件如:高度未达到滚动时
* 只能移除具名函数的监听事件，事件一定要添加名字
