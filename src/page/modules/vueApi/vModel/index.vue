<template>
  <div class="v-model">
    <div class="v-model__change"
      @click="onValueClick">我是父组件中的name：{{name}}</div>
    <child v-model="name"></child>
  </div>
</template>

<script>
import child from './component/index'
export default {
  name: 'vModel',
  components: {
    child
  },
  data() {
    return {
      name: '原始值'
    }
  },

  methods: {
    onValueClick() {
      this.name = '改变'
    }
  },
  watch: {
    name(newValue) {
      console.log(newValue, '子组件改变了父组件的name')
    }
  }
}
</script>

<style lang='scss' scoped>
.v-model {
  &__change {
    width: 300px;
    line-height: 50px;
    text-align: center;
    border-radius: 10px;
    background-color: #11dddf;
    color: #ddfdfd;
  }
}
</style>
