<template>
  <div>
    <el-table-column prop="reviewStatus"
      :label="isExpertPage?'状态':'审核状态'">
      <template slot-scope="socpe">
        {{ getReviewText(socpe.row)}}
      </template>
    </el-table-column>
  </div>
</template>

<script>
// 这里可能会符合两个条件，将以数字结尾的正则条件放在后面，这样相同条件下会应用后面的函数执行的代码
const REVIEW_TYPE = new Map([
  [/true/, () => '审核'],
  [/\d*2$/, () => '已通过'],
  [/\d*3$/, () => '未通过'],
  [/\d*0$/, () => '未提交']
])
export default {
  name: 'actual',

  data() {
    return { isOrganizationPage: '', isExpertReview: '' }
  },

  methods: {
    // 使用正则条件匹配
    getReviewText(row) {
      let text = ''
      // 筛选除符合条件的数组项
      const typeList = [...REVIEW_TYPE].filter(([exp]) => {
        return exp.test(
          this.isOrganizationPage + '_' + this.isExpertReview + row.status
        )
      })
      // 将符合条件的子项函数执行
      typeList.forEach(([exp, fn]) => {
        text = fn.call(this)
      })
      return text || '提交未申请'
    },
    // 之前写法
    originalLogic(row) {
      if (this.isOrganizationPage || this.isExpertReview) {
        if (row.status === 2) {
          return '已通过'
        } else if (row.status === 3) {
          return '未通过'
        } else {
          return '审核'
        }
      } else {
        switch (row.status) {
          case 1:
            return '提交未审核'
          case 2:
            return '已通过'
          case 0:
            return '未提交'
          default:
            return '未通过'
        }
      }
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
