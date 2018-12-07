<template>
  <div class="hoc">
    <jsx-tep>
      <p slot="test">44455</p>
    </jsx-tep>
    <packer :test="15">
      插入信息
      <p slot="test">1516545</p>
      <jsx>

      </jsx>
    </packer>
  </div>
</template>

<script>
import baseComp from './components/baseComp'
import pack from './components/pack.js'
import jsx from './components/jsx.js'
import jsxTep from './components/jsxTep.vue'

export default {
  name: 'hoc',
  components: {
    packer: pack(baseComp),
    jsx,
    jsxTep
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
