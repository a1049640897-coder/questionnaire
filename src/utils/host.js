/**
 * 接口
  正式：https://api.tianlunzhimei.com/
  测试：http://sinyee.f3322.net:18080/lci/
  域名
  正式：app.tianlunzhimei.com
  测试：sinyee.f3322.net
 */
export const host = {
  // 前端域名
  'fe-dev-host': 'sinyee.f3322.net', // 测试环境前端域名
  'fe-prod-host': 'app.tianlunzhimei.com', // 生产环境前端域名
  'fe-mock-host': '://localhost', // 本地环境前端域名
  // 接口请求前缀
  'api-base-dev': '/lci', // 测试环境需要增加一个前缀
  'api-base-mock': '/lci', // 本地环境需要增加一个前缀
  'api-base-prod': '', // 正式环境不需要增加一个前缀
  // 接口域名
  'api-host-dev': 'http://sinyee.f3322.net:18080',
  'api-host-mock': '',
  'api-host-prod': 'https://api.tianlunzhimei.com'
};
