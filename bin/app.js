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
    let data = await qrCodeExp(Cookies.obj['qrsig'], Cookies.obj['pt_login_sig'], Cookies.str)
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

        console.log(Cookies.obj)
        Cookies.red = '';
        for (let k in loginRedirectCookie) {
          Cookies.red += `${k}=${loginRedirectCookie[k]};`
        }

        console.log(await getVfwebqq(Cookies.red))
        break
    }
  }, 5000)

})();
