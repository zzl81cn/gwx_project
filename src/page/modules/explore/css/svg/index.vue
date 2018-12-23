<template>
  <div @click="onClick">
    <svg xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      height="400">
      <!-- <line class="line"
        x1="0"
        y1="120"
        x2="200"
        y2="120"
        stroke=red
        stroke-width="2" /> -->
      <defs>
        <linearGradient x1="20%"
          y1="50%"
          x2="10%"
          y2="100%"
          id="gradient1">
          <stop offset="0%"
            stop-color="rgba(255,0,255,.3)"></stop>
          <stop offset="100%"
            stop-color="rgba(0,255,255,.76)"></stop>
        </linearGradient>
      </defs>
      <circle ref="myCircle"
        class="circle"
        cx="144"
        cy="126"
        r="120.5"
        stroke="url('#gradient1')"
        stroke-width="10"
        fill=none
        transform="rotate(-90)"></circle>
    </svg>
    <!-- <div>
      虚线宽带和间隔 ：
      <el-input-number v-model="strokeDasharray"></el-input-number>
    </div>
    <div>

      虚线的起始偏移 ：
      <el-input-number v-model="strokeDashoffset"></el-input-number>
    </div> -->

    <!-- <div>{{number}}</div>
    <div @click="numberAdd">点击</div> -->

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
      number: 0,
      strokeDasharray: 0,
      strokeDashoffset: 756.74
    }
  },
  mounted() {
    console.log(this.$refs.myCircle.style.strokeDashoffset)
    this.$nextTick(() => {
      // this.$refs.myCircle.style.strokeDashoffset = 0
    })
  },
  methods: {
    onClick() {
      this.$refs.myCircle.style.strokeDashoffset = 0
      // this.$refs.circle.setAttribute('stroke-dasharray', 1068 * 0.5 + ' 1069')
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
.line {
  stroke-dasharray: 200, 200;
  // stroke-dashoffset: 0;
}
.circle {
  // stroke-dasharray: 756.74, 756.74;
  transform-origin: center;
  transition: 2s linear;
  stroke-dasharray: 756.74;
  stroke-dashoffset: 756.74;
}
</style>
