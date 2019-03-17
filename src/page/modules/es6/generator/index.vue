<template>
  <div class="generator">
    <div @click="onCreateGeneratorClick">create generator</div>
    <div @click="onNextStepClick">next step</div>
    <div class="clamp">
      大法官首发式地方是地方士大夫阿道夫速度
    </div>
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
.clamp {
  width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>
