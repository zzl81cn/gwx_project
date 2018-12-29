<template>
  <div>
    <div class="wrap">
      <div class="ellipsisLn">这是一段文字这是一段文字这是一段文字</div>
    </div>
    <!-- <i class="arrow">1</i>
    <div class="arrow__left"></div>
    <div class="arrow__right"></div> -->
    <div class="arrow__line"></div>
    <!-- <input v-model="endVal"
      type="text">
    <div class="example">
      <count tag="p"
        :isRestart="true"
        :endVal="endVal"
        :duration="2"
        :decimals="2"></count>
    </div> -->
  </div>
</template>

<script>
import count from '@/components/countup'
import { XButton, XNumber, Group, Datetime } from 'vux'
export default {
  name: '',
  components: {
    count,
    XButton,
    XNumber,
    Group,
    Datetime
  },
  data() {
    return {
      endVal: 500,
      value: '',
      visibility: true
    }
  },

  methods: {}
}
</script>

<style lang='scss' scoped>
@import '../../../../../styles/font.scss';
@import '../../../../../theme/index.scss';
.example {
  color: red;
  font-size: 28px;
}
.input__checkbox {
  font: normal normal normal 14px/1 'weui';
  &:after {
    content: '\EA01';
    color: red;
    font-size: 23px;
    display: block;
  }
  &--checked {
    &:after {
      content: '\EA06';
      font-size: 23px;
      color: blue;
    }
  }
  &--disabled {
    &:after {
      opacity: 0.5;
    }
  }
}
.arrow {
  display: inline-block;
  height: 10px;
  width: 10px;
  border-width: 2px 2px 0 0;
  border-color: #f00;
  border-style: solid;
  transform: matrix(0.71, -0.71, 0.71, 0.71, 0, 0);
}
.arrow__left {
  @include setcheckedabs(#f60);
}
.arrow__right {
  @include setChecked;
}
.arrow__line {
  @include settopline(#f60);
}
.ellipsisLn {
  // width: 100px;
  @include ellipsisLn(2);
}
.wrap {
  width: 140px;
}
</style>
