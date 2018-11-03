<template>
  <div class="vux-input">
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
          名字
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
          喜欢
        </div>
      </x-input>
    </group>
    <x-button style=" width: 200px;
    height: 60px;
    color:#fff;
    background: #f66;"
      @click.native="onSubmitClick">
      提 交
    </x-button>
    <toast v-model="isShowToast"
      type="warn">{{message}}</toast>
  </div>

</template>

<script>
import { XInput, XButton, Group, Toast, Icon } from 'vux'
export default {
  name: '',
  components: { XInput, XButton, Group, Toast, Icon },
  data() {
    return {
      name: '三只萌新',
      like: '',
      message: '还未填写信息',
      isInvalid: true,
      isShowToast: false
    }
  },
  methods: {
    onSubmitClick() {
      if (!this.isInvalid) {
        // 执行操作
        console.log(this.$refs.group, '点击提交开始触发reset函数')
        this.$refs.group.$children.forEach(child => {
          child.reset()
        })
        // this.name = ''
        this.$nextTick(() => {
          this.$refs.group.$children.forEach(child => {
            child.reset()
          })
        })
      } else {
        this.isShowToast = true
      }
    },
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
    },
    checkNameValid(name) {
      return {
        valid: name === '三只萌新',
        msg: '你不是萌新'
      }
    },
    checkLikeValid(like) {
      return {
        valid: like === 'better',
        msg: '你可以变的更好'
      }
    }
  }
}
</script>

<style lang="scss" scope>
.vux-input {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  &__name,
  &__like {
    width: 200px;
    height: 30px;
    border: 3px outset #999;
  }
  .name__icon,
  .like__icon {
    width: 93px;
  }
}
</style>
