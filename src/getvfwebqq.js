/**
 * Created by ChengZheLin on 2018/9/27.
 */

const rq = require('request')
const api = require('../api')

module.exports = async function (cookie) {
  console.log(cookie)
  /*return await rq({
    url: `${api.getvfwebqq}?ptwebqq=&clientid=53999199&psessionid=&t=${new Date().getTime()}`,
    method: 'GET',
  }, {
    cookie
  })*/

  return new Promise((resolve, reject) => {
    rq({
      url: `${api.getvfwebqq}?ptwebqq=&clientid=53999199&psessionid=&t=${new Date().getTime()}`,
      method: 'GET',
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
      resolve(body)
    })
  })
}