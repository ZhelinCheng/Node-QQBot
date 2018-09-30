/**
 * Created by ChengZheLin on 2018/9/30.
 */

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