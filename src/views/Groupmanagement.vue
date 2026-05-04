<!--
 * @Description: 分组管理
 * @Author: xu wei
 * @Date: 2020-03-05 14:04:55
 * @LastEditTime: 2020-08-24 19:30:13
 * @LastEditors: gao shuai
 -->
 <template>
  <div class="home">
    <div class="gs_title" style="color: white;">分组管理</div>
    <div class="btnsbox fl mgt10" style="margin:10px 10px;">
      <el-button size="small" style="background: #409EFF !important;border-color: #409EFF;" type="success" @click="dialog.show = true" 
      v-if="$store.state.settlementType != 3 && $store.state.settlementType != 4">创建分组</el-button>
    </div>
    <div class="tablebox pdb15 pdt20">
      <div class="gs_tablebox">
        <el-table ref="moduleTable" size="mini" :data="tableData" border style="width: 100%" stripe>
          <el-table-column prop="id" label="编号" width="80">
          </el-table-column>
          <el-table-column label="创建时间" prop="createDate" width="280">
            <!-- <template slot-scope="scope">
              <p style="height:18px;">{{scope.row.createDate.split(' ')[0]}}</p>
              <p style="height:18px;color:#999;">{{scope.row.createDate.split(' ')[1]}}</p>
            </template> -->
          </el-table-column>
          <el-table-column prop="name" label="分组名称">
          </el-table-column>
          <el-table-column prop="partitionIdCount" label="分区个数" width="120">
            <template slot-scope="scope">
              <span class="partition-count-link" style="color:#409EFF;cursor:pointer;" @click="toPartList(scope.row.id)">
                {{ scope.row.partitionIdCount }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="分组网址">
            <template slot-scope="scope">
              <span @click="getCircuite(scope.row.uuid)">分组充值地址</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="280">
            <template slot-scope="scope">
              <el-button-group>
                <!-- <el-button size="mini" type="warning" @click="copyaddress(scope.row.uuid)">推广</el-button> -->
                <el-button size="mini" type="info" @click="downLink(scope.row.uuid,scope.$index)" :loading="loading&&loadingIndex===scope.$index">推广下载</el-button>
                <el-button size="mini" type="primary" @click="editgroup(scope.row.id,scope.row.name)" v-if="$store.state.settlementType != 3 && $store.state.settlementType != 4">编辑</el-button>
                <el-button size="mini" type="success" @click="getCircuite(scope.row.uuid)">充值</el-button>
                <el-button size="mini" type="danger" @click.prevent="handleClose(scope.row.id)" v-if="$store.state.settlementType != 3 && $store.state.settlementType != 4">删除</el-button>
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
    <!-- 添加游戏分组弹框 -->
    <el-dialog :title="dialog.editflag?'添加游戏分组':'编辑游戏分组'" :visible.sync="dialog.show" @close="dialoginit" custom-class="gs_dialog" width="400px">
      <div class="opeartbox">
        <ul class="clearfix">
          <li>
            <span class='tit'>分组名称：</span>
            <span class="txtbox">
              <el-input size="small" v-model="dialog.groupName"></el-input>
            </span>
          </li>
        </ul>
      </div>
      <p class="tc pdt10 pdb10">
        <el-button v-if="dialog.editflag" size="small" type="primary" @click="addteam">确定</el-button>
        <el-button v-else size="small" type="primary" @click="editsure">确定</el-button>
        <el-button size="small" type="info" @click="dialog.show =false">取消</el-button>
      </p>
    </el-dialog>
    <el-dialog title="充值地址" :visible.sync="toPay">
      <el-table :data="payList" show-header="false">
        <el-table-column property="name" label="充值地址" width="150"></el-table-column>
        <el-table-column property="domainName" label="地址">
          <template slot-scope="scope">
            {{ scope.row.domainName +  (scope.row.port=="80"||scope.row.port=="443"?'':(':' + scope.row.port)) + '/chargepageg/' + scope.row.uuid }}
          </template>
        </el-table-column>
        <el-table-column label="操作"  width="200">
          <template slot-scope="scope">
              <el-button-group>
                <el-button type="primary" @click="copyPromoteLink(scope.row.domainName,scope.row.uuid,scope.row.port)">复制</el-button>
                <el-button type="info" @click="jumpUrl(scope.row.domainName,scope.row.uuid,scope.row.port)">前往</el-button>
              </el-button-group>
            </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false, // 推广下载loading
      loadingIndex: '', // 推广下载index
      groupName: '', // 分组名称
      pageIndex: 1, // 页码
      pageSize: 20, // 每页的条数
      total: 0, // 总数据的条数
      tableData: [],
      dialog: {
        show: false,
        editflag: true,
        id: '',
        groupName: ''
      },
      toPay: false,
      payList: []
    };
  },
  methods: {
    // 获取列表
    getlist() {
      this.$api.groupmange
        .teamlist({
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
    // 复制推广链接
    copyPromoteLink(url, uuid, port) {
      let oInput = document.createElement('input');
      oInput.value = url + (port === '80' || port === '443' ? '' : (':' + port)) + '/chargepageg/' + uuid;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象
      document.execCommand('Copy'); // 执行浏览器复制命令
      oInput.className = 'oInput';
      oInput.style.display = 'none';
      this.$messageSuccess('复制成功');
      document.body.removeChild(oInput);
    },
    // 前往充值页面
    jumpUrl(url, uuid, port) {
      window.open().location = url + (port === '80' || port === '443' ? '' : (':' + port)) + '/chargepageg/' + uuid;
    },
    // 前往分区列表页
    toPartList(id) {
      this.$router.push({ path: '/main/Zoningmanagement', query: { groupId: id } });
    },
    // 添加分组
    addteam() {
      if (this.dialog.groupName === '') {
        this.$messageError('请输入分组名称！');
        return;
      }
      this.$api.groupmange
        .addteam({
          name: this.dialog.groupName
        })
        .then((data) => {
          if (data.status === 200) {
            this.$messageSuccess('添加成功！');
            this.getlist();
            this.dialog.show = false;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 编辑分组
    editgroup(id, name) {
      this.dialog.groupName = name;
      this.dialog.id = id;
      this.dialog.editflag = false;
      this.dialog.show = true;
    },
    // 编辑分组确认
    editsure() {
      if (this.dialog.groupName === '') {
        this.$messageError('请输入分组名称！');
        return;
      }
      this.$api.groupmange
        .editteam({
          id: this.dialog.id,
          name: this.dialog.groupName
        })
        .then((data) => {
          if (data.status === 200) {
            this.$messageSuccess('编辑成功！');
            this.getlist();
            this.dialog.show = false;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 删除分组
    deleteTeam(id) {
      this.$api.groupmange
        .deleteteam({
          groupId: id
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
    // 充值
    rechargeTeam(uuid) {
      var tempwindow = window.open();
      this.$api.groupmange
        .rechargeteam({
          typeId: 0
        })
        .then((data) => {
          if (data.status === 200) {
            tempwindow.location = data.data + '/chargepageg/' + uuid;
            // window.open(data.data + '/chargepageg/' + uuid);
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    getCircuite(uuid) {
      this.$api.groupmange
        .getCircuite({
          typeId: 0
        })
        .then((data) => {
          if (data.status === 200) {
            this.payList = data.data;
            this.payList.forEach(element => {
              element.uuid = uuid;
            });
            console.log(this.payList);
            this.toPay = true;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 推广链接
    copyaddress(uuid) {
      this.$api.groupmange
        .rechargeteam({
          typeId: 0
        })
        .then((data) => {
          if (data.status === 200) {
            let Url2 = data.data + '/chargepageg/' + uuid;
            let oInput = document.createElement('input');
            oInput.value = Url2;
            document.body.appendChild(oInput);
            oInput.select(); // 选择对象
            document.execCommand('Copy'); // 执行浏览器复制命令
            oInput.className = 'oInput';
            oInput.style.display = 'none';
            this.$messageSuccess('复制成功');
            document.body.removeChild(oInput);
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 推广下载
    downLink(uuid, index) {
      if (!this.loading) {
        this.loading = true;
        this.loadingIndex = index;
        this.$api.getcode
          .downLink({
            group: uuid
          })
          .then((data) => {
            this.loading = false;
            this.loadingIndex = '';
            if (data.status === 200) {
              // 创建隐藏的可下载链接
              let eleLink = document.createElement('a');
              eleLink.style.display = 'none';
              // 字符内容转变成blob地址
              eleLink.href = data.data;
              // 触发点击
              document.body.appendChild(eleLink);
              eleLink.click();
              // 然后移除
              document.body.removeChild(eleLink);
            }
          })
          .catch((err) => {
            this.loading = false;
            this.loadingIndex = '';
            this.$messageError(err.message);
          });
      }
    },
    // 弹框数据的初始化
    dialoginit() {
      this.dialog.groupName = '';
      this.dialog.editflag = true;
      this.dialog.id = '';
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
    },
    // 删除选中行
    handleClose(id) {
      this.$confirm('删除后数据将无法恢复，是否确定?')
        .then(() => {
          this.deleteTeam(id);
        })
        .catch(() => {});
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
.tc pdt10 pdb10 {
  text-align: center;
}
</style>
