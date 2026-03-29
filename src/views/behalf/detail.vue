<template>
  <div class="wrap-box">
    <div class="gs_title"><span style="color: white;">余额明细</span></div>
    <div class="wrap-box-c">
      <div class="fieldset">
        <el-divider content-position="left"
          ><span class="legend">数据汇总</span></el-divider
        >
        <div class="fieldset-con">
          <p>
            共计收入：<font color="#FF0000">{{ shouru }}元</font>
          </p>
          <p>
            共计支出：<font color="#FF0000">{{ zhichu }}元</font>
          </p>
        </div>
      </div>
      <div class="fieldset">
        <el-divider content-position="left"
          ><span class="legend">余额明细</span></el-divider
        >
        <div class="search-box mgl15 mgb15">
          <div class="item label ">开始时间：</div>
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
          <div class="item label mgl10">结束时间：</div>
          <div class="item input">
            <el-date-picker
              type="date"
              placeholder="结束时间"
              size="small"
              v-model="form.EndTime"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </div>
          <div class="item label mgl10">类型：</div>
          <div class="item input">
            <el-select
              placeholder="请选择"
              size="small"
              v-model="form.OverMoneyType"
            >
              <el-option :value="0" label="全部"> </el-option>
              <el-option :value="1" label="收入"> </el-option>
              <el-option :value="2" label="支出"> </el-option>
            </el-select>
          </div>
          <div class="item mgl10">
            <el-button type="primary" size="small" @click="search"
              >点击查询</el-button
            >
          </div>
        </div>
        <div class="mgt15 mgb15 mgl15 mgr15">
          <el-table
            ref="singleTable"
            :data="tableData"
            highlight-current-row
            border
            :header-cell-style="{ background: '#F2F2F2', color: '#606266' }"
            class="mgt15"
          >
            <el-table-column
              property="overMoneyType"
              label="类型"
              align="center"
            >
              <template slot-scope="scope">
                <span v-if="scope.row.overMoneyType == 0">全部</span>
                <span v-if="scope.row.overMoneyType == 1">收入</span>
                <span v-if="scope.row.overMoneyType == 2">支出</span>
              </template>
            </el-table-column>
            <el-table-column
              property="changeAmount"
              label="变动金额"
              align="center"
            >
            </el-table-column>
            <el-table-column
              property="overMoney"
              label="账户余额"
              align="center"
            >
            </el-table-column>
            <el-table-column property="remarks" label="备注" align="center">
            </el-table-column>
            <el-table-column
              property="modifiedTime"
              label="时间"
              align="center"
            >
            </el-table-column>
          </el-table>
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
        Id: '0',
        ApplicationUserId: 0,
        OverMoneyType: 0,
        StartTime: '',
        EndTime: '',
        PageNumber: 1,
        PageSize: 10,
        total: 0
      }
    };
  },
  computed: {
    shouru: function() {
      return this.tableData.reduce(function(prev, curr) {
        return curr.overMoney + prev;
      }, 0);
    },
    zhichu: function() {
      return this.tableData.reduce(function(prev, curr) {
        return curr.changeAmount + prev;
      }, 0);
    }
  },
  created() {
    this.getLists();
    console.log(this.form);
  },
  methods: {
    async getLists() {
      let header = await mgr();
      this.form.ApplicationUserId = this.$store.state.id;
      api
        .get('/api/TenantPaid/GetBalancesDetailsList', {
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
    search() {
      this.tableData = [];
      this.form.PageNumber = 1;
      this.getLists();
    }
  }
};
</script>

<style scoped>
.gs_title {
  background: var(--theme-color);
}
.fieldset-con {
  margin: 0 0 20px 20px;
  display: flex;
  justify-content: space-around;
}
</style>
