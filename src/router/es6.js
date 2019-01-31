import define from './define'
import Router from 'vue-router'

const { setMap, proxy, promise, generator, async, classEs6 } = define
const router = {
  routes: [setMap, proxy, promise, generator, async, classEs6]
}
console.log(promise);

export default new Router(router)
