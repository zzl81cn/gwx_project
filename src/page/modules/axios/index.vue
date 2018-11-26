<template>
  <div>
    <div>axios</div>
  </div>
</template>

<script>
import moment from 'moment'
import { set } from '../../../utils/cookie.js'
export default {
  name: '',

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
    },
    login() {
      this.$callApi({
        api: 'user_user_login',
        param: {
          loginName: 'dddddddd',
          password: 'zaq1234'
        }
      }).then(data => {
        set({
          key: 'JSSSID_COOKIE',
          value: data.token,
          domain: document.location.hostname,
          expires: moment()
            .add(2, 'hours')
            .toDate()
            .toUTCString()
        })
        this.reFindCount()
      })
    }
  },
  created() {
    this.login()
  }
}
</script>

<style lang='scss' scoped>
</style>
