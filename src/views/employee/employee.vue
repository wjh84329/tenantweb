<!--
 * @Description: 分组管理
 * @Author: xu wei
 * @Date: 2020-03-05 14:04:55
 * @LastEditTime: 2020-08-24 19:30:13
 * @LastEditors: gao shuai
 -->
<template>
  <div class="home">
    <div class="gs_title" style="color: white;">子账户管理</div>
    <div class="btnsbox fr mgt10" style="float: left;margin-left: 20px;">
      <el-button size='small' type="success" @click="subMerchant.dialog.show = true">添加子账户</el-button>
    </div>
    <div class="tablebox pdb15 pdt20">
      <div class="gs_tablebox">
        <el-table ref="moduleTable" size="mini" :data="subMerchant.tableData" border style="width: 100%" stripe>
          <el-table-column prop="name" label="注册时间" width="150">
            <template slot-scope="scope">
              <p style="height:18px;">{{ scope.row.joinDate ? scope.row.joinDate.split(' ')[0] : '' }}</p>
              <p style="color:#999;height:18px;">{{ scope.row.joinDate ? scope.row.joinDate.split(' ')[1] : '' }}</p>
            </template>
          </el-table-column>
          <el-table-column prop="nickName" label="昵称">
          </el-table-column>
          <el-table-column prop="userName" label="帐号">
          </el-table-column>

          <el-table-column prop="qqNumber" label="联系QQ">
          </el-table-column>

          <el-table-column prop="partitionsCount" label="最后登陆">
            <template slot-scope="scope">
              <p style="height:18px;">{{ scope.row.lastDate ? scope.row.lastDate.split(' ')[0] : '' }}</p>
              <p style="color:#999;height:18px;">{{ scope.row.lastDate ? scope.row.lastDate.split(' ')[1] : '' }}</p>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="230">
            <template slot-scope="scope">
              <el-button-group>
                <el-button size="mini" type="primary" @click="editgroup(scope.row.id, scope.row.name)">编辑分组</el-button>
                <el-button size="mini" type="warning" @click="editPermissions(scope.row)">编辑权限</el-button>
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
    <!-- 添加游戏分组弹框 -->
    <el-dialog title="编辑员工分组" :visible.sync="teamdata.show" @close="teamInit" custom-class="gs_dialog" width="400px">
      <div class="opeartbox">
        <ul class="clearfix">
          <li hidden>
            <span class='tit'>用户Id：</span>
            <span class="txtbox">
              <el-input size="small" v-model="teamdata.id"></el-input>
            </span>
          </li>
          <li>
            <span class="inputbox clearfix gs_checkbox pdt5" style="width: 700px">
              <el-checkbox-group class="fl" style="max-width: 600px" v-model="teamdata.teamlist" @change="teamchange">
                <el-checkbox v-for="(team, i) in teamdata.Options" :label="team.id" :key="'team' + i">{{ team.name
                  }}</el-checkbox>
              </el-checkbox-group>
              <el-checkbox class="fl mgl20" :indeterminate="teamdata.isIndeterminate" v-model="teamdata.teamAll"
                @change="teamAllChange">全选</el-checkbox>
            </span>
          </li>

        </ul>

      </div>
      <p class="tc pdt10 pdb10">
        <el-button size="small" type="primary" @click="addteam">确定</el-button>
        <el-button size="small" type="info" @click="teamdata.show = false">取消</el-button>
      </p>
    </el-dialog>

    <el-dialog title="编辑子账户权限" :visible.sync="permissionDialog.show" custom-class="gs_dialog" width="420px">
      <el-checkbox-group v-model="permissionDialog.permissions" class="permission-dialog-options">
        <el-checkbox :label="2">订单管理</el-checkbox>
        <el-checkbox :label="3">分区管理</el-checkbox>
        <el-checkbox :label="15">手动补发</el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="permissionDialog.show = false">取消</el-button>
        <el-button size="small" type="primary" @click="savePermissions">保存</el-button>
      </span>
    </el-dialog>

    <!-- 添加商户弹框 -->
    <el-dialog title="添加子账户" :visible.sync="subMerchant.dialog.show" @close="subMerchantInit" custom-class="gs_dialog"
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
          <li>
            <span class='tit'>账号权限：</span>
            <span class="txtbox subaccount-permissions">
              <el-checkbox-group v-model="subMerchant.dialog.permissions">
                <el-checkbox :label="2">订单管理</el-checkbox>
                <el-checkbox :label="3">分区管理</el-checkbox>
                <el-checkbox :label="15">手动补发</el-checkbox>
              </el-checkbox-group>
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
      loading: false, // 推广下载loading
      loadingIndex: '', // 推广下载index
      groupName: '', // 分组名称
      pageIndex: 1, // 页码
      pageSize: 20, // 每页的条数
      total: 0, // 总数据的条数
      permissionDialog: {
        show: false,
        id: 0,
        permissions: [2, 3, 15]
      },

      teamdata: {
        // 分组
        id: 0,
        show: false,
        teamAll: false,
        teamlist: [],
        Options: [], // 分组的多选list
        isIndeterminate: true
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
          permissions: [2, 3, 15]

        }
      }
    };
  },
  methods: {
    /* --------------------------------0.下属商户------------------------------- */
    // 下属商户列表
    getlist() {
      this.$api.employee
        .submerchantListz({
          PageNumber: this.subMerchant.pageIndex,
          PageSize: this.subMerchant.pageSize
        })
        .then((data) => {
          if (data.status === 204) {
            this.subMerchant.tableData = [];
            this.subMerchant.total = 0;
          } else if (data.status === 200) {
            this.subMerchant.tableData = data.data;
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
      }
      this.$api.employee
        .addMerchant({
          nickname: this.subMerchant.dialog.nickName,
          loginName: this.subMerchant.dialog.name,
          password: this.subMerchant.dialog.password,
          email: this.subMerchant.dialog.mail,
          qqNumber: this.subMerchant.dialog.qq,
          phoneNumber: this.subMerchant.dialog.phone,
          permissions: this.subMerchant.dialog.permissions

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
      this.subMerchant.dialog.permissions = [2, 3, 15];
      this.subMerchant.dialog.rate = ''; // 比率组
    },
    // 获取用户分组
    groupsdrow() {
      this.$api.partinstall
        .groupsdrow()
        .then((data) => {
          console.log(data.data);
          this.teamdata.Options = data.data;
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 安装成功后，页面数据初始化
    teamInit() {
      // 分组
      this.teamdata.id = 0;
      this.teamdata.show = false;
      this.teamdata.teamAll = false;
      this.teamdata.teamlist = [];
      this.teamdata.isIndeterminate = true;
    },
    // 分组多选的设置函数
    teamAllChange(val) {
      this.teamdata.teamlist = val
        ? this.teamdata.Options.map((item) => item.id)
        : [];
      this.teamdata.isIndeterminate = false;
    },
    teamchange(value) {
      let checkedCount = value.length;
      this.teamdata.teamAll = checkedCount === this.teamdata.Options.length;
      this.teamdata.isIndeterminate =
        checkedCount > 0 && checkedCount < this.teamdata.Options.length;
    },
    // 编辑分组
    editgroup(id, name) {
      // 查找当前员工
      const employee = this.subMerchant.tableData.find(item => item.id === id);
      // teamdata.Options 保持为所有分组（已在 groupsdrow 方法赋值）
      // teamdata.teamlist 赋值为当前员工拥有的分组 id
      if (employee && employee.groups) {
        this.teamdata.teamlist = employee.groups.map(group => group.sourceGroupId);
        console.log(this.teamdata.teamlist);
        this.teamdata.teamAll = this.teamdata.teamlist.length === this.teamdata.Options.length;
        this.teamdata.isIndeterminate = this.teamdata.teamlist.length > 0 && !this.teamdata.teamAll;
      } else {
        this.teamdata.teamlist = [];
        this.teamdata.teamAll = false;
        this.teamdata.isIndeterminate = false;
      }
      this.teamdata.id = id;
      this.teamdata.show = true;
    },
    // 添加分组
    addteam() {
      if (JSON.stringify(this.teamdata.teamlist) === '[]') {
        this.$messageError('请选择游戏分组！');
        return true;
      }
      this.$api.employee
        .addteam({
          id: this.teamdata.id,
          groups: this.teamdata.teamlist.map((item) => {
            return { id: item };
          })
        })
        .then((data) => {
          if (data.status === 200) {
            this.$messageSuccess('添加成功！');
            this.getlist();
            this.teamdata.show = false;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    editPermissions(row) {
      const permissions = (row.roleinfon || '2,3,15')
        .split(',')
        .map(value => Number(value))
        .filter(value => [2, 3, 15].includes(value));
      this.permissionDialog.id = row.id;
      this.permissionDialog.permissions = permissions;
      this.permissionDialog.show = true;
    },
    savePermissions() {
      this.$api.employee.updateSubAccountPermissions({
        id: this.permissionDialog.id,
        permissions: this.permissionDialog.permissions
      }).then(() => {
        this.$messageSuccess('权限更新成功！');
        this.permissionDialog.show = false;
        this.getlist();
      }).catch(err => {
        this.$messageError(err.message);
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
    }
  },
  created() {
    this.getlist();
    this.groupsdrow();
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
.permission-dialog-options {
  padding: 12px 20px;
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
