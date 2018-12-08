export default {
  render(h) {
    return h(
      'div',
      {
        style: {
          position: 'relative',
          width: '500px',
          height: '400px',
          border: '1px dotted',
          backgroundColor: '#f66'
        }
      },
      [
        h('div', {
          style: {
            position: 'absolute',
            right: 0,
            top: 0,
            width: '100px',
            height: '40px',
            border: '1px solid #666',
            backgroundColor: '#fcc'
          },
          domProps: {
            innerHTML: '666'
          },
          on: {
            click: () => {
              console.log('brother')
            }
          }
        }),
        h(
          'el-table',
          {
            props: {
              data: [
                {
                  date: '2016-05-02',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1518 弄'
                }
              ]
            }
          },
          [
            h('el-table-column', {
              attrs: {
                prop: 'date',
                label: '日期',
                width: '180'
              }
            })
          ]
        )
      ]
    )
  }
}
