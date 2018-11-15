<template>
  <div class="hello">
    <h1 @click="onClick('900045')"> dianjji</h1>
    <h2>Essential Links</h2>
    <ul>
      <li>
        <a href="https://vuejs.org"
          target="_blank">
          Core Docs
        </a>
      </li>
      <li>
        <a href="https://forum.vuejs.org"
          target="_blank">
          Forum
        </a>
      </li>
      <li>
        <a href="https://chat.vuejs.org"
          target="_blank">
          Community Chat
        </a>
      </li>
      <li>
        <a href="https://twitter.com/vuejs"
          target="_blank">
          Twitter
        </a>
      </li>
      <br>
      <li>
        <a href="http://vuejs-templates.github.io/webpack/"
          target="_blank">
          Docs for This Template
        </a>
      </li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li>
        <a href="http://router.vuejs.org/"
          target="_blank">
          vue-router
        </a>
      </li>
      <li>
        <a href="http://vuex.vuejs.org/"
          target="_blank">
          vuex
        </a>
      </li>
      <li>
        <a href="http://vue-loader.vuejs.org/"
          target="_blank">
          vue-loader
        </a>
      </li>
      <li>
        <a href="https://github.com/vuejs/awesome-vue"
          target="_blank">
          awesome-vue
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    onClick(str) {
      let cnChar = '零壹贰叁肆伍陆柒捌玖'
      const partInt = '元拾佰仟万拾佰仟亿拾佰仟'
      const len = str.length - 1
      const arr = new Array(len + 1)
      let i = 0
      console.log(str, arr)

      str.replace(/\d/g, n => {
        let b = partInt.charAt(len - i)
        arr[i] =
          cnChar.charAt(n) + (n === '0' && '元万亿'.indexOf(b) < 0 ? '' : b)
        i++
      })
      console.log(arr)

      return arr
        .join('')
        .replace(/(零)\1+/g, '零')
        .replace(/零(十|百|千|万|亿|元)/g, value => value.replace(/零/, ''))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
