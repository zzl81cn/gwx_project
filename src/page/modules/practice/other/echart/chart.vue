<template>
  <div class="chart">
    <div @click="onButtonClick">按钮</div>
    <div ref="scroll"
      class="chart__move"
      @touchmove="onTouchMove">
      <div ref="child"
        class="move__child"
        :style="{width:AllLength + 'px'}">
        <div v-for="(item,index) in chartList"
          :key="index"
          class="child__wrap"
          @click="onSelectDateClick(index)">
          <div class="child__chart"
            :class="{'child__chart--white':selectIndex === index||clickIndex===index}"
            :style="{height:item/maxStep*180+'px'}"></div>
          <div class="child__date"
            :class="{'child__date--blue':selectIndex === index||clickIndex===index}">{{dateList[index]}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const singleWidth = 38
const duration = 100
export default {
  name: 'chart',
  computed: {
    AllLength() {
      const result =
        this.currentLength > this.screenWidth
          ? this.currentLength
          : this.screenWidth
      return result
    },
    currentLength() {
      return singleWidth * this.chartList.length
    },
    moveLength() {
      return this.AllLength - this.screenWidth
    },
    selectIndex() {
      if (this.isCenter) {
        return parseInt(
          (this.scrollLength + this.screenWidth / 2) / singleWidth
        )
      } else {
        return -1
      }
    },
    maxStep() {
      let max = 0
      this.chartList.forEach(number => {
        max = number > max ? number : max
      })
      return max
    }
  },
  data() {
    return {
      screenWidth: 0,
      scrollLength: 0,
      chartList: [
        115,
        52,
        55,
        44,
        45,
        115,
        52,
        55,
        44,
        45,
        115,
        52,
        55,
        44,
        45
      ],
      dateList: [
        '12/1',
        '12/2',
        '12/3',
        '12/4',
        '12/5',
        '12/2',
        '12/1',
        '12/2',
        '12/2',
        '12/1',
        '12/2',
        '12/1',
        '12/2',
        '12/1',
        '12/2'
      ],
      scrollListenHandle: () => {
        console.log('正在滚动')
        this.scrollLength = this.$refs.scroll.scrollLeft
      },
      isCenter: false,
      clickIndex: -1,
      currentLeft: 0,
      speed: 0
    }
  },
  mounted() {
    // console.log('body : ' + document.body.offsetWidth)
    // console.log('screen : ' + screen.width)
    this.screenWidth = screen.width
    if (this.currentLength) {
      this.$refs.scroll.addEventListener('scroll', this.scrollListenHandle)
    }
  },
  methods: {
    onButtonClick() {
      this.chartList.push(15, 15, 2, 121, 1)
    },
    onTouchMove() {
      this.isCenter = true
      this.clickIndex = -1
    },
    update() {
      this.rAF = setInterval(() => {
        const time = new Date() - this.startTime
        this.$refs.scroll.scrollLeft = time * this.speed + this.currentLeft
        if (time > duration) {
          clearInterval(this.rAF)
        }
      })
    },
    onSelectDateClick(index) {
      this.clickIndex = index
      console.log('正在点击')

      this.isCenter = false
      // if (index * singleWidth - this.screenWidth / 2 > this.moveLength) {
      //   return
      // }
      const targetLeft = index * singleWidth - this.screenWidth / 2
      this.currentLeft = this.$refs.scroll.scrollLeft
      this.speed = (targetLeft - this.currentLeft) / duration
      this.startTime = new Date()
      this.update()
    }
  },
  watch: {
    chartList: {
      handler(newArray) {
        console.log(newArray)
      },
      deep: true
    },
    'chartList.length'(newArray) {
      this.$refs.scroll.removeEventListener('scroll', this.scrollListenHandle)
      console.log(this.$refs.scroll.addEventListener)

      console.log(1111, newArray)
    }
  },
  destroyed() {
    this.$refs.scroll.removeEventListener('scroll', this.scrollListenHandle)
  }
}
</script>

<style lang='scss' scoped>
.chart {
  &__move {
    width: 100%;
    height: 239px;
    background: linear-gradient(180deg, #4c76ae 0, #16b1ff 100%);
    overflow-x: scroll;
    overflow-y: hidden;
    &::-webkit-scrollbar {
      display: none;
    }
    .move {
      &__child {
        display: flex;
        white-space: nowrap;
        align-items: flex-end;
        height: 100%;
        .child {
          &__wrap {
            display: flex;
            flex-wrap: wrap;
            width: 38px;
          }
          &__chart {
            margin-left: 1px;
            width: 37px;
            background-color: rgba(255, 255, 255, 0.6);
            transition: 0.01s;
            &--white {
              background-color: #fff;
            }
          }
          &__date {
            padding: 3px 0;
            font-size: 12px;
            width: 38px;
            background-color: #eee;
            color: #999;
            text-align: center;
            &--blue {
              color: #16b1ff;
            }
          }
        }
      }
    }
  }
}
</style>
