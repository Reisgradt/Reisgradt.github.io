import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import axios from 'axios';

function listDirAPI(port, param = '') {
  return `http://127.0.0.1:${port}/list-dir/${param}`;
}
function getContent(port, param = '') {
  return `http://127.0.0.1:${port}/get-file/${param}`;
}
function saveFile(port) {
  return `http://127.0.0.1:${port}/save-file/`;
}

function searchDir(list, name) {
  return list.filter(item => !item.isFile && item.name === name)[0];
}
function searchDirByPath(list, path) {
  const pathArr = path.split('/');

  let currDir = list;
  for (let i = 0; i < pathArr.length; ++i) {
    currDir = searchDir(currDir, pathArr[i]);

    if (!currDir) return false;
  }

  return currDir;
}

function handleRes(res) {
  return res.data.map(item => {
    return !item.isFile
      ? Object.assign(item, { nested: [], isOpen: false })
      : item;
  });
}

const state = {
  port: 5000,
  errText: '',
  listDir: [],
  content: '',
  contentPath: ''
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
  },
  toggleDir(state, path) {
    const currDir = searchDirByPath(state.listDir, path);

    if (!currDir) return;

    currDir.isOpen = !currDir.isOpen;
  },
  updateSubdir(state, { path, nestedList }) {
    const currDir = searchDirByPath(state.listDir, path);

    currDir.nested = nestedList;
  },
  updateContent(state, {text, path}) {
    state.content = text;
    state.contentPath = path || state.contentPath;
  }
};

const actions = {
  getDirs({ state, commit }) {
    return axios
      .get(listDirAPI(state.port))
      .then(res => {
        /* Add nested for dirs */
        const data = handleRes(res);

        commit('updateDirs', data);
        commit('updateErr');

        return true;
      })
      .catch(err => {
        commit('updateErr', err.toString());

        return false;
      });
  },
  toggleDir({ state, commit }, path) {
    commit('toggleDir', path);

    axios
      .get(listDirAPI(state.port, path))
      .then(res => {
        commit('updateErr');
        commit('updateSubdir', {
          path,
          nestedList: handleRes(res)
        });
      })
      .catch(err => {
        commit('updateErr', err.toString());
      });
  },
  updateContent({ state, commit }, path) {
    axios
      .get(getContent(state.port, path))
      .then(res => {
        commit('updateErr');

        const text = res.data;
        commit('updateContent', {text, path});
      })
      .catch(err => {
        commit('updateErr', err.toString());
      });
  },
  saveFile({ state, commit }, path) {
    axios
      .post(saveFile(state.port), {
        filePath: path,
        content: state.content
      })
      .then(() => {
        commit('updateErr');
      })
      .catch(err => {
        commit('updateErr', err.toString());
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
