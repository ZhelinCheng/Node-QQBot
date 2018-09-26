/**
 * Created by ChengZheLin on 2018/9/25.
 */

const getQrCode = require('../src/qrcode');
const getXlogin = require('../src/xlogin');
const qrCodeExp = require('../src/expired');
const { outLog, hash33 } = require('../src/tools');

(async function () {
  // let qrsig = await getQrCode()
  let [qrsigCookie, xLoginCookie] = await Promise.all([getQrCode(), getXlogin()])
  global.Cookies = {
    ...qrsigCookie,
    ...xLoginCookie
  }


  console.log(Cookies)
})();
