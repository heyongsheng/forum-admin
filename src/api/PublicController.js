import svgCaptcha from 'svg-captcha'
import { getValue, setValue } from '../config/RedisConfig'
class PublicController {
  constructor() {}
  async getCaptcha(ctx) {
    const { query } = ctx.request
    // 此处记得判断query.sid
    const newCaptcha = svgCaptcha.create({
      size: 4,
      noise: Math.floor(Math.random() * 5)
    })
    console.log(newCaptcha)
    //
    setValue(query.uuid, newCaptcha.text, 60 * 10)
    ctx.body = {
      code: 200,
      data: newCaptcha.data
    }
  }
}

export default new PublicController()
