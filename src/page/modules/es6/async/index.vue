<template>
  <div class="async">
    <div @click="onCreateAsyncClick">create generator</div>
    <div>execute</div>
    <input ref=“input”
      type="text"
      :value="value"
      @click="onTagClick($event.target)">
    <upload></upload>
  </div>
</template>

<script>
import upload from '@/components/upload/button'
export default {
  name: 'async',
  components: {
    upload
  },
  data() {
    return {
      asyncFn: () => {},
      studentList: [],
      value: 12
    }
  },
  mounted() {},
  methods: {
    onTagClick(target) {
      console.log(target)
      target.value = 9999
      target.focus()
      target.select()
      document.execCommand('copy')
    },
    reFindStudent() {
      return this.$callApi({
        api: 'user_user_listIdentity',
        params: {
          campusid: 1615,
          openid: 'oD7tauP-p8_u-FgpipjwleMBorKA',
          userid: '1047184'
        }
      })
    },
    step2() {
      console.log('开始执行step2')
      this.reFindStudent().then(() => {
        console.log('step2执行结束')
      })
    },
    onCreateAsyncClick() {
      async function createAsync() {
        await this.reFindStudent().then(data => {
          this.studentList = data
          console.log('step1执行结束')
        })
        await this.step2()
        return this.studentList
      }
      this.asyncFn = createAsync
    },
    onExecuteClick() {
      this.asyncFn().then(data => {
        console.log('最终结果 : ' + JSON.stringify(data))
      })
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
