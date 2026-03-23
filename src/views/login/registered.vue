<template>
  <div class="register-page">
    <login-header></login-header>

    <div class="page-body">
      <!-- <div class="page-decor"></div> -->

      <div class="register-panel">
        <div class="panel-title">用户注册</div>

        <div class="form-list">
          <div class="form-item">
            <div class="form-label">用户名</div>
            <div class="form-main">
              <div class="field-box">
                <el-input
                  class="form-input"
                  v-model="account"
                  placeholder="用户名由3-18个英文字母或数字组成"
                  @input="checkAccount"
                  @blur="checkAccount1"
                ></el-input>
              </div>
            </div>
          </div>

          <div class="form-item">
            <div class="form-label">商户昵称</div>
            <div class="form-main">
              <div class="field-box">
                <el-input
                  class="form-input"
                  v-model="niceName"
                  placeholder="请输入商户昵称"
                  @input="checkniceName"
                  @blur="checkniceName1"
                ></el-input>
              </div>
            </div>
          </div>

          <div class="form-item">
            <div class="form-label">密码</div>
            <div class="form-main">
              <div class="field-box">
                <el-input
                  class="form-input"
                  type="password"
                  v-model="password"
                  placeholder="密码由6-20个英文字母、数字或下划线组成"
                  @input="checkpassword"
                  @blur="checkpassword1"
                ></el-input>
              </div>
            </div>
          </div>

          <div class="form-item">
            <div class="form-label">确认密码</div>
            <div class="form-main">
              <div class="field-box">
                <el-input
                  class="form-input"
                  type="password"
                  v-model="surePassword"
                  placeholder="请再次输入密码"
                ></el-input>
              </div>
            </div>
          </div>

          <div class="form-item">
            <div class="form-label">QQ</div>
            <div class="form-main">
              <div class="field-box">
                <el-input
                  class="form-input"
                  v-model="qq"
                  placeholder="请输入联系QQ"
                  @input="qq = intNumber(qq)"
                ></el-input>
              </div>
            </div>
          </div>

          <div class="form-item">
            <div class="form-label">邮箱</div>
            <div class="form-main">
              <div class="field-box">
                <el-input
                  class="form-input"
                  v-model="mails"
                  placeholder="请输入邮箱"
                  @blur="checkmail"
                ></el-input>
              </div>
              <p class="field-tip" v-if="!checkflag4" :class="{ wrong: !checkflag4 }">
                邮箱格式不正确
              </p>
            </div>
          </div>

          <div class="form-item">
            <div class="form-label">手机号</div>
            <div class="form-main">
              <div class="field-box">
                <el-input
                  class="form-input"
                  v-model="phone"
                  placeholder="请输入常用手机号"
                  @blur="checkphone"
                ></el-input>
              </div>
              <p class="field-tip" v-if="!checkflag5" :class="{ wrong: !checkflag5 }">
                手机格式不正确
              </p>
            </div>
          </div>

          <div class="form-item captcha-item">
            <div class="form-label">验证码</div>
            <div class="form-main">
              <div class="captcha-wrap">
                <div class="field-box captcha-input-box">
                  <el-input
                    class="form-input"
                    v-model="validcode"
                    placeholder="请输入图形验证码"
                  ></el-input>
                </div>
                <a class="captcha-box" href="javascript:;" @click.prevent="getRandomCode">
                  <img class="yzm" id="code" :src="randomCode" alt="" />
                </a>
              </div>
            </div>
          </div>

          <div class="action-row">
            <el-button class="submit-btn1" type="primary" @click="submit">
              立即注册
            </el-button>
            <el-button class="submit-btn2" type="warning" @click="singin">
              返回登录
            </el-button>
          </div>
        </div>
      </div>

      <login-footer></login-footer>
    </div>

    <div class="dialogContainer" v-if="dialog.show">
      <div class="dialogbox">
        <div class="close" @click="dialog.show = false"></div>
        <h2 class="tit">注册成功</h2>
        <div class="box">
          <p class="text">请联系工作人员进行审核</p>
          <p class="tc" v-for="(item, i) in serverQQ" :key="'qq' + i">
            <a
              class="service-qq"
              :href="'https://wpa.qq.com/msgrd?v=3&uin=' + item.qq + '&site=qq&menu=yes'"
              target="_blank"
            >
              <img src="../../assets/images/login/contact_qq.png" alt="" />
              <div>请添加QQ：{{ item.qq }}</div>
            </a>
          </p>
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
      let reg = /^[a-zA-Z0-9_]{6,20}$/;
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
.register-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #ffffff 0%, #f6f9ff 100%);
}

.page-body {
  position: relative;
  top: 126px;
  min-height: calc(100vh - 126px);
  padding: 36px 0 120px;
  overflow: hidden;
}

.page-decor {
  position: absolute;
  left: 50%;
  top: 140px;
  width: 1200px;
  height: 520px;
  transform: translateX(-50%);
  // background:
  //   radial-gradient(circle at 18% 70%, rgba(225, 233, 247, 0.95) 0, rgba(225, 233, 247, 0.55) 18%, rgba(225, 233, 247, 0) 44%),
  //   radial-gradient(circle at 76% 24%, rgba(236, 242, 252, 0.95) 0, rgba(236, 242, 252, 0.5) 22%, rgba(236, 242, 252, 0) 48%),
  //   linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(235, 241, 250, 0.4) 100%);
  // filter: blur(6px);
  pointer-events: none;
}

