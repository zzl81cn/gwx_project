<script>
export default {
  data() {
    return {
      tagList: ['标签1', '标签2', '标签3'],
      value: ''
    }
  },
  props: {
    type: {
      type: String,
      default: ''
    },
    guan: {
      type: String,
      default: ''
    }
  },
  methods: {
    click() {
      // console.log('点击')
      this.$emit('jsx', '接收值')
    },
    inputChange(value) {
      this.$emit('input', value.target.value)
    },
    changeName(name) {
      this.$emit('update:guan', name.target.value)
    }
  },
  render() {
    const obj = {
      class: ['aa', 'bb']
    }
    const handle = {
      on: {
        change() {
          console.log('change')
        },
        blur() {
          console.log('blur')
        },
        input() {
          console.log('input')
        }
      }
    }
    return (
      <div class="wrap" {...obj}>
        {this.tagList.filter(item => {
          return <div>{item}</div>
        })}
        <h1 v-show={false}>12</h1>
        {this.type === 'admin' ? <h1> admin </h1> : <h1> other </h1>}
        <input {...handle} />
        名字
        <input on-input={this.changeName} />
      </div>
    )
  }
}
</script>
<style>
.tag__wrap {
  width: 200px;
  display: flex;
  justify-content: space-between;
  margin: 10px;
}
</style>
