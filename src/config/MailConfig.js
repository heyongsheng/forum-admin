'use strict'
const nodemailer = require('nodemailer')

// async..await is not allowed in global scope, must use a wrapper
async function send(sendInfo) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount()

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: '1378431028@qq.com', // generated ethereal user
      pass: 'tjwftapncrhbjeeb' // generated ethereal password
    }
  })

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"认证邮件" <1378431028@qq.com>', // sender address
    to: sendInfo.userEmail, // list of receivers
    subject: sendInfo.title, // Subject line
    text: sendInfo.text, // plain text body
    html: sendInfo.email // html body
  })

  return 'Message sent: %s', info.messageId
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

export default send
