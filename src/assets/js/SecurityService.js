/* eslint-disable */
import axios from 'axios';
// import AxiosInstance from './apiRequestHandler';
import { url, authUrl } from '../js/version';

// 本地存储 key
const TOKEN_KEY = 'access_token';
const USER_INFO_KEY = 'user_info';

function getStoredItem(key) {
  return sessionStorage.getItem(key) || localStorage.getItem(key);
}

function clearStoredLogin() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_INFO_KEY);
  sessionStorage.removeItem(TOKEN_KEY);
  sessionStorage.removeItem(USER_INFO_KEY);
}

export default class SecurityService {
  /**
   * 使用账号密码 + 验证码登录：
   * 1. 调后端 /Account/LoginApi 做验证码/账号状态校验并登录
   * 2. 后端直接返回 access_token + 用户信息
   * 3. 根据“保持登录”存入 localStorage 或 sessionStorage
   */
  async loginByPassword({ username, password, code, checkKey, rememberLogin = false, clientIp = null }) {
    const payload = {
      Username: username,
      Password: password,
      RememberLogin: rememberLogin,
      Code: code,
      CheckKey: checkKey
    };
    const config = {};
    if (clientIp) {
      config.headers = { 'X-Real-IP': clientIp };
    }
    
    const loginRes = await axios.post(authUrl + '/Account/LoginApi', payload, config);
    const loginData = loginRes.data;

    if (!loginData || loginData.success === false) {
      throw new Error(loginData?.message || '登录失败');
    }

    const userInfo = {
      userId: loginData.userId,
      username: loginData.username,
      roles: loginData.roles,
      state: loginData.state
    };
    // this.$store.commit('setId', userInfo.userId); // 你的 Vuex 里有 setId 方法
    if (!loginData.access_token) {
      throw new Error('后台未返回 access_token');
    }

    clearStoredLogin();
    const storage = rememberLogin ? localStorage : sessionStorage;
    storage.setItem(TOKEN_KEY, loginData.access_token);
    storage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
    // AxiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + loginData.access_token;
    // 全局 axios 带上 Token
    // axios.defaults.headers.common['Authorization'] = 'Bearer ' + loginData.access_token;

    return {
      token: loginData.access_token,
      user: userInfo
    };
  }

  // === 统一基于本地存储的辅助方法 ===

  getAcessToken() {
    return Promise.resolve(getStoredItem(TOKEN_KEY) || null);
  }

  getSignedIn() {
    return new Promise((resolve) => {
      const token = getStoredItem(TOKEN_KEY);
      const userInfoStr = getStoredItem(USER_INFO_KEY);
      if (!token || !userInfoStr) return resolve('');
      try {
        const user = JSON.parse(userInfoStr);
        return resolve(user);
      } catch (e) {
        return resolve('');
      }
    });
  }

  getUser() {
    return this.getSignedIn();
  }

  getProfile() {
    return this.getSignedIn().then(u => u || null);
  }

  getRole() {
    return new Promise((resolve) => {
      const userInfoStr = getStoredItem(USER_INFO_KEY);
      if (!userInfoStr) return resolve(null);
      try {
        const user = JSON.parse(userInfoStr);
        const roles = user.roles || [];
        if (user.state === 'CustomRole' || roles.includes('CustomRole')) {
          return resolve('CustomRole');
        }
        return resolve(roles[0] || null);
      } catch (e) {
        return resolve(null);
      }
    });
  }

  // 旧接口兼容：直接返回当前 token
  renewToken() {
    return this.getAcessToken().then(token => ({ access_token: token }));
  }

  signIn() {
    // 旧的重定向登录逻辑废弃，保留空实现避免旧代码报错
    return;
  }

  signOut() {
    clearStoredLogin();
    delete axios.defaults.headers.common['Authorization'];
  }

  getIdToken() {
    return Promise.resolve(null);
  }

  getSessionState() {
    return Promise.resolve(null);
  }

  getScopes() {
    return Promise.resolve(null);
  }

  // 简单鉴权检查：尝试请求一个需要登录的接口
  isAuthToMeatch() {
    return new Promise((resolve) => {
      this.getAcessToken()
        .then((accessToken) => {
          if (!accessToken) return resolve(false);
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
          axios
            .get(url + 'api/HomePage/GetHomePageOrdersTodayListAsync')
            .then(() => resolve(true))
            .catch(() => resolve(false));
        })
        .catch(() => resolve(false));
    });
  }

  // 旧 OIDC ReturnUrl 保留空实现
  getReturnUrl() {
    return Promise.resolve('');
  }

  popupLayer() {
    return;
  }
}
