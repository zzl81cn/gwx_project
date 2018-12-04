## 定义

高阶组件是一个方法，这个方法接收一个原始组件作为参数，并返回新的组件

## 使用方法

路由配置中，使用页面组件的地方引入并使用了 hoc

## 和 mixin 的优势

- 减少对原始组件的入侵，降低耦合。HOC 中，原始组件只用考虑自身逻辑，不用考虑，也感知不到 HOC 对它做了什么。而 mixin，组件在内部需要使用 mixin 的计算属性（更复杂的 mixin 还会用到生命周期和 methods 方法）.
- 权限控制方便集中管理，直接在 routes 配置中管理各个页面配置，而不是分散在各个页面组件内部。
- 避免命名冲突。如果页面自己有自己内部的权限控制，刚好也有个 computed 属性叫 hasRight 呢？在 HOC 下没问题，但 mixin 就不行了。

## [参考](https://github.com/vuejs/vue/issues/6201)

[使用案例](https://github.com/ktsn/vuex-connect)
[jsx 转换](https://github.com/vuejs/babel-plugin-transform-vue-jsx#usage)
