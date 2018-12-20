class CountUp {
  constructor(target, startVal, endVal, decimals, duration) {
    this.target = target
    this.startVal = startVal
    this.endVal = endVal
    this.decimals = decimals
    this.duration = Number(this.duration) * 1000 || 2000
  }
  // 初始化
  init() {
    // 拿到DOM
    this.label =
      typeof this.target === 'string'
        ? document.getElementById(this.target)
        : this.target
    this.startVal = Number(this.startVal)
    this.endVal = Number(this.endVal)
    this.frameVal = this.startVal
    this.startTime = new Date()
    this.progress = this.endVal - this.frameVal
    this.update()
  }
  // 更新
  update() {
    this.rAF = setInterval(() => {
      const time = new Date() - this.startTime
      const speed =
        ((new Date() - this.startTime) / this.duration) * this.progress
      if (time >= this.duration) {
        clearInterval(this.rAF)
        this.frameVal = this.endVal
        this.startVal = this.frameVal
      } else {
        this.frameVal = this.startVal + speed
      }
      this.printValue(this.frameVal)
    })
  }
  // 打印值
  printValue(value) {
    this.label.innerHTML = value.toFixed(this.decimals)
  }
  // 有新的结束值
  updateNew(newEndVal) {
    this.pauseResume()
    this.endVal = newEndVal
    this.init()
  }
  // 暂停
  pauseResume() {
    clearInterval(this.rAF)
    this.startVal = this.frameVal
  }
  // 重新开始
  restart() {
    this.init()
  }
}
export default CountUp
