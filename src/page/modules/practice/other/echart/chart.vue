<template>
  <div class="chart">
    <div class="chart__move">
      <div class="move__child">
        <div class="child__item"
          v-for="item in chartList"
          :key="item">{{item}}</div>
        <!-- :style="{height:item+'px'}" -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'chart',

  data() {
    return {
      chartList: [15, 12]
    }
  },

  methods: {}
}
</script>

<style lang='scss' scoped>
.chart {
  &__move {
    width: 200px;
    height: 200px;
    background-color: #eee;
    overflow-x: scroll;
    overflow-y: hidden;
    &::-webkit-scrollbar {
      display: none;
    }
    .move {
      &__child {
        display: flex;
        flex-flow: column-reverse nowrap;
        width: 200%;
        height: 100%;
        background: linear-gradient(to right, #eee 0%, #fff 100%);
        .child__item {
          height: 40px;
          width: 50px;
          background-color: #f66;
          margin-right: 10px;
        }
      }
    }
  }
}
</style>
