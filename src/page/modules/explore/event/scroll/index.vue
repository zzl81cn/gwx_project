<template>
  <div class="scroll">
    <div ref="self"
      class="scroll__area">
      <div class="area__content">滚动区域</div>
    </div>
    <div @click=onRemoveListenClick>删除监听</div>
  </div>
</template>

<script>
import { debounce } from 'throttle-debounce'
export default {
  name: 'scroll',

  data() {
    return {
      scrollHandle: debounce(100, () => {
        console.log('全局滚动')
      }),
      selfScrollHandle: debounce(100, () => {
        console.log('目标区域滚动')
      })
    }
  },

  methods: {
    onRemoveListenClick() {
      window.removeEventListener('scroll', this.scrollHandle, true)
    },
    globalScrool() {
      // 这个方法支持三个参数，要处理的事件名，处理事件的函数，和一个布尔值。如果为true,代表捕获阶段处理，如果为false，代表冒泡阶段调用函数。
      window.addEventListener('scroll', this.scrollHandle, true)
    },
    targetScrool() {
      this.$refs.self.addEventListener('scroll', this.selfScrollHandle)
    }
  },
  mounted() {
    this.globalScrool()
    this.targetScrool()
  }
}
</script>

<style lang='scss' scoped>
.scroll {
  height: 2000px;
  &__area {
    width: 300px;
    height: 300px;
    background-color: #f66;
    text-align: center;
    line-height: 300px;
    color: #fff;
    font-size: 18px;
    overflow: auto;
    .area {
      &__content {
        width: 100%;
        background-color: #eee;
        height: 800px;
      }
    }
  }
}
</style>
