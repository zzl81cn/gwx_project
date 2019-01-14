## 单例模式使用场景
1. 线程池、全局缓存 只需要一个的对象，我们的实现往往使用单例。
## 实现单例模式 
```
class Single{
  constructor(){
    // 存储对象
    this.instance = {}
  }
  getInstance(name){
    // 判断是否有实例
    if(this.instance.name){
      return this.instance.name
    }else{
      // 创建实例并且储存在对象中
      this.instance.name = new name()
      return this.instance.name 
    }
  }
}

```