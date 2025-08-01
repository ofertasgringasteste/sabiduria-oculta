window.heyMerchCookieManagerGet = function getCookie(name) {
  let cookie = {};
  document.cookie.split(";").forEach(function (el) {
    let [k, v] = el.split("=");
    cookie[k.trim()] = v;
  });
  return cookie[name];
};

window.heyMerchCookieManagerSet = function setCookie(name, val) {
  var date = new Date();
  date.setTime(date.getTime() + 60 * 60 * 1000);
  var expires = date.toGMTString();
  var offset = -date.getTimezoneOffset() / 60;
  document.cookie =
    name +
    "=" +
    val +
    ";timezone=" +
    offset +
    ";expires=" +
    expires +
    ";path=/";
};
