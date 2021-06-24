import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './actions';
import getters from './getters';

Vue.use(Vuex);

const state = {
  baseInfoIsCommited: false,
  peopleList: [],
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
