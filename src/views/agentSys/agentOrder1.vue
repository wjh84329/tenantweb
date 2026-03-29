<!--
 * @Description: 代理订单
 * @Author: gao shuai
 * @Date: 2020-05-18 09:46:49
 * @LastEditTime: 2020-09-01 14:47:16
 * @LastEditors: gao shuai
-->

<template>
  <div class="home">
    <div class="gs_title" style="color: white;">代理订单</div>
    <div class="gs_tabbox clearfix mgt15">
      <div class="tabbox">
        <div class="opeartbox">
          <ul class="clearfix">
            <li>
              <span class='tit'>起始时间：</span>
              <!-- <el-date-picker style="width:338px;" v-model="agentOrder.time" size="small" type="datetimerange" :default-time="['00:00:00', '23:59:59']" value-format="yyyy-MM-dd HH:mm:ss" range-separator="至" start-placeholder="起始时间" end-placeholder="结束时间"></el-date-picker> -->
              <el-date-picker style="width:190px;" v-model="agentOrder.time1" size="small" type="datetime"
                value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期">
              </el-date-picker> <span style="font-size:14px;">至 </span>
              <el-date-picker style="width:190px;" v-model="agentOrder.time2" size="small" default-time="23:59:59"
                type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期">
              </el-date-picker>
            </li>
            <li>
              <span class='tit'>订单编号：</span>
              <span class="txtbox" style="width:141px;">
                <el-input size="small" v-model="agentOrder.ordernumber" placeholder="请输入订单编号"></el-input>
              </span>
            </li>
            <li style="margin-right:0;">
              <span class='tit'>游戏账号：</span>
              <span class="txtbox" style="width:140px;">
                <el-input size="small" v-model="agentOrder.gameaccount" placeholder="请输入游戏账号"></el-input>
              </span>
            </li>
            <li>
              <span class='tit'>订单金额：</span>
              <span class="txtbox" style="width: 190px;">
                <el-input style="width:83px;" size="small" type="number" v-model="agentOrder.minvalue"
                  placeholder="0"></el-input> --
                <el-input style="width:83px;" size="small" type="number" v-model="agentOrder.maxvalue"
                  placeholder="999"></el-input>
              </span>
            </li>
            <li>
              <span class='tit'>支付方式：</span>
              <span class="txtbox" style="width: 130px;">
                <el-select v-model="agentOrder.paytype" clearable size="small" placeholder="请选择">
                  <el-option v-for="(item, i) in agentOrder.payDraw" :key="'modeofpayment' + i" :label="item.name"
                    :value="item.id"></el-option>
                </el-select>
              </span>
            </li>
            <li>
              <span class='tit'>下属商户：</span>
              <span class="txtbox" style="width: 140px;">
                <el-select v-model="agentOrder.submerchant" size="small" clearable placeholder="请选择">
                  <el-option v-for="(item, i) in agentOrder.submerchantDraw" :key="'gameGroup' + i" :label="item.userName"
                    :value="item.merchantId"></el-option>
                </el-select>
              </span>
            </li>
            <li style="margin-right:0;">
              <span class='tit'>订单状态：</span>
              <span class="txtbox" style="width: 140px;">
                <el-select v-model="agentOrder.orderState" size="small" clearable placeholder="请选择">
                  <el-option v-for="(item, i) in agentOrder.orderStateDraw" :key="'gameGroup' + i" :label="item.text"
                    :value="item.value"></el-option>
                </el-select>
              </span>
            </li>
          </ul>
          <div class="btnBox">
            <div>
              <el-button size="small" type="success" @click="yesterdayTime">上一天</el-button>
              <el-button size="small" type="primary" @click="todayTime">今天</el-button>
            </div>
            <div class="mgt10">
              <el-button size="small" type="success" @click="tomorrowTime">下一天</el-button>
              <el-button size="small" type="primary"
                @click="() => { agentOrder.pageIndex = 1; getlist(); orderStatic() }">查询</el-button>
            </div>
          </div>
        </div>
        <div style="padding: 30px 20px;border: 1px solid #facd89;margin: 10px 20px;">
          <ul style="display: flex;justify-content: space-around;text-align: center;">
            <li>
              <p class="tit" style="margin-bottom: 15px;">昨日充值金额</p>
              <p class="num" style="color: #00b066;">{{ agentOrder.yesterday.payaccount.toFixed(2) }}</p>
            </li>
            <li>
              <p class="tit" style="margin-bottom: 15px;">充值总金额</p>
              <p class="num" style="color: #FF5722;">{{ agentOrder.today.payaccount.toFixed(2) }}</p>
            </li>
            <li>
              <p class="tit" style="margin-bottom: 15px;">昨日商户总利润</p>
              <p class="num" style="color: goldenrod;">{{ agentOrder.yesterday.profit.toFixed(2) }}</p>
            </li>
            <li>
              <p class="tit" style="margin-bottom: 15px;">充值总利润</p>
              <p class="num" style="color: #00b066;">{{ agentOrder.today.profit.toFixed(2) }}</p>
            </li>
            <li>
              <p class="tit" style="margin-bottom: 15px;">昨日代理利润</p>
              <p class="num" style="color: #FF5722;">{{ agentOrder.yesterday.agentProfit.toFixed(2) }}</p>
            </li>
            <li>
              <p class="tit" style="margin-bottom: 15px;">代理总利润</p>
              <p class="num" style="color: goldenrod;">{{ agentOrder.today.agentProfit.toFixed(2) }}</p>
            </li>
            <li>
              <p class="tit" style="margin-bottom: 15px;">昨日成功笔数</p>
              <p class="num" style="color: #FF5722;">{{ agentOrder.yesterday.count }}</p>
            </li>
            <li>
              <p class="tit" style="margin-bottom: 15px;">总成功笔数</p>
              <p class="num" style="color: goldenrod;">{{ agentOrder.today.count }}</p>
            </li>
          </ul>
        </div>
        <!-- <div class="orderForm">
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
        </div> -->
        <!-- <div class="progressBox">
              <span class="textbox">{{(agentOrder.today.successRate*100).toFixed(2)}} %</span>
              <div class="progressBar" :style="{'width':(agentOrder.today.successRate*100).toFixed(2)+'%'}"></div>
            </div> -->
        <div class="tablebox pdb15">
          <div class="gs_tablebox">
            <el-table ref="moduleTable" size="mini" :data="agentOrder.tableData" border style="width: 100%" stripe>
              <el-table-column prop="orderDate" label="创建时间">
                <template slot-scope="scope">
                  <p style="height:18px;">{{ scope.row.orderDate ? scope.row.orderDate.split(' ')[0] : '' }}</p>
                  <p style="height:18px;color:#999;">{{ scope.row.orderDate ? scope.row.orderDate.split(' ')[1] : '' }}</p>
                </template>
              </el-table-column>
              <el-table-column label="订单号" width="170">
                <template slot-scope="scope">
                  <el-tooltip class="item" effect="dark" content="点击查看订单详情" placement="bottom">
                    <span class="checkdetail" @click="orderDetail(scope.row.id)">{{ scope.row.orderNumber }}</span>
                  </el-tooltip>
                </template>
              </el-table-column>
              <el-table-column prop="merchantName" label="商户">
              </el-table-column>
              <el-table-column prop="playerAccount" label="充值账号">
              </el-table-column>
              <el-table-column prop="amount" label="订单金额">
                <template slot-scope="scope">
                  <span>{{ scope.row.amount ? scope.row.amount.toFixed(2) : '0.00' }}</span>
                </template>
              </el-table-column>
              <el-table-column label="商户利润">
                <template slot-scope="scope">
                  <span>{{ scope.row.merchantProfit ? scope.row.merchantProfit.toFixed(2) : '0.00' }}</span>
                </template>
              </el-table-column>
              <el-table-column label="代理利润">
                <template slot-scope="scope">
                  <span style="color:#00b066;">{{ scope.row.agentProfit ? scope.row.agentProfit.toFixed(2) : '0.00' }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="partitionName" label="所属分区">
              </el-table-column>
              <el-table-column prop="productName" label="充值方式">
              </el-table-column>
              <el-table-column label="订单状态">
                <template slot-scope="scope">
                  <span class="stateColor" :class="'color' + scope.row.state">{{ scope.row.state | fstate }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="mgt15 pdl20">
            <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1" background
              :page-sizes="[10, 20, 30, 40]" :current-page="agentOrder.pageIndex" :page-size="agentOrder.pageSize"
              layout="total, sizes, prev, pager, next, jumper" :total="agentOrder.total">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <!-- 订单详情弹框 -->
    <el-dialog title="订单详情" :visible.sync="agentOrder.dialog.show" @close="orderInit" custom-class="gs_dialog"
      width="800px">
      <div class="dialogOrder">
        <table>
          <tr>
            <td class="tit">订单号</td>
            <td>{{ agentOrder.dialog.orderNum }}</td>
            <td class="tit">支付方式</td>
            <td>{{ agentOrder.dialog.paytype }}</td>
          </tr>
          <tr>
            <td class="tit">玩家账号</td>
            <td>{{ agentOrder.dialog.playAccount }}</td>
            <td class="tit">游戏分区</td>
            <td>{{ agentOrder.dialog.gamearea }}</td>
          </tr>
          <tr>
            <td class="tit">订单金额</td>
            <td style="color:#FF5722;">{{ agentOrder.dialog.orderMoney.toFixed(2) }}</td>
            <td class="tit">下单时间</td>
            <td>{{ agentOrder.dialog.orderTime }}</td>
          </tr>
          <tr>
            <td class="tit">付款金额</td>
            <td style="color:#00b066;">{{ agentOrder.dialog.payMoney.toFixed(2) }}</td>
            <td class="tit">付款时间</td>
            <td>{{ agentOrder.dialog.payTime }}</td>
          </tr>
          <tr>
            <td class="tit">赠送金额</td>
            <td>{{ agentOrder.dialog.giveMoney.toFixed(2) }}</td>
            <td class="tit">玩家QQ</td>
            <td>{{ agentOrder.dialog.playerQQ }}</td>
          </tr>
          <tr>
            <td class="tit">红包赠送</td>
            <td>{{ agentOrder.dialog.givebag.toFixed(2) }}</td>
            <td class="tit">玩家电话</td>
            <td>{{ agentOrder.dialog.playerPhone }}</td>
          </tr>
          <tr>
            <td class="tit">玩家 IP</td>
            <td>{{ agentOrder.dialog.playerIp }}</td>
            <td class="tit">订单状态</td>
            <td>
              <span v-if="agentOrder.dialog.show" class="stateColor"
                :class="'color' + agentOrder.dialog.orderState">{{ agentOrder.dialog.orderState | fstate }}</span>
            </td>
          </tr>
          <tr>
            <td class="tit">下发道具</td>
            <td colspan="3">{{ agentOrder.dialog.props }}</td>
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
      agentOrder: {
        time1: this.getCerentTime(true),
        time2: this.getCerentTime(false),
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
      }
    };
  },
  filters: {
    fstate: function (data) {
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
    /* --------------------------------1.代理订单------------------------------- */
    // 代理订单
    getlist() {
      this.$api.agent
        .orderList({
          StartTime: this.agentOrder.time1 ? this.agentOrder.time1 : '',
          EndTime: this.agentOrder.time2 ? this.agentOrder.time2 : '',
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
      this.agentOrder.time1 = this.getCerentTime(true);
      this.agentOrder.time2 = this.getCerentTime(false);
      this.getlist();
      this.orderStatic();
    },
    // 上一天日期
    yesterdayTime() {
      this.agentOrder.time2 = this.getYesterday(
        this.agentOrder.time1 ? this.agentOrder.time1 : null
      )[1];
      this.agentOrder.time1 = this.getYesterday(
        this.agentOrder.time1 ? this.agentOrder.time1 : null
      )[0];
      this.getlist();
      this.orderStatic();
    },
    // 下一天日期
    tomorrowTime() {
      this.agentOrder.time2 = this.getTomorrow(
        this.agentOrder.time1 ? this.agentOrder.time1 : null
      )[1];
      this.agentOrder.time1 = this.getTomorrow(
        this.agentOrder.time1 ? this.agentOrder.time1 : null
      )[0];
      this.getlist();
      this.orderStatic();
    },
    // 订单统计
    orderStatic() {
      this.$api.agent
        .orderStatic({
          StartTime: this.agentOrder.time1 ? this.agentOrder.time1 : '',
          EndTime: this.agentOrder.time2 ? this.agentOrder.time2 : '',
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
      this.agentOrder.pageSize = data;
      this.agentOrder.pageIndex = 1;
      this.getlist();
      this.orderStatic();
    },
    // 当前的页码变化时
    handleCurrentChange1(data) {
      this.agentOrder.pageIndex = data;
      this.getlist();
      this.orderStatic();
    }
  },
  created() {
    this.payDraw();
    this.subMerchantDraw();
    this.orderStatic();
    this.getlist();
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
  padding: 15px 150px 5px 20px;
  position: relative;
  background: #fff;

  .btnBox {
    position: absolute;
    right: 10px;
    top: 16px;
  }

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
      margin-right: 9px;
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
    background-image: linear-gradient(45deg,
        rgba(255, 255, 255, 0.2) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.2) 50%,
        rgba(255, 255, 255, 0.2) 75%,
        transparent 75%,
        transparent);
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
