<template>
  <div>
    <div @click="onCloneClick">clone</div>
  </div>
</template>

<script>
import { clone, cloneLoop } from '../../../../utils/Object.js'
export default {
  name: '',

  data() {
    return {
      obj: { a: 12, b: undefined, c: null, d: { name: 'd' } },
      newObj: {},
      newA: {}
    }
  },

  methods: {
    onCloneClick() {
      this.newObj = clone(this.obj)
    }
  },
  created() {
    this.newA = cloneLoop(this.obj)
    console.log('newA', this.newA)
  }
}
</script>

<style lang='scss' scoped>
</style>
