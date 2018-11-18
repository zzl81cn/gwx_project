<template>
  <div>
    <div @click="onCreateClick"> new Proxy
      <span>{{proxy}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: '',

  data() {
    return {
      proxy: { c: 12 }
    }
  },

  methods: {
    onCreateClick() {
      this.proxy = new Proxy(this.proxy, {
        get(target, property) {
          console.log(target, property, 'property')

          return '结果'
        },
        has() {
          return true
        }
      })
      console.log(this.proxy.aaa)
      // console.log('c' in this.proxy)
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
