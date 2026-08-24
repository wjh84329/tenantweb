<template>
  <div class="home" :class="{ 'tenant-dashboard': $root.uiMode === 'modern' }" v-loading="pageLoading">
    <div v-if="$root.uiMode === 'modern'" class="tenant-dashboard__welcome">
      <h1>您好，{{ userInfo.userName || 'Tenant' }}</h1>
    </div>
    <div v-if="$root.uiMode === 'modern'" class="tenant-design-summary">
      <div class="tenant-design-summary__item is-blue">
        <span class="tenant-design-summary__icon"><tenant-icon name="wallet" /></span>
        <div><p>账户余额</p><strong>¥{{ accountInfo.accout }}</strong><small>可用余额</small></div>
      </div>
      <div class="tenant-design-summary__item is-cyan">
        <span class="tenant-design-summary__icon"><tenant-icon name="cash" /></span>
        <div><p>可提现金额</p><strong>¥{{ accountInfo.withdraw }}</strong><small>可提现余额</small></div>
      </div>
      <div class="tenant-design-summary__item is-green">
        <span class="tenant-design-summary__icon"><tenant-icon name="arrowDown" /></span>
        <div><p>今日充值</p><strong>¥{{ chargeInfoData.todaycharge }}</strong><small>今日 00:00–23:59</small></div>
      </div>
      <div class="tenant-design-summary__item is-orange">
        <span class="tenant-design-summary__icon"><tenant-icon name="send" /></span>
        <div>
          <p>等待发送</p>
          <el-tooltip v-if="chargeInfoData.waitSend > 0" effect="dark" content="点击下发" placement="bottom">
            <strong class="is-clickable" @click="waitSentAll">{{ chargeInfoData.waitSend }}</strong>
          </el-tooltip>
          <strong v-else>{{ chargeInfoData.waitSend }}</strong>
          <small>待发送数量</small>
        </div>
      </div>
      <div class="tenant-design-summary__item is-purple">
        <span class="tenant-design-summary__icon"><tenant-icon name="clock" /></span>
        <div><p>提现中金额</p><strong>¥{{ cashInfo.amount }}</strong><small>处理中金额</small></div>
      </div>
      <div class="tenant-design-summary__item is-red">
        <span class="tenant-design-summary__icon"><tenant-icon name="document" /></span>
        <div><p>提现手续费</p><strong>¥{{ cashInfo.fee }}</strong><small>当前手续费</small></div>
      </div>
    </div>
    <div class="settingbox clearfix" :class="{ 'tenant-account-grid': $root.uiMode === 'modern' }">
      <div v-if="$root.uiMode === 'modern'" class="tenant-section-heading">账户概览</div>
      <div class="userinfo gs_shadow" style="height: 150px;width: 23%;">
        <div class="infobox">
          <div style="display: flex;padding-left: 5px;">
            <!-- <el-upload class="avatar-uploader" accept=".jpg,.jpeg,.png" action="" :http-request="() => { }"
              :before-upload="fileSelect" :show-file-list="false">
              <img v-if="userInfo.imgurl" :src="userInfo.imgurl" class="avatar">
              <img v-else src="../assets/images/header.png" class="avatar">
               <img src="../assets/images/header.png" class="avatar">
            </el-upload> -->
            <div>
              <img src="../assets/images/header.png" class="avatar">
            </div>
            <div class="textbox" style="margin-left: 15px;">
              <!-- <p class="acout">{{ userInfo.userName }}
                <span v-if="userInfo.isSigned" style="color:green">（已签约）</span>
                <span v-else style="color:red">（未签约）</span>
                <a v-if="userInfo.isSigned" :href="userInfo.signUrl" target="_blank"
                  style="color:#63aafa;text-decoration: none;">查看合同</a>
                <router-link v-else style="color:#63aafa;text-decoration: none;"
                  to="/personal/elecsign">点击签约</router-link>
              </p> -->
              <p class="acout">{{ userInfo.userName }}</p>
              <p class="text">ID：{{ userInfo.id }}</p>
              <p class="text" :title="userInfo.ip">IP：{{ formatIpForDisplay(userInfo.ip) }}</p>
              <!-- <p class="range"><span>{{ userInfo.type ? '代理' : '商户' }}</span></p> -->
            </div>
          </div>
        </div>
        <ul v-if="$root.uiMode !== 'modern'" class="operbox">
          <li>
            <el-tooltip class="item" effect="dark" content="点击去绑定微信" placement="bottom">
              <router-link v-if="$store.state.settlementType != 3 && $store.state.settlementType != 4" to="/personal/weixin" tag="span">绑定微信</router-link>
              <span v-else style="color: #ccc; cursor: not-allowed;">绑定微信</span>
            </el-tooltip>
          </li>
          <li>
            <el-tooltip class="item" effect="dark" content="点击修改登录密码" placement="bottom">
              <span @click="dialog.show = true">登录密码</span>
            </el-tooltip>
          </li>
          <li class="noboder"  v-if="$store.state.settlementType != 3 && $store.state.settlementType != 4">
            <el-tooltip class="item" effect="dark" content="点击查看操作日志" placement="bottom">
              <router-link to="/main/conectKey" tag='span'>通讯秘钥</router-link>
            </el-tooltip>
          </li>
        </ul>
      </div>
      <div class="topinfo clearfix" style="height: 150px;width: 76%;">
        <div class="moneybox gs_shadow" style="height: 97%;">
          <div class="numberbox">
            <ul v-if="$root.uiMode !== 'modern'" class="clearfix" style="border-bottom: 1px dashed #ccc">
              <li>
                <p class="tit">账户余额</p>
                <p style="color: blue;font-weight: bold;" class="number">{{ accountInfo.accout }}</p>
              </li>
              <!-- <li>
                <p class="tit">冻结金额</p>
                <p class="number">{{ accountInfo.frozen }}</p>
              </li> -->
              <li>
                <p class="tit">可提现金额</p>
                <p style="color: #ff4440;font-weight: bold" class="number">{{ accountInfo.withdraw }}</p>
              </li>
              <li class="linebox">
                <p class="line"></p>
              </li>
              <li>
                <p class="tit">提现中金额</p>
                <p style="color: green;font-weight: bold" class="number">{{ cashInfo.amount }}</p>
              </li>
              <li>
                <p class="tit">提现手续费</p>
                <p class="number" style="font-weight: bold">{{ cashInfo.fee }}</p>
              </li>
            </ul>
            <div class="getbtn">
              <el-button v-if="$store.state.userType && $store.state.settlementType != 3" size="mini" type="danger"
                @click="$router.push({ path: '/agentsystem/merchant' })">代理中心</el-button>
              <el-button size="mini" type="danger" v-if="this.bank.realName != '未知户'"
                @click="$router.push({ path: '/main/Withdrawalrecords' })">提现记录</el-button>
              <el-button size="mini" v-if="this.bank.realName != '未知户'" type="danger"
                @click="$router.push({ path: '/main/withdrawapply' })">提现</el-button>
            </div>
            <div class="btns">
              <el-tooltip class="item" effect="dark" content="点击去绑定微信" placement="bottom">
                <router-link v-if="$store.state.settlementType != 3 && $store.state.settlementType != 4" to="/personal/weixin"
                  tag="span" class="account-quick-link">绑定微信</router-link>
                <span v-else class="account-quick-link is-disabled">绑定微信</span>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="点击修改登录密码" placement="bottom">
                <span class="account-quick-link" @click="dialog.show = true">登录密码</span>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="点击查看操作日志" placement="bottom">
                <router-link v-if="$store.state.settlementType != 3 && $store.state.settlementType != 4" to="/main/conectKey"
                  tag="span" class="account-quick-link">通讯秘钥</router-link>
                <span v-else class="account-quick-link is-disabled">通讯秘钥</span>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="点击查看账户安全" placement="bottom">
                <router-link v-if="$store.state.settlementType != 3 && $store.state.settlementType != 4" to="/personal/acountsafe"
                  tag='span' class="account-quick-link">账户安全</router-link>
                <span v-else class="account-quick-link is-disabled">账户安全</span>
              </el-tooltip>
              <el-tooltip effect="dark" content="点击查看产品结算比率" placement="bottom">
                <router-link v-if="$store.state.settlementType != 3" to="/main/rateList" tag='span'
                  class="account-quick-link">结算比率</router-link>
                <span v-else class="account-quick-link is-disabled">结算比率</span>
              </el-tooltip>
              <!-- <el-tooltip class="item" effect="dark" content="点击查看帐户提现记录" placement="bottom">
                <router-link to="/main/Withdrawalrecords" tag="span" class="linebtn">提现记录</router-link>
              </el-tooltip> -->
              <el-tooltip class="item" effect="dark" content="点击查看账户收支记录" placement="bottom"  v-if="$store.state.settlementType != 3 && $store.state.settlementType != 4">
                <router-link v-if="$store.state.settlementType != 3" to="/main/Withdrawalrecords" tag="span"
                  class="account-quick-link">账户收支</router-link>
                <span v-else class="account-quick-link is-disabled">账户收支</span>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="点击查看微信动态密保" placement="bottom" v-if="$store.state.settlementType != 3 && $store.state.settlementType != 4">
                <router-link v-if="$store.state.settlementType != 3" to="/main/wechat" tag="span"
                  class="account-quick-link">微信动态密保</router-link>
                <span v-else class="account-quick-link is-disabled">微信动态密保</span>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="点击查看定时任务" placement="bottom">
                <router-link v-if="$store.state.settlementType != 3" to="/main/orderInterval" tag="span"
                  class="account-quick-link">定时任务</router-link>
                <span v-else class="account-quick-link is-disabled">定时任务</span>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="点击查看登录日志" placement="bottom">
                <router-link to="/main/Userlogs" tag="span" class="account-quick-link">登录日志</router-link>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="点击领取礼品" placement="bottom"  v-if="$store.state.settlementType != 3 && $store.state.settlementType != 4">
                <!-- <input type="button" class="linebtn" value="领取礼品" @click="goOrder"> -->
                <span class="account-quick-link" @click="goOrder">领取礼品</span>
              </el-tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="settingbox clearfix" :class="{ 'tenant-metrics-grid': $root.uiMode === 'modern' }">
      <div v-if="$root.uiMode === 'modern'" class="tenant-section-heading">经营概览</div>
      <div class="topinfo clearfix" style="width: 100%;">
        <div class="chargebox gs_shadow">
          <div class="chargebox_t">
            <ul>
              <li>
                <p class="tit">今日充值</p>
                <p class="num">{{ chargeInfoData.todaycharge }}</p>
              </li>
              <li>
                <p class="tit">今日收入</p>
                <p class="num">{{ chargeInfoData.todayProfit }}</p>
              </li>
              <li>
                <p class="tit">昨日充值</p>
                <p class="num">{{ chargeInfoData.yesterdayPayAmount }}</p>
              </li>
              <li>
                <p class="tit">昨日收入</p>
                <p class="num">{{ chargeInfoData.yesterdayProfit }}</p>
              </li>
              <li v-loading="chargeInfoData.waitFlag">
                <p class="tit">等待发送</p>
                <el-tooltip v-if="chargeInfoData.waitSend > 0" class="item" effect="dark" content="点击下发"
                  placement="bottom">
                  <p class="num" style="cursor:pointer;" @click="waitSentAll">{{ chargeInfoData.waitSend }}</p>
                </el-tooltip>
                <p class="num" v-else>{{ chargeInfoData.waitSend }}</p>
              </li>
              <li v-if="userInfo.type">
                <p class="tit">代理收入</p>
                <p class="num">{{ chargeInfoData.agentProfit }}</p>
              </li>
              <li v-if="userInfo.type">
                <p class="tit">下属商户</p>
                <p class="num">{{ chargeInfoData.tenantCount }}</p>
              </li>
              <li v-if="userInfo.type">
                <p class="tit">代理充值</p>
                <p class="num">{{ chargeInfoData.agentPayAmount }}</p>
              </li>
            </ul>
            <div class="carousel">
              <el-carousel height="40px" direction="vertical" :autoplay="true">
                <el-carousel-item v-for="item in noticeList" :key="item.id">
                  <div class="textbox clearfix" @click="detialNotice(item)">
                    <span class="tit">{{ item.title }}</span>
                    <span class="time">{{ item.date }}</span>
                  </div>
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
        </div>
      </div>

    </div>
    <div class="functionbox gs_shadow mgt15"  v-if="$store.state.settlementType != 3 && $store.state.settlementType != 4">
      <div class="gs_title" style="background: initial;">功能设置</div>
      <div style="display: flex;font-size: 13px;">
        <ul style="width: 47%;">
          <li class="icon11">
            <span class="mgr15">订单通知</span>
            <span>关闭后不会发送充值信息</span>
            <p class="fr">
              <el-switch v-model="userInfo.wechatState" @change="wechatOff" active-color="#13ce66"
                inactive-color="#ff4949"></el-switch>
            </p>
          </li>
          <li class="icon1">
            <span>在线客服</span>
            <el-tooltip class="item" effect="dark" content="点击可查看编辑客服" placement="bottom">
              <span class="basecolor" style="cursor:pointer; margin-left:20px;" @click="editserve">客服电话：<i>{{
                functionSet.serverPhone }}</i></span>
            </el-tooltip>
            <p class="fr">
              <el-switch v-model="functionSet.serverSwitch" @change="serverOff" active-color="#13ce66"
                inactive-color="#ff4949"></el-switch>
            </p>
          </li>
          <li class="icon6">
            <span class="mgr15">皮肤设置</span>
            <span>设置您的管理后台和充值网站皮肤</span>
            <p class="fr">
              <span class="settingBtn" @click="getSkin">设置</span>
            </p>
          </li>
          <li class="icon2">
            <span class="mgr15">玩家留言</span>
            <span>玩家留言 <i class="redcolor">{{ functionSet.leaveCount }}</i> 条 ( 开启
              <el-tooltip class="item" effect="dark" content="点击前往留言箱" placement="bottom">
                <router-link to="/main/message" tag='i' class="basecolor" style="cursor:pointer">留言箱</router-link>
              </el-tooltip> ）</span>
            <p class="fr">
              <el-switch v-model="functionSet.gamerSwitch" @change="gamerOff" active-color="#13ce66"
                inactive-color="#ff4949"></el-switch>
            </p>
          </li>
          <li class="icon3">
            <span class="mgr15">手机号码</span>
            <span>开启此功能,设置 <i class="basecolor">手机号码</i> ,方便订单查询等</span>
            <p class="fr">
              <el-switch v-model="functionSet.phoneSwitch" @change="phoneOff" active-color="#13ce66"
                inactive-color="#ff4949"></el-switch>
            </p>
          </li>
        </ul>
        <ul style="width: 47%;">
          <li class="icon7">
            <span class="mgr15">通道排序</span>
            <!-- <span>联系方式  </span> -->
            <!-- <span>手机/QQ设置</span> -->
            <p class="fr">
              <span class="inputbox pdt5">
                <el-radio-group v-model="functionSet.payType" @change="setPayType">
                  <el-radio style="margin-right: initial;color: #ff4440 !important;" :label="0">微信优先</el-radio>
                  <el-radio style="margin-right: initial;color: blue;" :label="1">支付宝优先</el-radio>
                  <!-- <el-radio style="margin-right: initial;color: green;" :label="2">选填</el-radio> -->
                </el-radio-group>
              </span>
            </p>
          </li>
          <li class="icon8">
            <span class="mgr15">充值角色名设置</span>
            <p class="fr">
              <span class="inputbox pdt5">
                <el-radio-group v-model="functionSet.gameNameState" @change="SetGameName">
                  <el-radio style="margin-right: initial;color: #ff4440 !important;" :label="0">关闭</el-radio>
                  <el-radio style="margin-right: initial;color: blue;" :label="1">必填</el-radio>
                  <el-radio style="margin-right: initial;color: green;" :label="2">选填</el-radio>
                </el-radio-group>
              </span>
            </p>
          </li>
          <li class="icon4">
            <span class="mgr15">充值金额</span>
            <span>单笔最小金额{{ dialogcharge.nowMincharge.toFixed(2) }}元</span>
            <span>单笔最大金额{{ dialogcharge.nowMaxcharge.toFixed(2) }}元</span>
            <p class="fr">
              <span v-if="$store.state.settlementType != 3 || hasMenu(10)" class="settingBtn"
                @click="dialogcharge.show = true">设置</span>
              <span v-else style="color: #ccc; cursor: not-allowed;">设置</span>
            </p>
          </li>
          <li class="icon5" v-if="userInfo.type">
            <span class="mgr15">注册推广</span>
            <span class="linkspan" @click="PromoteLink">{{ functionSet.linkurl }}</span>
            <p class="fr">
              <span class="settingBtn" @click="copyPromoteLink">复制</span>
            </p>
          </li>
          <!-- 新增：通道设置（后台开关开启才显示） -->
          <li class="icon12" v-if="showChannelSettingEntry">
            <span class="mgr15">通道设置</span>
            <span>设置产品对应通道</span>
            <p class="fr">
              <span class="settingBtn" @click="goChannelSetting">设置</span>
            </p>
          </li>
        </ul>
      </div>
    </div>
    <div class="tablebox mgt15">
      <div class="gs_title" style="background: initial;">最新充值订单</div>
      <div class="gs_tablebox">
        <el-table ref="moduleTable" size="mini" :data="tableData" border style="width: 100%" stripe>
          <el-table-column prop="orderNumber" label="订单号" width="200">
          </el-table-column>
          <el-table-column prop="playerAccount" label="充值账号" width="120">
          </el-table-column>
          <el-table-column prop="playerQq" label="玩家QQ" width="120">
          </el-table-column>
          <el-table-column prop="partitionsName" label="所属分区" width="210">
          </el-table-column>
          <el-table-column label="订单金额">
            <template slot-scope="scope">
              <span>{{ scope.row.amount.toFixed(2) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="收入">
            <template slot-scope="scope">
              <span>{{ scope.row.profit.toFixed(2) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="productName" label="充值方式">
          </el-table-column>
          <el-table-column prop="orderDate" label="充值时间" width="110">
            <template slot-scope="scope">
              <p style="height:18px;">{{ scope.row.orderDate ? scope.row.orderDate.split(' ')[0] : '' }}</p>
              <p style="height:18px;color:#999;">{{ scope.row.orderDate ? scope.row.orderDate.split(' ')[1] : '' }}</p>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="订单状态" width="100">
            <template slot-scope="scope">
              <!-- <span v-if="scope.row.state===1" style="color:green;">成功</span> -->
              <span v-if="scope.row.state === 1" class="stateColor" :class="'color' + scope.row.state">成功</span>
              <el-tooltip v-else class="item" effect="dark" :content="waitTableFlag ? '请稍后点击下发' : '点击下发'"
                placement="bottom">
                <span class="stateColor" style="cursor:pointer;" :class="'color' + scope.row.state"
                  @click="waitSent(scope.row.orderNumber, scope.row.partitionId, scope.$index)"><i
                    :class="{ 'el-icon-loading': waitTableFlag && waitTableIndex === scope.$index }"></i>待发送</span>
                <!-- <span style="color:#f56c6c;cursor:pointer;" @click="waitSent(scope.row.orderNumber,scope.$index)"><i :class="{'el-icon-loading':waitTableFlag&&waitTableIndex===scope.$index}"></i>待发送</span> -->
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <!-- 登录密码的修改弹框 -->
    <el-dialog title="修改密码" :visible.sync="dialog.show" @close="dialoginit" custom-class="gs_dialog" width="400px">
      <div class="opeartbox">
        <ul class="clearfix">
          <li>
            <span class='tit'>旧密码：</span>
            <span class="txtbox">
              <el-input size="small" type="password" v-model="dialog.oldpwd"></el-input>
            </span>
          </li>
          <li>
            <span class='tit'>新密码：</span>
            <span class="txtbox">
              <el-input size="small" type="password" v-model="dialog.newpwd"></el-input>
            </span>
          </li>
          <li>
            <span class='tit'>确认密码：</span>
            <span class="txtbox">
              <el-input size="small" type="password" v-model="dialog.surepwd"></el-input>
            </span>
          </li>
        </ul>
      </div>
      <p class="tc pdb10">
        <el-button size="small" type="primary" @click="resetPassword">确定</el-button>
        <el-button size="small" type="info" @click="dialog.show = false">取消</el-button>
      </p>
    </el-dialog>
    <!-- 公告详情弹框 -->
    <el-dialog title="公告详情" :visible.sync="noticeDialog.show" @close="noticeInit" custom-class="gs_dialog"
      width="800px">
      <div class="noticeDetail">
        <h3 class="title">{{ noticeDialog.detail.title }}</h3>
        <p class="time">{{ noticeDialog.detail.date }}</p>
        <div class="content">
          {{ noticeDialog.detail.content }}
        </div>
      </div>
    </el-dialog>
    <!-- 信息不完善弹框 -->
    <el-dialog title="提示" :close-on-click-modal="false" :visible.sync="dialog3.show" custom-class="gs_dialog"
      width="400px">
      <p>您的个人信息不完善，请完善个人信息！</p>
      <p class="tc pdb20 mgt15">
        <el-button size="mini" type="primary" @click="gofinishInfo">完善信息</el-button>
        <el-button size="mini" type="info" @click="dialog3.show = false">取消</el-button>
      </p>
    </el-dialog>
    <el-dialog title="提示" :close-on-click-modal="false" :visible.sync="dialog5.show" custom-class="gs_dialog"
      width="400px">
      <p>您还未签约，请尽快前往签约！</p>
      <p class="tc pdb20 mgt15">
        <el-button size="mini" type="primary" @click="goqy">去签约</el-button>
        <el-button size="mini" type="info" @click="dialog5.show = false">取消</el-button>
      </p>
    </el-dialog>
    <!-- 编辑客服信息弹框 -->
    <el-dialog title="编辑客服信息" :visible.sync="dialog4.show" @close="dialog4Init" custom-class="gs_dialog" width="440px">
      <div class="editserverBox">
        <div class="list clearfix">
          <span class="tit">客服电话：</span>
          <div class="content">
            <el-input size="small" v-model="dialog4.phone" placeholder="请输入内容"></el-input>
          </div>
        </div>
        <div class="list clearfix">
          <span class="tit">客服QQ：</span>
          <div class="content tr">
            <el-button size="mini" type="success" @click="dialogqq.show = true">添加</el-button>
          </div>
        </div>
        <ul class="serveList clearfix">
          <li v-for="(item, i) in dialog4.serverlist" :key="'serve' + i">
            <p class="tit">{{ item.name }}</p>
            <p class="numberbox">{{ item.qq }}</p>
            <div class="mask" @click="delqqserve(i)">删除</div>
          </li>
        </ul>
        <p class="tc pdb10 mgt15">
          <el-button size="mini" type="primary" @click="editsubmit">确定</el-button>
          <el-button size="mini" type="info" @click="dialog4.show = false">取消</el-button>
        </p>
      </div>
    </el-dialog>
    <!-- 添加客服QQ -->
    <el-dialog title="添加客服QQ" :visible.sync="dialogqq.show" @close="dialogqqinit" custom-class="gs_dialog"
      width="420px">
      <div class="editserverBox">
        <div class="list clearfix">
          <span class="tit">客服名称：</span>
          <div class="content">
            <el-input size="small" v-model="dialogqq.name" placeholder="请输入内容"></el-input>
          </div>
        </div>
        <div class="list clearfix">
          <span class="tit">QQ号码：</span>
          <div class="content">
            <el-input size="small" type="number" v-model="dialogqq.qq" placeholder="请输入内容"></el-input>
          </div>
        </div>
      </div>
      <p class="tc pdb10">
        <el-button size="small" type="primary" @click="addserver">确定</el-button>
        <el-button size="small" type="info" @click="dialogqq.show = false">取消</el-button>
      </p>
    </el-dialog>
    <!-- 最小充值金额弹框 -->
    <el-dialog title="充值金额" :visible.sync="dialogcharge.show" @close="dialogcharge.minrecharge = ''"
      custom-class="gs_dialog" width="820px">
      <div class="minichargebox">
        <p class="pdb10">最小金额不能小于{{ dialogcharge.minrechargeValue }}元</p>
        <div class="list clearfix">
          <span class="tit">最小充值金额：</span>
          <div class="content">
            <el-input type="number" size="small" v-model="dialogcharge.minrecharge" placeholder="请输入最小充值金额"></el-input>
          </div>
        </div>
      </div>
      <div class="minichargebox">
        <p class="pdb10">最大金额不能大于{{ dialogcharge.maxrechargeValue }}元</p>
        <div class="list clearfix">
          <span class="tit">最大充值金额：</span>
          <div class="content">
            <el-input type="number" size="small" v-model="dialogcharge.maxrecharge" placeholder="请输入最大充值金额"></el-input>
          </div>
        </div>
      </div>
      <p class="tc pdb10" style="padding-top: 11px;">
        <el-button size="mini" type="primary" @click="setMinicharge">确定</el-button>
        <el-button size="mini" type="info" @click="dialogcharge.show = false">取消</el-button>
      </p>
    </el-dialog>
    <!-- 皮肤设置弹框 -->
    <el-dialog title="皮肤设置" :visible.sync="dialogSkin.show" @close="dialogSkin.skinNum = 0" custom-class="gs_dialog"
      width="1024px">
      <el-divider content-position="left">商户后台</el-divider>
      <ul class="areaContainer clearfix">
        <li :class="{ on: dialogSkins.uiMode === 'classic' && dialogSkins.skinNums === 0 }" @click="handleSkinChange(0)">
          <el-tooltip class="item" effect="dark" content="默认皮肤（怀旧）" placement="bottom">
            <img class="imgskin" src="../assets/images/skin0.png" alt="">
          </el-tooltip>
        </li>
        <li :class="{ on: dialogSkins.uiMode === 'classic' && dialogSkins.skinNums === 1 }" @click="handleSkinChange(1)">
          <el-tooltip class="item" effect="dark" content="深沉红" placement="bottom">
            <img class="imgskin" src="../assets/images/skin1.png" alt="">
          </el-tooltip>
        </li>
        <li :class="{ on: dialogSkins.uiMode === 'classic' && dialogSkins.skinNums === 2 }" @click="handleSkinChange(2)">
          <el-tooltip class="item" effect="dark" content="莫兰迪" placement="bottom">
            <img class="imgskin" src="../assets/images/skin2.png" alt="">
          </el-tooltip>
        </li>
        <li :class="{ on: dialogSkins.uiMode === 'classic' && dialogSkins.skinNums === 3 }" @click="handleSkinChange(3)">
          <el-tooltip class="item" effect="dark" content="海洋蓝" placement="bottom">
            <img class="imgskin" src="../assets/images/skin3.png" alt="">
          </el-tooltip>
        </li>
        <li :class="{ on: dialogSkins.uiMode === 'classic' && dialogSkins.skinNums === 4 }" @click="handleSkinChange(4)">
          <el-tooltip class="item" effect="dark" content="活力橙" placement="bottom">
            <img class="imgskin" src="../assets/images/skin4.png" alt="">
          </el-tooltip>
        </li>
        <li style="display: none;" :class="{ on: dialogSkins.uiMode === 'classic' && dialogSkins.skinNums === 5 }" @click="handleSkinChange(5)">
          <el-tooltip class="item" effect="dark" content="晶莹紫" placement="bottom">
            <img class="imgskin" src="../assets/images/skin5.png" alt="">
          </el-tooltip>
        </li>
        <li style="display: none;" :class="{ on: dialogSkins.uiMode === 'classic' && dialogSkins.skinNums === 6 }" @click="handleSkinChange(6)">
          <el-tooltip class="item" effect="dark" content="商务灰" placement="bottom">
            <img class="imgskin" src="../assets/images/skin6.png" alt="">
          </el-tooltip>
        </li>
        <li :class="{ on: dialogSkins.uiMode === 'modern' }" @click="handleUiModeChange('modern')">
          <el-tooltip class="item" effect="dark" content="焕新版（新版布局）" placement="bottom">
            <div class="modern-skin-preview" aria-label="焕新版界面预览">
              <span class="modern-skin-preview__sidebar"></span>
              <span class="modern-skin-preview__topbar"></span>
              <span class="modern-skin-preview__card modern-skin-preview__card--one"></span>
              <span class="modern-skin-preview__card modern-skin-preview__card--two"></span>
              <span class="modern-skin-preview__table"></span>
              <strong>焕新版</strong>
            </div>
          </el-tooltip>
        </li>
      </ul>
      <el-divider content-position="left">充值平台</el-divider>
      <ul class="areaContainer clearfix">
        <li :class="{ on: dialogSkin.skinNum === 0 }" @click="dialogSkin.skinNum = 0">
          <el-tooltip class="item" effect="dark" content="默认皮肤" placement="bottom">
            <img class="imgskin" src="../assets/images/skin0.jpg" alt="">
          </el-tooltip>
        </li>
        <!-- <li :class="{ on: dialogSkin.skinNum === 1 }" @click="dialogSkin.skinNum = 1">
          <el-tooltip class="item" effect="dark" content="浅蓝皮肤" placement="bottom">
            <img class="imgskin" src="../assets/images/skin1.jpg" alt="">
          </el-tooltip>
        </li>
        <li :class="{ on: dialogSkin.skinNum === 2 }" @click="dialogSkin.skinNum = 2">
          <el-tooltip class="item" effect="dark" content="带二维码" placement="bottom">
            <img class="imgskin" src="../assets/images/skin2.jpg" alt="">
          </el-tooltip>
        </li> -->
        <li :class="{ on: dialogSkin.skinNum === 3 }" @click="dialogSkin.skinNum = 3">
          <el-tooltip class="item" effect="dark" content="浅蓝皮肤" placement="bottom">
            <img class="imgskin" src="../assets/images/sk3.png" alt="">
          </el-tooltip>
        </li>
        <li :class="{ on: dialogSkin.skinNum === 4 }" @click="dialogSkin.skinNum = 4">
          <el-tooltip class="item" effect="dark" content="灰色皮肤" placement="bottom">
            <img class="imgskin" src="../assets/images/sk4.png" alt="">
          </el-tooltip>
        </li>
        <li :class="{ on: dialogSkin.skinNum === 5 }" @click="dialogSkin.skinNum = 5">
          <el-tooltip class="item" effect="dark" content="经典红灰（兼容IE6）" placement="bottom">
            <div class="legacy-pay-preview" aria-label="经典红灰充值皮肤预览">
              <span class="legacy-pay-preview__top"></span>
              <span class="legacy-pay-preview__notice"></span>
              <span class="legacy-pay-preview__title"></span>
              <span class="legacy-pay-preview__row legacy-pay-preview__row--one"></span>
              <span class="legacy-pay-preview__row legacy-pay-preview__row--two"></span>
              <strong>经典红灰</strong>
            </div>
          </el-tooltip>
        </li>
      </ul>
      <p class="tc pdb10" style="padding-top: 30px;">
        <el-button size="mini" type="primary" @click="setSkin">确定</el-button>
        <el-button size="mini" type="info" @click="dialogSkin.show = false">取消</el-button>
      </p>
    </el-dialog>
  </div>
</template>

<script>
import TenantIcon from '../components/TenantIcon';

export default {
  name: 'Home',
  components: { TenantIcon },
  data() {
    return {
      // 帐户信息
      accountInfo: {
        accout: 0.0,
        frozen: 0.0,
        withdraw: 0.0
      },
      // 提现金额，提现手续费
      cashInfo: {
        amount: 0.0,
        fee: 0.0
      },
      // 充值信息
      chargeInfoData: {
        waitFlag: false,
        todaycharge: 0.0,
        todayProfit: 0.0,
        waitSend: 0,
        agentProfit: 0.0,
        tenantCount: 0,
        agentPayAmount: 0.0,
        yesterdayPayAmount: 0.0,
        yesterdayProfit: 0.0
      },
      // 功能设置
      functionSet: {
        serverSwitch: false,
        gamerSwitch: false,
        phoneSwitch: false,
        serverPhone: '', // 在线客服电话
        serverQQ: [], // 客服QQ联系
        leaveCount: 0, // 留言条数
        linkurl: 'https://game.369zf.cn/:80/#/login/loginregister?uuid=d2dc1312', // 推广注册的链接
        payType: 0, // 支付方式优先
        gameNameState: 0,
        wechatSwitch: false
      },
      // 修改密码弹框
      dialog: {
        show: false,
        oldpwd: '',
        newpwd: '',
        surepwd: ''
      },
      // 公告详情弹框
      noticeDialog: {
        show: false,
        detail: {}
      },
      // 用户信息
      userInfo: {
        id: '',
        userName: '',
        type: false,
        imgurl: '',
        isSigned: false,
        signUrl: '',
        lxfs: 0,
        jsm: 0,
        ip: '',
        wechatState: false
      },
      noticeList: [], // 公告信息
      waitTableFlag: false, // table中的等待
      waitTableIndex: '', // table中的等待index
      tableData: [],
      dialog3: {
        show: false
      },
      dialog5: {
        show: false
      },
      dialog4: {
        show: false, // 弹框的显隐
        phone: '', // 手机号
        serverlist: []
      },
      dialogqq: {
        show: false,
        name: '', // 客服名称
        qq: '' // QQ号码
      },
      dialogcharge: {
        show: false,
        minrecharge: '',
        maxrecharge: '',
        minrechargeValue: 0,
        maxrechargeValue: 0,
        nowMincharge: 0,
        nowMaxcharge: 0
      },
      dialogSkin: {
        show: false,
        skinNum: 0
      },
      dialogSkins: {
        show: false,
        skinNums: 0,
        uiMode: localStorage.getItem('tenantUiMode') === 'modern' ? 'modern' : 'classic'
      },

      bank: {
        realName: '未知户'
      },
      pageLoading: false, // 新增全局loading状态
      isQY: false, // 是否强制签约
      showChannelSettingEntry: false,
      homeTraceStartAt: 0
    };
  },
  methods: {
    formatIpForDisplay(ip) {
      if (!ip) {
        return '';
      }
      if (!ip.includes(':') || ip.length <= 18) {
        return ip;
      }
      return `${ip.slice(0, 11)}...${ip.slice(-4)}`;
    },
    traceHomeStage(stage) {
      if (!this.homeTraceStartAt) {
        return;
      }
      const now = (typeof performance !== 'undefined' && performance.now)
        ? performance.now()
        : Date.now();
      const elapsed = Math.round(now - this.homeTraceStartAt);
      console.warn(`[HomeTrace] ${stage} ${elapsed}ms`);
    },
    loadAllData() {
      this.pageLoading = true;
      return Promise.all([
        this.$api.home.getUserinfo(),
        this.$api.home.chargeInfo()
      ])
        .then(([userRes, chargeRes]) => {
          // 用户信息
          if (userRes.status === 200) {
            this.userInfo.id = userRes.data.id;
            this.userInfo.userName = userRes.data.userName;
            this.userInfo.type = userRes.data.type;
            this.functionSet.payType = userRes.data.payType;
            this.functionSet.gameNameState = userRes.data.gameNameState;
            this.$store.commit('saveuuid', userRes.data.uuid);
            this.$store.commit('saveType', userRes.data.type);
            this.$store.commit('changeNickName', userRes.data.userName);
            this.$store.commit('changeId', userRes.data.id);
            this.$store.commit('changeqyState', userRes.data.isQY);
            this.$store.commit('settlementType', userRes.data.settlementType);
            this.$store.commit('setRoleInfo', userRes.data.roleinfon);
            this.functionSet.serverSwitch = userRes.data.serviceState;
            this.functionSet.gamerSwitch = userRes.data.leaveState;
            this.functionSet.phoneSwitch = userRes.data.phoneState;
            this.dialogSkins.skinNums = userRes.data.defaultSkin;
            this.dialogSkin.skinNum = userRes.data.rechargSkin;
            this.userInfo.isSigned = userRes.data.isSigned;
            this.userInfo.signUrl = userRes.data.signUrl;
            this.userInfo.lxfs = 0;
            this.userInfo.jsm = 0;
            this.userInfo.wechatState = userRes.data.wechatState;
            if (userRes.data.type) {
              this.getlink();
            }
          }
          // 充值信息
          if (chargeRes.status === 200) {
            this.chargeInfoData.todaycharge = chargeRes.data.payAmount.toFixed(2);
            this.chargeInfoData.todayProfit = chargeRes.data.profit.toFixed(2);
            this.chargeInfoData.waitSend = chargeRes.data.toBeIssuedState;
            this.chargeInfoData.agentProfit = chargeRes.data.agentProfit.toFixed(2);
            this.chargeInfoData.tenantCount = chargeRes.data.tenantCount;
            this.chargeInfoData.agentPayAmount = chargeRes.data.agentPayAmount.toFixed(
              2
            );
            this.chargeInfoData.yesterdayPayAmount = chargeRes.data.yesterdayPayAmount.toFixed(2);
            this.chargeInfoData.yesterdayProfit = chargeRes.data.yesterdayProfit.toFixed(2);
          }
          console.log(this.$store.state);
          this.traceHomeStage('CoreDataDone');
          if (!this.isRestrictedAccount()) {
            return this.getAccountInfo();
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
          this.traceHomeStage('CoreDataFailed');
        })
        .finally(() => {
          this.pageLoading = false;
          this.traceHomeStage('CoreLoadingEnd');
        });
    },
    loadDeferredData() {
      this.traceHomeStage('DeferredStart');
      if (!this.isRestrictedAccount()) {
        this.cashWithdraw();
        this.getInfo();
      }
      this.getNotice();
      this.orderList();
      this.servicePhone();
      this.getMessageCount();
      this.getUserProfit();
      this.getMimicharge();
      this.getlist();
    },
    isRestrictedAccount() {
      return [3, 4].includes(Number(this.$store.state.settlementType));
    },
    // 获取用户图像
    getUserProfit() {
      this.$api.home
        .getProfile()
        .then((data) => {
          // console.log(data.data);
          this.userInfo.imgurl = data.data;
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 图片上传之前的勾子
    fileSelect(file) {
      let form = new FormData();
      form.append('file', file);
      this.$api.home
        .uploadprofit(form)
        .then(() => {
          this.$messageSuccess('上传成功！');
          this.getUserProfit();
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 获取帐户信息
    getAccountInfo() {
      return this.$api.home
        .getAccountInfo()
        .then((data) => {
          if (data.status === 200) {
            this.accountInfo.accout = data.data.accountAmount.toFixed(2);
            this.accountInfo.frozen = data.data.frozenAmount.toFixed(2);
            this.accountInfo.withdraw = data.data.withdrawableAmount.toFixed(2);
          } else if (data.status === 204) {
            this.accountInfo.accout = 0.0;
            this.accountInfo.frozen = 0.0;
            this.accountInfo.withdraw = 0.0;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 提现中金额，提现手续费
    cashWithdraw() {
      this.$api.home
        .cashWithdraw()
        .then((data) => {
          if (data.status === 200) {
            this.cashInfo.amount = data.data.amount.toFixed(2);
            this.cashInfo.fee = data.data.cost.toFixed(2);
          } else if (data.status === 204) {
            this.cashInfo.amount = 0.0;
            this.cashInfo.fee = 0.0;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 获取充值信息
    chargeInfo() {
      this.$api.home
        .chargeInfo()
        .then((data) => {
          if (data.status === 200) {
            this.chargeInfoData.todaycharge = data.data.payAmount.toFixed(2);
            this.chargeInfoData.todayProfit = data.data.profit.toFixed(2);
            this.chargeInfoData.waitSend = data.data.toBeIssuedState;
            this.chargeInfoData.agentProfit = data.data.agentProfit.toFixed(2);
            this.chargeInfoData.tenantCount = data.data.tenantCount;
            this.chargeInfoData.agentPayAmount = data.data.agentPayAmount.toFixed(
              2
            );
            this.chargeInfoData.yesterdayPayAmount = data.data.yesterdayPayAmount.toFixed(
              2
            );
            this.chargeInfoData.yesterdayProfit = data.data.yesterdayProfit.toFixed(
              2
            );
          } else if (data.status === 204) {
            this.chargeInfoData.todaycharge = 0.0;
            this.chargeInfoData.todayProfit = 0.0;
            this.chargeInfoData.waitSend = 0;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 获取公告信息
    getNotice() {
      this.$api.home
        .getNotice()
        .then((data) => {
          if (data.status === 200) {
            this.noticeList = data.data;
          } else if (data.status === 204) {
            this.noticeList = [];
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 最新充值订单列表
    orderList() {
      this.$api.home
        .orderList({
          PageNumber: 1,
          pageSize: 20
        })
        .then((data) => {
          if (data.status === 200) {
            this.tableData = data.data;
          } else if (data.status === 204) {
            this.tableData = [];
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 在线客户显示
    servicePhone() {
      this.$api.home
        .serviceShow()
        .then((data) => {
          this.functionSet.serverPhone = data.data.servicePhone;
          this.functionSet.serverQQ =
            data.data.serviceQq === null ? [] : JSON.parse(data.data.serviceQq);
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 获取玩家留言数量
    getMessageCount() {
      this.$api.home
        .leaveMessage()
        .then((data) => {
          this.functionSet.leaveCount = data.data;
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 修改密码弹框数据的初始化
    dialoginit() {
      this.dialog.oldpwd = '';
      this.dialog.newpwd = '';
      this.dialog.surepwd = '';
    },
    // 在线客服off/on
    serverOff() {
      if (this.$store.state.settlementType === 3 && !this.hasMenu(5)) {
        this.$messageError('没有操作权限！');
        if (this.functionSet.serverSwitch) {
          this.functionSet.serverSwitch = false;
        } else {
          this.functionSet.serverSwitch = true;
        }
        return;
      }
      this.$api.home
        .serviceOff()
        .then((data) => {
          if (data.status === 200) {
            if (this.functionSet.serverSwitch) {
              this.$messageSuccess('开启：【在线客服】');
            } else {
              this.$messageSuccess('关闭：【在线客服】');
            }
          }
        })
        .catch((err) => {
          this.functionSet.serverSwitch = !this.functionSet.serverSwitch;
          this.$messageError(err.message);
        });
    },
    // 玩家留言off/on
    gamerOff() {
      if (this.$store.state.settlementType === 3 && !this.hasMenu(9)) {
        this.$messageError('没有操作权限！');
        if (this.functionSet.gamerSwitch) {
          this.functionSet.gamerSwitch = false;
        } else {
          this.functionSet.gamerSwitch = true;
        }
        return;
      }
      this.$api.home
        .leaveMessageOff()
        .then((data) => {
          if (data.status === 200) {
            if (this.functionSet.gamerSwitch) {
              this.$messageSuccess('开启：【玩家留言】');
            } else {
              this.$messageSuccess('关闭：【玩家留言】');
            }
          }
        })
        .catch((err) => {
          this.functionSet.gamerSwitch = !this.functionSet.gamerSwitch;
          this.$messageError(err.message);
        });
    },
    // 设置通道优先
    setPayType() {
      if (this.$store.state.settlementType === 3 && !this.hasMenu(6)) {
        this.$messageError('没有操作权限！');
        if (this.functionSet.payType === 1) {
          this.functionSet.payType = 0;
        } else {
          this.functionSet.payType = 1;
        }
        return;
      }
      this.$api.home
        .setPayTypeState(
          {
            payType: this.functionSet.payType
          }
        )
        .then((data) => {
          if (data.status === 200) {
            if (this.functionSet.payType === 1) {
              this.$messageSuccess('开启：【支付宝优先】');
            } else if (this.functionSet.payType === 0) {
              this.$messageSuccess('开启：【微信优先】');
            }
          }
        })
        .catch((err) => {
          this.functionSet.payType = 0;
          this.$messageError(err.message);
        });
    },
    // 设置充值角色名
    SetGameName() {
      if (this.$store.state.settlementType === 3 && !this.hasMenu(8)) {
        this.$messageError('没有操作权限！');
        if (this.functionSet.gameNameState === 1) {
          this.functionSet.gameNameState = 0;
        } else if (this.functionSet.gameNameState === 2) {
          this.functionSet.gameNameState = 0;
        } else {
          this.functionSet.gameNameState = 1;
        }
        return;
      }
      this.$api.home
        .SetGameName(
          {
            gameNameState: this.functionSet.gameNameState
          }
        )
        .then((data) => {
          if (data.status === 200) {
            if (this.functionSet.gameNameState === 0) {
              this.$messageSuccess('关闭：【充值角色名设置】');
            } else if (this.functionSet.gameNameState === 1) {
              this.$messageSuccess('开启：【充值角色名设置必填】');
            } else if (this.functionSet.gameNameState === 2) {
              this.$messageSuccess('开启：【充值角色名设置选填】');
            }
          }
        })
        .catch((err) => {
          this.functionSet.gameNameState = 0;
          this.$messageError(err.message);
        });
    },
    // 玩家手机号码
    phoneOff() {
      if (this.$store.state.settlementType === 3 && !this.hasMenu(30)) {
        this.$messageError('没有操作权限！');
        if (this.functionSet.phoneSwitch) {
          this.functionSet.phoneSwitch = false;
        } else {
          this.functionSet.phoneSwitch = true;
        }
        return;
      }
      this.$api.home
        .phoneOff()
        .then((data) => {
          if (data.status === 200) {
            if (this.functionSet.phoneSwitch) {
              this.$messageSuccess('开启：【玩家手机号码】');
            } else {
              this.$messageSuccess('关闭：【玩家手机号码】');
            }
          }
        })
        .catch((err) => {
          this.functionSet.phoneSwitch = !this.functionSet.phoneSwitch;
          this.$messageError(err.message);
        });
    },
    // 公告详情弹框
    detialNotice(data) {
      this.noticeDialog.show = true;
      this.noticeDialog.detail = data;
    },
    // 公告详情弹框初始化
    noticeInit() {
      this.noticeDialog.detail = {};
    },
    wechatOff() {
      this.$api.home
        .wechatOff()
        .then((data) => {
          if (data.status === 200) {
            if (this.userInfo.wechatState) {
              this.$messageSuccess('开启：【订单发送】');
            } else {
              this.$messageSuccess('关闭：【订单发送】');
            }
          }
        })
        .catch((err) => {
          this.userInfo.wechatState = !this.userInfo.wechatState;
          this.$messageError(err.message);
        });
    },
    // 获取用户信息
    getUser() {
      this.$api.home
        .getUserinfo()
        .then((data) => {
          // eslint-disable-next-line no-undef
          const color = skinColorMap[data.data.defaultSkin] || '#0398d6';
          this.$store.commit('SET_THEME_COLOR', color);
          this.userInfo.id = data.data.id;
          this.userInfo.userName = data.data.userName;
          this.userInfo.type = data.data.type;
          this.$store.commit('saveuuid', data.data.uuid);
          this.$store.commit('saveType', data.data.type);
          this.$store.commit('changeNickName', data.data.userName);
          this.$store.commit('changeId', data.data.id);
          this.functionSet.serverSwitch = data.data.serviceState;
          this.functionSet.gamerSwitch = data.data.leaveState;
          this.functionSet.phoneSwitch = data.data.phoneState;
          this.userInfo.wechatState = data.data.wechatState;
          this.userInfo.isSigned = data.data.isSigned;
          this.userInfo.signUrl = data.data.signUrl;
          this.userInfo.lxfs = 0;
          this.userInfo.jsm = 0;
          this.dialogSkins.skinNums = data.data.defaultSkin;
          this.dialogSkin.skinNum = data.data.rechargSkin;
          if (this.userInfo.type) {
            this.getlink();
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 密码重置
    resetPassword() {
      if (this.dialog.oldpwd === '') {
        this.$messageError('旧密码不能为空！');
        return;
      } else if (this.dialog.newpwd === '') {
        this.$messageError('新密码不能为空！');
        return;
      } else if (this.dialog.newpwd !== this.dialog.surepwd) {
        this.$messageError('新密码两次不一致！');
        return;
      }
      this.$api.home
        .resetPassword({
          oldPassword: this.dialog.oldpwd,
          password: this.dialog.newpwd,
          confirmPassword: this.dialog.surepwd
        })
        .then((data) => {
          if (data.status === 200) {
            this.$messageSuccess('修改密码成功！');
            this.dialog.show = false;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 完善个人信息检测
    checkpersonInfo() {
      if (this.isRestrictedAccount()) {
        this.dialog3.show = false;
        this.dialog5.show = false;
        return;
      }

      this.$api.home
        .checkPersonInfo()
        .then((data) => {
          if (this.isRestrictedAccount()) {
            this.dialog3.show = false;
            this.dialog5.show = false;
            return;
          }
          if (data.status === 200) {
            this.dialog3.show = !data.data;
            if (!this.dialog3.show) {
              console.log(this.$store.state);
              if (this.$store.state.qyState && !this.userInfo.isSigned) {
                this.dialog5.show = true;
              }
            }
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 前去完善个人信息
    gofinishInfo() {
      this.$router.push({ path: '/personal/baseInfo' });
    },
    // 前去签约
    goqy() {
      this.$router.push({ path: '/personal/elecsign' });
    },
    // 编辑在线客服
    editserve() {
      if (this.$store.state.settlementType === 3 && !this.hasMenu(5)) {
        this.$messageError('没有操作权限！');
        return;
      }
      this.dialog4.serverlist = JSON.parse(
        JSON.stringify(this.functionSet.serverQQ)
      );
      this.dialog4.phone = this.functionSet.serverPhone;
      this.dialog4.show = true;
    },
    // 客服编辑修改
    dialog4Init() {
      this.dialog4.phone = '';
      this.dialog4.serverlist = [];
    },
    // 编辑在线客服提交
    editsubmit() {
      this.$api.personCenter
        .editlLineQQ({
          servicePhone: this.dialog4.phone,
          serviceQq: JSON.stringify(this.dialog4.serverlist)
        })
        .then((data) => {
          this.$messageSuccess('编辑成功！');
          this.dialog4.show = false;
          this.servicePhone();
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 删除qq客服
    delqqserve(index) {
      this.dialog4.serverlist.splice(index, 1);
    },
    // 添加客服qq弹框初始化
    dialogqqinit() {
      this.dialogqq.name = '';
      this.dialogqq.qq = '';
    },
    // 添加客服
    addserver() {
      if (this.dialogqq.name === '') {
        this.$messageError('客服名必填！');
        return;
      } else if (this.dialogqq.qq === '') {
        this.$messageError('qq必填！');
        return;
      }
      this.dialog4.serverlist.push({
        name: this.dialogqq.name,
        qq: this.dialogqq.qq
      });
      this.dialogqq.show = false;
    },
    // 获取默认最小金额
    getMimicharge() {
      this.$api.home
        .rechargeDefault()
        .then((data) => {
          if (data.status === 200) {
            this.dialogcharge.minrechargeValue =
              data.data.defaultRechargeMinAmount;
            this.dialogcharge.maxrechargeValue =
              data.data.defaultRechargeMaxAmount;
            this.dialogcharge.nowMincharge = data.data.rechargeMinAmount;
            this.dialogcharge.nowMaxcharge = data.data.rechargeMaxAmount;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 设置最小充值金额
    setMinicharge() {
      if (this.dialogcharge.minrecharge === '') {
        this.$messageError('请输入最小金额！');
        return;
      }
      if (this.dialogcharge.maxrecharge === '') {
        this.$messageError('请输入最大金额！');
        return;
      }
      this.$api.home
        .rechargeSetting({
          rechargeMinAmount: this.dialogcharge.minrecharge,
          rechargeMaxAmount: this.dialogcharge.maxrecharge
        })
        .then((data) => {
          if (data.status === 200) {
            this.$messageSuccess('设置成功！');
            this.dialogcharge.show = false;
            this.getMimicharge();
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 获取推广链接
    getlink() {
      this.$api.home
        .promateLink()
        .then((data) => {
          if (data.status === 200) {
            this.functionSet.linkurl = data.data;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 推广注册链接的跳转
    PromoteLink() {
      window.open(this.functionSet.linkurl);
    },
    // 复制推广链接
    copyPromoteLink() {
      let oInput = document.createElement('input');
      oInput.value = this.functionSet.linkurl;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象
      document.execCommand('Copy'); // 执行浏览器复制命令
      oInput.className = 'oInput';
      oInput.style.display = 'none';
      this.$messageSuccess('复制成功');
      document.body.removeChild(oInput);
    },
    // 订单列表等待下发接口
    waitSendOrder(orderNum) {
      this.$api.home
        .waitSent({
          orderNumber: orderNum
        })
        .then((data) => {
          if (data.status === 200) {
            setTimeout(() => {
              this.waitTableFlag = false;
              this.waitTableIndex = '';
              this.$messageSuccess('下发成功');
              this.orderList();
              this.chargeInfo();
            }, 1500);
          }
        })
        .catch((err) => {
          this.waitTableFlag = false;
          this.waitTableIndex = '';
          this.$messageError(err.message);
        });
    },
    // 等待下发（先发分区通讯检测，再调单条下发）
    waitSent(orderNum, id, index) {
      if (!this.waitTableFlag) {
        this.waitTableFlag = true;
        this.waitTableIndex = index;
        this.ensurePartitionCommunication(id)
          .then(() => {
            this.waitSendOrder(orderNum);
          })
          .catch(() => {
            this.waitTableFlag = false;
            this.waitTableIndex = '';
            this.$messageError('分区检测失败！');
          });
      }
    },
    // 等待下发全部：先对当前列表中「待发送」涉及的分区逐一做通讯检测，再批量下发
    async waitSentAll() {
      if (this.chargeInfoData.waitFlag) {
        return;
      }
      this.chargeInfoData.waitFlag = true;
      try {
        const listRes = await this.$api.home.orderList({
          PageNumber: 1,
          pageSize: 100
        });
        if (listRes.status !== 200 && listRes.status !== 204) {
          throw new Error('获取订单列表失败');
        }
        const rows = this.normalizeHomeOrderListPayload(listRes.data);
        const partitionIds = [
          ...new Set(
            rows
              .filter((r) => r.state === 2 && r.partitionId > 0)
              .map((r) => r.partitionId)
          )
        ];
        if (this.chargeInfoData.waitSend > 0 && partitionIds.length === 0) {
          this.$messageError(
            '未在列表中加载到待发送订单，请刷新页面后重试，或使用订单行的单条下发'
          );
          return;
        }
        for (let i = 0; i < partitionIds.length; i += 1) {
          await this.ensurePartitionCommunication(partitionIds[i]);
        }
        const data = await this.$api.home.waitSentAll();
        if (data.status === 200) {
          const msg =
            typeof data.data === 'string' ? data.data : '下发成功';
          this.$messageSuccess(msg);
          this.orderList();
          this.chargeInfo();
        } else {
          this.$messageError('批量下发失败');
        }
      } catch (e) {
        const m =
          (e && e.message) ||
          (e && e.Message) ||
          '';
        if (m === '分区检测失败' || m.indexOf('分区') >= 0) {
          this.$messageError('分区检测失败！');
        } else if (m) {
          this.$messageError(m);
        } else {
          this.$messageError('下发超时,请检测网关！');
        }
      } finally {
        this.chargeInfoData.waitFlag = false;
      }
    },
    // 获取信息
    getInfo() {
      this.$api.home
        .withdrawApply()
        .then((data) => {
          if (data.status === 200) {
            this.bank.account = data.data.overMoney;
            this.bank.fee = data.data.fee.toFixed(2);
            this.bank.bankName = data.data.bankName;
            this.bank.player = data.data.realName;
            this.bank.bankNumber = data.data.bankNumber;
            this.bank.cansettle = data.data.canSettlementMoney;
            this.bank.isfrozen = data.data.activated;
            this.bank.realName = data.data.realName;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 实时修改皮肤
    handleSkinChange(num) {
      this.dialogSkins.skinNums = num;
      this.dialogSkins.uiMode = 'classic';
      localStorage.setItem('skinNum', num); // 立即保存
      localStorage.setItem('tenantUiMode', 'classic');
      this.$root.$emit('skin-change', num); // 通知主页面
      this.$root.$emit('ui-theme-change', 'classic');
    },
    handleUiModeChange(mode) {
      this.dialogSkins.uiMode = mode === 'modern' ? 'modern' : 'classic';
      localStorage.setItem('tenantUiMode', this.dialogSkins.uiMode);
      this.$root.$emit('ui-theme-change', this.dialogSkins.uiMode);
    },
    // 获取皮肤类型
    getSkin() {
      if (this.$store.state.settlementType === 3 && this.hasMenu(7)) {
        this.$messageError('没有操作权限！');
        return;
      }
      this.dialogSkins.uiMode = localStorage.getItem('tenantUiMode') === 'modern' ? 'modern' : 'classic';
      this.dialogSkin.show = true;
    },
    // 设置皮肤
    setSkin() {
      localStorage.setItem('tenantUiMode', this.dialogSkins.uiMode);
      this.$root.$emit('ui-theme-change', this.dialogSkins.uiMode);
      this.$api.home
        .setSkin({
          skinIndex: this.dialogSkins.skinNums,
          rechargSkin: this.dialogSkin.skinNum
        })
        .then((data) => {
          this.$messageSuccess('皮肤设置成功！');
          this.dialogSkin.show = false;
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 获取IP
    getlist() {
      this.$api.userLog
        .logList({
          PageNumber: 1,
          PageSize: 1
        })
        .then((data) => {
          if (data.status === 204) {
            this.userInfo.ip = '';
          } else if (data.status === 200) {
            this.userInfo.ip = data.data[0].ip;
            // console.log(data)
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    hasMenu(menuId) {
      const menuIds = (this.$store.state.roleInfo || '').split(',').map(id => Number(id));
      return menuIds.includes(menuId);
    },
    goOrder() {
      this.$api.home
        .addEmsOrder()
        .then((data) => {
          if (data.status === 200) {
            this.$messageSuccess('领取成功!');
          } else {
            this.$messageError(data.message);
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    loadChannelSettingEntry() {
      // 复用你现有接口：GetProductChannelSetting（返回 enabled）
      this.$api.home.getProductChannelSetting()
        .then((res) => {
          if (res && res.status === 200) {
            this.showChannelSettingEntry = !!res.data.enabled;
          } else {
            this.showChannelSettingEntry = false;
          }
        })
        .catch(() => {
          this.showChannelSettingEntry = false;
        });
    },
    goChannelSetting() {
      this.$router.push({ path: '/main/rateList' }).catch(() => { });
    }
  },
  created() {
    this.homeTraceStartAt = (typeof performance !== 'undefined' && performance.now)
      ? performance.now()
      : Date.now();
    this.traceHomeStage('Created');
    const coreDataPromise = this.loadAllData();
    // 等待用户身份和账户信息加载完成，避免员工、子账户被误判为主账户
    coreDataPromise.then(() => {
      this.traceHomeStage('CoreDataChecked');
      this.checkpersonInfo();
      // 确认账户类型后再加载附加数据，避免员工、子账户调用开户相关接口
      this.$nextTick(() => {
        setTimeout(() => {
          this.loadDeferredData();
        }, 0);
      });
      if (!this.isRestrictedAccount()) {
        this.loadChannelSettingEntry();
      }
    });
    // 个人信息检查已移动到用户身份识别完成后调用
    // 获取当前角色所有菜单权限 id 数组
    // const menuIds = (this.$store.state.roleInfo || '').split(',').map(id => Number(id));
    // // this.getSkin();
    // // 判断是否有某个菜单权限
    // function hasMenu(menuId) {
    //   return menuIds.includes(menuId);
    // }
  }
};
</script>

<style lang="scss" scoped>
.gs_title {
  background: var(--theme-color);
}

.topinfo {
  float: right;
  width: 784px;

  .moneybox {
    padding: 2px 35px 1px 15px;
    position: relative;

    ul {
      border-bottom: 1px dashed #63aafa;
      padding: 20px 0 16px;

      li {
        float: left;
        width: 120px;
        text-align: center;

        &.linebox {
          width: 52px;
          text-align: center;

          .line {
            display: inline-block;
            height: 48px;
            width: 1px;
            background: #ccc;
          }
        }

        .tit {
          font-size: 15px;
          color: #313131;
        }

        .number {
          margin-top: 9px;
          font-size: 16px;
          color: #313131;
        }
      }
    }

    .getbtn {
      position: absolute;
      right: 20px;
      top: 20px;
    }

    .btns {
      padding: 10px 0;

      span {
        display: inline-block;
        font-size: 14px;
        color: #0a57ac;
        cursor: pointer;
        margin-top: 8px;

        &.linebtn {
          padding-left: 15px;
          border-left: 1px solid #63aafa;
          margin-left: 15px;
        }
      }
    }
  }

  .chargebox {
    margin-top: 15px;
    padding: 2px 20px 1px;

    .chargebox_t {
      border: 1px solid #facd89;
      padding: 0 15px;
      margin-bottom: 15px;
    }

    ul {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      border-bottom: 1px dashed #ccc;
      padding: 20px 0 21px;

      li {
        width: 105px;
        text-align: center;
      }

      .tit {
        font-size: 15px;
        color: #313131;
      }

      .num {
        font-size: 16px;
        color: #313131;
        margin-top: 10px;
      }
    }

    .carousel {
      padding-left: 40px;
      background: url(../assets/images/警鸣喇叭.png) no-repeat 0 center;
      background-size: 22px 22px;

      .textbox {
        display: flex;
        flex-flow: row nowrap;
        height: 40px;
        line-height: 40px;
        font-size: 12px;
        color: #63aafa;
        cursor: pointer;

        .tit {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .time {
          width: 130px;
          margin-left: 5px;
          text-align: right;
        }
      }
    }
  }
}

.settingbox {
  .userinfo {
    height: 284px;
    float: left;
    width: calc(100% - 795px);

    .infobox {
      // text-align: center;
      margin-top: 12px;

      .avatar-uploader {
        display: inline-block;
        width: 82px;
        height: 82px;
        border-radius: 50%;
        vertical-align: middle;

        .avatar {
          display: block;
          width: 75px;
          height: 75px;
          border-radius: 50%;
        }
      }

      .textbox {
        // display: inline-block;
        // vertical-align: middle;
        // margin-left: 15px;
        margin-top: 22px;

        .acout {
          font-size: 16px;
          color: #0fa1e0;
          font-weight: 900;
        }

        .text {
          font-size: 14px;
          color: #777;
          margin-top: 5px;
          margin-bottom: 5px;
        }

        .range {
          span {
            display: inline-block;
            height: 26px;
            line-height: 26px;
            font-size: 12px;
            color: #434343;
            padding-left: 23px;
            padding-right: 5px;
            border-radius: 4px;
            background: #ffe931 url(../assets/images/zshi.png) no-repeat 6px center;
          }
        }
      }
    }

    .operbox {
      text-align: center;
      // padding: 12px 0 24px;
      padding-top: 5px;

      li {
        display: inline-block;
        width: 82px;
        border-right: 1px solid #63aafa;
        font-size: 14px;

        &.noboder {
          border-right: none;
        }

        span {
          cursor: pointer;
          color: #0a57ac;
        }
      }
    }
  }
}

.functionbox {
  ul {
    padding: 0 28px 3px;
    margin-top: -8px;

    li {
      height: 40px;
      line-height: 40px;
      // border-bottom: 1px dashed #63aafa;
      padding-left: 34px;
      padding-right: 3%;

      .basecolor {
        color: #63aafa;
      }

      .redcolor {
        color: #f27474;
      }

      .linkspan {
        display: inline-block;
        max-width: 70%;
        /* 根据实际宽度调整 */
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: middle;
        cursor: pointer;
        transition: all 0.2s;
        position: relative;

        // &:hover {
        //   color: #20abfc;
        //   text-decoration: underline;
        //   white-space: normal;
        //   word-break: break-all;
        //   background: #fff;
        //   z-index: 10;
        //   box-shadow: 0 2px 8px rgba(0,0,0,0.15);
        //   padding: 2px 6px;
        //   border-radius: 3px;
        // }
      }

      &.icon1 {
        background: url(../assets/images/客服.png) no-repeat 3px center;
        background-size: 17px 17px;
      }

      &.icon2 {
        background: url(../assets/images/留言投诉.png) no-repeat 3px center;
        background-size: 20px 20px;
      }

      &.icon3 {
        background: url(../assets/images/电话.png) no-repeat 3px center;
        background-size: 20px 20px;
      }

      &.icon4 {
        background: url(../assets/images/icon-会长充值记录.png) no-repeat 3px center;
        background-size: 20px 20px;
      }

      &.icon5 {
        background: url(../assets/images/set_icon5.png) no-repeat 3px center;
        background-size: 20px 20px;
      }

      &.icon6 {
        background: url(../assets/images/皮肤.png) no-repeat 3px center;
        background-size: 20px 20px;
      }

      &.icon7 {
        background: url(../assets/images/资金支付通道.png) no-repeat 3px center;
        background-size: 20px 20px;
      }

      &.icon8 {
        background: url(../assets/images/角色管理.png) no-repeat 3px center;
        background-size: 20px 20px;
      }

      // &.icon9 {
      //   background: url(../assets/images/phone.png) no-repeat 6px center;
      //   background-size: auto 17px;
      // }
      // &.icon10 {
      //   background: url(../assets/images/订单发送.png) no-repeat 6px center;
      //   background-size: auto 17px;
      // }
      &.icon11 {
        background: url(../assets/images/订单.png) no-repeat 3px center;
        background-size: 20px 20px;
      }
      &.icon12 {
        background: url(../assets/images/资金支付通道.png) no-repeat 3px center;
        background-size: 20px 20px;
      }
      // &:last-child {
      //   margin-bottom: 15px;
      // }
    }
  }

  .settingBtn {
    cursor: pointer;
    color: #63aafa;
    margin-right: 4px;
  }
}

.tablebox {
  background: #fff;
}

.opeartbox {
  padding: 7px 20px 5px;
  background: #fff;

  ul {
    li {
      float: left;
      margin-right: 15px;
      margin-bottom: 10px;

      .tit {
        display: inline-block;
        vertical-align: middle;
        width: 80px;
        font-size: 14px;
        color: #2d2d2d;
        margin-right: 5px;
      }

      .txtbox {
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
}

.noticeDetail {
  .title {
    text-align: center;
  }

  .time {
    text-align: center;
    margin-top: 15px;
    padding-bottom: 8px;
    border-bottom: 1px solid #ccc;
  }

  .content {
    padding: 10px 0;
    word-break: break-all;
    height: 400px;
    overflow-y: auto;
  }
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

.minichargebox {
  font-size: 16px;
  padding-left: 20px;

  .list {
    display: flex;
    flex-flow: row nowrap;

    .tit {
      width: 120px;
      height: 32px;
      line-height: 32px;
    }
  }
}

.areaContainer {
  padding-left: 20px;

  li {
    position: relative;
    float: left;
    border: 2px solid transparent;
    padding: 2px;
    cursor: pointer;
    margin-right: 18px;

    &:hover {
      border-color: #00b066;
    }

    &.on {
      border-color: #00b066;

      &:after {
        content: '';
        position: absolute;
        width: 16px;
        height: 17px;
        background: url(../assets/images/checked.png) no-repeat center center;
        bottom: 0;
        right: 0;
      }
    }

    img {
      display: block;
      width: 200px;
      height: 150px;
    }
  }
}

.modern-skin-preview {
  position: relative;
  box-sizing: border-box;
  width: 200px;
  height: 150px;
  overflow: hidden;
  border-radius: 3px;
  background: #f3f6fb;

  > span { position: absolute; display: block; }
  &__sidebar { inset: 0 auto 0 0; width: 38px; background: linear-gradient(180deg, #102b50, #071a31); }
  &__topbar { top: 0; right: 0; left: 38px; height: 18px; border-bottom: 1px solid #e6eaf1; background: #fff; }
  &__card { top: 29px; height: 30px; border: 1px solid #e4e9f1; border-radius: 3px; background: #fff; box-shadow: 0 2px 5px rgba(31,48,80,.08); }
  &__card--one { left: 48px; width: 62px; }
  &__card--two { left: 117px; right: 9px; }
  &__table { top: 68px; right: 9px; bottom: 16px; left: 48px; border: 1px solid #e4e9f1; border-radius: 3px; background: repeating-linear-gradient(180deg, #fff 0, #fff 12px, #eef2f8 13px); }
  strong { position: absolute; right: 12px; bottom: 2px; color: #5268f7; font-size: 11px; font-weight: 700; }
}

.stateColor {
  background: #409eff;
  color: #fff;
  display: inline-block;
  padding-left: 5px;
  position: relative;
  height: 22px;
  line-height: 22px;

  &.color1 {
    background: green;

    &:after {
      border-color: green;
    }

    &:before {
      border-right-color: green;
    }
  }

  &.color2 {
    background: #f56c6c;

    &:after {
      border-color: #f56c6c;
    }

    &:before {
      border-right-color: #f56c6c;
    }
  }

  &:after {
    content: '';
    position: absolute;
    border: 1px solid #409eff;
    border-width: 11px 5px;
    top: 0;
    right: -10px;
    border-right-color: transparent !important;
  }

  &:before {
    content: '';
    position: absolute;
    border: 1px solid transparent;
    border-width: 11px 5px;
    top: 0;
    left: -10px;
    border-right-color: #409eff;
  }
}

/* 新版工作台：仅重排现有数据与操作，不改变任何接口或事件 */
.tenant-dashboard {
  padding-bottom: 24px;
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(330px, 1fr);
  gap: 16px;
}

.tenant-dashboard__welcome {
  margin: 0 0 14px;
  grid-column: 1 / -1;

  h1 {
    margin: 0;
    color: #172033;
    font-size: 22px;
    font-weight: 700;
    line-height: 34px;
  }
}

.tenant-design-summary {
  display: grid;
  grid-template-columns: repeat(6, minmax(160px, 1fr));
  gap: 16px;
  margin-bottom: 16px;
  grid-column: 1 / -1;
}

.tenant-design-summary__item {
  box-sizing: border-box;
  min-height: 118px;
  padding: 20px 22px;
  display: flex;
  align-items: center;
  gap: 18px;
  border: 1px solid #e5eaf2;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 4px 14px rgba(31,48,80,.07);

  .tenant-design-summary__icon {
    width: 52px;
    height: 52px;
    flex: 0 0 52px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    font-size: 24px;
    font-weight: 700;
  }

  p { margin: 0 0 7px; color: #667085; font-size: 14px; }
  strong { display: block; color: #172033; font-size: 22px; line-height: 28px; }
  small { display: block; margin-top: 5px; color: #98a2b3; font-size: 12px; }
  .is-clickable { cursor: pointer; }

  &.is-blue .tenant-design-summary__icon { color: #3370ff; background: #edf3ff; }
  &.is-cyan .tenant-design-summary__icon { color: #13b8c8; background: #e8fbfd; }
  &.is-green .tenant-design-summary__icon { color: #16b364; background: #eaf9f0; }
  &.is-orange .tenant-design-summary__icon { color: #f59e0b; background: #fff7e5; }
  &.is-purple .tenant-design-summary__icon { color: #7a5af8; background: #f2efff; }
  &.is-red .tenant-design-summary__icon { color: #e5484d; background: #fff0f1; }
}

.tenant-dashboard .tenant-account-grid {
  display: grid;
  grid-template-columns: minmax(280px, 340px) minmax(0, 1fr);
  gap: 16px;
  margin-bottom: 0;
  grid-column: 2;
  grid-row: 3;
  grid-template-columns: 1fr;
  align-content: start;
  align-self: start;
  gap: 0;
  overflow: hidden;
  border: 1px solid #e5eaf2;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 4px 14px rgba(31,48,80,.07);

  .tenant-section-heading {
    padding: 17px 20px 14px;
    color: #172033;
    font-size: 16px;
    font-weight: 700;
    border-bottom: 1px solid #eef1f5;
  }

  .userinfo {
    float: none !important;
    width: auto !important;
    height: auto !important;
    min-height: 0;
    padding: 14px 18px 12px;
    border: 0 !important;
    border-radius: 0 !important;
    color: #172033;
    background: #fff !important;
    box-shadow: none !important;
  }

  .userinfo .infobox { margin-top: 0; }
  .userinfo .avatar { width: 64px; height: 64px; object-fit: contain; }
  .userinfo .textbox { margin-top: 1px !important; }
  .userinfo .textbox .acout { color: #344054; font-size: 17px; }
  .userinfo .textbox .text { color: #98a2b3; line-height: 20px; }
  .userinfo .operbox { margin-top: 14px; padding-top: 12px; border-top: 1px solid #eef1f5; }
  .userinfo .operbox li { width: auto; padding: 0 12px; border-color: #d9e2ef; }
  .userinfo .operbox span { color: #3370ff; }

  .topinfo {
    float: none !important;
    width: auto !important;
    height: auto !important;
    min-height: 0;
    border-top: 1px solid #eef1f5;
  }

  .moneybox {
    box-sizing: border-box;
    height: auto !important;
    min-height: 0;
    padding: 14px 20px 10px !important;
    border: 0 !important;
    border-radius: 0 !important;
    background: #fff !important;
    box-shadow: none !important;
  }

  .moneybox .numberbox {
    width: 100%;
    min-width: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    column-gap: 20px;
  }

  .moneybox .numberbox > ul {
    flex: 1 1 300px;
    min-width: 0;
    padding: 2px 0 20px;
    display: grid;
    grid-template-columns: repeat(4, minmax(110px, 1fr));
    gap: 0;
    border-bottom: 1px solid #eef1f5 !important;
  }

  .moneybox .numberbox > ul > li:nth-child(1),
  .moneybox .numberbox > ul > li:nth-child(2) { display: none; }

  .moneybox .numberbox > ul { grid-template-columns: repeat(2, minmax(140px, 1fr)); }

  .moneybox .numberbox > ul > li {
    width: auto !important;
    padding: 6px 18px;
    text-align: left;
    border-right: 1px solid #eef1f5;
  }

  .moneybox .numberbox > ul > li:first-child { padding-left: 0; }
  .moneybox .numberbox > ul > li:nth-last-child(1) { border-right: 0; }
  .moneybox .numberbox > ul > .linebox { display: none; }
  .moneybox .tit { color: #667085 !important; font-size: 13px !important; }
  .moneybox .number { margin-top: 9px !important; font-size: 23px !important; font-weight: 700; letter-spacing: -.3px; }
  .moneybox .getbtn {
    position: static;
    flex: 0 0 auto;
    max-width: 100%;
    margin-top: 2px;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 8px;
  }
  .moneybox .getbtn .el-button + .el-button { margin-left: 0; }
  .moneybox .btns {
    flex: 0 0 100%;
    width: 100%;
    min-width: 0;
    max-width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    column-gap: 0;
    row-gap: 6px;
    padding: 12px 0 2px;
    white-space: normal;
    overflow: visible;
  }
  .moneybox .btns .account-quick-link {
    box-sizing: border-box;
    position: relative;
    flex: 0 0 auto;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 36px;
    margin: 0;
    padding: 0 16px;
    line-height: 36px;
    white-space: nowrap;
    text-decoration: none;
    cursor: pointer;
  }
  .moneybox .btns .account-quick-link::after {
    content: '';
    position: absolute;
    top: 8px;
    right: 0;
    width: 1px;
    height: 20px;
    background: #dbe3f0;
  }
  .moneybox .btns .account-quick-link:last-child::after { display: none; }
  .moneybox .btns .account-quick-link.is-disabled { cursor: not-allowed; }
}

.tenant-dashboard .tenant-metrics-grid {
  margin: 0;
  grid-column: 1;
  grid-row: 3;

  > .tenant-section-heading {
    position: relative;
    z-index: 1;
    margin-bottom: -52px;
    padding: 17px 20px 14px;
    color: #172033;
    font-size: 16px;
    font-weight: 700;
  }

  > .topinfo {
    float: none !important;
    width: 100% !important;
  }

  .chargebox {
    margin: 0 !important;
    padding: 58px 18px 18px !important;
    border: 1px solid #e5eaf2 !important;
    border-radius: 8px !important;
    background: #fff !important;
    box-shadow: 0 4px 14px rgba(31,48,80,.07) !important;
  }

  .chargebox_t { margin: 0 !important; padding: 0 !important; border: 0 !important; }

  .chargebox ul {
    display: grid;
    grid-template-columns: repeat(3, minmax(150px, 1fr));
    gap: 12px;
    padding: 0 !important;
    border: 0 !important;
  }

  .chargebox ul li {
    box-sizing: border-box;
    width: auto !important;
    min-height: 104px;
    padding: 20px 22px 18px;
    text-align: left;
    border: 1px solid #e5eaf2;
    border-radius: 8px;
    background: #fff;
    box-shadow: none;
    transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
  }

  .chargebox ul li:nth-child(1),
  .chargebox ul li:nth-child(5) { display: none; }

  .chargebox ul li:hover { transform: translateY(-3px); border-color: #d8dff9; box-shadow: 0 18px 36px rgba(31,48,80,.1); }

  .chargebox ul .tit { color: #667085 !important; font-size: 13px !important; }
  .chargebox ul .num { margin-top: 14px !important; color: #172033 !important; font-size: 24px !important; font-weight: 700; letter-spacing: -.3px; }

  .carousel {
    margin-top: 16px;
    padding: 0 20px 0 52px !important;
    border: 1px solid #e5eaf2;
    border-radius: 14px;
    background-color: #fff !important;
    background-position: 20px center !important;
    box-shadow: 0 4px 16px rgba(31, 48, 80, .05);
  }
}

.tenant-dashboard .functionbox {
  margin: 0 0 16px !important;
  padding: 0;
  overflow: hidden;
  border: 1px solid #e5eaf2 !important;
  border-radius: 8px !important;
  background: #fff !important;
  box-shadow: 0 10px 32px rgba(31, 48, 80, .07) !important;
  grid-column: 1 / -1;

  > .gs_title {
    margin: 0 !important;
    padding: 20px 24px 13px !important;
    font-size: 18px !important;
  }

  > div[style*="display: flex"] {
    padding: 0 22px 22px;
    display: grid !important;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px 14px;
  }

  ul {
    width: auto !important;
    margin: 0 !important;
    padding: 0 !important;
  }

  ul li {
    box-sizing: border-box;
    min-height: 58px;
    height: auto !important;
    margin-bottom: 10px;
    padding: 11px 14px 11px 42px !important;
    line-height: 36px !important;
    border: 1px solid #edf0f5;
    border-radius: 12px;
    background-position: 14px center !important;
    background-color: #f8faff !important;
    transition: background .18s ease, border-color .18s ease, transform .18s ease;
  }

  ul li:hover { transform: translateX(2px); border-color: #dce3fb; background-color: #f4f6ff !important; }
}

.tenant-dashboard > .tablebox {
  margin: 0 !important;
  padding-top: 0 !important;
  border-radius: 8px !important;
  box-shadow: 0 10px 32px rgba(31,48,80,.07) !important;
  grid-column: 1 / -1;

  > .gs_title {
    margin: 0 !important;
    padding: 16px 20px 10px !important;
    font-size: 18px !important;
  }
}

.tenant-dashboard .stateColor {
  height: 24px;
  padding: 0 9px;
  line-height: 24px;
  border-radius: 5px;
  background: #4f6bff;
}

.tenant-dashboard .stateColor::before,
.tenant-dashboard .stateColor::after { display: none; }

.tenant-dashboard .stateColor.color1 { color: #087443; background: #ecfdf3; }
.tenant-dashboard .stateColor.color2 { color: #d92d20; background: #fff1f2; }

@media (max-width: 1380px) {
  .tenant-design-summary { grid-template-columns: repeat(2, minmax(180px, 1fr)); }
  .tenant-dashboard { grid-template-columns: 1fr; }
  .tenant-dashboard .tenant-metrics-grid .chargebox ul { grid-template-columns: repeat(2, minmax(150px, 1fr)); }
  .tenant-dashboard .tenant-account-grid,
  .tenant-dashboard .tenant-metrics-grid { grid-column: 1; grid-row: auto; }
  .tenant-dashboard .tenant-account-grid { grid-template-columns: 1fr; }
  .tenant-dashboard .tenant-account-grid .moneybox .numberbox > ul {
    flex: 0 0 100%;
    width: 100% !important;
    max-width: 100%;
    padding-right: 0;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .tenant-dashboard .tenant-account-grid .moneybox .getbtn {
    flex: 0 0 100%;
    width: 100%;
    margin-top: 12px;
    justify-content: flex-start;
  }
}

.legacy-pay-preview {
  position: relative;
  box-sizing: border-box;
  width: 200px;
  height: 150px;
  overflow: hidden;
  border: 1px solid #d8d8d8;
  background: linear-gradient(90deg, #f3f3f3 0 30px, #fff 30px 100%);
}

.legacy-pay-preview span { position: absolute; display: block; }
.legacy-pay-preview__top { top: 0; left: 0; right: 0; height: 20px; border-bottom: 3px solid #a92b1c; background: #fff; }
.legacy-pay-preview__notice { top: 32px; left: 42px; right: 12px; height: 14px; background: #ededed; border-bottom: 1px solid #a92b1c; }
.legacy-pay-preview__title { top: 59px; left: 42px; width: 62px; height: 7px; background: #a92b1c; }
.legacy-pay-preview__row { left: 42px; right: 12px; height: 15px; border: 1px solid #ddd; background: #f5f5f5; }
.legacy-pay-preview__row--one { top: 74px; }
.legacy-pay-preview__row--two { top: 94px; }
.legacy-pay-preview strong { position: absolute; right: 12px; bottom: 5px; color: #8f261a; font-size: 11px; font-weight: 600; }
</style>
