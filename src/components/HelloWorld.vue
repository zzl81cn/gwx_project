<template>
  <div class="hello">
    <div class="hello__head"
      @click="onClick">标题</div>
    <slot></slot>
    <slot name="test"></slot>
    <!-- <div class="hello__body">主体</div> -->
    <!-- <h4 slot="test">test-slot</h4> -->
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  methods: {
    onClick() {
      this.$emit('testClick')
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
