/*
 * @Author: your name
 * @Date: 2021-12-23 16:43:16
 * @LastEditTime: 2022-01-17 19:47:11
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /nfes-tripdocs/serverLib/globalVar.js
 */
function set(key, val) {
  if (typeof key === 'string') {
    global[key] = val;
  }
}
function get(key) {
  if (typeof key === 'string') {
    return global[key];
  }
  return null;
}
const keyMap = {
  dirRes: 'directoryRes',
  compareMentionInterval: 'compareMentionInterval',
  profileCorpGroupQuery: 'profileCorpGroupQuery',
  profileCorpGroupQueryTree: 'profileCorpGroupQueryTree',
  profileCorpQuery: 'profileCorpQuery',
  profileCorpQueryTree: 'profileCorpQueryTree',
  profileQuery: 'profileQuery',
  profileQueryTree: 'profileQueryTree',
  isBuild: 'Project is being built',
  errCache: 'ErrorCache',
  esConnect: 'esConnect',
};

module.exports = { set, get, keyMap };
