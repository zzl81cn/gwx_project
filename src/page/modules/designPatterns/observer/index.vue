<template>
  <div class="observer">
    <div @click="onSubscribeClick(111,'111学习者')">订阅者1</div>
    <div @click="onSubscribeClick(222,'222学习者')">订阅者2</div>
    <div @click="onTriggerClick">发布</div>
    <div @click="onTakeOffClick(111)">订阅者1取关</div>
    <div @click="onTakeOffClick(222)">订阅者2取关</div>
  </div>
</template>

<script>
import Observer from './index.js'
export default {
  name: 'observer',
  data() {
    return {
      observer: {}
    }
  },
  methods: {
    onSubscribeClick(id, text) {
      this.observer.subscribe({
        id,
        name: 'guan',
        fn: () => {
          console.log(text)
        }
      })
      console.log('添加一条订阅' + text)
    },
    onTriggerClick() {
      this.observer.trigger('guan')
      console.log('开始上课了')
    },
    onTakeOffClick(id) {
      this.observer.takeOff({ name: 'guan', id })
      console.log(id + '取消关注')
    }
  },
  created() {
    this.observer = new Observer()
  }
}
</script>

<style lang='scss' scoped>
</style>
