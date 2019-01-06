<template>
  <div>
    123
    <!-- <group>
      <x-input v-model="name"
        title="姓名"
        @on-blur="onSimpleValidate"></x-input>
    </group> -->
  </div>
</template>

<script>
import { XInput, Group } from 'vux'
import Validator from './utils.js'
import validator from './simple'
const name = 'guan'
console.log(name)
export default {
  name: 'strategy',
  components: {
    XInput,
    Group
  },
  data() {
    return {
      name: ''
    }
  },

  methods: {
    onSimpleValidate() {
      // const simple = new Simple()
      let errorMsg = validator(this.name, [
        { strategy: 'isNotEmpty', errorMsg: '用户名不能为空!', param: '入参' },
        {
          strategy: 'minLength',
          errorMsg: '用户名长度不能小于6位!',
          param: 6
        }
      ])
      // errorMsg = validator(this.name, 'minLength', '用户名长度不能小于6位!', 6)
      // console.log(errorMsg)
      if (errorMsg) {
        this.$vux.toast.show({
          type: 'warn',
          text: errorMsg
        })
      }
    },
    onInputValidate() {
      const validator = new Validator()
      validator.add(this.name, [
        { strategy: 'isNotEmpty', errorMsg: '用户名不能为空!', param: '入参' },
        {
          strategy: 'minLength',
          errorMsg: '用户名长度不能小于6位!',
          param: 6
        }
      ])
      let errorMsg = validator.start()
      if (errorMsg) {
        this.$vux.toast.show({
          type: 'warn',
          text: errorMsg
        })
      }
    }
  },
  mounted() {
    const name = 'guan'
    console.log(name)
  }
}
// # sourceURL=settings.vue
</script>

<style lang='scss' scoped>
</style>
