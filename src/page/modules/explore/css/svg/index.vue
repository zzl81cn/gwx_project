<template>
  <div>
    <div>{{number}}</div>
    <div @click="numberAdd">点击</div>

  </div>
</template>

<script>
export default {
  name: 'svgN',
  created() {},
  data() {
    return {
      lineLength: 0,
      offsetLength: 0,
      number: 0
    }
  },

  methods: {
    onClick() {
      this.$refs.circle.setAttribute('stroke-dasharray', 1068 * 0.5 + ' 1069')
    },
    numberAdd() {
      const interval = setInterval(() => {
        this.number++
        if (this.number >= 1000) {
          clearInterval(interval)
        }
      }, 0)
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
