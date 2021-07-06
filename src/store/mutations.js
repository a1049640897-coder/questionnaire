import * as types from './mutations-types';
import { Notify } from 'vant';

export default {
  [types.TEST] (state, payload) {
    state.baseInfoIsCommited = payload;
  },

  // 增加关系
  [types.ADDPEOPLELIST] (state, payload) {
    state.peopleList.push(payload);
  },

  // 删除关系
  [types.DELETEPEOPLELIST] (state, payload) {
    const newPeopleList = state.peopleList.filter((item) => {
      return item.customerNo !== payload;
    });
    state.peopleList = JSON.parse(JSON.stringify(newPeopleList));
  },

  [types.UPDATEENTERDATA] (state, payload) {
    const { communityId, buildingNo, roomNo } = payload;
    state.communityId = communityId;
    state.buildingName = buildingNo;
    state.roomNo = roomNo;
  },

  [types.UDATEBASEINFO] (state, payload) {
    state.baseInfo = JSON.parse(JSON.stringify(payload));
  },

  [types.UDATEBASEINFOMUTY] (state, payload) {
    state.baseInfoMutifly = JSON.parse(JSON.stringify(payload));
  },

  [types.UPDATERANDOMNO] (state, payload) {
    state.randomNo += state.randomNo;
  },

  [types.ADDEVALUATIONINFO] (state, payload) {
    state.peopleList.forEach((v, i) => {
      if (payload.customerNo === v.customerNo) {
        v.recordData.evaluationInfo.length = 0;
        for (let item of payload.list) {
          v.recordData.evaluationInfo.push(item);
        };
      }
    });
  },

  [types.UPDATEEALTHINFO] (state, payload) {
    state.peopleList.forEach((v, i) => {
      if (payload.customerNo === v.customerNo) {
        v.recordData.healthInfo.length = 0;
        for (let item of payload.list) {
          v.recordData.healthInfo.push(item);
        };
      }
    });
  },

  [types.UPDATEMEDICAL] (state, payload) {
    state.peopleList.forEach((v, i) => {
      if (payload.customerNo === v.customerNo) {
        v.recordData.medicineInfo.length = 0;
        for (let item of payload.list) {
          v.recordData.medicineInfo.push(item);
        };
      }
    });
  },

  [types.UPDATECAREINFO] (state, payload) {
    state.peopleList.forEach((v, i) => {
      if (payload.customerNo === v.customerNo) {
        v.recordData.careInfo.length = 0;
        for (let item of payload.list) {
          v.recordData.careInfo.push(item);
        };
      }
    });
  },

  [types.SUBMITQUESNAIRE] (state, payload) {
    state.quesnaireIsSuceessSubmit = payload;
  },

  [types.RESORECORDDATA] (state, payload) {
    // 判断评估资料已经填写完成
    let flag = true;
    try {
      state.peopleList.forEach((v, i) => {
        if (v.recordData.evaluationInfo.length < 1) {
          Notify({ type: 'warning', message: `第${i + 1}条数据评估资料还没填写` });
          flag = false;
          throw new Error();
        } else {
          flag = true;
        }
      });
    } catch (e) {
      console.error(e);
    }

    if (flag) {
      state.recordDataList.length = 0;
      state.peopleList.forEach((v, i) => {
        const newObj = {
          customerRel: v.customerRel,
          customerNo: v.customerNo,
          recordData: []
        };
        v.recordData.medicineInfo.forEach((n, z) => {
          newObj.recordData.push(n);
        });
        v.recordData.evaluationInfo.forEach((n, z) => {
          newObj.recordData.push(n);
        });
        v.recordData.healthInfo.forEach((n, z) => {
          newObj.recordData.push(n);
        });
        v.recordData.careInfo.forEach((n, z) => {
          newObj.recordData.push(n);
        });
        state.recordDataList.push(newObj);
      });
      const newObj = {
        customerRel: 1,
        customerNo: 1,
        recordData: []
      };
      state.baseInfo.forEach((v, i) => {
        newObj.recordData.push(v);
      });
      state.baseInfoMutifly.forEach((v, i) => {
        newObj.recordData.push(v);
      });
      state.recordDataList.push(newObj);
      state.flag = true;
    }
  }
};
