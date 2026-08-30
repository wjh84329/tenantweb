<!--
 * @Description: 订单管理
 * @Author: xu wei
 * @Date: 2020-03-07 14:46:04
 * @LastEditTime: 2020-09-10 11:02:12
 * @LastEditors: gao shuai
 -->
<template>
  <div class="home">
    <div class="gs_title" style="color: white;">订单管理</div>
    <div class="opeartbox">
      <ul class="clearfix">
        <li>
          <span class='tit'>起始时间：</span>
          <!-- <el-date-picker style="width:338px;" v-model="time" size="small" type="datetimerange" :default-time="['00:00:00', '23:59:59']" value-format="yyyy-MM-dd HH:mm:ss" range-separator="至" start-placeholder="起始时间" end-placeholder="结束时间"></el-date-picker> -->
          <el-date-picker style="width:190px;" v-model="time1" size="small" type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期">
          </el-date-picker> <span style="font-size:14px;">至 </span>
          <el-date-picker style="width:190px;" v-model="time2" size="small" default-time="23:59:59" type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期">
          </el-date-picker>
        </li>
        <li>
          <span class='tit'>订单编号：</span>
          <span class="txtbox">
            <el-input style="width:140px;" size="small" v-model="ordernumber" placeholder="请输入订单编号"></el-input>
          </span>
        </li>
        <li style="margin-right: 0;">
          <span class='tit'>游戏账号：</span>
          <span class="txtbox">
            <el-input style="width:130px;" size="small" v-model="gameaccount" placeholder="请输入游戏账号"></el-input>
          </span>
        </li>
        <li>
          <span class='tit'>订单金额：</span>
          <span class="txtbox">
            <el-input style="width:83px;" size="small" v-model="Ordervalue" placeholder="0"></el-input> --
            <el-input style="width:83px;" size="small" v-model="Underorders" placeholder="999"></el-input>
          </span>
        </li>
        <li>
          <span class='tit'>游戏分组：</span>
          <span class="txtbox">
            <el-select style="width:122px;" v-model="gameGrouppage" size="small" clearable placeholder="请选择">
              <el-option v-for="(item, i) in gameGroupdrow" :key="'gameGroup' + i" :label="item.name"
                :value="item.id"></el-option>
            </el-select>
          </span>
        </li>
        <!-- <li>
          <span class='tit'>游戏分组：</span>
          <span class="txtbox">
            <el-input size="small" v-model="gameGroup" placeholder="根据游戏分区名模糊查询"></el-input>
          </span>
        </li> -->
        <li>
          <span class='tit'>游戏分区：</span>
          <span class="txtbox">
            <el-select style="width:140px;" v-model="gameDivisionpage" clearable size="small" placeholder="请选择">
              <el-option v-for="(item, i) in gameDivisiondrow" :key="'gameDivision' + i" :label="item.name"
                :value="item.id"></el-option>
            </el-select>
          </span>
        </li>
        <li style="margin-right: 0;">
          <span class='tit'>支付方式：</span>
          <span class="txtbox">
            <el-select style="width:130px;" v-model="modeofpaymentpage" clearable size="small" placeholder="请选择">
              <el-option v-for="(item, i) in modeofpaymentdrow" :key="'modeofpayment' + i" :label="item.name"
                :value="item.id"></el-option>
            </el-select>
          </span>
        </li>
        <li>
          <!-- <span class='tit'>充值状态:</span> -->
          <span class="txtbox">
            <el-select style="width:130px;" size="small" v-model='activeName' placeholder="充值状态"
              @change="handleClick()">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </span>
        </li>
        <li style="margin-left: 1%;display: none;">
          <!-- <span class='tit'>发送状态:</span> -->
          <span class="txtbox">
            <el-select style="width:130px;" size="small" v-model='sendStateVal' placeholder="发送状态">
              <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </span>
        </li>
        <li style="margin-left: 1%;">
          <!-- <span class='tit'>名下代理:</span> -->
          <span class="txtbox">
            <el-select style="width:130px;" clearable size="small" v-model='agentStateVal' placeholder="名下代理">
              <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </span>
        </li>
        <li style="margin-left: 1%;">
          <el-button size="small" type="warning" @click="exportExcel(1)">导出QQ</el-button>
        </li>
        <li style="margin-left: 1%;">
          <el-button size="small" type="warning" @click="exportExcel(2)">导出手机</el-button>
        </li>
        <li style="margin-left: 1%;">
          <el-button size="small" type="warning" @click="exportExcel(3)">导出订单</el-button>
        </li>
        <li style="margin-left: 1%;">
          <el-button size="small" type="info" @click="gotoRanchResults">查询通区订单</el-button>
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
            @click="() => { getlist(); yesterdayCharge(); }">查询</el-button>
        </div>
      </div>
    </div>
    <div style="padding: 30px 20px;border: 1px solid #facd89;margin: 0px 20px;">
      <ul style="display: flex;justify-content: space-around;text-align: center;">
        <li>
          <p class="tit" style="margin-bottom: 15px;">昨日此时充值金额</p>
          <p class="num" style="color: #00b066;">{{ yesterday.payaccount.toFixed(2) }}</p>
        </li>
        <li>
          <p class="tit" style="margin-bottom: 15px;">昨日此时收入</p>
          <p class="num" style="color: #FF5722;">{{ yesterday.profit.toFixed(2) }}</p>
        </li>
        <li>
          <p class="tit" style="margin-bottom: 15px;">昨日此时成功笔数</p>
          <p class="num" style="color: goldenrod;">{{ yesterday.count }}</p>
        </li>
      </ul>
    </div>
    <div class="tablebox pdb15" style="margin-top: 3%;">
      <div class="gs_tablebox">
        <el-table ref="moduleTable" size="mini" :data="tableData" border style="width: 100%" stripe v-loading="loading">
          <el-table-column prop="orderDate" label="下单时间" width="168">
            <template slot-scope="scope">
              <span style="height:18px;">{{ scope.row.orderDate ? scope.row.orderDate.split(' ')[0] : '' }}</span>
              <span style="height:18px;color:#999; margin-left: 5px;"> {{ scope.row.orderDate ?
                scope.row.orderDate.split(' ')[1]:''}}</span>
            </template>
          </el-table-column>
          <el-table-column label="订单号" width="205">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="点击查看订单详情" placement="bottom">
                <span class="checkdetail" @click="orderDetail(scope.row.id)">{{ scope.row.orderNumber }}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="playerAccount" label="充值账号" width="120">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark"
                :content="scope.row.isTongQu ? '通区订单不支持修改充值账号' : '双击修改订单账号'" placement="bottom">
                <span v-if="scope.row.editing && !scope.row.isTongQu">
                  <el-input v-model="scope.row.playerAccount" size="mini" @blur="updatePlayerAccount(scope.row)"
                    @keyup.enter.native="updatePlayerAccount(scope.row)" style="width:120px" autofocus></el-input>
                </span>
                <span v-else @dblclick="enableEdit(scope.row)"
                  :style="{ cursor: scope.row.isTongQu ? 'not-allowed' : 'pointer' }">
                  {{ scope.row.playerAccount }}
                </span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="amount" label="订单金额" width="80">
            <template slot-scope="scope">
              <span style="color:#00b066;">{{ scope.row.amount ? scope.row.amount.toFixed(2) : '0.00' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="收入" width="80">
            <template slot-scope="scope">
              <span style="color:#00b066;">{{ scope.row.profit ? scope.row.profit.toFixed(2) : '0.00' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="productName" label="充值方式">
          </el-table-column>
          <el-table-column prop="partitionsName" label="所属分区" width="200">
          </el-table-column>
          <el-table-column label="订单状态">
            <template slot-scope="scope">
              <el-tooltip v-if="scope.row.state === 2" class="item" effect="dark"
                :content="waitFlag ? '请稍后点击下发' : '点击下发'" placement="bottom">
                <span class="stateColor" style="cursor:pointer;" :class="'color' + scope.row.state"
                  @click="waitSent(scope.row.orderNumber, scope.row.partitionId, scope.$index)"><i
                    :class="{ 'el-icon-loading': waitFlag && waitFlagIndex === scope.$index }"></i>待发送</span>
              </el-tooltip>
              <span v-else class="stateColor" :class="'color' + scope.row.state">{{ scope.row.state | fstate }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="mgt15 pdl20">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
          :page-sizes="[10, 20, 30, 40]" :current-page="pageIndex" :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
    <!-- 订单详情弹框 -->
    <el-dialog title="订单详情" :visible.sync="dialog.show" @close="dialogInit" custom-class="gs_dialog" width="800px">
      <div class="dialogOrder">
        <table>
          <tr>
            <td class="tit">订单号</td>
            <td>{{ dialog.orderNum }}</td>
            <td class="tit">支付方式</td>
            <td>{{ dialog.paytype }}</td>
          </tr>
          <tr>
            <td class="tit">玩家账号</td>
            <td>{{ dialog.playAccount }}</td>
            <td class="tit">游戏分区</td>
            <td>{{ dialog.gamearea }}</td>
          </tr>
          <tr>
            <td class="tit">订单金额</td>
            <td style="color:#FF5722;">{{ dialog.orderMoney.toFixed(2) }}</td>
            <td class="tit">下单时间</td>
            <td>{{ dialog.orderTime }}</td>
          </tr>
          <tr>
            <td class="tit">付款金额</td>
            <td style="color:#00b066;">{{ dialog.payMoney.toFixed(2) }}</td>
            <td class="tit">付款时间</td>
            <td>{{ dialog.payTime }}</td>
          </tr>
          <tr>
            <td class="tit">赠送金额</td>
            <td>{{ dialog.giveMoney.toFixed(2) }}</td>
            <td class="tit">玩家QQ</td>
            <td>{{ dialog.playerQQ }}</td>
          </tr>
          <tr>
            <td class="tit">红包赠送</td>
            <td>{{ dialog.givebag.toFixed(2) }}</td>
            <td class="tit">玩家电话</td>
            <td>{{ dialog.playerPhone }}</td>
          </tr>
          <tr>
            <td class="tit">玩家 IP</td>
            <td>{{ dialog.playerIp }}</td>
            <td class="tit">订单状态</td>
            <td>
              <span v-if="dialog.show" class="stateColor" :class="'color' + dialog.orderState">{{ dialog.orderState |
                fstate
                }}</span>
            </td>
          </tr>
          <tr>
            <td class="tit">下发道具</td>
            <td colspan="3">{{ dialog.props }}</td>
          </tr>
        </table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { set } from 'core-js/core/dict';
// import order from '../api/order';
import { url } from '../assets/js/version';
export default {
  data() {
    return {
      activeName: '1', // 默认显示充值成功
      loading: false,
      settr: null,
      options: [
        {
          value: '-1',
          label: '充值状态'
        },
        {
          value: '1',
          label: '成功'
        }, {
          value: '2',
          label: '待发送'
        }, {
          value: '0',
          label: '待付款'
        },
        // {
        //   value: '5',
        //   label: '等待入账'
        // },
        {
          value: '3',
          label: '退款'
        },
        {
          value: '4',
          label: '失败'
        }],
      activeNameVal: '充值状态',
      sendStateVal: '-1',
      options1: [{
        value: '-1',
        label: '发送状态'
      }, {
        value: '1',
        label: '已发送'
      }, {
        value: '2',
        label: '未发送'
      }, {
        value: '0',
        label: '发送失败'
      }
      ],
      agentStateVal: '1',
      options2: [{
        value: '1',
        label: '名下代理'
      }
      ],
      time1: this.getCerentTime(true), // 起始时间
      time2: this.getCerentTime(false), // 起始时间
      waitFlag: false, // 待发送Flag
      waitFlagIndex: '', // 待发送Index
      ordernumber: '', // 订单编号
      gameaccount: '', // 游戏帐号
      gameGrouppage: '', // 游戏分组
      gameGroupdrow: [], // 游戏分组下拉
      gameGroup: '', // 游戏分组
      gameDivisionpage: '', // 游戏分区
      gameDivisiondrow: [], // 游戏分区下拉
      modeofpaymentpage: '', // 支付方式
      modeofpaymentdrow: [], // 支付方式下拉
      Ordervalue: '', // 订单金额上
      Underorders: '', // 订单金额下
      yesterday: {
        payaccount: 0,
        profit: 0,
        count: 0
      },
      today: {
        payaccount: 0,
        profit: 0,
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
        case 3:
          sta = '退款';
          break;
        case 4:
          sta = '失败';
          break;
        case 5:
          sta = '等待入账';
          break;
      }
      return sta;
    }
  },
  methods: {
    // 导出TXT下拉
    exportExcel(value) {
      if (this.derive === '') {
        this.$messageError('请选择导出格式！');
        return;
      }
      /* eslint-disable */
      let adressUrl =
        url +
        'api/Download/OutputTenantOrderAsync?StartTime=' +
        (this.time1 ? this.time1 : '') +
        '&EndTime=' +
        (this.time2 ? this.time2 : '') +
        '&AmountMin=' +
        (this.Ordervalue === '' ? '' : parseFloat(this.Ordervalue)) +
        '&MerchantId=' +
        (this.$store.state.id === '' ? 0 : this.$store.state.id) +
        '&AmountMax=' +
        (this.Underorders === ''
          ? ''
          : parseFloat(this.Underorders)) +
        '&exportStyleEnum=' +
        value;
      /* eslint-enable */
      // 创建隐藏的可下载链接
      let eleLink = document.createElement('a');
      eleLink.style.display = 'none';
      // 字符内容转变成blob地址
      eleLink.href = adressUrl;
      // 触发点击
      document.body.appendChild(eleLink);
      eleLink.click();
      // 然后移除
      document.body.removeChild(eleLink);
    },
    // tab的切换
    handleClick() {
      this.pageIndex = 1;
      this.pageSize = 20;
      this.total = 0;
      this.tableData = [];
      console.log(this.activeName);
      this.getlist();
    },
    // 订单列表
    getlist() {
      this.$api.order
        .orderlist({
          State: this.activeName,
          StartOrderDate: this.time1 ? this.time1 : '',
          EndOrderDate: this.time2 ? this.time2 : '',
          OrderNumber: this.ordernumber,
          PlayerAccount: this.gameaccount,
          GroupId: this.gameGrouppage === '' ? 0 : this.gameGrouppage,
          PartitionId: this.gameDivisionpage === '' ? 0 : this.gameDivisionpage,
          // PartitionName: this.gameGroup,
          ProductId: this.modeofpaymentpage === '' ? 0 : this.modeofpaymentpage,
          StartAmount: this.Ordervalue,
          EndAmount: this.Underorders,
          PageNumber: this.pageIndex,
          PageSize: this.pageSize
        })
        .then((data) => {
          if (data.status === 204) {
            this.tableData = [];
            this.total = 0;
          } else if (data.status === 200) {
            const rows = data.data || [];
            this.tableData = rows.map((r) => ({
              ...r,
              isTongQu: r.isTongQu === true || r.IsTongQu === true
            }));
            this.total = JSON.parse(data.headers['x-pagination']).TotalCount;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 今天日期
    todayTime() {
      this.time1 = this.getCerentTime(true);
      this.time2 = this.getCerentTime(false);
      this.pageIndex = 1;
      this.getlist();
      this.yesterdayCharge();
    },
    // 上一天日期
    yesterdayTime() {
      this.time2 = this.getYesterday(this.time1 ? this.time1 : null)[1];
      this.time1 = this.getYesterday(this.time1 ? this.time1 : null)[0];
      this.pageIndex = 1;
      this.getlist();
      this.yesterdayCharge();
    },
    // 下一天日期
    tomorrowTime() {
      // this.time = this.getTomorrow(
      //   this.time ? this.time[0].split(' ')[0] : null
      // );
      this.time2 = this.getTomorrow(this.time1 ? this.time1 : null)[1];
      this.time1 = this.getTomorrow(this.time1 ? this.time1 : null)[0];
      this.pageIndex = 1;
      this.getlist();
      this.yesterdayCharge();
    },
    // 昨天充值
    yesterdayCharge() {
      this.$api.order
        .yesterdayCharge({
          State: this.activeName,
          StartOrderDate: this.time1 ? this.time1 : '',
          EndOrderDate: this.time2 ? this.time2 : '',
          OrderNumber: this.ordernumber,
          PlayerAccount: this.gameaccount,
          GroupId: this.gameGrouppage === '' ? 0 : this.gameGrouppage,
          PartitionId: this.gameDivisionpage === '' ? 0 : this.gameDivisionpage,
          PartitionName: this.gameGroup,
          ProductId: this.modeofpaymentpage === '' ? 0 : this.modeofpaymentpage,
          StartAmount: this.Ordervalue,
          EndAmount: this.Underorders,
          PageNumber: this.pageIndex,
          PageSize: this.pageSize
        })
        .then((data) => {
          if (data.status === 200) {
            this.yesterday.payaccount = data.data.payAmount;
            this.yesterday.profit = data.data.profit;
            this.yesterday.count = data.data.successState;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 今天充值
    todayCharge() {
      this.$api.order
        .todayCharge({
          State: this.activeName,
          StartOrderDate: this.time1 ? this.time1 : '',
          EndOrderDate: this.time2 ? this.time2 : '',
          OrderNumber: this.ordernumber,
          PlayerAccount: this.gameaccount,
          GroupId: this.gameGrouppage === '' ? 0 : this.gameGrouppage,
          PartitionId: this.gameDivisionpage === '' ? 0 : this.gameDivisionpage,
          PartitionName: this.gameGroup,
          ProductId: this.modeofpaymentpage === '' ? 0 : this.modeofpaymentpage,
          StartAmount: this.Ordervalue,
          EndAmount: this.Underorders,
          PageNumber: this.pageIndex,
          PageSize: this.pageSize
        })
        .then((data) => {
          if (data.status === 200) {
            this.today.payaccount = data.data.payAmount;
            this.today.profit = data.data.profit;
            this.today.count = data.data.successState;
            this.today.successRate = data.data.successRate;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 游戏分组下拉
    gameteamDrow() {
      this.$api.order
        .gameTeam()
        .then((data) => {
          if (data.status === 200) {
            this.gameGroupdrow = data.data;
          } else if (data.status === 204) {
            this.gameGroupdrow = [];
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 查询按钮
    checkList() {
      this.pageIndex = 1;
      this.getlist();
      this.yesterdayCharge();
    },
    // 游戏分区下拉
    gameareaDrow() {
      this.$api.order
        .gamearea()
        .then((data) => {
          if (data.status === 200) {
            this.gameDivisiondrow = data.data;
          } else if (data.status === 204) {
            this.gameDivisiondrow = [];
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 支付方式下拉
    payDrow() {
      this.$api.order
        .paylist()
        .then((data) => {
          if (data.status === 200) {
            this.modeofpaymentdrow = data.data;
          } else if (data.status === 204) {
            this.modeofpaymentdrow = [];
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 订单详情
    orderDetail(id) {
      this.$api.order
        .orderDetail({
          id: id
        })
        .then((data) => {
          if (data.status === 200) {
            this.dialog.orderNum = data.data.orderNumber; // 订单号
            this.dialog.paytype = data.data.productName; // 支付方式
            this.dialog.playAccount = data.data.playerAccount; // 玩家账号
            this.dialog.gamearea = data.data.partitionName; // 游戏分区
            this.dialog.orderMoney = data.data.amount; // 订单金额
            this.dialog.orderTime = data.data.orderDate; // 下单时间
            this.dialog.payMoney = data.data.payAmount; // 付款金额
            this.dialog.payTime = data.data.payDate; // 付款时间
            this.dialog.giveMoney = data.data.giveAmount; // 赠送金额
            this.dialog.playerQQ = data.data.playerQq; // 玩家QQ
            this.dialog.givebag = data.data.redPacketAmount; // 红包赠送
            this.dialog.playerPhone = data.data.playerPhone; // 玩家电话
            this.dialog.playerIp = data.data.playerIP; // 玩家IP
            this.dialog.orderState = data.data.state; // 订单状态
            this.dialog.props = data.data.remarks; // 下发道具
            this.dialog.show = true;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 双击启用编辑
    enableEdit(row) {
      if (row.isTongQu) {
        this.$message.warning('通区订单不支持修改充值账号');
        return;
      }
      this.$set(row, 'editing', true);
    },
    // 更新游戏账号
    updatePlayerAccount(row) {
      if (row.isTongQu) {
        row.editing = false;
        this.getlist();
        return;
      }
      this.loading = true;
      // 使用 id + playerAccount 作为请求体（如果后端需要 orderNumber，请改为 { orderNumber: row.orderNumber, playerAccount: row.playerAccount }）
      const payload = {
        orderNumber: row.orderNumber,
        playerAccount: row.playerAccount
      };
      this.$api.order
        .updatePlayerAccount(payload)
        .then((data) => {
          if (data.status !== 200) {
            this.$messageError(data.message || '修改失败');
            this.getlist(); // 重新获取列表以还原数据
            this.loading = false;
          } else {
            // 发送定时器,查询修改结果
            this.settr = setTimeout(() => {
              this.checkedOrderAccount(row);
            }, 2000);
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
          this.getlist(); // 重新获取列表以还原数据
          this.loading = false;
        });
    },
    // 查询订单账号修改情况
    checkedOrderAccount(row) {
      this.$api.order
        .checkOrderAccount({
          orderNumber: row.orderNumber
        })
        .then((data) => {
          if (data.status === 200) {
            this.$messageSuccess('修改成功');
            row.editing = false; // 关闭编辑状态
            // 关闭定时器
            this.loading = false;
            this.settr && clearTimeout(this.settr);
            this.settr = null;
          } else {
            this.$messageError(data.message || '修改失败');
            this.getlist(); // 重新获取列表以还原数据
          }
          this.loading = false;
        })
        .catch((err) => {
          this.$messageError(err.message);
          console.log(err.message);
          this.loading = false;
        });
    },
    // 弹框的初始化
    dialogInit() {
      this.dialog.orderNum = ''; // 订单号
      this.dialog.paytype = ''; // 支付方式
      this.dialog.playAccount = ''; // 玩家账号
      this.dialog.gamearea = ''; // 游戏分区
      this.dialog.orderMoney = 0; // 订单金额
      this.dialog.orderTime = ''; // 下单时间
      this.dialog.payMoney = 0; // 付款金额
      this.dialog.payTime = ''; // 付款时间
      this.dialog.giveMoney = 0; // 赠送金额
      this.dialog.playerQQ = ''; // 玩家QQ
      this.dialog.givebag = 0; // 红包赠送
      this.dialog.playerPhone = ''; // 玩家电话
      this.dialog.playerIp = ''; // 玩家IP
      this.dialog.orderState = ''; // 订单状态
      this.dialog.props = ''; // 下发道具
    },
    // 当每页条数变化时
    handleSizeChange(data) {
      this.pageSize = data;
      this.pageIndex = 1;
      this.getlist();
    },
    // 当前的页码变化时
    handleCurrentChange(data) {
      this.pageIndex = data;
      this.getlist();
    },
    // 等待下发接口
    waitSentOrder(orderNum) {
      this.$api.home
        .waitSent({
          orderNumber: orderNum
        })
        .then((data) => {
          if (data.status === 200) {
            setTimeout(() => {
              this.$messageSuccess('下发成功');
              this.getlist();
              this.waitFlag = false;
              this.waitFlagIndex = '';
            }, 1500);
          }
        })
        .catch(() => {
          this.waitFlag = false;
          this.waitFlagIndex = '';
          this.$messageError('下发超时，请检测网关！');
        });
    },
    gotoRanchResults() {
      // 使用命名路由或路径跳转，路由文件中已注册
      this.$router.push({ name: 'ranchResults' });
    },
    // 等待下发
    waitSent(orderNum, id, index) {
      if (!this.waitFlag) {
        this.waitFlag = true;
        this.waitFlagIndex = index;
        // 分区检测
        this.$api.groupmange
          .checkLink({
            partitionId: id
          })
          .then((data) => {
            if (data.status === 200) {
              let keyValue = data.data;
              let indexNum = 0;
              let handletimer = setInterval(() => {
                this.$api.groupmange
                  .timerCheck({
                    checkKey: keyValue
                  })
                  .then((data) => {
                    clearInterval(handletimer);
                    handletimer = null;
                    this.waitSentOrder(orderNum);
                  })
                  .catch(() => {
                    indexNum++;
                    if (indexNum > 6) {
                      clearInterval(handletimer);
                      handletimer = null;
                      this.waitFlag = false;
                      this.waitFlagIndex = '';
                      this.$messageError('分区检测失败！');
                    }
                  });
              }, 500);
            }
          })
          .catch(() => {
            this.waitFlag = false;
            this.waitFlagIndex = '';
            this.$messageError('分区检测失败！');
          });
      }
    }
  },
  created() {
    this.gameteamDrow();
    this.gameareaDrow();
    this.payDrow();
    this.getlist();
    this.yesterdayCharge();
  }
};
</script>

  <style lang="scss" scoped>
  .gs_title {
    background: var(--theme-color);
  }

  .opeartbox {
    padding: 15px 150px 5px 20px;
    background: #fff;
    position: relative;

    .btnBox {
      position: absolute;
      right: 10px;
      top: 16px;
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

  .tablebox {
    background: #fff;
  }

  .orderForm {
    margin-top: 10px;
    background: #fff;
    padding-top: 5px;
    padding-bottom: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    background-color: #d9edf7;
    color: #999;

    table {
      td {
        padding: 2px 10px 2px 20px;
      }
    }
  }

  .font {
    color: #06859a;
    // font-weight: bold;
  }

  .weight {
    width: 20%;
    padding-bottom: 5px;
    color: #06859a;
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

  .checkdetail {
    cursor: pointer;

    &:hover {
      color: #0099ff;
      text-decoration: underline;
    }
  }

  .stateColor {
    background: #409eff;
    // margin-left: 20px;
    color: #fff;
    display: inline-block;
    padding-left: 5px;
    position: relative;
    height: 22px;
    line-height: 22px;

    &.color0 {
      background: #f56c6c;

      &:after {
        border-color: #f56c6c;
      }

      &:before {
        border-right-color: #f56c6c;
      }
    }

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
