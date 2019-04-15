export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    // 父级传入函数 用于更改父级的值
    changeNameHandle: {
      type: Function,
      default: () => {}
    }
  },
  render() {
    return (
      <div>
        <header>{this.name}</header>
        <main>
          <el-form>
            <el-form-item label="名称">
              <el-button onClick={this.changeNameHandle.bind(this, 'new-name')}>
                button
              </el-button>
            </el-form-item>
          </el-form>
        </main>
      </div>
    )
  }
}
