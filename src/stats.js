/**
 * Created by ChengZheLin on 2018/9/27.
 */

'use strict'

// 判断这两个cookie是否存在，如果不存在则为null
function p() {
  return ''
}

//如果上面的返回为null，则调用下列方法来生成cookie的值：
function r(c) {
  return (c || "") + Math.round(2147483647 * (Math.random() || .5)) * +new Date % 1E10
}

// 调用 下列方法进行cookie生成
function q(c, a, b) {
  var d = 'xui.ptlogin2.qq.com'
    , e = {
    "com.cn": 1,
    "net.cn": 1,
    "gov.cn": 1,
    "com.hk": 1,
    "co.nz": 1,
    "org.cn": 1,
    "edu.cn": 1
  }
    , f = d.split(".");
  2 < f.length && (d = (e[f.slice(-2).join(".")] ? f.slice(-3) : f.slice(-2)).join("."));
  // var s1 = c + "=" + a + ";path=/;domain=" + d + (b ? ";expires=" + b : "")
  // console.log(s1)
}

module.exports = {
  pgv_si: (function() {
    var a = p("pgv_si");
    a || (a = r("s"),
      q("pgv_si", a));
    return a
  })(),

  pgv_pvi: (function () {
    let a = {ty: 1};
    let b = p("pgv_pvi");
    b || (a.ty = 0, b = r(), q("pgv_pvi", b, "Sun, 18 Jan 2038 00:00:00 GMT;"));
    return b
  })()
}