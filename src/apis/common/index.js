import fetch from 'service/fetch';

// 获取枚举类型
export const listEnumValues = (data) => {
  return fetch({
    url: '/gw/api/util/listEnumValues',
    mockUrl: 'http://sinyee.f3322.net:33000/mock/17/gw/api/util/listEnumValues',
    method: 'post',
    data: data
  });
};

// 获取问卷报告页面
export const getCustomerReport = (data) => {
  return fetch({
    url: '/gw/api/questionnaire/getQuestionnaire',
    mockUrl: 'http://sinyee.f3322.net:33000/mock/27/gw/api/questionnaire/getQuestionnaire',
    method: 'post',
    data: data
  });
};

// 问卷提交页面
export const saveCustomerRecord = (data) => {
  return fetch({
    url: '/gw/api/customerManage/saveCustomerRecord',
    mockUrl: 'http://sinyee.f3322.net:33000/mock/27/gw/api/customerManage/saveCustomerRecord',
    method: 'post',
    data: data
  });
};
