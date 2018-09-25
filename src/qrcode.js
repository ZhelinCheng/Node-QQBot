/**
 * Created by ChengZheLin on 2018/9/25.
 */

const request = require('request-promise-native')
const fs = require('fs')
const path = require('path')
const api = require('../api')
const { outLog } = require('./tools')

outLog('开始获取二维码')
let reader = request(`${api.getQrCode}?appid=501004106&e=2&l=M&s=3&d=72&v=4&t=${Math.random()}&daid=164&pt_3rd_aid=0`).pipe(fs.createWriteStream(path.resolve(__dirname,'../public/qrcode.png')))
reader.on('close', () => {
  outLog('二维码获取成功')
});