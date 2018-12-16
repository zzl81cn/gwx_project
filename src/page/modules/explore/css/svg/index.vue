<template>
  <div class="svg">
    <div @click="onClick">点击</div>
    <svg xmlns="http://www.w3.org/2000/svg"
      version="1.1">
      <!-- 塞尔曲线 -->
      <path d="M0 0 C 0 0, 50 80 ,100 0"
        stroke="transparent"
        stroke-width="5"
        fill="red" />
      <!-- <polyline class="svg__polyLine" points="100 100 150 100 125 150" stroke="#666" stroke-width="5"  fill="none" stroke-linejoin="round"  />   -->
    </svg>
    <svg ref="cirle"
      width="440"
      height="440">
      <circle cx="220"
        cy="220"
        r="170"
        stroke-width="50"
        stroke="#D1D3D7"
        fill="none"></circle>
      <circle class="svg__circle"
        ref="circle"
        cx="220"
        cy="220"
        r="170"
        stroke-width="50"
        stroke="#00A5E0"
        fill="none"
        transform="matrix(0,-1,1,0,0,440)"
        stroke-dasharray="0 1069">
      </circle>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'svg',
  created() {},
  data() {
    return {
      lineLength: 0,
      offsetLength: 0
    }
  },

  methods: {
    onClick() {
      this.$refs.circle.setAttribute('stroke-dasharray', 1068 * 0.5 + ' 1069')
    }
  }
}
</script>

<style lang='scss' scoped>
.svg {
  &:hover &__polyLine {
    stroke: red;
    transform: rotate(180deg);
  }
  &__polyLine {
    transition: all 1s ease-out;
    transform-origin: center center;
  }
  &__circle {
    transition: 2s;
  }
}
</style>
