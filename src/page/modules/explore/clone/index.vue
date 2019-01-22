<template>
  <div>
    <div @click="onCloneClick">clone</div>
  </div>
</template>

<script>
import { clone } from '../../../../utils/Object.js'
export default {
  name: '',

  data() {
    return {
      obj: { a: 12, b: undefined, c: null, d: { name: 'd' } },
      newObj: {}
    }
  },

  methods: {
    onCloneClick() {
      this.newObj = clone(this.obj)
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
