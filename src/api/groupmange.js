/*
 * @Description: 分组管理和分区管理
 * @Author: gao shuai
 * @Date: 2020-02-25 15:36:33
 * @LastEditTime: 2020-08-31 10:04:46
 * @LastEditors: gao shuai
 */
import api from '../assets/js/apiRequestHandler';
import mgr from '../assets/js/securityapi';
export default {
  /* ---------------------1.分组管理----------------------- */
  // 获取分组list
  async teamlist(params) {
    let header = await mgr();
    return api({
      url: '/api/Group/GetGroupListAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 添加分组
  async addteam(params) {
    let header = await mgr();
    return api({
      url: '/api/Group/AddGroupAsync',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 编辑分组
  async editteam(params) {
    let header = await mgr();
    return api({
      url: '/api/Group/UpdateAsync',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 删除分组
  async deleteteam(params) {
    let header = await mgr();
    return api({
      url: '/api/Group/DeleteGourpAsync',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 充值
  async rechargeteam(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/GetCircuiteAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 充值域名
  async getCircuite(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/GetAllCircuiteAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  /* ---------------------2.分区管理----------------------- */
  // 分区列表
  async arealist(params) {
    let header = await mgr();
    return api({
      url: '/api/PartitionsManager/GetPartitionsTemplatesListAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 所属分组下拉
  async belongDrow(params) {
    let header = await mgr();
    return api({
      url: '/api/InstallPartition/GetGroups',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 游戏模板下拉
  async gameDrow(params) {
    let header = await mgr();
    return api({
      url: '/api/PartitionsManager/GetTemplateListAysnc',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 微信密保下拉
  async getWxmbTemplates(params) {
    let header = await mgr();
    return api({
      url: '/api/WxUserValid/GetWxmbTemplates',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 获取微信二维码模板
  async getQrcodeTemplates(params) {
    let header = await mgr();
    return api({
      url: '/api/WxUserValid/GetQrcodeTemplates',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 批量删除分区管理
  async delAreas(params) {
    let header = await mgr();
    return api({
      url: '/api/PartitionsManager/BatchDeletePartitionsManagerAsync',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 获取分区详细信息
  async getAreaInfo(params) {
    let header = await mgr();
    return api({
      url: '/api/PartitionsManager/GetPartitionDetailAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 加载分区
  async loadingArea(params) {
    let header = await mgr();
    return api({
      url: '/api/PartitionsManager/LoadPartitionAsync',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 修改分区
  async editArea(params) {
    let header = await mgr();
    return api({
      url: '/api/PartitionsManager/UpdatePartitionAsync',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 分区检测
  async checkLink(params) {
    let header = await mgr();
    return api({
      url: '/api/PartitionsManager/CheckPartition',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 定时检测分区
  async timerCheck(params) {
    let header = await mgr();
    return api({
      url: '/api/PartitionsManager/CheckPartitionStatus',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 新增二维码模版
  async addQrcodeTemplate(params) {
    let header = await mgr();
    return api({
      url: '/api/WxUserValid/AddQrcodeTemplate',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },

  // 新增微信密保模版
  async addWxmbTemplate(params) {
    let header = await mgr();
    return api({
      url: '/api/WxUserValid/AddWxmbTemplate',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 获取二维码模版-不分页
  async getAllQrcodeTemplates(params) {
    let header = await mgr();
    return api({
      url: '/api/WxUserValid/GetQrcodeTemplates',
      method: 'get',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  }
};
