<!--
 * @Description: 结算记录
 * @Author: xu wei
 * @Date: 2020-03-05 14:42:45
 * @LastEditTime: 2020-09-01 16:29:14
 * @LastEditors: gao shuai
 -->
<template>
  <div class="home transfer-point-page" style="padding: 20px 20px;">
    <!-- <div class="person_tit">结算记录</div> -->
    <el-tabs v-model="activeName" @tab-click="handleClick" type="card">
      <el-tab-pane label="用户记录" name="user">
        <el-form :inline="true" :model="parameters" class="bind-query-form" size="small" style="display: flex;justify-content: space-between;">
          <el-form-item label="openid">
            <el-input v-model="parameters.keyword" placeholder="请输入openid" clearable style="width:160px;"></el-input>
            <el-button type="primary" @click="getuserList">查询</el-button>
            <el-button @click="resetBindQuery">重置</el-button>
          </el-form-item>
          <el-form-item>
            <span style="float: right;">当前用户共计转区点为：{{money}}</span>
          </el-form-item>
        </el-form>
        <el-table :data="userlist" border style="width: 100%; margin-top: 10px;"
          :header-cell-style="{ background: '#F2F2F2', color: '#606266' }" v-loading="bindLoading" empty-text="无数据">
          <el-table-column prop="id" label="ID" align="center" />
          <el-table-column prop="openId" label="openid" align="center" min-width="120" />
          <el-table-column prop="money" label="转区点" align="center" min-width="100" />
        </el-table>
        <div class="log-pagination" style="margin: 10px 0 0 0; text-align:right;">
          <el-pagination background layout="total, prev, pager, next, sizes, jumper" :total="parameters.total"
            :page-size="parameters.pageSize" :current-page="parameters.pageNumber" :page-sizes="[10, 20, 50, 100]"
            @size-change="logPageSizeChange" @current-change="logPageChange" style="display:inline-block;" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="转区点日志" name="log">
        <el-form :inline="true" :model="logparm" class="bind-query-form" size="small">
          <el-form-item label="openid">
            <el-input v-model="logparm.keyword" placeholder="请输入openid" clearable style="width:160px;"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getlogLost">查询</el-button>
            <el-button @click="resetBindQuery1">重置</el-button>
          </el-form-item>
        </el-form>
        <el-table :data="loglist" border style="width: 100%; margin-top: 10px;"
          :header-cell-style="{ background: '#F2F2F2', color: '#606266' }" v-loading="bindLoading" empty-text="无数据">
          <el-table-column prop="createTime" label="创建时间" align="center" />
          <el-table-column prop="raw" label="openid" align="center" min-width="120" />
          <el-table-column prop="playerAccount" label="玩家账号" align="center" />
          <el-table-column prop="serverName" label="分区名称" align="center" />
          <el-table-column prop="userName" label="角色名称" align="center" />
          <el-table-column prop="extractPoints" label="变动转区点" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.remarks == '-'" style="color: red;">{{ scope.row.remarks+scope.row.extractPoints }}</span>
              <span v-if="scope.row.remarks == '+'" style="color: green;">{{ scope.row.remarks+scope.row.extractPoints }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="balanceAfter" label="变动后余额" align="center" />
        </el-table>
        <div class="log-pagination" style="margin: 10px 0 0 0; text-align:right;">
          <el-pagination background layout="total, prev, pager, next, sizes, jumper" :total="logparm.total"
            :page-size="logparm.pageSize" :current-page="logparm.pageNumber" :page-sizes="[10, 20, 50, 100]"
            @size-change="logPageSizeChange1" @current-change="logPageChange1" style="display:inline-block;" />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>

export default {
  data() {
    return {
      activeName: 'user',
      parameters: {
        pageNumber: 1,
        pageSize: 10,
        keyword: '',
        total: 0
      },
      money: 0,
      userlist: [],
      bindLoading: false,
      loglist: [],
      logparm: {
        pageNumber: 1,
        pageSize: 10,
        keyword: '',
        total: 0
      }
    };
  },

  methods: {
    logPageSizeChange(size) {
      this.parameters.pageSize = size;
      this.parameters.pageNumber = 1;
      this.getuserList();
    },
    logPageChange(page) {
      this.parameters.pageNumber = page;
      this.getuserList();
    },
    logPageSizeChange1(size) {
      this.logparm.pageSize = size;
      this.logparm.pageNumber = 1;
      this.getlogLost();
    },
    logPageChange1(page) {
      this.logparm.pageNumber = page;
      this.getlogLost();
    },
    handleClick(tab, event) {
      // console.log(tab, event);
      if (tab.name === 'user') {
        this.getuserList();
      }
      if (tab.name === 'log') {
        this.getlogLost();
      }
    },
    getuserList() {
      this.$api.userLog
        .getWeChatLogList(this.parameters)
        .then((data) => {
          if (data.state === 204) {
            this.userlist = [];
            this.parameters.total = 0;
            return;
          }
          // 保证 userlist 始终为数组
          const list = Array.isArray(data.data) ? data.data : [];
          this.userlist = list;
          // 计算总转区点
          this.money = list.reduce((sum, item) => sum + (item.money || 0), 0);
          const xp = data.headers && data.headers['x-pagination'] ? JSON.parse(data.headers['x-pagination']) : null;
          if (xp) {
            this.parameters.total = xp.TotalCount || xp.total || 0;
            this.parameters.pageNumber = xp.CurrentPage || this.parameters.pageNumber;
            this.parameters.pageSize = xp.PageSize || this.parameters.pageSize;
          } else {
            // 回退：如果没有分页头，使用数组长度或后端返回的 total 字段
            this.parameters.total = list.length || (data.data && data.data.total) || 0;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },

    // 获取转区点日志
    getlogLost() {
      this.$api.userLog
        .getWeChatOperationLogList(this.logparm)
        .then((data) => {
          if (data.state === 204) {
            this.loglist = [];
            this.logparm.total = 0;
            return;
          }
          // 保证 loglist 始终为数组
          const list = Array.isArray(data.data) ? data.data : [];
          this.loglist = list;

          const xp = data.headers && data.headers['x-pagination'] ? JSON.parse(data.headers['x-pagination']) : null;
          if (xp) {
            this.logparm.total = xp.TotalCount || xp.total || 0;
            this.logparm.pageNumber = xp.CurrentPage || this.logparm.pageNumber;
            this.logparm.pageSize = xp.PageSize || this.logparm.pageSize;
          } else {
            this.logparm.total = list.length || (data.data && data.data.total) || 0;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    resetBindQuery() {
      this.parameters = {
        keyword: ''
      };
      this.getuserList();
    },
    resetBindQuery1() {
      this.logparm = {
        keyword: ''
      };
      this.getuserList();
    }
  },
  created() {
    this.getuserList();
    this.getlogLost();
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
