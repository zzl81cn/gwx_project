- [Sass 制作 Font Awesome 图标实现按需开启需要的图标。](https://www.qdskill.com/sass/3912.html)

![](https://user-gold-cdn.xitu.io/2018/12/26/167eb267a7ba99c9?w=1340&h=742&f=png&s=173022)
一个页面的颜色,布局等样式会因为不同开发者展现出不同的样式。然而开发过程中需要我们保持统一的风格。例如:我常使用的 vux。接下来我们来看看如何统一配置 UI 组件样式。

## vux 定义的样式

我们打开 vux 源码 根据 vux/src/styles/variable.less 路径找到定义样式的文件。也可以直接打开[github 地址](https://github.com/airyland/vux/blob/v2/src/styles/variable.less)查看。
![](https://user-gold-cdn.xitu.io/2018/12/26/167eb324c59f493d?w=1272&h=528&f=png&s=116666)
vux 中使用的是 less 文件直接在文件中定义变量及对应的颜色。我们选中@theme-color 发现有 17 处引用,说明定义的主题色只是改变了这 17 处组件的样式。其他的样式都在 variable.less 中有自己默认定义的颜色。

思路： 介绍 vux 修改主题色 -> 如何写处自己的样式 -> sass 语法 -> font 引入
