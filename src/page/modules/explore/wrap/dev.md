## 换行文字的保存和输出
在使用textarea文本域时可通过添加换行如下
![](https://user-gold-cdn.xitu.io/2019/1/25/16885968667fafd5?w=561&h=111&f=png&s=3812)
当我们重新后台拿到保存的数据后发现数据格式如下。

![](https://user-gold-cdn.xitu.io/2019/1/26/16887b23abe0325b?w=726&h=33&f=png&s=2716)
看到数据中的箭头感觉怪怪的,怎么还会有这个玩意，不管怎么样将数据打印出来看看
```
  created() {
    console.log(
      'start' + '-'.repeat(15),
      this.growthData.teacherComment,
      '-'.repeat(15) + 'end'
    )
  }
```
![](https://user-gold-cdn.xitu.io/2019/1/26/16887bd020a4fdce?w=668&h=49&f=png&s=2489)原来箭头的地方就是换行，而且在打印出来的数据中已经实现了换行的效果。
## 实现换行
结合上面的结果,我直接将数据丢到标签里
```
<span>{{growthData.teacherComment}}</span>
```

![](https://user-gold-cdn.xitu.io/2019/1/26/16887c402e9d6e02?w=530&h=49&f=png&s=4762)
发现并没有实现换行。
![](https://user-gold-cdn.xitu.io/2018/12/20/167cc4616eeb8e71?w=264&h=191&f=jpeg&s=5421)
那看到打印台中的数据为什么会有换行的效果，我试了如下代码
```
/\n/.test(growthData.teacherComment) //true
/\r/.test(growthData.teacherComment) //false
```
原因是在textarea中输入回车换行再存入数据库时，这些回车换行符是以/r/n的形式存入数据库的，取出来也同样，但是到页面时html是无法将/r/n当换行处理的。
### 解决方式
在后台从数据库取出数据的时候将/r/n转换成\<br\/>
```
/**
 * 函数的功能是将 \n,\r用 <br/>替代
 * @param {String} str  传入的字符串
 * @returns {String} 返回替换后的字符串
*/
function replaceWithBr(str) {
  return str ? str.replace(/\n|\r/g, '<br/>') : ''
}
```
* 将字符串中的\n,\r都替换成了'\<br/>'本质上还是字符串，`{{}}文本插值插值`的方式是无法识别出'\<br/>'是字符串还是换行符。  
* 需要使用`v-html按普通 HTML `插入
```
  <span v-html="replaceWithBr(growthData.teacherComment)"></span>
```
这个 span 的内容将会被替换成为属性值 `replaceWithBr(growthData.teacherComment)的返回值`，直接作为 HTML——会忽略解析属性值中的数据绑定。
## 换行和段落效果
文字正常换行和段落换行的间隙是不相同的，来看下图效果。`1处`表示正常的文字换行，`2处`表示段落之间的换行。我们需要将两者的差别体现出来。
![](https://user-gold-cdn.xitu.io/2019/1/26/1688800b2cf9384d?w=781&h=157&f=png&s=36057)
### 想法
* `1处`的换行实现有两种方式
    * 文字外部标签如span设置好宽度，当文字宽度超过设置的宽度自动会换行
    * 手动设置一行需要显示字数，超过字数后在后面拼接一个\<br\/>
* `2处`的换行可以在需要换行的文字外部添加\<p>标签包裹实现段落间距
### 实现及效果
```
/**
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

```

![](https://user-gold-cdn.xitu.io/2019/1/26/1688829b53cd9b28?w=589&h=223&f=png&s=42939)
需要注意的是如果需要给`p标签`添加样式需要在往函数中传入style样式对象，这里我也设置了默认的样式对象。有人会向使用class定义样式可以吗，答案是否定的，原因引用官网的话如下:

## 换行文字的保存和输出
在使用textarea文本域时可通过添加换行如下
![](https://user-gold-cdn.xitu.io/2019/1/25/16885968667fafd5?w=561&h=111&f=png&s=3812)
当我们重新后台拿到保存的数据后发现数据格式如下。

![](https://user-gold-cdn.xitu.io/2019/1/26/16887b23abe0325b?w=726&h=33&f=png&s=2716)
看到数据中的箭头感觉怪怪的,怎么还会有这个玩意，不管怎么样将数据打印出来看看
```
  created() {
    console.log(
      'start' + '-'.repeat(15),
      this.growthData.teacherComment,
      '-'.repeat(15) + 'end'
    )
  }
```
![](https://user-gold-cdn.xitu.io/2019/1/26/16887bd020a4fdce?w=668&h=49&f=png&s=2489)原来箭头的地方就是换行，而且在打印出来的数据中已经实现了换行的效果。
## 实现换行
结合上面的结果,我直接将数据丢到标签里
```
<span>{{growthData.teacherComment}}</span>
```

![](https://user-gold-cdn.xitu.io/2019/1/26/16887c402e9d6e02?w=530&h=49&f=png&s=4762)
发现并没有实现换行。
![](https://user-gold-cdn.xitu.io/2018/12/20/167cc4616eeb8e71?w=264&h=191&f=jpeg&s=5421)
那看到打印台中的数据为什么会有换行的效果，我试了如下代码
```
/\n/.test(growthData.teacherComment) //true
/\r/.test(growthData.teacherComment) //false
```
原因是在textarea中输入回车换行再存入数据库时，这些回车换行符是以/r/n的形式存入数据库的，取出来也同样，但是到页面时html是无法将/r/n当换行处理的。
### 解决方式
在后台从数据库取出数据的时候将/r/n转换成\<br\/>
```
/**
 * 函数的功能是将 \n,\r用 <br/>替代
 * @param {String} str  传入的字符串
 * @returns {String} 返回替换后的字符串
*/
function replaceWithBr(str) {
  return str ? str.replace(/\n|\r/g, '<br/>') : ''
}
```
* 将字符串中的\n,\r都替换成了'\<br/>'本质上还是字符串，`{{}}文本插值插值`的方式是无法识别出'\<br/>'是字符串还是换行符。  
* 需要使用`v-html按普通 HTML `插入
```
  <span v-html="replaceWithBr(growthData.teacherComment)"></span>
```
这个 span 的内容将会被替换成为属性值 `replaceWithBr(growthData.teacherComment)的返回值`，直接作为 HTML——会忽略解析属性值中的数据绑定。
## 换行和段落效果
文字正常换行和段落换行的间隙是不相同的，来看下图效果。`1处`表示正常的文字换行，`2处`表示段落之间的换行。我们需要将两者的差别体现出来。
![](https://user-gold-cdn.xitu.io/2019/1/26/1688800b2cf9384d?w=781&h=157&f=png&s=36057)
### 想法
* `1处`的换行实现有两种方式
    * 文字外部标签如span设置好宽度，当文字宽度超过设置的宽度自动会换行
    * 手动设置一行需要显示字数，超过字数后在后面拼接一个\<br\/>
* `2处`的换行可以在需要换行的文字外部添加\<p>标签包裹实现段落间距
### 实现及效果
```
/**
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

```

![](https://user-gold-cdn.xitu.io/2019/1/26/1688829b53cd9b28?w=589&h=223&f=png&s=42939)
需要注意的是如果需要给`p标签`添加样式需要在往函数中传入style样式对象，这里我也设置了默认的样式对象。有人会向使用class定义样式可以吗，答案是否定的，原因引用官网的话如下:
>  在单文件组件里，scoped 的样式不会应用在 v-html 内部，因为那部分 HTML 没有被 Vue 的模板编译器处理。如果你希望针对 v-html 的内容设置带作用域的 CSS，你可以替换为 CSS Modules 或用一个额外的全局 \<style> 元素手动设置类似 BEM 的作用域策略。

## 指定单行文字数换行

```

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
```







