<template>
  <div>
    <div @click="onStartClick">生成一个promise接收一个函数作为入参</div>
    <div @click="onChangeClick">转为Promise对象</div>
    <div @click="onFnClick">fn</div>
    <div @click="dish(0)">dish</div>
  </div>
</template>

<script>
export default {
  name: '',

  data() {
    return {
      thenable: {
        then: function(resolve, reject) {
          console.log('执行then')
          // resolve('菜已做好')
          reject('菜已做好')
        }
      },
      disheList: [
        { name: 'fish', time: 1 },
        { name: 'fish1', time: 2 },
        { name: 'fish3', time: 10 }
      ]
    }
  },

  methods: {
    dish(i) {
      this.promise(i)
        .then(k => {
          return this.promise(k)
        })
        .then(j => this.promise(j))
    },
    promise(i) {
      return new Promise((resolve, reject) => {
        const f = () => {
          console.log(this.disheList[i].name, this.disheList[i].time)
          if (i < 3) {
            i++
            resolve(i)
          }
        }
        setTimeout(f, this.disheList[i].time)
      })
    },
    onFnClick() {
      console.log(
        Promise.resolve(this.fn).then(data => {
          console.log(data)
          data('传入fn的值')
        })
      )
    },
    fn(data) {
      setTimeout(() => {
        console.log(data)
      }, 2000)
    },
    // 将现有对象转为Promise对象
    changeToPromise(data) {
      console.log('传入对象:', data)
      console.log('转为Promise对象后:', Promise.resolve(data))
      Promise.resolve(data)
        .then(res => {
          console.log('转为Promise的then输出:' + res)
        })
        .catch(error => {
          console.log('错误是:' + error)
        })
    },
    onChangeClick() {
      // 目标对象为Promise类型
      // this.changeToPromise(this.step('step对象'))
      // 目标对象为thenable类型
      this.changeToPromise(this.thenable)
      // 目标对象为其他类型
      // this.changeToPromise(5555)
    },
    baomu(data) {
      return this.step('开始', '做法啦')
    },
    step(step, data) {
      return new Promise((resolve, reject) => {
        resolve(`${step}${data}`)
      })
    },
    onStartClick() {
      this.baomu()
        .then(data => {
          console.log(data)
          return this.step('第一步', '烧水')
        })
        .then(data => {
          console.log(data)
          return this.step('第二步', '煮螃蟹')
        })
        .then(data => {
          console.log(data)
        })
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
