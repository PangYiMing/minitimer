const { intersection } = require('lodash');
const { commonRes } = require('../serverLib/resCommon');
const { timeFormat } = require('../serverLib/format');


function verifyObj(res, obj, tKeys = [], requireKeys = []) {
  const keys = Object.keys(obj);
  if (intersection(tKeys, requireKeys, keys).length !== requireKeys.length) {
    const err_msg = `verify verifyObj 不满足requireKeys: ${requireKeys}, Object.keys: ${keys}, tKeys: ${tKeys}, `;
    console.errors(`verify verifyObj err_msg: ${err_msg}`);
    res.json(
      commonRes({
        success: false,
        msg: err_msg,
        code: 500,
        data: obj,
      })
    );
    return null;
  }
  // console.logs('intersection(tKeys, requireKeys, keys)', intersection(tKeys, requireKeys, keys));
  const data = {};
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (tKeys.includes(key)) {
      data[key] = obj[key];
    }
  }
  if (tKeys.includes('modifyTime')) {
    var targetDate = timeFormat(null, 'yyyy-MM-dd hh:mm:ss');
    data.modifyTime = targetDate;
  }
  if (tKeys.includes('createTime')) {
    var targetDate = timeFormat(null, 'yyyy-MM-dd hh:mm:ss');
    data.createTime = targetDate;
  }
  if (tKeys.includes('delTime')) {
    var targetDate = timeFormat(null, 'yyyy-MM-dd hh:mm:ss');
    data.delTime = targetDate;
  }
  return data;
}

module.exports = {
  verifyObj,
};
