/*
 * @Description: 代理系统
 * @Author: gao shuai
 * @Date: 2020-05-18 15:20:58
 * @LastEditTime: 2020-08-18 10:48:08
 * @LastEditors: gao shuai
 */

import api from '../assets/js/apiRequestHandler';
import mgr from '../assets/js/securityapi';
export default {
  /* --------------------------0.网站设置---------------------------- */
  async getSiteSetting() {
    let header = await mgr();
    return api({
      url: '/api/HomePage/GetAgentSiteSetting',
      method: 'get',
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  async saveSiteSetting(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/UpdateAgentSiteSetting',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  async uploadSiteLogo(form) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/UploadAgentSiteLogo',
      method: 'post',
      data: form,
      headers: {
        Authorization: 'Bearer ' + header,
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  /* --------------------------1.下属商户---------------------------- */
  // 下属商户列表
  async submerchantList(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/GetAgentMerchantListAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 代理下的登录
  async agentLogin(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/MerchantLoginAsync',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 添加商户
  async addMerchant(params) {
    let header = await mgr();
    return api({
      url: '/api/UserManage/AddMerchantAsync',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 比率组下拉
  async rankDraw(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/GetAgentMerchantRankTitlesAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 更新商户状态
  async stateChange(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/UpdateMerchantStateAsync',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 切换代理商户
  async rankChange(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/SwitchAgentMerchantRankAsync',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 删除下属商户
  async delMerchant(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/DeleteAgentMerchantAsync',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  /* --------------------------2.代理订单---------------------------- */
  // 支付方式
  async paydraw(params) {
    let header = await mgr();
    return api({
      url: '/api/SelectDropDown/GetPayModeNameListAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 下属商户下拉
  async subMerchantdraw(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/GetAgentMerchantAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 获取代理下的订单列表
  async orderList(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/GetAgentOrdersAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 获取代理下的统计
  async orderStatic(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/GetAgentOrderStatisticsViewAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  /* --------------------------3.用户分组---------------------------- */
  // 用户分组列表
  async userList(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/GetAgentMerchantRankListAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 切换默认
  async userDefalut(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/ChangeDefaultRankAsync',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 添加代理费率列表
  async productList(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/GetAddDefaultProductRateAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 添加代理费率
  async addrank(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/AddRankAsync',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 获取编辑时的数据
  async editInfo(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/GetUpdateProductRateAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 编辑代理费率
  async eidtrank(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/UpdateRankAsync',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 删除费率
  async delRank(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/DeleteRankAsync',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 费率设置时的大小限制
  async numLimit(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/GetAgentDefaultProductLimitRateAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  /* --------------------------4.分区管理---------------------------- */
  // 分区管理列表
  async agentmanageList(params) {
    let header = await mgr();
    return api({
      url: '/api/PartitionsManager/GetAgentMerchantPartitionsListAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  /* --------------------------5.数据统计---------------------------- */
  // 每日收益统计列表
  async dayStatis(params) {
    let header = await mgr();
    return api({
      url: '/api/DataAnalysis/GetAgentDailyIncomeAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 每日收益统计列表
  async staticsDetail(params) {
    let header = await mgr();
    return api({
      url: '/api/DataAnalysis/GetAgentDailyIncomeResultAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 充值排行
  async chargeRank(params) {
    let header = await mgr();
    return api({
      url: '/api/DataAnalysis/GetAgentMerchantIncomeAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 修改备注
  async updateMerchantDesc(params) {
    let header = await mgr();
    return api({
      url: '/api/UserManage/UpdateUserDesc',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  }
};
