<template>
  <div>
    <input type="text"
      v-model="number">
    <div class="button"
      @click="onMultiplyClick">阶层结果零的个数</div>
  </div>
</template>

<script>
import { numberClass } from '../../../../../utils/Number'
export default {
  name: '',

  data() {
    return {
      number: 1
    }
  },

  methods: {
    onMultiplyClick() {
      const count = this.onZeroClick(this.number)
      console.log(numberClass(this.number))
      console.log(count)
    },
    onOtherMethodClick(number) {
      if (isNaN(Number(number))) {
        return -1
      }
      if (number <= 1) {
        return 1
      } else {
        while (number > 1) {
          number--
          return number * (number - 1)
        }
      }
    },
    // 计算零的个数方式1
    onZeroCountClick(n) {
      let number25 = 25
      let count = 0
      for (let i = 5; i <= n; i += 5) {
        count++
        while (n % number25 === 0) {
          count++
          number25 *= 5
        }
      }
      return count
    },
    // 计算零的个数方式2
    onZeroClick(n) {
      let count = 0
      let account = parseInt(n / 5)
      // 一直将能拆分成5的数拆分，一个5代表一个0
      while (account !== 0) {
        count += account
        account = parseInt(account / 5)
      }
      return count
    }
  }
}
</script>

<style lang='scss' scoped>
.button {
  cursor: pointer;
}
</style>
