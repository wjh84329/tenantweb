<template>
  <div class="register-shell">
    <login-header></login-header>

    <main class="register-main">
      <section class="register-hero">
        <div class="register-copy">
          <h1>入驻流程</h1>
          <p>简单三步，快速开启您的商户之旅</p>
          <div class="register-flow">
            <div class="register-flow-item">
              <div class="register-flow-icon">
                <img src="../../assets/newUi/register-flow-icon-1.png" alt="" />
              </div>
              <div class="register-flow-body">
                <b>01</b>
                <strong>填写资料</strong>
                <span>填写商户基本信息，设置账号与联系方式</span>
              </div>
            </div>
            <div class="register-flow-item">
              <div class="register-flow-icon">
                <img src="../../assets/newUi/register-flow-icon-2.png" alt="" />
              </div>
              <div class="register-flow-body">
                <b>02</b>
                <strong>身份校验</strong>
                <span>完成信息校验，确保账户安全可靠</span>
              </div>
            </div>
            <div class="register-flow-item">
              <div class="register-flow-icon">
                <img src="../../assets/newUi/register-flow-icon-3.png" alt="" />
              </div>
              <div class="register-flow-body">
                <b>03</b>
                <strong>等待审核</strong>
                <span>提交资料后，工作人员将尽快审核</span>
              </div>
            </div>
          </div>
        </div>

        <div class="register-panel">
          <div class="register-panel-head">
            <h2>创建商户账号</h2>
            <p>请如实填写以下信息，带 <em>*</em> 为必填项</p>
          </div>

          <div class="register-grid">
            <label class="reg-field">
              <span class="required">用户名</span>
              <el-input
                class="reg-input"
                v-model="account"
                placeholder="用户名由3-18个英文字母或数字组成"
                @input="checkAccount"
                @blur="checkAccount1"
              ></el-input>
              <em v-if="!checkflag1">用户名格式不正确</em>
            </label>

            <label class="reg-field">
              <span class="required">商户昵称</span>
              <el-input
                class="reg-input"
                v-model="niceName"
                placeholder="请输入商户昵称（2-8个字符）"
                @input="checkniceName"
                @blur="checkniceName1"
              ></el-input>
              <em v-if="!checkflag2">商户昵称至少2个字符</em>
            </label>

            <label class="reg-field">
              <span class="required">密码</span>
              <el-input
                class="reg-input"
                type="password"
                v-model="password"
                placeholder="密码长度6-20个字符"
                @input="checkpassword"
                @blur="checkpassword1"
              ></el-input>
              <em v-if="!checkflag3">密码长度需为6-20个字符</em>
            </label>

            <label class="reg-field">
              <span class="required">确认密码</span>
              <el-input
                class="reg-input"
                type="password"
                v-model="surePassword"
                placeholder="请再次输入密码"
              ></el-input>
            </label>

            <label class="reg-field">
              <span>QQ</span>
              <el-input
                class="reg-input"
                v-model="qq"
                placeholder="请输入联系QQ（选填）"
                @input="qq = intNumber(qq)"
              ></el-input>
            </label>

            <label class="reg-field">
              <span class="required">邮箱</span>
              <el-input
                class="reg-input"
                v-model="mails"
                placeholder="请输入邮箱"
                @blur="checkmail"
              ></el-input>
              <em v-if="!checkflag4">邮箱格式不正确</em>
            </label>

            <label class="reg-field">
              <span class="required">手机号</span>
              <el-input
                class="reg-input"
                v-model="phone"
                placeholder="请输入常用手机号"
                @blur="checkphone"
              ></el-input>
              <em v-if="!checkflag5">手机格式不正确</em>
            </label>

            <label class="reg-field reg-captcha-field">
              <span class="required">验证码</span>
              <div class="reg-captcha">
                <el-input
                  class="reg-input"
                  v-model="validcode"
                  placeholder="请输入图形验证码"
                ></el-input>
                <a href="javascript:;" @click.prevent="getRandomCode">
                  <img class="yzm" id="code" :src="randomCode" alt="" />
                </a>
              </div>
            </label>
          </div>

          <div class="register-actions">
            <el-button class="register-submit" type="primary" @click="submit">
              立即注册
            </el-button>
            <el-button class="register-back" @click="singin">
              返回登录
            </el-button>
          </div>
        </div>
      </section>
    </main>

    <login-footer></login-footer>

    <div class="dialogContainer" v-if="dialog.show">
      <div class="dialogbox">
        <div class="close" @click="dialog.show = false"></div>
        <div class="dialog-head">
          <span class="dialog-status">REGISTRATION COMPLETE</span>
          <h2 class="tit">注册申请已提交</h2>
          <p>账号资料提交成功，请完成审核后登录</p>
        </div>
        <div class="box">
          <p class="text">请联系工作人员进行审核</p>
          <div class="service-list" v-if="serverQQ.length">
            <a
              v-for="(item, i) in serverQQ"
              :key="'qq' + i"
              class="service-qq"
              :href="'https://wpa.qq.com/msgrd?v=3&uin=' + item.qq + '&site=qq&menu=yes'"
              target="_blank"
            >
              <span class="service-qq__icon">QQ</span>
              <span class="service-qq__label">联系审核客服</span>
              <strong>{{ item.qq }}</strong>
            </a>
          </div>
          <p v-else class="service-empty">请联系平台客服完成审核</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loginFooter from '../../components/loginFooter';
