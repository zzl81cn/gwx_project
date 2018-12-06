<template>
  <div class="hoc">
    <packer :test="15">
      插入信息
      <p slot="test">1516545</p>
    </packer>
  </div>
</template>

<script>
import baseComp from './components/baseComp'
import pack from './components/pack.js'
export default {
  name: 'hoc',
  components: {
    packer: pack(baseComp)
  },
  data() {
    return {}
  },
  methods: {
    handleCustClick() {
      console.log('点击了')
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
