<template>
  <div id="app">
    <!-- <router-view/> -->
    <upload :isImage="true"
      :isShowPesent="true"></upload>
  </div>
</template>

<script>
import moment from 'moment'
import { set } from './utils/cookie.js'
import upload from './components/upload'
export default {
  components: {
    upload
  },
  methods: {
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
      })
    }
  },
  created() {
    this.login()
  }
}
</script>

<style>
</style>