.register-panel {
  position: relative;
  z-index: 1;
  width: 920px;
  margin: 0 auto;
  padding: 34px 74px 44px;
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid #e5ebf4;
  border-radius: 12px;
  box-shadow: 0 24px 60px rgba(55, 98, 168, 0.08);
  box-sizing: border-box;
}

.panel-title {
  margin-bottom: 30px;
  text-align: center;
  font-size: 25px;
  font-weight: 500;
  color: #111;
  letter-spacing: 1px;
}

.form-list {
  width: 100%;
}

.form-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 18px;
}

.form-label {
  width: 110px;
  height: 52px;
  line-height: 52px;
  text-align: center;
  font-size: 15px;
  color: #1b1b1b;
  background: rgba(255, 255, 255, 0.86);
  border: 1px solid #cfd4dc;
  border-right: none;
  box-sizing: border-box;
  flex-shrink: 0;
}

.form-main {
  flex: 1;
  min-width: 0;
}

.field-box {
  height: 52px;
  border: 1px solid #cfd4dc;
  background: rgba(255, 255, 255, 0.9);
  box-sizing: border-box;
}

.form-input::v-deep .el-input__inner {
  height: 50px;
  line-height: 50px;
  border: none;
  border-radius: 0;
  padding: 0 18px;
  font-size: 24px;
  color: #333;
  background: transparent;
}

.form-input::v-deep .el-input__inner::placeholder {
  color: #9aa3af;
}

.field-tip {
  margin: 8px 0 0 0;
  font-size: 14px;
  line-height: 22px;
  color: #6d7682;
}

.field-tip.wrong {
  color: #f04848;
}

.safe-rank {
  display: inline-flex;
  margin-right: 10px;
  overflow: hidden;
  vertical-align: middle;
  border-radius: 2px;
}

.safe-rank i {
  min-width: 28px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  font-style: normal;
  font-size: 12px;
  color: #fff;
  background: #cfd5df;
  border-right: 1px solid #fff;
}

.safe-rank i:last-child {
  border-right: none;
}

.safe-rank i.on {
  background: #f36b3a;
}

.captcha-item .form-main {
  display: flex;
  align-items: center;
}

.captcha-wrap {
  display: flex;
  align-items: center;
  gap: 18px;
  width: 100%;
}

.captcha-input-box {
  width: 300px;
  flex: none;
}

.captcha-box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 176px;
  height: 52px;
  text-decoration: none;
  background: transparent;
}

.captcha-box img {
  max-width: 100%;
  max-height: 100%;
  display: block;
}

.action-row {
  margin-top: 28px;
  text-align: center;
}

.submit-btn {
  width: 320px;
  height: 52px;
  border: none;
  // border-radius: 28px;
  background: linear-gradient(90deg, #178eef 0%, #33a6ff 100%);
  box-shadow: 0 14px 30px rgba(29, 143, 239, 0.24);
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 1px;
}

.submit-btn:hover,
.submit-btn:focus {
  background: linear-gradient(90deg, #178eef 0%, #33a6ff 100%);
  opacity: 0.96;
}

.login-entry {
  margin-top: 18px;
  text-align: center;
  font-size: 14px;
  color: #6a7480;
}

.login-entry span {
  color: #168df0;
  cursor: pointer;
}

.dialogContainer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 99999;
  background: rgba(0, 0, 0, 0.5);
}

.dialogbox {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 288px;
  min-height: 327px;
  margin-left: -144px;
  margin-top: -163px;
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
}

.dialogbox .close {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 22px;
  height: 22px;
  background: url(../../assets/images/login/cross_img.png) no-repeat center center;
  cursor: pointer;
}

.dialogbox .tit {
  height: 66px;
  line-height: 66px;
  margin: 0;
  text-align: center;
  font-size: 24px;
  font-weight: 400;
  color: #fff;
  background: #1792e3;
}

.dialogbox .box {
  padding-top: 140px;
  background: url(../../assets/images/login/cross.png) no-repeat center 35px;
  text-align: center;
}

.dialogbox .text {
  margin-top: 5px;
  margin-bottom: 15px;
  font-size: 18px;
  color: #5f5f5f;
}

.service-qq {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: #333;
  font-size: 14px;
}

.service-qq img {
  margin-bottom: 8px;
}

@media (max-width: 1024px) {
  .register-panel {
    width: 94%;
    padding: 28px 24px 36px;
  }

  .form-label {
    width: 96px;
    font-size: 18px;
  }

  .form-input::v-deep .el-input__inner {
    font-size: 18px;
  }
}

@media (max-width: 768px) {
  .page-body {
    top: 96px;
    min-height: calc(100vh - 96px);
    padding: 24px 0 80px;
  }

  .register-panel {
    width: 94%;
    padding: 24px 14px 30px;
  }

  .panel-title {
    font-size: 24px;
  }

  .form-item {
    flex-direction: column;
    margin-bottom: 14px;
  }

  .form-label {
    width: 100%;
    border-right: 1px solid #cfd4dc;
    border-bottom: none;
  }

  .field-box {
    border-top: none;
  }

  .captcha-wrap {
    flex-direction: column;
    align-items: stretch;
  }

  .captcha-input-box,
  .captcha-box {
    width: 100%;
  }

  .submit-btn {
    width: 100%;
  }
}
</style>
