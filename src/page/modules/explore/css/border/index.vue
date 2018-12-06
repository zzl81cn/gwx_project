<template>
  <div class="border">
    <div class="border__header">
      border头部
    </div>
    <div class="border__body">
      border主题
    </div>
  </div>
</template>

<script>
export default {
  name: 'border',

  data() {
    return {}
  },

  methods: {}
}
</script>

<style lang='scss' scoped>
.border {
  &__body,
  &__header {
    position: relative;
    margin-top: 10px;
    width: 150px;
    height: 50px;
    border: 1px solid red;
  }
  &__header {
    border-width: 1px;
  }
  &__body {
    border-width: 1px;
    &:after {
      position: absolute;
      bottom: 0;
      left: 0;
      display: block;
      content: '';
      width: 100%;
      height: 1px;
      background: linear-gradient(0, #fff, #ff0);
    }
  }
}
</style>
