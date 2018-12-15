<script>
export default {
  name: 'sync',
  render() {
    return (
      <div class="sync__click" onClick={this.onClick}>
        <el-pagination
          total={10}
          current-page={this.index}
          page-size={5}
          {...{
            on: {
              'update:currentPage': value => {
                this.index = value
                console.log('页数改变了')
              }
            }
          }}
        />
      </div>
    )
  },
  data() {
    return {
      index: 1
    }
  },
  methods: {
    onClick() {
      console.log('点击事件触发了')
    }
  }
}
</script>
<style>
.sync__click {
  width: 400px;
  height: 500px;
  background-color: #efefef;
}
</style>
