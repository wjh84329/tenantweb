/*
 * @Description: axios的封装
 * @Author: gao shuai
 * @Date: 2020-02-25 15:24:12
 * @LastEditTime: 2020-08-18 22:44:53
 * @LastEditors: gao shuai
 */
import axios from 'axios';
import Mgr from './SecurityService';
import {
  url
} from './version';
/* 实例化axios */
const AxiosInstance = axios.create();
const IS_DEV = process.env.NODE_ENV !== 'production';
// const DEV_BASEURL = 'http://192.168.32.113:8111'; // 开发模式的url
const DEV_BASEURL = url; // 开发模式的url
// const PRO_BASEURL = 'http://192.168.32.113:8111'; // 生产模式的url
const PRO_BASEURL = url; // 生产模式的url

/* 实例对象默认配置 */
AxiosInstance.defaults.baseURL = IS_DEV ? DEV_BASEURL : PRO_BASEURL; // 区分开发和正式基础路径
// AxiosInstance.defaults.responseType = 'json'; // 返回数据类型json
AxiosInstance.defaults.timeout = 100000; // 超时时间
AxiosInstance.defaults.headers = {
  // 'Content-Type': 'application/x-www-form-urlencoded',
  'Content-Type': 'application/json'
};
let mgr = new Mgr();
/**
 * 请求拦截器
 */
/**
 * 响应拦截器
 */
AxiosInstance.interceptors.request.use(config => {
  const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = 'Bearer ' + token;
  }
  const userIp = localStorage.getItem('user_ip');
  if (userIp) {
    // 方式一：加到headers
    config.headers['X-Real-IP'] = userIp;
  }
  return config;
},
err => {
  const response = err && err.response ? err.response : null;
  const data = response ? response.data : null;
  const status = response ? response.status : null;
  const code = data && data.statusCode ? data.statusCode : null;

  // 统一处理未登录 / token 失效（后端可能用 HTTP 401 或在 body 里带 statusCode=401）
  if (status === 401 || code === 401) {
    mgr.signOut();
    window.location.href = '/#/login/loginHome';
    // 不再把错误抛给业务代码，避免再弹 message
    return new Promise(() => {}); // 返回一个 pending promise，终止后续链
  }

  // 423：账号被锁等，直接跳转，无需业务处理
  if (status === 423) {
    window.location.href = '/#/accessdenied';
    return new Promise(() => {});
  }
  if (data) {
    return Promise.reject(data);
  }
  // 其它错误交给业务层，err 保留原始结构，避免 err.data 为空时报 Cannot read...
  return Promise.reject(err);
}
);
/**
 * 响应拦截器
 */
AxiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  err => {
    const response = err && err.response ? err.response : null;
    const data = response ? response.data : null;
    const status = response ? response.status : null;
    const code = data && data.statusCode ? data.statusCode : null;

    // 统一处理未登录 / token 失效（后端可能用 HTTP 401 或在 body 里带 statusCode=401）
    if (status === 401 || code === 401) {
      mgr.signOut();
      window.location.href = '/#/login/loginHome';
      return new Promise(() => {}); // 阻断后续
    }

    // 423：账号被锁等，直接跳转，无需业务处理
    if (status === 423) {
      window.location.href = '/#/accessdenied';
      return new Promise(() => {});
    }
    if (data) {
      return Promise.reject(data);
    }
    return Promise.reject(err);
  }
);

export default AxiosInstance;
