/**
 * Created by ChengZheLin on 2018/9/25.
 */

const qrCodeExp = require('../src/expired');
const loginRedirect = require('../src/redirect')
const getVfwebqq = require('../src/getvfwebqq')
const getLogin2 = require('../src/login2')
const { outLog } = require('../src/tools');
const init = require('./init');

function login() {
  return new Promise(async (resolve, reject) => {
    // 获取登陆所需Cookie
    let Cookies = await init()

    // qrcode.decode

    let initTime = setInterval(async () => {
      try {
        let data = await qrCodeExp(Cookies.obj['qrsig'], Cookies.obj['pt_login_sig'], Cookies.str)

        if (!(data instanceof Array)) {
          let cok = data.cookies;
          Cookies.obj = Object.assign(Cookies.obj, cok)
          data = data.status;
        }

        outLog(data[4])
        switch (data[0]) {
          case '65':
            // 二维码失效
            Cookies = await init()
            break
          case '0':
            // 登陆成功
            clearInterval(initTime)
            let loginRedirectCookie =  await loginRedirect(data[2], Cookies.str)
            Cookies.obj = Object.assign(Cookies.obj, loginRedirectCookie)

            loginRedirectCookie = {
              ...loginRedirectCookie,
              ptisp: Cookies.obj['ptisp'],
              RK: Cookies.obj['RK'],
              ptcz: Cookies.obj['ptcz'],
              pgv_si: Cookies.obj['pgv_si'],
              pgv_pvi: Cookies.obj['pgv_pvi']
            }

            Cookies.red = '';
            for (let k in loginRedirectCookie) {
              Cookies.red += `${k}=${loginRedirectCookie[k]};`
            }

            // 获取vfwebqq
            let vfwebqq = await getVfwebqq(Cookies.red)
            if (!vfwebqq.retcode) vfwebqq = vfwebqq.result.vfwebqq
            outLog('vfwebqq数据获取成功')

            // 获取login2相关数据

            let login2 = await getLogin2(Cookies.red)

            console.log(login)

            if (!login2.retcode) login2 = login2.result
            outLog('login2数据获取成功')

            // 登陆成功后的回调
            resolve({
              vfwebqq,
              login2,
              Cookies
            })
            break
        }
      } catch (e) {
        clearInterval(initTime)
        reject(e)
      }
    }, 3000)
  })
}

module.exports = login
