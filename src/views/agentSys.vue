<!--
 * @Description: 代理系统
 * @Author: gao shuai
 * @Date: 2020-05-18 09:46:49
 * @LastEditTime: 2020-09-01 09:50:51
 * @LastEditors: gao shuai
-->

<template>
  <div class="home">
    <div class="gs_title" style="color: white;">代理管理</div>
    <div class="gs_tabbox clearfix mgt15">
      <div class="tabbox">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="下属商户" name="0">
            <div class="tablebox pdb15 pdt10 bg_fff">
              <div class="clearfix pdb10">
                <p class="fr mgr10">
                  <el-button size='small' type="success" @click="subMerchant.dialog.show = true">注册商户</el-button>
                </p>
              </div>
              <div class="gs_tablebox">
                <el-table ref="moduleTable" size="mini" :data="subMerchant.tableData" border style="width: 100%" stripe>
                  <el-table-column prop="name" label="注册时间">
                    <template slot-scope="scope">
                      <p style="height:18px;">{{scope.row.joinDate?scope.row.joinDate.split(' ')[0]:''}}</p>
                      <p style="color:#999;height:18px;">{{scope.row.joinDate?scope.row.joinDate.split(' ')[1]:''}}</p>
                    </template>
                  </el-table-column>
                  <el-table-column prop="nickName" label="昵称">
                  </el-table-column>
                  <el-table-column prop="userName" label="帐号">
                  </el-table-column>
                  <el-table-column prop="partitionCount" label="分区个数">
                  </el-table-column>
                  <el-table-column prop="qqNumber" label="联系QQ">
                  </el-table-column>
                  <el-table-column prop="partitionsCount" label="结算类型">
                    <template slot-scope="scope">
                      <span>{{'T+'+scope.row.settlementType}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="partitionsCount" label="最后登陆">
                    <template slot-scope="scope">
                      <p style="height:18px;">{{scope.row.lastDate?scope.row.lastDate.split(' ')[0]:''}}</p>
                      <p style="color:#999;height:18px;">{{scope.row.lastDate?scope.row.lastDate.split(' ')[1]:''}}</p>
                    </template>
                  </el-table-column>
                  <el-table-column label="状态" width="70">
                    <template slot-scope="scope">
                      <el-switch v-model="scope.row.state" :active-value="1" :inactive-value="0" active-color="#13ce66" inactive-color="#ff4949" @change="stateChange(scope.row.id)"></el-switch>
                    </template>
                  </el-table-column>
                  <el-table-column label="比率组" width="170">
                    <template slot-scope="scope">
                      <el-select v-model="scope.row.rankId" size="small" @change="rateChange(scope.row.id,scope.row.rankId)">
                        <el-option label="请选择" :value="0"></el-option>
                        <el-option v-for="(item,i) in subMerchant.rateDraw" :key="'modeofpayment'+i" :label="item.name" :value="item.id"></el-option>
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="140">
                    <template slot-scope="scope">
                      <el-button-group>
                        <el-button size="mini" type="primary" @click="merchantLogin(scope.row.id)">登录</el-button>
                        <!-- <el-button size="mini" type="danger" @click="handleClose(scope.row.id)">删除</el-button> -->
                      </el-button-group>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="mgt15 pdl20">
                <el-pagination @size-change="handleSizeChange0" @current-change="handleCurrentChange0" background :page-sizes="[10, 20, 30, 40]" :current-page="subMerchant.pageIndex" :page-size="subMerchant.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="subMerchant.total">
                </el-pagination>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="代理订单" name="1" class="agent-order-pane">
            <div class="opeartbox">
              <ul class="clearfix">
                <li>
                  <span class='tit'>起始时间：</span>
                  <!-- <el-date-picker style="width:338px;" v-model="agentOrder.time" size="small" type="datetimerange" :default-time="['00:00:00', '23:59:59']" value-format="yyyy-MM-dd HH:mm:ss" range-separator="至" start-placeholder="起始时间" end-placeholder="结束时间"></el-date-picker> -->
                  <el-date-picker style="width:190px;" v-model="time1" size="small" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期">
                  </el-date-picker> 至
                  <el-date-picker style="width:190px;" v-model="time2" size="small" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期">
                  </el-date-picker>
                </li>
                <li>
                  <span class='tit'>订单编号：</span>
                  <span class="txtbox" style="width:124px;">
                    <el-input size="small" v-model="agentOrder.ordernumber" placeholder="请输入订单编号"></el-input>
                  </span>
                </li>
                <li>
                  <span class='tit'>游戏账号：</span>
                  <span class="txtbox" style="width:124px;">
                    <el-input size="small" v-model="agentOrder.gameaccount" placeholder="请输入游戏账号"></el-input>
                  </span>
                </li>
                <li>
                  <span class='tit'>支付方式：</span>
                  <span class="txtbox" style="width: 120px;">
                    <el-select v-model="agentOrder.paytype" clearable size="small" placeholder="请选择">
                      <el-option v-for="(item,i) in agentOrder.payDraw" :key="'modeofpayment'+i" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                  </span>
                </li>
                <li>
                  <span class='tit'>下属商户：</span>
                  <span class="txtbox" style="width: 150px;">
                    <el-select v-model="agentOrder.submerchant" size="small" clearable placeholder="请选择">
                      <el-option v-for="(item,i) in agentOrder.submerchantDraw" :key="'gameGroup'+i" :label="item.userName" :value="item.merchantId"></el-option>
                    </el-select>
                  </span>
                </li>
                <li>
                  <span class='tit'>订单状态：</span>
                  <span class="txtbox" style="width: 150px;">
                    <el-select v-model="agentOrder.orderState" size="small" clearable placeholder="请选择">
                      <el-option v-for="(item,i) in agentOrder.orderStateDraw" :key="'gameGroup'+i" :label="item.text" :value="item.value"></el-option>
                    </el-select>
                  </span>
                </li>
                <li>
                  <span class='tit'>订单金额：</span>
                  <span class="txtbox" style="width: 190px;">
                    <el-input style="width:83px;" size="small" type="number" v-model="agentOrder.minvalue" placeholder="0"></el-input> --
                    <el-input style="width:83px;" size="small" type="number" v-model="agentOrder.maxvalue" placeholder="999"></el-input>
                  </span>
                  <span class="mgl15">
                    <el-button size="small" type="success" @click="yesterdayTime">上一天</el-button>
                    <el-button size="small" type="primary" @click="todayTime">今天</el-button>
                    <el-button size="small" type="success" @click="tomorrowTime">下一天</el-button>
                    <el-button size="small" type="primary" @click="()=>{getlist1();orderStatic()}">查询</el-button>
                  </span>
                </li>
              </ul>
            </div>
            <div class="orderForm">
              <table style="width: 100%;text-align: center;">
                <tr>
                  <td></td>
                  <td class="font">支付金额</td>
                  <td class="font">商户总利润</td>
                  <td class="font">代理总利润</td>
                  <td class="font">成功笔数</td>
                </tr>
                <tr>
                  <td class="weight">昨日此时充值：</td>
                  <td>{{agentOrder.yesterday.payaccount.toFixed(2)}}</td>
                  <td>{{agentOrder.yesterday.profit.toFixed(2)}}</td>
                  <td>{{agentOrder.yesterday.agentProfit.toFixed(2)}}</td>
                  <td>{{agentOrder.yesterday.count}}</td>
                </tr>
                <tr>
                  <td style="color: #06859A;">充值金额统计：</td>
                  <td style="color:#468847;">{{agentOrder.today.payaccount.toFixed(2)}}</td>
                  <td style="color:#00b066;">{{agentOrder.today.profit.toFixed(2)}}</td>
                  <td style="color:#00b066;">{{agentOrder.today.agentProfit.toFixed(2)}}</td>
                  <td style="color:#468847">{{agentOrder.today.count}}</td>
                </tr>
              </table>
            </div>
            <!-- <div class="progressBox">
              <span class="textbox">{{(agentOrder.today.successRate*100).toFixed(2)}} %</span>
              <div class="progressBar" :style="{'width':(agentOrder.today.successRate*100).toFixed(2)+'%'}"></div>
            </div> -->
            <div class="tablebox pdb15">
              <div class="gs_tablebox">
                <el-table ref="moduleTable" size="mini" :data="agentOrder.tableData" border style="width: 100%" stripe>
                  <el-table-column prop="orderDate" label="创建时间">
                    <template slot-scope="scope">
                      <p style="height:18px;">{{scope.row.orderDate?scope.row.orderDate.split(' ')[0]:''}}</p>
                      <p style="height:18px;color:#999;">{{scope.row.orderDate?scope.row.orderDate.split(' ')[1]:''}}</p>
                    </template>
                  </el-table-column>
                  <el-table-column label="订单号" width="170">
                    <template slot-scope="scope">
                      <el-tooltip class="item" effect="dark" content="点击查看订单详情" placement="bottom">
                        <span class="checkdetail" @click="orderDetail(scope.row.id)">{{scope.row.orderNumber}}</span>
                      </el-tooltip>
                    </template>
                  </el-table-column>
                  <el-table-column prop="merchantName" label="商户">
                  </el-table-column>
                  <el-table-column prop="playerAccount" label="充值账号">
                  </el-table-column>
                  <el-table-column prop="amount" label="订单金额">
                    <template slot-scope="scope">
                      <span>{{scope.row.amount?scope.row.amount.toFixed(2):'0.00'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="商户利润">
                    <template slot-scope="scope">
                      <span>{{scope.row.merchantProfit?scope.row.merchantProfit.toFixed(2):'0.00'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="代理利润">
                    <template slot-scope="scope">
                      <span style="color:#00b066;">{{scope.row.agentProfit?scope.row.agentProfit.toFixed(2):'0.00'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="partitionName" label="所属分区">
                  </el-table-column>
                  <el-table-column prop="productName" label="充值方式">
                  </el-table-column>
                  <el-table-column label="订单状态">
                    <template slot-scope="scope">
                      <span class="stateColor" :class="'color'+scope.row.state">{{scope.row.state|fstate}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="mgt15 pdl20">
                <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1" background :page-sizes="[10, 20, 30, 40]" :current-page="agentOrder.pageIndex" :page-size="agentOrder.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="agentOrder.total">
                </el-pagination>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="用户分组" name="2">
            <div class="tablebox pdb15 pdt10 bg_fff">
              <div class="clearfix pdb10">
                <p class="fr mgr10">
                  <el-button size='small' type="success" @click="addGroup">添加比率分组</el-button>
                </p>
              </div>
              <div class="gs_tablebox">
                <el-table ref="moduleTable" size="mini" :data="userGroup.tableData" border style="width: 100%" stripe>
                  <el-table-column type="index" label="序号" width="65">
                  </el-table-column>
                  <el-table-column prop="name" label="默认">
                    <template slot-scope="scope">
                      <span class="gs_rido" :class="{'checked':scope.row.isDefault}" @click="userdeflaut(scope.row.id,scope.row.isDefault)"></span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" label="分组名称">
                  </el-table-column>
                  <el-table-column prop="merchantCount" label="用户个数">
                  </el-table-column>
                  <el-table-column label="创建时间">
                    <template slot-scope="scope">
                      <p style="height:18px;">{{scope.row.createDate?scope.row.createDate.split(' ')[0]:''}}</p>
                      <p style="height:18px;color:#999;">{{scope.row.createDate?scope.row.createDate.split(' ')[1]:''}}</p>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" width="140">
                    <template slot-scope="scope">
                      <el-button-group>
                        <el-button size="mini" type="primary" @click="geteditInfo(scope.row.id)">编辑</el-button>
                        <el-button size="mini" type="danger" :disabled="scope.row.merchantCount>0&&userGroup.tableData.length===1" @click="handleClose1(scope.row.id)">删除</el-button>
                      </el-button-group>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <!-- 用户分组编辑 -->
    <el-dialog :title="userGroup.dialog.editflag?'添加分组':'编辑分组'" :visible.sync="userGroup.dialog.show" @close="dialogInit" custom-class="gs_dialog" width="800px">
      <div>
        <ul class="roadlist clearfix">
          <li style="width:501px">
            <span class="tit">分组名称</span>
            <div class="content" style="width: 200px;">
              <el-input size="small" v-model="userGroup.dialog.groupName" placeholder="请输入分组名称"></el-input>
            </div>
          </li>
          <li>
            <span class="tit">一键设置</span>
            <div class="content">
              <el-input size="small" v-model="userGroup.dialog.oneSet" type="number" @input="oneSetinp" placeholder="一键设置"></el-input>
            </div>
          </li>
          <li v-for="(item,i) in userGroup.dialog.list" :key="'user'+i">
            <span class="tit">{{item.productName}}:</span>
            <div class="content">
              <el-input size="small" v-model="item.rate" :ref="'userinp'+i" placeholder="未设置"></el-input>
            </div>
            <span class="tit">≤ {{item.limitRate}}</span>
          </li>
        </ul>
        <p class="tc pdt10 pdb10">
          <el-button v-if="userGroup.dialog.editflag" class="referring" size="small" type="primary" @click="addGroupSure">提交</el-button>
          <el-button v-else class="referring" size="small" type="primary" @click="editsubmit">提交</el-button>
          <el-button size="small" type="info" @click="userGroup.dialog.show=false">取消</el-button>
        </p>
      </div>
    </el-dialog>
    <!-- 添加商户弹框 -->
    <el-dialog title="添加商户" :visible.sync="subMerchant.dialog.show" @close="subMerchantInit" custom-class="gs_dialog" width="450px">
      <div class="opeartbox titwidth mgl30">
        <ul class="clearfix">
          <li>
            <span class='tit'>用户昵称：</span>
            <span class="txtbox">
              <el-input size="small" v-model="subMerchant.dialog.nickName"></el-input>
            </span>
          </li>
          <li>
            <span class='tit'>用户名：</span>
            <span class="txtbox">
              <el-input size="small" v-model="subMerchant.dialog.name" @keyup.native="noChinese"></el-input>
            </span>
          </li>
          <li>
            <span class='tit'>登录密码：</span>
            <span class="txtbox">
              <el-input size="small" v-model="subMerchant.dialog.password"></el-input>
            </span>
          </li>
          <li>
            <span class='tit'>邮箱：</span>
            <span class="txtbox">
              <el-input size="small" v-model="subMerchant.dialog.mail"></el-input>
            </span>
          </li>
          <li>
            <span class='tit'>联系QQ：</span>
            <span class="txtbox">
              <el-input size="small" v-model="subMerchant.dialog.qq"></el-input>
            </span>
          </li>
          <li>
            <span class='tit'>联系电话：</span>
            <span class="txtbox">
              <el-input size="small" v-model="subMerchant.dialog.phone"></el-input>
            </span>
          </li>
          <li>
            <span class='tit'>比率组：</span>
            <span class="txtbox" style="width:200px;">
              <el-select v-model="subMerchant.dialog.rate" clearable size="small" placeholder="请选择">
                <el-option v-for="(item,i) in subMerchant.rateDraw" :key="'modeofpayment'+i" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </span>
          </li>
        </ul>
        <p class="tc pdt10 pdb10">
          <el-button class="referring" size="small" type="primary" @click="addMerchant">提交</el-button>
          <el-button size="small" type="info" @click="subMerchant.dialog.show=false">取消</el-button>
        </p>
      </div>
    </el-dialog>
    <!-- 订单详情弹框 -->
    <el-dialog title="订单详情" :visible.sync="agentOrder.dialog.show" @close="orderInit" custom-class="gs_dialog" width="800px">
      <div class="dialogOrder">
        <table>
          <tr>
            <td class="tit">订单号</td>
            <td>{{agentOrder.dialog.orderNum}}</td>
            <td class="tit">支付方式</td>
            <td>{{agentOrder.dialog.paytype}}</td>
          </tr>
          <tr>
            <td class="tit">玩家账号</td>
            <td>{{agentOrder.dialog.playAccount}}</td>
            <td class="tit">游戏分区</td>
            <td>{{agentOrder.dialog.gamearea}}</td>
          </tr>
          <tr>
            <td class="tit">订单金额</td>
            <td style="color:#FF5722;">{{agentOrder.dialog.orderMoney.toFixed(2)}}</td>
            <td class="tit">下单时间</td>
            <td>{{agentOrder.dialog.orderTime}}</td>
          </tr>
          <tr>
            <td class="tit">付款金额</td>
            <td style="color:#00b066;">{{agentOrder.dialog.payMoney.toFixed(2)}}</td>
            <td class="tit">付款时间</td>
            <td>{{agentOrder.dialog.payTime}}</td>
          </tr>
          <tr>
            <td class="tit">赠送金额</td>
            <td>{{agentOrder.dialog.giveMoney.toFixed(2)}}</td>
            <td class="tit">玩家QQ</td>
            <td>{{agentOrder.dialog.playerQQ}}</td>
          </tr>
          <tr>
            <td class="tit">红包赠送</td>
            <td>{{agentOrder.dialog.givebag.toFixed(2)}}</td>
            <td class="tit">玩家电话</td>
            <td>{{agentOrder.dialog.playerPhone}}</td>
          </tr>
          <tr>
            <td class="tit">玩家 IP</td>
            <td>{{agentOrder.dialog.playerIp}}</td>
            <td class="tit">订单状态</td>
            <td>
              <span class="stateColor" :class="'color'+agentOrder.dialog.orderState">{{agentOrder.dialog.orderState|fstate}}</span>
            </td>
          </tr>
          <tr>
            <td class="tit">下发道具</td>
            <td colspan="3">{{agentOrder.dialog.props}}</td>
          </tr>
        </table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  inject: ['reload'],
  data() {
    return {
      activeName: '0',
      subMerchant: {
        pageIndex: 1, // 页码
        pageSize: 20, // 每页的条数
        total: 0, // 总数据的条数
        rateDraw: [], // 比率组下拉
        tableData: [],
        dialog: {
          show: false,
          nickName: '', // 昵称
          name: '', // 用户名
          password: '', // 登录密码
          mail: '', // 邮箱
          qq: '', // 联系qq
          phone: '', // 联系电话
          rate: '' // 比率组
        }
      },
      agentOrder: {
        time: [this.getCerentTime(true), this.getCerentTime(false)],
        ordernumber: '', // 订单编号
        gameaccount: '', // 游戏账号
        paytype: '', // 支付方式
        payDraw: [], // 支付方式下拉
        submerchant: '', // 下属商户
        submerchantDraw: [], // 下属商户下拉
        orderState: '', // 订单状态
        orderStateDraw: [
          { text: '成功', value: 1 },
          { text: '待发送', value: 2 },
          { text: '待付款', value: 0 }
        ], // 订单状态下拉
        minvalue: '', // 订金金额小
        maxvalue: '', // 订金金额大
        yesterday: {
          payaccount: 0,
          profit: 0,
          agentProfit: 0,
          count: 0
        },
        today: {
          payaccount: 0,
          profit: 0,
          agentProfit: 0,
          count: 0,
          successRate: 0
        },
        pageIndex: 1, // 页码
        pageSize: 20, // 每页的条数
        total: 0, // 总数据的条数
        tableData: [],
        dialog: {
          show: false,
          orderNum: '', // 订单号
          paytype: '', // 支付方式
          playAccount: '', // 玩家账号
          gamearea: '', // 游戏分区
          orderMoney: 0, // 订单金额
          orderTime: '', // 下单时间
          payMoney: 0, // 付款金额
          payTime: '', // 付款时间
          giveMoney: 0, // 赠送金额
          playerQQ: '', // 玩家QQ
          givebag: 0, // 红包赠送
          playerPhone: '', // 玩家电话
          playerIp: '', // 玩家IP
          orderState: 0, // 订单状态
          props: '' // 下发道具
        }
      },
      userGroup: {
        tableData: [],
        dialog: {
          editflag: true,
          show: false,
          id: '',
          groupName: '',
          oneSet: '',
          list: []
        }
      }
    };
  },
  filters: {
    fstate: function(data) {
      let sta = '';
      switch (data) {
        case 0:
          sta = '待付款';
          break;
        case 1:
          sta = '成功';
          break;
        case 2:
          sta = '待发送';
          break;
      }
      return sta;
    }
  },
  methods: {
    handleClick() {
      if (this.activeName === '0') {
        this.subMerchant.pageIndex = 1;
        this.subMerchant.pageSize = 20;
        this.subMerchant.total = 0;
        this.subMerchant.tableData = [];
        this.rankDraw();
        this.getlist();
      } else if (this.activeName === '2') {
        this.getlist2();
      } else if (this.activeName === '1') {
        this.payDraw();
        this.subMerchantDraw();
        this.getlist1();
        this.orderStatic();
      }
    },
    /* --------------------------------0.下属商户------------------------------- */
    // 下属商户列表
    getlist() {
      this.$api.agent
        .submerchantList({
          PageNumber: this.subMerchant.pageIndex,
          PageSize: this.subMerchant.pageSize
        })
        .then((data) => {
          if (data.status === 204) {
            this.subMerchant.tableData = [];
            this.subMerchant.total = 0;
          } else if (data.status === 200) {
            this.subMerchant.tableData = data.data;
            this.subMerchant.total = JSON.parse(
              data.headers['x-pagination']
            ).TotalCount;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 比率组下拉
    rankDraw() {
      this.$api.agent
        .rankDraw()
        .then((data) => {
          if (data.status === 200) {
            this.subMerchant.rateDraw = data.data;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 添加商户
    addMerchant() {
      if (this.subMerchant.dialog.nickName === '') {
        this.$messageError('请输入昵称！');
        return;
      } else if (this.subMerchant.dialog.name === '') {
        this.$messageError('请输入用户名！');
        return;
      } else if (this.subMerchant.dialog.password === '') {
        this.$messageError('请输入密码！');
        return;
      } else if (this.subMerchant.dialog.mail === '') {
        this.$messageError('请输入邮箱！');
        return;
      } else if (this.subMerchant.dialog.qq === '') {
        this.$messageError('请输入联系qq！');
        return;
      } else if (this.subMerchant.dialog.phone === '') {
        this.$messageError('请输入联系电话！');
        return;
      } else if (this.subMerchant.dialog.rate === '') {
        this.$messageError('请选择比率组！');
        return;
      }
      this.$api.agent
        .addMerchant({
          nickname: this.subMerchant.dialog.nickName,
          loginName: this.subMerchant.dialog.name,
          password: this.subMerchant.dialog.password,
          email: this.subMerchant.dialog.mail,
          qqNumber: this.subMerchant.dialog.qq,
          phoneNumber: this.subMerchant.dialog.phone,
          rankId: this.subMerchant.dialog.rate
        })
        .then((data) => {
          if (data.status === 200) {
            this.$messageSuccess('新增商户成功！');
            this.subMerchant.dialog.show = false;
            this.getlist();
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 添加商户弹框初始化
    subMerchantInit() {
      this.subMerchant.dialog.nickName = ''; // 昵称
      this.subMerchant.dialog.name = ''; // 用户名
      this.subMerchant.dialog.password = ''; // 登录密码
      this.subMerchant.dialog.mail = ''; // 登录密码
      this.subMerchant.dialog.qq = ''; // 联系qq
      this.subMerchant.dialog.phone = ''; // 联系电话
      this.subMerchant.dialog.rate = ''; // 比率组
    },
    // 切换商户状态
    stateChange(id) {
      this.$api.agent
        .stateChange({
          merchantId: id
        })
        .then((data) => {
          if (data.status === 200) {
            this.$messageSuccess('操作成功！');
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 比率组切换
    rateChange(id, val) {
      if (val !== 0) {
        this.$api.agent
          .rankChange({
            merchantId: id,
            rankId: val
          })
          .then((data) => {
            if (data.status === 200) {
              this.$messageSuccess('设置成功！');
              this.getlist();
            }
          })
          .catch((err) => {
            this.$messageError(err.message);
          });
      }
    },
    // 登录
    merchantLogin(id) {
      this.$api.agent
        .agentLogin({
          merchantId: id
        })
        .then((data) => {
          if (data.status === 200) {
            this.$router.push({ path: '/main/home' });
            // this.reload();
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 用户名不能中文
    noChinese() {
      this.subMerchant.dialog.name = this.subMerchant.dialog.name.replace(
        /[\u4E00-\u9FA5]/g,
        ''
      );
    },
    // 删除选中行
    handleClose(id) {
      this.$confirm('删除后数据将无法恢复，是否确定？')
        .then(() => {
          this.delMerchant(id);
        })
        .catch(() => {});
    },
    // 删除商户
    delMerchant(id) {
      this.$api.agent
        .delMerchant({
          merchantId: id
        })
        .then((data) => {
          if (data.status === 200) {
            this.$messageSuccess('删除成功！');
            if (this.subMerchant.tableData.length === 1) {
              this.subMerchant.pageIndex =
                this.subMerchant.pageIndex === 1
                  ? 1
                  : this.subMerchant.pageIndex - 1;
            }
            this.getlist();
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 当每页条数变化时
    handleSizeChange0(data) {
      this.subMerchant.pageSize = data;
      this.subMerchant.pageIndex = 1;
      this.getlist();
    },
    // 当前的页码变化时
    handleCurrentChange0(data) {
      this.subMerchant.pageIndex = data;
      this.getlist();
    },
    /* --------------------------------1.代理订单------------------------------- */
    // 代理订单
    getlist1() {
      this.$api.agent
        .orderList({
          StartTime: this.agentOrder.time ? this.agentOrder.time[0] : '',
          EndTime: this.agentOrder.time ? this.agentOrder.time[1] : '',
          OrderNumber: this.agentOrder.ordernumber,
          PlayerAccount: this.agentOrder.gameaccount,
          ProductId:
            this.agentOrder.paytype === '' ? 0 : this.agentOrder.paytype,
          MerchantId:
            this.agentOrder.submerchant === ''
              ? 0
              : this.agentOrder.submerchant,
          State:
            this.agentOrder.orderState === '' ? -1 : this.agentOrder.orderState,
          StartAmount: this.agentOrder.minvalue,
          EndAmount: this.agentOrder.maxvalue,
          PageNumber: this.agentOrder.pageIndex,
          PageSize: this.agentOrder.pageSize
        })
        .then((data) => {
          if (data.status === 204) {
            this.agentOrder.tableData = [];
            this.agentOrder.total = 0;
          } else if (data.status === 200) {
            this.agentOrder.tableData = data.data;
            this.agentOrder.total = JSON.parse(
              data.headers['x-pagination']
            ).TotalCount;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 支付方式下拉
    payDraw() {
      this.$api.agent
        .paydraw()
        .then((data) => {
          if (data.status === 200) {
            this.agentOrder.payDraw = data.data;
          } else if (data.status === 204) {
            this.agentOrder.payDraw = [];
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 下属商户
    subMerchantDraw() {
      this.$api.agent
        .subMerchantdraw()
        .then((data) => {
          if (data.status === 200) {
            this.agentOrder.submerchantDraw = data.data;
          } else if (data.status === 204) {
            this.agentOrder.submerchantDraw = [];
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 今天日期
    todayTime() {
      this.agentOrder.time = [
        this.getCerentTime(true),
        this.getCerentTime(false)
      ];
      this.getlist1();
      this.orderStatic();
    },
    // 上一天日期
    yesterdayTime() {
      this.agentOrder.time = this.getYesterday(
        this.agentOrder.time ? this.agentOrder.time[0].split(' ')[0] : null
      );
      this.getlist1();
      this.orderStatic();
    },
    // 下一天日期
    tomorrowTime() {
      this.agentOrder.time = this.getTomorrow(
        this.agentOrder.time ? this.agentOrder.time[0].split(' ')[0] : null
      );
      this.getlist1();
      this.orderStatic();
    },
    // 订单统计
    orderStatic() {
      this.$api.agent
        .orderStatic({
          StartTime: this.agentOrder.time ? this.agentOrder.time[0] : '',
          EndTime: this.agentOrder.time ? this.agentOrder.time[1] : '',
          OrderNumber: this.agentOrder.ordernumber,
          PlayerAccount: this.agentOrder.gameaccount,
          ProductId:
            this.agentOrder.paytype === '' ? 0 : this.agentOrder.paytype,
          MerchantId:
            this.agentOrder.submerchant === ''
              ? 0
              : this.agentOrder.submerchant,
          State:
            this.agentOrder.orderState === '' ? -1 : this.agentOrder.orderState,
          StartAmount: this.agentOrder.minvalue,
          EndAmount: this.agentOrder.maxvalue,
          PageNumber: this.agentOrder.pageIndex,
          PageSize: this.agentOrder.pageSize
        })
        .then((data) => {
          if (data.status === 200) {
            this.agentOrder.yesterday.payaccount =
              data.data.yesterday.payAmount;
            this.agentOrder.yesterday.profit =
              data.data.yesterday.merchantProfit;
            this.agentOrder.yesterday.agentProfit =
              data.data.yesterday.agentProfit;
            this.agentOrder.yesterday.count = data.data.yesterday.successCount;
            this.agentOrder.today.payaccount = data.data.today.payAmount;
            this.agentOrder.today.profit = data.data.today.merchantProfit;
            this.agentOrder.today.agentProfit = data.data.today.agentProfit;
            this.agentOrder.today.count = data.data.today.successCount;
            this.agentOrder.today.successRate = data.data.successRate;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 订单的详情
    orderDetail(id) {
      this.$api.order
        .orderDetail({
          id: id
        })
        .then((data) => {
          if (data.status === 200) {
            this.agentOrder.dialog.orderNum = data.data.orderNumber; // 订单号
            this.agentOrder.dialog.paytype = data.data.productName; // 支付方式
            this.agentOrder.dialog.playAccount = data.data.playerAccount; // 玩家账号
            this.agentOrder.dialog.gamearea = data.data.partitionName; // 游戏分区
            this.agentOrder.dialog.orderMoney = data.data.amount; // 订单金额
            this.agentOrder.dialog.orderTime = data.data.orderDate; // 下单时间
            this.agentOrder.dialog.payMoney = data.data.payAmount; // 付款金额
            this.agentOrder.dialog.payTime = data.data.payDate; // 付款时间
            this.agentOrder.dialog.giveMoney = data.data.giveAmount; // 赠送金额
            this.agentOrder.dialog.playerQQ = data.data.playerQq; // 玩家QQ
            this.agentOrder.dialog.givebag = data.data.redPacketAmount; // 红包赠送
            this.agentOrder.dialog.playerPhone = data.data.playerPhone; // 玩家电话
            this.agentOrder.dialog.playerIp = data.data.playerIP; // 玩家IP
            this.agentOrder.dialog.orderState = data.data.state; // 订单状态
            this.agentOrder.dialog.props = data.data.remarks; // 下发道具
            this.agentOrder.dialog.show = true;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 详情弹框的初始化
    orderInit() {
      this.agentOrder.dialog.orderNum = ''; // 订单号
      this.agentOrder.dialog.paytype = ''; // 支付方式
      this.agentOrder.dialog.playAccount = ''; // 玩家账号
      this.agentOrder.dialog.gamearea = ''; // 游戏分区
      this.agentOrder.dialog.orderMoney = 0; // 订单金额
      this.agentOrder.dialog.orderTime = ''; // 下单时间
      this.agentOrder.dialog.payMoney = 0; // 付款金额
      this.agentOrder.dialog.payTime = ''; // 付款时间
      this.agentOrder.dialog.giveMoney = 0; // 赠送金额
      this.agentOrder.dialog.playerQQ = ''; // 玩家QQ
      this.agentOrder.dialog.givebag = 0; // 红包赠送
      this.agentOrder.dialog.playerPhone = ''; // 玩家电话
      this.agentOrder.dialog.playerIp = ''; // 玩家IP
      this.agentOrder.dialog.orderState = ''; // 订单状态
      this.agentOrder.dialog.props = ''; // 下发道具
    },
    // 当每页条数变化时
    handleSizeChange1(data) {
      this.subMerchant.pageSize = data;
      this.subMerchant.pageIndex = 1;
    },
    // 当前的页码变化时
    handleCurrentChange1(data) {
      this.subMerchant.pageIndex = data;
    },
    /* --------------------------------2.用户分组------------------------------- */
    // 用户分组列表
    getlist2() {
      this.$api.agent
        .userList()
        .then((data) => {
          if (data.status === 204) {
            this.userGroup.tableData = [];
          } else if (data.status === 200) {
            this.userGroup.tableData = data.data;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 切换默认
    userdeflaut(id, bol) {
      if (!bol) {
        this.$api.agent
          .userDefalut({
            id: id
          })
          .then((data) => {
            if (data.status === 200) {
              this.getlist2();
            }
          })
          .catch((err) => {
            this.$messageError(err.message);
          });
      }
    },
    // 添加分组
    addGroup() {
      this.$api.agent
        .productList()
        .then((data) => {
          if (data.status === 200) {
            this.userGroup.dialog.list = data.data;
            this.userGroup.dialog.show = true;
          } else if (data.status === 204) {
            this.userGroup.dialog.list = [];
            this.userGroup.dialog.show = true;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 添加分组时的一键设置
    oneSetinp() {
      this.userGroup.dialog.list.forEach((item) => {
        item.rate = this.userGroup.dialog.oneSet;
      });
    },
    // 添加时的数据校验
    dataCheck() {
      for (let i = 0; i < this.userGroup.dialog.list.length; i++) {
        if (
          parseFloat(this.userGroup.dialog.list[i].rate) >
          this.userGroup.dialog.list[i].limitRate
        ) {
          let refName = 'userinp' + i;
          this.$nextTick(() => {
            this.$refs[refName][0].focus();
            this.$messageError(
              '数字必须小于' + this.userGroup.dialog.list[i].limitRate
            );
          });
          return true;
        } else if (
          parseFloat(this.userGroup.dialog.list[i].rate) < 0 ||
          this.userGroup.dialog.list[i].rate === ''
        ) {
          let refName = 'userinp' + i;
          this.$nextTick(() => {
            this.$refs[refName][0].focus();
            this.$messageError('数字不能小于0');
          });
          return true;
        }
      }
      return false;
    },
    // 添加分组确认
    addGroupSure() {
      let flag = this.dataCheck();
      if (flag) {
        return;
      }
      this.$api.agent
        .addrank({
          name: this.userGroup.dialog.groupName,
          merchantRankProductItems: this.userGroup.dialog.list
        })
        .then((data) => {
          if (data.status === 200) {
            this.$messageSuccess('添加成功！');
            this.userGroup.dialog.show = false;
            this.getlist2();
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 编辑分组获取数据
    geteditInfo(id) {
      this.$api.agent
        .editInfo({
          Id: id
        })
        .then((data) => {
          if (data.status === 200) {
            this.userGroup.dialog.editflag = false;
            this.userGroup.dialog.id = data.data.id;
            this.userGroup.dialog.groupName = data.data.name;
            this.userGroup.dialog.list = data.data.merchantRankProductItems;
            this.userGroup.dialog.show = true;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 编辑时的更新提交
    editsubmit() {
      let flag = this.dataCheck();
      if (flag) {
        return;
      }
      this.$api.agent
        .eidtrank({
          id: this.userGroup.dialog.id,
          name: this.userGroup.dialog.groupName,
          merchantRankProductItems: this.userGroup.dialog.list
        })
        .then((data) => {
          if (data.status === 200) {
            this.$messageSuccess('编辑成功！');
            this.userGroup.dialog.show = false;
            this.getlist2();
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 弹框的初始化
    dialogInit() {
      this.userGroup.dialog.editflag = true;
      this.userGroup.dialog.id = '';
      this.userGroup.dialog.groupName = '';
      this.userGroup.dialog.oneSet = '';
      this.userGroup.dialog.list = [];
    },
    // 删除选中行
    handleClose1(id) {
      this.$confirm('删除后数据将无法恢复，是否确定？')
        .then(() => {
          this.delRank(id);
        })
        .catch(() => {});
    },
    // 删除用户分组
    delRank(id) {
      this.$api.agent
        .delRank({
          id: id
        })
        .then((data) => {
          if (data.status === 200) {
            this.$messageSuccess('删除成功！');
            this.getlist2();
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    }
  },
  created() {
    this.getlist();
    this.rankDraw();
  }
};
</script>

<style lang="scss" scoped>
.gs_title {
  background: var(--theme-color);
}
.gs_tabbox {
  .tabbox {
    float: none;
  }
}
.opeartbox {
  padding: 15px 20px 5px;
  background: #fff;
  &.titwidth {
    ul {
      li {
        .tit {
          display: inline-block;
          width: 80px;
        }
      }
    }
  }
  ul {
    li {
      float: left;
      margin-right: 15px;
      margin-bottom: 10px;
      .tit {
        font-size: 14px;
        color: #2d2d2d;
        margin-right: 5px;
      }
      .txtbox {
        display: inline-block;
      }
    }
  }
}
.orderForm {
  // margin-top: 10px;
  background: #fff;
  padding-top: 5px;
  padding-bottom: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: #d9edf7;
  color: #999;
}
.font {
  color: #06859a;
  font-size: 15px;
  // font-weight: bold;
}
.weight {
  width: 18%;
  padding-bottom: 5px;
  color: #06859a;
  font-size: 15px;
  // font-weight: bold;
}
@keyframes progress-bar-stripes {
  from {
    background-position: 40px 0;
  }
  to {
    background-position: 0 0;
  }
}
.progressBox {
  height: 16px;
  background: #bbb;
  position: relative;
  .textbox {
    position: absolute;
    top: 0;
    left: 50%;
    height: 16px;
    line-height: 16px;
    color: #fff;
  }
  .progressBar {
    height: 100%;
    width: 0;
    background: #67c23a;
    background-image: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.2) 75%,
      transparent 75%,
      transparent
    );
    background-size: 40px 40px;
    animation: progress-bar-stripes 2s linear infinite;
    transition: all ease-out 0.3s;
  }
}
.roadlist {
  border: 1px solid #ccc;
  width: 753px;
  li {
    float: left;
    width: 250px;
    height: 40px;
    text-align: center;
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    margin-bottom: -1px;
    &:nth-child(3n + 2) {
      border-right: none;
    }
    .tit {
      display: inline-block;
      vertical-align: middle;
      height: 40px;
      line-height: 40px;
      text-align: center;
    }
    .content {
      display: inline-block;
      vertical-align: middle;
      width: 100px;
      height: 32px;
      padding: 4px 9px;
      text-align: center;
    }
  }
}
.stateColor {
  background: red;
  // margin-left: 20px;
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
  &:after {
    content: '';
    position: absolute;
    border: 1px solid red;
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
    border-right-color: red;
  }
}
.checkdetail {
  cursor: pointer;
  &:hover {
    color: #0099ff;
    text-decoration: underline;
  }
}
.dialogOrder {
  padding-bottom: 20px;
  table {
    width: 100%;
    tr {
      td {
        border: 1px solid #ccc;
        text-align: center;
        height: 40px;
        color: #008194;
        &.tit {
          background: #edfdff;
          color: #6f6f6f;
          font-weight: bold;
          width: 100px;
        }
      }
    }
  }
}
</style>
