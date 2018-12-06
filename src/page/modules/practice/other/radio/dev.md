## [参考](http://www.cnblogs.com/Being-a-runner-up/p/5713787.html)

## radio 使用

- name： 用于定义同一类型的 radio 同一 name 的 radio 只能选中一个(单选实现)

* id： 用于和 label 标签关联起来 实现点击 label 标签内的元素也能选中 radio
* value：单选按钮的值，选中某个单选按钮相当于拿到 value 值 tip：用于识别组中的哪个单选按钮被选中。
* checked 用于设置默认选中的 radio
* v-model 创建双向数据绑定。 会忽略所有表单元素的 value、checked、selected 特性的初始值而总是将 Vue 实例的数据作为数据来源。
* 用 v-mode 绑定的值和 value 绑定的值对比来确定是否为 checked 状态

```
// html
 <div v-for="day in weekSelectList"
    :key="day.id"
    class="select__day">
    <input type="radio"
      name="week"
      :id="day.label"
      :value="day.value"
      v-model="selectedDay">
    <label :for="day.label">{{day.label}}({{day.value}})</label>
  </div>
```

```
// js
data(){
  return {
  weekSelectList: [
      { label: '周一', value: '2018-12', id: 1 },
      { label: '周二', value: '2018-13', id: 2 },
      { label: '周三', value: '2018-14', id: 3 },
      { label: '周四', value: '2018-15', id: 4 },
      { label: '周五', value: '2018-16', id: 5 }
    ]
  },
  selectedDay: '2018-12',
}
```

通过 v-model 绑定 selectedDay，匹配到相同的值会将该 radio 选中,当改变 radio 的选择，selectedDay 也会动态的变更成选中的 radio 的 value

## 上传按钮实现 file

### 缺点

1. 在未上传文件时，显示"未选择文件"，用户界面不友好，不可配置
2. 同一个文件名即使内容改变了，重新上传也不会触发 change 事件
3. 用户如果在上传过程中点击了“取消”，已经上传的文件会被移除

### 解决

- accept 属性接受一个(多个值时)逗号分隔的字符串 如:accept="image/png, image/jpeg"

* 注意：accept 属性并不会验证选中文件的类型只是在用户浏览时只显示指定文件类型

```
  <div class="upload__button"
    :class="{'upload__button--uploaded':isUploaded}"
    @click="onUploadClick">点击上传</div>
  <input type="file"
    class="upload__file"
    v-el:upload
    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
    @change="onFileChange" />
```

```
methods:{
  onUploadClick() {
    if (!this.isUploaded) {
      this.$els.upload.click()
    }
  },
  onFileChange(e) {
  const file = e.target.files[0]
  if (file === undefined) {
    return
  }
  this.fileName = file.name
  const result = /[xls|xlsx]$/.test(this.fileName)
    if (result) {
      this.isUploaded = true
      this.showAlert('上传成功')
      this.$els.upload.value = null
    } else {
      this.showAlert('文件格式错误，请确认后重试。')
    }
  },
}
```

当点击上传按钮触发 onUploadClick 事件后，获取到 upload 绑定的 DOM (由于是老的项目使用的是$els,vue2 使用 ref)手动触发 click 事件

可以看到 change 事件的返回值包含着文件属性，我们需要判断是文件名是否为 excel，使用正则的 test 方法，如果有则给相应的提示信息。并在结尾 this.$refs.uploadFile.value = null; 移除文件，可以保证上传同样的文件时，也会触发 change 事件
