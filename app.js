const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const views = require('koa-views')
const static = require('koa-static')
const path = require('path')
const port = 4000
console.log('path: ', __dirname)

app.use(
  views(__dirname + '/dist', {
    map: {
      html: 'ejs'
    }
  })
)
app.use(static(path.join(__dirname, '/dist')))
router.get('/', async ctx => {
  await ctx.render('index')
})
app.use(router.routes())
app.listen(port, function(err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
