function teacher () {
  let school = {}
  return class {
    constructor(id, name) {
      if (school.id) {
        return school.id
      }
      this.id = id
      this.name = name
      school.id = this
    }
    startClass() {
      return `老师为${this.name}ID 为${this.id}即将开课`
    }
  }
}

export default class Learn {
  constructor(time, id, name) {
    this.time = time
    this.teacher = new (teacher())(id, name)
  }
  getInfo() {
    return this.time + this.teacher.startClass()
  }
}
