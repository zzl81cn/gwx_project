<template>
  <div>
    <div @click="onButtonClick($event.target.innerHTML)">{{message}}</div>
    <input type="text"
      :value="name"
      @change="onValueChange($event.target.value)">
    <el-table :data="tableData">
      <el-table-column v-for="item in propList"
        :key="item.date"
        v-bind="item"
        width="180">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import buttonMixins from '../../../../../components/mixins'
import extend from '../../../../../components/extends'
export default {
  name: 'buttonMixins',
  extends: extend,
  mixins: [buttonMixins],
  data() {
    return {
      message: '15',
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎'
        },
        {
          date: '2016-05-04',
          name: '王小虎'
        }
      ],
      propList: [
        { prop: 'date', label: '日期' },
        {
          prop: 'name',
          label: '姓名',
          renderCell: scope => {
            return <el-button>{scope.row}</el-button>
          }
        }
      ]
    }
  },

  methods: {
    onButtonClick() {
      console.log(this.$data, this.$methods, this)
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
