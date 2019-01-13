## 简单工厂模式
1. 有很多基本的类
2. 由工厂方法来根据传参不同实例化不同的类实例
```
var FootBall = function  () {
    this.play = function () {
        console.log('我在踢足球');
    }
}

/**
 * 篮球类
 */
var BasketBall = function  () {
    this.play = function () {
        console.log('我在打篮球');
    }
}
class Ball {
  construct(name){
    switch (name) {
        case '足球':
            return new FootBall();
        break;
        case '篮球':
            return new BasketBall();
        break;
    }
  }
}

```
## 工厂方法模式
class Ball{
  consturctor(name){
    this[name]()
  }
  basketBall() {
       this.price = 15
  },
  footBall() {
       this.price = 25
  },
  badmintonBall() {
       this.price = 35
  }
}
* 使用工厂方法模式优点是在系统中加入新产品时，无须修改抽象工厂和抽象产品提供的接口，无须修改客户端，只要添加一个具体工厂和具体产品就可以了
## 抽象工厂模式