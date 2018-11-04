<template>
  <div>
    <input v-model.number.trim="text"
      type="text"
      @input="onTextInput"> {{text}}
    <br>
    <input v-model="checkbox"
      type="checkbox"
      true-value="yes"
      false-value="no"
      @input="onTextInput"
      @change="onCheckboxChange"> {{checkbox}}
    <br>
    <textarea v-model="textarea"
      @input="onTextInput"></textarea>
    {{textarea}}<br>
    <select v-model="selected"
      @input="onTextInput">
      <option disabled
        value="">请选择</option>
      <option>A</option>
      <option>B</option>
      <option>C</option>
    </select>
    {{ selected }}
    <br>
    <input type="radio"
      v-model="radio"
      value="radio"
      @input="onTextInput"> {{radio}}
  </div>
</template>

<script>
export default {
  name: 'inputHtml',
  data() {
    return {
      text: '',
      checkbox: true,
      textarea: '',
      selected: '',
      radio: ''
    }
  },

  methods: {
    onTextInput(event) {
      console.log(`${event.srcElement.type}变成了${event.target.value}`)
    },
    onCheckboxChange(event) {
      console.log(event.target.value)
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
