<script>
import Nav from './components/nav.js'
console.log(Nav)

export default {
  name: 'class',
  computed: {
    title() {
      return '数字：' + this.number
    }
  },
  data() {
    return {
      number: 0,
      name: 'Vue-Jsx'
    }
  },

  methods: {
    onNumberChange(e) {
      this.number = e.target.value
    },
    changeNameHandle(value) {
      this.name = value
    }
  },
  render() {
    return (
      <div className="class">
        <header>{this.title}</header>
        <input
          type="number"
          value={this.number}
          onInput={this.onNumberChange.bind(this)}
        />
        <Nav
          changeNameHandle={this.changeNameHandle.bind(this)}
          name={this.name}
        />
      </div>
    )
  }
}
</script>

<style lang='scss' scoped>
</style>
