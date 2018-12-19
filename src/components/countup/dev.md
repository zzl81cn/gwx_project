## 描述

1.  实现数字跳动功能 、 可设置 起始结束值、保留位数 、过渡时间、是否可以暂定跳动

## 实现思路

1.通过 vue 数据双向绑定的特性 使用 setInterval 改变数字的同时 view 层也会跟着改变

## 属性

| 参数      | 说明         | 类型            | 默认值 |
| --------- | ------------ | --------------- | ------ |
| tag       | 标签名       | String          | 'span' |
| start     | 是否开始     | Boolean         | true   |
| startVal  | 起始值       | Number / String | 0      |
| endVal    | 结束值       | Number /String  | -      |
| decimals  | 几位小数     | Number          | 2      |
| duration  | 过渡时间     | Number          | 2 (s)  |
| isRestart | 是否可以暂停 | Boolean         | false  |
