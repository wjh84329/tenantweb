<!--
 * @Description: 微信验证
 * @Author: xu wei
 * @Date: 2020-03-07 15:43:10
 * @LastEditTime: 2020-07-28 16:35:02
 * @LastEditors: gao shuai
 -->
<template>
  <div class="partinstall">
    <div class="bg_fff">
      <div class="gs_listcontainer">
        <p class="tip_red">微信验证</p>
      </div>
      <div class="mgl15 mgr15 pdb15">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="公众号设置" name="first">
            <p>
              支持：GOM、GEE、新BLUE、GOB引擎，<font color="#008000">安装请观看视频教程。</font>
            </p>
            <p class="mgt5">
              介绍：<font color="#0000FF">玩家扫码绑定公众号，可有效积累玩家资源、防止游戏账号被盗。推荐使用自己的公众号</font>
            </p>
            <el-divider></el-divider>
            <el-form ref="form" :model="form" label-width="160px">
              <el-form-item label="功能状态：">
                <span v-if="isEnabledWxValid">已开通</span>
                <span v-else>未开通</span>
              </el-form-item>
              <el-form-item label="公众号：">
                <el-radio-group v-model="form.isOwnAccount">
                  <el-radio :label="false" :disabled="!isPlatOpenWxValid">平台公众号<font color="#FF0000"
                      v-if="!isPlatOpenWxValid">(未开通)</font>
                  </el-radio>
                  <el-radio :label="true">自己公众号</el-radio>
                </el-radio-group>
              </el-form-item>
              <div v-if="form.isPlatOpenWxValid && !form.isOwnAccount" class="tc pdt20 pdb25">
                <img style="width:200px;height:200px;" :src="codeimg + '?t=' + Date.now()" alt="">
                <p class="mgt5"><span>请保存微信二维码，并配置到游戏中</span></p>
              </div>
              <div v-if="form.isOwnAccount && isEnabledWxValid">
                <el-form-item label="查看消息关键字：">
                  <el-row :gutter="10">
                    <el-col :span="4">
                      <el-input :disabled="true" size="small" v-model="form.messageKeyword"></el-input>
                    </el-col>
                    <el-col :span="16">非认证号,请玩家输入<font color="#ff0000">1</font>,获取验证码</el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="公众号类型：">
                  <el-radio-group v-model="form.weChatAccountType">
                    <el-radio :label="1">订阅号 </el-radio>
                    <el-radio :label="2">未认证服务号</el-radio>
                    <el-radio :label="3">认证服务号</el-radio>
                  </el-radio-group>
                </el-form-item>
                <!-- <el-form-item label="公众号图片：" prop="proofFile" v-if="form.weChatAccountType == 1 || form.weChatAccountType == 2">
                  <el-upload class="avatar-uploader" :before-upload="fileSelect" :limit=1 list-type="picture-card"
                    action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false"
                    :on-success="handleAvatarSuccess">
                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                    <i v-else class="el-icon-plus"></i>
                    <div class="el-upload__tip" slot="tip">扩展名为jpg或png</div>
                  </el-upload>
                </el-form-item> -->
                <el-form-item label="公众号原始ID：">
                  <el-row>
                    <el-col :span="10">
                      <el-input size="small" v-model="form.wxOriginalId"></el-input>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="公众号Appid：">
                  <el-row>
                    <el-col :span="10">
                      <el-input size="small" v-model="form.appId"></el-input>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="公众号Secret：">
                  <el-row>
                    <el-col :span="10">
                      <el-input size="small" v-model="form.appSecret"></el-input>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="配置URL：">
                  <el-row>
                    <el-col :span="10">
                      <el-input size="small" v-model="form.configUrl" disabled></el-input>
                    </el-col>
                    <el-col :span="12">
                      <font color="#ff0000">
                        点保存后生成URL，请复制到公众号开发=>基本配置=>服务器地址(URL)</font>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="通讯token：">
                  <el-row>
                    <el-col :span="10">
                      <el-input size="small" v-model="form.communicationToken"></el-input>
                    </el-col>
                    <el-col :span="2">
                      <el-button size="small" type="primary" style="margin-left: 10px"
                        @click="token">生成token</el-button>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="消息加解密密钥：">
                  <el-row>
                    <el-col :span="10">
                      <el-input size="small" v-model="form.messageEncryptKey"></el-input>
                    </el-col>
                    <el-col :span="2">
                      <el-button size="small" type="primary" style="margin-left: 10px" @click="random">随机生成</el-button>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="消息加解密方式：">
                  <el-radio-group v-model="form.wxEncryptionType">
                    <el-radio :label="0">明文模式 </el-radio>
                    <el-radio :label="1">兼容模式</el-radio>
                    <el-radio :label="2">安全模式（推荐）</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="被关注回复：">
                  <el-row>
                    <el-col :span="10">
                      <el-input size="small" v-model="form.beConcernedReply" placeholder="如:欢迎关注XX公众号"></el-input>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="验证码模板ID：" v-show="false">
                  <el-row>
                    <el-col :span="10">
                      <el-input size="small" v-model="form.templateId" placeholder="验证码模板ID"></el-input>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="公众号二维码：" v-if="codeimg">
                  <el-row>
                    <el-col :span="10">
                      <img style="width:200px;height:200px;" :src="codeimg + '?t=' + Date.now()" alt="">
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item label="二维码链接：" v-if="codeimg">
                  <el-row>
                    <el-col :span="10">
                      <!-- <span>{{codeurl}}</span> -->
                      <a href="javascript:;" @click="openCipherImage">{{ codeimg }}</a>
                    </el-col>
                  </el-row>
                </el-form-item>
              </div>
              <el-form-item label="">
                <el-button type="danger" size="small" @click="saveConfig">确认保存</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="自定义回复" name="second">
            <el-form ref="replay" :model="replay" label-width="160px">
              <el-form-item label="">
                多个关键字请用半角逗号<font color="#ff0000">,</font>分隔
              </el-form-item>
              <el-form-item label="关键字1：">
                <el-row>
                  <el-col :span="10">
                    <el-input v-model="replay.key" size="small" type="textarea"
                      placeholder="如：官网,网站,网址,客服,群"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="回复内容1：">
                <el-row>
                  <el-col :span="10">
                    <el-input v-model="replay.reply" size="small" type="textarea"
                      placeholder="如：你好，我们的网站是：www.qq.com，QQ群是：123456"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="关键字2：">
                <el-row>
                  <el-col :span="10">
                    <el-input v-model="replay.key1" size="small" type="textarea"
                      placeholder="如：官网,网站,网址,客服,群"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="回复内容2：">
                <el-row>
                  <el-col :span="10">
                    <el-input v-model="replay.reply1" size="small" type="textarea"
                      placeholder="如：你好，我们的网站是：www.qq.com，QQ群是：123456"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="关键字3：">
                <el-row>
                  <el-col :span="10">
                    <el-input v-model="replay.key2" size="small" type="textarea"
                      placeholder="如：官网,网站,网址,客服,群"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="回复内容3：">
                <el-row>
                  <el-col :span="10">
                    <el-input v-model="replay.reply2" size="small" type="textarea"
                      placeholder="如：你好，我们的网站是：www.qq.com，QQ群是：123456"></el-input>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="">
                <el-button type="danger" size="small" @click="saveReplay">确认保存</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="查看/生成验证码" name="third">
            <div>
              功能介绍：本页面提供查看未过期的验证码，GM可以使用玩家对应验证码登陆游戏
              <el-button type="primary" size="small" style="margin-left: 10px" @click="refresh">刷新</el-button>
            </div>
            <el-divider></el-divider>
            <el-table ref="singleTable" :data="tableData" highlight-current-row border
              :header-cell-style="{ background: '#F2F2F2', color: '#606266' }" class="mgt15">
              <el-table-column property="partitionName" label="分区名称" align="center">

              </el-table-column>
              <el-table-column property="roleName" label="角色名称" align="center">
              </el-table-column>
              <el-table-column property="validateCode" label="验证码" align="center">
              </el-table-column>
              <el-table-column property="validateCodeType" label="验证类型" align="center">
              </el-table-column>
              <el-table-column property="remainingTime" label="剩余有效时间（秒）" align="center">
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <!-- ...existing code... -->
          <el-tab-pane label="自定义菜单" name="zdycd">
            <div style="padding: 10px 8px 16px 8px;">
              <p>
                介绍：支持配置公众号二级菜单，功能仅支持「跳转链接」、「回复文字」、「获取验证码」三种类型
              </p>
              <p class="mgt5">
                <span v-if="!form.isOwnAccount" style="color:#f56c6c;">当前为平台公众号，菜单不可编辑。</span>
                提示：保存后覆盖微信当前菜单（空菜单保存表示删除所有菜单），操作前请先同步公众号菜单。因微信自身缓存，保存菜单数据后，需等待几分钟，公众号菜单才会变化
              </p>
            </div>
            <el-button type="warning" size="small" @click="GetWxMenu" :disabled="!form.isOwnAccount">同步公众号菜单</el-button>
            <el-form :model="menuForm" label-width="70px">
              <!-- 一级菜单表单渲染 -->
              <div v-for="(menu, idx) in menuForm.menus" :key="menu.id" class="menu-form"
                style="border:1px solid #eee;padding:12px 16px;margin-bottom:10px;position:relative;">
                <el-divider content-position="left">
                  一级菜单{{ idx + 1 }}
                </el-divider>
                <el-button size="mini" type="danger" style="position:absolute;right:8px;top:8px;"
                  @click="removeMenu(idx)" :disabled="!form.isOwnAccount">删除</el-button>
                <el-row :gutter="10" align="middle">
                  <el-col :span="8">
                    <el-form-item label="菜单名称" label-width="70px" style="margin-bottom:0;">
                      <el-input v-model="menu.name" maxlength="16" size="small" placeholder="请输入菜单名称"
                        :disabled="!form.isOwnAccount"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="菜单类型" label-width="70px" style="margin-bottom:0;">
                      <el-select v-model="menu.type" size="small" style="width:140px" :disabled="!form.isOwnAccount">
                        <el-option label="点击回复文字" value="reply"></el-option>
                        <el-option label="点击跳转链接" value="url"></el-option>
                        <el-option label="点击回复验证码" value="code"></el-option>
                        <el-option label="父级菜单" value="parent"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 菜单类型为reply时显示 -->
                <el-row v-if="menu.type === 'reply'" style="margin-top:8px;">
                  <el-col :span="24">
                    <el-form-item label="回复内容" label-width="70px">
                      <el-input type="textarea" :rows="3" v-model="menu.reply" maxlength="600" show-word-limit
                        placeholder="请输入回复内容，最多600字符" :disabled="!form.isOwnAccount"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 菜单类型为url时显示 -->
                <el-row v-if="menu.type === 'url'" style="margin-top:8px;">
                  <el-col :span="12">
                    <el-form-item label="URL" label-width="70px">
                      <el-input v-model="menu.url" placeholder="请输入URL" :disabled="!form.isOwnAccount"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <!-- 父级菜单时可添加二级菜单 -->
                <div v-if="menu.type === 'parent'" style="margin-top:8px;">
                  <div v-for="(sub, subIdx) in menu.children" :key="sub.id" class="sub-menu-form"
                    style="border:1px dashed #ccc;padding:10px 12px;margin-bottom:8px;position:relative;">
                    <el-divider content-position="left">
                      二级菜单{{ subIdx + 1 }}
                    </el-divider>
                    <el-button size="mini" type="danger" style="position:absolute;right:8px;top:8px;"
                      @click="removeSubMenu(idx, subIdx)" :disabled="!form.isOwnAccount">删除</el-button>
                    <el-row :gutter="10" align="middle">
                      <el-col :span="8">
                        <el-form-item label="菜单名称" label-width="70px" style="margin-bottom:0;">
                          <el-input v-model="sub.name" maxlength="16" size="small" placeholder="请输入菜单名称"
                            :disabled="!form.isOwnAccount"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="10">
                        <el-form-item label="菜单类型" label-width="70px" style="margin-bottom:0;">
                          <el-select v-model="sub.type" size="small" style="width:140px" :disabled="!form.isOwnAccount">
                            <el-option label="点击回复文字" value="reply"></el-option>
                            <el-option label="点击跳转链接" value="url"></el-option>
                            <el-option label="点击回复验证码" value="code"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row v-if="sub.type === 'reply'" style="margin-top:8px;">
                      <el-col :span="24">
                        <el-form-item label="回复内容" label-width="70px">
                          <el-input type="textarea" :rows="3" v-model="sub.reply" maxlength="600" show-word-limit
                            placeholder="请输入回复内容，最多600字符" :disabled="!form.isOwnAccount"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row v-if="sub.type === 'url'" style="margin-top:8px;">
                      <el-col :span="12">
                        <el-form-item label="URL" label-width="70px">
                          <el-input v-model="sub.url" placeholder="请输入URL" :disabled="!form.isOwnAccount"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="RUL" label-width="70px">
                          <el-input v-model="sub.rul" placeholder="请输入RUL" :disabled="!form.isOwnAccount"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>
                  <el-button type="primary" size="mini" icon="el-icon-plus" @click="addSubMenu(idx)"
                    style="margin-top:4px;" :disabled="!form.isOwnAccount">添加二级菜单</el-button>
                </div>
              </div>
            </el-form>
            <el-button type="warning" size="small" icon="el-icon-plus" @click="addMenu" style="margin-top:8px;"
              :disabled="!form.isOwnAccount">添加一级菜单</el-button>
            <el-button type="danger" size="small" style="margin-left:12px;margin-top:8px;" @click="saveMenu"
              :disabled="!form.isOwnAccount">
              保存菜单
            </el-button>
          </el-tab-pane>
          <!-- ...existing code... -->
          <el-tab-pane label="绑定记录" name="bdjl">
            <div class="bind-records-container">
              <el-form :inline="true" :model="bindQuery" class="bind-query-form" size="small">
                <el-form-item label="游戏名称">
                  <el-input v-model="bindQuery.gameName" placeholder="请输入游戏名称" clearable
                    style="width:160px;"></el-input>
                </el-form-item>
                <el-form-item label="角色名称">
                  <el-input v-model="bindQuery.roleName" placeholder="请输入角色名称" clearable
                    style="width:160px;"></el-input>
                </el-form-item>
                <el-form-item label="机器码">
                  <el-input v-model="bindQuery.machineCode" placeholder="请输入机器码" clearable
                    style="width:180px;"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="getBindList">查询</el-button>
                  <el-button @click="resetBindQuery">重置</el-button>
                </el-form-item>
              </el-form>
              <el-table :data="bindTableData" border style="width: 100%; margin-top: 10px;"
                :header-cell-style="{ background: '#F2F2F2', color: '#606266' }" v-loading="bindLoading"
                empty-text="无数据">
                <el-table-column prop="id" label="ID" align="center" width="60" />
                <el-table-column prop="openId" label="openid" align="center" min-width="120" />
                <el-table-column prop="gameName" label="游戏名称" align="center" min-width="100" />
                <el-table-column prop="roleName" label="角色名称" align="center" min-width="80" />
                <el-table-column prop="machineCode" label="机器码" align="center" min-width="120" />
                <el-table-column prop="bindTime" label="绑定时间" align="center" min-width="140" />
                <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <!-- 可根据需求添加操作按钮 -->
                    <el-button size="small" @click="addToBlack(scope.row.openId)">加入黑名单</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="bind-pagination" style="margin: 10px 0 0 0; text-align:right;">
                <el-pagination background layout="total, prev, pager, next, sizes, jumper" :total="bindTotal"
                  :page-size="bindPageSize" :current-page="bindPage" :page-sizes="[10, 20, 50, 100]"
                  @size-change="bindPageSizeChange" @current-change="bindPageChange" style="display:inline-block;" />
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="操作日志" name="czrz">
            <div class="log-records-container">
              <el-form :inline="true" :model="logQuery" class="log-query-form" size="small">
                <el-form-item label="openid">
                  <el-input v-model="logQuery.openid" placeholder="请输入openid" clearable style="width:180px;"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="danger" @click="getLogList">查询</el-button>
                  <el-button @click="resetLogQuery">重置</el-button>
                </el-form-item>
              </el-form>
              <el-table :data="logTableData" border style="width: 100%; margin-top: 10px;"
                :header-cell-style="{ background: '#F8F8FA', color: '#606266' }" v-loading="logLoading"
                empty-text="无数据">
                <el-table-column prop="id" label="ID" align="center" width="60" />
                <el-table-column prop="openId" label="openId" align="center" min-width="120" />
                <el-table-column prop="operationType" label="类型" align="center" min-width="80" />
                <el-table-column prop="remarks" label="内容" align="center" min-width="180" />
                <el-table-column prop="createTime" label="时间" align="center" min-width="140" />
                <el-table-column label="详情" align="center" width="80">
                  <template>
                    <!-- 可根据需求添加详情按钮 -->
                  </template>
                </el-table-column>
              </el-table>
              <div class="log-pagination" style="margin: 10px 0 0 0; text-align:right;">
                <el-pagination background layout="total, prev, pager, next, sizes, jumper" :total="logTotal"
                  :page-size="logPageSize" :current-page="logPage" :page-sizes="[10, 20, 50, 100]"
                  @size-change="logPageSizeChange" @current-change="logPageChange" style="display:inline-block;" />
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="黑名单" name="hmd">
            <div class="blacklist-container">
              <el-alert type="warning" :closable="false" show-icon class="blacklist-tip" style="margin-bottom: 12px;">
                <template title>
                  <div>
                    <div>
                      功能介绍：黑名单用户无法进行微信验证，即无法进入游戏，建议添加违规游戏行为或通过游戏外挂的玩家
                    </div>
                    <div style="margin-top:2px;">
                      添加方法：前往绑定记录，复制玩家微信ID在下方添加（如：oB4nYjnoHhuWrPVi2pYLuPjnCaU0）
                    </div>
                  </div>
                </template>
              </el-alert>
              <el-form :inline="true" :model="blackQuery" class="black-query-form" size="small">
                <el-form-item label="openid">
                  <el-input v-model="blackQuery.openid" placeholder="请输入openid" clearable
                    style="width:180px;"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="danger" @click="getBlackList">查询</el-button>
                  <el-button @click="resetBlackQuery">重置</el-button>
                  <el-button type="primary" :disabled="!blackQuery.openid" @click="addToBlacklist">加入黑名单</el-button>
                </el-form-item>
              </el-form>
              <el-table :data="blackTableData" border style="width: 100%; margin-top: 10px;"
                :header-cell-style="{ background: '#F8F8FA', color: '#606266' }" v-loading="blackLoading"
                empty-text="无数据">
                <el-table-column prop="id" label="ID" align="center" width="60" />
                <el-table-column prop="openId" label="openid" align="center" min-width="120" />
                <el-table-column prop="createTime" label="添加时间" align="center" min-width="140" />
                <el-table-column prop="remark" label="备注" align="center" min-width="120" />
                <el-table-column label="操作" align="center" width="120">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" style="color:#f56c6c;"
                      @click="removeFromBlacklist(scope.row)">移除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="black-pagination" style="margin: 10px 0 0 0; text-align:right;">
                <el-pagination background layout="total, prev, pager, next, sizes, jumper" :total="blackTotal"
                  :page-size="blackPageSize" :current-page="blackPage" :page-sizes="[10, 20, 50, 100]"
                  @size-change="blackPageSizeChange" @current-change="blackPageChange" style="display:inline-block;" />
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="二维码模版" name="ewmmb">
            <div class="qrcode-template-container">
              <div class="qrcode-header" style="border: 1px solid #ccc;padding: 15px;">
                <div class="qrcode-title">补丁下载</div>
                <el-divider></el-divider>
                <div class="qrcode-tags">
                  热血传奇
                  <el-tag style="margin-left:8px;cursor: pointer;font-size: 14px;"><a target="_blank"
                      :href="`/script/七星支付Gom.zip`"><i class="el-icon-paperclip"></i>Gom</a></el-tag>
                  <el-tag style="margin-left:4px;cursor: pointer;font-size: 14px;"><a href="/script/七星支付Gee.zip"
                      target="_blank"><i class="el-icon-paperclip"></i>Gee</a></el-tag>
                  <el-tag style="margin-left:4px;cursor: pointer;font-size: 14px;"><a href="/script/七星支付BLUE2.zip"
                      target="_blank"><i class="el-icon-paperclip"></i>BLUE2</a></el-tag>
                  <el-tag style="margin-left:4px;cursor: pointer;font-size: 14px;"><a href="/script/七星支付996PCM2.zip"
                      target="_blank"><i class="el-icon-paperclip"></i>996PCM2</a></el-tag>
                  <el-tag style="margin-left:4px;cursor: pointer;font-size: 14px;"><a href="/script/七星支付HeroX.zip"
                      target="_blank"><i class="el-icon-paperclip"></i>HeroX</a></el-tag>
                  <el-tag style="margin-left:4px;cursor: pointer;font-size: 14px;"><a href="/script/七星支付翎风.zip"
                      target="_blank"><i class="el-icon-paperclip"></i>翎风</a></el-tag>
                </div>
              </div>
              <el-button type="danger" size="small" style="margin: 12px 0;"
                @click="openQrcodeDialog(false)">新增</el-button>
              <el-table :data="qrcodeTableData" border style="width: 100%;"
                :header-cell-style="{ background: '#F8F8FA', color: '#606266' }" v-loading="qrcodeLoading"
                empty-text="无数据">
                <el-table-column prop="title" label="标题" align="center" min-width="100" />
                <el-table-column prop="resourceCode" label="WII编号" align="center" min-width="80" />
                <el-table-column prop="imageCode" label="图片序号" align="center" min-width="80" />
                <el-table-column prop="serial" label="尺寸" align="center" min-width="60" />
                <el-table-column prop="xOffset" label="坐标X" align="center" min-width="60" />
                <el-table-column prop="yOffset" label="坐标Y" align="center" min-width="60" />
                <el-table-column prop="createTime" label="创建时间" align="center" min-width="140" />
                <el-table-column label="操作" align="center" width="120">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="openQrcodeDialog(true, scope.row)">编辑</el-button>
                    <el-button type="text" size="small" style="color:#f56c6c;"
                      @click="deleteQrcodeTemplate(scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="qrcode-pagination" style="margin: 10px 0 0 0; text-align:right;">
                <el-pagination background layout="total, prev, pager, next, sizes, jumper" :total="qrcodeTotal"
                  :page-size="qrcodePageSize" :current-page="qrcodePage" :page-sizes="[10, 20, 50, 100]"
                  @size-change="qrcodePageSizeChange" @current-change="qrcodePageChange"
                  style="display:inline-block;" />
              </div>
            </div>
            <!-- 新增/编辑二维码模版弹窗 -->
            <el-dialog :title="qrcodeDialog.isEdit ? '编辑' : '新增' + '/编辑'" :visible.sync="qrcodeDialog.visible"
              width="480px" :close-on-click-modal="false" @close="closeQrcodeDialog">
              <el-alert type="warning" :closable="false" show-icon style="margin-bottom: 18px;">
                BLUEM2使用pic脚本自动显示二维码，无需设置WIL补丁编号和图片序号，设置为0即可。
              </el-alert>
              <el-form ref="qrcodeForm" :model="qrcodeDialog.form" :rules="qrcodeDialog.rules" label-width="80px"
                size="small" style="padding-right:12px;">
                <el-form-item style="margin-top: 16px;" label="标题" prop="title">
                  <el-input v-model="qrcodeDialog.form.title" placeholder="请输入标题" maxlength="30" />
                </el-form-item>
                <el-form-item style="margin-top: 16px;" label="Wii编号" prop="resourceCode">
                  <el-input v-model="qrcodeDialog.form.resourceCode" placeholder="请输入WII编号" maxlength="20" />
                </el-form-item>
                <el-form-item style="margin-top: 16px;" label="图片序号" prop="imageCode">
                  <el-input v-model="qrcodeDialog.form.imageCode" placeholder="请输入图片序号" maxlength="20" />
                </el-form-item>
                <el-form-item style="margin-top: 16px;" label="尺寸" prop="serial">
                  <el-select v-model="qrcodeDialog.form.serial" placeholder="请选择尺寸" style="width:100%;">
                    <el-option v-for="n in [3, 4, 5, 6]" :key="n" :label="n" :value="n" />
                  </el-select>
                </el-form-item>
                <el-form-item style="margin-top: 16px;" label="坐标X" prop="xOffset">
                  <el-input v-model="qrcodeDialog.form.xOffset" placeholder="请输入坐标X" maxlength="10" />
                </el-form-item>
                <el-form-item style="margin-top: 16px;" label="坐标Y" prop="yOffset">
                  <el-input v-model="qrcodeDialog.form.yOffset" placeholder="请输入坐标Y" maxlength="10" />
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="closeQrcodeDialog">取消</el-button>
                <el-button type="danger" :loading="qrcodeDialog.loading" @click="saveQrcodeTemplate">确定</el-button>
              </div>
            </el-dialog>
          </el-tab-pane>
          <!-- filepath: d:\asp_project\Dokcer部署源码\tenantweb\src\views\individual\wechat.vue -->
          <!-- ...existing code... -->
          <el-tab-pane label="微信密保模版" name="wxmbmb">
            <div class="qrcode-template-container">
              <div class="qrcode-header" style="border: 1px solid #ccc;padding: 15px;">
                <div class="qrcode-title">微信密保模版</div>
                <el-divider></el-divider>
                <div class="qrcode-tags">
                  <el-button type="primary" size="small" @click="openWxmbDialog(false, null, '热血传奇')">+热血传奇</el-button>
                  <!-- <el-button type="primary" size="small" @click="openWxmbDialog(false, null, '传奇世界')">+传奇世界</el-button> -->
                </div>
              </div>
              <el-table :data="wxmbTableData" border style="width: 100%;"
                :header-cell-style="{ background: '#F8F8FA', color: '#606266' }" v-loading="wxmbLoading"
                empty-text="无数据">
                <el-table-column prop="name" label="模版名称" align="center" min-width="100" />
                <el-table-column prop="gameType" label="游戏类型" align="center" min-width="100" />
                <el-table-column prop="qrcodeType" label="二维码模版" align="center" min-width="100">
                  <template slot-scope="scope">
                    {{ getQrcodeTitle(scope.row.qrcodeType) }}
                  </template>
                </el-table-column>
                <el-table-column prop="isForce" label="是否强制验证" align="center" min-width="100">
                  <template slot-scope="scope">
                    <span :style="{ color: scope.row.isForce ? '#f56c6c' : '#67c23a' }">{{ scope.row.isForce ? '强制' :
                      '非强制' }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="transferEnable" label="转区功能" align="center" min-width="100">
                  <template slot-scope="scope">
                    <span :style="{ color: scope.row.transferEnable ? '#67c23a' : '#909399' }">{{
                      scope.row.transferEnable
                        ? '已开启' : '未开启' }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="创建二维码" prop="generateQrCode" width="120">
                  <template slot-scope="scope">
                    <el-switch
                      v-model="scope.row.generateQrCode"
                      :active-value="true"
                      :inactive-value="false"
                      @change="val => updateWxmbTemplateQrCodeFlag(scope.row, val)"
                    />
                  </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" align="center" min-width="140" />
                <el-table-column label="操作" align="center" width="120">
                  <template slot-scope="scope">
                    <el-button type="text" size="small" @click="openWxmbDialog(true, scope.row)">编辑</el-button>
                    <el-button type="text" size="small" style="color:#f56c6c;"
                      @click="deleteWxmbTemplate(scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="qrcode-pagination" style="margin: 10px 0 0 0; text-align:right;">
                <el-pagination background layout="total, prev, pager, next, sizes, jumper" :total="wxmbTotal"
                  :page-size="wxmbPageSize" :current-page="wxmbPage" :page-sizes="[10, 20, 50, 100]"
                  @size-change="wxmbPageSizeChange" @current-change="wxmbPageChange" style="display:inline-block;" />
              </div>
              <!-- 新增/编辑微信密保模版弹窗 -->
              <!-- ...existing code... -->
              <!-- filepath: d:\asp_project\Dokcer部署源码\tenantweb\src\views\individual\wechat.vue -->
              <el-dialog :title="wxmbDialog.isEdit ? '编辑模版' : '新增模版'" :visible.sync="wxmbDialog.visible" width="1100px"
                :close-on-click-modal="false" @close="closeWxmbDialog">
                <div class="wxmb-dialog-scroll">
                  <el-form ref="wxmbForm" :model="wxmbDialog.form" :rules="wxmbDialog.rules" label-width="160px"
                    size="small" style="padding-right:12px;" @submit.native.prevent="saveWxmbTemplate">
                    <!-- 基本信息 -->
                    <el-form-item label="模版名称" prop="name">
                      <el-input style="width: 30%;" v-model="wxmbDialog.form.name" maxlength="30" />
                    </el-form-item>
                    <el-form-item label="二维码模版" prop="qrcodeType" style="margin-top:18px;">
                      <el-select v-model="wxmbDialog.form.qrcodeType" placeholder="请选择二维码模版">
                        <el-option v-for="item in qrcodeTemplatesList" :key="item.id" :label="item.title"
                          :value="item.id"></el-option>
                      </el-select>
                    </el-form-item>
                    <!-- 传奇世界专属：补丁下载 -->
                    <el-form-item v-if="wxmbDialog.form.gameType === '传奇世界'" label="补丁下载" prop="patchType">
                      <div class="qrcode-tags">
                        <el-tag style="margin-left:8px;cursor: pointer;font-size: 14px;"><a
                            href="http://localhost:5003/script/七星服务Gom.zip"><i
                              class="el-icon-paperclip"></i>4x4</a></el-tag>
                        <el-tag style="margin-left:4px;cursor: pointer;font-size: 14px;"><a
                            href="http://localhost:5003/script/七星服务Gee.zip" target="_blank"><i
                              class="el-icon-paperclip"></i>8x8</a></el-tag>
                      </div>
                    </el-form-item>
                    <el-divider content-position="left">微信密保</el-divider>
                    <el-form-item label="是否进行强制验证" prop="isForce">
                      <el-radio-group v-model="wxmbDialog.form.isForce">
                        <el-radio :label="true">强制验证</el-radio>
                        <el-radio :label="false">不强制验证</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="验证密保地图ID" prop="mbMapId">
                      <el-input style="width: 30%;" v-model="wxmbDialog.form.mbMapId" />
                    </el-form-item>
                    <el-form-item label="验证完成传送地图ID" prop="finishMapId" style="margin-top:18px;">
                      <el-input style="width: 30%;" v-model="wxmbDialog.form.finishMapId" />
                    </el-form-item>
                    <!-- 热血传奇专属：密保变量定义 -->
                    <template v-if="wxmbDialog.form.gameType !== '传奇世界'">
                      <el-divider content-position="left">密保变量定义
                        <el-tooltip placement="top-start">
                          <div slot="content">变量说明
                            <br />GOM/新GOM/GEE：使用个人T变量。例如：T46、T47、T48
                            <br />BLUEM2：使用INTS变量，只需填写变量下标。例如：21、22、23
                            <br>使用变量之前，需要检查版本中是否已经使用该变量，
                            <br />以避免功能冲突，如果想使用其他变量，需要自行修改脚本<br />
                          </div>
                          <i class="el-icon-warning-outline"></i>
                        </el-tooltip>
                      </el-divider>
                      <el-row :gutter="10">
                        <el-col :span="8">
                          <el-form-item label="机器码" prop="machineVar">
                            <el-input v-model="wxmbDialog.form.machineVar" placeholder="如：T46" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="微信openid" prop="openidVar">
                            <el-input v-model="wxmbDialog.form.openidVar" placeholder="如：T47" />
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item label="微信保留ID" prop="wxVar">
                            <el-input v-model="wxmbDialog.form.wxVar" placeholder="如：T48" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </template>
                    <el-divider content-position="left">密保NPC</el-divider>
                    <el-form-item label="NPC名称" prop="npcName">
                      <el-input style="width: 30%;" v-model="wxmbDialog.form.npcName" placeholder="如：游戏密保认证" />
                    </el-form-item>
                    <el-form-item style="margin-top:18px;">
                      <el-row :gutter="10">
                        <el-col :span="6"><strong>地图ID</strong></el-col>
                        <el-col :span="4"><strong>x坐标</strong></el-col>
                        <el-col :span="4"><strong>y坐标</strong></el-col>
                        <el-col :span="6"><strong>外观ID</strong></el-col>
                        <el-col :span="4"><strong>操作</strong></el-col>
                      </el-row>
                      <div v-for="(npc, idx) in wxmbDialog.form.npcs" :key="idx" style="margin-bottom:8px;">
                        <el-row :gutter="10">
                          <el-col :span="6">
                            <el-input v-model="npc.mapId" placeholder="地图ID" />
                          </el-col>
                          <el-col :span="4">
                            <el-input v-model="npc.x" placeholder="x坐标" />
                          </el-col>
                          <el-col :span="4">
                            <el-input v-model="npc.y" placeholder="y坐标" />
                          </el-col>
                          <el-col :span="6">
                            <el-input v-model="npc.lookId" placeholder="外观ID" />
                          </el-col>
                          <el-col :span="4">
                            <el-button type="danger" size="mini" @click="removeNpc(idx)">删除</el-button>
                          </el-col>
                        </el-row>
                      </div>
                      <el-button type="text" @click="addNpc">+ 添加一行</el-button>
                    </el-form-item>
                    <el-divider content-position="left">游戏转区</el-divider>
                    <el-form-item>
                      <el-checkbox v-model="wxmbDialog.form.transferEnable">开启转区功能</el-checkbox>
                    </el-form-item>
                    <template v-if="wxmbDialog.form.transferEnable">
                      <el-form-item label="可转区最低金额" prop="transferMinAmount">
                        <el-input v-model="wxmbDialog.form.transferMinAmount" placeholder="请输入最低金额"
                          style="width: 200px;">
                          <template slot="append">元</template>
                        </el-input>
                        <span class="line_tip">玩家最低要充多少钱才可进行转区</span>
                      </el-form-item>
                      <!-- 热血传奇专属：转区变量定义 -->
                      <template v-if="wxmbDialog.form.gameType !== '传奇世界'">
                        <el-divider content-position="left">转区变量定义
                          <el-tooltip placement="top-start">
                            <div slot="content">变量说明
                              <br />GOM/新GOM/GEE：使用个人U变量。例如：U14、U15、U16、U17
                              <br />BLUEM2：使用INTS变量，只需填写变量下标。例如：21、22、23
                              <br>使用变量之前，需要检查版本中是否已经使用该变量，
                              <br />以避免功能冲突，如果想使用其他变量，需要自行修改脚本<br />
                            </div>
                            <i class="el-icon-warning-outline"></i>
                          </el-tooltip>
                        </el-divider>
                        <el-row :gutter="10">
                          <el-col :span="6">
                            <el-form-item label="充值转区点" prop="transferRechargeVar">
                              <el-tooltip placement="top-start">
                                <div slot="content">在当前游戏分区，玩家真实充值赠送的转区点保存变量，
                                  <br />赠送比例默认为1:1，即：充值100元，获得100点转区点。
                                </div>
                                <i class="el-icon-warning-outline" style="margin-left: -8px;margin-right: 5px;"></i>
                              </el-tooltip>
                              <el-input style="width: 80%;" v-model="wxmbDialog.form.transferRechargeVar"
                                placeholder="如：U46" />
                            </el-form-item>
                          </el-col>
                          <el-col :span="6">
                            <el-form-item label="已用转区点" prop="transferUsedVar">
                              <el-tooltip placement="top-start">
                                <div slot="content">在当前游戏分区，玩家已使用了多少转区点进行充值。
                                </div>
                                <i class="el-icon-warning-outline" style="margin-left: -8px;margin-right: 5px;"></i>
                              </el-tooltip>
                              <el-input style="width: 80%;" v-model="wxmbDialog.form.transferUsedVar"
                                placeholder="如：U47" />
                            </el-form-item>
                          </el-col>
                          <el-col :span="6">
                            <el-form-item label="角色是否已转区" prop="transferFlagVar">
                              <el-tooltip placement="top-start">
                                <div slot="content">当前游戏分区角色是否已经进行了转区操作，转区后的角色会被禁止登录游戏。
                                </div>
                                <i class="el-icon-warning-outline" style="margin-left: -8px;margin-right: 5px;"></i>
                              </el-tooltip>
                              <el-input style="width: 80%;" v-model="wxmbDialog.form.transferFlagVar"
                                placeholder="如：U48" />
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row :gutter="10">
                          <el-col :span="6">
                            <el-form-item label="通区货币" prop="transferCoinVar">
                              <el-tooltip placement="top-start">
                                <div slot="content">使用转区系统，所有分区需要设置一个通区货币，玩家使用通区货币兑
                                  <br />换游戏中的消耗，以满足不同版本之间不同的货币体系。
                                </div>
                                <i class="el-icon-warning-outline" style="margin-left: -8px;margin-right: 5px;"></i>
                              </el-tooltip>
                              <el-input style="width: 80%;" v-model="wxmbDialog.form.transferCoinVar"
                                placeholder="如：U49" />
                            </el-form-item>
                          </el-col>
                          <el-col :span="6">
                            <el-form-item label="通区货币名称" prop="transferCoinName">
                              <el-input v-model="wxmbDialog.form.transferCoinName" placeholder="如：游戏币" />
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </template>
                      <el-divider content-position="left">转区NPC</el-divider>
                      <el-form-item label="NPC名称" prop="transferNpcName">
                        <el-input v-model="wxmbDialog.form.transferNpcName" placeholder="如：自助转区服务" />
                      </el-form-item>
                      <el-form-item style="margin-top:18px;">
                        <el-row :gutter="10">
                          <el-col :span="6"><strong>地图ID</strong></el-col>
                          <el-col :span="4"><strong>x坐标</strong></el-col>
                          <el-col :span="4"><strong>y坐标</strong></el-col>
                          <el-col :span="6"><strong>外观ID</strong></el-col>
                          <el-col :span="4"><strong>操作</strong></el-col>
                        </el-row>
                        <div v-for="(npc, idx) in wxmbDialog.form.transferNpcs" :key="idx" style="margin-bottom:8px;">
                          <el-row :gutter="10">
                            <el-col :span="6">
                              <el-input v-model="npc.mapId" placeholder="地图ID" />
                            </el-col>
                            <el-col :span="4">
                              <el-input v-model="npc.x" placeholder="x坐标" />
                            </el-col>
                            <el-col :span="4">
                              <el-input v-model="npc.y" placeholder="y坐标" />
                            </el-col>
                            <el-col :span="6">
                              <el-input v-model="npc.lookId" placeholder="外观ID" />
                            </el-col>
                            <el-col :span="4">
                              <el-button type="danger" size="mini" @click="removeTransferNpc(idx)">删除</el-button>
                            </el-col>
                          </el-row>
                        </div>
                        <el-button type="text" @click="addTransferNpc">+ 添加一行</el-button>
                      </el-form-item>
                    </template>
                  </el-form>
                </div>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="closeWxmbDialog">取消</el-button>
                  <el-button type="danger" :loading="wxmbDialog.loading" @click="saveWxmbTemplate">确定</el-button>
                </div>
              </el-dialog>
              <!-- ...existing code... -->
            </div>
          </el-tab-pane>
          <!-- ...existing code... -->
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import mgr from '../../assets/js/securityapi';
import api from '../../assets/js/apiRequestHandler';
import { url, loginUrl } from '../../assets/js/version';

import CryptoJS from 'crypto-js';
export default {
  data() {
    return {
      loginUrls: '',
      wechatId: '',
      codeimg: '',
      codeurl: '',
      cipherBase64: '',
      imageUrl: '',
      activeName: 'first',
      isEnabledWxValid: false,
      isPlatOpenWxValid: false,
      wxQrStr: '',
      form: {
        id: 0,
        applicationUserId: 0,
        isOwnAccount: false,
        messageKeyword: '',
        appId: '',
        appSecret: '',
        configUrl: '',
        communicationToken: '',
        wxEncryptionType: 2,
        beConcernedReply: '',
        weChatAccountType: 0,
        templateId: '',
        wxQrStr: '',
        wxOriginalId: '',
        messageEncryptKey: ''
      },
      qrcodeTemplatesList: [], // 获取二维码模版，不分页
      replay: {
        id: 0,
        key: '',
        key1: '',
        key2: '',
        reply: '',
        reply1: '',
        reply2: '',
        weChatAccountId: 0
      },

      value: false,
      tableData: [],
      menuForm: {
        menus: []
      },
      menuIdSeed: 1,

      // 绑定记录相关
      bindQuery: {
        gameName: '',
        roleName: '',
        machineCode: ''
      },
      bindTableData: [],
      bindTotal: 0,
      bindPage: 1,
      bindPageSize: 10,
      bindLoading: false,

      // 操作日志相关
      logQuery: {
        openid: ''
      },
      logTableData: [],
      logTotal: 0,
      logPage: 1,
      logPageSize: 10,
      logLoading: false,

      // 黑名单相关
      blackQuery: {
        openid: ''
      },
      blackTableData: [],
      blackTotal: 0,
      blackPage: 1,
      blackPageSize: 10,
      blackLoading: false,

      // 二维码模版相关
      qrcodeTableData: [],
      qrcodeTotal: 0,
      qrcodePage: 1,
      qrcodePageSize: 10,
      qrcodeLoading: false,

      // 二维码模版弹窗
      qrcodeDialog: {
        visible: false,
        isEdit: false,
        loading: false,
        form: {
          // id: null,
          title: '',
          resourceCode: '',
          imageCode: '',
          serial: 3,
          xOffset: '',
          yOffset: ''
        },
        rules: {
          title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
          resourceCode: [{ required: true, message: '请输入WII编号', trigger: 'blur' }],
          imageCode: [{ required: true, message: '请输入图片序号', trigger: 'blur' }],
          serial: [{ required: true, message: '请选择尺寸', trigger: 'change' }],
          xOffset: [{ required: true, message: '请输入坐标X', trigger: 'blur' }],
          yOffset: [{ required: true, message: '请输入坐标Y', trigger: 'blur' }]
        }
      },
      // 微信密保模版相关
      wxmbTableData: [],
      wxmbTotal: 0,
      wxmbPage: 1,
      wxmbPageSize: 10,
      wxmbLoading: false,
      wxmbDialog: {
        visible: false,
        isEdit: false,
        loading: false,
        form: {
          name: '',
          gameType: '',
          qrcodeType: '',
          // patchType: '', // 传奇世界专属
          isForce: true,
          mbMapId: '',
          finishMapId: '',
          machineVar: '',
          openidVar: '',
          wxVar: '',
          npcName: '',
          npcs: [{ mapId: '', x: 0, y: 0, lookId: '' }],
          transferEnable: false,
          transferMinAmount: '',
          transferRechargeVar: '',
          transferUsedVar: '',
          transferFlagVar: '',
          transferCoinVar: '',
          transferCoinName: '',
          transferNpcName: '',
          transferNpcs: [{ mapId: '', x: 0, y: 0, lookId: '' }]
        },
        rules: {
          name: [{ required: true, message: '请输入模版名称', trigger: 'blur' }],
          gameType: [{ required: true, message: '请选择游戏类型', trigger: 'change' }],
          qrcodeType: [{ required: true, message: '请选择二维码模版', trigger: 'change' }],
          isForce: [{ required: true, message: '请选择是否强制', trigger: 'change' }],
          mbMapId: [{ required: true, message: '请输入验证密保地图ID', trigger: 'blur' }],
          finishMapId: [{ required: true, message: '请输入验证完成传送地图ID', trigger: 'blur' }],
          machineVar: [{ required: true, message: '请输入机器码变量', trigger: 'blur' }],
          openidVar: [{ required: true, message: '请输入微信openid变量', trigger: 'blur' }],
          wxVar: [{ required: true, message: '请输入微信保留ID变量', trigger: 'blur' }],
          npcName: [{ required: true, message: '请输入NPC名称', trigger: 'blur' }],
          transferMinAmount: [
            { required: true, message: '请输入最低金额', trigger: 'blur' }
          ],
          transferRechargeVar: [
            { required: true, message: '请输入充值转区点变量', trigger: 'blur' }
          ],
          transferUsedVar: [
            { required: true, message: '请输入已用转区点变量', trigger: 'blur' }
          ],
          transferFlagVar: [
            { required: true, message: '请输入角色是否已转区变量', trigger: 'blur' }
          ],
          transferCoinVar: [
            { required: true, message: '请输入通区货币变量', trigger: 'blur' }
          ],
          transferCoinName: [
            { required: true, message: '请输入通区货币名称', trigger: 'blur' }
          ],
          transferNpcName: [
            { required: true, message: '请输入转区NPC名称', trigger: 'blur' }
          ]
        }
      }
    };
  },
  created() {
    this.getDetail();
    this.getReplay();
    this.getLists();
    this.getAllQrcodeTemplates();
    this.loginUrls = loginUrl;
    this.setActiveFromRoute();
  },
  methods: {
    refresh() {
      this.getLists();
    },
    setActiveFromRoute() {
      const tab = this.$route && this.$route.query && this.$route.query.tab;
      if (!tab) return;
      const map = {
        qrcode: 'ewmmb', // partinstall.vue 传入 ?tab=qrcode 时跳到“二维码模版”
        wxmb: 'wxmbmb',
        bind: 'bdjl',
        logs: 'czrz',
        blacklist: 'hmd',
        menu: 'zdycd',
        first: 'first',
        second: 'second',
        third: 'third'
      };
      if (map[tab]) this.activeName = map[tab];
      else this.activeName = tab; // 若直接传入 tab 名称则使用它
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    async getLists() {
      let header = await mgr();
      api
        .get('/api/WxUserValid/GetWxValidCodes', {
          headers: {
            Authorization: 'Bearer ' + header
          }
        })
        .then((res) => {
          console.log(res.data);
          this.tableData = res.data;
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    async getReplay() {
      let header = await mgr();
      api
        .get('/api/WxUserValid/GetWxCustomReplies', {
          headers: {
            Authorization: 'Bearer ' + header
          }
        })
        .then((res) => {
          if (res.data === undefined || res.data === '' || res.data === null) { return; }
          // console.log(res.data);
          this.replay = res.data;
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    async getDetail() {
      let header = await mgr();
      api
        .get('/api/WxUserValid/GetWxValidInfo', {
          headers: {
            Authorization: 'Bearer ' + header
          }
        })
        .then((res) => {
          console.log(res.data);
          const data = res.data || {};
          // 不直接替换 this.form，避免服务端某字段为对象导致 ElInput 报 type 错误
          // 仅合并并确保表单中用于 <el-input> 的字段为字符串或数字
          this.form.id = data.id || this.form.id;
          this.form.applicationUserId = data.applicationUserId || this.form.applicationUserId;
          this.form.isOwnAccount = !!data.isOwnAccount;
          this.form.messageKeyword = data.messageKeyword == null ? '' : String(data.messageKeyword);
          this.form.appId = data.appId || '';
          this.form.appSecret = data.appSecret || '';
          this.form.configUrl = data.configUrl || '';
          this.form.communicationToken = data.communicationToken || '';
          this.form.wxEncryptionType = (data.wxEncryptionType !== undefined) ? data.wxEncryptionType : this.form.wxEncryptionType;
          this.form.beConcernedReply = data.beConcernedReply || '';
          this.form.weChatAccountType = data.weChatAccountType || this.form.weChatAccountType;
          this.form.messageEncryptKey = data.messageEncryptKey;
          this.form.templateId = data.templateId || '';
          this.form.wxQrStr = data.wxQrStr || '';
          this.wxQrStr = String(this.form.wxQrStr || '');
          this.isEnabledWxValid = !!data.isEnabledWxValid;
          this.isPlatOpenWxValid = !!data.isPlatOpenWxValid;
          this.form.wxOriginalId = data.wxOriginalId || '';
          this.codeimg = url + 'Upload/wechat/' + data.applicationUserId + '.png';
          // 生成 cipherBase64 并把 codeurl 指向 url + cipherBase64
          try {
            const pass = this.form.appSecret || '';
            const key = CryptoJS.MD5(pass);
            const iv = CryptoJS.MD5(pass + '_iv');
            const cipherBase64 = CryptoJS.AES.encrypt(this.codeimg, key, {
              iv,
              mode: CryptoJS.mode.CBC,
              padding: CryptoJS.pad.Pkcs7
            }).toString();
            this.cipherBase64 = cipherBase64;
            this.codeurl = url + cipherBase64; // 打开链接为 url + cipherBase64
          } catch (e) {
            console.error('生成 cipher 失败', e);
            this.cipherBase64 = '';
            this.codeurl = this.codeimg;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    async saveReplay() {
      let header = await mgr();
      api
        .post('/api/WxUserValid/AddOrUpdateWxCustomReplies', this.replay, {
          headers: {
            Authorization: 'Bearer ' + header
          }
        })
        .then((res) => {
          console.log(res.data);
          this.$messageSuccess('操作成功');
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    async saveConfig() {
      let header = await mgr();
      this.form.applicationUserId = this.$store.state.id;
      api
        .post('/api/WxUserValid/AddOrUpdateWxValid', this.form, {
          headers: {
            Authorization: 'Bearer ' + header
          }
        })
        .then((res) => {
          console.log(res.data);
          this.$messageSuccess('操作成功');
          this.form.configUrl = res.data.configUrl;
          this.codeimg = url + 'Upload/wechat/' + res.data.applicationUserId + '.png';
          // 重新生成 cipherBase64 并更新 codeurl
          try {
            const pass = this.form.appSecret || '';
            const key = CryptoJS.MD5(pass);
            const iv = CryptoJS.MD5(pass + '_iv');
            const cipherBase64 = CryptoJS.AES.encrypt(this.codeimg, key, {
              iv,
              mode: CryptoJS.mode.CBC,
              padding: CryptoJS.pad.Pkcs7
            }).toString();
            this.cipherBase64 = cipherBase64;
            this.codeurl = url + cipherBase64;
          } catch (e) {
            console.error('生成 cipher 失败', e);
            this.cipherBase64 = '';
            this.codeurl = this.codeimg;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // ...existing code...
    openCipherImage() {
      const cipher = this.cipherBase64 || '';
      const pass = this.form.appSecret || '';
      const html = `<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>二维码</title>
<style>
  html,body{height:100%;margin:0;background:#fff}
  .wrap{display:flex;align-items:center;justify-content:center;height:100%}
  img{max-width:90%;max-height:90%}
  .err{color:#f56c6c;font-size:16px}
  .caption{margin-top:8px;color:#666;text-align:center;font-size:14px;}
</style>
<script src="https://cdn.jsdelivr.net/npm/crypto-js@4.1.1/crypto-js.min.js"></scr` + `ipt>
</head>
<body>
<div class="wrap"><div id="container"><span>加载中...</span></div></div>
<script>
  (function(){
    try {
      var cipher = decodeURIComponent("${encodeURIComponent(cipher)}");
      var pass = decodeURIComponent("${encodeURIComponent(pass)}");
      if(!cipher){ document.getElementById('container').innerHTML = '<div class="err">无密文</div>'; return; }
      if(!pass){ document.getElementById('container').innerHTML = '<div class="err">无 appSecret</div>'; return; }
      var key = CryptoJS.MD5(pass);
      var iv  = CryptoJS.MD5(pass + '_iv');
      var decrypted = CryptoJS.AES.decrypt(cipher, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString(CryptoJS.enc.Utf8);
      if(!decrypted){ document.getElementById('container').innerHTML = '<div class="err">解密失败</div>'; return; }
      var img = document.createElement('img');
      img.src = decrypted + '?t=' + Date.now();
      img.alt = '二维码';
      document.getElementById('container').innerHTML = '';
      document.getElementById('container').appendChild(img);
      var p = document.createElement('p');
      p.className = 'caption';
      p.textContent = '请保存该二维码，并配置到游戏中';
      container.appendChild(p);
    } catch (e) {
      document.getElementById('container').innerHTML = '<div class="err">错误: ' + (e.message || e) + '</div>';
    }
  })();
</scr` + `ipt>
</body>
</html>`;
      const win = window.open();
      if (!win) {
        this.$messageError('弹窗被拦截，请允许弹窗或复制链接到新窗口打开');
        return;
      }
      win.document.write(html);
      win.document.close();
    },
    // ...existing code...
    token() {
      this.form.communicationToken = this.randam(32);
    },
    random() {
      this.form.messageEncryptKey = this.randam(43);
    },
    randam(size) {
      var arr = [];
      for (let i = 65; i <= 90; i++) {
        arr.push(String.fromCharCode(i));
      }
      for (let i = 97; i <= 122; i++) {
        arr.push(String.fromCharCode(i));
      }
      for (let i = 0; i <= 9; i++) {
        arr.push(i);
      }
      var str = '';
      for (let x = 1; x <= size; x++) {
        var index = Math.floor(Math.random() * arr.length);
        str += arr[index];
      }
      return str;
    },
    addMenu() {
      this.menuForm.menus.push({
        id: this.menuIdSeed++,
        name: '',
        type: '',
        reply: '',
        url: '',
        rul: '',
        children: []
      });
    },
    removeMenu(idx) {
      this.menuForm.menus.splice(idx, 1);
    },
    addSubMenu(parentIdx) {
      const parent = this.menuForm.menus[parentIdx];
      if (!parent.children) parent.children = [];
      parent.children.push({
        id: this.menuIdSeed++,
        name: '',
        type: '',
        reply: '',
        url: '',
        rul: ''
      });
    },
    removeSubMenu(parentIdx, subIdx) {
      this.menuForm.menus[parentIdx].children.splice(subIdx, 1);
    },
    // 绑定记录相关
    async getBindList() {
      this.bindLoading = true;
      let header = await mgr();
      api
        .get('/api/WxUserValid/GetBindRecords', {
          headers: {
            Authorization: 'Bearer ' + header
          },
          params: {
            gameName: this.bindQuery.gameName,
            roleName: this.bindQuery.roleName,
            machineCode: this.bindQuery.machineCode,
            pageNumber: this.bindPage,
            pageSize: this.bindPageSize
          }
        })
        .then((res) => {
          // items 兼容：res.data.items 或 res.data（数组）
          const items = res.data && res.data.items ? res.data.items : res.data || [];
          this.bindTableData = items;

          // 从响应头读取分页信息 X-Pagination（优先），兼容旧接口返回的 total 字段
          const xp = res.headers && res.headers['x-pagination'] ? JSON.parse(res.headers['x-pagination']) : null;
          if (xp) {
            this.bindTotal = xp.TotalCount || xp.total || 0;
            this.bindPage = xp.CurrentPage || this.bindPage;
            this.bindPageSize = xp.PageSize || this.bindPageSize;
          } else {
            this.bindTotal = (res.data && res.data.total) ? res.data.total : (Array.isArray(items) ? items.length : 0);
          }
          this.bindLoading = false;
        })
        .catch((err) => {
          this.$messageError(err.message || '请求失败');
          this.bindLoading = false;
        });
    },
    resetBindQuery() {
      this.bindQuery = {
        gameName: '',
        roleName: '',
        machineCode: ''
      };
      this.bindPage = 1;
      this.getBindList();
    },
    bindPageChange(page) {
      this.bindPage = page;
      this.getBindList();
    },
    bindPageSizeChange(size) {
      this.bindPageSize = size;
      this.bindPage = 1;
      this.getBindList();
    },
    // 操作日志相关
    async getLogList() {
      this.logLoading = true;
      let header = await mgr();
      api
        .get('/api/WxUserValid/GetOperationLogs', {
          headers: {
            Authorization: 'Bearer ' + header
          },
          params: {
            openid: this.logQuery.openid,
            pageNumber: this.logPage,
            pageSize: this.logPageSize
          }
        })
        .then((res) => {
          const items = res.data && res.data.items ? res.data.items : res.data || [];
          this.logTableData = items;

          const xp = res.headers && res.headers['x-pagination'] ? JSON.parse(res.headers['x-pagination']) : null;
          if (xp) {
            this.logTotal = xp.TotalCount || xp.total || 0;
            this.logPage = xp.CurrentPage || this.logPage;
            this.logPageSize = xp.PageSize || this.logPageSize;
          } else {
            this.logTotal = (res.data && res.data.total) ? res.data.total : (Array.isArray(items) ? items.length : 0);
          }
          this.logLoading = false;
        })
        .catch((err) => {
          this.$messageError(err.message || '请求失败');
          this.logLoading = false;
        });
    },
    toBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const dataUrl = e.target.result || '';
          const commaIndex = dataUrl.indexOf(',');
          const meta = dataUrl.substring(5, commaIndex); // e.g. image/png;base64
          const base64 = dataUrl.substring(commaIndex + 1);
          // 取出格式，如 png 或 jpeg 或 gif
          let format = 'png';
          if (meta.indexOf('jpeg') !== -1 || meta.indexOf('jpg') !== -1) format = 'jpeg';
          else if (meta.indexOf('png') !== -1) format = 'png';
          resolve({ format, base64, dataUrl });
        };
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(file);
      });
    },
    resetLogQuery() {
      this.logQuery = { openid: '' };
      this.logPage = 1;
      this.getLogList();
    },
    logPageChange(page) {
      this.logPage = page;
      this.getLogList();
    },
    logPageSizeChange(size) {
      this.logPageSize = size;
      this.logPage = 1;
      this.getLogList();
    },
    // 黑名单相关
    async getBlackList() {
      this.blackLoading = true;
      let header = await mgr();
      api
        .get('/api/WxUserValid/GetBlacklist', {
          headers: {
            Authorization: 'Bearer ' + header
          },
          params: {
            openid: this.blackQuery.openid,
            page: this.blackPage,
            pageSize: this.blackPageSize
          }
        })
        .then((res) => {
          // items 兼容：res.data.items 或 res.data（数组）
          const items = res.data && res.data.items ? res.data.items : (Array.isArray(res.data) ? res.data : []);
          this.blackTableData = items;

          // 优先读取 X-Pagination 响应头
          const xp = res.headers && res.headers['x-pagination'] ? JSON.parse(res.headers['x-pagination']) : null;
          if (xp) {
            this.blackTotal = xp.TotalCount || xp.total || 0;
            this.blackPage = xp.CurrentPage || this.blackPage;
            this.blackPageSize = xp.PageSize || this.blackPageSize;
          } else {
            // 兼容旧接口返回 total 字段或数组长度
            this.blackTotal = (res.data && res.data.total) ? res.data.total : (Array.isArray(items) ? items.length : 0);
          }
          this.blackLoading = false;
        })
        .catch((err) => {
          this.$messageError(err.message || '请求失败');
          this.blackLoading = false;
        });
    },
    resetBlackQuery() {
      this.blackQuery = { openid: '' };
      this.blackPage = 1;
      this.getBlackList();
    },
    blackPageChange(page) {
      this.blackPage = page;
      this.getBlackList();
    },
    blackPageSizeChange(size) {
      this.blackPageSize = size;
      this.blackPage = 1;
      this.getBlackList();
    },
    async addToBlacklist() {
      if (!this.blackQuery.openid) return;
      let header = await mgr();
      api
        .post('/api/WxUserValid/AddToBlacklist', { openid: this.blackQuery.openid }, {
          headers: {
            Authorization: 'Bearer ' + header
          }
        })
        .then(() => {
          this.$messageSuccess('添加成功');
          this.getBlackList();
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    async addToBlack(openid) {
      if (!openid) return;
      let header = await mgr();
      api
        .post('/api/WxUserValid/AddToBlacklist', { openid: openid }, {
          headers: {
            Authorization: 'Bearer ' + header
          }
        })
        .then(() => {
          this.$messageSuccess('添加成功');
          this.getBlackList();
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    async removeFromBlacklist(row) {
      if (!row || !row.id) return;
      try {
        await this.$confirm('确定要将该 openid 从黑名单移除吗？', '提示', { type: 'warning' });
      } catch {
        return; // 用户取消
      }
      this.blackLoading = true;
      let header = await mgr();
      api
        .post('/api/WxUserValid/DeleteBlacklist', row.id, {
          headers: {
            Authorization: 'Bearer ' + header
          }
        })
        .then(() => {
          this.$messageSuccess('移除成功');
          this.getBlackList();
        })
        .catch((err) => {
          this.$messageError(err.message || '删除失败');
          this.blackLoading = false;
        });
    },
    // 二维码模版相关
    async getQrcodeList() {
      this.qrcodeLoading = true;
      let header = await mgr();
      api
        .get('/api/WxUserValid/GetQrcodeTemplatesPage', {
          headers: {
            Authorization: 'Bearer ' + header
          },
          params: {
            pageNumber: this.qrcodePage,
            pageSize: this.qrcodePageSize
          }
        })
        .then((res) => {
          this.qrcodeTableData = res.data || [];
          this.qrcodeTotal = res.data.total || 0;
          this.qrcodeLoading = false;
        })
        .catch((err) => {
          this.$messageError(err.message);
          this.qrcodeLoading = false;
        });
    },
    // 获取二维码模版-不分页
    async getAllQrcodeTemplates() {
      let header = await mgr();
      return api
        .get('/api/WxUserValid/GetQrcodeTemplates', {
          headers: {
            Authorization: 'Bearer ' + header
          }
        })
        .then((res) => {
          console.log(res.data);
          this.qrcodeTemplatesList = res.data || [];
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    qrcodePageChange(page) {
      this.qrcodePage = page;
      this.getQrcodeList();
    },
    qrcodePageSizeChange(size) {
      this.qrcodePageSize = size;
      this.qrcodePage = 1;
      this.getQrcodeList();
    },
    openQrcodeDialog(isEdit, row) {
      this.qrcodeDialog.visible = true;
      this.qrcodeDialog.isEdit = !!isEdit;
      if (isEdit && row) {
        this.qrcodeDialog.form = { ...row };
      } else {
        this.qrcodeDialog.form = {
          // id: null,
          title: '',
          resourceCode: '',
          imageCode: '',
          serial: 3,
          xOffset: '',
          yOffset: ''
        };
      }
      this.$nextTick(() => {
        if (this.$refs.qrcodeForm) this.$refs.qrcodeForm.clearValidate();
      });
    },
    closeQrcodeDialog() {
      this.qrcodeDialog.visible = false;
      this.qrcodeDialog.loading = false;
    },
    saveQrcodeTemplate() {
      this.$refs.qrcodeForm.validate(async (valid) => {
        if (!valid) return;
        this.qrcodeDialog.loading = true;
        let header = await mgr();
        const apiUrl = this.qrcodeDialog.isEdit
          ? '/api/WxUserValid/UpdateQrcodeTemplate'
          : '/api/WxUserValid/AddQrcodeTemplate';
        api
          .post(apiUrl, this.qrcodeDialog.form, {
            headers: { Authorization: 'Bearer ' + header }
          })
          .then(() => {
            this.$messageSuccess('保存成功');
            this.qrcodeDialog.visible = false;
            this.getQrcodeList();
          })
          .catch((err) => {
            this.$messageError(err.message);
          })
          .finally(() => {
            this.qrcodeDialog.loading = false;
            this.getAllQrcodeTemplates();
          });
      });
    },
    addQrcodeTemplate() {
      this.openQrcodeDialog(false);
    },
    editQrcodeTemplate(row) {
      this.openQrcodeDialog(true, row);
    },
    async deleteQrcodeTemplate(row) {
      this.$confirm('确定要删除该二维码模版吗？', '提示', {
        type: 'warning'
      }).then(async () => {
        let header = await mgr();
        api
          .post('/api/WxUserValid/DeleteQrcodeTemplate', row.id, {
            headers: {
              Authorization: 'Bearer ' + header
            }
          })
          .then(() => {
            this.$message({
              message: '删除成功',
              type: 'success',
              center: true
            });
            this.getQrcodeList();
          })
          .catch((err) => {
            this.$messageError(err.message);
          });
      }).catch(() => { });
    },
    // ...existing code...
    async getWxmbList() {
      this.wxmbLoading = true;
      let header = await mgr();
      api
        .get('/api/WxUserValid/GetWxmbTemplatesPage', {
          headers: { Authorization: 'Bearer ' + header },
          params: {
            pageNumber: this.wxmbPage,
            pageSize: this.wxmbPageSize
          }
        })
        .then((res) => {
          this.wxmbTableData = res.data.items || [];
          this.wxmbTotal = res.data.total || 0;
          this.wxmbLoading = false;
        })
        .catch((err) => {
          this.$messageError(err.message);
          this.wxmbLoading = false;
        });
    },
    wxmbPageChange(page) {
      this.wxmbPage = page;
      this.getWxmbList();
    },
    wxmbPageSizeChange(size) {
      this.wxmbPageSize = size;
      this.wxmbPage = 1;
      this.getWxmbList();
    },
    // ...existing code...
    openWxmbDialog(isEdit, row, gameType) {
      this.wxmbDialog.visible = true;
      this.wxmbDialog.isEdit = !!isEdit;
      if (isEdit && row) {
        this.wxmbDialog.form = { ...row };
        if (!this.wxmbDialog.form.npcs || !this.wxmbDialog.form.npcs.length) {
          this.wxmbDialog.form.npcs = [{ mapId: '', x: 0, y: 0, lookId: '' }];
        }
        if (!this.wxmbDialog.form.transferNpcs || !this.wxmbDialog.form.transferNpcs.length) {
          this.wxmbDialog.form.transferNpcs = [{ mapId: '', x: 0, y: 0, lookId: '' }];
        }
      } else {
        // 传奇世界
        if (gameType === '传奇世界') {
          this.wxmbDialog.form = {
            name: '微信密保模版',
            gameType: '传奇世界',
            qrcodeType: '',
            patchType: '',
            isForce: true,
            mbMapId: '3',
            finishMapId: '3',
            npcName: '密保NPC',
            npcs: [{ mapId: '3', x: 0, y: 0, lookId: '3' }],
            transferEnable: false,
            transferMinAmount: '100',
            transferNpcName: '转区NPC',
            transferNpcs: [{ mapId: '3', x: 0, y: 0, lookId: '3' }]
          };
        } else {
          // 热血传奇
          this.wxmbDialog.form = {
            name: '微信密保模版',
            gameType: gameType || '热血传奇',
            qrcodeType: '',
            isForce: true,
            mbMapId: '3',
            finishMapId: '3',
            machineVar: 'T47',
            openidVar: 'T48',
            wxVar: 'T49',
            npcName: '密保NPC',
            npcs: [{ mapId: '3', x: 0, y: 0, lookId: '3' }],
            transferEnable: false,
            transferMinAmount: '100',
            transferRechargeVar: 'U46',
            transferUsedVar: 'U47',
            transferFlagVar: 'U48',
            transferCoinVar: 'U49',
            transferCoinName: '游戏币',
            transferNpcName: '转区NPC',
            transferNpcs: [{ mapId: '3', x: 0, y: 0, lookId: '3' }]
          };
        }
      }
      this.$nextTick(() => {
        if (this.$refs.wxmbForm) this.$refs.wxmbForm.clearValidate();
      });
    },
    // ...existing code...
    closeWxmbDialog() {
      this.wxmbDialog.visible = false;
      this.wxmbDialog.loading = false;
    },
    saveWxmbTemplate() {
      this.$refs.wxmbForm.validate(async (valid) => {
        if (!valid) return;
        this.wxmbDialog.loading = true;
        let header = await mgr();
        const apiUrl = this.wxmbDialog.isEdit
          ? '/api/WxUserValid/UpdateWxmbTemplate'
          : '/api/WxUserValid/AddWxmbTemplate';
          this.wxmbDialog.form.generateQrCode = this.wxmbDialog.form.generateQrCode || true; // 确保该字段有值，默认为 false
        api
          .post(apiUrl, this.wxmbDialog.form, {
            headers: { Authorization: 'Bearer ' + header }
          })
          .then(() => {
            this.$messageSuccess('保存成功');
            this.wxmbDialog.visible = false;
            this.getWxmbList();
          })
          .catch((err) => {
            this.$messageError(err.message);
          })
          .finally(() => {
            this.wxmbDialog.loading = false;
          });
      });
    },
    async deleteWxmbTemplate(row) {
      this.$confirm('确定要删除该微信密保模版吗？', '提示', {
        type: 'warning'
      }).then(async () => {
        let header = await mgr();
        api
          .post('/api/WxUserValid/DeleteWxmbTemplate', row.id, {
            headers: { Authorization: 'Bearer ' + header }
          })
          .then(() => {
            this.$message({
              message: '删除成功',
              type: 'success',
              center: true
            });
            this.getWxmbList();
          })
          .catch((err) => {
            this.$messageError(err.message);
          });
      }).catch(() => { });
    },
    addNpc() {
      this.wxmbDialog.form.npcs.push({ mapId: '', x: 0, y: 0, lookId: '' });
    },
    removeNpc(idx) {
      this.wxmbDialog.form.npcs.splice(idx, 1);
    },
    addTransferNpc() {
      this.wxmbDialog.form.transferNpcs.push({ mapId: '', x: 0, y: 0, lookId: '' });
    },
    removeTransferNpc(idx) {
      this.wxmbDialog.form.transferNpcs.splice(idx, 1);
    },
    // 获取公众号菜单
    async GetWxMenu() {
      let header = await mgr();
      api
        .get('/api/WxUserValid/GetWxMenu', {
          headers: {
            Authorization: 'Bearer ' + header
          }
        })
        .then((res) => {
          console.log(res.data);
          // 兼容微信返回的 { button: [...] } 格式，并转换为组件内部使用的 menus 数组格式
          const raw = res.data || {};
          const btns = Array.isArray(raw) ? raw : (raw.button || raw.menus || []);
          const makeId = () => this.menuIdSeed++;
          const convertItem = (b) => {
            // b 可能为 { type, name, key, url, sub_button }
            const item = {
              id: makeId(),
              name: b.name || '',
              type: '',
              reply: '',
              url: '',
              rul: '',
              children: []
            };
            // 有子菜单则标记为 parent 并转换子项
            if (b.sub_button && b.sub_button.length) {
              item.type = 'parent';
              item.children = b.sub_button.map((s) => {
                const child = {
                  id: makeId(),
                  name: s.name || '',
                  type: '',
                  reply: '',
                  url: '',
                  rul: ''
                };
                if (s.type === 'view') {
                  child.type = 'url';
                  child.url = s.url || '';
                } else if (s.type === 'click') {
                  // click 的 key 可能是回复内容或自定义 key，根据需求保存在 reply
                  child.type = 'reply';
                  child.reply = s.key || '';
                } else {
                  child.type = s.type || '';
                }
                return child;
              });
            } else {
              // 无子菜单，按 type 映射
              if (b.type === 'view') {
                item.type = 'url';
                item.url = b.url || '';
              } else if (b.type === 'click') {
                item.type = 'reply';
                item.reply = b.key || '';
              } else {
                item.type = b.type || '';
              }
            }
            return item;
          };
          this.menuForm.menus = btns.map(convertItem);
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 保存菜单
    async saveMenu() {
      let header = await mgr();
      api
        .post('/api/WxUserValid/SaveWxMenu', this.menuForm.menus, {
          headers: {
            Authorization: 'Bearer ' + header
          }
        })
        .then(() => {
          this.$messageSuccess('菜单保存成功');
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 上传文件
    fileSelect(file) {
      let form = new FormData();
      form.append('file', file);
      form.append('path', 'wechat');
      this.$api.personCenter
        .uploadprofits(form)
        .then((data) => {
          // console.log(data);
          this.form.wxQrStr = data.data.path;
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    getQrcodeTitle(id) {
      const item = this.qrcodeTemplatesList.find(item => item.id === id);
      return item ? item.title : id;
    },
    async updateWxmbTemplateQrCodeFlag(row, val) {
      let header = await mgr();
      api
        .post('/api/WxUserValid/UpdateWxmbTemplateQrCodeFlag', {
          id: row.id,
          generateQrCode: val
        }, {
          headers: { Authorization: 'Bearer ' + header }
        })
        .then(() => {
          this.$messageSuccess('二维码开关已更新');
          // 可选：刷新表格
          this.getWxmbList();
        })
        .catch(err => {
          this.$messageError(err.message || '更新失败');
          // 回滚开关状态
          row.generateQrCode = !val;
        });
    }
  },

  watch: {
    activeName(val) {
      if (val === 'bdjl') {
        this.getBindList();
      }
      if (val === 'czrz') {
        this.getLogList();
      }
      if (val === 'hmd') {
        this.getBlackList();
      }
      if (val === 'ewmmb') {
        this.getQrcodeList();
      }
      if (val === 'wxmbmb') {
        this.getWxmbList();
      }
    },
    '$route'(to) {
      this.setActiveFromRoute();
    }
  },

  destroyed() { }
};
</script>

<style lang="scss" scoped>
.gs_title {
  background: var(--theme-color);
}

.wxmb-dialog-scroll {
  max-height: 60vh;
  overflow-y: auto;
  padding-right: 8px;
}

.tip_red {
  color: #3c8dbc;
  padding: 10px 0px;
  font-weight: bold;
  font-size: 15px;
}

.gs_listcontainer {
  padding-top: 0;
  padding-bottom: 15px;
  margin-left: 20px;

  .clearfix {
    border: 1px solid #d9edf7;
    width: 95%;
    margin-bottom: 1px;
    padding-left: 0px;
    box-sizing: border-box;

    .mgl20 {
      float: right;
    }

    dt {
      background-color: #d9edf7;
      padding-right: 10px;
    }

    dd {
      padding-top: 5px;
    }
  }
}

.mg2 {
  float: right;
  margin-top: -20px;
}

.opeartbox {
  border: 1px solid #00bcd4;
  width: 97%;
}

.line_tip {
  color: #999;
  font-size: 14px;
  margin-left: 20px;
}

.right {
  float: right;
  margin-right: 4%;
}

.el-form-item {
  margin-bottom: 10px;
}

.editserverBox {
  padding-left: 20px;

  .list {
    margin-bottom: 10px;

    .tit {
      float: left;
      width: 90px;
      height: 32px;
      line-height: 32px;
    }

    .content {
      float: left;
      width: 250px;
    }
  }

  .serveList {
    li {
      position: relative;
      float: left;
      width: 100px;
      text-align: center;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin-right: 15px;
      margin-bottom: 10px;
      overflow: hidden;

      .tit {
        background: #3c8dbc;
        color: #fff;
        height: 22px;
        line-height: 22px;
      }

      .numberbox {
        height: 25px;
        line-height: 25px;
        color: green;
        font-size: 13px;
      }

      &:hover {
        .mask {
          top: 0;
        }
      }

      .mask {
        position: absolute;
        transition: top 0.3s;
        top: 100%;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        color: #fff;
        cursor: pointer;
        line-height: 50px;
      }
    }
  }
}

.passwordBox {
  padding-left: 20px;
  display: flex;
  flex-flow: row nowrap;
  padding-bottom: 16px;

  .tit {
    display: block;
    width: 100px;
    height: 32px;
    line-height: 32px;
  }
}

.bindwei {
  width: 95%;
  border: 1px solid #d9edf7;

  .tit {
    width: 100px;
    background: #d9edf7;
    padding-right: 10px;
    font-size: 14px;
    text-align: right;
    color: #333;
  }

  .el-tag {
    margin: 5px 10px 5px 0;
  }
}

.weixinbox {
  margin-left: 20px;

  .clearfix1:after {
    content: "";
    display: table;
    clear: both;
    border-spacing: 0;
  }

  table {
    width: 95%;
    margin-top: -10px;
    border-collapse: separate;
    border-spacing: 0 10px;

    tr {
      td {
        border: 1px solid #d9edf7;

        ul {
          margin: 0 100px 0 70px;

          li {
            float: left;
            margin-right: 60px;

            .tit {
              float: left;
              height: 40px;
              line-height: 40px;
              font-size: 13px;
              width: 90px;
              text-align: right;
              color: #313131;
            }

            .contbox {
              float: left;
              margin-top: 7px;
              margin-left: 20px;
            }
          }
        }
      }

      .tit_td {
        width: 98px;
        background: #d9edf7;
        padding-right: 10px;
        text-align: right;
        font-size: 14px;
        color: #333;
      }
    }
  }
}

.authority {
  position: absolute;
  font-size: 14px;
  right: 10px;
  top: 12px;
  color: #63aafa;
  cursor: pointer;
}

.bind-records-container {
  background: #fff;
  padding: 10px 0 0 0;
}

.bind-query-form {
  margin-bottom: 8px;
}

.bind-pagination {
  margin-top: 8px;
}

.log-records-container {
  background: #fff;
  padding: 10px 0 0 0;
}

.log-query-form {
  margin-bottom: 8px;
}

.log-pagination {
  margin-top: 8px;
}

.blacklist-container {
  background: #fff;
  padding: 10px 0 0 0;

  .blacklist-tip {
    margin-bottom: 12px;
    font-size: 14px;
    line-height: 1.7;
  }

  .black-query-form {
    margin-bottom: 8px;
  }

  .black-pagination {
    margin-top: 8px;
  }
}

.qrcode-template-container {
  background: #fff;
  padding: 10px 0 0 0;
}

.qrcode-header {
  padding: 8px 0 0 8px;
}

.qrcode-title {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 8px;
}

.qrcode-tags {
  margin-bottom: 8px;
  font-size: 14px;
  color: #666;
}

.qrcode-pagination {
  margin-top: 8px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9e3ea;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 146px;
  height: 146px;
  display: block;
}
</style>
