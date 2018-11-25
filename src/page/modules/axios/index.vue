<template>
  <div>
    <div>axios</div>
  </div>
</template>

<script>
export default {
  name: '',

  data() {
    return {}
  },

  methods: {
    reFindFirst() {
      const type = this.$callApi({
        api: 'get_first_data',
        param: {},
        mock: true
      })
      console.log(type)
    }
  },
  created() {
    this.reFindFirst()
  }
}
</script>

<style lang='scss' scoped>
</style>
