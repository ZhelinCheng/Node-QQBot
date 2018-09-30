/**
 * Created by ChengZheLin on 2018/9/30.
 */

const rq = require('../bin/request')
const api = require('../api')

module.exports = async function (cookie) {
  console.log(cookie)
  return await rq({
    url: api.login2,
    method: 'POST',
    formData: {
      r: `{"ptwebqq":"","clientid":53999199,"psessionid":"","status":"online"}`
    }
  }, {
    cookie,
    'referer': 'https://s.web2.qq.com/proxy.html?v=20130916001&callback=1&id=1',
  })
}

if (require.main === module) {
  (async () => {
    let data = await test()

    console.log(data)
  })()
}