<template>
  <div>
    <x-button type="primary"
      @click.native="reSave">保存</x-button>
    <input v-model="endVal"
      type="text">
    <div class="example">
      <count tag="p"
        :isRestart="true"
        :endVal="endVal"
        :duration="2"
        :decimals="2"></count>
    </div>
  </div>
</template>

<script>
import count from '@/components/countup'
import { XButton } from 'vux'
export default {
  name: '',
  components: {
    count,
    XButton
  },
  data() {
    return {
      endVal: 500
    }
  },

  methods: {}
}
</script>

<style lang='scss' scoped>
.example {
  color: red;
  font-size: 28px;
}
</style>
