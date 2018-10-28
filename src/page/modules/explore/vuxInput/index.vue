<template>
  <div class="vux-input">
    <x-input class="vux-input__name"
      title="名字"
      placeholder="I'm placeholder"></x-input>
  </div>
</template>

<script>
import { XInput } from 'vux'
export default {
  name: '',
  components: { XInput },
  data() {
    return {}
  },

  methods: {}
}
</script>

<style>
.vux-input__name {
  width: 200px;
  border: 1px solid #000;
}
</style>
