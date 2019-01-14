function Mask() {
  let instance = null
  return function() {
    if (instance) {
      return instance
    } else {
      instance = document.createElement('div')
      const style = {
        position: 'fixed',
        top: '0',
        right: '0',
        bottom: '0',
        left: '0',
        opacity: '',
        backgroundColor: 'rgba(0,0,0,.2)'
      }
      Object.assign(instance.style, style)
      instance.className = 'mask'
      return instance
    }
  }
}
export default Mask
