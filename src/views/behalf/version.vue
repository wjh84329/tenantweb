<template>
  <div class="wrap-box">
    <div class="gs_title"><span style="color: white;">版本管理</span></div>
    <div class="wrap-box-c">
      <el-button
        type="primary"
        size="small"
        @click="$router.push('/behalf/editVersion')"
        >创建版本</el-button
      >
      <el-table
        ref="singleTable"
        :data="tableData"
        highlight-current-row
        border
        :header-cell-style="{ background: '#F2F2F2', color: '#606266' }"
        class="mgt15"
      >
        <el-table-column property="versionName" label="版本名称" align="center">
        </el-table-column>
        <el-table-column
          property="transferRecordUrl"
          label="查看转出记录地址(游戏中使用)"
          align="center"
        >
        </el-table-column>
        <el-table-column label="当前模式" align="center">
          <template slot-scope="scope">
            {{ scope.row.isAutoPay ? '自动' : '手工' }}
          </template>
        </el-table-column>
        <el-table-column label="秒到账失效时间段" align="center">
          <template slot-scope="scope">
            {{ scope.row.startTime }} - {{ scope.row.endTime }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="300">
          <template slot-scope="scope">
            <el-dropdown style="margin-right: 10px;" @command="command">
              <el-button size="mini">
                模式<i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="{ type: 'a', id: scope.row.id }"
                  >自动</el-dropdown-item
                >
                <el-dropdown-item :command="{ type: 'b', id: scope.row.id }"
                  >手工</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
            <el-button
              size="mini"
              type="primary"
              @click="handleDefault(scope.$index, scope.row)"
              >默认
            </el-button>
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
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
      tableData: []
    };
  },
  created() {
    this.getLists();
  },
  methods: {
    async getLists() {
      let header = await mgr();
      api
        .get('/api/TenantPaid/GetVersions', {
          headers: {
            Authorization: 'Bearer ' + header
          },
          params: {}
        })
        .then(res => {
          if (res.status === 200) {
            this.tableData = res.data;
          }
        })
        .catch(err => {
          this.$messageError(err.message);
        });
    },
    handleEdit(index, row) {
      this.$router.push(`/behalf/editVersion?id=${row.id}`);
      localStorage.setItem('row', JSON.stringify(row));
    },
    command(obj) {
      console.log(obj);
      this.handleMode(obj);
    },
    async handleDefault(index, row) {
      let header = await mgr();
      this.$confirm('此操作将设置该版本为默认版本, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          api
            .get('/api/TenantPaid/ChangeVersionDefault', {
              headers: {
                Authorization: 'Bearer ' + header
              },
              params: {
                paidVersionId: row.id
              }
            })
            .then(res => {
              console.log(res);
              if (res.status === 200) {
                this.$messageSuccess('操作成功');
                this.getLists();
              }
            });
        })
        .catch(err => {
          this.$messageError(err.message);
        });
    },
    async handleMode(obj) {
      let header = await mgr();
      api
        .get('/api/TenantPaid/ChangeVersionMode', {
          headers: {
            Authorization: 'Bearer ' + header
          },
          params: {
            paidVersionId: obj.id,
            isAutomaticMode: obj.type === 'a'
          }
        })
        .then(res => {
          if (res.status === 200) {
            this.$messageSuccess('操作成功');
            this.getLists();
          }
        })
        .catch(err => {
          this.$messageError(err.message);
        });
    },
    async handleDelete(index, row) {
      let header = await mgr();
      this.$confirm('此操作将永久删除该版本, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          api
            .get('/api/TenantPaid/DeleteVersion', {
              headers: {
                Authorization: 'Bearer ' + header
              },
              params: {
                paidVersionId: row.id
              }
            })
            .then(res => {
              if (res.status === 200) {
                this.getLists();
              } else {
                this.$message(res.data);
              }
            });
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
.wrap-box {
  min-height: 800px;
  background-color: #fff;
}

.sonbar {
  background-color: #ecf5ff;
  height: 40px;
  line-height: 40px;
  color: black !important;
}

.wrap-box-c {
  margin: 15px 20px;
}
</style>
