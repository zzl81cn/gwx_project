<template>
  <div class="tabbar">
    <div class="tabbar__wrap">
      <div v-for="(item,index) in list"
        :key="index"
        class="tabbar__item"
        :class="{'tabbar__item--selected':index===ind}"
        @click="onTabbarClick(index)">
        {{item}}
      </div>
    </div>
    <div class="tabbar__line"
      :style="{border:'1px solid red', width:`${100 / list.length}%`,left:`${ind * (100 / list.length)}%`}"></div>
  </div>
</template>

<script>
export default {
  name: '',

  data() {
    return {
      list: ['一号', '二号'],
      ind: 0
    }
  },

  methods: {
    onTabbarClick(index) {
      this.ind = index
    }
  }
}
</script>

<style lang='scss' scoped>
.tabbar {
  background-color: #eeeeee;
  width: 200px;
  .tabbar {
    &__wrap {
      display: flex;
      .tabbar__item {
        text-align: center;
        width: 50%;
        &--selected {
          color: #f66;
        }
      }
    }
    &__line {
      position: relative;
      left: 0;
      transition: 1s;
    }
  }
}
</style>
