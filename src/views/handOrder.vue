<!--
 * @Description: 手动补发
 * @Author: xu wei
 * @Date: 2020-03-06 13:16:10
 * @LastEditTime: 2020-06-15 17:14:27
 * @LastEditors: gao shuai
 -->
<template>
  <div class="home hand-order-page">
    <div class="gs_title" style="color: white;">手动补发</div>
    <div class="opeartbox">
      <ul class="clearfix" style="padding-right:200px;">
        <li>
          <span class='tit'>游戏分区：</span>
          <span class="txtbox">
            <el-select style="width:170px;" v-model="gameDivisionpage" size="small" placeholder="请选择">
              <el-option v-for="(item,i) in gameDivisiondrow" :key="'gameDivision'+i" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </span>
        </li>
        <li>
          <span class='tit'>充值方式：</span>
          <span class="txtbox">
            <el-select style="width:190px;" v-model="rechargemodepage" size="small" placeholder="请选择">
              <el-option v-for="(item,i) in rechargemodedrow" :key="'rechargemode'+i" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </span>
        </li>
        <li>
          <span class='tit'>游戏账号：</span>
          <span class="txtbox">
            <el-input style="width: 180px;" size="small" v-model="gameaccount" placeholder="请输入游戏账号"></el-input>
          </span>
        </li>
        <li>
          <span class='tit'>充值金额：</span>
          <span class="txtbox">
            <el-input style="width: 170px;" size="small" type="number" v-model="amountofrecharge" placeholder="充值金额"></el-input>
          </span>
        </li>
        <li>
          <span class='tit'>额外补发：</span>
          <span class="txtbox">
            <el-input style="width: 100px;" size="small" v-model="extra"></el-input> %
          </span>
        </li>
        <li>
          <span class="txtbox">
            <el-checkbox v-model="isGiveAmount" name="type">包含赠送金额</el-checkbox>
            <el-checkbox v-model="isRedPacketAmount" name="type">包含红包赠送</el-checkbox>
            <el-button class="mgl25" size="small" type="primary" @click="handleOrder">确定</el-button>
          </span>
        </li>
      </ul>
    </div>
    <div class="gs_tabbox clearfix mgt15">
      <div class="tabbox" style="float:none;">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="补发任务" name="0">
            <div class="tablebox pdb15 pdt20">
              <div class="gs_tablebox">
                <el-table ref="moduleTable" size="mini" :data="orderlist1.tableData" border style="width: 100%" stripe>
                  <el-table-column prop="date" label="补发时间">
                    <template slot-scope="scope">
                      <p style="height:18px;">{{scope.row.reissueDate.split(' ')[0]}}</p>
                      <p style="height:18px;color:#999;">{{scope.row.reissueDate.split(' ')[1]}}</p>
                    </template>
                  </el-table-column>
                  <el-table-column prop="serialNumber" label="业务流水" width="190">
                  </el-table-column>
                  <el-table-column prop="partitionsName" label="所属分区">
                  </el-table-column>
                  <el-table-column prop="playerAccount" label="玩家账号">
                  </el-table-column>
                  <el-table-column prop="productName" label="付款方式">
                  </el-table-column>
                  <el-table-column prop="amount" label="补发金额">
                  </el-table-column>
                  <el-table-column prop="name" label="补发方式">
                    <template slot-scope="scope">
                      <span>{{scope.row.type?'手动补发':'整区补发'}}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="mgt15 pdl20">
                <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1" background :page-sizes="[10, 20, 30, 40]" :current-page="orderlist1.pageIndex" :page-size="orderlist1.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="orderlist1.total">
                </el-pagination>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="定时任务" name="1">
            <div class="tablebox pdb15 pdt20">
              <div class="gs_tablebox">
                <el-table ref="moduleTable" size="mini" :data="orderlist2.tableData" border style="width: 100%" stripe>
                  <el-table-column prop="date" label="创建时间">
                    <template slot-scope="scope">
                      <p style="height:18px;">{{scope.row.createDate.split(' ')[0]}}</p>
                      <p style="height:18px;color:#999;">{{scope.row.createDate.split(' ')[1]}}</p>
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" label="任务名称">
                  </el-table-column>
                  <el-table-column prop="description" label="任务描述">
                  </el-table-column>
                  <el-table-column prop="state" label="状态">
                    <template slot-scope="scope">
                      <span>{{scope.row.state===0?'未完成':'已完成'}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" label="操作" width="80">
                    <template slot-scope="scope">
                      <el-button size="mini" type="danger" @click="handleClose(scope.row.id)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="mgt15 pdl20">
                <el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2" background :page-sizes="[10, 20, 30, 40]" :current-page="orderlist2.pageIndex" :page-size="orderlist2.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="orderlist2.total">
                </el-pagination>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: '0',
      gameDivisiondrow: [], // 游戏分区下拉
      gameDivisionpage: '', // 游戏分区
      rechargemodepage: '', // 充值方式
      rechargemodedrow: [], // 充值方式下拉
      gameaccount: '', // 游戏账号
      amountofrecharge: '', // 充值金额
      extra: '', // 额外补发
      isGiveAmount: false, // 不含赠送金额
      isRedPacketAmount: false, // 包含红包赠送
      orderlist1: {
        pageIndex: 1, // 页码
        pageSize: 20, // 每页的条数
        total: 0, // 总数据的条数
        tableData: []
      },
      orderlist2: {
        pageIndex: 1, // 页码
        pageSize: 20, // 每页的条数
        total: 0, // 总数据的条数
        tableData: []
      }
    };
  },
  methods: {
    // tab切换
    handleClick() {
      if (this.activeName === '0') {
        this.getlist();
      } else {
        this.getlist1();
      }
    },
    // 游戏分区下拉
    gameareaDrow() {
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
    // 充值方式下拉
    gamepayDrow() {
      this.$api.reorder
        .payDrow()
        .then((data) => {
          if (data.status === 200) {
            this.rechargemodedrow = data.data;
          } else if (data.status === 204) {
            this.rechargemodedrow = [];
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 手动补单
    handleOrder() {
      if (this.gameDivisionpage === '') {
        this.$messageError('请选择游戏分区！');
        return;
      } else if (this.rechargemodepage === '') {
        this.$messageError('请选择充值方式！');
        return;
      } else if (this.gameaccount === '') {
        this.$messageError('请输入游戏帐号！');
        return;
      } else if (this.amountofrecharge === '') {
        this.$messageError('请输入充值金额！');
        return;
      }
      this.$api.reorder
        .handOrder({
          partitionId: this.gameDivisionpage,
          productId: this.rechargemodepage,
          playerAccount: this.gameaccount,
          payAmount: parseFloat(this.amountofrecharge),
          isGiveAmount: this.isGiveAmount,
          isRedPacketAmount: this.isRedPacketAmount
        })
        .then((data) => {
          if (data.status === 200) {
            this.gameDivisionpage = '';
            this.rechargemodepage = '';
            this.gameaccount = '';
            this.amountofrecharge = '';
            this.isGiveAmount = false;
            this.isRedPacketAmount = false;
            this.$messageSuccess('补发成功！');
            this.getlist();
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 补发任务list
    getlist() {
      this.$api.reorder
        .orderList1({
          PageNumber: this.orderlist1.pageIndex,
          PageSize: this.orderlist1.pageSize
        })
        .then((data) => {
          if (data.status === 204) {
            this.orderlist1.tableData = [];
            this.orderlist1.total = 0;
          } else if (data.status === 200) {
            this.orderlist1.tableData = data.data;
            this.orderlist1.total = JSON.parse(
              data.headers['x-pagination']
            ).TotalCount;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 定时任务list
    getlist1() {
      this.$api.reorder
        .orderList2({
          PageNumber: this.orderlist2.pageIndex,
          PageSize: this.orderlist2.pageSize
        })
        .then((data) => {
          if (data.status === 204) {
            this.orderlist2.tableData = [];
            this.orderlist2.total = 0;
          } else if (data.status === 200) {
            this.orderlist2.tableData = data.data;
            this.orderlist2.total = JSON.parse(
              data.headers['x-pagination']
            ).TotalCount;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 补发任务当每页条数变化时
    handleSizeChange1(data) {
      this.orderlist1.pageSize = data;
      this.orderlist1.pageIndex = 1;
      this.getlist();
    },
    // 补发任务当前的页码变化时
    handleCurrentChange1(data) {
      this.orderlist1.pageIndex = data;
      this.getlist();
    },
    // 删除选中行
    handleClose(id) {
      this.$confirm('删除后数据将无法恢复，是否确定?')
        .then(() => {
          this.delTask(id);
        })
        .catch(() => {});
    },
    // 删除请求
    delTask(id) {
      this.$api.reorder
        .delTask({
          id: id
        })
        .then((data) => {
          if (data.status === 200) {
            this.$messageSuccess('删除成功！');
            if (this.orderlist2.tableData.length === 1) {
              this.orderlist2.pageIndex =
                this.orderlist2.pageIndex === 1
                  ? 1
                  : this.orderlist2.pageIndex - 1;
            }
            this.getlist1();
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 定时任务当每页条数变化时
    handleSizeChange2(data) {
      this.orderlist2.pageSize = data;
      this.orderlist2.pageIndex = 1;
      this.getlist1();
    },
    // 定时任务当前的页码变化时
    handleCurrentChange2(data) {
      this.orderlist2.pageIndex = data;
      this.getlist1();
    }
  },
  created() {
    this.gameareaDrow();
    this.gamepayDrow();
    this.getlist();
    if (this.$route.query.id) {
      this.gameDivisionpage = this.$route.query.id;
      this.gamearea = this.$route.query.id;
    }
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
        color: #fff;
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
