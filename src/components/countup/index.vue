<script>
import CountUp from './countup.js'
export default {
  name: 'countup',
  mounted() {
    this.$nextTick(() => {
      this._countup = new CountUp(
        this.$el,
        this.startVal,
        this.endVal,
        this.decimals,
        this.duration
      )
      if (this.start) {
        this._countup.init()
      }
    })
  },
  props: {
    tag: {
      type: String,
      default: 'span'
    },
    start: {
      type: Boolean,
      default: true
    },
    startVal: {
      type: Number | String,
      default: 0
    },
    endVal: {
      type: Number | String,
      required: true
    },
    decimals: {
      type: Number,
      default: 2
    },
    duration: {
      type: Number,
      default: 2
    },
    isRestart: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      times: 0
    }
  },
  methods: {
    onPauseResumeClick() {
      if (this.isRestart) {
        if (this.times === 0) {
          this._countup.pauseResume()
          this.times++
        } else {
          this._countup.restart()
          this.times = 0
        }
      }
    }
  },
  render(h) {
    return h(
      this.tag,
      {
        on: {
          click: this.onPauseResumeClick
        }
      },
      [this.startVal]
    )
  },
  watch: {
    start(val) {
      if (val) {
        this._countup.init()
      }
    },
    endVal(val) {
      this._countup.updateNew(this.endVal)
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
