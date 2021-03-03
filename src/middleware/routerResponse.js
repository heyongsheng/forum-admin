function routerResponse(option = {}) {
  return async function (ctx, next) {
    ctx.success = function (data) {
      ctx.type = option.type || 'json'
      ctx.body = {
        code: option.successCode || 200,
        msg: option.successMsg || 'success',
        data: data
      }
      console.log('ctx.body', ctx.body)
    }

    ctx.fail = function (code, msg, data = '') {
      console.log('111')
      ctx.type = option.type || 'json'
      ctx.body = {
        code: code || option.failCode || 400,
        msg: msg || option.successMsg || 'fail',
        data
      }
      console.log('ctx.body', ctx.body)
    }

    await next()
  }
}
export default routerResponse