import loginHeader from '../../components/loginHeader';

export default {
  components: {
    loginFooter,
    loginHeader
  },
  data() {
    return {
      account: '',
      checkflag1: true,
      niceName: '',
      checkflag2: true,
      password: '',
      checkflag3: true,
      saferank: 0,
      surePassword: '',
      qq: '',
      mails: '',
      checkflag4: true,
      phone: '',
      checkflag5: true,
      dialog: {
        show: false
      },
      serverQQ: [],
      randomCode: ' ',
      validcode: '',
      validKey: ''
    };
  },
  methods: {
    singin() {
      // 跳转到首页
      this.$router.push('/login');
    },
    checkAccount() {
      if (this.account.length > 18) {
        this.account = this.account.substr(0, 18);
      }
    },
    checkAccount1() {
      let reg = /^[a-zA-Z0-9]{3,18}$/;
      this.checkflag1 = reg.test(this.account);
    },
    checkniceName() {
      if (this.niceName.length > 8) {
        this.niceName = this.niceName.substr(0, 8);
      }
    },
    checkniceName1() {
      if (this.niceName.length < 2) {
        this.checkflag2 = false;
      } else {
        this.checkflag2 = true;
      }
    },
    checkpassword() {
      if (this.password.length > 20) {
        this.password = this.password.substr(0, 20);
      }
      this.saferank = 0;
      if (this.password.length < 6) return this.saferank;
      if (/\d/.test(this.password)) this.saferank++;
      if (/[a-zA-Z]/.test(this.password)) this.saferank++;
      if (/\W/.test(this.password)) this.saferank++;
    },
    checkpassword1() {
      let reg = /^[\s\S]{6,20}$/;
      this.checkflag3 = reg.test(this.password);
    },
    checkmail() {
      let reg = /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      this.checkflag4 = reg.test(this.mails);
    },
    checkphone() {
      let reg = /^(?:\+86)?(?:13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])\d{8}$/;
      this.checkflag5 = reg.test(this.phone);
    },
    submit() {
      if (this.account === '') {
        this.$messageError('请输入帐号！');
        return;
      } else if (!this.checkflag1) {
        this.$messageError('请正确输入帐号！');
        return;
      } else if (this.niceName === '') {
        this.$messageError('请输入商户昵称！');
        return;
      } else if (!this.checkflag2) {
        this.$messageError('请正确输入商户昵称！');
        return;
      } else if (this.password === '') {
        this.$messageError('请输入密码！');
        return;
      } else if (!this.checkflag3) {
        this.$messageError('请正确输入密码！');
        return;
      } else if (this.password !== this.surePassword) {
        this.$messageError('两次密码输入不一致！');
        return;
      } else if (this.mails === '') {
        this.$messageError('请输入邮箱！');
        return;
      } else if (!this.checkflag4) {
        this.$messageError('请正确输入邮箱！');
        return;
      } else if (this.phone === '') {
        this.$messageError('请输入手机号码！');
        return;
      } else if (!this.checkflag5) {
        this.$messageError('请正确输入手机号码！');
        return;
      } else if (this.validcode === '') {
        this.$messageError('验证码不能为空！');
        return;
      }

      this.$api.login
        .register({
          loginName: this.account,
          nickname: this.niceName,
          password: this.password,
          confirmPassword: this.surePassword,
          qqNumber: this.qq,
          phoneNumber: this.phone,
          email: this.mails,
          uuid: this.$route.query.uuid ? this.$route.query.uuid : null,
          siteDomain: window.location.host,
          validateKey: this.validKey,
          validateCode: this.validcode
        })
        .then(data => {
          if (data.status === 200) {
            this.$messageSuccess('注册成功！');
            this.datainit();
            if (data.data === 'InAuth') {
              this.dialog.show = true;
            }
          } else {
            this.$messageError(data.msg);
          }
        })
        .catch(err => {
          this.$messageError(err.message);
        });
    },
    datainit() {
      this.account = '';
      this.checkflag1 = true;
      this.niceName = '';
      this.checkflag2 = true;
      this.password = '';
      this.checkflag3 = true;
      this.saferank = 0;
      this.surePassword = '';
      this.qq = '';
      this.mails = '';
      this.checkflag4 = true;
      this.phone = '';
      this.checkflag5 = true;
      this.validcode = '';
    },
    getinfo() {
      this.$api.login
        .contactinfo()
        .then(data => {
          if (data.status === 200) {
            let qqList = [];
            try {
              qqList = JSON.parse(data.data.serviceQq || '[]');
            } catch (e) {
              qqList = [];
            }
            this.serverQQ = qqList.filter(item => {
              return item.type === 0;
            });
          }
        })
        .catch(err => {
          this.$messageError(err.message);
        });
    },
    getRandomCode() {
      this.$api.login
        .CreateMathCode()
        .then(data => {
          if (data.status === 200) {
            this.randomCode = data.data.imageData;
            this.validKey = data.data.validateKey;
          }
        })
        .catch(err => {
          this.$messageError(err.message);
        });
    }
  },
  created() {
    this.getinfo();
    this.getRandomCode();
  }
};
</script>

