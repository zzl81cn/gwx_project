const strategies = {
  isNotEmpty(value, errMsg) {
    if (!value) {
      return errMsg
    }
  },
  minLength(value, errorMsg, length) {
    if (value.length < length) {
      return errorMsg
    }
  }
}
/**
 * @param dom
 * @param ruleList 规则列表 格式为: {strategy:'isNotEmpty',errorMsg:'用户名不能为空!',param:'入参'}
 */
class Vaildator {
  constructor() {
    this.ruleList = []
  }
  add(value, ruleList) {
    for (let rule of ruleList) {
      const { strategy, errorMsg, param } = rule
      this.ruleList.push(() => {
        return strategies[strategy](value, errorMsg, param)
      })
    }
  }
  start() {
    for (let validatorFunc of this.ruleList) {
      let errorMsg = validatorFunc()
      if (errorMsg) {
        return errorMsg
      }
    }
  }
}
export default Vaildator
