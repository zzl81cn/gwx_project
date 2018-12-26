<template>
  <div>
    <x-button type="warn">submit</x-button>
    <x-button type="default">submit</x-button>
    <x-button type="primary">submit</x-button>
    <group>
      <datetime v-model="value"
        :show.sync="visibility"></datetime>
    </group>
    <!-- <i class="weui-icon-circle"></i>
    <i class="weui-icon-safe-success"></i>
    <i class="weui-icon-checked"></i> -->
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
</style>
