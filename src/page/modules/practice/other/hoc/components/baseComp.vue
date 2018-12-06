<template>
  <div>
    <span @click="handleClick">props: {{test}}</span>
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
  methods: {
    handleClick() {
      this.$emit('customize-click')
    }
  }
}
</script>
