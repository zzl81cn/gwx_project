class CountUp {
  constructor(target, startVal, endVal, decimals, duration) {
    this.target = target
    this.startVal = startVal
    this.endVal = endVal
    this.duration = duration
  }
  init() {
    // 拿到DOM
    this.label =
      typeof this.target === 'string'
        ? document.getElementById(this.target)
        : this.target
    this.startVal = Number(this.startVal)
    this.endVal = Number(this.endVal)
    this.duration = Number(this.duration) * 1000 || 2000
    this.frameVal = this.startVal
    this.execute()
  }
  execute() {
    this.isCountDown = this.frameVal < this.endVal
    if (this.isCountDown) {
      this.updateAdd()
    } else {
      this.updateReduce()
    }
  }
  updateAdd() {
    this.rAF = setInterval(() => {
      this.frameVal++
      this.printValue(this.frameVal)
      if (this.frameVal >= this.endVal) {
        clearInterval(this.rAF)
      }
    })
  }
  updateReduce() {
    this.rAF = setInterval(() => {
      this.frameVal--
      this.printValue(this.frameVal)
      if (this.frameVal <= this.endVal) {
        clearInterval(this.rAF)
      }
    })
  }
  printValue(value) {
    this.label.innerHTML = value
  }
  updateNew(newEndVal) {
    console.log(newEndVal)
    this.pauseResume()
    this.endVal = newEndVal
    this.init()
  }
  pauseResume() {
    clearInterval(this.rAF)
  }
}
export default CountUp
