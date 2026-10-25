// import { set } from 'core-js/core/dict';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const saved = localStorage.getItem('themeColor');
const initThemeColor = saved ? (saved.startsWith('#') ? saved : '#' + saved) : '#72c9f5';

const state = {
  uuid: '',
  userType: false,
  nickName: '',
  id: '',
  preview: 0,
  floatstyle: 1,
  floatingpictures: 0,
  chargeUrl: '',
  isEnabledPaid: false,
  isEnabledWxValid: false,
  isEnabledSpace: false,
  isPlatOpenWxValid: false,
  settlementType: 0,
  roleInfo: '',
  qyState: false,
  themeColor: initThemeColor,
  isCro: false
};

const mutations = {
  saveuuid(state, data) {
    state.uuid = data;
  },
  saveType(state, data) {
    state.userType = data;
  },
  saveisCro(state, data) {
    state.isCro = data;
  },
  changeId(state, data) {
    state.id = data;
  },
  changeNickName(state, data) {
    state.nickName = data;
  },
  changePreview(state, data) {
    state.preview = data;
  },
  changefloatstyle(state, data) {
    state.floatstyle = data;
  },
  changefloatingpictures(state, data) {
    state.floatingpictures = data;
  },
  changeUrl(state, data) {
    state.chargeUrl = data;
  },
  setEnabledPaid(state, data) {
    state.isEnabledPaid = data;
  },
  setEnabledWxValid(state, data) {
    state.isEnabledWxValid = data;
  },
  setEnabledSpace(state, data) {
    state.isEnabledSpace = data;
  },
  setPlatOpenWxValid(state, data) {
    state.isPlatOpenWxValid = data;
  },
  settlementType(state, data) {
    state.settlementType = data;
  },
  setRoleInfo(state, data) {
    state.roleInfo = data;
  },
  changeqyState(state, data) {
    state.qyState = data;
  },
  SET_THEME_COLOR(state, color) {
    const normalized = color && !color.startsWith('#') ? ('#' + color) : (color || '#72c9f5');
    state.themeColor = normalized;
    try {
      localStorage.setItem('themeColor', normalized);
    } catch (e) {
      // 忽略 localStorage 写入错误
    }
  }
};

export default new Vuex.Store({
  state,
  mutations,
  actions: {},
  modules: {}
});
