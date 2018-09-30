/**
 * Created by ChengZheLin on 2018/9/26.
 */

const api = require('../api')
const rq = require('../bin/request')
const { hash33 } = require('./tools')

// 验证二维码是否过期
async function qrCodeExpired (qrsig, loginSig, cookie) {
  // 最后相关Cookie在这里
  let data = await rq({
    url: `${api.qrCodeExp}?u1=https%3A%2F%2Fweb2.qq.com%2Fproxy.html&ptqrtoken=${hash33(qrsig)}&ptredirect=0&h=1&t=1&g=1&from_ui=1&ptlang=2052&action=1-1-${new Date().getTime()}&js_ver=10284&js_type=1&login_sig=${loginSig}&pt_uistyle=40&aid=501004106&daid=164&mibao_css=m_webqq&`,
    method: 'GET',
  }, {
    cookie,
    referer: 'https://s.web2.qq.com/proxy.html?v=20130916001&callback=1&id=1'
  }, 'res')

  let cookies = data.headers['set-cookie'];
  let cookiesArr = {}
  let status = data.body.replace(/(ptuiCB\(|\)$|')/img, '').split(',')

  if (cookies) {
    cookies = cookies.join('');
    cookies = cookies.split(';')
    for (let i in cookies) {
      let item = cookies[i].trim()
      // console.log(item)
      if (/^(PATH|DOMAIN|Expires)/img.test(item) || !item) {
        continue;
      }

      item = item.split('=')

      if (!item[0] || !item[1]) {
        continue;
      }

      cookiesArr[item[0]] = item[1]
    }

    return {
      cookies: cookiesArr,
      status
    }
  } else {
    return status
  }
}

module.exports = qrCodeExpired