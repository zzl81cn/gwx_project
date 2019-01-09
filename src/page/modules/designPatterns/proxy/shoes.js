// 鞋店
class Shoes {
  // 告诉它你需要的鞋子
  constructor(name) {
    // 生产一双你需要是鞋子
    this.shoes = name
  }
  // 通过 这个方法得到我们定制的鞋子
  getShoes() {
    return this.shoes
  }
}
// 雇佣一个代理人
class Assistant {
  // 他有一个能力就是给Star代购一双需要的鞋子
  // 首先这个star需要一个buyShoes的行为,才需要去执行代购
  /**
   * 代购的过程就是 :
   * 1. Assistant类执行purchasing方法
   * 2. 方法中实例一个 Star 并执行star中买鞋子的方法
   * 3. 通过传入一个实例化的Shoes并执行getShoes方法 返回一个鞋子
   */
  purchasing(Shoes) {
    return new Star().buyShoes(Shoes.getShoes())
  }
}

class Star {
  buyShoes(name) {
    // console.log('买到一双' + name);
    return '买到一双' + name
  }
}
const assistant = new Assistant().purchasing(new Shoes('球鞋'))
export default assistant
