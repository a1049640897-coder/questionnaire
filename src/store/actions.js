import * as types from './mutations-types';
import { Notify } from 'vant';
import { saveCustomerRecord } from 'apis/common';
export default {
  test ({ commit }, payload) {
    setTimeout(() => {
      commit(types.TEST, payload);
    }, 1000);
  },

  [types.SUBMITQUESNAIRE] ({ commit, state }, payload) {
    commit(types.RESORECORDDATA);
    const newObj = {
      communityId: state.communityId,
      buildingName: state.buildingName,
      roomNo: state.roomNo,
      recordDataList: state.recordDataList
    };
    const { data } = saveCustomerRecord(newObj);
    console.info('new', data);
  }

};
