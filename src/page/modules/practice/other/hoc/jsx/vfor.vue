<script>
export default {
  data() {
    return {
      tagList: ['标签1', '标签2', '标签3']
    }
  },
  render() {
    return (
      <div class="tag__wrap">
        {this.tagList.map((item, index) => {
          return <el-tag key={index}>{item}</el-tag>
        })}
      </div>
    )
  }
}
</script>
<style>
.tag__wrap {
  width: 200px;
  display: flex;
  justify-content: space-between;
  margin: 10px;
}
</style>
