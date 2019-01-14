<template>
  <div>
    <button @click="onButtonClick">点击</button>
  </div>
</template>

<script>
import Mask from './mask.js'
export default {
  name: '',

  data() {
    return {
      isShow: false
    }
  },

  methods: {
    onButtonClick() {
      this.isShow = !this.isShow
    }
  },
  created() {
    const instance = new Mask()
    console.log(instance, 666)
    document.body.appendChild(instance())
  },
  watch: {
    isShow(newValue) {
      if (newValue) {
        // this.$refs
      }
    }
  }
}
</script>
<style lang="scss">
.mask {
  display: block;
}
</style>
