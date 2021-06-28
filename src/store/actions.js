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
    if (state.flag) {
      const newObj = {
        communityId: state.communityId,
        buildingName: state.buildingName,
        roomNo: state.roomNo,
        recordDataList: state.recordDataList
      };
      saveCustomerRecord(newObj).then(res => {
        const { code, message } = res;
        if (code == 0) {
          Notify({ type: 'success', message: '问卷提交成功!' });
          window.location.reload();
        } else {
          Notify({ type: 'danger', message: `${message}` });
        }
      });
    }
  }

};
