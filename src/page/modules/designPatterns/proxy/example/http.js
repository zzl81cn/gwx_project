// 防抖
class ProxyHttp {
   cacheList = []
   timer
   syncFile(id) {
     console.log('开始同步文件 id为:' + id);
   }
   proxyFile(id) {
     // 可以不断添加id进来
     this.cacheList.push(id)
     // 两秒内只生成一个定时器执行
     if (this.timer) {
       return
     }
     console.log(this.timer, 'start');
     this.timer = setTimeout(() => {
       // 将两秒内收集到的统一指向同步文件
       this.syncFile(this.cacheList.join())

       // 并且清除定时器初始化
       clearTimeout(this.timer)
       this.timer = null
       this.cacheList.length = []
     }, 2000)
     console.log(this.timer, 'end');
   }
}
export default ProxyHttp
