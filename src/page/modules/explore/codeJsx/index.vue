<template>
  <div>
    <child :guan.sync="value"></child>
    <jsx type="admin"
      :guan.sync="name"></jsx>{{name}}
  </div>
</template>

<script>
import jsx from './component'
import test from '../../practice/other/hoc/jsx/vfor'
import child from './component/child'
export default {
  components: {
    jsx,
    test,
    child
  },
  data() {
    return {
      value: 'y',
      name: '官'
    }
  },
  methods: {
    onInputChange(val) {
      this.value = val
    },
    // onInputChange(val) {
    //   console.log(val)
    // },
    onJsxClick(val) {
      console.log(val)
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
