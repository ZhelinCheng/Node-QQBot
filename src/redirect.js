/**
 * Created by ChengZheLin on 2018/9/27.
 */

const rq = require('request')

module.exports = async function (url, cookie) {
  return new Promise((resolve, reject) => {
    rq({
      url: url,
      method: 'GET',
      followRedirect: false,
      headers: {
        cookie,
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'accept-encoding': 'gzip, deflate, br',
        'accept-language': 'zh-CN,zh;q=0.9',
        'cache-control': 'no-cache',
        'pragma': 'no-cache',
        'upgrade-insecure-requests': 1,
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36'
      }
    }, function (err, res, body) {
      if (err) {
        return reject()
      }

      let cookies = res.headers['set-cookie'];
      let cookiesArr = {}


      if (!cookies) {
        resolve(null)
      } else {
        cookies = cookies.join('');
        cookies = cookies.split(';')

        for (let i in cookies) {
          let item = cookies[i].trim()
          if (/^(PATH|DOMAIN|Expires)/img.test(item) || !item) {
            continue;
          }

          item = item.split('=')


          if (!item[0] || !item[1]) {
            continue;
          }

          cookiesArr[item[0]] = item[1]
        }


        resolve(cookiesArr)
      }
    })
  })
}