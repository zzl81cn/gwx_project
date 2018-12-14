<template>
  <div ref="generator"
    class="generator">
    <div id="main"
      style="width:100%;height:400px;"></div>
  </div>
</template>

<script>
const echarts = require('echarts')

export default {
  name: 'generator',
  mounted() {
    const myChart = echarts.init(document.getElementById('main'))
    const option = {
      color: ['#3398DB'],
      grid: {
        left: '3%',
        right: '3%',
        bottom: '0%',
        containLabel: true
      },
      xAxis: [
        {
          max: 5,
          splitNumber: 4,
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'sdf']
        }
      ],
      yAxis: [
        {
          max: 400,
          type: 'value'
        }
      ],
      series: [
        {
          name: '直接访问',
          type: 'bar',
          barWidth: '50%',
          data: [10, 52, 200, 334, 390, 330, 220, 555],
          itemStyle: {
            // color: function(param) {
            //   console.log(param)
            //   if (param.name === 'Sun') {
            //     return '#f66'
            //   } else {
            //     return '#ccc'
            //   }
            // },
            border: '1px solid #333',
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(255, 0, 0, 1)'
            }
          }
        }
      ],
      dataZoom: [
        {
          type: 'inside',
          start: 40,
          end: 100
        }
      ]
    }
    myChart.setOption(option)
    myChart.on('mouseover', function(params) {
      console.log(params)
    })
  },
  data() {
    return {}
  },

  methods: {}
}
</script>

<style lang='scss' scoped>
</style>
