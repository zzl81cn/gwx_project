<script>
export default {
  name: 'test',

  data() {
    return {}
  },
  render() {
    return (
      <div class="main">
        <div onClick={this.onClick}>1</div>
        <div ref="child2" onClick={this.onChild2Click}>
          2
        </div>
      </div>
    )
  },
  methods: {
    onClick() {
      this.$refs.child2.click()
    },
    onChild2Click() {
      console.log('触发点击事件')
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
