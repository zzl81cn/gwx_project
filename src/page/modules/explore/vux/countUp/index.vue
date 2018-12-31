<template>
  <div>

    <div class="wrap">
      <span class="arrow"
        :class="{'arrow__rotate':isShowPopup}"
        @click="onTextClick">这是一段文字</span>
    </div>
    <transition name="translation">
      <div v-show="isShow"
        class="hidden">
        <div>
          隐藏文字是的是地方是发是发是方式地方
        </div>
      </div>
    </transition>
    <group>
      <popup-picker v-model="list"
        show-name
        :data="nameList"
        :show.sync="isShowPopup"
        :show-cell="false"></popup-picker>
    </group>
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
import { XButton, XNumber, Group, Datetime, PopupPicker } from 'vux'
export default {
  name: '',
  components: {
    count,
    XButton,
    XNumber,
    Group,
    Datetime,
    PopupPicker
  },
  data() {
    return {
      endVal: 500,
      value: '',
      visibility: true,
      isShowPopup: false,
      list: [],
      nameList: [[1, 2, 3]],
      isShow: false
    }
  },

  methods: {
    onTextClick() {
      // this.isShowPopup = true
      this.isShow = !this.isShow
    }
  },
  mounted() {},
  sockets: {
    connect: function() {
      console.log('socket connected')
    }
  }
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
// .arrow {
//   display: inline-block;
//   height: 10px;
//   width: 10px;
//   border-width: 2px 2px 0 0;
//   border-color: #f00;
//   border-style: solid;
//   transform: matrix(0.71, -0.71, 0.71, 0.71, 0, 0);
// }
.arrow__left {
  @include setcheckedabs(#f60);
}
.arrow__right {
  @include setChecked;
}
.arrow__line {
  @include settopline(#f60);

  // width: 100px;
  @include ellipsisLn(2);
}
.arrow {
  position: relative;
  // @include arrow;
  @include setcheckedabs;
  &:after {
    transition: 1s;
    right: -15px;
  }
  &__rotate {
    &:after {
      transform: translateY(-25%) rotate(-45deg);
    }
  }
}
.wrap {
  margin: 20px 0;
  // width: 140px;
  width: 100%;
  text-align: center;
}
.hidden {
  width: 40px;
  height: 100%;
}
@include maxHeight(600, 1s);
</style>
