import * as types from './mutations-types';

export default {
  [types.TEST] (state, payload) {
    state.baseInfoIsCommited = payload;
  }
};
