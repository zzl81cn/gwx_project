## 引入

在 src 目录中创建 resource 目录，创建 api.js 文件用来封装 axios

```
import axios from 'axios';
import qs from 'qs'; // 用来序列化post类型的数据，后面会提到
```

## 运行环境

```
- axios.defaults.baseURL = `${window.location.origin}/api/pc/`
```

window.location.origin 获取到当前环境 ('/'前面的 url)当前环境可能为本地,测试,demo,正式环境这样可以动态匹配对应的 baseURL

- baseURl 当 url 为相对路径的情况下,url 将拼接在 baseURl 所以 axios 实例可以避免先重复的 baseURl 部分。

* post 请求方法 Content-Type 使用
