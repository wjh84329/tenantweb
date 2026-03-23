<!--
 * @Description: 个人中心
 * @Author: xu wei
 * @Date: 2020-03-07 15:43:10
 * @LastEditTime: 2020-06-23 18:08:56
 * @LastEditors: gao shuai
 -->
<template>
  <div class="partinstall">
    <div class="bg_fff pdb25">
      <!-- 基本资料 -->
      <div class="info-section">
        <div class="info-title">
          基本资料
          <!-- <span class="edit-link" @click="onEditBaseInfo">[编辑]</span> -->
        </div>
        <el-divider></el-divider>
        <table class="custom-table">
          <tr>
            <td class="th">用户ID：</td>
            <td>{{ baseInfo.id }}</td>
            <td class="th">用户UUID：</td>
            <td>{{ baseInfo.uuid }}</td>
          </tr>
          <tr>
            <td class="th">账号名：</td>
            <td>{{ baseInfo.account }}</td>
            <td class="th">联系人：</td>
            <!-- <td>{{ baseInfo.contact }}</td> -->
            <td style="display: flex;align-items: center;">
              <div>
                {{ baseInfo.contact }}
              </div>
              <div style="margin-left: 15px;">
                <el-button type="warning" size="small" plain @click="updateContact">修改</el-button>
              </div>
            </td>
          </tr>
          <!-- <tr>
            <td class="th">网站名称：</td>
            <td>{{ baseInfo.name }}</td>
            <td class="th">域名：</td>
            <td>{{ baseInfo.domain }}</td>
          </tr> -->
          <tr>
            <td class="th">联系QQ：</td>
            <!-- <td>{{ baseInfo.linkQQ }}</td> -->
            <td>
              <div style="display: flex;align-items: center;">
                <div>
                  {{ baseInfo.linkQQ }}
                </div>
                <div style="margin-left: 15px;">
                  <el-button type="warning" size="small" plain @click="updateQQ">修改</el-button>
                </div>
              </div>
            </td>
            <td class="th">邮箱：</td>
            <!-- <td>{{ baseInfo.email }}</td> -->
            <td>
              <div style="display: flex;align-items: center;">
                <div>
                  {{ baseInfo.email }}
                </div>
                <div style="margin-left: 15px;">
                  <el-button type="warning" size="small" plain @click="handleAction('邮箱认证')">修改</el-button>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td class="th">联系电话：</td>
            <!-- <td>{{ baseInfo.linkphone }}</td> -->
            <td>
              <div style="display: flex;align-items: center;">
                <div>
                  {{ baseInfo.linkphone }}
                </div>
                <div style="margin-left: 15px;">
                  <el-button type="warning" size="small" plain @click="handleAction('手机绑定')">修改</el-button>
                </div>
              </div>
            </td>
            <td class="th">签约状态：</td>
            <td>
              <el-button :disabled="addDisabled" @click="goqy" type="warning">{{ baseInfo.signStatus }}</el-button>
              <el-button v-if="openDisabled" @click="openurl" type="warning">{{ baseInfo.signStatu }}</el-button>
            </td>
          </tr>
          <!-- <tr>
            <td class="th">签约状态：</td>
            <td>{{ baseInfo.signStatus || '现在签约' }}</td>
            <td class="th"></td>
            <td></td>
          </tr> -->
        </table>
        <div class="info-tip">
          <span class="tip-red">
            注意：以上所有信息必须为本人真实资料，否则后续系统检测不匹配，将导致签署失败！
          </span>
        </div>
      </div>
      <!-- 结算银行 -->
      <div class="info-section" style="margin-top:24px;">
        <div class="info-title">结算银行<span class="edit-link" @click="goToOpenAccount">[开户]</span></div>
        <el-divider></el-divider>
        <table class="custom-table">
          <tr>
            <td class="th">开户银行：</td>
            <td>{{ accountInfo.bank }}</td>
            <td class="th">银行帐号：</td>
            <td>{{ accountInfo.bankcard }}</td>
          </tr>
          <tr>
            <td class="th">收款人：</td>
            <td>{{ accountInfo.userName }}</td>
            <td class="th">身份证：</td>
            <td>{{ accountInfo.idCard }}</td>
          </tr>
          <tr>
            <td class="th">银行预留电话：</td>
            <td>{{ accountInfo.phone }}</td>
            <td class="th">所在地区：</td>
            <td>{{ accountInfo.location }}</td>
          </tr>
        </table>
      </div>
      <div class="info-section" style="margin-top:24px;">
        <div class="info-title">收货地址
          <span class="edit-link">[收货地址为平台赠送节日礼物时给您邮寄的唯一地址，请认真填写，否则无法收货。您的信息我们会完全保密。]</span>
        </div>
        <el-divider></el-divider>
        <table class="custom-table">
          <tr>
            <td class="th">收货人姓名：</td>
            <td><el-input v-model="shInfo.name" placeholder="请输入内容"></el-input></td>
            <td class="th">收货人电话：</td>
            <td><el-input v-model="shInfo.phone" placeholder="请输入内容"></el-input></td>
          </tr>
          <tr>
            <td class="th">收货人所在省份：</td>
            <td><el-input v-model="shInfo.province" placeholder="请输入内容"></el-input></td>
            <td class="th">收货人所在城市：</td>
            <td><el-input v-model="shInfo.city" placeholder="请输入内容"></el-input></td>
          </tr>
          <tr>
            <td class="th">详细地址：</td>
            <td colspan="3">
              <div style="display: flex;">
                <el-input v-model="shInfo.address" placeholder="请输入内容"></el-input>
                <el-button size="small" type="warning" style="width: 15%;" @click="submitSh">保存</el-button>
              </div>
            </td>
          </tr>
        </table>
        <div class="info-tip">
          <span class="tip-red">
            提示：由于输入错误导致快递无法发货或者退货的情况，平台不再补发，请认真填写。
          </span>
        </div>
      </div>
    </div>
    <!-- 二级密码的确认 -->
    <el-dialog title="提示" :visible.sync="dialog.show" @close="dialog.secondPassword = ''" custom-class="gs_dialog"
      width="400px">
      <div class="passwordBox">
        <span class="tit">二级密码：</span>
        <div class="inputBox">
          <el-input style="width:220px;" type="password" size="small" v-model="dialog.secondPassword"
            placeholder="请输入二级密码"></el-input>
        </div>
      </div>
      <p class="tc pdb10">
        <el-button size="small" type="primary" @click="sureSeeaccount">确定</el-button>
        <el-button size="small" type="info" @click="dialog.show = false">取消</el-button>
      </p>
    </el-dialog>
    <el-dialog :title="dialogType === 'email' ? '邮箱认证' : '手机绑定'" :visible.sync="bindDialog.show" width="400px"
      @close="resetBindDialog">
      <el-form :model="bindDialog.form" label-width="80px">
        <el-form-item :label="dialogType === 'email' ? '邮箱' : '手机号'">
          <el-input v-model="bindDialog.form.account"
            :placeholder="dialogType === 'email' ? '请输入邮箱' : '请输入手机号'"></el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <div style="display: flex; ">
            <el-input v-model="bindDialog.form.code" placeholder="请输入验证码"
              style="width: 180px; margin-right: 10px;"></el-input>
            <el-button size="small" :disabled="bindDialog.codeSending" @click="sendCode">
              {{ bindDialog.codeSending ? bindDialog.countdown + 's后重发' : '发送验证码' }}
            </el-button>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="bindDialog.show = false">取消</el-button>
        <el-button type="primary" @click="confirmBind">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogType: '', // 'email' 或 'phone'
      baseInfo: {
        name: '', // 网站名称
        account: '', // 账号
        contact: '', // 联系人
        domain: '',
        linkQQ: '',
        email: '',
        linkphone: '',
        idCard: '',
        signStatus: '',
        isSigned: false,
        signStatu: '',
        signUrl: '',
        state: 0,
        id: 0,
        uuid: ''
      },
      bindDialog: {
        show: false,
        form: {
          account: '',
          code: ''
        },
        codeSending: false,
        countdown: 60
      },
      shInfo: {
        name: '',
        phone: '',
        province: '',
        city: '',
        address: ''
      },
      addDisabled: true,
      openDisabled: false,
      accountInfo: {
        bank: '',
        userName: '',
        bankcard: '',
        idCard: '',
        phone: '',
        location: '',
        eyeflag: false
      },
      dialog: {
        show: false,
        secondPassword: ''
      }
    };
  },
  methods: {
    goqy() {
      if (this.isSigned) {
        return;
      }
      if (this.accountInfo.bank === '') {
        this.$messageError('请先开户再进行签约操作');
        return;
      }
      this.$router.push({ path: '/personal/elecsign' });
    },
    handleAction(text) {
      if (text === '邮箱认证') {
        this.dialogType = 'email';
        this.bindDialog.show = true;
      } else if (text === '手机绑定') {
        this.dialogType = 'phone';
        this.bindDialog.show = true;
      }
    },
    sendCode() {
      if (!this.bindDialog.form.account) {
        this.$message.error(this.dialogType === 'email' ? '请输入邮箱' : '请输入手机号');
        return;
      }
      this.bindDialog.codeSending = true;
      this.bindDialog.countdown = 60;
      let params = {};
      if (this.dialogType === 'email') {
        params.Email = this.bindDialog.form.account;
      } else {
        params.Phone = this.bindDialog.form.account;
      }
      const api = this.dialogType === 'email'
        ? this.$api.personCenter.sendEmailCode
        : this.$api.personCenter.sendPhoneCode;
      api(params)
        .then(() => {
          this.$message.success('验证码已发送');
          this.startCountdown();
        })
        .catch(err => {
          this.$message.error(err.message);
          this.bindDialog.codeSending = false;
        });
    },
    startCountdown() {
      if (this.codeTimer) {
        clearInterval(this.codeTimer);
        this.codeTimer = null;
      }
      this.bindDialog.codeSending = true;
      this.bindDialog.countdown = 60;
      this.codeTimer = setInterval(() => {
        this.bindDialog.countdown -= 1;
        if (this.bindDialog.countdown <= 0) {
          clearInterval(this.codeTimer);
          this.codeTimer = null;
          this.bindDialog.codeSending = false;
          this.bindDialog.countdown = 60;
        }
      }, 1000);
    },
    confirmBind() {
      if (!this.bindDialog.form.account || !this.bindDialog.form.code) {
        this.$message.error('请填写完整信息');
        return;
      }
      let params = {};
      if (this.dialogType === 'email') {
        params.Email = this.bindDialog.form.account;
        params.Code = this.bindDialog.form.code;
      } else {
        params.Phone = this.bindDialog.form.account;
        params.Code = this.bindDialog.form.code;
      }
      const api = this.dialogType === 'email'
        ? this.$api.personCenter.bindEmail
        : this.$api.personCenter.bindPhone;
      api(params)
        .then(() => {
          this.$message.success('绑定成功');
          this.bindDialog.show = false;
          this.getUser();
        })
        .catch(err => {
          this.$message.error(err.message);
        });
    },
    resetBindDialog() {
      this.bindDialog.form.account = '';
      this.bindDialog.form.code = '';
      this.bindDialog.codeSending = false;
      this.bindDialog.countdown = 60;
    },
    // 获取用户信息
    getUser() {
      this.$api.home
        .getUserinfo()
        .then((data) => {
          this.baseInfo.name = data.data.siteName;
          this.baseInfo.account = data.data.userName;
          this.baseInfo.contact = data.data.nickName;
          this.baseInfo.domain = data.data.domain;
          this.baseInfo.linkQQ = data.data.qqNumber;
          this.baseInfo.email = data.data.email;
          this.baseInfo.linkphone = data.data.phoneNumber;
          this.baseInfo.idCard = data.data.idCard;
          this.baseInfo.signStatus = data.data.isSigned ? '已签约' : '现在签约';
          this.isSigned = data.data.isSigned;
          this.addDisabled = data.data.isSigned;
          this.baseInfo.signUrl = data.data.signUrl;
          this.baseInfo.state = data.data.signState ? data.data.signState : 0;
          this.baseInfo.id = data.data.id;
          this.baseInfo.uuid = data.data.uuid;
          if (this.baseInfo.state === 0) {
            this.addDisabled = false;
            this.baseInfo.signStatus = '现在签约';
          } else if (this.baseInfo.state === 4) {
            this.addDisabled = true;
            this.baseInfo.signStatus = '已签约';
            this.openDisabled = true;
            this.baseInfo.signStatu = '查看合同';
          } else if (this.baseInfo.state === 1 || this.baseInfo.state === 2 || this.baseInfo.state === 3) {
            this.addDisabled = true;
            this.baseInfo.signStatus = '签约中';
            this.openDisabled = true;
            this.baseInfo.signStatu = '查看合同';
          } else if (this.baseInfo.state === 5 || this.baseInfo.state === 6 || this.baseInfo.state === 7 || this.baseInfo.state === 8 || this.baseInfo.state === 9) {
            this.addDisabled = true;
            this.openDisabled = false;
            this.baseInfo.signStatus = '重新签约';
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    openurl() {
      window.open(this.baseInfo.signUrl);
    },
    // 跳转到开户页面（如需改为其它路由，请调整 path）
    goToOpenAccount() {
      this.$router.push({ path: '/personal/sharedetails' });
    },
    // 提交收货地址
    submitSh() {
      this.$api.personCenter
        .submitShAddress({
          name: this.shInfo.name,
          phone: this.shInfo.phone,
          province: this.shInfo.province,
          city: this.shInfo.city,
          address: this.shInfo.address
        })
        .then((data) => {
          if (data.status === 200) {
            this.$messageSuccess('保存成功');
          } else {
            this.$messageError(data.message);
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 获取用户银行信息
    getBankInfo() {
      this.$api.personCenter
        .bankInfo()
        .then((data) => {
          this.accountInfo.bank = data.data.bankName;
          this.accountInfo.userName = data.data.realName;
          this.accountInfo.bankcard = data.data.bankNumber;
          this.accountInfo.idCard = data.data.idNumber;
          this.accountInfo.phone = data.data.phone;
          this.accountInfo.location = data.data.bankBranch;
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    onEditBaseInfo() {
      // 跳转到「账号安全」页面
      // 路由配置中个人中心账号安全的 path 为 /personal/acountsafe
      this.$router.push({ path: '/personal/acountsafe' });
    },
    // 查看帐号信息
    seeaccount() {
      if (this.accountInfo.eyeflag) {
        this.accountInfo.eyeflag = false;
        this.getBankInfo();
      } else {
        this.dialog.show = true;
      }
    },
    // 输入二级密码后确认
    sureSeeaccount() {
      if (this.dialog.secondPassword === '') {
        this.$messageError('请输入二级密码！');
        return;
      }
      this.$api.personCenter
        .bankDetail({
          password: this.dialog.secondPassword
        })
        .then((data) => {
          if (data.status === 200) {
            this.accountInfo.bank = data.data.bankName;
            this.accountInfo.userName = data.data.realName;
            this.accountInfo.bankcard = data.data.bankNumber;
            this.accountInfo.location = data.data.bankBranch;
            this.accountInfo.eyeflag = true;
            this.dialog.show = false;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    updateContact() {
      this.$prompt('请输入昵称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: '邮箱格式不正确'
      }).then(({ value }) => {
        // this.$message({
        //   type: 'success',
        //   message: '你的昵称是: ' + value
        // });
        this.$api.personCenter
          .changeNickName({ nickName: value })
          .then((res) => {
            if (res.status === 200) {
              this.$messageSuccess('修改成功');
            } else {
              this.$messageError(res.message);
            }
            this.getUser();
          })
          .catch((err) => {
            this.$messageError(err.message);
          });
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '取消输入'
        // });
      });
    },
    updateQQ() {
      this.$prompt('请输入联系QQ', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
        // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: '邮箱格式不正确'
      }).then(({ value }) => {
        // this.$message({
        //   type: 'success',
        //   message: '你的联系QQ是: ' + value
        // });
        this.$api.personCenter
          .changeQQ({ qqNumber: value })
          .then((res) => {
            if (res.status === 200) {
              this.$messageSuccess('修改成功');
            } else {
              this.$messageError(res.message);
            }
            this.getUser();
          })
          .catch((err) => {
            this.$messageError(err.message);
          });
      }).catch(() => {
        // this.$message({
        //   type: 'info',
        //   message: '取消输入'
        // });
      });
    }
  },
  created() {
    this.getUser();
    this.getBankInfo();
  }
};
</script>

<style lang="scss" scoped>
.gs_title {
  background: var(--theme-color);
}

.info-section {
  margin-bottom: 18px;
  padding-top: 18px;
  padding-left: 10px;
  padding-right: 10px;
}

.info-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  display: flex;
  align-items: center;

  .edit-link {
    font-size: 13px;
    color: #3c8dbc;
    margin-left: 8px;
    cursor: pointer;
  }
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
  background: #f8fbff;
  margin-bottom: 0;
  font-size: 14px;

  th,
  td {
    border: 1px solid #dbe7f3;
    padding: 8px 14px;
    vertical-align: middle;
    background: #fff;
  }

  .th {
    background: #eaf3fc;
    color: #333;
    font-weight: 400;
    width: 120px;
    text-align: right;
    border-right: none;
  }

  td {
    min-width: 120px;
    color: #333;
    border-left: none;
  }

  tr td:last-child {
    border-right: 1px solid #dbe7f3;
  }
}

.info-tip {
  background: #f5f7fa;
  color: #ff0000;
  padding: 8px 16px;
  margin-top: 0;
  font-size: 14px;
  border: 1px solid #fbeee0;
}

.tip-red {
  color: #ff0000;
  font-weight: bold;
}

.passwordBox {
  padding-left: 20px;
  display: flex;
  flex-flow: row nowrap;
  padding-bottom: 16px;

  .tit {
    display: block;
    width: 100px;
    height: 32px;
    line-height: 32px;
  }
}
</style>
