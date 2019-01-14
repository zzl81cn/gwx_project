 [面向对象语言的特性](https://github.com/lvzhenbang/article/blob/master/design-pattern/oop-js.md)
 ### 多态
 1. 将可变的部分与不可变的部分分离开来（对象拥有相同的类型，都有相同的方法，接受相同的调用，却返回不同的结果）
 ```
var robotA = {
	dance: function() {
		console.log('robtA')
	}
};

var robotB = {
	dance: function() {
		console.log('robtB')
	}
}

var robotAction = function(robot) {
	if(robot.dance instanceof Function)
	robot.dance()
}

robotAction(robotA); // robtA
robotAction(robotB); // robtB
 ```
 * 我们对函数发起调用时，函数会返回不同的结果，这是多态的一种体现，也是很多设计模式能被高阶函数代替实现的原因。
 ### 封装