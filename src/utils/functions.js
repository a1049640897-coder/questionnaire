import { host } from 'utils/host';

/**
 * 给 DOM 对象添加事件监听函数
 * @param {String} name 事件名称
 * @param {*} callback 时间监听函数
 * @param {*} element 对应 DOM 元素
 * @param {*} useCapture 是否捕获方式
 */
export const addEvent = (name, callback, element = document, useCapture) => {
  if (element.addEventListener) {
    element.addEventListener(name, callback, useCapture);
  } else if (element.attachEvent) {
    element.attachEvent(`on${name}`, callback, useCapture);
  }
};

/**
 * 删除 DOM 对象的事件监听函数
 * @param {String} name 事件名称
 * @param {*} callback 时间监听函数
 * @param {*} element 对应 DOM 元素
 * @param {*} useCapture 是否捕获方式
 */
export const removeEvent = (name, callback, element = document, useCapture) => {
  if (element.addEventListener) {
    element.removeEventListener(name, callback, useCapture);
  } else if (element.attachEvent) {
    element.detachEvent(`on${name}`, callback, useCapture);
  }
};

/**
 * 根据出生年月获取年龄
 * @param birthday '2020-10-29'
 */
export const getAge = (birthday) => {
  // 出生时间 毫秒
  const birthDayTime = new Date(birthday).getTime();
  // 当前时间 毫秒
  const nowTime = new Date().getTime();
  // 一年毫秒数(365 * 86400000 = 31536000000)
  return Math.ceil((nowTime - birthDayTime) / 31536000000);
};

/**
 * [{path: '', url: ''}] = > { [path]: url, [path1]: url1 }
 */
export const getFormatImageList = (list) => {
  const param = {};
  list.forEach(element => {
    param[element.path] = element.url;
  });
  return param;
};

export const generateUUID = () => {
  var d = new Date().getTime();
  if (window.performance && typeof window.performance.now === 'function') {
    d += performance.now();
  }
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c === 'x' ? r : ((r & 0x3) | 0x8)).toString(16);
  });
  return uuid;
};
// 生成唯一编码
export const createRandomId = () => {
  return (Math.random() * 10000000).toString(16).substr(0, 4) + '_' + (new Date()).getTime() + '_' + Math.random().toString().substr(2, 5);
};
/**
 * 判断是什么环境，测试环境还是正式环境
 * @returns 环境变量 dev测试环境 / prod 正式环境
 */
export const getDev = () => {
  let hostEnv = '';
  const uri = window.location.href;
  if (uri.indexOf(host['fe-prod-host']) > -1) {
    hostEnv = 'prod';
  } else if (uri.indexOf(host['fe-dev-host']) > -1) {
    hostEnv = 'dev';
  } else {
    hostEnv = 'mock';
  }
  return hostEnv;
};
