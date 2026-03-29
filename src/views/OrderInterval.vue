<!--
 * @Description: 定时任务
 * @Author: gao shuai
 * @Date: 2020-06-29 14:41:54
 * @LastEditTime: 2020-06-29 14:50:36
 * @LastEditors: gao shuai
-->

<template>
  <div class="home">
    <div class="gs_title" style="color: white;">定时任务</div>
    <div class="tablebox pdb15">
      <div class="gs_tablebox">
        <el-table ref="moduleTable" size="mini" :data="orderlist2.tableData" border style="width: 100%" stripe>
          <el-table-column prop="date" label="创建时间">
            <template slot-scope="scope">
              <p style="height:18px;">{{ scope.row.createDate.split(' ')[0] }}</p>
              <p style="height:18px;color:#999;">{{ scope.row.createDate.split(' ')[1] }}</p>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="任务名称">
          </el-table-column>
          <el-table-column prop="description" label="任务描述">
          </el-table-column>
          <el-table-column prop="state" label="状态" width="140">
            <template slot-scope="scope">
              <span :class="{ countdownText: isCountdown(scope.row) }">
                {{ getTaskStatusText(scope.row) }}
              </span>
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
        <el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2" background
          :page-sizes="[10, 20, 30, 40]" :current-page="orderlist2.pageIndex" :page-size="orderlist2.pageSize"
          layout="total, sizes, prev, pager, next, jumper" :total="orderlist2.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nowTime: Date.now(),
      timer: null,
      refreshTimer: null,
      orderlist2: {
        pageIndex: 1, // 页码
        pageSize: 20, // 每页的条数
        total: 0, // 总数据的条数
        tableData: []
      }
    };
  },
  methods: {
    isCountdown(row) {
      if (row.state === 1) {
        return false;
      }

      const startTime = this.parseTime(row.timeStart);
      if (!startTime) {
        return false;
      }

      return startTime > this.nowTime;
    },
    getTaskStatusText(row) {
      if (row.state === 1) {
        return '已完成';
      }

      const startTime = this.parseTime(row.timeStart);
      if (!startTime) {
        return '未完成';
      }

      const diff = startTime - this.nowTime;

      if (diff > 0) {
        return this.formatCountdown(diff);
      }

      return '执行中';
    },
    parseTime(timeStr) {
      if (!timeStr) return 0;
      return new Date(timeStr.replace(/-/g, '/')).getTime();
    },

    formatCountdown(diff) {
      const totalSeconds = Math.floor(diff / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      const pad = (value) => String(value).padStart(2, '0');

      if (days > 0) {
        return `${days}天${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
      }

      return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    },

    startTimer() {
      this.timer = setInterval(() => {
        this.nowTime = Date.now();
      }, 1000);
    },
    startRefreshTimer() {
      this.refreshTimer = setInterval(() => {
        this.getlist1();
      }, 5000);
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
    // 删除选中行
    handleClose(id) {
      this.$confirm('删除后数据将无法恢复，是否确定?')
        .then(() => {
          this.delTask(id);
        })
        .catch(() => { });
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
    this.getlist1();
    this.startTimer();
    this.startRefreshTimer();
  },
  beforeDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
    }
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer);
    }
  }
};
</script>

<style lang="scss" scoped>
.gs_title {
  background: var(--theme-color);
}

.opeartbox {
  height: 320px;
  padding: 0 20px 10px;
  background: #fff;
  overflow: hidden;

  .el-form-item {
    margin-bottom: 5px;
  }
}

.tablebox {
  background: #fff;
}

.alignmentleft {
  float: left;
  width: 40%;
  margin-left: 20px;
}

.alignmentright {
  width: 55%;
  float: right;
}
.countdownText {
  color: #f56c6c;
  font-weight: 700;
}
</style>
