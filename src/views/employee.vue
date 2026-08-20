<!--
 * @Description: 分组管理
 * @Author: xu wei
 * @Date: 2020-03-05 14:04:55
 * @LastEditTime: 2020-08-24 19:30:13
 * @LastEditors: gao shuai
 -->
<template>
  <div class="home">
    <div class="gs_title" style="color: white;">员工管理</div>
    <div class="btnsbox mgt10" style="margin-left: 2%;">
      <el-button size='small' type="primary" @click="subMerchant.dialog.show = true">添加员工</el-button>
    </div>
    <div class="tablebox pdb15 pdt20">
      <div class="gs_tablebox">
        <el-table ref="moduleTable" size="mini" :data="subMerchant.tableData" border style="width: 100%" stripe>
          <el-table-column prop="joinDate" label="注册时间"  width="250">
            <!-- <template slot-scope="scope">
              <p style="height:18px;">{{ scope.row.joinDate ? scope.row.joinDate.split(' ')[0] : '' }}</p>
              <p style="color:#999;height:18px;">{{ scope.row.joinDate ? scope.row.joinDate.split(' ')[1] : '' }}</p>
            </template> -->
          </el-table-column>
          <el-table-column prop="nickName" label="昵称">
          </el-table-column>
          <el-table-column prop="userName" label="帐号">
          </el-table-column>

          <el-table-column prop="qqNumber" label="联系QQ">
          </el-table-column>

          <el-table-column label="所属分组" min-width="260">
            <template slot-scope="scope">
              <el-select
                v-model="scope.row.selectedGroupIds"
                multiple
                collapse-tags
                clearable
                size="small"
                placeholder="请选择分组"
                style="width: 230px"
                @change="queueEmployeeGroupSave(scope.row)"
              >
                <el-option
                  v-for="group in teamdata.Options"
                  :key="group.id"
                  :label="group.name"
                  :value="group.id"
                />
              </el-select>
            </template>
          </el-table-column>

          <el-table-column prop="partitionsCount" label="最后登陆">
            <template slot-scope="scope">
              <p style="height:18px;">{{ scope.row.lastDate ? scope.row.lastDate.split(' ')[0] : '' }}</p>
              <p style="color:#999;height:18px;">{{ scope.row.lastDate ? scope.row.lastDate.split(' ')[1] : '' }}</p>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button-group>
                <!-- <el-button size="mini" type="primary" @click="editgroup(scope.row.id, scope.row.name)">编辑分组</el-button> -->
                <el-button size="mini" type="danger" @click.prevent="handleClose(scope.row.id)">删除</el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="mgt15 pdl20">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background
          :page-sizes="[10, 20, 30, 40]" :current-page="subMerchant.pageIndex" :page-size="subMerchant.pageSize"
          layout="total, sizes, prev, pager, next, jumper" :total="subMerchant.total">
        </el-pagination>
      </div>
    </div>
    <!-- 添加商户弹框 -->
    <el-dialog title="添加员工" :visible.sync="subMerchant.dialog.show" @close="subMerchantInit" custom-class="gs_dialog"
      width="450px">
      <div class="opeartbox titwidth mgl30">
        <ul class="clearfix">
          <li>
            <span class='tit'>用户昵称：</span>
            <span class="txtbox">
              <el-input size="small" v-model="subMerchant.dialog.nickName"></el-input>
            </span>
          </li>
          <li>
            <span class='tit'>用户名：</span>
            <span class="txtbox">
              <el-input size="small" v-model="subMerchant.dialog.name" @keyup.native="noChinese"></el-input>
            </span>
          </li>
          <li>
            <span class='tit'>登录密码：</span>
            <span class="txtbox">
              <el-input size="small" v-model="subMerchant.dialog.password"></el-input>
            </span>
          </li>
          <li>
            <span class="tit">角色：</span>
            <span class="txtbox">
              <el-select v-model="subMerchant.dialog.roleId" placeholder="请选择角色" style="width: 200px">
                <el-option
                  v-for="role in roleOptions"
                  :key="role.id"
                  :label="role.name"
                  :value="role.id"
                />
              </el-select>
            </span>
          </li>
          <li>
            <span class='tit'>邮箱：</span>
            <span class="txtbox">
              <el-input size="small" v-model="subMerchant.dialog.mail"></el-input>
            </span>
          </li>
          <li>
            <span class='tit'>联系QQ：</span>
            <span class="txtbox">
              <el-input size="small" v-model="subMerchant.dialog.qq"></el-input>
            </span>
          </li>
          <li>
            <span class='tit'>联系电话：</span>
            <span class="txtbox">
              <el-input size="small" v-model="subMerchant.dialog.phone"></el-input>
            </span>
          </li>

        </ul>
        <p class="tc pdt10 pdb10">
          <el-button class="referring" size="small" type="primary" @click="addMerchant">提交</el-button>
          <el-button size="small" type="info" @click="subMerchant.dialog.show = false">取消</el-button>
        </p>
      </div>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      roleOptions: [], // 角色列表
      loading: false, // 推广下载loading
      loadingIndex: '', // 推广下载index
      groupName: '', // 分组名称
      pageIndex: 1, // 页码
      pageSize: 20, // 每页的条数
      total: 0, // 总数据的条数
      groupSaveTimers: {},

      teamdata: {
        Options: []
      },
      subMerchant: {
        pageIndex: 1, // 页码
        pageSize: 20, // 每页的条数
        total: 0, // 总数据的条数
        rateDraw: [], // 比率组下拉
        tableData: [],
        dialog: {
          show: false,
          nickName: '', // 昵称
          name: '', // 用户名
          password: '', // 登录密码
          mail: '', // 邮箱
          qq: '', // 联系qq
          phone: '', // 联系电话
          roleId: ''

        }
      }
    };
  },
  methods: {
    /* --------------------------------0.下属商户------------------------------- */
    // 下属商户列表
    getlist() {
      this.$api.employee
        .submerchantList({
          PageNumber: this.subMerchant.pageIndex,
          PageSize: this.subMerchant.pageSize
        })
        .then((data) => {
          if (data.status === 204) {
            this.subMerchant.tableData = [];
            this.subMerchant.total = 0;
          } else if (data.status === 200) {
            this.subMerchant.tableData = data.data.map(employee => ({
              ...employee,
              selectedGroupIds: (employee.groups || []).map(group => group.sourceGroupId)
            }));
            this.subMerchant.total = JSON.parse(
              data.headers['x-pagination']
            ).TotalCount;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },

    // 添加商户
    addMerchant() {
      if (this.subMerchant.dialog.nickName === '') {
        this.$messageError('请输入昵称！');
        return;
      } else if (this.subMerchant.dialog.name === '') {
        this.$messageError('请输入用户名！');
        return;
      } else if (this.subMerchant.dialog.password === '') {
        this.$messageError('请输入密码！');
        return;
      } else if (this.subMerchant.dialog.mail === '') {
        this.$messageError('请输入邮箱！');
        return;
      } else if (this.subMerchant.dialog.qq === '') {
        this.$messageError('请输入联系qq！');
        return;
      } else if (this.subMerchant.dialog.phone === '') {
        this.$messageError('请输入联系电话！');
        return;
      } else if (!this.subMerchant.dialog.roleId) {
        this.$messageError('请选择角色！');
        return;
      }
      this.$api.employee
        .addMerchant({
          nickname: this.subMerchant.dialog.nickName,
          loginName: this.subMerchant.dialog.name,
          password: this.subMerchant.dialog.password,
          email: this.subMerchant.dialog.mail,
          qqNumber: this.subMerchant.dialog.qq,
          phoneNumber: this.subMerchant.dialog.phone,
          roleId: this.subMerchant.dialog.roleId // 绑定下拉框选中的角色ID

        })
        .then((data) => {
          if (data.status === 200) {
            this.$messageSuccess('新增员工成功！');
            this.subMerchant.dialog.show = false;
            this.getlist();
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 添加商户弹框初始化
    subMerchantInit() {
      this.subMerchant.dialog.nickName = ''; // 昵称
      this.subMerchant.dialog.name = ''; // 用户名
      this.subMerchant.dialog.password = ''; // 登录密码
      this.subMerchant.dialog.mail = ''; // 登录密码
      this.subMerchant.dialog.qq = ''; // 联系qq
      this.subMerchant.dialog.phone = ''; // 联系电话
      this.subMerchant.dialog.roleId = '';
      this.subMerchant.dialog.rate = ''; // 比率组
    },
    // 获取用户分组
    groupsdrow() {
      this.$api.partinstall
        .groupsdrow()
        .then((data) => {
          this.teamdata.Options = data.status === 200 ? data.data : [];
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    queueEmployeeGroupSave(employee) {
      clearTimeout(this.groupSaveTimers[employee.id]);
      this.groupSaveTimers[employee.id] = setTimeout(() => {
        this.saveEmployeeGroups(employee);
      }, 400);
    },
    saveEmployeeGroups(employee) {
      delete this.groupSaveTimers[employee.id];
      this.$api.employee
        .addteam({
          id: employee.id,
          groups: employee.selectedGroupIds.map(id => ({ id }))
        })
        .then((data) => {
          if (data.status === 200) {
            this.$messageSuccess('员工分组已更新！');
            this.getlist();
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
          this.getlist();
        });
    },
    // 用户名不能中文
    noChinese() {
      this.subMerchant.dialog.name = this.subMerchant.dialog.name.replace(
        /[\u4E00-\u9FA5]/g,
        ''
      );
    },
    // 删除选中行
    handleClose(id) {
      this.$confirm('删除后数据将无法恢复，是否确定？')
        .then(() => {
          this.delMerchant(id);
        })
        .catch(() => { });
    },
    // 删除商户
    delMerchant(id) {
      this.$api.agent
        .delMerchant({
          merchantId: id
        })
        .then((data) => {
          if (data.status === 200) {
            this.$messageSuccess('删除成功！');
            if (this.subMerchant.tableData.length === 1) {
              this.subMerchant.pageIndex =
                this.subMerchant.pageIndex === 1
                  ? 1
                  : this.subMerchant.pageIndex - 1;
            }
            this.getlist();
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 当每页条数变化时
    handleSizeChange(data) {
      this.subMerchant.pageSize = data;
      this.subMerchant.pageIndex = 1;
      this.getlist();
    },
    // 当前的页码变化时
    handleCurrentChange(data) {
      this.subMerchant.pageIndex = data;
      this.getlist();
    },
    // 获取角色列表
    // ...existing code...
    getRoleList() {
      this.$api.employee
        .getRole({ pageSize: 999 })
        .then((data) => {
          // 假设接口返回 { data: { data: [...] } }
          this.roleOptions = Array.isArray(data.data.data) ? data.data.data : [];
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    }
  },
  created() {
    this.getlist();
    this.groupsdrow();
    this.getRoleList();
  },
  beforeDestroy() {
    Object.keys(this.groupSaveTimers || {}).forEach(id => {
      clearTimeout(this.groupSaveTimers[id]);
    });
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

.gs_tabbox {
  .tabbox {
    float: none;
  }
}

.opeartbox {
  padding: 15px 20px 5px;
  background: #fff;

  &.titwidth {
    ul {
      li {
        .tit {
          display: inline-block;
          width: 80px;
        }
      }
    }
  }

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

.orderForm {
  // margin-top: 10px;
  background: #fff;
  padding-top: 5px;
  padding-bottom: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background-color: #d9edf7;
  color: #999;
}

.font {
  color: #06859a;
  font-size: 15px;
  // font-weight: bold;
}

.weight {
  width: 18%;
  padding-bottom: 5px;
  color: #06859a;
  font-size: 15px;
  // font-weight: bold;
}

@keyframes progress-bar-stripes {
  from {
    background-position: 40px 0;
  }

  to {
    background-position: 0 0;
  }
}

.progressBox {
  height: 16px;
  background: #bbb;
  position: relative;

  .textbox {
    position: absolute;
    top: 0;
    left: 50%;
    height: 16px;
    line-height: 16px;
    color: #fff;
  }

  .progressBar {
    height: 100%;
    width: 0;
    background: #67c23a;
    background-image: linear-gradient(45deg,
        rgba(255, 255, 255, 0.2) 25%,
        transparent 25%,
        transparent 50%,
        rgba(255, 255, 255, 0.2) 50%,
        rgba(255, 255, 255, 0.2) 75%,
        transparent 75%,
        transparent);
    background-size: 40px 40px;
    animation: progress-bar-stripes 2s linear infinite;
    transition: all ease-out 0.3s;
  }
}

.roadlist {
  border: 1px solid #ccc;
  width: 753px;

  li {
    float: left;
    width: 250px;
    height: 40px;
    text-align: center;
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
    margin-bottom: -1px;

    &:nth-child(3n + 2) {
      border-right: none;
    }

    .tit {
      display: inline-block;
      vertical-align: middle;
      height: 40px;
      line-height: 40px;
      text-align: center;
    }

    .content {
      display: inline-block;
      vertical-align: middle;
      width: 100px;
      height: 32px;
      padding: 4px 9px;
      text-align: center;
    }
  }
}

.stateColor {
  background: red;
  // margin-left: 20px;
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

.checkdetail {
  cursor: pointer;

  &:hover {
    color: #0099ff;
    text-decoration: underline;
  }
}

.dialogOrder {
  padding-bottom: 20px;

  table {
    width: 100%;

    tr {
      td {
        border: 1px solid #ccc;
        text-align: center;
        height: 40px;
        color: #008194;

        &.tit {
          background: #edfdff;
          color: #6f6f6f;
          font-weight: bold;
          width: 100px;
        }
      }
    }
  }
}
</style>
