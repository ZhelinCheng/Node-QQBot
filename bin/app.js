/**
 * Created by ChengZheLin on 2018/9/30.
 */

const startlogin = require('./login')
const { outLog } = require('../src/tools');

// 登陆成功后的回调
(async function () {
  try {
    let loginData = await startlogin()


    console.log(loginData)
  } catch (e) {
    outLog('程序错误')
    console.log(e)
  }
})()