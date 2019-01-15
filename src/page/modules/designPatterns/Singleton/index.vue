<template>
  <div class="step-history">
    <div class="step-history__chart">
      <div ref="scroll"
        class="chart__move"
        @touchmove="onTouchMove">
        <div ref="child"
          class="move__child"
          :style="{width:AllLength + 'px'}">
          <div v-for="(item,index) in seriesDataList"
            :key="index"
            class="child__wrap"
            @click="onSelectDateClick(index)">
            <div class="child__chart"
              :class="{'child__chart--white':selectIndex === index||clickIndex===index}"
              :style="{height:item/maxStep*180+'px'}"></div>
            <div class="child__date"
              :class="{'child__date--blue':selectIndex === index||clickIndex===index}">{{dateList[index]}}</div>
          </div>
          <div class="child__fill"></div>
        </div>
      </div>
    </div>
    <div class="step-history__detail">
      <div class="detail__step">
        <img class="step__icon"
          src="http://static.weixiaotong.com.cn/icon/icon-steps.png">
        <div class="step__wrap">
          <span class="step__number">
            {{currentSteps}}
          </span>
          <span class="step__text">
            步
          </span>
        </div>
      </div>
      <div class="detail__energy">
        <div class="energy__item">
          <img class="item__icon"
            src="http://static.weixiaotong.com.cn/icon/icon-distance.png">
          <span class="item__text">{{getNumber(braceletDataList[currentIndex]&&braceletDataList[currentIndex].distance)}}
          </span>
          <span class="item__unit">{{getUnit(braceletDataList[currentIndex]&&braceletDataList[currentIndex].distance,'米','公里')}}</span>
        </div>
        <div class="energy__item">
          <img class="item__icon"
            src="http://static.weixiaotong.com.cn/icon/icon-energy.png">
          <span class="item__text">
            {{getNumber( braceletDataList[currentIndex]&&braceletDataList[currentIndex].consume)}}
          </span>
          <span class="item__unit">{{getUnit(braceletDataList[currentIndex]&&braceletDataList[currentIndex].consume,'卡','千卡')}}</span>
        </div>
      </div>
    </div>
    <div class="step-history__switch">
      <div class="switch__wrap">
        <div class="switch__button">
          <div class="button__item"
            :class="{'button__item--daily':isDaily}"
            @click="onDailyClick">每日</div>
          <div class="button__item"
            :class="{'button__item--month':!isDaily}"
            @click="onMonthClick">每月</div>
        </div>
        <div ref="mark"
          class="switch__mark"
          :class="[isDaily?'switch__mark--daily':'switch__mark--month']"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { module } from '../../../store/modules/index'
