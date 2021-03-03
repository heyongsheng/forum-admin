import sendEmail from '../config/MailConfig'
import jsonwebtoken from 'jsonwebtoken'
import config from '../config/index'
import bcrypt from 'bcrypt'
import { checkCode } from '../common/utils'
import User from '../model/User'
import moment from 'moment'

import datalize from 'datalize'
const field = datalize.field
class LoginController {
  constructor() {}
  async forget(ctx) {
    const { body } = ctx.request
    try {
      let result = await sendEmail(body)
      ctx.body = {
        code: 200,
        data: result,
        message: '邮件发送成功'
      }
    } catch (e) {
      console.log(e)
    }
  }
  async login(ctx) {
    // if (!ctx.form.isValid) {
    //   return ctx.fail(400, '数据格式验证不通过', {
    //     errors: ctx.form.errors
    //   })
    // }
    const { body } = ctx.request
    let uuid = body.uuid
    let code = body.code
    // 验证验证码
    if (await checkCode(uuid, code)) {
      let checkUserPassword = false
      let user = await User.findOne({ username: body.username })
      // 验证账号密码
      if (user && +user.password === +body.password) {
        checkUserPassword = true
        // 验证通过，返回token
      } else {
        // 用户名密码验证失败，返回提示信息
        ctx.fail(400, '用户名或密码错误！')
      }
      if (checkUserPassword) {
        let token = jsonwebtoken.sign(
          {
            _id: '1148'
          },
          config.JWT_SECRET,
          {
            expiresIn: '1d'
          }
        )
        ctx.success(token)
      }
    } else {
      ctx.fail(401, '图片验证码不正确，请检查！')
    }
  }
  async reg(ctx) {
    const { body } = ctx.request
    // 校验验证码的内容（时效性、有效性）
    let uuid = body.uuid
    let code = body.code
    let msg = {}
    let result = await checkCode(uuid, code)
    let check = true
    if (result) {
      // let user1 = await User.findOne({ username: body.username })
      // if (typeof user1.username !== 'undefined') {
      //   // 邮箱已经注册
      //   check = false
      // }
      // let user2 = await User.findOne({ name: body.name })
      // if (typeof user2.name !== 'undefined') {
      //   // 用户名已经注册
      //   check = false
      // }
      body.password = await bcrypt.hash(body.password, 5)
      if (check) {
        let user = new User({
          username: body.username,
          name: body.name,
          password: body.password,
          createTime: moment().format('YYYY-MM-DD HH:mm:ss')
        })
        let result = await user.save()
        ctx.body = {
          code: 200,
          data: result,
          msg: '注册成功'
        }
      }
    } else {
      msg.code = ['验证码已经失效，请重新获取！']
      ctx.body = {
        code: 500,
        msg: '验证码已经失效，请重新获取'
      }
    }
  }
}

export default new LoginController()
