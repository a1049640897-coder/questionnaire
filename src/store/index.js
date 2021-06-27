import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

Vue.use(Vuex);

const state = {
  peopleList: [],
  communityId: '', // 社区id
  buildingName: '', // 楼宇名称
  roomNo: '', //   门牌号
  baseInfo: [], // 基本信息
  baseInfoMutifly: [], // 基本信息多选
  randomNo: 4, // 户内人员编号
  quesnaireIsSuceessSubmit: false, // 问卷是否成功提交
  recordDataList: [] // 重新排序的数组
};

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
});

export default store;
