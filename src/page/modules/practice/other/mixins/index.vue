<template>
  <div class="mixins">
    <div class="mixins__head">
      <!-- 欢迎{{name}} -->
    </div>
    <div class="mixins__body">
      <hoc value="传入值"
        @testClick="onTestClick">
        4654
        <p slot="test">15515</p>
      </hoc>
    </div>
  </div>
</template>

<script>
import buttonMixins from '../../../../../components/mixins'
import child from '../../../../../components/HelloWorld'
import { mapState } from 'vuex'
// import store from '../../../../../store'
import hoc from '@/components/hoc'
export default {
  name: 'buttonMixins',
  components: {
    hoc: hoc(child)
  },
  mixins: [buttonMixins],
  computed: {
    ...mapState({
      number: state => {
        return state.number
      },
      name: ({ axiosModule }) => {
        return axiosModule.name
      },
      month: ({ axiosModule }) => {
        return axiosModule.month
      }
    })
  },
  data() {
    return {
      message: '15'
    }
  },

  methods: {
    onTestClick() {
      console.log('slot')
    }
  },
  created() {}
}
</script>

<style lang='scss' scoped>
</style>
