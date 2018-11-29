<template>
  <div class="upload">
    <div class="upload__button">
      <div class="button__text">{{text}}</div>
      <input class="button__file"
        type="file"
        @change="onFileChange">
    </div>
    <div class="upload__result">
      <div class="result__item">
        <!-- <img :src=""
          alt=""> -->
        <div class="item__name"></div>
      </div>
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
      default: '点击上传'
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
      &__text {
        color: #fff;
        background-color: #409eff;
        border-color: #409eff;
        padding: 9px 15px;
        font-size: 12px;
        border-radius: 3px;
        width: 48px;
        line-height: 12px;
        text-align: center;
      }
      &__file {
        display: none;
      }
    }
  }
}
</style>
