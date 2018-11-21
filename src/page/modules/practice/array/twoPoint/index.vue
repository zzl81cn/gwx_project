<template>
  <div>
    <div class="button"
      @click="onFindIndexClick">找出目标值最小序号</div>
    <div @click="onExpandArrayClick">展开数组</div>
  </div>
</template>

<script>
import { twoPoint, expandArray } from '../../../../../utils/Array.js'
export default {
  name: '',

  data() {
    return {
      numberList: [1, 1, 2, 2, 4, 4, 4, 6, 6],
      index: 0,
      expandList: [[112, [1544, [1]]], 1]
    }
  },

  methods: {
    onFindIndexClick() {
      this.index = twoPoint(this.numberList, 2, 0, this.numberList.length - 1)
      console.log(this.index)
    },
    onExpandArrayClick() {
      const list = expandArray(this.expandList)
      console.log(list)
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
