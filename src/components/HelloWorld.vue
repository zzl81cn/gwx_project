<template>
  <div class="hello">
    <slot :todo="number">
      {{number}}
    </slot>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      number: 15
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
