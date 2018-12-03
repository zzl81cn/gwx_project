<template>
  <div>
    <hello>
      <template slot-scope="{todo}">
        <span v-if="todo&&todo===15">
          十五
        </span>
        <span v-else>{{todo}}</span>
      </template>
    </hello>
  </div>
</template>

<script>
import hello from '../../components/HelloWorld'
export default {
  name: 'login',
  components: {
    hello
  },
  data() {
    return {
      textList: [
        {
          name: 1
        },
        {
          name: 2
        },
        {
          name: 3
        }
      ]
    }
  },

  methods: {
    onInputFocus(value) {
      console.log(value)
    }
  }
}
</script>

<style lang='scss' scoped>
.date-picker-theme-dark {
  border: 5px solid red;
}
</style>