<style lang="scss" scoped>
.register-shell {
  min-height: 100vh;
  background: linear-gradient(180deg, #ffffff 0%, #f5f9ff 58%, #ffffff 100%);
  color: #17233c;
  font-family: "Helvetica Neue", Arial, "PingFang SC", "Microsoft Yahei", sans-serif;
}

.register-main {
  padding-top: 76px;
}

.register-hero {
  width: min(1300px, calc(100% - 48px));
  margin: 0 auto;
  padding: 58px 0 78px;
  display: grid;
  grid-template-columns: 360px minmax(0, 1fr);
  gap: 44px;
  align-items: stretch;
}

.register-copy {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 40px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid #dceafc;
  border-radius: 8px;
  box-shadow: 0 18px 48px rgba(42, 91, 151, 0.08);
  overflow: hidden;
}

.register-copy::before,
.register-copy::after {
  content: '';
  position: absolute;
  pointer-events: none;
}

.register-copy::before {
  left: -62px;
  top: 52px;
  width: 118px;
  height: 118px;
  border: 2px solid rgba(77, 147, 255, 0.28);
  border-radius: 32px;
  transform: rotate(42deg);
}

.register-copy::after {
  left: 10px;
  bottom: 96px;
  width: 90px;
  height: 64px;
  background-image: radial-gradient(rgba(55, 132, 255, 0.18) 2px, transparent 2px);
  background-size: 16px 16px;
}

.register-copy h1 {
  margin: 18px 0 10px;
  color: #10213d;
  font-size: 32px;
  line-height: 1.16;
  letter-spacing: 0;
}

.register-copy p {
  margin: 0;
  color: #61718a;
  font-size: 15px;
  line-height: 1.9;
}

.register-flow {
  position: relative;
  display: grid;
  gap: 28px;
  margin-top: 38px;
  padding-bottom: 28px;
  border-bottom: 1px dashed #cbd9ea;
}

.register-flow::before {
  content: '';
  position: absolute;
  left: 37px;
  top: 82px;
  bottom: 92px;
  border-left: 2px dotted rgba(18, 109, 232, 0.42);
}

.register-flow-item {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 88px minmax(0, 1fr);
  gap: 18px;
  align-items: center;
}

.register-flow-icon {
  width: 72px;
  height: 72px;
  background: #eef5ff;
  border: 1px solid #dceafd;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.register-flow-icon img {
  display: block;
  width: 42px;
  height: 42px;
  object-fit: contain;
}

.register-flow-body b,
.register-flow-item strong,
.register-flow-item span {
  display: block;
}

.register-flow-body b {
  color: #126de8;
  font-size: 17px;
  font-weight: 800;
  line-height: 1;
}

.register-flow-item strong {
  margin-top: 10px;
  color: #10213d;
  font-size: 18px;
}

.register-flow-item span {
  margin-top: 8px;
  color: #60718a;
  font-size: 14px;
  line-height: 1.7;
}

.register-panel {
  padding: 30px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid #dce8f6;
  border-radius: 8px;
  box-shadow: 0 24px 64px rgba(42, 91, 151, 0.1);
}

.register-panel-head {
  display: block;
  margin-bottom: 24px;
}

.register-panel-head h2 {
  margin: 0;
  color: #14233d;
  font-size: 26px;
  line-height: 1.2;
}

.register-panel-head p {
  margin: 10px 0 0;
  color: #6d7b91;
  font-size: 14px;
}

.register-panel-head em {
  color: #ff5f46;
  font-style: normal;
}

.register-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px 20px;
}

