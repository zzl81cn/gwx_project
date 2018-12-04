const fn = component => {
  return {
    props: component.props,
    mounted() {},
    render(h) {
      const slots = Object.keys(this.$slots).reduce(
        (arr, key) => arr.concat(this.$slots[key]),
        []
      )
      console.log(slots)
      h = this.$parent.$createElement

      return h(
        component,
        {
          attrs: this.$attrs,
          props: this.$props,
          on: this.$listeners,
          style: {
            color: '#f66',
            width: '200px',
            lineHeight: '200px',
            textAlign: 'center',
            backgroundColor: '#eee'
          },
          scopedSlots: {
            default: () => this.$slots.default,
            test: () => this.$slots.test
          }
        }
        // slots
      )
    }
  }
}
export default fn
