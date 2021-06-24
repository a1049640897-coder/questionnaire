import fetch from 'service/fetch';

// 获取问卷报告页面
export const getCustomerReport = (data) => {
  return fetch({
    url: '/gw/api/questionnaire/getQuestionnaire',
    mockUrl: 'http://sinyee.f3322.net:33000/mock/27/gw/api/questionnaire/getQuestionnaire',
    method: 'post',
    data: data
  });
};
