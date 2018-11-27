<template>
  <div>
    <div>axios</div>
    <input type="file"
      @change="onFileChange"> {{showpesent}}
    <img v-if="filePath"
      :src="filePath">
  </div>
</template>

<script>
import { callUploadApi } from '../../../resource/uploadOSSApi.js'
export default {
  name: 'axios',

  data() {
    return {
      isShowPesent: false,
      showpesent: '',
      filePath: ''
    }
  },

  methods: {
    progress(percent) {
      this.showpesent = percent
      this.isShowPesent = true
    },
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
    onFileChange(e) {
      const file = e.target.files[0]
      callUploadApi(
        file,
        data => {
          this.filePath = data
        },
        this.progress
      )
    }
  },
  created() {
    this.reFindCount()
  }
}
</script>

<style lang='scss' scoped>
</style>
