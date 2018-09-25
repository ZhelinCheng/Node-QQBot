/**
 * Created by ChengZheLin on 2018/7/20.
 */


const rq = require('request-promise-native')

const request = async function (params, headers = {}, type = 'json') {
  let defaultHeaders = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'zh-CN,zh;q=0.9,zh-TW;q=0.8,ko;q=0.7',
    'Connection': 'keep-alive',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36'
  }

  let data = await rq({
    ...params,
    headers: {
      ...defaultHeaders,
      ...headers
    }
  })

  //console.log(data)

  if (type === 'json') {
    data = JSON.parse(data)
  }

  return data
}

module.exports = request

if (require.main === module) {
  (async () => {
    const fs = require('fs')
    let data = await request({
      url: 'https://ssl.ptlogin2.qq.com/ptqrshow',
      method: 'GET',
      params: {
        appid: '501004106',
        e: 2,
        l: 'M',
        s: 3,
        d: 72,
        v: 4,
        t: Math.random().toString().slice(0, 18),
        daid: 164,
        pt_3rd_aid: 0
      }
    }, {}, 'qrcode')
  })()
}

