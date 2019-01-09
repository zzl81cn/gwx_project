// 构建享元对象
class Teacher {
  constructor(id, name) {
    this.ID = id
    this.name = name
  }
}

// 构建享元工厂
class CreateTeacher {
  constructor(id, name) {
    // 判断学校对象下id对应的老师是否存在
    if (this.id) {
      return this.id
    }
    // 创建一个老师
    this.id = new Teacher(id, name)
  }
  startClass() {
    return `老师为${this.id.name}ID 为${this.id.ID}即将开课`
  }
}

// 管理外部状态
class Learn {
  constructor(time, id, name) {
    this.time = time
    this.teacher = new CreateTeacher(id, name)
  }
  getInfo() {
    return this.time + this.teacher.startClass()
  }
}
export default Learn
