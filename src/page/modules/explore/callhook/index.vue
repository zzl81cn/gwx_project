<template>
  <div id="app">
    <router-view/>
    <div ref="head"
      class="app__header"
      @click="onDestoryClick">{{title}}</div>
  </div>
</template>

<script>
export default {
  name: 'callHook',
  data() {
    return {
      title: '标题'
    }
  },
  methods: {
    onDestoryClick() {
      this.$destroy()
    }
  },
  beforeCreate() {
    console.log(
      `\n\nbeforeCreate打头\n$el    :${this.$el}\n$data     :${JSON.stringify(
        this.$data
      )}\n$refs.head   :${JSON.stringify(
        this.$refs.head
      )}\nbeforeCreate结尾\n\n`
    )
  },
  created() {
    console.log(
      `\n\ncreated打头\n$el    :${this.$el}\n$data     :${JSON.stringify(
        this.$data
      )}\n$refs.head   :${JSON.stringify(this.$refs.head)}\ncreated结尾\n\n`
    )
  },
  beforeMount() {
    console.log(
      `\n\nbeforeMount打头\n$el    :${this.$el}\n$data     :${JSON.stringify(
        this.$data
      )}\n$refs.head   :${JSON.stringify(this.$refs.head)}\nbeforeMount结尾\n\n`
    )
  },
  mounted() {
    console.log(
      `\n\nmounted打头\n$el    :${this.$el}\n$data     :${JSON.stringify(
        this.$data
      )}\n$refs.head   :${JSON.stringify(this.$refs.head)}\nupdated结尾\n\n`
    )
  },
  updated() {
    console.log(
      `\n\nupdated打头\n$el    :${this.$el}\n$data     :${JSON.stringify(
        this.$data
      )}\n$refs.head   :${JSON.stringify(this.$refs.head)}\nupdated结尾\n\n`
    )
  },
  destroyed() {
    console.log(
      `\n\ndestroyed打头\n$el    :${this.$el}\n$data     :${JSON.stringify(
        this.$data
      )}\n$refs.head   :${JSON.stringify(this.$refs.head)}\ndestroyed结尾\n\n`
    )
  }
}
</script>

<style>
</style>
