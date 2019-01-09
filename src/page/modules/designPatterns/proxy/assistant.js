class Shoes {
  constructor(name) {
    this.shoes = name
  }
  getShoes() {
    return this.shoes
  }
  // 对应getShoes做限制,规定营业时间
  doBusiness() {
    const time = new Date().getHours()
    if (time > 8 && time < 20) {
      return '订购了一双' + this.getShoes()
    } else {
      return '非营业时间'
    }
  }
}
class Assistant {
  purchasing(name) {
    return new Star().buyShoes(new Shoes(name).doBusiness())
  }
}
class Star {
  buyShoes(name) {
    return name
  }
}
export default new Assistant().purchasing('雨鞋')
