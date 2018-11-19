<template>
  <div>
    <div @click="onArrayReverseClick(120)">按钮</div>
  </div>
</template>

<script>
export default {
  name: '',

  data() {
    return {}
  },

  methods: {
    onReverseClick(number) {
      const numberList = []
      const str = String(number)
      for (let i = 0; i < str.length; i++) {
        console.log(str[i])
        if (str.charAt(i) > 0) {
          numberList.unshift(str.charAt(i))
        }
      }
      console.log(numberList.join(''))
      return Number(numberList.join(''))
    },
    onArrayReverseClick(number) {
      const strList = String(number).split('')
      strList.forEach((item, index, arr) => {
        if (item === '0') {
          arr.splice(index, 1)
        }
      })
      console.log(Number(strList.reverse().join('')))
      return Number(strList.reverse().join(''))
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
