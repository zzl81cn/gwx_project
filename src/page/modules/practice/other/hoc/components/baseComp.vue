<template>
  <div>
    <span @click="handleClick">props: {{prop}}</span>
    <slot name="test"></slot>
    ============
    <slot></slot>
  </div>
</template>

<script>
import mixin from './mixins.js'
export default {
  name: 'BaseComponent',
  mixins: [mixin],
  props: {
    test: Number
  },
  data() {
    return {
      prop: ''
    }
  },
  methods: {
    handleClick() {
      this.prop++
      this.$emit('customize-click', this.prop)
    }
  },
  created() {
    this.prop = this.test
    console.log(this.$listeners, 'create')
  }
}
</script>
