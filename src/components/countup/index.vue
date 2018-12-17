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
    start: {
      type: Boolean,
      default: true
    },
    startVal: {
      type: Number,
      default: 800
    },
    endVal: {
      type: Number | String,
      required: true
    },
    // number of decimal places in number
    decimals: {
      type: Number,
      default: 0
    },
    // duration in seconds
    duration: {
      type: Number,
      default: 2
    }
  },
  data() {
    return {}
  },

  methods: {
    onPauseResumeClick() {
      this._countup.pauseResume()
    }
  },
  render(h) {
    return h('span', {}, [this.startVal])
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
