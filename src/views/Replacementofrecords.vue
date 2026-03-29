<!--
 * @Description: 补发记录
 * @Author: xu wei
 * @Date: 2020-03-05 13:42:46
 * @LastEditTime: 2020-09-10 10:59:05
 * @LastEditors: gao shuai
 -->
<template>
  <div class="home">
    <div class="gs_title" style="color: white;">补发记录</div>
    <div class="opeartbox">
      <ul class="clearfix">
        <li>
          <span class='tit'>起始时间：</span>
          <!-- <el-date-picker style="width:338px;" v-model="time" size="small" type="datetimerange" :default-time="['00:00:00', '23:59:59']" value-format="yyyy-MM-dd HH:mm:ss" range-separator="至" start-placeholder="起始时间" end-placeholder="结束时间"></el-date-picker> -->
          <el-date-picker style="width:220px;" v-model="time1" size="small" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期">
          </el-date-picker> <span style="font-size:14px;">至 </span>
          <el-date-picker style="width:220px;" v-model="time2" size="small" default-time="23:59:59" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期">
          </el-date-picker>
        </li>
        <li>
          <span class='tit'>游戏账号：</span>
          <span class="txtbox">
            <el-input size="small" style="width:185px;" v-model="gameaccount" placeholder="请输入内容"></el-input>
          </span>
        </li>
        <li>
          <span class='tit'>游戏分区：</span>
          <span class="txtbox">
            <el-select style="width:186px;" v-model="gameDivisionpage" clearable size="small" placeholder="请选择">
              <el-option v-for="(item,i) in gameDivisiondrow" :key="'gameDivision'+i" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </span>
        </li>
        <!-- <li>
          <span class='tit'>游戏分区：</span>
          <span class="txtbox">
            <el-input style="width:140px;" size="small" v-model="gameDivision" placeholder="请输入内容"></el-input>
          </span>
          <span class="mgl10">
            <el-button size="small" type="success" @click="yesterday">上一天</el-button>
            <el-button size="small" type="primary" @click="gsToday">今天</el-button>
            <el-button size="small" type="success" @click="Tomorrow">下一天</el-button>
            <el-button size="small" type="primary" @click="()=>{pageIndex=1;getlist()}">查询</el-button>
          </span>
        </li> -->
      </ul>
      <div class="btnBox">
        <div>
          <el-button size="small" type="success" @click="yesterday">上一天</el-button>
          <el-button size="small" type="primary" @click="gsToday">今天</el-button>
        </div>
        <div class="mgt10">
          <el-button size="small" type="success" @click="Tomorrow">下一天</el-button>
          <el-button size="small" type="primary" @click="()=>{pageIndex=1;getlist()}">查询</el-button>
        </div>
      </div>
    </div>
    <div class="gs_tabbox clearfix mgt15">
      <div class="tabbox">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="全部" name="2"></el-tab-pane>
          <el-tab-pane label="手动充值" name="1"></el-tab-pane>
          <el-tab-pane label="整区补发" name="0"></el-tab-pane>
        </el-tabs>
      </div>
      <!-- <div class="btnsbox fr mgt10">
        <el-button size="small" type="danger" @click="clearOrder">清除记录</el-button>
      </div> -->
    </div>
    <div class="tablebox pdb15 pdt20">
      <div class="gs_tablebox">
        <el-table ref="moduleTable" size="mini" :data="tableData" border style="width: 100%" stripe>
          <el-table-column prop="date" label="补发时间">
            <template slot-scope="scope">
              <p style="height:20px;">{{scope.row.reissueDate.split(' ')[0]}}</p>
              <p style="color:#999;height:20px;">{{scope.row.reissueDate.split(' ')[1]}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="serialNumber" label="业务流水" width="200">
          </el-table-column>
          <el-table-column prop="partitionsName" label="所属分区" width="170">
          </el-table-column>
          <el-table-column prop="playerAccount" label="玩家账号">
          </el-table-column>
          <el-table-column prop="productName" label="付款方式">
          </el-table-column>
          <el-table-column label="补发金额">
            <template slot-scope="scope">
              <span style="color:#00b066;">{{scope.row.amount.toFixed(2)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="补发方式" width="80">
            <template slot-scope="scope">
              <span style="color:#00b066;">{{scope.row.type?'手动充值':'整区补发'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="补发IP">
            <template slot-scope="scope">
              <span style="color:#00b066;">{{scope.row.clientIp}}</span>
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
      time1: this.getCerentTime(true), // 起始时间
      time2: this.getCerentTime(false), // 起始时间
      activeName: '2', // tab切换卡
      gameaccount: '', // 游戏账号
      gameDivisionpage: '', // 游戏分区
      gameDivisiondrow: [], // 游戏分区下拉
      // gameDivision: '', // 游戏分区
      pageIndex: 1, // 页码
      pageSize: 20, // 每页的条数
      total: 0, // 总数据的条数
      tableData: []
    };
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
      this.$api.reorder
        .reorderList({
          Type: this.activeName === '2' ? '' : this.activeName,
          StartReissueDate: this.time1 ? this.time1 : null,
          EndReissueDate: this.time2 ? this.time2 : null,
          PlayerAccount: this.gameaccount,
          PartitionId: this.gameDivisionpage === '' ? 0 : this.gameDivisionpage,
          // PartitionName: this.gameDivision,
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
    // 游戏下拉
    gameDrow() {
      this.$api.reorder
        .gamelist()
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
    // 今天日期
    gsToday() {
      this.time1 = this.getCerentTime(true);
      this.time2 = this.getCerentTime(false);
      this.pageIndex = 1;
      this.getlist();
    },
    // 上一天日期
    yesterday() {
      // this.time = this.getYesterday(
      //   this.time ? this.time[0].split(' ')[0] : null
      // );
      this.time2 = this.getYesterday(this.time1 ? this.time1 : null)[1];
      this.time1 = this.getYesterday(this.time1 ? this.time1 : null)[0];
      this.pageIndex = 1;
      this.getlist();
    },
    // 下一天日期
    Tomorrow() {
      // this.time = this.getTomorrow(
      //   this.time ? this.time[0].split(' ')[0] : null
      // );
      this.time2 = this.getTomorrow(this.time1 ? this.time1 : null)[1];
      this.time1 = this.getTomorrow(this.time1 ? this.time1 : null)[0];
      this.pageIndex = 1;
      this.getlist();
    },
    // 清除记录
    clearOrder() {
      this.$api.reorder
        .clearOrder({
          startTime: this.time ? this.time[0] : null,
          endTime: this.time ? this.time[1] : null
        })
        .then((data) => {
          this.$messageSuccess('清除成功！');
          this.getlist();
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
    this.gameDrow();
  }
};
</script>

<style lang="scss" scoped>
.gs_title {
  background: var(--theme-color);
}
.opeartbox {
  padding: 5px 500px 5px 20px;
  background: #fff;
  position: relative;
  .btnBox {
    position: absolute;
    right: 400px;
    top: 5px;
  }
  ul {
    li {
      float: left;
      margin-right: 15px;
      margin-bottom: 10px;
      .tit {
        font-size: 14px;
        color: black;
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
</style>
