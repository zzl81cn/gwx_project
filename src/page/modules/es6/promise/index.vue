<template>
  <div>
    <div @click="onStartClick">生成一个promise</div>
    <div @click="onCreateClick">转为Promise对象</div>
    <div @click="onFnClick">fn</div>
    <div @click="onDishCreateClick(0)">依次生成菜名</div>
    <div @click="onPromiseRaceClick(0)">PromiseRace</div>
    <dir @click="onGeneratorClick">next执行</dir>
    <dir @click="onAsyncClick">asyncDelayLog</dir>
  </div>
</template>

<script>
import { delayLog, asyncDelayLog } from './generator.js'
import { getPromise, MyPromise } from './create.js'
export default {
  name: 'promise',

  data() {
    return {
      gen: {},
      thenable: {
        then: function(resolve, reject) {
          console.log('执行then')
          // resolve('菜已做好')
          resolve('菜已做好')
        }
      },
      disheList: [
        { name: 'fish', time: 1 },
        { name: 'fish1', time: 2 },
        { name: 'fish3', time: 1 }
      ],
      iteratorFn: () => {},
      arr: [12, 15],
      p1: new Promise(function(resolve, reject) {
        let fn = a => {
          console.log('p1执行了')
          resolve(a)
        }
        setTimeout(fn, 500, 'P1')
      }),
      fnc() {
        console.log('fnc')

        return 15
      }
    }
  },

  methods: {
    onAsyncClick() {
      asyncDelayLog()
    },
    onGeneratorClick() {
      setTimeout(() => {
        this.gen.next()
      }, 1000)
    },
    onPromiseRaceClick() {
      let newPromise = Promise.all([this.p1, this.fnc])
      console.log(
        'newPromise',
        newPromise
          .then(() => {
            console.log('success')
          })
          .catch(() => {
            console.log('error')
          })
      )
    },
    createGenerator() {
      this.iteratorFn = function* generator(arr) {
        for (let i = 0; i < arr.length; i++) {
          yield arr[i]
        }
      }
    },
    // 创建一个遍历器
    createIterator(arr) {
      this.iteratorFn = function iterator(arr) {
        let iteratorIndex = 0
        return {
          next() {
            if (iteratorIndex < arr.length) {
              return {
                // 先去arr中第iteratorIndex位数组项然后++
                value: arr[iteratorIndex++],
                done: false
              }
            } else {
              return {
                done: true
              }
            }
          }
        }
      }
    },
    onDishCreateClick(i) {
      this.createPromise(i)
        /**
         *
         */
        .then(i => {
          return this.createPromise(i)
        })
        .then(i => this.createPromise(i))
    },
    createPromise(i) {
      /**
       *  Promise构造函数 接受一个函数作为参数
       *  函数的两个参数分别是 resolve 和 reject来控制成功回调和失败
       * */
      return new Promise((resolve, reject) => {
        let timeOut = parseInt(Math.random() * 2 * 1000)
        const f = () => {
          console.log(
            'dish 名称 :',
            this.disheList[i].name,
            '\n',
            'time : ',
            timeOut
          )
          i++
          resolve(i)
        }
        /**
         * 实例化Promise对象时会立即注册 setTimeout 异步事件
         * 在 setTimeout 函数中执行时会通过 resolve 将成功结果输出
         */
        setTimeout(f, timeOut)
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
    onCreateClick() {
      new MyPromise(function(resolve, reject) {
        setTimeout(() => {
          resolve('异步后的值')
        }, 1000)
      }).then(data => {
        console.log(data)
      })
    },
    step(step, data) {
      return new Promise((resolve, reject) => {
        resolve(`${step}${data}`)
      })
    },
    onStartClick() {
      getPromise().then(data => {
        console.log(data)
      })
    }
  },
  created() {
    this.gen = delayLog()
  }
}
</script>

<style lang='scss' scoped>
</style>
