/**
 * Created by ChengZheLin on 2018/7/20.
 */


const rq = require('request-promise-native')

const request = async function (params, headers = {}, type = 'body') {
  let defaultHeaders = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'zh-CN,zh;q=0.9,zh-TW;q=0.8,ko;q=0.7',
    'Connection': 'keep-alive',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36'
  }

  let data = await rq({
    ...params,
    resolveWithFullResponse: true,
    json: true,
    headers: {
      ...defaultHeaders,
      ...headers
    }
  })

  if (type === 'body') {
    data = data.body
  }

  return data
}

module.exports = request

if (require.main === module) {
  (async () => {
    let data = await request({
      url: 'https://api.laimeiyun.cn/v1/member/info/all'
    }, {}, '1')

    console.log(data.headers)
  })()
}

