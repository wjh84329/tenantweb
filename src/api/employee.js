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
  /* --------------------------1.下属员工---------------------------- */
  // 下属员工列表
  async submerchantList(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/GetEmployeeListAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 下属子账户列表
  async submerchantListz(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/GetEmployeeZListAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },

  // 添加员工
  async addMerchant(params) {
    let header = await mgr();
    return api({
      url: '/api/UserManage/AddEmployeeAsync',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 添加分组
  async addteam(params) {
    let header = await mgr();
    return api({
      url: '/api/UserManage/AddEmployeeTeamAsync',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  async updateSubAccountPermissions(params) {
    let header = await mgr();
    return api({
      url: '/api/UserManage/UpdateSubAccountPermissions',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 删除下属员工
  async delMerchant(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/DeleteEmployeeAsync',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 添加角色
  async addRole(params) {
    let header = await mgr();
    return api({
      url: '/api/UserManage/SaveRole',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 获取角色
  async getRole(params) {
    let header = await mgr();
    return api({
      url: '/api/UserManage/RolePage',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 删除角色
  async delRole(params) {
    let header = await mgr();
    return api({
      url: '/api/UserManage/DeleteRole',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  }
};
