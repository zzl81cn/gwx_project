<template>
  <div class="gradient">
    <div @click="onRotateClick">开始选择</div>
    <div @click="onResetClick">重置</div>
    <div class="wrap">
      <div ref="left"
        class="gradient__left">
      </div>
      <div ref="right"
        class="gradient__right"
        :class="{'gradient__right--show':isHidden}"></div>
      <div class="left__hidden"
        :class="{'left__hidden--show':!isHidden}"></div>
      <div class="gradient__mask">80%</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'gradient',

  data() {
    return {
      angle: 0,
      startTime: new Date().getTime(),
      isHidden: true,
      target: ''
    }
  },
  mounted() {
    this.target = this.$refs.left.style.transform
  },
  computed: {
    isArrive() {
      return new Date().getTime() - this.startTime >= 2000
    }
  },
  methods: {
    onRotateClick() {
      this.$refs.left.style.transform = 'rotate(240deg)'
      this.angle = this.$refs.left.style.transform.match(/\d{1,3}/g)[0]
      setTimeout(() => {
        this.isHidden = false
      }, 180 / 240 * 2000)
    },
    onResetClick() {
      this.isHidden = true
      this.$refs.left.style.transform = 'rotate(0)'
    }
  }
}
</script>

<style lang='scss' scoped>
.gradient {
  &__left {
    background: url(http://image.zhangxinxu.com/image/blog/201008/bg_green.png)
      no-repeat left top;
    transform-origin: right center;
  }
  .left__hidden {
    position: absolute;
    left: 0;
    top: 0;
    width: 100px;
    height: 100%;
    background-color: #fff;
    &--show {
      display: none;
    }
  }
  &__left,
  &__right {
    width: 100px;
    height: 200px;
    transition: 2s linear;
  }
  &__right {
    background: url(http://image.zhangxinxu.com/image/blog/201008/bg_green.png)
      no-repeat right top;
    transform-origin: left center;
    &--show {
      display: none;
    }
  }
  &__mask {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    color: #333;
    font-size: 18px;
    background-color: #f00;
    border-radius: 50%;
  }
  .wrap {
    border: 5px solid #666;
    border-radius: 50%;
    overflow: hidden;
    position: relative;
    display: flex;
    background-color: #fff;
    width: 200px;
    height: 200px;
  }
}
</style>
