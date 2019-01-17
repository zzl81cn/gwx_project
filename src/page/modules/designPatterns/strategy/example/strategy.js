import {isMobilePhone} from 'validator/index.js'
import {isValidID} from '../../../utils/identification'
// 校验策略类
const strategy = {
  handle: {
    hasValue(value, {errMsg}) {
      if (!value) {
        return errMsg
      }
    },
    minLength(value, {errMsg, param}) {
      if (value.length < param) {
        return errMsg
      }
    },
    isMobile(value, {errMsg}) {
      if (!isMobilePhone(value, ['zh-CN'])) {
        return errMsg
      }
    },
    isIdCard(value, {errMsg}) {
      console.log(value, 'value', isValidID(value, 'any'))
      if (!isValidID(value, ['ES'])) {
        return errMsg
      }
    }
  },
  // 规则类
  rule: {
    agency: [
      {
        name: 'minLength',
        errMsg: '机构名称长度不能小于6位!',
        param: 6
      }
    ],
    code: [],
    legalName: [],
    id: [
      {
        name: 'isIdCard',
        errMsg: '请输入正确的身份证号'
      }
    ],
    contactName: [],
    phone: [
      {
        name: 'isMobile',
        errMsg: '请输入正确的手机号'
      }
    ],
    adrress: []
  }
}
// 给每项都设置为必填项
function require(rule, errMsg) {
  for (let type in rule) {
    rule[type].unshift({
      name: 'hasValue',
      errMsg: errMsg
    })
  }
}
export const validatorValue = function (errMsg, validator, value) {
  // 给每项都添加必填规则
  require(strategy.rule, errMsg)
  const errList = strategy.rule[validator]

  // 校验规则
  for (let err of errList) {
    const result = strategy.handle[err.name](value, err)
    // 如果有值则返回第一个错误值
    if (result) {
      return result
    }
  }
}
