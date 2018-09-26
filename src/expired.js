/**
 * Created by ChengZheLin on 2018/9/26.
 */

const api = require('../api')
const rq = require('../bin/require')
const { hash33 } = require('./tools')

// 验证二维码是否过期
async function qrCodeExpired (qrsig) {
  let data = await rq({
    url: api.qrCodeExp,
    method: 'GET',
    params: {
      u1: 'https://web2.qq.com/proxy.html',
      ptqrtoken: hash33(qrsig),
      ptredirect: 0,
      h: 1,
      t: 1,
      g: 1,
      from_ui: 1,
      ptlang: 2052,
      action: `0-0-${new Date().getTime()}`,
      js_ver: 10284,
      js_type: 1,
      login_sig: '',
      pt_uistyle: 40,
      aid: 501004106,
      daid: 164,
      mibao_css: 'm_webqq'
    }
  }, {
    cookie: `qrsig=${qrsig}`
  }, 'jsonp')

  return data
}

module.exports = qrCodeExpired