<template>
  <div>
    <div>暂停</div>
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
export default {
  name: '',
  components: {
    count
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
