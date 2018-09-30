/**
 * Created by ChengZheLin on 2018/9/27.
 */

const rq = require('../bin/request')
const api = require('../api')

module.exports = async function (cookie) {
  return await rq({
    url: `${api.getvfwebqq}?ptwebqq=&clientid=53999199&psessionid=&t=${new Date().getTime()}`,
    method: 'GET',
  }, {
    cookie,
    'referer': 'https://s.web2.qq.com/proxy.html?v=20130916001&callback=1&id=1',
  })
}