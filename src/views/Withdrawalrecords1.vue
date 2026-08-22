<!--
 * @Description: 提现记录
 * @Author: xu wei
 * @Date: 2020-03-05 14:42:45
 * @LastEditTime: 2020-09-01 15:05:46
 * @LastEditors: gao shuai
 -->
<template>
  <div class="home">
    <div class="gs_title" style="color: white;">{{ $root.uiMode === 'modern' ? '转账记录' : '电子户转账记录' }}</div>
    <div class="opeartbox">
      <ul class="clearfix">
        <li>
          <span class='tit'>起始时间：</span>
          <!-- <el-date-picker :picker-options="pickerOptions0" style="width:338px;" v-model="time" size="small" type="datetimerange" :default-time="['00:00:00', '23:59:59']" value-format="yyyy-MM-dd HH:mm:ss" range-separator="至" start-placeholder="起始时间" end-placeholder="结束时间"></el-date-picker> -->
          <el-date-picker style="width:190px;" :picker-options="pickerOptions0" v-model="time1" size="small" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期">
          </el-date-picker> <span style="font-size:14px;">至 </span>
          <el-date-picker style="width:190px;" :picker-options="pickerOptions0" v-model="time2" size="small" default-time="23:59:59" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期">
          </el-date-picker>
        </li>
        <li>
          <span class='tit'>提现金额：</span>
          <span class="txtbox">
            <el-input style="width:100px;" size="small" type="number" v-model="ontherecharge" placeholder="请输入内容"></el-input> --
            <el-input style="width:100px;" size="small" type="number" v-model="undertherecharge" placeholder="请输入内容"></el-input>
          </span>
        </li>
        <span class="mgl10">
          <el-button size="small" type="primary" @click="()=>{pageIndex=1;getlist()}">查询</el-button>
        </span>
      </ul>
    </div>
    <div class="gs_tabbox clearfix mgt15">
      <div class="tabbox">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="全部" name="0"></el-tab-pane>
          <el-tab-pane label="成功" name="1"></el-tab-pane>
          <el-tab-pane label="付款中" name="2"></el-tab-pane>
          <el-tab-pane label="审核中" name="3"></el-tab-pane>
          <el-tab-pane label="待付款" name="4"></el-tab-pane>
          <el-tab-pane label="审核失败" name="5"></el-tab-pane>
          <el-tab-pane label="拒绝付款" name="6"></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="tablebox pdb15 pdt20">
      <div class="gs_tablebox">
        <el-table ref="moduleTable" size="mini" :data="tableData" border style="width: 100%" stripe>
          <el-table-column prop="date" label="申请时间">
            <template slot-scope="scope">
              <p style="height:20px;">{{scope.row.applyDate.split(' ')[0]}}</p>
              <p style="color:#999;height:20px;">{{scope.row.applyDate.split(' ')[1]}}</p>
            </template>
          </el-table-column>
          <el-table-column label="流水号" width="220">
            <template slot-scope="scope">
              <span style="color:green;cursor:pointer;text-decoration:underline;" @click="orderdetail(scope.row.id)">{{scope.row.serialNumber}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="realName" label="收款人">
          </el-table-column>
          <el-table-column prop="bankNumber" label="结算账号">
          </el-table-column>
          <el-table-column label="提现金额">
            <template slot-scope="scope">
              <span>{{scope.row.amount?scope.row.amount.toFixed(2):'0.00'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="手续费">
            <template slot-scope="scope">
              <span>{{scope.row.cost?scope.row.cost.toFixed(2):'0.00'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="订单状态">
            <template slot-scope="scope">
              <span class="stateColor" :class="'color'+scope.row.state">{{scope.row.state|fstate}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="mgt15 pdl20">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background :page-sizes="[10, 20, 30, 40]" :current-page="pageIndex" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
    <!-- 订单详情的弹框 -->
    <el-dialog title="提现详情" :visible.sync="dialog.show" @close="dialoginit" custom-class="gs_dialog" width="500px">
      <ul class="dialogCont">
        <li>
          <span class="tit">流水号</span>
          <span class="box">{{dialog.ser}}</span>
        </li>
        <li>
          <span class="tit">进度</span>
          <span class="box" v-if="dialog.show">
            <span class="stateColor" :class="'color'+dialog.step">{{dialog.step|fstate}}</span>
          </span>
        </li>
        <li>
          <span class="tit">收款人</span>
          <span class="box">{{dialog.player}}</span>
        </li>
        <li>
          <span class="tit">收款银行</span>
          <span class="box">{{dialog.bank}}</span>
        </li>
        <li>
          <span class="tit">收款账号</span>
          <span class="box">{{dialog.account}}</span>
        </li>
        <li>
          <span class="tit">支出金额</span>
          <span class="box">{{dialog.sendMoney}}</span>
        </li>
        <li>
          <span class="tit">描 述</span>
          <span class="box">{{dialog.remark}}</span>
        </li>
      </ul>
      <p class="pdb20"></p>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: '0',
      // time1: this.getCerentTime(true), // 起始时间
      // time2: this.getCerentTime(false), // 起始时间
      time1: '', // 起始时间
      time2: '', // 结束时间
      ontherecharge: '', // 提现金额上
      undertherecharge: '', // 提现金额下
      pageIndex: 1, // 页码
      pageSize: 20, // 每页的条数
      total: 0, // 总数据的条数
      tableData: [],
      dialog: {
        show: false,
        ser: '', // 流水号
        step: '', // 进度
        player: '', // 收款人
        bank: '', // 收款银行
        account: '', // 收款账号
        sendMoney: '', // 支出金额
        remark: '' // 描 述
      },
      pickerOptions0: {
        disabledDate(time) {
          let datatime = new Date();
          let h = datatime.getHours();
          let m = datatime.getMinutes();
          let s = datatime.getSeconds();
          let curDate = datatime.getTime();
          let three = 30 * 24 * 3600 * 1000;
          let threeMonths = curDate - three;
          return (
            time.getTime() < threeMonths ||
            time.getTime() >
              curDate +
                24 * 3600 * 1000 -
                h * 3600 * 1000 -
                m * 60 * 1000 -
                s * 1000 -
                1000
          );
        }
      }
    };
  },
  filters: {
    fstate: function(data) {
      let sta = '';
      switch (data) {
        case 1:
          sta = '成功';
          break;
        case 2:
          sta = '付款中';
          break;
        case 3:
          sta = '审核中';
          break;
        case 4:
          sta = '待付款';
          break;
        case 5:
          sta = '审核失败';
          break;
        case 6:
          sta = '拒绝付款';
          break;
      }
      return sta;
    }
  },
  methods: {
    // tab的切换
    handleClick() {
      this.pageIndex = 1;
      this.pageSize = 20;
      this.total = 0;
      this.tableData = [];
      this.getlist();
    },
    // 获取列表
    getlist() {
      this.$api.withdraw
        .withdrawList1({
          State: this.activeName,
          StartApplyDate: this.time1 ? this.time1 : '',
          EndApplyDate: this.time2 ? this.time2 : '',
          StartAmount: this.ontherecharge,
          EndAmount: this.undertherecharge,
          PageNumber: this.pageIndex,
          PageSize: this.pageSize
        })
        .then((data) => {
          if (data.status === 204) {
            this.tableData = [];
            this.total = 0;
          } else if (data.status === 200) {
            this.tableData = data.data;
            this.total = JSON.parse(data.headers['x-pagination']).TotalCount;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 提现详情
    orderdetail(id) {
      this.$api.withdraw
        .withdrawDetail({
          Id: id
        })
        .then((data) => {
          if (data.status === 200) {
            this.dialog.ser = data.data.serialNumber; // 流水号
            this.dialog.step = data.data.state; // 进度
            this.dialog.player = data.data.realName; // 收款人
            this.dialog.bank = data.data.bankName; // 收款银行
            this.dialog.account = data.data.bankNumber; // 收款账号
            this.dialog.sendMoney = data.data.amount.toFixed(2); // 支出金额
            this.dialog.remark = data.data.description; // 描 述
            this.dialog.show = true;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 弹框的初始化
    dialoginit() {
      this.dialog.ser = ''; // 流水号
      this.dialog.step = ''; // 进度
      this.dialog.player = ''; // 收款人
      this.dialog.bank = ''; // 收款银行
      this.dialog.account = ''; // 收款账号
      this.dialog.sendMoney = ''; // 支出金额
      this.dialog.remark = ''; // 描 述
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
    }
  },
  created() {
    this.getlist();
  }
};
</script>

<style lang="scss" scoped>
.gs_title {
  background: var(--theme-color);
}
.opeartbox {
  padding: 15px 20px 5px;
  background: #fff;
  ul {
    li {
      float: left;
      margin-right: 15px;
      margin-bottom: 10px;
      .tit {
        font-size: 14px;
        color:#2d2d2d;
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
.stateColor {
  background: red;
  margin-left: 6px;
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
.dialogCont {
  border-bottom: 1px solid #d9edf7;
  border-radius: 4px;
  overflow: hidden;
  li {
    height: 36px;
    border: 1px solid #d9edf7;
    border-bottom: none;
    .tit {
      display: inline-block;
      vertical-align: middle;
      width: 90px;
      padding: 0 15px;
      height: 36px;
      line-height: 36px;
      text-align: right;
      background: #d9edf7;
      color: #008194;
      border-bottom: 1px solid #fff;
    }
    .box {
      display: inline-block;
      vertical-align: middle;
      height: 36px;
      line-height: 36px;
      padding-left: 15px;
      color: #008194;
      border-bottom: 1px solid #d9edf7;
    }
  }
}
</style>
