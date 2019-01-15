export class SingleScroll {
  instance = false
  constructor(dom, handle, type) {
    console.dir(dom)
    this.dom = dom
    this.handleEvent = handle
    this.type = type
  }
  handle (isReset) {
    if (!this.instance) {
      console.log('还未添加实例')
      this.dom.addEventListener(this.type, this.handleEvent)
      this.instance = true
      return
    }
    if (isReset) {
      console.log('已添加实例')
      this.instance = false
      this.dom.removeEventListener(this.type, this.handleEvent)
    }
    console.log(this.instance, 'instance')
  }
}

// export default function () {
//   let instance = false
//   return function (dom, handle, isReset) {
//     if (!instance) {
//       dom.addEventListener('scroll', handle)
//       instance = true
//       return
//     }
//     if (isReset) {
//       instance = false
//       dom.removeEventListener('scroll', handle)
//     }
//     console.log(instance, 'instance')
//   }
// }
