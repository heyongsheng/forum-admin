import Koa from 'koa'
import JWT from 'koa-jwt'
import path from 'path'
import cors from '@koa/cors' // 跨域
import koaBody from 'koa-body'
import json from 'koa-json'
import helmet from 'koa-helmet'
import statics from 'koa-static'
import router from './routes/routes'
import compose from 'koa-compose'
import compress from 'koa-compress' //Koa压缩中间件
import config from './config/index'
import errorHandle from '@/common/ErrorHandle'
import routerResponse from '@/middleware/routerResponse'

const app = new Koa()

const isDevMode = process.env.NODE_ENV === 'production' ? false : true
// 定义公共路径，不需要jwt鉴权
const jwt = JWT({ secret: config.JWT_SECRET }).unless({
  path: [/^\/public/, /\/login/, /\/register/]
})
/**
 * 使用koa-compose 集成中间件
 */
const middleware = compose([
  koaBody({
    enableTypes: ['json', 'form'],
    multipart: true,
    formidable: {
      maxFileSize: 32 * 1024 * 1024
    }
  }),
  statics(path.join(__dirname, '../public')),
  cors(),
  json({ pretty: false, param: 'pretty' }),
  helmet(),
  routerResponse(),
  errorHandle,
  jwt
])
if (!isDevMode) {
  app.use(compress())
}
app.use(middleware)
app.use(router())
app.listen(3000)
