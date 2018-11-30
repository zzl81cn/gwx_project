<template>
  <div class="upload">
    <div class="upload__button"
      @click="onUploadClick">
      <div class="button__text">{{text}}</div>
      <input ref="file"
        class="button__file"
        type="file"
        @change="onFileChange">
    </div>
    <div class="upload__result">
      <div v-for="item in fileList"
        :key="item.id"
        class="result__item">
        <div class="item__icon">
          <i class="el-icon-document"></i>
        </div>
        <div class="item__name">
          {{item.name}}
        </div>
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
      filePath: '',
      fileList: [{ name: '15.png', id: 111 }]
    }
  },

  methods: {
    progress(percent) {
      this.percent = percent
      this.$refs.file.value = null
    },
    onUploadClick() {
      this.$refs.file.click()
    },
    onFileChange(event) {
      const file = event.target.files[0]
      if (file === undefined) {
        return
      }
      this.fileList.push({ name: file.name, id: Math.random() * 1000 })
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
        cursor: pointer;
      }
      &__file {
        display: none;
      }
    }
  }
  &__result {
    display: flex;
    flex-flow: column wrap;
    .result {
      &__item {
        display: flex;
        align-items: center;
        .item {
          &__name {
            color: #606266;
            overflow: hidden;
            padding-left: 4px;
            transition: color 0.3s;
            white-space: nowrap;
            font-size: 14px;
            &:hover {
              color: #409eff;
            }
          }
        }
      }
    }
  }
}
</style>
