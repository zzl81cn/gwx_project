export default class Debounce {
  timer
  i=0
  constructor(handle) {
    this.scroll = handle
  }
  cache(time) {
    if (!this.timer) {
      this.i++
      if (this.i === 1000) {
        this.scroll()
        this.timer = null
      }
      // this.timer = setTimeout(() => {
      //   this.scroll()
      //   this.timer = null
      // }, time)
    }
  }
}
