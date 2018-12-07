
<script>
export default {
  data() {
    return {
      test: '文字'
    }
  },
  methods: {
    onClick() {
      this.test = '改变'
      console.log(this, 'this.slots')
    }
  },
  render(h) {
    return (
      <div class="jsx-tep__test" onClick={this.onClick}>
        <div class="test__child">内部</div>
        {h('p', this.$slots.test)}
        {h('div', {
          scopedSlots: {
            test: () => this.$slots.slot
          }
        })}
      </div>
    )
  }
}
</script>

<style lang='scss' scoped>
.jsx-tep__test {
  color: #fff;
  line-height: 150px;
  text-align: center;
  background-color: #999;
  width: 150px;
  height: 150px;
  .test {
    &__child {
      background-color: #cdc;
      width: 50px;
      line-height: 50px;
      color: red;
    }
  }
}
</style>
