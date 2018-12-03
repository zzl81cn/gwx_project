<script>
export default {
  created() {
    console.log('混入')
  },
  data() {
    return {
      message: '点击上传',
      picList: []
    }
  },
  methods: {
    onButtonClick(value) {
      this.picList.push(value)
      console.log(this.picList)
    }
  }
}
</script>
