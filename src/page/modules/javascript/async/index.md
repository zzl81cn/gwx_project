## 浏览器
* 览器下次重绘前执行回调函数。回调的次数通常是每秒60次 `60 fps转换为每帧16.7ms`
* requestAnimationFrame没有指定间隔率。那么draw函数调用的频率是多少？这一切都取决于您的浏览器和计算机的帧速率，但通常是60fps。
## requestAnimationFrame(callback) 
* requestAnimationFrame() 方法告诉浏览器您希望执行动画并请求浏览器在下一次重绘之前调用指定的函数来更新动画。
* 自带函数节流功能 基本可以保证在 16.6 毫秒内只执行一次
* 循环的loop函数不能带参数，因为requestAnimationFrame不会带参数，如果需要参数需要使用闭包，将参数都存储在父级作用域的变量中。包括一些公共的方法，如果写在loop函数中会造成每次调用创建。
* 将所有动画组合成一个浏览器重绘。这样可以节省CPU周期
### 使用注意点
1. 将requesAnimationFrame写在循环的最上面更好
## What’s wrong with setTimeout and setInterval?
1. 当浏览器中页面tab隐藏时，requestAnimationFrame会暂停执行，等到页面被选中时会重新启动 而setTimeout和setInterval还会继续执行
2. 动画帧速率与屏幕的重绘不同步，浏览器必须在重绘整个屏幕的同时重新绘制动画
