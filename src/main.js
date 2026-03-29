import Vue from 'vue';
import App from './App.vue';
// import './registerServiceWorker';
import router from './router';
import store from './store';
import VueRouter from 'vue-router';

import './icons'; // icon
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/common.scss';
import './assets/css/main.css';
import echarts from 'echarts';
import mixin from './assets/js/mixin';
import api from './api/index';

// // 从 localStorage 恢复优先，其次是 store，再次是默认色
// let savedColor = localStorage.getItem('themeColor');
// // 归一化：确保以 '#' 开头，并修剪空白
// if (savedColor) {
//   savedColor = savedColor.trim();
//   if (!savedColor.startsWith('#')) savedColor = '#' + savedColor;
// }
// const defaultColor = savedColor || (store && store.state && store.state.themeColor) || '#72c9f5';
// try { console.debug('[MAIN] init themeColor:', { savedColor, storeColor: store.state.themeColor, defaultColor }); } catch (e) {}
// document.documentElement.style.setProperty('--theme-color', defaultColor);

// // 如果 store 里没有值，尝试把 localStorage 的值同步回 store（需存在对应 mutation）
// if ((!store.state.themeColor || !store.state.themeColor.startsWith('#')) && savedColor && store.commit) {
//   try {
//     store.commit('SET_THEME_COLOR', savedColor);
//   } catch (e) {
//     // 如果没有该 mutation，可忽略或在 store 中添加
//   }
// }
const skinNum = Number(localStorage.getItem('skinNum')) || 0;

const skinColorMap = {
  0: '#0398d6',
  1: '#88434f',
  2: '#2d3338',
  3: '#3370ff',
  4: '#d75f28',
  5: '#9966cc',
  6: '#5d4aee'
};

const defaultColor = skinColorMap[skinNum] || '#0398d6';
document.documentElement.style.setProperty('--theme-color', defaultColor);

// 监听 themeColor 变化，动态更新 CSS 变量 并持久化
store.watch(
  (state) => state.themeColor,
  (val) => {
    const color = (val && !val.startsWith('#')) ? ('#' + val) : (val || '#72c9f5');
    document.documentElement.style.setProperty('--theme-color', color);
    try {
      localStorage.setItem('themeColor', color);
    } catch (e) {}
    try { console.debug('[MAIN] store.watch themeColor ->', color); } catch (e) {}
  }
);
Vue.config.productionTip = false;
Vue.prototype.$api = api;
Vue.mixin(mixin);
Vue.use(ElementUI);
Vue.prototype.$echarts = echarts;
Vue.prototype.$messageSuccess = function(text) {
  ElementUI.Message.success({
    message: text,
    showClose: true,
    duration: 1000,
    offset: 350
  });
};
Vue.prototype.$messageError = function(text) {
  if (!text) {
    return;
  }
  ElementUI.Message.error({
    message: text,
    showClose: true,
    duration: 1200,
    offset: 350
  });
};

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onComplete, onAbort) {
  if (onComplete || onAbort) {
    return originalPush.call(this, location, onComplete, onAbort);
  }
  return originalPush.call(this, location).catch(err => {
    if (err && err.name === 'NavigationDuplicated') {
      return err;
    }
    return Promise.reject(err);
  });
};

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
