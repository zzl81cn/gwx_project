<template>
  <div class="upload">
    <div class="upload__button">
      <div class="button__wrap">{{text}}</div>
      <input class="button__input"
        type="file"
        @change="onFileChange">
    </div>
    <img v-if="isImage"
      :src="filePath">
    <div v-if="isShowPesent">{{percent}}</div>
  </div>
</template>

<script>
import { callUploadApi } from '../../resource/uploadOSSApi'
export default {
  name: 'upload',
  props: {
    isImage: {
      type: Boolean,
      default: false
    },
    isShowPesent: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: '上传'
    }
  },
  data() {
    return {
      percent: '0%',
      filePath: ''
    }
  },

  methods: {
    progress(percent) {
      this.percent = percent
    },
    onFileChange(event) {
      const file = event.target.files[0]
      if (file === undefined) {
        return
      }
      this.fileName = file.name
      callUploadApi(
        file,
        data => {
          this.filePath = data
        },
        this.progress
      )
    }
  }
}
</script>

<style lang='scss' scoped>
.upload {
  &__button {
    .button {
      &__wrap {
      }
    }
  }
}
</style>
