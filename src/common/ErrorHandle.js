import datalize from 'datalize'
// datalize.set('autoValidate', true)
export default async (ctx, next) => {
  return await next().catch((err) => {
    console.log(333)
    console.log(err)
    if (err.status == 401) {
      ctx.fail(401, 'token过期或不存在，请重新登录')
    } else if (err instanceof datalize.Error) {
      ctx.fail(400, '数据格式验证不通过', err.toJSON())
    } else {
      ctx.fail(
        err.status || 500,
        err.message,
        process.env.NODE_ENV === 'development' ? err.stack : ''
      )
    }
  })
}
