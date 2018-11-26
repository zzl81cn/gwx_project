<template>
  <div>
    <div>axios</div>
  </div>
</template>

<script>
export default {
  name: 'axios',

  data() {
    return {}
  },

  methods: {
    reFindFirst() {
      this.$callApi({
        api: 'get_first_data',
        param: {
          campusid: 100,
          gradeCode: 1152
        }
        // mock: true
      })
    },
    reFindCount() {
      this.$callApi({
        api: 'message_notice_findUnReadCount',
        param: {
          campusid: 1615,
          userid: 3462
        }
      })
    }
  },
  created() {
    this.reFindCount()
  }
}
</script>

<style lang='scss' scoped>
</style>
