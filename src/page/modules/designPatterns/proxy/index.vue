<template>
  <div class='proxy'>
    proxy
  </div>
</template>

<script>
import shoes from './shoes.js'
import assistant from './assistant.js'
import ad from './ad.js'
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
    console.log(ad)
  }
}
</script>

<style lang='scss'>
</style>
