<template>
  <div class="generator">
    <div @click="onCreateGeneratorClick">create generator</div>
    <div @click="onNextStepClick">next step</div>
  </div>
</template>

<script>
export default {
  name: 'generator',

  data() {
    return {
      handle: () => {}
    }
  },

  methods: {
    onCreateGeneratorClick() {
      function* createGenerator(x) {
        try {
          var y = yield x + 2
        } catch (e) {
          console.log(e)
        }
        return y
      }
      this.handle = createGenerator(5)
    },
    onNextStepClick() {
      this.handle.next()
      this.handle.throw('出错了')
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
