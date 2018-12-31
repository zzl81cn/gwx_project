<template>
  <div>
    <input v-model="str"
      type="text"> {{guan}}
  </div>
</template>

<script>
export default {
  name: '',
  props: {
    guan: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      str: ''
    }
  },

  methods: {},
  watch: {
    str() {
      this.$emit('update:guan', this.str)
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
