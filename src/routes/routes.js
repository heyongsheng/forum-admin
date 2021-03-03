import combineRouters from 'koa-combine-routers'
import PublicRouter from './PublicRouter'
import loginRouter from './LoginRouter'

export default combineRouters(PublicRouter, loginRouter)
