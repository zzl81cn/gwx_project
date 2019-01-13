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
import Flower from './example/flower.js'
import ProxyImage from './example/loading.js'
import HttpProxy from './example/http.js'
export default {
  name: 'proxy',

  data() {
    return {
      shoes,
      assistant,
      ad,
      Cache,
      Flower,
      ProxyImage
      // http
    }
  },

  methods: {},
  created() {
    const proxy = new HttpProxy()
    proxy.proxyFile(123)
    proxy.proxyFile(123456)
    proxy.proxyFile(123456789)
    setTimeout(() => {
      proxy.proxyFile(123210)
    }, 500)
    // new Flower('百合').friend()
    // const image = new ProxyImage()
    // image.setSrc(
    //   'https://user-gold-cdn.xitu.io/2018/12/19/167c7004b54a9e91?w=471&h=369&f=gif&s=199605'
    // )
    // console.log(flower)
  }
}
</script>

<style lang='scss'>
</style>
