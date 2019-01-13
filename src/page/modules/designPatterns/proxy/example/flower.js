class Flower {
  constructor(name) {
    this.flower = name
  }
  friend() {
    // 保护代理 : friend 可以帮助 confessioner 过滤掉一些请求，比如送花的人中年龄太大的或者没有宝马的，这种请求就可以直接在代理 friend 处被拒绝掉

    // 虚拟代理 new Flower 也是一个代价昂贵的操作， 那么我们可以把 new Flower 的操作交给代理 B 去执行，代理 B 会选择在 A 心情好时再执行 new Flower
    const girl = new Girl()
    const handler = () => {
      girl.receiveFlower(this.flower)
    }
    girl.listenGoodMood(handler)
  }
  confessioner() {
    const girl = new Girl()
    girl.receiveFlower(this.flower)
  }
}

class Girl {
  receiveFlower(flower) {
    console.log('收到' + flower + '啦!');
  }
  listenGoodMood(fn) {
    setTimeout(() => {
      fn()
    }, 1000)
  }
}
export default Flower
