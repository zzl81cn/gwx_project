## 前言

1.  近期项目中使用的 vux 中的 input，以及使用自定义校验规则和动态匹配错误提示，有时间记录下自己的使用经历和源码分析。希望大家多多指正，留言区发表自己宝贵的建议。

## 详解

1.  列举[官方文档](https://doc.vux.li/zh-CN/components/icon.html)中常用的几个属性的使用方法，代码如下

```
 <group ref="group">
      <x-input v-model="name"
        class="vux-input__name"
        title="名字"
        placeholder="tell me your name"
        required
        :is-type="checkNameValid"
        @on-change="onValueChange">
        <div slot="label"
          class="name__icon">
          <icon type="success"></icon>
        </div>
      </x-input>
    </group>


```

官方文档有详细的解释，`required`属性表示此选项为必填，`is-type`可以绑定一个函数，作为校验，这个函数得返回一个对象。格式如下

```
 checkValid(name) {
      return {
        valid: name === '三只萌新',
        msg: '你不是萌新'
      }
    }
```

valid 可以设置为你的校验规则，需要返回一个布尔值，msg 是错误的提示信息。  
vux 本身写好几种校验方式，如果使用*email,china-name,china-mobile*这几种方式直接绑定字符串即可。  
solt 插槽如 slot="label"用于自定义 title,源码如下

```
 <slot name="label">
    <label class="weui-label"
      :class="labelClass"
      :style="{width: labelWidth || $parent.labelWidth || labelWidthComputed, textAlign: $parent.labelAlign, marginRight: $parent.labelMarginRight}"
      v-if="title"
      v-html="title"
      :for="`vux-x-input-${uuid}`"></label>
    <inline-desc v-if="inlineDesc">{{ inlineDesc }}</inline-desc>
 </slot>
```

分析:class="labelClass"动态绑定样式以对象的形式返回一个{[className]:Boolean}的格式的对象

```
 labelClass() {
      return {
        'vux-cell-justify':
          this.$parent.labelAlign === 'justify' ||
          this.$parent.$parent.labelAlign === 'justify'
      }
    }
```

![label-align](https://user-gold-cdn.xitu.io/2018/11/3/166d731af4378b06?w=697&h=473&f=png&s=30963)
同样的方式查看他父级是否有 labelAlign 属性，vux-cell-justify 类名对应的样式没有应用。

## 使用场景

### 场景 1

假设在一个提交页面，当我们提交时判断输入框中的值是否是符合我们的要求，如果不符合，给出错误提示，如果符合提交后将输入框中的数据清空。

需求:

- 如果还有停留在本页面我们需要将上一次的数据全部清空

问题:

- 我们需要初始化值，但是会发现如果我们设置了 required 后校验还是会触发。如何让数据清空并且让校验也清空。

解决方法:

- 文档中写了 reset 可以重置输入框值，清除错误信息
  使用方式：
- 在 x-input 外层的 group 标签上绑定 ref 来访问子组件。因此我们可以通过 this.\$refs.group.$children 获取到 input 组件集合并且可以使用组件中定义的 reset 方法
  查看源码
- 如果你的项目中已经安装了 vux 可以通过安装[Search node_modules](https://marketplace.visualstudio.com/items?itemName=jasonnutter.search-node-modules)查找 node_modules 文件夹中 vux 安装包路径为`vux/src/components/x-input/index.vue`文件 reset 方法源码如下:

```
reset(value = '') {
      this.dirty = false
      this.currentValue = value
      this.firstError = ''
      this.valid = true
    }
```

回到我们的业务逻辑中当我们点击提交按钮时代码如下

```
 onSubmitClick() {
      if (!this.isInvalid) {
        this.$refs.group.$children.forEach(child => {
          child.reset()
        })
      } else {
      // 展示提示信息
        this.isShowToast = true
      }
```

本以为这样就可以清空数据了，没想到点击按钮时数据是清空了，但是还是有报错图标显示。
![提交后的截图](https://user-gold-cdn.xitu.io/2018/11/2/166d3146014829de?w=339&h=207&f=png&s=4843)
通过[vue-devtools](https://github.com/vuejs/vue-devtools)可以看到
![调试结果](https://user-gold-cdn.xitu.io/2018/11/2/166d3786181aa582?w=1201&h=525&f=png&s=53558)  
valid 的值为 false 查看 vux 源码查看涉及到 valid 代码如下

```
validate() {
 // ...省略与本次无关的校验方法
if (!this.currentValue && this.required) {
        this.valid = false
        this.errors.required = '必填哦'
        this.getError()
        return
        if (typeof this.isType === 'function') {
        /*
          取出自定义函数中的校验结果 是一个Boolean
          checkNameValid(name) {
            return {
              valid: name === '三只萌新',
              msg: '你不是萌新'
            }
          }
        */
        const validStatus = this.isType(this.currentValue)
        this.valid = validStatus.valid
        if (!this.valid) {
        // 如果校验值无效将自定义校验的msg赋值给errors对象下的format
          this.errors.format = validStatus.msg
          this.forceShowError = true
          this.getError()
          return
        } else {
        // 如果校验值有效则将error对象下的format删除
          delete this.errors.format
        }
        // 如果都符合将valid赋值为有效
      this.valid = true
    }
}
```

validate 函数校验当前是否有值，是否为必填，`如果当前值的校验方式是函数，将校验结果赋值给valid`。如果 valid 是 false 则将自定义的 msg 统一存储在 errors 对象下，`errors是用来存储不同类型的错误信息`。 然后执行 getError 函数

```
  getError() {
      let key = Object.keys(this.errors)[0]
      this.firstError = this.errors[key]
      console.log('firstError' + this.firstError)
    }
```

Object.keys(this.errors)返回 errors 对象下的所有可枚举属性，并且取第一个作为键名，取出对于的值赋值给 firstError ,firstError 是提示框文字

```
  <toast v-model="showErrorToast"
      type="text"
      width="auto"
      :time="600">{{ firstError }}</toast>
```

当点击错误图标判断是否有 firstError，shouldToastError 未传入值默认为 true，点击时如果 valide 校验为错误时会触发 getError 函数将错误提示赋值给 firstError，所以会将 fistError 对应的提示信息显示出来。而图标的显示与否与 valid 有关,其中一个条件是 valid 为 false 时才会显示。

```
 <icon @click.native="onClickErrorIcon"
        class="vux-input-icon"
        type="warn"
        :title="!valid ? firstError : ''"
        v-show="showWarn"></icon>

 shouldToastError: {
      type: Boolean,
      default: true
    }
  showWarn() {
      return (
        !this.novalidate &&
        !this.equalWith &&
        !this.valid &&
        this.firstError &&
        (this.touched || this.forceShowError)
      )
    }
  onClickErrorIcon() {
      if (this.shouldToastError && this.firstError) {
        this.showErrorToast = true
      }
      this.$emit('on-click-error-icon', this.firstError)
    }
```

分析了上面的代码，为什么执行了 reset 方法后，校验报错还是在，原因是 valid 依然还是 false，导致 showWarn 返回值是 ture，而 reset 中方法中明明将 valid 设置为 true 了，为什么最后结果为 false。

```
watch:{
      currentValue(newVal, oldVal) {
           if (newVal && this.equalWith) {
            if (newVal.length === this.equalWith.length) {
              this.hasLengthEqual = true
            }
            this.validateEqual()
          } else {
            this.validate()
          }
      }
}
```

因为监听了 input 绑定 currentValue 的值，当 reset 方法执行的时候 this.currentValue = ' ' 触发了变动执行 validate 方法，导致再次给 this.valid 赋值 false。  
该如何解决这个问题，问题发生的原因是 currentValue 发生变化导致触发 validate 方法校验，所以我们只要当执行 reset 方法后不触发 currentValue 改变就可以不触发 validate 方法校验  
方法一:

```
onSubmitClick() {
    this.$refs.group.$children.forEach(child => {
     // 这次reset是将currentValue全部置为""
      child.reset()
    })
    this.$nextTick(() => {
    // 当所以input的值都置为空后在此执行reset方法，这次前后currentValue没有发生变化不会触发validate校验所以valide为true不会导致图标出现
      this.$refs.group.$children.forEach(child => {
        child.reset()
      })
    })
}
```

方法二: 其实想做的就是在 reset 方法执行之前将 currentValue 置为空

```
created(){
    this.currentValue =
      this.value === undefined || this.value === null
        ? ''
        : this.mask ? this.maskValue(this.value) : this.value
},
props:{
    value: [String, Number]
},
watch:{
    value(val) {
      this.currentValue = val
    }
}
```

可以通过传入 value 来改变 currentValue 的值，将 v-model="name"绑定值的方式改为:value="name"

```
onSubmitClick() {
    this.name = ''
    this.$nextTick(() => {
      this.$refs.group.$children.forEach(child => {
        child.reset()
      })
    })
}
```

### 场景 2

当我们点击提交时,如果有校验选项不符合规则能提示相匹配的警告

```
data(){
    return {
        message: '还未填写信息'
    }
}
```

将 message 提示信息初始值设置为还未填写信息，当我们未进行填写信息的时候点击提交显示。然后使用 on-change 函数绑定校验规则，实时更新 message 对应的提示语，业务逻辑如下：

```
     onValueChange() {
      // 多次使用赋值给变量
      const children = this.$refs.group.$children
      let statusList = []
      // 筛选出有值的，作为是否全部未填的判断依据 如果length小于1则还没填写任何内容
      statusList = children.filter(item => {
        return item.currentValue
      })
      if (statusList.length < 1) {
        this.message = '还未填写信息'
        return
      }
      // 找到第一个没有值的那一项，如果都有则返回undefined
      const firstInvalid = children.find(item => {
        return !item.valid
      })
      if (firstInvalid !== undefined) {
        this.message = `请填写正确的${firstInvalid.title}`
      }
      // 显示的将是否有效赋值给valid增加代码可读性
      this.valid = Boolean(firstInvalid)
    }
```

### github

[代码地址](https://github.com/guanwanxiao/gwx_project)
