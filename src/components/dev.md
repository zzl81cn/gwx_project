## 前言

由于公司业务周期较短，时常是几个项目一起做，或是加上 bug 修复。上午的时候接到个任务，正式上的网站发现如下图的错误。
![表头错误](https://user-gold-cdn.xitu.io/2018/11/14/1671245114bcdf47?w=1237&h=284&f=png&s=41974)

## 问题原因

找到项目中对应页面，很快发现了问题，原来之前的哥们通过定义了个数组，通过序号来取对应的中文。这样的方式缺点很明显，个数有限。导致现在出现不够用的状况。
![](https://user-gold-cdn.xitu.io/2018/11/14/16711f846129fc28?w=358&h=319&f=png&s=7068)
![](https://user-gold-cdn.xitu.io/2018/11/14/16711f7754cdac99?w=500&h=73&f=png&s=7979)

## 解决方式

经过考虑觉得可以抽出一个公共的方法代码如下：

```
/**
 * 根据输入的数字返回对应是中文，格式如：三十一
 *  @param {Number} index 序号
 */
export function covertNumberTochinese(index) {
  const multiple = parseInt((index + 1) / 10)
  const remainder = (index + 1) % 10
  const weekheadNum = [
    '一',
    '二',
    '三',
    '四',
    '五',
    '六',
    '七',
    '八',
    '九',
    '十'
  ]
  let text = ''
  const textMap = new Map([
    [/^1_[0-9]$/, () => `十${weekheadNum[remainder - 1]}`],
    [/^1_0$/, () => `十`],
    [
      /^[2-9]_[1-9]$/,
      () => `${weekheadNum[multiple - 1]}十${weekheadNum[remainder - 1]}`
    ],
    [/^[2-9]_0$/, () => `${weekheadNum[multiple - 1]}十`],
    [/^0_\w/, () => `${weekheadNum[remainder - 1]}`]
  ])
  const textList = [...textMap].filter(([reg]) => {
    return reg.test(multiple + '_' + remainder)
  })
  textList.forEach(([reg, callBack]) => {
    text = callBack()
  })
  return text
}
```

1. multiple 用来判断有几个 10,remainder 表示余几。
2. 这里使用 Map 数据结构的原因是因为将对象作为键名，这样可以将正则与函数关联起来。
3. 使用正则匹配，可以匹配多种情况，使用正则的 test 方法来校验是否匹配成功。

### 　需要用到的知识点

1. new Map([['键名':'键值']])
2. ... 扩展运算符 遍历 Iterator 接口(这里是 Map)
3. [reg] = [/^1\_[0-9]\$/, () => \`十\${weekheadNum[remainder - 1]}\`] 数组结构赋值

### 分析

1. covertNumberTochinese 函数接受一个数值，对数值进行取余 remainder(用来当作个位数)和商取整的 multiple(用来当作十位数)。
2. 将个位数十位数拼接成用\_相连的字符串，然后用正则取匹配这个字符串。然后两个中文字拼接起来。
3. 需要注意的是当 multiple 为 1，remainder 为 0 时本应该返回'十零'但是我们习惯不是注意的叫法，多加一个判断条件。
4. 判断下 remainder(个位数)为 0 时，省去'几十零'后面的零

## 小结

用上面的方法可以将数字匹配到中午 1-99 位，虽然项目中是够用了，但是局限性还是很大，而且判断的条件很多，逻辑不直观。

## 寻求其他解决方案

```
/**
 * 根据输入的数字返回对应是中文，格式如：一千零一
 *  @param {Number|String} index 序号或者数字开头的字符串
 */
  export numberToChinese(number) {
      number = String(parseInt(number))
      const ChineseText = '零一二三四五六七八九'
      const smallUnit = '十百千'
      const length = number.length
      let n = length - 2
      let string = ''
      for (var i = 0; i < length; i++) {
        let num = number.charAt(i)
        string += ChineseText.charAt(num)
        string += num > 0 ? smallUnit.charAt(n) : ''
        n--
      }
      return string
    }
```

### 分析

1. 首先将传入的数字取整处理，然后将其转换成字符串，为了是使用字符串的`.charAt`方法取对应位数的中文。
2. 定义好中文的 0-9,以及单位'十百千' (为了简单起见，只讨论`四位数以下`的转换，位数增加方法是类似的)
3. 定义好 string 是最终返回的中文字符串，是通过`拼接`的方式得到一个中文的数字，这里 n 代表取第几位单位也就是取`smallUnit`的第几位

#### 循环体中做的事

1. 去除 number(也就是数字字符串如 1001)的第一位，就是数字 1 类型是 string 类型，然后通过这个 1 取`ChineseText`中的中文得到中文的一
2. 然后通过 n 取一对应的单位，这里 n=length-2 是因为再定义单位时是`从十开始`的而不是从个位数开始，并且.charAt(0)`取的是字符串的第一位`。并且当数字为零的时候不需要单位，所以加了 num > 0 的限定条件。

### 完善

就此数字转换成中文的方法就写完了，在浏览器中打印如下
![1001](https://user-gold-cdn.xitu.io/2018/11/15/16715924041ee308?w=349&h=65&f=png&s=1083)
有多个零的时候我们习惯是一千零一，并且结尾为零的时候是省略的 所以
我们还得对返回的 string 做一下去零处理

```
/**
 * 根据输入的字符串返回按照规则去零后的字符串，格式如：一千零一
 *  @param {string} str 中文数字 如 一千零零一
 */
export clearZero(str){
    const regMiddle = /零{2}/g
    const regEnd = /零?零$/
    str = str.replace(regMiddle, '零')
    return str.replace(regEnd, '')
}
```

1. 通过 clearZero 函数首先将匹配中间有两个零相连的情况，转为一个零
2. 然后判断结尾是否有一个至两个零的情况，将它们清空
3. 注意点: replace 不会改变原来的值，需要将操作后的结果重新赋值

将 numberToChinese 函数改为如下

```
export numberToChinese(number) {
      number = String(parseInt(number))
      const ChineseText = '零一二三四五六七八九'
      const smallUnit = '十百千'
      const length = number.length
      let n = length - 2
      let string = ''
      for (var i = 0; i < length; i++) {
        let num = number.charAt(i)
        string += ChineseText.charAt(num)
        string += num > 0 ? smallUnit.charAt(n) : ''
        n--
      }
      return  clearZero(string)
    }
```

## 总结

1. 四位数以下的数字转换成中文的方法已经完成了 ，更多位数的转换原理相同，有个方法就是将多位数的数字截取成 四位为一组，分组处理，最后将结果拼接起来，这样可能会减少一些逻辑判断。
2. 核心部分就是通过`charAt`取数字字符串，然后通过数组去找定义好的 ChineseText 对应的中文，定义了一个`n`来取当前位数对应的单位

## 留言区的意见

首先感谢大家在留言区发表自己宝贵的意见，能抛砖引玉让大家分享自己工作经验
以下代码截取 **@皈依佛门小前端**在留言区的评论

```
function chin(str){
  let cnChar  = "零壹贰叁肆伍陆柒捌玖",
    partInt = '元拾佰仟万拾佰仟亿拾佰仟',
    len = str.length-1,
    arr = new Array((len+1)),
    i=0;
  str.replace(/\d/g, n => {
    let b = partInt.charAt(len-i);
    arr[i] = cnChar.charAt(n) + (n==='0' && '元万亿'.indexOf(b) < 0 ? '' : b);
    i++;
  });
  return arr.join('').replace(/(零)\1+/g,'零').replace(/零(十|百|千|万|亿|元)/g, value => value.replace(/零/, ''));
}
```

接下来分析下以上代码

1. 思路也是定义好数字和单位，通过取好数字以及对应的单位拼接成一个字符串
2. 介绍下 str.replace(regexp, callback=>{ //...}) 第一次参数接受正则规则，匹配成功后将会被替换成第二参数，也就是函数的返回值。该函数的 callback 值为匹配成功的字符串。
3. 如果第一个参数是正则表达式， 并且其为全局匹配模式， 那么这个方法将被多次调用， 每次匹配都会被调用

![结果](https://user-gold-cdn.xitu.io/2018/11/16/1671a5f10358eecf?w=387&h=80&f=png&s=4282)
试着输入 111010 看下 len，arr，return 之前的 arr 各是什么  
可以看到 **@皈依佛门小前端**的思路是:将每项的`数值以及单位`作为一项，最后通过`数组join`的方法全部拼接在一起。然后进行`去零处理`。

### 关键代码

```
let b = partInt.charAt(len-i);
arr[i] = cnChar.charAt(n) + (n==='0' && '元万亿'.indexOf(b) < 0 ? '' : b)
```

1. 首先知道 cnChar.charAt(n)就是通过数字序号取到的中文数字，然后拼接上 b 也就是取到的单位。
2. 在拼接之前做了判断如果是 0 的情况,判断下是否在个位，万位，和亿位上，否则省略单位，也就是当数字为零时只有这些位上有单位。
3. 通过正则匹配的方式去掉零。

### 运行结果

![结果](https://user-gold-cdn.xitu.io/2018/11/16/1671a697a5c0b079?w=308&h=65&f=png&s=3552)
可以看到已经成功将数字转换成中文，但是一十一的读法不符合我们的习惯

### 参考意见改进

效果如下：
![](https://user-gold-cdn.xitu.io/2018/11/16/1671a778585ca879?w=245&h=84&f=png&s=1986)

```
/**
 * 根据输入的数字返回对应是中文，格式如：一千零一
 *  @param {Number|String} index 序号或者数字开头的字符串
 */
  export numberToChinese(number) {
      number = String(parseInt(number))
      const ChineseText = '零一二三四五六七八九'
      const unit = '十百千万十百千亿十百千'
      const length = number.length
      let n = length - 2
      let string = ''
      for (var i = 0; i < length; i++) {
        let num = number.charAt(i)
        let currentUnit = unit.charAt(n)
        string += ChineseText.charAt(num)
        // 通过下面这步相当于将字符串分割成四位一组，因为每四位都会有一个单位，所以零不可能相连超过两个了。
        string +=
          num === '0' && '万亿'.indexOf(currentUnit) < 0 ? '' : currentUnit
        n--
      }
      return this.clearZero(string)
    }
```

```
/**
 * 根据输入的字符串返回按照规则去零后的字符串，格式如：一千零一
 *  @param {string} str 中文数字 如 一千零零一
 */

export clearZero(str){
     const regMiddle = /零{2}/g
      const regEnd = /零?零$/
      const regTen = /一十/g
      str = str.replace(regMiddle, '零')
      str = str.replace(regTen, '十')
      return str.replace(regEnd, '')
}
```
