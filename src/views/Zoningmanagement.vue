<!--
 * @Description: 分区管理
 * @Author: xu wei
 * @Date: 2020-03-05 14:15:46
 * @LastEditTime: 2020-08-31 10:26:14
 * @LastEditors: gao shuai
 -->
<template>
  <div class="home">
    <div class="gs_title" style="color: white;">分区管理</div>
    <div class="opeartbox">
      <ul class="clearfix">
        <li>
          <span class='tit'>所属分组：</span>
          <span class="txtbox">
            <el-select v-model="belongTeam" clearable @change="() => { pageIndex = 1; getlist() }" size="small"
              placeholder="请选择">
              <el-option v-for="(item, i) in belongTeamdrow" :key="'gameDivision' + i" :label="item.name"
                :value="item.id"></el-option>
            </el-select>
          </span>
        </li>
        <li>
          <span class='tit'>游戏模板：</span>
          <span class="txtbox">
            <el-select v-model="gameMoudle" clearable @change="() => { pageIndex = 1; getlist() }" size="small"
              placeholder="请选择">
              <el-option v-for="(item, i) in gameMoudledrow" :key="'gameDivision' + i" :label="item.name"
                :value="item.id"></el-option>
            </el-select>
          </span>
        </li>
        <li>
          <span class='tit'>分区类型</span>
          <span class="txtbox">
            <el-select v-model="activeName" @change="handleClick()" size="small"
              placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </span>
        </li>
      </ul>
    </div>
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
      <!-- <div class="btnsbox fr mgt10">
        <el-button size="small" type="primary" :disabled="selectList.length === 0" @click="sortArea">排序</el-button>
        <el-button size="small" type="danger" :disabled="selectList.length === 0"
          @click="handleClose(selectList)">删除</el-button>
      </div> -->
    </div>
    <div class="tablebox pdb15 pdt20">
      <div class="gs_tablebox padding_change">
        <el-table ref="moduleTable" size="mini" @selection-change="selchange" :data="tableData" border style="width: 100%"
          stripe>
          <el-table-column type="selection" width="42">
          </el-table-column>
          <el-table-column prop="date" label="排序" width="60">
            <template slot-scope="scope">
              <el-input size="small" v-model="scope.row.sort" type="number"></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="id" label="编号" width="60">
          </el-table-column>
          <el-table-column prop="name" label="名称" width="200">
          </el-table-column>
          <el-table-column prop="currencyName" label="游戏币" width="80">
          </el-table-column>
          <el-table-column prop="serverIp" label="服务器" width="120">
          </el-table-column>
          <el-table-column prop="scriptPath" label="路径">
          </el-table-column>
          <el-table-column prop="scriptPath" label="是否通区" width='80'>
            <template slot-scope="scope">
              <span v-if="scope.row.tongqu">是</span>
              <span v-else>否</span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="操作" width='340'>
            <template slot-scope="scope">
              <el-button-group>
                <el-button size="mini" type="primary" @click="rechargeTeam(scope.row.uuid)">充值</el-button>
                <el-button size="mini" type="primary" @click="checklink(scope.row.id, scope.$index)"
                  :loading="!checkflag && checkIndex === scope.$index">检测</el-button>
                <el-button size="mini" type="primary" @click="editarea(scope.row.id)">编辑</el-button>
                <el-button size="mini" type="primary" @click="showdialog(scope.row.id)">加载</el-button>
                <el-button size="mini" type="primary" @click="areaClone(scope.row.id)">克隆</el-button>
                <el-button size="mini" type="primary" @click="toOrderreissue(scope.row.id)">补发</el-button>
                <el-button size="mini" type="danger" @click.prevent="handleClose([{ id: scope.row.id }])">删除</el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="mgt15 pdl20">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
          :page-sizes="[10, 20, 30, 40]" :current-page="pageIndex" :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <div class="btnsbox fl mgt10">
        <el-button size="small" type="primary" :disabled="selectList.length === 0" @click="sortArea">排序</el-button>
        <el-button size="small" type="danger" :disabled="selectList.length === 0"
          @click="handleClose(selectList)">删除</el-button>
        <el-button size="small" type="warning" :disabled="selectList.length === 0"
          @click="handleLoad(selectList)">加载所选分区</el-button>
        <el-button size="small" type="info"
          @click="Interval()">定时改名</el-button>
      </div>
      </div>
    </div>
    <!-- 登录密码的修改弹框 -->
    <el-dialog title="加载分区" :visible.sync="dialog.show" @close="dialoginit" custom-class="gs_dialog" width="400px">
      <p class="mgb10 mgt10">
        <el-checkbox v-model="dialog.checked" :true-label="2" :false-label="1">全部更新</el-checkbox>
      </p>
      <p class="tc pdb10">
        <el-button size="small" type="primary" @click="loadingArea">确定</el-button>
      </p>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: '0', // tab
      options: [{
        value: '0',
        label: '全部'
      }, {
        value: '1',
        label: '传奇'
      }, {
        value: '2',
        label: '传世'
      }
      ],
      checkflag: true, // 检测的flag
      checkIndex: '', // 检测的Index
      belongTeam: '', // 所属分组
      gameMoudle: '', // 游戏模板
      selectList: [], // 多选变化
      belongTeamdrow: [], // 所属分组下拉
      gameMoudledrow: [], // 游戏模板下拉
      pageIndex: 1, // 页码
      pageSize: 20, // 每页的条数
      total: 0, // 总数据的条数
      tableData: [],

      timer: null, // 检测时的定时器
      dialog: {
        show: false,
        checked: 1,
        id: '',
        ids: [] // 新增
      }
    };
  },
  methods: {
    // tab的切换
    handleClick() {
      this.pageIndex = 1;
      this.pageSize = 20;
      this.total = 0;
      this.tableData = [];
      this.getlist();
    },
    Interval() {
      this.$router.push({ path: '/personal/orderInterval' });
    },
    // 在加载前执行检测，返回 Promise（检测成功 resolve，失败 reject）
    checkBeforeLoad(id) {
      return new Promise((resolve, reject) => {
        let indexNum = 0;
        this.$api.groupmange
          .checkLink({ partitionId: id })
          .then((data) => {
            if (data.status === 200) {
              const keyValue = data.data;
              const timer = setInterval(() => {
                this.$api.groupmange
                  .timerCheck({ checkKey: keyValue })
                  .then(() => {
                    clearInterval(timer);
                    resolve();
                  })
                  .catch(() => {
                    indexNum++;
                    if (indexNum > 6) {
                      clearInterval(timer);
                      reject(new Error('检测超时'));
                    }
                  });
              }, 500);
            } else {
              reject(new Error('检测失败'));
            }
          })
          .catch(() => {
            reject(new Error('检测失败'));
          });
      });
    },
    // 获取列表
    getlist() {
      this.$api.groupmange
        .arealist({
          Type: this.activeName,
          GroupNameID: this.belongTeam === '' ? (this.$route.query.groupId || 0) : this.belongTeam,
          TemplatesID: this.gameMoudle === '' ? (this.$route.query.tempId || 0) : this.gameMoudle,
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
    // 所属分组下拉
    belongDrow() {
      this.$api.groupmange
        .belongDrow()
        .then((data) => {
          if (data.status === 200) {
            this.belongTeamdrow = data.data;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 游戏模板
    gameDrow() {
      this.$api.groupmange
        .gameDrow()
        .then((data) => {
          if (data.status === 200) {
            this.gameMoudledrow = data.data;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 多选发生变化
    selchange(data) {
      this.selectList = data.map((item) => {
        return { id: item.id };
      });
    },
    // 排序
    sortArea() {
      let flag = true;
      let arr1 = this.selectList.map((item) => {
        let sel = this.tableData.filter((li) => {
          return li.id === item.id;
        })[0];
        if (sel.sort === '') {
          flag = false;
        } else {
          return {
            id: item.id,
            sort: sel.sort
          };
        }
      });
      if (flag) {
        this.$api.groupmange
          .sortAreas(arr1)
          .then((data) => {
            if (data.status === 200) {
              this.$messageSuccess('排序成功！');
              this.getlist();
            }
          })
          .catch((err) => {
            this.$messageError(err.message);
          });
      } else {
        this.$messageError('排序不能为空！');
      }
    },
    // 多行删除
    sigleDelarea(selc) {
      this.$api.groupmange
        .delAreas(selc)
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
    handleClose(selc) {
      this.$confirm('删除分区将导致充值无法完成!')
        .then(() => {
          this.sigleDelarea(selc);
        })
        .catch((_) => { });
    },
    // 充值
    rechargeTeam(uuid) {
      var url = '';
      this.$api.groupmange
        .rechargeteam({
          typeId: 0
        })
        .then((data) => {
          if (data.status === 200) {
            url = data.data + '/recharge/' + uuid;
            // let oInput = document.createElement('input');
            // oInput.value = url;
            // document.body.appendChild(oInput);
            // oInput.select(); // 选择对象
            // document.execCommand('Copy'); // 执行浏览器复制命令
            // oInput.className = 'oInput';
            // oInput.style.display = 'none';
            // this.$messageSuccess('复制成功');
            // document.body.removeChild(oInput);
            window.open(url);
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 编辑分区
    editarea(id) {
      this.$router.push({ path: '/main/partinstallEdit', query: { id: id } });
    },
    // 显示加载弹窗：先检测单个分区，检测成功才打开弹窗
    async showdialog(id) {
      try {
        await this.checkBeforeLoad(id);
        this.dialog.id = id;
        this.dialog.show = true;
      } catch (err) {
        this.$messageError(err.message || '网关检测失败，无法加载分区');
      }
    },
    // 加载所选分区
    async handleLoad(selc) {
      if (!selc || selc.length === 0) {
        this.$messageError('请先选择要加载的分区');
        return;
      }
      const ids = selc.map(item => item.id);
      try {
        // 顺序检测每个分区，任一失败即中止
        for (const id of ids) {
          await this.checkBeforeLoad(id);
        }
        // 全部检测通过，打开加载弹窗并记录 ids
        this.dialog.ids = ids;
        this.dialog.id = '';
        this.dialog.show = true;
      } catch (err) {
        this.$messageError(err.message || '网关检测失败，无法加载');
      }
    },
    // 加载分区（循环调用单个接口）
    async loadingArea() {
      let ids = [];
      if (this.dialog.ids && this.dialog.ids.length > 0) {
        ids = this.dialog.ids;
      } else if (this.dialog.id) {
        ids = [this.dialog.id];
      }
      if (ids.length === 0) {
        this.$messageError('未指定分区');
        return;
      }
      try {
        for (let id of ids) {
          await this.$api.groupmange.loadingArea({
            id,
            partitionCmdType: this.dialog.checked
          });
        }
        this.$messageSuccess('加载成功！');
        this.dialog.show = false;
        this.dialog.ids = [];
        this.dialog.id = '';
      } catch (err) {
        this.$messageError(err.message || '加载失败！');
      }
    },
    // 弹框初始化
    dialoginit() {
      this.dialog.checked = 0;
      this.dialog.id = '';
      this.dialog.ids = [];
    },
    // clone分区
    areaClone(id) {
      this.$router.push({ path: '/main/partinstallClone', query: { id: id } });
    },
    // 补发订单
    toOrderreissue(id) {
      this.$router.push({ path: '/main/Orderreissue', query: { id: id } });
    },
    // 分区检测
    checklink(id, index) {
      if (this.checkflag) {
        this.checkflag = false;
        this.checkIndex = index;
        this.$api.groupmange
          .checkLink({
            partitionId: id
          })
          .then((data) => {
            if (data.status === 200) {
              let keyValue = data.data;
              let indexNum = 0;
              // this.$messageSuccess('检测成功！');
              this.timer = setInterval(() => {
                this.$api.groupmange
                  .timerCheck({
                    checkKey: keyValue
                  })
                  .then((data) => {
                    clearInterval(this.timer);
                    this.timer = null;
                    this.checkflag = true;
                    this.checkIndex = '';
                    this.$messageSuccess('检测成功！');
                  })
                  .catch(() => {
                    indexNum++;
                    if (indexNum > 6) {
                      clearInterval(this.timer);
                      this.timer = null;
                      this.checkflag = true;
                      this.checkIndex = '';
                      this.$messageError('检测失败！');
                    }
                  });
              }, 500);
            }
          })
          .catch(() => {
            this.checkflag = true;
            this.checkIndex = '';
            this.$messageError('检测失败！');
          });
      }
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
    if (this.$route.query.groupId) {
      this.belongTeam = this.$route.query.groupId;
    }
    if (this.$route.query.tempId) {
      this.gameMoudle = this.$route.query.tempId;
    }
    this.getlist();
    this.belongDrow();
    this.gameDrow();
    console.log(this.$store.state.settlementType);
    console.log(this.$store.state);
  }
};
</script>

<style lang="scss" scoped>
.gs_title {
  background: var(--theme-color);
}
.gs_title {
  background: var(--theme-color);
}
.el-button--mini, .el-button--mini.is-round {
    padding: 7px 8px;
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
        color: #87566a;
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

.padding_change {
  &::v-deep .el-table {
    .cell {
      padding-left: 5px;
      padding-right: 5px;

    }
  }
}</style>
