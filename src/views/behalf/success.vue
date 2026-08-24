<template>
  <div class="wrap-box">
    <div class="sonbar"><img src="../../assets/img/san.png" />已完成订单</div>
    <div class="wrap-box-c">
      <div class="fieldset">
        <el-divider content-position="left"
          ><span class="legend">汇总</span></el-divider
        >
        <div class="mgt15 mgb15 mgl15 mgr15">
          <div class="baseinfo">
            <div class="item">
              <div class="title">累计总额</div>
              <div class="num">0</div>
            </div>
            <div class="item">
              <div class="title">秒提总额</div>
              <div class="num">0</div>
            </div>
            <div class="item">
              <div class="title">今日总额</div>
              <div class="num">0</div>
            </div>
            <div class="item">
              <div class="title">今日秒提</div>
              <div class="num">0</div>
            </div>
          </div>
        </div>
      </div>
      <div class="fieldset">
        <el-divider content-position="left"
          ><span class="legend">已完成订单</span></el-divider
        >
        <div class="mgt15 mgb15 mgl15 mgr15">
          <div class="search-box mgb15">
            <div class="item  label">开始时间</div>
            <div class="item input">
              <el-date-picker
                type="date"
                placeholder="开始时间"
                size="small"
                v-model="form.StartTime"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </div>
            <div class="item label">结束时间</div>
            <div class="item input">
              <el-date-picker
                type="date"
                placeholder="结束时间"
                size="small"
                v-model="form.EndTime"
              >
              </el-date-picker>
            </div>
            <div class="item  label">收款账号</div>
            <div class="item input">
              <el-input
                size="small"
                v-model="form.BeneficiaryAccountNumber"
                value-format="yyyy-MM-dd"
              >
              </el-input>
            </div>
            <div class="item  label">订单号</div>
            <div class="item input">
              <el-input size="small" v-model="form.OrderNumber"> </el-input>
            </div>
          </div>
          <div class="search-box mgt15x mgb15">
            <div class="item  label">类型</div>
            <div class="item input">
              <el-select
                placeholder="请选择"
                size="small"
                v-model="form.PaidOrderType"
              >
                <el-option :value="0" label="全部"> </el-option>
                <el-option :value="1" label="收入"> </el-option>
                <el-option :value="2" label="支出"> </el-option>
              </el-select>
            </div>
            <div class="item  label">角色名</div>
            <div class="item input w1">
              <el-input size="small" v-model="form.PlayerRoleName"> </el-input>
            </div>
            <div class="item  label">收款姓名</div>
            <div class="item input w1">
              <el-input size="small" v-model="form.BeneficiaryAccountName">
              </el-input>
            </div>
            <div class="item  label">分区名称</div>
            <div class="item input w1">
              <el-input size="small"> </el-input>
            </div>
            <div class="item input">
              <el-button type="danger" size="small" @click="search"
                >查询</el-button
              >
              <el-button type="warning" size="small" @click="reset"
                >重置</el-button
              >
            </div>
          </div>
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
              property="orderNumber"
              label="订单号"
              align="center"
            >
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
              width="120"
            >
            </el-table-column>
            <el-table-column
              property="applyAmount"
              label="金额"
              align="center"
              width="120"
            >
            </el-table-column>

            <el-table-column
              property="beneficiaryAccountNumber"
              label="收款账号"
              align="center"
              width="160"
            >
            </el-table-column>
            <el-table-column
              property="beneficiaryAccountName"
              label="收款姓名"
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
        ApplicationUserId: this.$store.state.id,
        BeneficiaryAccountNumber: '',
        BeneficiaryAccountName: '',
        PlayerRoleName: '',
        OrderNumber: '',
        PaidOrderType: 0,
        StartTime: '',
        EndTime: '',
        PageNumber: 1,
        PageSize: 10,
        total: 0
      },
      selection: []
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
  },
  methods: {
    async getLists() {
      let header = await mgr();
      this.form.ApplicationUserId = this.$store.state.id;
      for (let i in this.form) {
        if (this.form[i] === '') {
          delete this.form[i];
        }
      }
      api
        .get('/api/TenantPaid/CompletedPaidOrderList', {
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
    },
    changePage(page) {
      console.log(page);
      this.tableData = [];
      this.form.PageNumber = page;
      this.getLists();
    },
    search() {
      this.tableData = [];
      this.form.PageNumber = 1;
      this.getLists();
    },
    reset() {
      this.tableData = [];
      this.form = {
        Id: '',
        VersionId: '',
        ApplicationUserId: '',
        BeneficiaryAccountNumber: '',
        PlayerRoleName: '',
        StartTime: '',
        EndTime: '',
        PageNumber: 1,
        PageSize: 10,
        total: 0
      };
      this.getLists();
    }
  }
};
</script>

<style scoped>
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
</style>
