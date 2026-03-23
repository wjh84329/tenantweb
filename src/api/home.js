/*
 * @Description: 首页
 * @Author: gao shuai
 * @Date: 2020-05-11 16:53:43
 * @LastEditTime: 2020-08-18 14:15:35
 * @LastEditors: gao shuai
 */

import api from '../assets/js/apiRequestHandler';
import mgr from '../assets/js/securityapi';
export default {
  // 充值信息
  async chargeInfo(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/GetHomePageOrdersTodayListAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 获取公告信息
  async getNotice(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/GetNoticeListAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 获取用户信息
  async getUserinfo(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/GetMerchantsInformationListAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  async GetRanchResults(params) {
    let header = await mgr();
    return api({
      url: '/api/UserCenter/GetRanchResults',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 获取账户余额
  async getAccountInfo(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/GetHomePageBanksListAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 提现金额，提现手续费
  async cashWithdraw(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/GetHomeCashWithdrawalACListAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 获取最新充值订单列表
  async orderList(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/GetNewestOrdersListAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 在线客户显示
  async serviceShow(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/GetServiceStateListAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 获取玩家留言数量
  async leaveMessage(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/GetGamePlayerMessageCountAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 在线客服off/on
  async serviceOff(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/GetOnlineCustomerServiceStateUpdateAsync',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 微信订单通知off/on
  async wechatOff(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/WeChatOrderNotificationStateUpdateAsync',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 设置通道排序
  async setPayTypeState(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/SetPayType',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 设置充值角色名
  async SetGameName(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/SetGameName',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 玩家留言off/on
  async leaveMessageOff(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/OnlineLeaveStateOffUpdateAsync',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 手机号码off/on
  async phoneOff(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/OnlinePhoneStateOffUpdateAsync',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 结算比率列表
  async rankList(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/GetRanksListAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 结算比率状态改变
  async rankState(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/ChangeRanksOffOnAsync',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 重置密码
  async resetPassword(params) {
    let header = await mgr();
    return api({
      url: '/api/UserManage/ResetPassword',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 检测个人信息
  async checkPersonInfo(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/CheckTenantInformationAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  /* ---------------------2.留言箱-------------------- */
  // 留言箱list
  async messageList(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/GetGamePlayerMessageListAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 更改留言箱的未读状态
  async mailState(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/ChangeMessageStateAsync',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 删除邮箱信息
  async delMail(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/DeleteMerchantMessageAsync',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 提现信息
  async withdrawApply(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/CashWithdrawalListAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 提现提交
  async withdrawSumbit(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/CashWithdrawalOperationAsync',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 转账申请
  async TransferUsingPaid(params) {
    let header = await mgr();
    return api({
      url: '/api/UserCenter/TransferUsingPaid',
      method: 'post',
      data: params,
      headers:
        { Authorization: 'Bearer ' + header }
    });
  },
  // 获取二维码
  async getQrCode(params) {
    let header = await mgr();
    return api({
      url: '/api/WxUserValid/GetWxValidInfo',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 退出时调用接口
  async loginOut(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/LoginOutAsync',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 上传图像的图片
  async uploadprofit(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/UploadImage',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 获取用户图像
  async getProfile(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/GetHeadImgAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 获取充值的默认值
  async rechargeDefault(params) {
    let header = await mgr();
    return api({
      url: '/api/UserCenter/GetDefaultRechargeAmount',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 设置商户充值金额
  async rechargeSetting(params) {
    let header = await mgr();
    return api({
      url: '/api/UserCenter/SetRechargeAmount',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 代理获取注册推广链接
  async promateLink(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/GetPopularizationUrl',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 单个订单下发
  async waitSent(params) {
    let header = await mgr();
    return api({
      url: '/api/OrderIssue/SendSingleOrder',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 单个订单下发
  async waitSentAll(params) {
    let header = await mgr();
    return api({
      url: '/api/OrderIssue/BatchSendOrder',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 设置皮肤
  async setSkin(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/SetDefaultSkinAsync',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 下载网关
  async downloadNet(params) {
    let header = await mgr();
    return api({
      url: '/api/UserCenter/GetFileAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 添加礼品订单
  async addEmsOrder(params) {
    let header = await mgr();
    return api({
      url: '/api/HomePage/AddEmsOrder',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 商户信息列表（接口已返回 IsEnableProductChannelSelect）
  async getMerchantsInformationList(params) {
    return api({
      url: '/api/HomePage/GetMerchantsInformationListAsync', // TODO：按你的真实路由改
      method: 'get',
      params
    });
  },
  // 获取产品通道设置
  async getProductChannelSetting(params) {
    return api({
      url: '/api/UserCenter/GetProductChannelSetting',
      method: 'get',
      params
    });
  },
  // 保存产品通道设置
  async saveProductChannelSetting(data) {
    return api({
      url: '/api/UserCenter/SaveProductChannelSetting',
      method: 'post',
      data
    });
  }
};
