<!--
 * @Description: 分区模板
 * @Author: gao shuai
 * @Date: 2020-03-04 16:21:57
 * @LastEditTime: 2020-07-23 16:40:13
 * @LastEditors: gao shuai
 -->
<template>
  <div class="home">
    <div class="gs_title" style="color: white;">分区模版</div>
    <div class="gs_tabbox clearfix mgt15">
      <!-- <div class="tabbox">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="全部" name="0"></el-tab-pane>
          <el-tab-pane label="传奇" name="1"></el-tab-pane>
          <el-tab-pane label="传世" name="2"></el-tab-pane>
          <el-tab-pane label="传奇三" name="3"></el-tab-pane>
          <el-tab-pane label="SQL通用" name="4"></el-tab-pane>
          <el-tab-pane label="Web通讯" name="5"></el-tab-pane>
          <el-tab-pane label="奇迹MU" name="6"></el-tab-pane>
        </el-tabs>
      </div> -->
      <div class="btnsbox mgt10">
        <router-link style="margin-right: 20px;margin-left: 10px;" tag="span" :to="{path:'/main/partinstallmod?type=1'}">
          <el-button style="background-color: #f69c0e;color: white;font-weight: 700;" size="small" type="button" v-if="$store.state.settlementType != 3 && $store.state.settlementType != 4">+热血传奇模版</el-button>
        </router-link>
        <!-- <router-link tag="span" :to="{path:'/main/partinstallmod?type=2'}">
          <el-button style="background-color: #35aa47;color: white;font-weight: 700;" size="small" type="button">+传奇世界模版</el-button>
        </router-link> -->
      </div>
    </div>
    <div class="tablebox pdb15 pdt20 bg_fff">
      <div class="gs_tablebox">
        <el-table ref="moduleTable" size="mini" :data="tableData" border style="width: 100%" stripe>
          <el-table-column prop="id" label="编号">
          </el-table-column>
          <el-table-column prop="name" label="模板名称">
          </el-table-column>
          <el-table-column prop="currencyName" label="游戏币">
          </el-table-column>
          <el-table-column prop="ratio" label="兑换比例">
          </el-table-column>
          <el-table-column prop="partitionsCount" label="分区个数">
            <template slot-scope="scope">
              <span class="partition-count-link" style="color:#409EFF;cursor:pointer;" @click="toPartList(scope.row.id)">
                {{ scope.row.partitionsCount }}
              </span>
            </template>
          </el-table-column>
          <el-table-column label="充值赠送">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.giveState" active-color="#4a90e2" inactive-color="#e4eaec" @change="stateChange(scope.row.id,scope.row.giveState)"></el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="操作" width="200">
            <template slot-scope="scope">
              <el-button-group>
                <el-button size="mini" type="info" @click="editModule(scope.row.id)">编辑</el-button>
                <el-button size="mini" type="primary" @click="areaClone(scope.row.id)">克隆</el-button>
                <el-button size="mini" type="danger" :disabled="scope.row.partitionsCount>0" @click="handleClose(scope.row.id)" v-if="$store.state.settlementType != 3 && $store.state.settlementType != 4">删除</el-button>
              </el-button-group>
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
      activeName: '0',
      pageIndex: 1, // 页码
      pageSize: 20, // 每页的条数
      total: 0, // 总数据的条数
      tableData: []
    };
  },
  methods: {
    // 前往分区列表页
    toPartList(id) {
      this.$router.push({ path: '/main/Zoningmanagement', query: { tempId: id } });
    },
    // 获取列表
    getlist() {
      this.$api.partmodule
        .getTemplateList({
          Type: parseInt(this.activeName),
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
    // tab的切换
    handleClick() {
      this.pageIndex = 1;
      this.pageSize = 20;
      this.total = 0;
      this.tableData = [];
      this.getlist();
    },
    // 单行的充值赠送切换
    stateChange(id, state) {
      this.$api.partmodule
        .giveSwith({
          id: id,
          giveState: state
        })
        .then((data) => {
          if (data.status === 200) {
            this.getlist();
            this.$messageSuccess('更新成功！');
          }
        })
        .catch((err) => {
          this.getlist();
          this.$messageError(err.message);
        });
    },
    // 删除模板
    deleteModule(id) {
      this.$api.partmodule
        .deleteModule({
          id: id
        })
        .then((data) => {
          if (data.status === 200) {
            this.$messageSuccess('删除成功！');
            if (this.tableData.length === 1) {
              this.pageIndex = this.pageIndex === 1 ? 1 : this.pageIndex - 1;
            }
            this.getlist();
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 删除选中行
    handleClose(id) {
      this.$confirm('删除后数据将无法恢复，是否确定？')
        .then(() => {
          this.deleteModule(id);
        })
        .catch(() => {});
    },
    // 编辑模板
    editModule(id) {
      this.$router.push({ path: 'partmoduleEdit', query: { id: id } });
    },
    // clone模板
    areaClone(id) {
      this.$router.push({ path: '/main/partmoduleClone', query: { id: id } });
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
</style>
