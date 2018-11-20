<template>
  <div>
    <div>计数</div>
  </div>
</template>

<script>
export default {
  name: '',

  data() {
    return {
      node: {
        next: {
          next: { a: 12 }
        }
      }
    }
  },

  methods: {
    onCountClick() {
      let count = 0
      let obj = this.node
      while (obj) {
        count++
        obj = obj.next
      }
      return count
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
