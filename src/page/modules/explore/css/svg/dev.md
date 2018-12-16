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

## svg

- [圆环 loading](https://www.zhangxinxu.com/wordpress/2015/07/svg-circle-loading/)

* [stroke-dasharray 和 stroke-dashoffset](https://www.zhangxinxu.com/wordpress/2014/04/animateion-line-drawing-svg-path-%E5%8A%A8%E7%94%BB-%E8%B7%AF%E5%BE%84/)
* [初探 svg](http://imweb.io/topic/577932e9f525c4613e8b4012)
