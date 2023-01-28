
// 利用babel来写jsx 运行的时候会转换成createElement创建
const timeFormat = function (dt = '', fmt = "yyyy-MM-dd hh:mm:ss:S") { //author: meizz
    let date
    if (dt) {
        date = dt
    } else {
        var timezone = 8; //目标时区时间，东八区
        var offset_GMT = new Date().getTimezoneOffset(); // 本地时间和格林威治的时间差，单位为分钟
        var nowDate = new Date().getTime(); // 本地时间距 1970 年 1 月 1 日午夜（GMT 时间）之间的毫秒数
        date = new Date(nowDate + offset_GMT * 60 * 1000 + timezone * 60 * 60 * 1000)
    }

    var o = {
        "M+": date.getMonth() + 1, //月份
        "d+": date.getDate(), //日
        "h+": date.getHours(), //小时
        "m+": date.getMinutes(), //分
        "s+": date.getSeconds(), //秒
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度
        "S": date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    Object.keys(o).forEach((k) => {
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k] + '') : (("00" + o[k]).substr(("" + o[k]).length)));
    })
    return fmt;
}
module.exports = {
    timeFormat
}