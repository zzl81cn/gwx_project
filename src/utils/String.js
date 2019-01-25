/**
 * 使用v-html会识别<br/> {{}}内无法识别
 * v-html="" 绑定'' undefined
 * 函数的功能是将 \n 用 p 标签替代
 * @param {String} str  传入的字符串
 * @returns {String} 返回替换后的字符串
*/
export function replaceBreakWithPTag(str) {
  if (!str) {
    return ''
  } else {
    str = '<p>' + str
    return str.replace(/\n|\r/g, '</p><p>')
  }
}
