import mongoose from '../config/DBHelpler'

const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: { type: String }, // 用户名
  password: { type: String }, // 密码
  create_time: { type: Date }, // 注册时间
  update_time: { type: Date }, // 更新时间
  job_title: { type: String }, // 职位
  company: { type: String }, // 公司
  gender: { type: Number }, // 0：隐私 1：男 2：女
  roleId: { type: Number }, // 角色Id
  photo: { type: String }, // 用户头像
  phone: { type: Number }, // 手机号码
  email: { type: String }, // 邮箱
  status: { type: Number }, // 0：禁用 1：正常 2：封号 3：注销
  description: { type: String } // 个人介绍
})

const UserModel = mongoose.model('users', UserSchema)

export default UserModel
