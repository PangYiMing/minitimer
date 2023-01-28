
function commonRes(params) {
  if (params.success) {
    return {
      success: params.success,
      code: 0,
      msg: params.msg || '访问成功',
      data: params.data || {},
    };
  } else {
    return {
      success: params.success,
      code: params.code,
      msg: params.msg,
      data: params.data || {},
    };
  }
}

module.exports = { commonRes };
