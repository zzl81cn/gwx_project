<template>
  <div class="flyweight">
    <div @click="onCreateTeacher">查看老师</div>
  </div>
</template>

<script>
import Learn from './index.js'
export default {
  name: 'flyweight',

  data() {
    return {}
  },

  methods: {
    onCreateTeacher() {
      const learn = new Learn('2019年', 1001, 'guan')
      console.log(learn.getInfo())
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
