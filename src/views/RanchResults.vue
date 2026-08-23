<template>
  <div class="home" :class="{ 'ranch-results-page': $root.uiMode === 'modern' }">
    <div class="gs_title" style="color: white;">通区领取记录</div>

    <div class="opeartbox" style="padding:12px;">
      <el-form :inline="true" size="small" @submit.native.prevent>
        <el-form-item label="查询日期">
          <el-date-picker v-model="startTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="起始时间"></el-date-picker>
          <span style="margin:0 6px;">至</span>
          <el-date-picker v-model="endTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="结束时间"></el-date-picker>
        </el-form-item>

        <el-form-item label="IP地址">
          <el-input v-model="ip" placeholder="输入IP地址"></el-input>
        </el-form-item>

        <el-form-item label="区名">
          <el-input v-model="serverName" placeholder="输入区名（支持模糊）"></el-input>
        </el-form-item>

        <el-form-item label="账号">
          <el-input v-model="userId" placeholder="输入玩家账号"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="getRanchResults">开始查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="tablebox" style="margin-top:12px;background:#fff;padding:10px;">
      <el-table :data="ranchData" size="mini" stripe border style="width:100%">
        <el-table-column prop="serverName" label="区名" :min-width="$root.uiMode === 'modern' ? 170 : undefined"></el-table-column>
        <el-table-column prop="userId" label="账号" :width="$root.uiMode === 'modern' ? undefined : 120" :min-width="$root.uiMode === 'modern' ? 150 : undefined"></el-table-column>
        <el-table-column prop="userName" label="角色名" :width="$root.uiMode === 'modern' ? undefined : 80" :min-width="$root.uiMode === 'modern' ? 140 : undefined"></el-table-column>
        <el-table-column prop="ip" label="ip" :width="$root.uiMode === 'modern' ? undefined : 80" :min-width="$root.uiMode === 'modern' ? 130 : undefined"></el-table-column>
        <el-table-column prop="amount" label="金额" :width="$root.uiMode === 'modern' ? undefined : 80" :min-width="$root.uiMode === 'modern' ? 90 : undefined">
          <template slot-scope="scope">
            {{ scope.row.Amount ? scope.row.Amount.toFixed(2) : '0.00' }}
          </template>
        </el-table-column>
        <el-table-column prop="orderTime" label="时间" :width="$root.uiMode === 'modern' ? undefined : 180" :min-width="$root.uiMode === 'modern' ? 180 : undefined"></el-table-column>
        <el-table-column prop="orderNo" label="单据号" :width="$root.uiMode === 'modern' ? undefined : 180" :min-width="$root.uiMode === 'modern' ? 230 : undefined"></el-table-column>
        <el-table-column prop="playerQq" label="玩家QQ" :width="$root.uiMode === 'modern' ? undefined : 100" :min-width="$root.uiMode === 'modern' ? 130 : undefined"></el-table-column>
        <el-table-column prop="playerPhone" label="玩家电话" :width="$root.uiMode === 'modern' ? undefined : 120" :min-width="$root.uiMode === 'modern' ? 130 : undefined">
          <template slot-scope="scope">
            {{ scope.row.PlayerPhone || '未填写' }}
          </template>
        </el-table-column>
      </el-table>

      <div style="margin-top:12px;text-align:right;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-size="pageSize"
          :page-sizes="[10,20,30,50]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
// import axios from 'axios';
// import { url } from '../assets/js/version';

export default {
  name: 'RanchResults',
  data() {
    return {
      startTime: '',
      endTime: '',
      ip: '',
      serverName: '',
      userId: '',
      ranchData: [],
      pageIndex: 1,
      pageSize: 20,
      total: 0
    };
  },
  methods: {
    getRanchResults() {
      this.$api.home.GetRanchResults({
        startOrderTime: this.startTime || '',
        endOrderTime: this.endTime || '',
        ip: this.ip || '',
        serverName: this.serverName || '',
        userId: this.userId || '',
        pageNumber: this.pageIndex,
        pageSize: this.pageSize
      })
        .then(data => {
          if (data.status === 204) {
            this.ranchData = [];
            this.total = 0;
            return;
          }
          if (data.status === 200) {
            this.ranchData = data.data;
            const hdr = data.headers['x-pagination'] || data.headers['X-Pagination'];
            try {
              const paging = hdr ? JSON.parse(hdr) : null;
              this.total = paging ? paging.TotalCount : (Array.isArray(data.data) ? data.data.length : 0);
            } catch (e) {
              this.total = Array.isArray(data.data) ? data.data.length : 0;
            }
          }
        })
        .catch(err => {
          this.$messageError ? this.$messageError(err.message) : console.error(err);
        });
      // const params = {
      //   StartOrderTime: this.startTime || '',
      //   EndOrderTime: this.endTime || '',
      //   Ip: this.ip || '',
      //   ServerName: this.serverName || '',
      //   UserId: this.userId || '',
      //   PageNumber: this.pageIndex,
      //   PageSize: this.pageSize
      // };

      // axios.get(`${url}api/UserCenter/GetRanchResults`, { params })
      //   .then(res => {
      //     if (res.status === 204) {
      //       this.ranchData = [];
      //       this.total = 0;
      //       return;
      //     }
      //     if (res.status === 200) {
      //       this.ranchData = res.data;
      //       const hdr = res.headers['x-pagination'] || res.headers['X-Pagination'];
      //       try {
      //         const paging = hdr ? JSON.parse(hdr) : null;
      //         this.total = paging ? paging.TotalCount : (Array.isArray(res.data) ? res.data.length : 0);
      //       } catch (e) {
      //         this.total = Array.isArray(res.data) ? res.data.length : 0;
      //       }
      //     }
      //   })
      //   .catch(err => {
      //     this.$messageError ? this.$messageError(err.message) : console.error(err);
      //   });
    },
    reset() {
      this.startTime = '';
      this.endTime = '';
      this.ip = '';
      this.serverName = '';
      this.userId = '';
      this.pageIndex = 1;
      this.pageSize = 20;
      this.getRanchResults();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.pageIndex = 1;
      this.getRanchResults();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.getRanchResults();
    }
  },
  created() {
    // 可根据需要默认设置时间
    this.getRanchResults();
  }
};
</script>

<style scoped>
.gs_title {
  background: var(--theme-color);
}
.opeartbox {
  background: #fff;
  padding: 10px;
}
.tablebox {
  background: #fff;
  padding: 10px;
}
</style>
