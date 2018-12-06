export default component => {
  return {
    mounted() {
      console.log('hoc is good ', this, this.$props)
    },
    // hoc 组件本身没有设置props 需要设置传入的组件相同的props
    props: component.props,
    render(h) {
      let slots = {}
      Object.keys(this.$slots).map(item => {
        slots[item] = () => this.$slots[item]
        return slots
      })
      return h(component, {
        attrs: this.$attrs,
        props: this.$props,
        scopedSlots: slots
      })
    }
  }
}
