<template>
  <div class='proxy'>
    proxy
  </div>
</template>

<script>
import shoes from './shoes.js'
import assistant from './assistant.js'
import ad from './ad.js'
import Cache from './cache.js'
export default {
  name: 'proxy',

  data() {
    return {
      shoes,
      assistant,
      ad
    }
  },

  methods: {},
  created() {
    const example = new Cache()
    console.log(example.proxyAdd(1, 2))
  }
}
</script>

<style lang='scss'>
</style>
