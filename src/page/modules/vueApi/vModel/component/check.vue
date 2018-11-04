<template>
  <div>
    <input type="checkbox"
      :checked="value">
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    value: {
      type: Boolean,
      default: false
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
