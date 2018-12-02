<template>
  <div class="upload">
    <div class="upload__button">
      <div class="button__text"
        @click="onUploadClick">{{text}}</div>
      <input ref="file"
        class="button__file"
        type="file"
        @change="onFileChange">
    </div>
    <div class="upload__result">
      <transition-group name="list">
        <div v-for="(item,index) in fileList"
          :key="item.id"
          class="result__item">
          <div class="item__main">
            <div class="item__icon">
              <i class="el-icon-document"></i>
            </div>
            <div class="item__name"
              @click="onFileCopyClick(index)">
              {{item.name}}
            </div>
            <div v-if="item.percent!==0&&!item.isComplate"
              class="item__percent"> {{item.percent}} %</div>
            <div v-else
              class="item__close"
              @click="onCloseFileClick(index)">
              <i class="el-icon-close"></i>
            </div>
          </div>
          <div v-if="item.percent!==0&&!item.isComplate"
            class="item__progress"
            :style="{width:item.percent+'%'}"></div>
        </div>
      </transition-group>
    </div>
    <input ref="input"
      class="upload__copy"
      type="text"
      :value="copyFile">
    <img v-if="isImage"
      :src="filePath">
  </div>
</template>

<script>
import { callUploadApi } from '../../resource/uploadOSSApi'
export default {
  name: 'uploadButton',
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
      filePath: '',
      fileList: [],
      copyFile: ''
    }
  },

  methods: {
    progress(percent) {
      this.fileList[this.fileList.length - 1].percent = percent
      if (percent === 100) {
        setTimeout(() => {
          this.fileList[this.fileList.length - 1].isComplate = true
        }, 500)
      }
      this.$refs.file.value = null
    },
    onFileCopyClick(index) {
      this.copyFile = this.fileList[index].filePath
      this.$refs.input.focus()
      setTimeout(() => {
        const canCopy = document.execCommand('copy')
        if (canCopy) {
          this.$refs.input.select()
          document.execCommand('copy')
          this.$message({
            message: '复制链接成功',
            type: 'success'
          })
        }
      }, 200)
    },
    onCloseFileClick(index) {
      this.fileList.splice(index, 1)
    },
    onUploadClick() {
      this.$refs.file.click()
    },
    onFileChange(event) {
      const file = event.target.files[0]
      if (file === undefined) {
        return
      }
      this.fileList.push({
        name: file.name,
        id: Math.random() * 1000,
        isActive: true,
        percent: 0,
        isComplate: false,
        filePath: ''
      })
      // this.$callApi({
      //   api: 'get_first_data',
      //   param: {},
      //   mock: true
      // }).then(data => {
      //   this.fileList[this.fileList.length - 1].filePath = data.filePath
      //   this.fileList[this.fileList.length - 1].percent = data.percent
      //   if (data.percent === 100) {
      //     setTimeout(() => {
      //       this.fileList[this.fileList.length - 1].isComplate = true
      //     }, 500)
      //   }
      //   this.$refs.file.value = null
      // })
      callUploadApi(
        file,
        data => {
          this.fileList[this.fileList.length - 1].filePath = data
        },
        this.progress
      )
    }
  }
}
</script>

<style lang='scss' scoped>
$transitionProperty: all 1s;
$transitionTen: translateY(10px);
$transitionNegTen: translateY(-10px);
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
    width: 360px;
    height: 56px;
    margin-top: 30px;
    .result {
      &__item {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        cursor: pointer;
        transition: all 1s;
        margin-top: 5px;
        width: 100%;
        &:hover {
          background-color: #f5f7fa;
        }
        .item {
          &__main {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            justify-content: space-between;
            width: 100%;
          }
          &__name {
            color: #606266;
            overflow: hidden;
            transition: color 0.3s;
            white-space: nowrap;
            font-size: 14px;
            width: 300px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            word-break: break-all;
            &:hover {
              color: #409eff;
            }
          }
          &__close {
            width: 40px;
            transition: $transitionProperty;
            transform-origin: center;
            text-align: center;
            &:hover {
              color: #f66;
              transform: rotate(360deg);
            }
          }
          &__percent {
            width: 40px;
            font-size: 12px;
            color: #333;
            text-align: center;
          }
          &__progress {
            margin-top: 2px;
            width: 40px;
            background-color: #409eff;
            text-align: center;
            height: 1.5px;
          }
        }
      }
    }
  }
  &__copy {
    position: absolute;
    top: -999px;
    left: -999px;
  }
}
.list-enter-active,
.list-leave-active {
  transition: $transitionProperty;
}
.list-enter,
.list-leave-to {
  opacity: 0;
}
.list-enter {
  transform: $transitionTen;
}
.list-leave-to {
  opacity: 0;
  transform: $transitionNegTen;
}
</style>
