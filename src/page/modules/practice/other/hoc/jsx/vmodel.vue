<script>
export default {
  data() {
    return {
      initValue: ''
    }
  },
  render() {
    return (
      <div class="input__wrap">
        <div>initValue的值:{this.initValue}</div>
        <el-input
          value={this.initValue}
          on-input={val => {
            this.initValue = val
          }}
        />
      </div>
    )
  }
}
</script>

<style lang='scss' scoped>
.input__wrap {
  width: 200px;
}
</style>
