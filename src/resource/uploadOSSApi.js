import callApi from './api.js'
import moment from 'moment'
// 本地文件信息hashkey，成功回调，进度条，失败回调
export function callUploadApi(localfile, success, progress, fail = ret => {}) {
  // api 是 用户获取 '签名和Policy' 等信息的应用服务器
  callApi({
    api: 'base_config_getOSSPolicyAndSignature',
    param: {}
  }).then(data => {
    console.log(data, '上传的回调')
    processUpoadFile(localfile, data, success, progress, fail)
  })
}
// 处理客服端传输的文件1 文件hashkey 2 直接传输至OSS
function processUpoadFile(localfile, ossParam, success, progress, fail) {
  doUploadFileToOss(localfile, ossParam, getUuid(), success, progress, fail)
}

function getUuid() {
  let chars = 'abcdef0123456789'
  let maxPos = chars.length
  let id = ''
  for (let i = 0; i < 3; i++) {
    // 取三位随机数拼接成id
    id += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  // 返回值作为hash值
  return `${moment().format('YYYYMMDDHHmmss')}${id}`
}
// 上传至OSS
function doUploadFileToOss(
  localfile,
  ossParam,
  filehashkey,
  success,
  progress,
  fail
) {
  // uploadType image   OR  multiple æ¹éå¤ç
  const bucket = ossParam.bucket
  const OSSAccessKeyId = ossParam.OSSAccessKeyId
  const policyvalue = ossParam.policy
  const signaturevalue = ossParam.signature
  // 默认文件类型为jpg类型
  let fileType = 'jpg'
  // 文件名 如：icon-step2.png
  let fileName = localfile.name
  if (fileName) {
    fileName = replaceOSSInvaildSymbol(fileName)
  }
  const fileNameIndex = fileName.indexOf('.')
  if (fileNameIndex > 0) {
    const list = fileName.split('.')
    fileType = list[list.length - 1]
  }
  const ossParams = {
    // 文件名(不包含'.'及之后的文件类型)拼接上hash，拼接上文件类型  效果如:   icon-step1_20181127143434c73.png 9999
    key:
      fileName.substring(0, fileNameIndex) + '_' + filehashkey + '.' + fileType,
    OSSAccessKeyId: OSSAccessKeyId,
    policy: policyvalue,
    signature: signaturevalue,
    // 201(已创建)请求成功并且服务器创建了新的资源
    success_action_status: '201'
  }

  // 处理入参 使用FormData对象格式化入参
  const formatParams = new FormData()
  for (let key in ossParams) {
    formatParams.append(key, ossParams[key])
  }
  formatParams.append('file', localfile)

  const ajax = new XMLHttpRequest()
  // 进度
  ajax.upload.onprogress = function(progressEvent) {
    if (progressEvent.type === 'progress') {
      // 计算进度
      const percent = Math.round(
        (progressEvent.loaded / progressEvent.total) * 100,
        2
      )
      // 执行传入的进度函数
      progress && progress(percent)
    }
  }
  // 上传结果
  ajax.onreadystatechange = function() {
    if (ajax.readyState === 4) {
      // 这里如果成功返回的是 success_action_status设置的值
      if (ajax.status === 201) {
        const resXML = ajax.responseText
        console.log('服务器响应参数:' + resXML)
        let callback = process(success, fail)
        callback(parserXML(resXML))
      } else {
        console.log('上传失败')
      }
    }
  }
  // 创建http请求参数 (提交方式，提交的地址)
  ajax.open('POST', bucket)
  // ajax.setRequestHeader('Content-type', 'multipart/form-data')
  ajax.send(formatParams)
}
// 处理XML转化后的响应参数
const process = (successCall, failCall) => {
  return datas => {
    try {
      if (datas.code === 200) {
        successCall(datas.url)
      } else {
        if (failCall === undefined) {
        } else {
          failCall(datas.msg)
        }
      }
    } catch (e) {
      console.log(
        'uploadOSSApi 服务器返回结果发生错误=' + JSON.stringify(datas)
      )
      if (failCall !== undefined) {
        failCall({
          code: '505',
          msg: '返回值json解析错误：' + e + ',服务器返回结果：' + datas
        })
      }
    }
  }
}
// 对上传文件的名做安全处理
function replaceOSSInvaildSymbol(path) {
  if (typeof path === 'string') {
    // 当文件中包含如下字符时会上传错误，要进行替换。
    ;['s', '+', '(', ')', '（', '）'].forEach(item => {
      path = path.replace(new RegExp(`\\${item}`, 'g'), '')
    })
    return path
  }
  return path
}
// 将XML格式转为一个对象
function parserXML(xml) {
  let xmlDoc
  if (window.DOMParser) {
    // DOMParser接口提供了将XML或HTML源代码从字符串解析为DOM的功能Document
    const parser = new DOMParser()
    // 使用parser接口将XML解析为指定文本
    xmlDoc = parser.parseFromString(xml, 'text/xml')
  }
  const bucket = xmlDoc.getElementsByTagName('Bucket')[0].childNodes[0]
    .nodeValue
  const location = xmlDoc.getElementsByTagName('Location')[0].childNodes[0]
    .nodeValue
  return {
    url: location,
    Bucket: bucket,
    code: 200,
    message: 'sucess'
  }
}
