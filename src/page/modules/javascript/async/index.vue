<template>
  <div @click="onBallMoveClick">
    <div ref="ball"
      style="top:10px"
      class="boll">
    </div>
  </div>
</template>

<script>
import { animationRequest } from './index.js'
export default {
  name: '',

  data() {
    return {}
  },

  methods: {
    onSettimoeoutClick() {
      let settimeoutFn = animationRequest(timer => {
        cancelAnimationFrame(timer)
      }, 1000)
      settimeoutFn()
    },
    onBallMoveClick() {
      console.log(this.$refs.ball.style.top)

      // let loop = ballMove(this.$refs.ball)
      // loop()
    }
  },
  created() {}
}
</script>

<style lang='scss'>
.boll {
  position: absolute;
  top: 10px;
  left: 40px;
  width: 40px;
  height: 40px;
  background-color: #f00;
  border-radius: 50%;
}
</style>
