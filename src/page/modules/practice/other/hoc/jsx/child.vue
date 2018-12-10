<script>
export default {
  name: 'child',
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      number: 999
    }
  },
  render(h) {
    return <div>{this.name}</div>
  },
  methods: {}
}
</script>

<style lang='scss' scoped>
</style>
