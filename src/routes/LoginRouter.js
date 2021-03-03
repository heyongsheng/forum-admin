import Router from '@koa/router'
import loginController from '../api/LoginController'
import datalize from 'datalize'
const field = datalize.field
const router = new Router()

// 忘记密码
router.post('/forget', loginController.forget)

// 登录
router.post(
  '/login',
  datalize([
    field('name').trim().required().length(2, 10),
    field('email').required().email()
  ]),
  loginController.login
)

// 注册
router.post('/register', loginController.reg)

export default router