.reg-field {
  min-width: 0;
  display: block;
}

.reg-field > span {
  display: block;
  margin-bottom: 8px;
  color: #4d5d75;
  font-size: 14px;
  font-weight: 700;
}

.reg-field > span.required::before {
  content: '*';
  margin-right: 4px;
  color: #ff5f46;
}

.reg-field em {
  display: block;
  margin-top: 6px;
  color: #e54848;
  font-style: normal;
  font-size: 13px;
}

.reg-input::v-deep .el-input__inner {
  height: 46px;
  line-height: 46px;
  color: #17233c;
  background: #fff;
  border: 1px solid #d8e4f2;
  border-radius: 8px;
}

.reg-input::v-deep .el-input__inner:focus {
  border-color: #2d8cff;
}

.reg-captcha {
  display: grid;
  grid-template-columns: minmax(0, 1fr) max-content;
  gap: 10px;
}

.reg-captcha a {
  height: 46px;
  width: fit-content;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border: 1px solid #d8e4f2;
  border-radius: 8px;
  overflow: hidden;
}

.reg-captcha img {
  width: auto;
  height: 100%;
  object-fit: contain;
  display: block;
}

.register-actions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 28px;
}

.register-submit,
.register-back {
  width: 100%;
  height: 46px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 800;
}

