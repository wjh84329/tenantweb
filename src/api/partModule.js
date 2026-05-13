/*
 * @Description: 分区模板
 * @Author: gao shuai
 * @Date: 2020-02-25 15:36:33
 * @LastEditTime: 2020-06-27 11:00:28
 * @LastEditors: gao shuai
 */
import api from '../assets/js/apiRequestHandler';
import mgr from '../assets/js/securityapi';
export default {
  // 分区分页模板列表
  async getTemplateList(params) {
    let header = await mgr();
    return api({
      url: '/api/PartitionsTemplates/GetPartitionsTemplatesListAsync',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 充值赠送状态切换
  async giveSwith(params) {
    let header = await mgr();
    return api({
      url: '/api/PartitionsTemplates/OffOnStateAsync',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 删除分区模板
  async deleteModule(params) {
    let header = await mgr();
    return api({
      url: '/api/PartitionsTemplates/PartitionsTemplatesDeleteAsync',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 获取模板的详情信息
  async moduleDetail(params) {
    let header = await mgr();
    return api({
      url: '/api/PartitionsTemplates/GetTemplateDetail',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 编辑模板
  async editModule(params) {
    let header = await mgr();
    return api({
      url: '/api/Template/EditTemplate',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 添加时获取充值渠道的产品
  async getproduct(params) {
    let header = await mgr();
    return api({
      url: '/api/Template/GetProducts',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 添加模板
  async addModule(params) {
    let header = await mgr();
    return api({
      url: '/api/Template/AddTemplate',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 游戏引擎下拉
  async gameEnginedrow(params) {
    let header = await mgr();
    return api({
      url: '/api/Template/GetEngineList',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  // 克隆template
  async cloneModule(params) {
    let header = await mgr();
    return api({
      url: '/api/Template/CloneTemplate',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  /**
   * 安装脚本模板（与网关 installscriptprocessor 使用的「模板目录」对应，按模板 Id + 游戏引擎）
   * 后台需实现以下契约（路径可按项目规范微调，前后端保持一致即可）
   */
  async getInstallScriptFiles(params) {
    let header = await mgr();
    return api({
      url: '/api/InstallScriptTemplate/GetInstallScriptFiles',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  async saveInstallScriptFile(params) {
    let header = await mgr();
    return api({
      url: '/api/InstallScriptTemplate/SaveInstallScriptFile',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  async previewInstallScript(params) {
    let header = await mgr();
    return api({
      url: '/api/InstallScriptTemplate/PreviewInstallScript',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  /** 按分区预览（占位符替换与网关生成对齐） */
  async previewInstallScriptForPartition(params) {
    let header = await mgr();
    return api({
      url: '/api/InstallScriptTemplate/PreviewInstallScriptForPartition',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  /** 按分区列出与网关实际输出对应的脚本项（含 Market_Def 多文件、通区充值模板名） */
  async getInstallScriptPreviewFilesForPartition(params) {
    let header = await mgr();
    return api({
      url: '/api/InstallScriptTemplate/GetInstallScriptPreviewFilesForPartition',
      method: 'get',
      params: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  /** 将分区预览编辑内容写入库（网关安装时优先使用）；content 空串可清除该文件键的覆盖 */
  async savePartitionInstallScriptOverride(params) {
    let header = await mgr();
    return api({
      url: '/api/InstallScriptTemplate/SavePartitionInstallScriptOverride',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  },
  async resetInstallScriptFile(params) {
    let header = await mgr();
    return api({
      url: '/api/InstallScriptTemplate/ResetInstallScriptFile',
      method: 'post',
      data: params,
      headers: { Authorization: 'Bearer ' + header }
    });
  }
};
