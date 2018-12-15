<template>
  <div class="hoc">
    <sync></sync>
    <!-- <spread></spread> -->
    <!-- <vfor></vfor> -->
    <!-- <vmodel></vmodel> -->
    <!-- <input type="text"
      v-model="number">
    <judge :type="number">
      <span class="render__incoming"> 外来者</span>

      <p class="render__incoming-p"
        slot="tag">我是p标签</p>
    </judge> -->
    <!-- <jsx-tep>
      <p>默认值</p>
      <p slot="test">插槽值</p>
    </jsx-tep> -->
    <!-- <packer :test="15"
      v-on:customize-click="onCuClick">
      插入信息
      <p slot="test">1516545</p>
    </packer>
    <jsx>
    </jsx> -->
  </div>
</template>

<script>
import baseComp from './components/baseComp'
import pack from './components/pack.js'
import jsx from './components/jsx.js'
import jsxTep from './components/jsxTep.js'
import judge from './components/judge.vue'

import vmodel from './jsx/vmodel.vue'
import vfor from './jsx/vfor.vue'
import sync from './jsx/sync.vue'
import spread from './jsx/spread.vue'
export default {
  name: 'hoc',
  components: {
    packer: pack(baseComp),
    jsx,
    jsxTep,
    judge,
    vmodel,
    vfor,
    sync,
    spread
  },
  data() {
    return {
      number: 0,
      list: ['yi', 'sec']
    }
  },
  methods: {
    handleCustClick() {
      console.log('点击了')
    },
    onCuClick(value) {
      console.log(`customize-click事件触发了 ：${value}`)
    }
  }
}
</script>

<style lang='scss' scoped>
.render__incoming {
  color: #333;
  &-p {
    color: #80ade4;
  }
}
.box {
  background-color: #f00;
}
</style>
