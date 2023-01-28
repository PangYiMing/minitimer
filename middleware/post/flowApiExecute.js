const { commonRes } = require("../../serverLib/resCommon");
const { verifyObj } = require("../../serverLib/verify");


async function testApi(req, res) {
  try {
    // const cookie = req.cookies['cookie'];
    //  md tag {type:'md'} verify
    const tKeys = ['orderId', 'modifyTime'];
    const requireKeys = ['orderId'];
    const data = verifyObj(res, req.body, tKeys, requireKeys);
    data.action = 1
    const newData = {}
    newData.actionMsg = '差价大于零，退款'

    console.logs(req.body, req, data)
    res.json(commonRes({ success: true, data: newData, code: 200 }));
  } catch (error) {
    console.error(error)
    res.json(commonRes({ success: false, msg: error.toString(), code: 500 }));
  }
}

module.exports = {
  reg: /\/api\/flowapi\/execute/i,
  fn: testApi,
};
