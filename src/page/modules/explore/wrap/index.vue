<template>
  <div class="wrap">
    <input type="number"
      v-model="number">
    <span v-if="valueList[15]"
      v-html="wrapTextNumber(valueList[15].growthData.teacherComment,number)"></span>
  </div>
</template>

<script>
import { wrapTextNumber } from '../../../../utils/String.js'
export default {
  name: '',

  data() {
    return {
      wrapTextNumber,
      valueList: [],
      number: 15
    }
  },
  methods: {
    reFindStudentList() {
      this.$callApi({
        api: 'growth_growth_listByStuid',
        param: {
          campusid: 1615,
          growthid: 'e62e2665745daecd0c2ba791d3bd5699',
          stuid: 1561247441
        }
      }).then(data => {
        this.valueList = data
      })
    }
  },
  created() {
    this.reFindStudentList()
  }
}
</script>

<style lang='scss' scoped>
.wrap {
  margin: 30px;
}
</style>
