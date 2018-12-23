- stroke-dasharray 属性是一个表示属性，用于定义关联的破折号数组的渲染时的偏移量。

* 属性 stroke-dasharray：该值可能由两个值合写，使用英文逗号(,)分隔，`第一个值是画出的每段实线线段的长度，第二个值是各段之间空隙的长度`。如果无分隔，则说明两个值都是一样大小的。

```
// 表示每个破折号之间都相隔4
<line x1="0" y1="3" x2="30" y2="3" stroke="black"
          stroke-dasharray="4" />
//  表示每个破折号之间相隔 4,1 2,3两组为一个循环 四个长度中间空一格，两个长度中间空三格
<line x1="0" y1="9" x2="30" y2="9" stroke="black"
          stroke-dasharray="4 1 2 3" />
```

- [手环转动](https://www.zhangxinxu.com/wordpress/2010/08/css3js%E5%AE%9E%E7%8E%B0%E5%A4%9A%E5%BD%A9%E7%82%AB%E9%85%B7%E6%97%8B%E8%BD%AC%E5%9C%86%E7%8E%AF%E6%97%B6%E9%92%9F%E6%95%88%E6%9E%9C/)

## svg

- [圆环 loading](https://www.zhangxinxu.com/wordpress/2015/07/svg-circle-loading/)

* [stroke-dasharray 和 stroke-dashoffset](https://www.zhangxinxu.com/wordpress/2014/04/animateion-line-drawing-svg-path-%E5%8A%A8%E7%94%BB-%E8%B7%AF%E5%BE%84/)
* [初探 svg](http://imweb.io/topic/577932e9f525c4613e8b4012)
* [svg 介绍](http://www.ruanyifeng.com/blog/2018/08/svg.html)

![](https://user-gold-cdn.xitu.io/2018/12/21/167d16e6bc4bfa4d?w=256&h=258&f=gif&s=87051)
使用圆环加载效果可以用可以采用[css3+js 的方式](https://www.zhangxinxu.com/wordpress/2010/08/css3js%E5%AE%9E%E7%8E%B0%E5%A4%9A%E5%BD%A9%E7%82%AB%E9%85%B7%E6%97%8B%E8%BD%AC%E5%9C%86%E7%8E%AF%E6%97%B6%E9%92%9F%E6%95%88%E6%9E%9C/)。这种方式首先我们得有一个圆的图片。。<span style="color:#f66">核心是采用显示隐藏的方式，并且依靠层级的方式来控制圆的加载过程。</span> 今天来看看 svg 实现圆环过渡的过程和原理。

## svg

> SVG 是一种基于 XML 语法的图像格式，全称是可缩放矢量图（Scalable Vector Graphics）。<span style="color:#f66">本质上是文本文件，体积较小，且不管放大多少倍都不会失真。</span>

### 特性

> SVG 文件可以直接插入网页，成为 DOM 的一部分，<span style="color:#f66">然后用 JavaScript 和 CSS 进行操作。</span>

### 语法

SVG 代码都放在顶层标签 \<svg>之中。

```
<svg width="100%" height="100%">
  <circle id="mycircle" cx="50" cy="50" r="50" />
</svg>
```

当然 svg 有很多基础知识,你可以点击[这里](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Tutorial)进行学习查看。
我们今天会用到的是 defs 和 circle
