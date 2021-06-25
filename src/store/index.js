import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

Vue.use(Vuex);

const state = {
  baseInfoIsCommited: false,
  peopleList: [],
  communityId: '', // 社区id
  buildingName: '', // 楼宇名称
  roomNo: '', //   门牌号
  baseInfo: [], // 基本信息
  quesnaireDataList: {
    communityId: '',
    buildingName: '',
    roomNo: '',
    recordDataList: [
      {
        customerRel: '',
        customerNo: '',
        recordData: []
      }
    ]

  }
};

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});

export default store;
