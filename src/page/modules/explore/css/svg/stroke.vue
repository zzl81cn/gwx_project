
<template>
  <div class="stroke">
    <svg width="170"
      height="170"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1">
      <defs>
        <linearGradient x1="1"
          y1="0"
          x2="0"
          y2="0"
          id="gradient1">
          <stop offset="0%"
            stop-color="rgba(20,25,255,.3)"></stop>
          <stop offset="100%"
            stop-color="rgba(165,255,255,.76)"></stop>
        </linearGradient>
      </defs>
      <circle ref="all"
        class="svg__line"
        cx="85"
        cy="85"
        r="80" />
      <!-- <circle class="svg__dotted"
        cx="85"
        cy="85"
        r="65"></circle> -->
      <circle ref="path"
        class="svg__circle"
        cx="85"
        cy="85"
        r="80"
        stroke="url('#gradient1')"
        :stroke-dasharray="completedPath"
        :stroke-dashoffset="completedPath"
        transform="matrix(0,-1,1,0,0,170)" />
    </svg>
    <!-- <input v-model.number="number"
      type="number"
      step="20"> -->
    <!-- <span class="svg__text">{{ animatedNumber }}</span> -->
  </div>
</template>
<script>
import { TweenMax } from 'gsap/TweenMax'
const path = 3.14 * 2 * 80

export default {
  name: 'stroke',
  computed: {
    animatedNumber: function() {
      return this.tweenedNumber.toFixed(0)
    }
  },
  data() {
    return {
      lineLength: 200,
      offsetLength: 200,
      completedPath: path,
      number: 0,
      tweenedNumber: 0
    }
  },

  methods: {
    ondashHarrayClick() {
      this.lineLength += 10
    }
  },
  mounted() {
    this.completedPath = this.$refs.path.getTotalLength()

    console.log(this.completedPath)
    this.$refs.path.style.strokeDashoffset = 0
    this.number = 10000
  },
  watch: {
    number: function(newValue) {
      TweenMax.to(this.$data, 2, { tweenedNumber: newValue })
    }
  }
}
</script>

<style lang='scss' scoped>
.stroke {
  width: 170px;
  height: 170px;
  position: relative;
}
.svg {
  &__text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 20px;
  }
  &__circle {
    // stroke-dasharray: 3.14 * 2 * 80;
    stroke-width: 10;
    // stroke-dashoffset: 3.14 * 2 * 80;
    // stroke: #f66;
    transform-origin: center center;
    fill: none;
    transition: 2s linear;
    animation: move 2s linear infinite;
  }
  &__line {
    stroke-width: 10;
    fill: none;
    stroke: transparent;
  }
  &__dotted {
    fill: none;
    stroke: #fff;
    stroke-width: 6;
    stroke-dasharray: 2;
    opacity: 0.6;
  }
}
@keyframes move {
  0% {
    // stroke-dashoffset: 3.14 * 2 * 80;
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
    // stroke-dashoffset: 0;
  }
}
</style>
