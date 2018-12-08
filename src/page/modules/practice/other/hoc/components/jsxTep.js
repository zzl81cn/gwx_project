export default {
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ]
    }
  },
  methods: {},
  render(h) {
    return (
      <el-table data={this.tableData}>
        <el-table-column prop="date" label="日期" width="180" />
      </el-table>
    )
  }
}
