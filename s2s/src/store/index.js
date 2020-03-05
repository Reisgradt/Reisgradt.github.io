import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import axios from 'axios';

function listDirAPI(port, param = '') {
  return `http://127.0.0.1:${port}/list-dir/${param}`;
}

const state = {
  port: 5000,
  errText: '',
  listDir: []
};

const mutations = {
  updatePort(state, value) {
    state.port = value;
  },
  updateDirs(state, value) {
    state.listDir = value;
  },
  updateErr(state, value = '') {
    state.errText = value;
  }
};

const actions = {
  getDirs({ state, commit }) {
    return axios
      .get(listDirAPI(state.port))
      .then(res => {
        /* Add nested for dirs */
        const data = res.data.map(item =>
          !item.isFile ? Object.assign(item, { nested: [] }) : item
        );

        commit('updateDirs', data);

        return true;
      })
      .catch(err => {
        commit('updateErr', err.toString());

        return false;
      });
  }
};

const store = new Vuex.Store({
  namespaced: true,
  state,
  mutations,
  actions
});

export default store;
