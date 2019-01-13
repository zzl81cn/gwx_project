
class DefaultImage {
  constructor() {
    this.imgNode = new Image()
    document.body.appendChild(this.imgNode);
  }
}
class PreImage {
  constructor() {
    // this.imgNode = new Image()
    // document.body.appendChild(this.imgNode);
    this.DefaultImage = new DefaultImage()
    this.img = new Image()
    // 当目标图片加载完 模拟图片加载时间
    // 使用箭头函数 因为会用到父级this否则拿到的还是函数中的this
    this.img.onload = () => {
      setTimeout(() => {
        this.DefaultImage.imgNode.src = this.img.src
      }, 1000);
    }
  }
  setSrc(src) {
    // 设置图片默认地址
    this.DefaultImage.imgNode.src = './loading.gif'
    // 设置传入图片
    this.img.src = src;
  }
}

export default PreImage
