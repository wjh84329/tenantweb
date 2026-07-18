<!--
 * @Description: 帐户安全
 * @Author: xu wei
 * @Date: 2020-03-05 14:42:45
 * @LastEditTime: 2020-06-17 16:24:58
 * @LastEditors: gao shuai
 -->
<template>
  <div class="home">
    <div class="person_tit">安全中心</div>
    <el-table :data="tableData" border style="width: 100%;padding-left: 2%;padding-right: 2%;">
      <el-table-column prop="date" label="绑定项目" min-width="180">

      </el-table-column>
      <el-table-column prop="name" label="状态" min-width="180">

      </el-table-column>
      <el-table-column prop="address" label="操作" min-width="180">
        <template slot-scope="scope">
          <el-button type="text" @click="handleAction(scope.row)">
            {{ scope.row.address }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="person_tit" style="margin-top: 5%;">帐户安全</div>
    <div class="ipbox">
      <el-row type="flex" justify="center" style="line-height: 50px;">
        <el-col :span="4">
          <div class="mgr15" style="text-align: right;width: 100%;">登录选项：</div>
        </el-col>
        <el-col :span="8">
          <p class="">
            <span class="inputbox pdt5">
              <el-radio-group v-model="loginType">
                <el-radio style="margin-right: initial;color: #ff4440 !important;" :label="0">网站登录</el-radio>
                <el-radio style="margin-right: initial;color: blue;" :label="1">扫码登录</el-radio>
                <el-radio style="margin-right: initial;color: green;" :label="2">网站+扫码登录</el-radio>
              </el-radio-group>
            </span>
          </p>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" style="line-height: 50px;">
        <el-col :span="4">
          <div class="mgr15" style="text-align: right;width: 100%;">异地登录验证：</div>
        </el-col>
        <el-col :span="8">
          <p class="">
            <span class="inputbox pdt5">
              <el-checkbox v-model="isLoginChecked" @change="handleLoginCheckChange">启用异地登录验证(开启该功能需绑定微信)</el-checkbox>
            </span>
          </p>
        </el-col>
      </el-row>
      <el-row type="flex" justify="center" style="line-height: 50px;">
        <el-col :span="4">
          <div class="mgr15" style="text-align: right;width: 100%;">启用安全IP：</div>
        </el-col>
        <el-col :span="8">
          <p class="">
            <span class="inputbox pdt5">
              <el-checkbox v-model="checked">启用安全IP登录</el-checkbox>
            </span>
          </p>
        </el-col>
      </el-row>
      <div style="display: flex;flex-direction: column;align-items: center;">
        <!-- <el-checkbox v-model="checked">限制登录账户的计算机IP</el-checkbox> -->
        <p class="tip">请确保你的计算机在公网拥有固定输入的IP，而不是动态分配的，如ADSL</p>
        <div class="iplistBox">
          <div class="tit">授权IP :</div>
          <div class="addBox">
            <el-tag :key="tag" v-for="(tag, i) in ipList" closable :disable-transitions="false"
              @close="handleClose(tag, i)">
              {{ tag }}
            </el-tag>
            <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small"
              @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
            </el-input>
            <el-button class="button-new-tag" size="small" @click="showInput">+ 增加授权ip</el-button>
          </div>
        </div>
        <p class="btnBox">
          <el-button size="small" type="primary" @click="openSaveDialog">确定保存</el-button>
        </p>
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
      checked: false,
      ipList: [],
      inputVisible: false,
      inputValue: '',
      loginType: 0,
      isLoginChecked: false,
      dialog: {
        show: false,
        secondPassword: ''
      },
      tableData: [{
        date: '安全码',
        name: '未设置',
        address: '前往设定'
      },
      // {
      //   date: '邮箱认证',
      //   name: '未认证',
      //   address: '前往认证邮箱'
      // },
      // {
      //   date: '手机绑定',
      //   name: '未绑定',
      //   address: '前往绑定手机'
      // },
      {
        date: '密钥',
        name: '已设定',
        address: '前往设定'
      }
      ],
      bindDialog: {
        show: false,
        form: {
          account: '',
          code: ''
        },
        codeSending: false,
        countdown: 60
      },
      dialogType: '' // 'email' 或 'phone'
    };
  },
  methods: {
    normalizeBool(value) {
      return value === true || value === 'true' || value === 1 || value === '1';
    },
    isValidIpv4(ip) {
      return /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/.test(ip);
    },
    async ensureWechatBound(shouldPrompt = true) {
      try {
        const data = await this.$api.personCenter.isBandweixi();
        const isBound = this.normalizeBool(data.data);
        if (!isBound && shouldPrompt) {
          this.$confirm('开启异地登录验证前需要先绑定微信，是否前往绑定微信页面？', '提示', {
            type: 'warning'
          }).then(() => {
            this.$router.push('/personal/weixin');
          }).catch(() => {});
        }
        return isBound;
      } catch (err) {
        this.$messageError(err.message);
        return false;
      }
    },
    // 获取用户信息
    getUser() {
      this.$api.home
        .getUserinfo()
        .then(data => {
          // console.log(data);
          this.tableData[0].name = data.data.secondaryPassword ? '已设置' : '未设置';
          this.tableData[0].address = data.data.secondaryPassword ? '修改安全码' : '前往设定';
          // this.tableData[1].name = data.data.email ? '已认证' : '未认证';
          // this.tableData[1].address = data.data.email ? '修改认证邮箱' : '前往认证邮箱';
          // this.tableData[2].name = data.data.phoneNumber ? '已绑定' : '未绑定';
          // this.tableData[2].address = data.data.phoneNumber ? '修改绑定手机' : '前往绑定手机';
          this.tableData[1].name = data.data.secretKey ? '已设定' : '未设定';
          this.tableData[1].address = data.data.secretKey ? '修改密钥' : '前往设定';
        })
        .catch(err => {
          this.$messageError(err.message);
        });
    },
    // 获取商户安全IP
    getSafeIp() {
      this.$api.personCenter
        .getsafeIp()
        .then((data) => {
          if (data.status === 200) {
            this.checked = this.normalizeBool(data.data.isOpenSecurityLimit);
            this.ipList = Array.isArray(data.data.securityIp)
              ? data.data.securityIp.map(item => (item || '').trim()).filter(Boolean)
              : [];
            this.loginType = [0, 1, 2].includes(data.data.loginType) ? data.data.loginType : 2;
            this.isLoginChecked = this.normalizeBool(data.data.isLoginChecked);
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    async handleLoginCheckChange(value) {
      if (!value) {
        return;
      }
      const isBound = await this.ensureWechatBound(true);
      if (!isBound) {
        this.isLoginChecked = false;
      }
    },
    async openSaveDialog() {
      if (this.checked && this.ipList.length === 0) {
        this.$messageError('开启安全IP登录前，请先添加授权IP！');
        return;
      }
      const invalidIp = this.ipList.find(ip => !this.isValidIpv4(ip));
      if (invalidIp) {
        this.$messageError(`授权IP格式不正确：${invalidIp}`);
        return;
      }
      if (this.isLoginChecked) {
        const isBound = await this.ensureWechatBound(true);
        if (!isBound) {
          this.isLoginChecked = false;
          return;
        }
      }
      this.dialog.show = true;
    },
    // 输入二级密码后确认
    async sureSeeaccount() {
      if (this.dialog.secondPassword === '') {
        this.$messageError('请输入二级密码！');
        return;
      }
      if (this.isLoginChecked) {
        const isBound = await this.ensureWechatBound(true);
        if (!isBound) {
          this.isLoginChecked = false;
          return;
        }
      }
      this.$api.personCenter
        .setsafeIp({
          tenantSafetyIP: {
            isOpenSecurityLimit: this.checked,
            securityIp: this.ipList,
            loginType: this.loginType,
            isLoginChecked: this.isLoginChecked
          },
          password: this.dialog.secondPassword
        })
        .then((data) => {
          if (data.status === 200) {
            this.$messageSuccess('设置成功！');
            this.dialog.show = false;
            this.getSafeIp();
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 一篮子增加IP
    handleClose(tag, index) {
      this.ipList.splice(index, 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick((_) => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      const inputValue = (this.inputValue || '').trim();
      if (inputValue) {
        if (!this.isValidIpv4(inputValue)) {
          this.$messageError('请输入正确的IPv4地址！');
          this.inputValue = '';
          this.inputVisible = false;
          return;
        }
        if (this.ipList.includes(inputValue)) {
          this.$messageError('该授权IP已存在，无需重复添加！');
          this.inputValue = '';
          this.inputVisible = false;
          return;
        }
        this.ipList.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    handleAction(row) {
      if (row.date === '邮箱认证') {
        this.dialogType = 'email';
        this.bindDialog.show = true;
      } else if (row.date === '手机绑定') {
        this.dialogType = 'phone';
        this.bindDialog.show = true;
      } else if (row.date === '安全码') {
        this.$router.push('/personal/password');
      } else if (row.date === '密钥') {
        this.$router.push('/main/conectKey');
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
      const timer = setInterval(() => {
        this.bindDialog.countdown--;
        if (this.bindDialog.countdown <= 0) {
          clearInterval(timer);
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
    }
  },
  created() {
    this.getSafeIp();
    this.getUser();
  }
};
</script>

<style lang="scss" scoped>
.gs_title {
  background: var(--theme-color);
}

.ipbox {
  background: #fff;
  padding: 0 30px 20px;

  .tip {
    font-size: 15px;
    color: #333;
    margin: 10px 0;
  }

  .iplistBox {
    display: flex;
    flex-flow: row nowrap;

    .tit {
      width: 120px;
      padding-left: 20px;
      line-height: 32px;
    }

    .addBox {
      width: 150px;

      &::v-deep .el-tag {
        position: relative;
        display: block;
        margin-bottom: 10px;
        padding-right: 30px;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        .el-icon-close {
          right: 5px;
          top: 8px;
          position: absolute;
        }
      }

      .input-new-tag {
        margin-bottom: 10px;
      }
    }
  }

  .btnBox {
    padding-left: 140px;
    margin-top: 20px;
  }
}

.person_tit {
  color: #3c8dbc;
  padding: 10px 0px;
  font-weight: bold;
  font-size: 15px;
  background: #fff;
  padding-left: 20px;
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
