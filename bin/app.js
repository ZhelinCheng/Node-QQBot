/**
 * Created by ChengZheLin on 2018/9/25.
 */

const qrCodeExp = require('../src/expired');
const loginRedirect = require('../src/redirect')
const getVfwebqq = require('../src/getvfwebqq')
const { outLog } = require('../src/tools');
const init = require('./init');


(async function () {
  // 获取登陆所需Cookie
  let Cookies = await init()

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

          console.log(loginRedirectCookie)
          Cookies.red = '';
          for (let k in loginRedirectCookie) {
            Cookies.red += `${k}=${loginRedirectCookie[k]};`
          }

          console.log(Cookies.red)

          console.log(await getVfwebqq(Cookies.red))
          break
      }
    } catch (e) {
      clearInterval(initTime)
    }
  }, 3000)

})();
