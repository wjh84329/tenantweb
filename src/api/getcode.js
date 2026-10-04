/*
 * @Description: 获取代码
 * @Author: gao shuai
 * @Date: 2020-05-20 09:13:09
 * @LastEditTime: 2020-05-23 14:39:43
 * @LastEditors: gao shuai
 */

import api from '../assets/js/apiRequestHandler';
import mgr from '../assets/js/securityapi';
export default {
  // 游戏分组下拉
  async gameDraw(params) {
    let header = await mgr();
    return api({
      url: '/api/SelectDropDown/GetGroupNameNameListAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 下载获取地址
  async downLink(params) {
    let header = await mgr();
    return api({
      url: '/api/SelectDropDown/CreateRechargeFileAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 直接下载多线路充值文件，避免二次跳转到 localhost/127.0.0.1 或临时文件失效
  async downloadRechargeFile(params) {
    let header = await mgr();
    return api({
      url: '/api/SelectDropDown/DownloadRechargeFileAsync',
      method: 'get',
      params: params,
      responseType: 'blob',
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 充值站点
  async chargeStation(params) {
    let header = await mgr();
    return api({
      url: '/api/SelectDropDown/GetRechargeCircuitAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 切换登录器开启状态
  async loginSwitch(params) {
    let header = await mgr();
    return api({
      url: '/api/SelectDropDown/ChangeLoggerStateAsync',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 发布站来源统计
  async publishSwitch(params) {
    let header = await mgr();
    return api({
      url: '/api/SelectDropDown/ChangeIpsStateAsync',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 获取统计代码
  async staticCode(params) {
    let header = await mgr();
    return api({
      url: '/api/SelectDropDown/GetLoggerIpsDataAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 添加自定义域名
  async addCustomDomain(params) {
    let header = await mgr();
    return api({
      url: '/api/SelectDropDown/AddMerchantRechargeCircuitAsync',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 获取自定义域名列表
  async getCustomDomainList(params) {
    let header = await mgr();
    return api({
      url: '/api/SelectDropDown/GetMerchantRechargeCircuitAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  }
};
