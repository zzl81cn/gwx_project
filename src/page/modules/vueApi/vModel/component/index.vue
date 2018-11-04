<template>
  <div>

    <input class="v-model-child"
      :class="{'v-model-child--clicked':isClick}"
      :value="value"
      @input="onChildClick( $event.target.value)">

  </div>
</template>

<script>
export default {
  name: 'vModelChild',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isClick: false
    }
  },

  methods: {
    onChildClick(value) {
      console.log(value, 'input事件触发了')
      this.$emit('input', value)
    }
  },
  watch: {
    value(newValue) {
      console.log(newValue, '子组件的value改变了')
    }
  }
}
</script>

<style lang='scss' scoped>
.v-model-child {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1000px;
  height: 60px;
  text-align: center;
  color: #777;
  font-size: 30px;
  cursor: pointer;
  &--clicked {
    color: #f66;
  }
}
</style>
