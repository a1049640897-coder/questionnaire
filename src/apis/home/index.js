import fetch from 'service/fetch';

// 获取社区
export const listCommunitys = (data) => {
  return fetch({
    url: '/gw/api/questionnaire/listCommunitys',
    mockUrl: 'http://sinyee.f3322.net:33000/mock/27/gw/api/questionnaire/listCommunitys',
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

// 获取楼宇

export const listBuildings = (data) => {
  return fetch({
    url: '/gw/api/questionnaire/listBuildings',
    mockUrl: 'http://sinyee.f3322.net:33000/mock/27/gw/api/questionnaire/listBuildings',
    method: 'post',
    data: data
  });
};

// 验证用户信息
export const getUserInfo = (data) => {
  return fetch({
    url: '/gw/api/questionnaire/getUserInfo',
    mockUrl: 'http://sinyee.f3322.net:33000/mock/27/gw/api/questionnaire/getUserInfo',
    method: 'post',
    data: data
  });
};
