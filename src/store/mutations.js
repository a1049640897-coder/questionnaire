import * as types from './mutations-types';

export default {
  [types.TEST] (state, payload) {
    state.baseInfoIsCommited = payload;
  },

  // 增加老人
  [types.ADDPEOPLELIST] (state, payload) {
    state.peopleList.push(payload);
  },

  // 删除用户
  [types.DELETEPEOPLELIST] (state, payload) {
    state.peopleList.splice(payload, 1);
  },

  // 增加问卷数据
  [types.ADDQUESNAIREDATE] (state, payload) {

  },

  // 修改问卷数据
  [types.MODIFYQUESNAIREDATA] (state, payload) {

  }
};
