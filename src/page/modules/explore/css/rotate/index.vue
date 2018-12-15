<template>
  <div class="rotate">
    <div class="rotate__warp">
      <div class="warp__left"></div>
      <div class="warp__right"></div>
    </div>

    <div class="load">
      <div class="load__mask"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rotate',

  data() {
    return {}
  },

  methods: {}
}
</script>

<style lang='scss' scoped>
.rotate {
  &__warp {
    display: flex;
    width: 200px;
    height: 200px;
    background-color: #000;
    border-radius: 50%;
  }
  .warp {
    &__left,
    &__right {
      width: 100px;
      height: 200px;
    }
    &__left {
      transform-origin: right center;
      background: linear-gradient(to right, #f66 0, #000 50px, #999 100px),
        url('./bike.jpg');
    }
    &__right {
      transform-origin: left center;
      background: linear-gradient(to bottom, #dfc 0px, #cdf 150px);
    }
  }
}
body {
  margin: 0;
  padding: 0;
  /*为了展示方便就用灰色的背景*/
  background-color: #ccc;
}

.load {
  &__mask {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 140px;
    height: 140px;
    background-color: #fff;
    border-radius: 50%;
  }
  position: relative;
  width: 200px;
  height: 200px;
  /*如果渐变出不来，有一个背景颜色*/
  background: #fff;
  margin: 0 auto;
  border-radius: 50%;
  /*间隔色的关键代码*/
  background-image: linear-gradient(
    45deg,
    #f66 0%,
    #fff 5%,
    #f66 10%,
    #fff 15%,
    #f66 20%,
    #fff 25%,
    #000 50%,
    #fff 50%,
    #fff 75%,
    #000 75%,
    #000 100%
  );
  /* 把刚才的背景压缩到100px * 100px以内的，没有设定不重复所以是重复的 */
  background-size: 100px 100px;
  /* 一秒播一次的永动动画 */
  animation: move 3s linear infinite;
}
@keyframes move {
  0% {
  }
  100% {
    transform: rotate(360deg);
    // background-position: 100px; /* 终止状态是移动到100px像素的位置，然后下一秒又开始从0px开始运动 */
  }
}
</style>
