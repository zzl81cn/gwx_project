<template>
  <div class="vux-input">
    <group ref="group">
      <x-input v-model="name"
        class="vux-input__name"
        title="名字"
        placeholder="tell me your name"
        required
        :is-type="checkNameValid"
        @on-change="onValueChange"></x-input>
      <x-input v-model="like"
        class="vux-input__like"
        title="喜欢"
        placeholder="tell me your like"
        required
        :is-type="checkLikeValid"
        @on-change="onValueChange"></x-input>
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
import { XInput, XButton, Group, Toast } from 'vux'
export default {
  name: '',
  components: { XInput, XButton, Group, Toast },
  data() {
    return {
      name: '',
      like: '',
      message: '还未填写信息',
      isInvalid: true,
      isShowToast: false
    }
  },
  methods: {
    onSubmitClick() {
      if (!this.isInvalid) {
        // 执行异步操作
        console.log('执行异步操作')
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
      // 当未填写内容时显示对应信息 并且后面代码不在执行
      if (statusList.length < 1) {
        this.message = '还未填写信息'
        return
      }
      // 当有值时判断是否有一项未填，如果有未填的停止执行并且显示对应的错误提示
      for (const child of children) {
        const invalid = child.invalid
        this.isInvalid = invalid
        this.message = invalid && `请填写正确的${child.title}`
        // 如果无效则停止执行
        if (invalid) {
          return
        }
      }
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
}
</style>
