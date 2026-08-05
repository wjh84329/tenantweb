/*
 * @Description: 登录相关页面接口
 * @Author: gao shuai
 * @Date: 2020-06-06 14:50:14
 * @LastEditTime: 2020-06-23 14:19:15
 * @LastEditors: gao shuai
 */

import api from '../assets/js/apiRequestHandler';

function withSiteDomain(params) {
  return Object.assign({ siteDomain: window.location.host }, params || {});
}

export default {

  // 资费列表
  async rechargeList(params) {
    return api({
      url: '/api/About/GetTenantPostagesAsync',
      method: 'get',
      params: params
    });
  },
  // 联系我们
  async contactinfo(params) {
    return api({
      url: '/api/About/GetTenantBaseInfoAsync',
      method: 'get',
      params: withSiteDomain(params)
    });
  },
  // 注册
  async register(params) {
    return api({
      url: '/api/Register/UserRegister',
      method: 'post',
      data: params
    });
  },
  // 系统footer信息
  async footerInfo(params) {
    return api({
      url: '/api/About/GetTenantBaseInfoAsync',
      method: 'get',
      params: withSiteDomain(params)
    });
  },
  // 获取公告信息
  async getNotice(params) {
    return api({
      url: '/api/About/GetNoticeList',
      method: 'get',
      params: params
    });
  },
  // 系统footer信息
  async getRandomCode(params) {
    return api({
      url: '/api/Register/createcode',
      method: 'get',
      params: params
    });
  },
  async CreateMathCode(params) {
    return api({
      url: '/api/Register/CreateMathCode',
      method: 'get',
      params: params
    });
  },
  // 获取微信登录二维码
  async getWeChatCode(params) {
    return api({
      url: '/api/weixin/GetBindQr',
      method: 'get',
      params: params
    });
  },
  // 检测微信扫码登录状态
  async checkWeChatLogin(params) {
    return api({
      url: '/api/weixin/CheckBindScan',
      method: 'get',
      params: params
    });
  },
  // 获取登录二维码
  async getLoginQrCode(params) {
    return api({
      url: '/api/Weixin/LoginQr',
      method: 'get',
      params: params
    });
  },
  async checkBindWeixi(params) {
    return api({
      url: '/api/Weixin/CheckScan',
      method: 'get',
      params: params
    });
  }
};
