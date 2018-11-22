<template>
  <div>
    <div class="button"
      @click="onFindIndexClick">找出目标值最小序号</div>
    <div @click="onExpandArrayClick">展开数组</div>
    <div @click="onMinClick">最小两个数</div>
    <div @click="onAllInStringClick">判断字符串是否包含(全大写)</div>
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
      expandList: [[112, [1544, [1]]], 1],
      minList: [3, 1, 5, 1, 7, 2]
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
    },
    onFindMinClick(arr) {
      const length = arr.length
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < length - 1; j++) {
          if (arr[j] > arr[j + 1]) {
            ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
          }
        }
      }
      // console.log(arr)
      return arr[0] + arr[1]
    },
    onMinClick() {
      this.onFindMinClick(this.minList)
      console.log(this.onFindMinClick(this.minList))
    },
    onAllInStringClick() {
      const str1 = 'ADF'
      const str2 = 'DF'
      const length = str2.length
      const statusList = []
      for (let i = 0; i < length; i++) {
        statusList.push(new RegExp(str2.charAt(i)).test(str1))
      }

      return statusList.every(item => item && /[A-Z]/.test(str1 + str2))
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
