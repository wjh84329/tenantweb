<!--
 * @Description: 代理系统
 * @Author: gao shuai
 * @Date: 2020-05-18 09:46:49
 * @LastEditTime: 2020-08-24 15:20:31
 * @LastEditors: gao shuai
-->

<template>
  <div class="home">
    <div class="gs_title" style="color: white;margin-bottom: initial;">下属商户</div>
    <div class="gs_tabbox clearfix mgt15">
      <div class="tabbox">
        <div class="tablebox pdb15 pdt10 bg_fff">
          <div class="clearfix pdb10" style="margin-left: 2%;">
            <p class="mgr10">
              <el-button size='small' type="primary" @click="subMerchant.dialog.show = true">添加商户</el-button>
            </p>
          </div>
          <div class="gs_tablebox">
            <el-table ref="moduleTable" size="mini" :data="subMerchant.tableData" border style="width: 100%" stripe>
              <el-table-column prop="name" label="注册时间" width="140">
                <template slot-scope="scope">
                  <p style="height:18px;">{{scope.row.joinDate?scope.row.joinDate.split(' ')[0]:''}}</p>
                  <p style="color:#999;height:18px;">{{scope.row.joinDate?scope.row.joinDate.split(' ')[1]:''}}</p>
                </template>
              </el-table-column>
              <el-table-column prop="nickName" label="昵称">
              </el-table-column>
              <el-table-column prop="userName" label="帐号">
              </el-table-column>
              <el-table-column prop="desc" label="备注">
              </el-table-column>
              <el-table-column prop="partitionCount" label="分区个数">
              </el-table-column>
              <!-- <el-table-column prop="qqNumber" label="联系QQ" width="120">
              </el-table-column> -->
              <el-table-column prop="partitionsCount" label="结算类型">
                <template slot-scope="scope">
                  <span>{{'T+'+scope.row.settlementType}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="partitionsCount" label="最后登陆" width="140">
                <template slot-scope="scope">
                  <p style="height:18px;">{{scope.row.lastDate?scope.row.lastDate.split(' ')[0]:''}}</p>
                  <p style="color:#999;height:18px;">{{scope.row.lastDate?scope.row.lastDate.split(' ')[1]:''}}</p>
                </template>
              </el-table-column>
              <el-table-column label="状态" width="70">
                <template slot-scope="scope">
                  <el-switch v-model="scope.row.state" :active-value="1" :inactive-value="0" active-color="#13ce66" inactive-color="#ff4949" @change="stateChange(scope.row.id)"></el-switch>
                </template>
              </el-table-column>
              <el-table-column label="比率组" width="140">
                <template slot-scope="scope">
                  <el-select v-model="scope.row.rankId" size="small" @change="rateChange(scope.row.id,scope.row.rankId)">
                    <el-option label="请选择" :value="0"></el-option>
                    <el-option v-for="(item,i) in subMerchant.rateDraw" :key="'modeofpayment'+i" :label="item.name" :value="item.id"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="240">
                <template slot-scope="scope">
                  <el-button-group>
                    <el-button size="mini" type="primary" @click="merchantLogin(scope.row.id)">登录</el-button>
                    <el-button size="mini" type="warning" @click="updateDesc(scope.row.id, scope.row.desc)">修改备注</el-button>
                    <el-button size="mini" type="danger" @click="handleClose(scope.row.id)">删除</el-button>
                  </el-button-group>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="mgt15 pdl20">
            <el-pagination @size-change="handleSizeChange0" @current-change="handleCurrentChange0" background :page-sizes="[10, 20, 30, 40]" :current-page="subMerchant.pageIndex" :page-size="subMerchant.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="subMerchant.total">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
    <!-- 添加商户弹框 -->
    <el-dialog title="添加商户" :visible.sync="subMerchant.dialog.show" @close="subMerchantInit" custom-class="gs_dialog" width="450px">
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
            <span class='tit'>比率组：</span>
            <span class="txtbox" style="width:200px;">
              <el-select v-model="subMerchant.dialog.rate" clearable size="small" placeholder="请选择">
                <el-option v-for="(item,i) in subMerchant.rateDraw" :key="'modeofpayment'+i" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </span>
          </li>
          <li>
            <span class='tit'>备注：</span>
            <span class="txtbox">
              <el-input size="small" v-model="subMerchant.dialog.remark"></el-input>
            </span>
          </li>
        </ul>
        <p class="tc pdt10 pdb10">
          <el-button class="referring" size="small" type="primary" @click="addMerchant">提交</el-button>
          <el-button size="small" type="info" @click="subMerchant.dialog.show=false">取消</el-button>
        </p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { loginUrl } from '../../assets/js/version';
export default {
  inject: ['reload'],
  data() {
    return {
      activeName: '0',
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
          rate: '', // 比率组
          remark: '无' // 备注
        }
      }
    };
  },
  methods: {
    /* --------------------------------0.下属商户------------------------------- */
    // 下属商户列表
    getlist() {
      this.$api.agent
        .submerchantList({
          PageNumber: this.subMerchant.pageIndex,
          PageSize: this.subMerchant.pageSize
        })
        .then((data) => {
          if (data.status === 204) {
            this.subMerchant.tableData = [];
            this.subMerchant.total = 0;
          } else if (data.status === 200) {
            this.subMerchant.tableData = data.data;
            //
            this.subMerchant.total = JSON.parse(
              data.headers['x-pagination']
            ).TotalCount;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 修改备注
    updateDesc(id, desc) {
      this.$prompt('请输入备注信息', '修改备注', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputValue: desc
        // inputPattern: /[\S]+/,
        // inputErrorMessage: '备注不能为空'
      })
        .then(({ value }) => {
          this.$api.agent
            .updateMerchantDesc({
              id: id,
              desc: value
            })
            .then((data) => {
              if (data.status === 200) {
                this.$messageSuccess('修改成功！');
                this.getlist();
              }
            })
            .catch((err) => {
              this.$messageError(err.message);
            });
        })
        .catch(() => {});
    },
    // 比率组下拉
    rankDraw() {
      this.$api.agent
        .rankDraw()
        .then((data) => {
          if (data.status === 200) {
            this.subMerchant.rateDraw = data.data;
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
      } else if (this.subMerchant.dialog.rate === '') {
        this.$messageError('请选择比率组！');
        return;
      }
      this.$api.agent
        .addMerchant({
          nickname: this.subMerchant.dialog.nickName,
          loginName: this.subMerchant.dialog.name,
          password: this.subMerchant.dialog.password,
          email: this.subMerchant.dialog.mail,
          qqNumber: this.subMerchant.dialog.qq,
          phoneNumber: this.subMerchant.dialog.phone,
          rankId: this.subMerchant.dialog.rate,
          desc: this.subMerchant.dialog.remark
        })
        .then((data) => {
          if (data.status === 200) {
            this.$messageSuccess('新增商户成功！');
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
      this.subMerchant.dialog.rate = ''; // 比率组
    },
    // 切换商户状态
    stateChange(id) {
      this.$api.agent
        .stateChange({
          merchantId: id
        })
        .then((data) => {
          if (data.status === 200) {
            this.$messageSuccess('操作成功！');
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 比率组切换
    rateChange(id, val) {
      if (val !== 0) {
        this.$api.agent
          .rankChange({
            merchantId: id,
            rankId: val
          })
          .then((data) => {
            if (data.status === 200) {
              this.$messageSuccess('设置成功！');
              this.getlist();
            }
          })
          .catch((err) => {
            this.$messageError(err.message);
          });
      }
    },
    // 登录
    merchantLogin(id) {
      var tempwindow = window.open();
      // tempwindow.location = loginUrl + '/#/agentLogin?agentMerchantId=' + id;
      this.$api.agent
        .agentLogin({
          merchantId: id
        })
        .then((data) => {
          if (data.status === 200) {
            tempwindow.location =
              loginUrl + '/#/agentLogin?agentMerchantId=' + id;
            // this.reload();
          }
        })
        .catch((err) => {
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
        .catch(() => {});
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
    handleSizeChange0(data) {
      this.subMerchant.pageSize = data;
      this.subMerchant.pageIndex = 1;
      this.getlist();
    },
    // 当前的页码变化时
    handleCurrentChange0(data) {
      this.subMerchant.pageIndex = data;
      this.getlist();
    }
  },
  created() {
    this.getlist();
    this.rankDraw();
  }
};
</script>

<style lang="scss" scoped>
.gs_title {
  background: var(--theme-color);
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
    background-image: linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.2) 75%,
      transparent 75%,
      transparent
    );
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
