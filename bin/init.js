/**
 * Created by ChengZheLin on 2018/9/27.
 */
const getQrCode = require('../src/qrcode')
const getXlogin = require('../src/xlogin')
const getStats = require('../src/stats')
const {outLog} = require('../src/tools')

module.exports = async function () {
  // 获取cookies
  let CookiesStr = ''
  outLog('请求相关Cookie')
  let xLoginCookie = await getXlogin()

  let CookiesObj = {
    ...xLoginCookie,
    ...getStats
  }


  for (let i in CookiesObj) {
    CookiesStr += `${i}=${CookiesObj[i]};`
  }

  // 获取二维码
  let qrsigCookie = await getQrCode(CookiesStr)
  CookiesObj = Object.assign(CookiesObj, qrsigCookie)

  for (let i in CookiesObj) {
    CookiesStr += `${i}=${CookiesObj[i]};`
  }

  outLog('登陆相关请求完成')
  return {
    obj: CookiesObj,
    str: CookiesStr
  }
}