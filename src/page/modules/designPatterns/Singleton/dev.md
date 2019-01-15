## 前言
之前写过一篇[炫酷的柱状图滑动效果](https://juejin.im/post/5c1ee0d8e51d4548ac6f5c42),其中有个不足点就是addEventListener添加的滚动事件是一直存在的,在柱状图宽度小于屏幕宽度时以及生命周期销毁的时候我们需要removeEventListener。当柱状图宽度大于屏幕时,又需要重新添加上滚动事件。这就需要用到今天要讲的单例模式。

## 单例模式 添加唯一的滚动事件
> 确保一个类仅有一个实例，并提供一个访问它的全局访问点。

现在我们来实现滚动事件的添加和移除,之前柱状图可以点击[此处](https://github.com/guanwanxiao/gwx_project/tree/master/src/page/modules/designPatterns/Singleton)查看源码。
```
// 文件结构
|--index.vue
|--singleScroll.js
```
singleScroll.js文件中存放滚动事件的类如下:
```
export class SingleScroll {
  // 用来判断是否已经添加滚动事件
  instance = false
  /**
     * 给指定DOM添加对应类型的事件和具体事件
     * @param  {HTMLFormElement} dom 节点
     * @param  {Function} handle 具体事件
     * @return {String}  type 事件类型
     */
  constructor(dom, handle, type) {
    this.dom = dom
    this.handleEvent = handle
    this.type = type
  }
  // isReset表示是否移除事件监听,当传入true移除,不传会执行添加事件监听
  handle (isReset) {
    if (!this.instance) {
      this.dom.addEventListener(this.type, this.handleEvent)
      this.instance = true
      return
    }
    if (isReset) {
      this.instance = false
      this.dom.removeEventListener(this.type, this.handleEvent)
    }
  }
}
```
index.vue生成实例如下:
```
data() {
    return {
        // 柱状图个数列表
        braceletDataList: [],
        // SingleScroll实例对象
        instance:{}
    }
},
mounted(){
    // 在mounted生命周期中拿到具体的DOM并且实例化SingleScroll对象
    this.instance = new SingleScroll(this.$refs.scroll, this.handle, 'scroll')
},
watch: {
    // 监听列表长度
    'braceletDataList.length'(newLength) {
      // 事实更新 SingleScroll实例中instance的状态,当长度小于10个时需要移除事件监听
      this.instance.handle(newLength < 10)
    }
},
// 生命周期销毁时移除监听
destroyed() {
    this.instance.handle(true)
}

```
## 设置 debounce