import moment from 'moment'
import { SingleScroll } from './singleScroll'
import Debounce from './debounce.js'
const singleWidth = 38
const duration = 100
export default {
  name: 'braceletStepHistory',
  computed: {
    ...mapState(module.USER, {
      userid: state => state.sessionUserInfo.userid,
      campusid: state => state.sessionUserInfo.campusid,
      userType: state => state.sessionUserInfo.currentUsertype
    }),
    AllLength() {
      const result =
        this.currentLength > this.screenWidth
          ? this.currentLength
          : this.screenWidth
      return result
    },
    currentSteps() {
      return (
        this.braceletDataList[this.currentIndex] &&
        this.braceletDataList[this.currentIndex].steps
      )
    },
    isLowerThousand() {
      const distance =
        this.braceletDataList[this.currentIndex] &&
        this.braceletDataList[this.currentIndex].distance
      return distance < 1000
    },
    currentConsume() {
      const consume =
        this.braceletDataList[this.currentIndex] &&
        this.braceletDataList[this.currentIndex].consume
      return consume > 1000 ? consume.toFixed(0) + '千卡' : consume + '卡'
    },
    currentLength() {
      return singleWidth * this.seriesDataList.length
    },
    moveLength() {
      return this.currentIndex * singleWidth + 5
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
      this.seriesDataList.forEach(number => {
        max = number > max ? number : max
      })
      return max
    }
  },
  data() {
    return {
      braceletDataList: [],
      type: 'DAY',
      screenWidth: 0,
      scrollLength: 0,
      seriesDataList: [],
      dateList: [],
      scrollListenHandle: () => {
        console.log(this.$refs.scroll.scrollLeft)
        if (this.isCenter) {
          this.scrollLength = this.$refs.scroll.scrollLeft
          this.currentIndex = parseInt(
            (this.scrollLength + this.screenWidth / 2) / singleWidth
          )
          if (
            this.scrollLength < 10 &&
            this.braceletDataList.length < this.count
          ) {
            this.reFindHistoryStep()
          }
        }
      },
      isCenter: false,
      clickIndex: -1,
      currentLeft: 0,
      speed: 0,
      studentId: 0,
      currentIndex: 0,
      pageIndex: 1,
      pageSize: 365,
      count: 0,
      isDaily: true,
      instance: () => {}
    }
  },
  created() {},
  mounted() {
    this.$setTitle('今日步数')
    this.instance = new SingleScroll(this.$refs.scroll, this.handle, 'scroll')
    this.instance.handle()
    this.screenWidth = screen.widthtim
    this.reFindCurrentStudentId()
  },
  methods: {
    handle() {
      const instance = new Debounce(this.scrollListenHandle)
      instance.cache(2000)
    },
    onDailyClick() {
      if (!this.isDaily) {
        this.initData()
        this.type = 'DAY'
        this.isDaily = true
        this.reFindHistoryStep()
      }
    },
    onMonthClick() {
      if (this.isDaily) {
        this.initData()
        this.type = 'MONTH'
        this.isDaily = false
        this.reFindHistoryStep()
      }
    },
    getUnit(number, unit1, unit2) {
      return number > 1000 ? unit2 : unit1
    },
    getNumber(number) {
      return number > 1000 ? (number / 1000).toFixed(1) : number
    },
    reFindCurrentStudentId() {
      this.$callApi({
        api: 'base_stu_getCurrentStu',
        param: {
          campusid: this.campusid,
          userid: this.userid
        }
      }).then(data => {
        this.studentId = data.id
        this.reFindHistoryStep()
      })
    },
    reFindHistoryStep() {
      this.$callApi({
        api: 'attendance_bracelet_listByDateType',
        param: {
          campusid: this.campusid,
          dateType: this.type,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          braceletUserid: this.studentId,
          braceletUsertype: this.userType
        }
      }).then(data => {
        this.dateList.unshift(
          ...data.xAxisData.map(item => {
            if (this.type === 'DAY') {
              return moment(item).format('MM/DD')
            } else {
              return moment(item).format('MM')
            }
          })
        )
        this.seriesDataList.unshift(...data.seriesData)
        this.braceletDataList.unshift(...data.braceletData)
        this.count = data.count
        this.$nextTick(() => {
          this.$refs.scroll.scrollLeft =
            this.seriesDataList.length * singleWidth
          this.clickIndex = this.seriesDataList.length - 1
          this.currentIndex = this.seriesDataList.length - 1
        })
        this.pageIndex++
      })
    },
    initData() {
      this.seriesDataList = []
      this.braceletDataList = []
      this.dateList = []
      this.pageIndex = 1
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
      this.currentIndex = index
      this.isCenter = false
      if (index * singleWidth - this.screenWidth / 2 > this.moveLength) {
        return
      }
      const targetLeft = index * singleWidth - this.screenWidth / 2
      this.currentLeft = this.$refs.scroll.scrollLeft
      this.speed = (targetLeft - this.currentLeft) / duration
      this.startTime = new Date()
      this.update()
    }
  },
  watch: {
    'braceletDataList.length'(newLength) {
      this.instance.handle(newLength < 108)
    }
  }
}
</script>

<style lang='scss' scoped>
.step-history {
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
            &__fill {
              flex-grow: 1;
              height: 25px;
              background-color: #eee;
            }
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
  &__detail {
    background-color: #fff;
    .detail {
      &__step {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 140px;
        color: #333333;
        border-bottom: 1px solid #e5e5e5;
        .step {
          &__icon {
            width: 17px;
            height: 24px;
          }
          &__number {
            font-size: 38px;
          }
          &__text {
            font-size: 16px;
          }
        }
      }
      &__energy {
        position: relative;
        display: flex;
        border-bottom: 1px solid #e5e5e5;
        &:after {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          width: 1px;
          height: 100%;
          background-color: #e5e5e5;
        }
        .energy {
          &__item {
            line-height: 140px;
            width: 50%;
            text-align: center;
            .item {
              &__icon {
                width: 11px;
                height: 17px;
              }
              &__text {
                color: #333;
                font-size: 38px;
              }
            }
          }
        }
      }
    }
  }
  &__switch {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    bottom: 0;
    height: 58px;
    border-top: 1px solid #f2f2f2;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.05);
    background-color: #fff;
    .switch {
      &__wrap {
        position: relative;
        width: calc(100% - 105px);
        height: 34px;
        background-color: #f2f2f2;
        border: 1px solid #f2f2f2;
        border-radius: 16.5px;
        overflow: hidden;
      }
      &__button {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        .button {
          &__item {
            pointer-events: relative;
            z-index: 9999;
            color: #666;
            width: 50%;
            text-align: center;
            &--daily {
              color: #2f7dcd;
            }
            &--month {
              color: #2f7dcd;
            }
          }
        }
      }
      &__mark {
        position: absolute;
        top: 0;
        left: 0;
        width: 50%;
        height: 100%;
        border-radius: 16.5px;
        background-color: #fff;
        transition: 0.5s;
        &--daily {
          left: 0;
        }
        &--month {
          left: 50%;
        }
      }
    }
  }
}
</style>
