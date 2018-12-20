![](https://user-gold-cdn.xitu.io/2018/12/19/167c7004b54a9e91?w=471&h=369&f=gif&s=199605)
实际项目开发时候需要实现圆环加载及数字滚动的效果,接下来分享下自己的实现思路和做法。

## 数字的滚动的实现思路

vue 本身就是根据数据来驱动 view 层的显示,实现数字的滚动本质就是设置一个延迟函数改变数据的同时，view 层的显示也会随着改变达到渐变的效果。

## 组件化

为了考虑多种使用场景，将滚动抽离成组件，需要用到的属性

| 参数      | 说明         | 类型            | 默认值 |
| --------- | ------------ | --------------- | ------ |
| tag       | 标签名       | String          | 'span' |
| start     | 是否开始     | Boolean         | true   |
| startVal  | 起始值       | Number / String | 0      |
| endVal    | 结束值       | Number /String  | -      |
| decimals  | 几位小数     | Number          | 2      |
| duration  | 过渡时间     | Number          | 2 (s)  |
| isRestart | 是否可以暂停 | Boolean         | false  |

所以我们 props 的类型校验如下

```
// index.vue
<script>
import CountUp from './countup.js'
export default {
  name: 'countup',
  mounted() {
    this.$nextTick(() => {
      this._countup = new CountUp(
        this.$el,
        this.startVal,
        this.endVal,
        this.decimals,
        this.duration
      )
      if (this.start) {
        this._countup.init()
      }
    })
  },
  props: {
    tag: {
      type: String,
      default: 'span'
    },
    start: {
      type: Boolean,
      default: true
    },
    startVal: {
      type: Number | String,
      default: 0
    },
    endVal: {
      type: Number | String,
      required: true
    },
    decimals: {
      type: Number,
      default: 2
    },
    duration: {
      type: Number,
      default: 2
    },
    isRestart: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      times: 0
    }
  },
  methods: {
    onPauseResumeClick() {
      if (this.isRestart) {
        if (this.times === 0) {
          this._countup.pauseResume()
          this.times++
        } else {
          this._countup.restart()
          this.times = 0
        }
      }
    }
  },
  render(h) {
    return h(
      this.tag,
      {
        on: {
          click: this.onPauseResumeClick
        }
      },
      [this.startVal]
    )
  },
  watch: {
    start(val) {
      if (val) {
        this._countup.init()
      }
    },
    endVal(val) {
      this._countup.updateNew(this.endVal)
    }
  }
}
</script>
```

`逻辑部分抽离出来放在 countup.js文件中`。首先来看看 index.vue 文件,在 mounted 中实例化了一个 CountUp 类，并且`向这个类中传递了我们props接收到的参数`。并且`在初始化和start值发生改变的时候`触发类中的`init函`数,在`endVal改变`的时候触发类的`updateNew函数`。最终通过 render 函数将值渲染在 view 层。分析完 index.vue 文件后，好奇到底 countup.js 定义了哪些函数，接下来看下数字过渡的实现。

## CountUp 类

首先我们来看代码结构,暂时不关心细节做了什么,constructor`构造函数`中接收到外部传入的值，并且将这些值添加到实例对象上。这样类上的方法(`也就是类的prototype原型上的方法`)都可以`通过this`访问到实例的对象的值。

```
class CountUp {
  constructor(target, startVal, endVal, decimals, duration) {
    this.target = target
    this.startVal = startVal
    this.endVal = endVal
    this.decimals = decimals
    this.duration = Number(this.duration) * 1000 || 2000
  }
  // 初始化
  init() {
    // 拿到DOM
    this.label =
      typeof this.target === 'string'
        ? document.getElementById(this.target)
        : this.target
    this.startVal = Number(this.startVal)
    this.endVal = Number(this.endVal)
    this.frameVal = this.startVal
    this.startTime = new Date()
    this.progress = this.endVal - this.frameVal
    this.update()
  }
  // 更新
  update() {
    this.rAF = setInterval(() => {
      const time = new Date() - this.startTime
      const speed =
        ((new Date() - this.startTime) / this.duration) * this.progress
      if (time >= this.duration) {
        clearInterval(this.rAF)
        this.frameVal = this.endVal
        this.startVal = this.frameVal
      } else {
        this.frameVal = this.startVal + speed
      }
      this.printValue(this.frameVal)
    })
  }
  // 打印值
  printValue(value) {
    this.label.innerHTML = value.toFixed(this.decimals)
  }
  // 有新的结束值
  updateNew(newEndVal) {
    this.pauseResume()
    this.endVal = newEndVal
    this.init()
  }
  // 暂停
  pauseResume() {
    clearInterval(this.rAF)
    this.startVal = this.frameVal
  }
  // 重新开始
  restart() {
    this.init()
  }
}
export default CountUp
```

`constructor`构造函数中拿到数据,然后通过各个`prototype`上的方法`如:printValue(打印值)、updateNew(更新)......`实现代码逻辑。有了对这个类结构的认识，我们来看看每个模块都做了什么事。  
在 mounted 钩子中我们通过`this._countup.init()`初始化,在初始化过程中主要做了一些安全转换,判断传入的$el 如果未字符串则获取对应 id 的 DOM，否则将 target 本身就是 DOM,将起始值和结束值都转为数字类型,关键点`开启计时`设置 startTime,我们后面会通过时间来判断是否已经达到目标值用来判断是否停止过渡，`计算出总的路程的绝对值`。在初始化的结束时开启执行下一个`execute`函数。

### 过渡

init 函数中最重要的就是设置了过渡的开始时间，计算出起始值到结束值总的路程。接下来就是数字滚动的过渡过程。

```
 update() {
    this.rAF = setInterval(() => {
      const time = new Date() - this.startTime
      const speed =
        ((new Date() - this.startTime) / this.duration) * this.progress
      if (time >= this.duration) {
        clearInterval(this.rAF)
        this.frameVal = this.endVal
        this.startVal = this.frameVal
      } else {
        this.frameVal = this.startVal + speed
      }
      this.printValue(this.frameVal)
    })
  }
```

在`update更新函数`中我们设置一个 setInterval 重复执行数字的`累计过程`，通过`单位时间/总时间*路程=速度`的公式来累计，要注意的是`speed本身是有正负`的所以不需要考虑是加还是减的问题。并且我们通过`printValue`函数将每次更新的值更新到 DOM 节点上。并且在这个函数中控制 DOM 的显示，如 toFixed 来控制数字显示的小数点位数，当然也可以控制`整数部分每三位加一个,`的显示`如:10,200`

```
  // 打印值
  printValue(value) {
    this.label.innerHTML = value.toFixed(this.decimals)
  }
```

至此我们已经完成了数字滚动过渡功能,来看看制作的效果吧。

![](https://user-gold-cdn.xitu.io/2018/12/20/167cc438d9511e73?w=409&h=369&f=gif&s=53092)
以为大功告成了，结果发现在我们更新结束值 5000 在未达到时又更改为 500 会瞬间改回来。
![](https://user-gold-cdn.xitu.io/2018/12/20/167cc4616eeb8e71?w=264&h=191&f=jpeg&s=5421)

```
  // 有新的结束值
  updateNew(newEndVal) {
    this.pauseResume()
    this.endVal = newEndVal
    this.init()
  }
    // 暂停
  pauseResume() {
    clearInterval(this.rAF)
    this.startVal = this.frameVal
  }
```

我们需要在`更新endVal之前将上一个的定时器清除掉`,否则会一直使用通一个 setInterval 。所以在 500 -> 5000 的中途我们将值改为 500 相当于 startVal 和 endVal 都是 500 自然不会又过渡效果，并且会立即返回 500 的值。加上了 pauseResume 函数后再来看过渡效果。
![](https://user-gold-cdn.xitu.io/2018/12/20/167cc4e123a6e350?w=409&h=369&f=gif&s=119047)
当然 pauseResume 函数我们也可以设置为手动触发,我们在 methods 中定义好暂定函数,并且判断 props 是否设置了`isRestart为true是否开启可暂停模式`，在为真的情况下判断`点击次数times`为 0 时暂停，为 1 时重新开始滚动。

```
 methods: {
    onPauseResumeClick() {
      if (this.isRestart) {
        if (this.times === 0) {
          this._countup.pauseResume()
          this.times++
        } else {
          this._countup.restart()
          this.times = 0
        }
      }
    }
  },
 render(h) {
    return h(
      this.tag,
      {
        on: {
          click: this.onPauseResumeClick
        }
      },
      [this.startVal]
    )
  },
```

![](https://user-gold-cdn.xitu.io/2018/12/20/167cc56c31d38598?w=409&h=369&f=gif&s=107687)
