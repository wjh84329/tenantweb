<template>
  <div class="wrap-box">
    <div class="gs_title" style="color: white;">待审核订单</div>
    <div class="wrap-box-c">
      <div class="fieldset">
        <el-divider content-position="left"
          ><span class="legend">汇总</span></el-divider
        >
        <div class="mgt15 mgb15 mgl15 mgr15">
          <div class="baseinfo">
            <div class="item">
              <div class="title">账户余额</div>
              <div class="num">{{ result.overMoney }}</div>
            </div>
            <div class="item">
              <div class="title">待审核笔数</div>
              <div class="num">{{ result.auditingOrderNumber }}</div>
            </div>
            <div class="item">
              <div class="title">今日转出笔数</div>
              <div class="num">{{ result.todayTransOutOrderNumber }}</div>
            </div>
            <div class="item">
              <div class="title">今日转出总额</div>
              <div class="num">{{ result.todayWithdrawalTotalAmount }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="fieldset">
        <el-divider content-position="left"
          ><span class="legend">待审核订单</span></el-divider
        >
        <div class="mgt15 mgb15 mgl15 mgr15">
          <el-table
            ref="singleTable"
            :data="tableData"
            highlight-current-row
            border
            :header-cell-style="{ background: '#F2F2F2', color: '#606266' }"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55" align="center">
            </el-table-column>
            <el-table-column
              property="partitionName"
              label="分区名称"
              align="center"
              width="120"
            >
            </el-table-column>
            <el-table-column
              property="playerRoleName"
              label="角色名称"
              align="center"
              width="100"
            >
            </el-table-column>
            <el-table-column
              property="applyAmount"
              label="金额"
              align="center"
              width="100"
            >
            </el-table-column>
            <el-table-column
              property="auditReason"
              label="原因"
              align="center"
              width="100"
            >
            </el-table-column>
            <el-table-column
              property="beneficiaryAccountNumber"
              label="收款账号"
              align="center"
              width="120"
            >
            </el-table-column>
            <el-table-column
              property="beneficiaryAccountName"
              label="收款姓名"
              align="center"
              width="100"
            >
            </el-table-column>
            <el-table-column
              property="contact"
              label="联系方式"
              align="center"
              width="120"
            >
            </el-table-column>
            <el-table-column
              property="createTime"
              label="申请时间"
              align="center"
              width="160"
            >
            </el-table-column>
            <el-table-column property="remarks" label="备注" align="center">
            </el-table-column>
          </el-table>
          <div class="table-tool">
            <div class="item">
              <el-button-group class="behalf-action-group">
                <el-button
                  type="danger"
                  size="mini"
                  :disabled="!isdisabled"
                  @click="del"
                  >批量删除
                </el-button>
                <el-button
                  type="success"
                  size="mini"
                  :disabled="!isdisabled"
                  @click="shenhe"
                  >审核成功
                </el-button>
                <!-- <el-button type="primary" size="mini" :disabled="!isdisabled">秒提选中行</el-button> -->
              </el-button-group>
            </div>
            <div class="item">
              批量添加到
            </div>
            <div class="item">
              <el-button-group class="behalf-action-group">
                <el-button
                  type="warning"
                  size="mini"
                  :disabled="!isdisabled"
                  @click="black(1)"
                  >支付宝黑名单
                </el-button>
                <el-button
                  type="primary"
                  size="mini"
                  :disabled="!isdisabled"
                  @click="black(2)"
                  >角色黑名单
                </el-button>
                <el-button
                  type="danger"
                  size="mini"
                  :disabled="!isdisabled"
                  @click="black(3)"
                  >永久黑名单
                </el-button>
              </el-button-group>
            </div>
          </div>
        </div>
        <div class="mgt15 mgb15 mgl15 mgr15" style="text-align: center;">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="form.total"
            :current-page="form.PageNumber"
            :page-size="form.PageSize"
            @current-change="changePage"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mgr from '../../assets/js/securityapi';
import api from '../../assets/js/apiRequestHandler';
export default {
  data() {
    return {
      dialogConfig: false,
      tableData: [],
      form: {
        Id: '',
        ApplicationUserId: 0,
        BeneficiaryAccountNumber: '',
        BeneficiaryAccountName: '',
        PlayerRoleName: '',
        PageNumber: 1,
        PageSize: 10,
        total: 0
      },
      selection: [],
      result: {}
    };
  },
  computed: {
    isdisabled() {
      return this.selection.length;
    },
    ids() {
      let arr = [];
      for (let i in this.selection) {
        arr.push(this.selection[i].id);
      }
      return arr;
    }
  },
  created() {
    this.getLists();
    this.getBaseinfo();
  },
  methods: {
    async getBaseinfo() {
      let header = await mgr();
      api
        .get('/api/TenantPaid/GetAccountOverview', {
          headers: {
            Authorization: 'Bearer ' + header
          },
          params: {}
        })
        .then(res => {
          this.result = res.data;
        });
    },
    async getLists() {
      let header = await mgr();
      this.form.ApplicationUserId = this.$store.state.id;
      for (let i in this.form) {
        if (this.form[i] === '') {
          delete this.form[i];
        }
      }
      api
        .get('/api/TenantPaid/WaitToAudiOrderList', {
          headers: {
            Authorization: 'Bearer ' + header
          },
          params: this.form
        })
        .then(res => {
          if (res.status === 200) {
            this.form.total = JSON.parse(
              res.headers['x-pagination']
            ).TotalCount;
            this.tableData = res.data;
          }
        })
        .catch(err => {
          this.$messageError(err.message);
        });
    },
    changePage(page) {
      console.log(page);
      this.form.PageNumber = page;
      this.getLists();
    },
    handleSelectionChange(val) {
      console.log(val);
      this.selection = val;
    },
    del() {
      let params = {
        id: 0,
        orderList: this.ids,
        orderState: 3
      };
      this.setState(params);
    },
    shenhe() {
      let params = {
        id: 0,
        orderList: this.ids,
        orderState: 1
      };
      this.setState(params);
    },
    async black(type) {
      let header = await mgr();
      let params = {
        id: 0,
        paidOrderList: this.ids,
        blacklistType: type
      };
      api
        .post('/api/TenantPaid/BatchAddBlacklist', params, {
          headers: {
            Authorization: 'Bearer ' + header
          }
        })
        .then(res => {
          if (res.status === 200) {
            this.$messageSuccess(res.data);
            this.getLists();
          }
        })
        .catch(err => {
          this.$messageError(err.message);
        });
    },
    async setState(params) {
      let header = await mgr();
      api
        .post('/api/TenantPaid/OperatePaidOrder', params, {
          headers: {
            Authorization: 'Bearer ' + header
          }
        })
        .then(res => {
          if (res.status === 200) {
            this.$messageSuccess(res.data);
            this.getLists();
          }
        })
        .catch(err => {
          this.$messageError(err.message);
        });
    }
  }
};
</script>

<style scoped>
.gs_title {
  background: var(--theme-color);
}
.baseinfo {
  display: flex;
  justify-content: space-around;
  padding: 0 0;
}

.baseinfo .item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 16px;
}

.baseinfo .item .num {
  margin: 8px 0;
  color: #ff0000;
}

.table-tool {
  display: flex;
  align-items: center;
  font-size: 14px;
  margin: 15px 0;
}

.table-tool .item {
  margin-right: 15px;
}
.wrap-box {
  min-height: 800px;
  background-color: #fff;
}
</style>
