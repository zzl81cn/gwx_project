<template>
  <div>
    {{name}}
    <hello>
      <template slot-scope="{todo}">
        <span v-if="todo&&todo===15">
          十五
        </span>
        <span v-else>{{todo}}</span>
      </template>
    </hello>
    {{number}}
  </div>
</template>

<script>
import hello from '../../components/HelloWorld'
import { mapState } from 'vuex'
// 原始方法
import store from '../../store'
export default {
  name: 'login',
  components: {
    hello
  },
  computed: {
    count() {
      return store.state.number
    },
    ...mapState({
      number: state => {
        return state.number
      },
      name: ({ axiosModule }) => {
        return axiosModule.name
      }
    })
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
  },
  created() {
    console.log(store)
  }
}
</script>

<style lang='scss' scoped>
.date-picker-theme-dark {
  border: 5px solid red;
}
</style>
