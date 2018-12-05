<template>
  <div class="hello">
    <h1 @click="onRegClick('111010')"> 正则</h1>
    <h2>四位匹配</h2>
  </div>
</template>

<script>
export default {
  name: 'replace',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    onRegClick(str) {
      console.log(str)

      let cnChar = '零壹贰叁肆伍陆柒捌玖'
      const partInt = '元拾佰仟万拾佰仟亿拾佰仟'
      // 取字符串长度
      const len = str.length - 1
      // 设置length长度个数组子项
      const arr = new Array(len + 1)
      // 从第一位开始匹配
      let i = 0

      str.replace(/\d/g, n => {
        // 取单位
        let b = partInt.charAt(len - i)
        // 取数字对应的中文字, 并且取的数字为零的时候 取到的单位是否为元万亿中的一个，如果是则拼接空，如果不是在拼接对应的单位 (也就是在个位,万位,亿位上的零保留,否则其他零位不加单位)
        arr[i] =
          cnChar.charAt(n) + (n === '0' && '元万亿'.indexOf(b) < 0 ? '' : b)
        i++
      })
      console.log(
        arr
          .join('')
          .replace(/(零)\1+/g, '零')
          .replace(/零(十|百|千|万|亿|元)/g, value => value.replace(/零/, ''))
      )
      this.onClick('111010')
      return arr
        .join('')
        .replace(/(零)\1+/g, '零')
        .replace(/零(十|百|千|万|亿|元)/g, value => value.replace(/零/, ''))
    },
    onClick(number) {
      number = String(parseInt(number))
      const ChineseText = '零一二三四五六七八九'
      const unit = '十百千万十百千亿十百千'
      const length = number.length
      let n = length - 2
      let string = ''
      for (var i = 0; i < length; i++) {
        let num = number.charAt(i)
        let currentUnit = unit.charAt(n)
        string += ChineseText.charAt(num)
        string +=
          num === '0' && '万亿'.indexOf(currentUnit) < 0 ? '' : currentUnit
        n--
      }
      console.log(this.clearZero(string))

      return this.clearZero(string)
    },
    clearZero(str) {
      const regMiddle = /零{2}/g
      const regEnd = /零?零$/
      const regTen = /一十/g
      str = str.replace(regMiddle, '零')
      str = str.replace(regTen, '十')
      return str.replace(regEnd, '')
    }
  }
}
</script>
