<!--
 * @Description: 结算记录
 * @Author: xu wei
 * @Date: 2020-03-05 14:42:45
 * @LastEditTime: 2020-09-01 16:29:14
 * @LastEditors: gao shuai
 -->
<template>
  <div class="home" :class="{ 'settlement-record-page': $root.uiMode === 'modern' }">
    <div class="person_tit">结算记录</div>
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
        <li v-if="$root.uiMode === 'modern'">
          <span class='tit'>提现金额：</span>
          <span class="txtbox">
            <el-input style="width:120px;" size="small" type="number" v-model="ontherecharge" placeholder="最低金额"></el-input>
            <span class="amount-separator">至</span>
            <el-input style="width:120px;" size="small" type="number" v-model="undertherecharge" placeholder="最高金额"></el-input>
          </span>
        </li>
        <component :is="$root.uiMode === 'modern' ? 'li' : 'span'"
          :class="$root.uiMode === 'modern' ? 'settlement-query-actions' : 'mgl10'">
          <el-button size="small" type="primary" @click="getlist">查询</el-button>
        </component>
      </ul>
    </div>
    <div class="tablebox pdb15">
      <div class="gs_tablebox">
        <el-table ref="moduleTable" size="mini" :data="tableData" border style="width: 100%" stripe>
          <el-table-column prop="date" label="结算时间">
          </el-table-column>
          <el-table-column prop="bankNumber" label="收款帐号">
          </el-table-column>
          <el-table-column prop="bankName" label="结算银行">
          </el-table-column>
          <el-table-column label="提现金额">
            <template slot-scope="scope">
              <span>{{scope.row.totalAmount.toFixed(2)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="手续费">
            <template slot-scope="scope">
              <span>{{scope.row.totalCost.toFixed(2)}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="mgt15 pdl20">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background :page-sizes="[10, 20, 30, 40]" :current-page="pageIndex" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time1: '', // 起始时间
      time2: '', // 起始时间
      ontherecharge: '', // 提现金额下限
      undertherecharge: '', // 提现金额上限
      pageIndex: 1, // 页码
      pageSize: 20, // 每页的条数
      total: 0, // 总数据的条数
      tableData: [],
      pickerOptions0: {
        disabledDate(time) {
          let datatime = new Date();
          let h = datatime.getHours();
          let m = datatime.getMinutes();
          let s = datatime.getSeconds();
          let curDate = datatime.getTime();
          let three = 90 * 24 * 3600 * 1000;
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
    // 获取列表
    getlist() {
      this.$api.personCenter
        .settleRecrod({
          StartTime: this.time1 ? this.time1 : '',
          EndTime: this.time2 ? this.time2 : '',
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
  padding: 5px 20px 5px;
  background: #fff;
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
.person_tit {
  color: #3c8dbc;
  padding: 10px 0px;
  font-weight: bold;
  font-size: 15px;
  background: #fff;
  padding-left: 20px;
}
</style>
