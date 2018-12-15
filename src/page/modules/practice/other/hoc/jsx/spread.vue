<script>
export default {
  name: 'sync',
  render() {
    const obj = {
      class: ['sync__class1', 'sync__class2']
    }
    const obj2 = {
      test: ['test1', 'test2']
    }
    return <div {...obj} {...obj2} />
  }
}
</script>
