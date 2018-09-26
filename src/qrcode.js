/**
 * Created by ChengZheLin on 2018/9/25.
 */

const request = require('request-promise-native')
const fs = require('fs')
const path = require('path')
const api = require('../api')
const {outLog,hash33} = require('./tools')

// 获取二维码及qrsig
async function getQrCode () {
  outLog('获取登陆二维码')
  return new Promise((resolve, reject) => {
    let qrsig = null
    let body = request(`${api.getQrCode}?appid=501004106&e=2&l=M&s=3&d=72&v=4&t=${Math.random()}&daid=164&pt_3rd_aid=0`, (err, res, body) => {
      if (err) {
        outLog('二维码获取错误')
        return reject(err)
      }
      qrsig = res.headers['set-cookie'];
      if (qrsig) {
        qrsig = /qrsig=(.*);Path=/img.exec(qrsig[0])[1]
      }
    }).pipe(fs.createWriteStream(path.resolve(__dirname, '../public/qrcode.png')))

    body.on('error', () => {
      reject()
    })

    body.on('close', () => {
      resolve({
        qrsig
      })
    })
  })
}

module.exports = getQrCode


