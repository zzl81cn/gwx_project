- [Sass 制作 Font Awesome 图标实现按需开启需要的图标。](https://www.qdskill.com/sass/3912.html)

![](https://user-gold-cdn.xitu.io/2018/12/26/167eb267a7ba99c9?w=1340&h=742&f=png&s=173022)
一个页面的颜色,布局等样式会因为不同开发者展现出不同的样式。然而开发过程中需要我们保持统一的风格。例如:我常使用的 vux。接下来我们来看看如何统一配置 UI 组件样式。

## vux 定义的样式

我们打开 vux 源码 根据 vux/src/styles/variable.less 路径找到定义样式的文件。也可以直接打开[github 地址](https://github.com/airyland/vux/blob/v2/src/styles/variable.less)查看。
![](https://user-gold-cdn.xitu.io/2018/12/26/167eb324c59f493d?w=1272&h=528&f=png&s=116666)
vux 中使用的是 less 文件直接在文件中定义变量及对应的颜色。我们选中@theme-color 发现有 17 处引用,说明定义的主题色只是改变了这 17 处组件的样式。其他的样式都在 variable.less 中有自己默认定义的颜色。

### 修改主题

主题色修改暂时只支持配合 vux-loader 使用,需要注意的是 vux 中使用的是 less 我们还需要安装 less-loader

1. vux yarn add vux 安装
2. yarn add vux-loader -D
3. yarn add less-loader -D
4. 也可以通过 yarn add vux-loader less-loader -D 同时安装多个

   安装好依赖后我们开始定义主题颜色,以 x-button 为例
   ![](https://user-gold-cdn.xitu.io/2018/12/27/167ee062d47108d9?w=1282&h=739&f=png&s=107490)
   来的 vux 官网下的样式变量这里提供了可以修改按钮样式的变量。也可以到 vux/src/styles/variable.less 源码中去查看。在修改之前查看下 vux 自定义的主题颜色
   ![](https://user-gold-cdn.xitu.io/2018/12/27/167ee0b837d92ce8?w=380&h=167&f=png&s=4344)
   新建一个 vux.less 文件定义样式如下

```
// vux种定义的类名,更改原本vux的颜色
@button-primary-bg-color: #2f7dcd;
@button-primary-active-bg-color: #1e5da6;
@button-primary-disabled-bg-color: #80ade4;
@button-default-bg-color: #666;
@button-default-active-bg-color: #777;
@button-default-disabled-bg-color: #999;
@button-warn-bg-color: #fcd;
@button-warn-active-bg-color: #dad;
@button-warn-disabled-bg-color: #dcd;
```

在 build/webpack.base.conf.js 文件中

```
module.exports = vuxLoader.merge(webpackConfig, {
  plugins: [
    {
      name: 'vux-ui'
    },
    {
      name: 'less-theme',
      path: 'src/styles/vux.less'
    }
  ]
})
```

![](https://user-gold-cdn.xitu.io/2018/12/27/167ee0fb3c4f2e77?w=383&h=164&f=png&s=4398)

webpack 中 plugins 需要填什么
思路： 介绍 vux 修改主题色 -> 如何写处自己的样式 (介绍常用样式，省略 ... ,过渡效果高度)-> sass 语法 -> font 引入
