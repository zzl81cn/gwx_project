<template>
  <div>
    <div>标题</div>
    <child :name="name"></child>
  </div>
</template>

<script>
import child from './child'
export default {
  name: 'baseC',
  components: {
    child
  },
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },

  methods: {}
}
</script>

<style lang='scss' scoped>
</style>
