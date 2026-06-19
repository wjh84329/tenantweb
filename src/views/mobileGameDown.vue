<!--
 * @Description: 分组管理
 * @Author: xu wei
 * @Date: 2020-03-05 14:04:55
 * @LastEditTime: 2020-08-24 19:30:13
 * @LastEditors: gao shuai
 -->
 <template>
  <div class="home">
    <div class="gs_title" style="color: white;">手游接口（接口文件为测试版本,有问题联系客服）</div>
    <div class="btnsbox fr mgt10">
      <!-- <el-button size="small" type="success" @click="dialog.show = true">添加</el-button> -->
    </div>
    <div class="tablebox pdb15 pdt20">
      <div class="gs_tablebox">
        <el-table ref="moduleTable" size="mini" :data="tableData" border style="width: 100%" stripe>
          <!-- <el-table-column label="创建时间">
            <template slot-scope="scope">
              <p style="height:18px;">{{scope.row.createDate.split(' ')[0]}}</p>
              <p style="height:18px;color:#999;">{{scope.row.createDate.split(' ')[1]}}</p>
            </template>
          </el-table-column> -->
          <el-table-column width="150" prop="name" label="游戏名称">
          </el-table-column>
          <el-table-column prop="remark"  label="接口介绍">
          </el-table-column>
          <el-table-column width="150" prop="downUrl" label="接口下载" >
            <template slot-scope="scope">
              <el-button-group>
                 <el-button size="mini" type="info" @click="loadzip(scope.row.downUrl)" >接口下载</el-button>
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
import axios from 'axios';
import mgrs from '../assets/js/securityapi';
import { netUrl } from '../assets/js/version';
import { downloadFile } from '../utils/downloadFile';
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
      }
    };
  },
  methods: {
    // 下载网关
    async download() {
      var params = {
        PageNumber: this.pageIndex,
        PageSize: this.pageSize
      };
      let header = await mgrs();
      axios({
        method: 'get',
        url: netUrl + '/api/Upload/GetMobileGameList',
        params: params,
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + header
        }
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
    // 下载
    async loadzip(url) {
      if (!url) {
        return;
      }
      try {
        await downloadFile(url, '接口文件.zip');
      } catch (err) {
        this.$messageError((err && err.message) || '下载失败，请稍后再试');
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
      this.download();
    },
    // 当前的页码变化时
    handleCurrentChange(data) {
      this.pageIndex = data;
      this.download();
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
    this.download();
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
