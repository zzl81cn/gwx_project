<template>
  <div>
    <div @click="onCloneClick">clone</div>
  </div>
</template>

<script>
import { clone, removeCycle } from '../../../../utils/Object.js'
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
    let a = { name: 'zz' }
    let b = { name: 'bb' }
    a.child = b
    b.parent = a
    this.newA = removeCycle(a)

    console.log(JSON.parse(JSON.stringify(this.newA)))
  }
}
</script>

<style lang='scss' scoped>
</style>
