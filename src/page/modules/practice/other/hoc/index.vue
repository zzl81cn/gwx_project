<script>
export default {
  name: 'jsxOa',

  data() {
    return {
      homeworkList: [],
      colorList: [
        '#88AEFF',
        '#AB8FFD',
        '#FFC44F',
        '#BBDC02',
        '#FF9ED5',
        '#02DCA2',
        '#F0A882',
        '#88D4FF',
        '#E98FFD',
        '#FF9962',
        '#76DC02',
        '#FF9E9E',
        '#00D6DD',
        '#FF7979',
        '#6C98FF',
        '#FFBB7C',
        '#FF7B52',
        '#00DF8D',
        '#78BFFE',
        '#00C8FF',
        '#D389FD'
      ],
      isTeacher: false
    }
  },

  methods: {
    reFindHomeWorkList() {
      this.$callApi({
        api: 'homework_work_listByStuid',
        param: {
          campusid: 1615,
          pageIndex: 1,
          pageSize: 10,
          userid: 1045637,
          stuid: 1561247441
        }
      }).then(data => {
        this.homeworkList = data.homeworkList
      })
    },
    getColor(index) {
      return this.colorList[index % this.colorList.length]
    },
    onSubjectClick({ title, courseName }) {
      console.log(`课程标题 ${title} 课程名${courseName}`)
    }
  },
  render() {
    return (
      <div class="jsx-oa">
        {this.homeworkList.map((item, index) => {
          return (
            <div
              class="list__homework"
              onClick={this.onSubjectClick.bind(this, item)}
            >
              <div
                class="homework__subject"
                style={{
                  backgroundColor: Reflect.apply(this, index)
                }}
              >
                {item.courseName.slice(0, 1)}
              </div>
              <div class="homework__wrap">
                <div class="homework__detail">
                  <div class="detail__header">学科: {item.courseName}</div>
                  <div class="detail__state">{item.title}</div>
                  {this.isTeacher ? (
                    <div class="detail__work">
                      <span>
                        已交:
                        <span class="work__finish">
                          {item.submit + item.correct}
                        </span>
                      </span>
                      <span class="work__teacher">
                        已批:
                        {item.correct}
                      </span>
                    </div>
                  ) : (
                    <div class="detail__class">
                      <span class="class__name">班级: {item.className}</span>
                      <span class="class__teacher">
                        老师：
                        {item.publisherName}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  },
  created() {
    this.reFindHomeWorkList()
  }
}
</script>

<style lang='scss'>
.list {
  &__homework {
    display: flex;
    margin-top: 10px;
    align-items: center;
    height: 91px;
    padding: 0 10px 0 15px;
    background-color: rgba(250, 0, 0, 0.1);
    .homework {
      &__subject {
        margin-right: 15px;
        width: 50px;
        height: 50px;
        line-height: 50px;
        border-radius: 50px;
        text-align: center;
        color: #fff;
        font-size: 20px;
      }
      &__detail {
        display: flex;
        flex-direction: column;
        height: 70px;
        justify-content: space-between;
        .detail {
          &__header {
            color: #999;
            font-size: 14px;
          }
          &__state {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            word-break: break-all;
            max-width: 162px;
            font-size: 18px;
            color: rgb(215, 111, 222);
          }
        }
      }
    }
  }
}
</style>
