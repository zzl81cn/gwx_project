<template>
  <div>
    <div class="button"
      @click="onFindIndexClick">index</div>
  </div>
</template>

<script>
import { numberClass } from '../../../../../utils/Number'
export default {
  name: '',

  data() {
    return {
      numberList: [1, 4, 5, 6],
      index: 0
    }
  },

  methods: {
    onFindIndexClick() {
      this.index = numberClass(this.numberList, 4, 0, this.numberList.length)
      console.log(this.index)
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
