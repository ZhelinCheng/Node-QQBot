/**
 * Created by ChengZheLin on 2018/9/26.
 */
const api = require('../api')
const rq = require('request')

function getXlogin () {
  return new Promise((resolve, reject) => {
    rq({
      url: 'https://xui.ptlogin2.qq.com/cgi-bin/xlogin?daid=164&target=self&style=40&pt_disable_pwd=1&mibao_css=m_webqq&appid=501004106&enable_qlogin=0&no_verifyimg=1&s_url=https%3A%2F%2Fweb2.qq.com%2Fproxy.html&f_url=loginerroralert&strong_login=1&login_state=10&t=20131024001',
      method: 'GET',
      headers: {
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'zh-CN,zh;q=0.9',
        'cache-control': 'no-cache',
        'pragma': 'no-cache',
        'referer': 'https://web2.qq.com/',
        'upgrade-insecure-requests': 1,
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36'
      },
      params: {
        daid: 164,
        target: 'self',
        style: 40,
        pt_disable_pwd: 1,
        mibao_css: 'm_webqq',
        appid: 501004106,
        enable_qlogin: 0,
        no_verifyimg: 1,
        s_url: 'https://web2.qq.com/proxy.html',
        f_url: 'loginerroralert',
        strong_login: 1,
        login_state: 10,
        t: 20131024001
      }
    }, function (err, res, body) {
      if (err) {
        return reject()
      }
      // global

      let cookies = res.headers['set-cookie'];
      let cookiesArr = {}


      if (!cookies) {
        resolve(null)
      } else {
        cookies = cookies.join('');
        cookies = cookies.split(';')

        for (let i in cookies) {
          let item = cookies[i].trim()
          // console.log(item)
          if (/^(PATH|DOMAIN)/img.test(item) || !item) {
            continue;
          }

          item = item.split('=')

          cookiesArr[item[0]] = item[1]
        }

        resolve(cookiesArr)
      }
    })
  })
}

module.exports = getXlogin

if (require.main === module) {
  (async function () {
    let data = await getXlogin()
    console.log(data)
  })()
}
