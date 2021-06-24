import * as types from './mutations-types';
export default {
  test ({ commit }, payload) {
    setTimeout(() => {
      commit(types.TEST, payload);
    }, 1000);
  }

};
