## 前言

之前觉得听到设计模式就觉得很遥远,但是在很多使用场景中自己考虑的不尽人意。设计模式本身就是在某一背景下某个问题的一种解决方案。首先他是前人留下的优化过后的编程思想,通过复用已经公认的设计，我能够在解决问题时取得先发优势，避免重蹈前人覆辙。为了提高代码可利用性，增加可维护性决定开始了解设计模式,学习设计的思维,并且在学习过程中加以实际案例实现,写下自己学习的笔记。

## 表单校验

```
   <group ref="group">
      <x-input ref="input"
        v-for="(item,index) in applicationList"
        :key="index"
        v-model="item.value"
        :title="item.title"
        :required="item.require"
        :is-type="item.type "
        @on-change="checkInvalid">
        <div slot="label">
          {{item.title}}
        </div>
      </x-input>
    </group>

    methods:{
        checkInvalid() {
          // 获取到子项DOM 列表
          const childrenList = this.$refs.group.$children
          // 筛选出有值的，作为是否全部未填的判断依据
          const statusList = childrenList.filter(item => {
            return item.currentValue
          })
          if (statusList.length < 1 ) {
            this.toastText = '还未填写信息'
            return
          }
          // 筛选出没有值的项
          const targetChild = childrenList.find(item => {
            return !item.currentValue
          })
          const result = targetChild !== undefined
          // 判断是否有未填项 如果有则动态设置提示文字
          result &&
            (this.toastText =
              '请先填写' + targetChild.title.slice(1, targetChild.title.length - 1))
        }
    }
```

在仅需要判断是否未填上,这样的判断也挺简单的,但是针对不同项有不同的规则时又需要加上对应 if 判断比较冗杂,不直观。接下来使用策略模式来试试。

## 想法

由于每项需要校验的条件不同,如果我们针对每一项去写个 if 判断没有起到复用的思想，如果我们写好一套方法,每次去遍历所有项去检测是否符合规则,会造成很多没必要的检测。这里就需要提到两个概念。

### 策略模式

策略模式一般包含`具体策略类`和`环境类`这两部分。我们需要校验的写法一样,但是具体的校验方式要根据你校验的是`姓名`还是`手机号`做变化。所以我们需要的方法`接收是统一的`,这就是环境类做的事,接收客户的请求。至于到底怎么做交给`具体策略类`去考虑。

```
validator(userName)
validator(phone)
```

`具体策略类`是一个对象下定义了很多方法,用来做具体的事情。功能都非常单一,这样可以达到复用的效果。

```
const strategies = {
  // 判断是否为空
  isNotEmpty(value, errMsg) {
    if (!value) {
      return errMsg
    }
  },
  // 是否小于最小长度
  minLength(value, errorMsg, length) {
    if (value.length < length) {
      return errorMsg
    }
  }
}
```

个人的理解就是可以把策略模式想象成一个公司,`环境类`想象成一个电话员负责接客户电话,`具体策略类`就是负责干事的部门,电话员接了一个单子说要修冰箱,就叫`具体策略类`部门 joke 去修,电话员又接了一个单子说要点外卖,就叫`具体策略类`的 rose 去送外卖。这里接单子的渠道都相同都是通过电话,但是负责做事的人不同,可以是`具体策略类`中具体的某个人,如果接了这个需求没人能干的了,再招一个能干的人,这就是扩展,并且对`具体策略类`部门中其他人没有影响。`核心思想是 将做什么和谁去做相分离`

## 重构校验方法

了解了`具体策略类`之后发现我们之前只传入一个变量还不够,就像电话员接了电话之后还需要告诉`具体策略类`谁去做。有时候会出现意外情况,比如客户说要点外卖,结果写了一个地址是北极,rose 都傻了臣妾办不到呀。rose 告诉客户不在配送范围内。

```
validator(userName)
validator(phone)
```

经过改写后格式定义如下

```
validator(userName,'isNotEmpty',用户名不能为空!')
```

```
// validator.js
const strategies = {
  isNotEmpty(value, errMsg) {
    if (!value) {
      return errMsg
    }
  },
  minLength(value, errorMsg, length) {
    if (value.length < length) {
      return errorMsg
    }
  }
}
function validator(value, fnc, err) {
  return strategies[fnc](value, err)
}
export default validator
```

```
// index.vue
import validator from './validator'
methods:{
     onSimpleValidate() {
       let errorMsg = validator(this.name, 'isNotEmpty', '用户名不能为空!')
      if (errorMsg) {
        this.$vux.toast.show({
          type: 'warn',
          text: errorMsg
        })
      }
    },
}
```

![](https://user-gold-cdn.xitu.io/2018/12/31/168035102aa74818?w=448&h=390&f=gif&s=20264)
实现了 name 为空的校验,在这个过程中 validator 函数负责接收配置参数,并且分配给`策略对象strategies`下具体的 isNotEmpty 方法去执行校验。  
现在复杂的提高,既要校验是否为空并且长度不能小于传入的长度。

### 分析

1.  首先条件增加一个,考虑传入数组来实现多条件
2.  minLength 工具需要多一个长度的参数,入参数过多采用结构赋值的方法，不用考虑传入参数的顺序。

```
// validator.js
const strategies = {
  // 通过结构赋值的方式不用考虑传参的顺序
  isNotEmpty(value, { errorMsg }) {
    if (!value) {
      return errorMsg
    }
  },
  minLength(value, { errorMsg, param }) {
    if (value.length < param) {
      return errorMsg
    }
  }
}
function validator(value, ruleList) {
 // 使用for... of可以中断,因为如果使用toast方式提醒用户优先展示前面的错误,只要前面出现错误后面的错误可以不用判断
  for (let rule of ruleList) {
    // 取出要执行的方法名
    const { strategy } = rule
    const message = strategies[strategy](value, rule)
    if (message) {
      return message
    }
  }
}
export default validator
```

```
// index.vue
onSimpleValidate() {
      let errorMsg = validator(this.name, [
        { strategy: 'isNotEmpty', errorMsg: '用户名不能为空!', param: '入参' },
        {
          strategy: 'minLength',
          errorMsg: '用户名长度不能小于6位!',
          param: 6
        }
      ])
      if (errorMsg) {
        this.$vux.toast.show({
          type: 'warn',
          text: errorMsg
        })
      }
    },
```
