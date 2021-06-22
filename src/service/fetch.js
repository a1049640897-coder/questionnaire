import { Notify } from 'vant';
import axios from 'axios';

/* 测试 */
const baseURL = 'http://sinyee.f3322.net:18080';
const service = axios.create({
  baseURL: baseURL,
  timeout: 60000
});

service.interceptors.request.use(
  config => {
    (config.headers = {
      'Content-Type': 'application/json'
    });
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  response => {
    const res = response.data;
    const { code, message: msg } = res;

    if (code !== 0) {
      Notify({ type: 'danger', message: msg });
      return Promise.reject(res);
    } else {
      return res || {};
    }
  },
  error => {
    const { response } = error;
    if (response && !response.message) {
      switch (response.status) {
        case 400:
          error.message = '请求错误';
          break;
        case 401:
          error.message = '无权限';
          break;
        case 403:
          error.message = '拒绝访问';
          break;
        case 404:
          error.message = `请求地址出错: ${error.response.config.url}`;
          break;
        case 408:
          error.message = '请求超时';
          break;
        case 500:
          error.message = '服务器内部错误';
          break;
        case 501:
          error.message = '服务未实现';
          break;
        case 502:
          error.message = '网关错误';
          break;
        case 503:
          error.message = '服务不可用';
          break;
        case 504:
          error.message = '网关超时';
          break;
        case 505:
          error.message = 'HTTP版本不受支持';
          break;
        default:
          error.message = '请求报错，请联系管理员';
          break;
      }
    }
    let errMsg = '';
    if (error && error.message) {
      errMsg = error.message;
    } else {
      errMsg = `${response.status}:${response.statusText}`;
    }
    Notify({ type: 'danger', message: `服务不正常:${errMsg}` });
    return Promise.reject(error);
  });

export default service;
