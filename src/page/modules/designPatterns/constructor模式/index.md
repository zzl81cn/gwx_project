* JavaScript一门不支持 class 这个概念，但是它支持对象的构造函数，通过关键字 new 我们想要一个构造函数创建一个对象和它用函数定义的成员。constructor的内部，this 关键字是被创建的新对象的引用。
## new运算符的缺点
1. 用构造函数生成实例对象，有一个缺点，那就是无法共享属性和方法。
## prototype属性的引入
* 这个属性包含一个对象（以下简称"prototype对象"）当我们用contructor创建一个对象，所有constructor的 prototype上的属性都将被新对象继承。
* 相同的放在prototype中,不同的放在constructor构造函数中