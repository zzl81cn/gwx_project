## 概述

1.  x-input 属性，事件，插槽和使用场景
2.  实例代码分析
3.  源码分析
4.  github 项目地址

## 详解

1.  列举[官方文档](https://doc.vux.li/zh-CN/components/icon.html)中常用的几个属性的使用方法，稍后分析其实现原理，贴出代码如下

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
      <x-input v-model="like"
        class="vux-input__like"
        title="喜欢"
        placeholder="tell me your like"
        required
        :is-type="checkLikeValid"
        @on-change="onValueChange">
        <div slot="label"
          class="like__icon">
          <icon type="waiting"></icon>
        </div>
      </x-input>
    </group>
```

官方文档有详细的解释，在此可以简单的说明下，`required`属性表示此选项为必填，`is-type`可以绑定一个函数，作为校验，这个函数得返回一个对象。格式如下

```
 checkValid(name) {
      return {
        valid: name === '三只萌新',
        msg: '你不是萌新'
      }
    }
```

valid 可以设置为你的校验规则，需要返回一个布尔值，msg 是错误的提示信息。  
不过 vux 本身写好几种校验方式，如果使用*email,china-name,china-mobile*这几种方式直接绑定字符串即可。  
还有 solt 插槽，支持对 title 使用，注意的是`slot="label"`而不是 slot="title"

2.  使用场景假设在一个提交页面，需要我们填写完数据后显示成功后还是停留在本页面。我们需要初始化值，但是会发现如果我们设置了 required 后校验还是会触发。  
    如何让数据清空并且让校验也清空。需要使用到 reset 方法。
    在触发 reset 时候又触发了 getError 错误
