/**
 * 使用v-html会识别<br/> {{}}内无法识别
 * v-html="" 绑定'' undefined
 * 函数的功能是将 \n 用 p 标签替代
 * @param {String} str  传入的字符串
 * @returns {String} 返回替换后的字符串
*/
export function replaceBreakWithPTag(str, style) {
  if (!str) {
    return ''
  } else {
    style = style || 'style="text-indent: 2em; margin: 10px 0;"'
    str = `<p ${style}>` + str
    return str.replace(/\n|\r/g, `</p><p ${style}>`)
  }
}

/**
 * 实现文本换行和段落换行，需指定当行文本长度
 * @param {String} str  传入的字符串
 * @param {Number} length 当行文本长度
 * @param {String} style p标签的行内样式
 * @returns {String} 返回替换后的字符串
*/
export function wrapTextNumber(str, length, style) {
  if (!str) {
    return ''
  } else {
    // 每个段落的字符串
    let resultList = []
    // 通过\n标志将字符串分段
    let phaseList = phaseWrapList(str)
    // 对每个段落内的文字进行换行转换
    phaseList.forEach(item => {
      resultList.push(line(item, length, style))
    })
    // 将所有段落整合成一个字符串
    return resultList.join('')
  }
}

// 以\n,\r作为标志将文本切割成多个段落
function phaseWrapList(str, length, style) {
  let phaseList = []
  let strLenth = str.length
  for (let i = 0, j = 0; i < strLenth; i++) {
    if (str[i] === '\n' || str[i] === '\r' || i === strLenth - 1) {
      phaseList.push(str.substr(j, i))
      j = i
    }
  }
  return phaseList
}
// 对每个段落进行单行文字数限制
function line(str, lineTextLength = 15, style) {
  style = style || 'style="text-indent: 2em; margin: 10px 0;"'
  let newString = ''
  let listLength = Math.ceil(str.length / lineTextLength)
  for (var i = 0; i < listLength; i++) {
    newString += str.substring(i * lineTextLength, (i + 1) * lineTextLength) +
        '<br/>'
  }
  return `<p ${style}>${newString}</p>`
}

/**
 * 通过DOM直接复制文字
 * @param {DOM} target 需要复制到目标DOM
 * @param {Function} callback 可选参数
 */
export function copyText (target, callback) {
  // 设定复制内容到范围
  const range = document.createRange();
  range.selectNode(target);
  // 选中需要复制到内容(相当于手动选中文字)
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    selection.removeAllRanges()
  }
  selection.addRange(range)
  // 执行复制
  document.execCommand('copy');
  // 删除选中内容
  selection.removeAllRanges()
  callback && callback()
}

/**
 *
 * @param {String} value 需要被复制到文本
 */
export function copyContent(value) {
  var temp = document.createElement('input')
  temp.setAttribute('value', value)
  document.body.appendChild(temp)
  temp.select()
  document.execCommand('copy')
  document.body.removeChild(temp)
}