.register-submit {
  border: none;
  background: linear-gradient(90deg, #126de8 0%, #2d8cff 100%);
  box-shadow: 0 14px 28px rgba(18, 109, 232, 0.22);
}

.register-back {
  color: #126de8;
  background: #fff;
  border: 1px solid #cfe3fb;
}

@media (max-width: 1040px) {
  .register-hero {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .register-hero {
    width: calc(100% - 28px);
    padding-top: 32px;
  }

  .register-copy,
  .register-panel {
    padding: 22px;
  }

  .register-grid,
  .reg-captcha {
    grid-template-columns: 1fr;
  }

  .register-actions {
    flex-direction: column;
  }

  .register-submit,
  .register-back {
    width: 100%;
  }
}

.dialogContainer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  box-sizing: border-box;
  background: rgba(16, 33, 61, 0.52);
  backdrop-filter: blur(3px);
}

.dialogbox {
  position: relative;
  width: 420px;
  max-width: 100%;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.98);
  border: 1px solid rgba(207, 227, 251, 0.95);
  border-radius: 14px;
  box-shadow: 0 28px 70px rgba(10, 42, 86, 0.28);
  overflow: hidden;
}

.dialogbox::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, #126de8 0%, #5868f5 52%, #2d8cff 100%);
}

.dialogbox .close {
  position: absolute;
  top: 18px;
  right: 18px;
  z-index: 2;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: #f2f6fc;
  cursor: pointer;
}

.dialogbox .close::before,
.dialogbox .close::after {
  content: '';
  position: absolute;
  top: 14px;
  left: 8px;
  width: 14px;
  height: 2px;
  border-radius: 2px;
  background: #708099;
}

.dialogbox .close::before {
  transform: rotate(45deg);
}

.dialogbox .close::after {
  transform: rotate(-45deg);
}

.dialog-head {
  padding: 38px 58px 24px;
  text-align: center;
  background: linear-gradient(180deg, #f3f7ff 0%, #ffffff 100%);
  border-bottom: 1px solid #e4edf8;
}

.dialog-status {
  display: inline-flex;
  align-items: center;
  height: 24px;
  padding: 0 11px;
  color: #126de8;
  background: #e9f2ff;
  border-radius: 12px;
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.9px;
}

.dialogbox .tit {
  margin: 14px 0 8px;
  color: #10213d;
  font-size: 25px;
  line-height: 1.3;
  font-weight: 800;
}

.dialog-head p {
  margin: 0;
  color: #75849a;
  font-size: 13px;
  line-height: 1.7;
}

.dialogbox .box {
  padding: 24px 30px 30px;
  text-align: center;
}

.dialogbox .text {
  margin: 0 0 16px;
  color: #4d5d75;
  font-size: 15px;
  line-height: 1.6;
}

.service-list {
  display: grid;
  gap: 10px;
}

.service-qq {
  display: grid;
  grid-template-columns: 40px minmax(0, 1fr) max-content;
  gap: 12px;
  align-items: center;
  min-height: 58px;
  padding: 9px 14px;
  box-sizing: border-box;
  text-decoration: none;
  text-align: left;
  color: #17233c;
  background: #f7faff;
  border: 1px solid #d8e7f8;
  border-radius: 10px;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}

.service-qq:hover {
  border-color: #8fbcf5;
  box-shadow: 0 8px 20px rgba(18, 109, 232, 0.12);
  transform: translateY(-1px);
}

.service-qq__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: #fff;
  background: linear-gradient(135deg, #126de8 0%, #5868f5 100%);
  border-radius: 10px;
  font-size: 11px;
  font-weight: 800;
}

.service-qq__label {
  color: #53647d;
  font-size: 14px;
}

.service-qq strong {
  color: #126de8;
  font-size: 15px;
  font-weight: 800;
}

.service-empty {
  margin: 0;
  padding: 14px;
  color: #6d7b91;
  background: #f7faff;
  border: 1px dashed #d5e3f4;
  border-radius: 10px;
  font-size: 14px;
}

@media (max-width: 520px) {
  .dialog-head {
    padding: 34px 42px 22px;
  }

  .dialogbox .box {
    padding: 22px 20px 24px;
  }

  .service-qq {
    grid-template-columns: 40px minmax(0, 1fr);
  }

  .service-qq strong {
    grid-column: 2;
  }
}
</style>
