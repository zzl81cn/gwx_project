// 工厂模式
class Advert {
  getAdvert (price) {
    if (price > 10000) {
      return '超级大的生意'
    }
    if (price > 1000) {
      return '千元广告'
    }
    if (price > 100) {
      return '百元广告'
    }
  }
}
// 代理类 将明星类需要的结果处理好传给对应的函数 这个过程涉及到实例化代理的事件类
class Assistant {
  init(price) {
    if (price < 50) {
      return new Star().reject()
    } else {
      return new Star().resolve(new Advert().getAdvert(price))
    }
  }
}
// 明星类 只需要传入价格返回对应的值即可,逻辑层不用考虑
class Star {
  // 定义失败的返回值
  reject() {
    return '不接50元以下的单子'
  }
  // 定义成功的返回值
  resolve(price) {
    return '接了一个' + price + '的单子'
  }
}

export default new Assistant().init(15000)
