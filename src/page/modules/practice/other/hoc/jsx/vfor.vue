<script>
export default {
  data() {
    return {
      tagList: ['标签1', '标签2', '标签3']
    }
  },
  render() {
    return (
      <div>
        {this.tagList.map((item, index) => {
          return <el-tag key={index}>{item}</el-tag>
        })}
      </div>
    )
  }
}
</script>
