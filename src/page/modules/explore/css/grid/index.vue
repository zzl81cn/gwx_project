<template>
  <div class="grid">
    <div v-for="(item,index) in list"
      :key="item"
      :class="[classList[index%5],'grid__item']">{{item}}</div>
  </div>
</template>

<script>
export default {
  name: 'grid',

  data() {
    return {
      list: [1, 2, 3, 4, 5],
      classList: ['green', 'red', 'black', '4', '5']
    }
  },

  methods: {}
}
</script>

<style lang='scss' scoped>
.grid {
  display: grid;
  grid-template-columns: 100px 100px 100px;
  grid-template-rows: 50px 80px 50px;
  &__item {
    border: 1px solid #ff0;
    background: #000;
  }
}
.green {
  grid-column-start: 1;
  grid-column-end: 3;
  background-color: #cff;
}
.red {
  grid-column: 3/4;
  background-color: #f66;
}
.black {
  grid-row: 2/4;
  background-color: #eee;
}
</style>
