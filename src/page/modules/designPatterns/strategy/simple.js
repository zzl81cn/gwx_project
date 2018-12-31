const strategies = {
  isNotEmpty(value, { errorMsg }) {
    if (!value) {
      return errorMsg
    }
  },
  minLength(value, { errorMsg, param }) {
    if (value.length < param) {
      return errorMsg
    }
  }
}
function validator(value, ruleList) {
  for (let rule of ruleList) {
    const { strategy } = rule
    const message = strategies[strategy](value, rule)
    if (message) {
      return message
    }
  }
}
export default validator

// class Vaildator {
//   constructor() {
//     this.ruleList = []
//   }
//   set(value, fnc, err) {
//     return strategies[fnc](value, err)
//   }
// }
