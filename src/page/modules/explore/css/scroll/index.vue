<template>
  <div class="scroll">
    <div class="scroll__wrap"
      @click="onWindowScrollClick">
      <div class="wrap__member"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'scroll',

  data() {
    return {}
  },

  methods: {
    onWindowScrollClick() {
      console.log(111)
      setTimeout(() => {
        window.scrollTo(0, 100)
      }, 100)
    }
  }
}
</script>

<style lang='scss' scoped>
.scroll {
  height: 1000px;
  background-color: #f66;
  &__wrap {
    height: 100px;
    background-color: #eee;
  }
}
</style>
