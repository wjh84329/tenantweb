<!--
 * @Description: 微信绑定
 * @Author: xu wei
 * @Date: 2020-03-07 15:43:10
 * @LastEditTime: 2020-07-28 16:35:02
 * @LastEditors: gao shuai
 -->
<template>
  <div class="partinstall">
    <div class="bg_fff">
      <div class="gs_listcontainer">
        <p class="tip_red">微信绑定</p>
        <!-- 新样式：二维码+说明+按钮 -->
        <div class="wx-bind-box">
          <div class="wx-qrcode-area">
            <img :src="publicQrCode" class="wx-qrcode-img" alt="公众号二维码" />
          </div>
          <div class="wx-bind-info">
            <div class="wx-bind-title">微信资料</div>
            <div class="wx-bind-step">
              <div>1. 微信扫一扫，关注平台公众号</div>
              <div>2. 关注后点击下方按钮，扫码绑定平台账号</div>
            </div>
            <el-button v-if="!isBindWei" :disabled="bindDisabled" class="wx-bind-btn" type="primary" @click="handleGetBindQr">{{ bindText
            }}</el-button>
            <el-button v-if="isBindWei" :disabled="addDisabled" style="margin:5px 0;" type="primary" @click="handleGetBindQr">{{
                addText }}</el-button>
            <div v-if="isBindWei">
              <el-button v-for="(item, i) in isbindWeilist" :key="'isbind' + i" class="wx-bind-btn" type="danger"
                @click="unbindWeixin(item.openId)">({{ item.nickname }})解绑微信</el-button>

            </div>

            <!-- <div v-if="showBindQr" class="bind-qrcode-area">
              <img :src="bindQrCode" class="wx-qrcode-img" alt="绑定二维码" />
              <div class="bind-qrcode-tip">请用微信扫描左侧二维码进行账号绑定</div>
            </div> -->
          </div>
        </div>
        <p style="font-size: 14px;margin-top:18px;">注：更多精彩内容请关注平台 微信公众号，我们将在第一时间为您推送平台最新消息！</p>
      </div>
    </div>
    <!-- 绑定信息二维码 -->
    <el-dialog title="" :visible.sync="dialogCode.show" @close="dialogCodeInit" custom-class="gs_dialog" width="300px">
      <div class="tc pdt20 pdb25">
        <img style="width:200px;height:200px;" :src="bindQrCode" alt="" />
        <p class="mgt5">请用微信扫描左侧二维码进行账号绑定</p>
      </div>
    </el-dialog>
    <!-- 二级密码的确认 -->
    <el-dialog title="提示" :visible.sync="dialog1.show" @close="dialog1.secondPassword = ''" custom-class="gs_dialog"
      width="400px">
      <div class="passwordBox">
        <span class="tit">二级密码：</span>
        <div class="inputBox">
          <el-input style="width:220px;" type="password" size="small" v-model="dialog1.secondPassword"
            @keyup.enter.native="authorityClick" placeholder="请输入二级密码"></el-input>
        </div>
      </div>
      <p class="tc pdb10">
        <el-button size="small" type="primary" @click="authorityClick">确定</el-button>
        <el-button size="small" type="info" @click="dialog1.show = false">取消</el-button>
      </p>
    </el-dialog>
    <!-- 解绑微信二级密码的确认 -->
    <el-dialog title="提示" :visible.sync="dialog.show" @close="dialoginit" custom-class="gs_dialog" width="400px">
      <div class="passwordBox">
        <span class="tit">二级密码：</span>
        <div class="inputBox">
          <el-input v-if="isbindFlag" style="width:220px;" type="password" size="small" v-model="dialog.secondPassword"
            @keyup.enter.native="unbindWei" placeholder="请输入二级密码"></el-input>
          <!-- <el-input v-else style="width:220px;" type="password" size="small" v-model="dialog.secondPassword"
            @keyup.enter.native="bindWei" placeholder="请输入二级密码"></el-input> -->
        </div>
      </div>
      <p class="tc pdb10">
        <el-button v-if="isbindFlag" size="small" type="primary" @click="unbindWei">确定</el-button>
        <!-- <el-button v-else size="small" type="primary" @click="bindWei">确定</el-button> -->
        <el-button size="small" type="info" @click="dialog.show = false">取消</el-button>
      </p>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: false,
      secondValue: false, // 微信管理二级密码
      serverBind: {
        weixin: ''
      },
      isbindFlag: false, // 二级密码时的绑定和解绑的flag, true为解绑，false为绑定状态
      openId: '',
      isbindWeilist: [], // 已经绑定的微信
      isBindWei: false, // 是否绑定微信
      publicQrCode: require('@/assets/images/white.jpg'), // 公众号二维码图片路径
      publicQrOrigin: '', // 保存 getDetail 返回的原始公众号二维码（用于 need_bind 时恢复）
      bindQrCode: '', // 绑定二维码
      bindBtnDisabled: false,
      bindBtnDisabled1: false,
      bindBtnText: '点我绑定',
      bindBtnText1: '增加绑定',
      // 新增状态枚举：idle | loading | binding | bound
      bindState: 'idle',
      addState: 'idle',
      showBindQr: false,
      dialog: {
        show: false,
        secondPassword: ''
      },
      dialog1: {
        show: false,
        secondPassword: ''
      },
      dialogCode: {
        show: false
      },
      timer: null
    };
  },
  computed: {
    // 主按钮
    bindDisabled() {
      // 禁用当正在获取或等待绑定中，或已绑定
      return this.bindState === 'loading' || this.bindState === 'binding' || this.bindState === 'bound';
    },
    bindText() {
      switch (this.bindState) {
        case 'loading':
          return '获取中...';
        case 'binding':
          return '绑定中...';
        case 'bound':
          return '已绑定';
        case 'expired':
          return '重新获取二维码';
        default:
          return '点我绑定';
      }
    },
    // 增加绑定按钮
    addDisabled() {
      return this.addState === 'loading' || this.addState === 'binding' || this.addState === 'bound' || this.addState === 'expired';
    },
    addText() {
      // 如果没有已绑定项则显示增加绑定（可改为更精确的文案）
      if ((this.isbindWeilist || []).length === 0) return '点我绑定';
      switch (this.addState) {
        case 'loading':
          return '获取中...';
        case 'binding':
          return '绑定中...';
        case 'expired':
          return '重新获取二维码';
        default:
          return '增加绑定';
      }
    }
  },
  methods: {
    // 查询是否绑定微信公众号
    isBindWeixi() {
      this.$api.personCenter
        .isBandweixi()
        .then((data) => {
          this.isBindWei = data.data;
          this.bindState = this.isBindWei ? 'bound' : 'idle';
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 初始化二级密码数据
    dialoginit() {
      this.dialog.secondPassword = '';
      this.isbindFlag = false;
      this.openId = '';
    },
    async checkBindWeixi() {
      const userId = this.$store.state.id;
      if (!userId) return;
      this.$api.login
        .checkWeChatLogin(
          {
            code: this.code,
            id: userId
          }
        )
        .then((data) => {
          if (data.status === 200) {
            if (data.data.status === 'need_bind') {
              // 需要绑定账号
              this.$messageError('请先关注公众号后重新扫码！');
              // 恢复为 getDetail 返回的公众号二维码（如有），否则保持当前或重新请求
              if (this.publicQrOrigin) {
                this.publicQrCode = this.publicQrOrigin;
              } else {
                // 若未缓存原始二维码，尝试重新请求
                this.getDetail().catch(() => {});
              }
              // 恢复按钮状态为可重新获取
              this.bindState = 'idle';
              clearInterval(this.timer);
            }
            if (data.data.status === 'scanned') {
              // 已扫码，等待绑定
              console.log('已扫码，等待绑定');
            }
            if (data.data.status === 'cancelled') {
              // 用户取消登录
              console.log('用户取消');
            }
            if (data.data.status === 'expired') {
              // 二维码过期
              this.$messageError('二维码已过期，请重新获取！');
              // 停止轮询、隐藏绑定二维码并将按钮改为「重新获取二维码」
              clearInterval(this.timer);
              this.timer = null;
              this.showBindQr = false;
              this.addDisabled = false;
              // 可选择恢复为公众号原始二维码
              if (this.publicQrOrigin) {
                this.publicQrCode = this.publicQrOrigin;
              }
              this.bindState = 'expired';
            }
            if (data.data.status === 'confirmed') {
              // 绑定成功
              clearInterval(this.timer);
              this.timer = null;
              this.dialogCode.show = false;
              this.$messageSuccess('绑定成功！');
              this.isBindWeixi();
              this.getWeixinlist();
              // 绑定成功后恢复按钮状态
              this.bindState = 'bound';
            }
          } else {
            this.addState = 'idle';
          }
        })
        .catch((err) => {
          // 204 会走到这里，忽略即可继续轮询
          if (err.response && err.response.status === 204) {
            return;
          }
          console.error('CheckWxQr 调用失败', err);
        });
    },

    // 解绑微信
    unbindWei() {
      if (this.dialog.secondPassword === '') {
        this.$messageError('请输入二级密码！');
        return;
      }
      this.$api.personCenter
        .unbindwei({
          password: this.dialog.secondPassword,
          openId: this.openId
        })
        .then((data) => {
          this.$messageSuccess('解绑成功！');
          this.dialog.show = false;
          this.openId = '';
          this.isbindFlag = false;
          // 解绑后恢复状态
          this.bindState = 'idle';
          this.isBindWeixi();
          this.getWeixinlist();
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 解绑微信
    unbindWeixin(id) {
      this.isbindFlag = true;
      this.openId = id;
      this.dialog.show = true;
    },
    // 绑定微信二维码的弹框初始化
    dialogCodeInit() {
      // 重置状态
      this.bindState = 'idle';
      this.addState = 'idle';
      this.showBindQr = false;
      this.bindQrCode = '';
      clearInterval(this.timer);
      this.timer = null;
    },
    // 获取已绑定的微信列表
    getWeixinlist() {
      this.$api.personCenter
        .isbindWeixin()
        .then((data) => {
          if (data.status === 200) {
            this.isbindWeilist = data.data;
            // 如果无已绑定则 secondary 显示为点我绑定
            if (this.isbindWeilist.length === 0) {
              this.addState = 'idle';
            } else {
              this.addState = 'idle';
            }
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    async getDetail() {
      this.$api.home
        .getQrCode()
        .then((data) => {
          if (data.status === 200) {
            // 保存原始公众号二维码供后续恢复使用
            this.publicQrOrigin = data.data.wxQrStr || this.publicQrOrigin;
            this.publicQrCode = data.data.wxQrStr;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 请求绑定二维码后启动轮询（handleGetBindQr 和 bindWei 中都用到）
    async handleGetBindQr() {
      this.bindState = 'loading';
      this.addState = 'loading';
      try {
        const res = await this.$api.login.getWeChatCode(); // 保持原请求，后端会生成 QR 并写 Redis
        if (res.status === 200) {
          this.publicQrCode = res.data.qrCodeUrl;
          this.code = res.data.code;
          this.showBindQr = true;
          // this.dialogCode.show = true;
          this.bindState = 'binding';
          this.addState = 'binding';

          // 启动轮询，interval 1s -> 可按需改为2s
          if (this.timer) clearInterval(this.timer);
          this.timer = setInterval(() => {
            this.checkBindWeixi();
          }, 1000);
        } else {
          this.bindState = 'idle';
          this.addState = 'idle';
        }
      } catch (err) {
        this.bindState = 'idle';
        this.addState = 'idle';
        this.$messageError(err.message || '获取二维码失败');
      }
    },
    authorityClick() {
      if (this.dialog1.secondPassword === '') {
        this.$messageError('请输入二级密码！');
        return;
      }
      this.dialog1.loading = true;
      this.$api.personCenter
        .checkSecondary({
          password: this.dialog1.secondPassword
        })
        .then((data) => {
          if (data.state) {
            // this.secondValue = true;
            this.dialog1.show = false;
          } else {
            this.$messageError('二级密码错误');
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    }
  },
  created() {
    this.isBindWeixi();
    this.getWeixinlist();
    this.getDetail();
  },
  destroyed() {
    clearInterval(this.timer);
    this.timer = null;
  }
};
</script>

<style lang="scss" scoped>
.gs_title {
  background: var(--theme-color);
}

.tip_red {
  color: #3c8dbc;
  padding: 10px 0px;
  font-weight: bold;
  font-size: 15px;
}

.gs_listcontainer {
  padding-top: 0;
  padding-bottom: 15px;
  margin-left: 20px;

  .clearfix {
    border: 1px solid #d9edf7;
    width: 95%;
    margin-bottom: 1px;
    padding-left: 0px;
    box-sizing: border-box;

    .mgl20 {
      float: right;
    }

    dt {
      background-color: #d9edf7;
      padding-right: 10px;
    }

    dd {
      padding-top: 5px;
    }
  }
}

.mg2 {
  float: right;
  margin-top: -20px;
}

.opeartbox {
  border: 1px solid #00bcd4;
  width: 97%;
}

.line_tip {
  color: #999;
  font-size: 14px;
  margin-left: 20px;
}

.right {
  float: right;
  margin-right: 4%;
}

.el-form-item {
  margin-bottom: 10px;
}

.editserverBox {
  padding-left: 20px;

  .list {
    margin-bottom: 10px;

    .tit {
      float: left;
      width: 90px;
      height: 32px;
      line-height: 32px;
    }

    .content {
      float: left;
      width: 250px;
    }
  }

  .serveList {
    li {
      position: relative;
      float: left;
      width: 100px;
      text-align: center;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin-right: 15px;
      margin-bottom: 10px;
      overflow: hidden;

      .tit {
        background: #3c8dbc;
        color: #fff;
        height: 22px;
        line-height: 22px;
      }

      .numberbox {
        height: 25px;
        line-height: 25px;
        color: green;
        font-size: 13px;
      }

      &:hover {
        .mask {
          top: 0;
        }
      }

      .mask {
        position: absolute;
        transition: top 0.3s;
        top: 100%;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.8);
        color: #fff;
        cursor: pointer;
        line-height: 50px;
      }
    }
  }
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

.bindwei {
  width: 95%;
  border: 1px solid #d9edf7;

  .tit {
    width: 100px;
    background: #d9edf7;
    padding-right: 10px;
    font-size: 14px;
    text-align: right;
    color: #333;
  }

  .el-tag {
    margin: 5px 10px 5px 0;
  }
}

.weixinbox {
  margin-left: 20px;

  .clearfix1:after {
    content: '';
    display: table;
    clear: both;
    border-spacing: 0;
  }

  table {
    width: 95%;
    margin-top: -10px;
    border-collapse: separate;
    border-spacing: 0 10px;

    tr {
      td {
        border: 1px solid #d9edf7;

        ul {
          margin: 0 100px 0 70px;

          li {
            float: left;
            margin-right: 60px;

            .tit {
              float: left;
              height: 40px;
              line-height: 40px;
              font-size: 13px;
              width: 90px;
              text-align: right;
              color: #313131;
            }

            .contbox {
              float: left;
              margin-top: 7px;
              margin-left: 20px;
            }
          }
        }
      }

      .tit_td {
        width: 98px;
        background: #d9edf7;
        padding-right: 10px;
        text-align: right;
        font-size: 14px;
        color: #333;
      }
    }
  }
}

.authority {
  position: absolute;
  font-size: 14px;
  right: 10px;
  top: 12px;
  color: #63aafa;
  cursor: pointer;
}

.wx-bind-box {
  display: flex;
  align-items: flex-start;
  border: 1px solid #e4e4e4;
  padding: 20px;
  margin-bottom: 20px;
  background: #fafbfc;
}

.wx-qrcode-area {
  width: 220px;
  text-align: center;
}

.wx-qrcode-img {
  width: 180px;
  height: 180px;
  border: 1px solid #eee;
}

.wx-bind-info {
  flex: 1;
  margin-left: 40px;
}

.wx-bind-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.wx-bind-status {
  font-size: 14px;
  color: #888;
  margin-left: 10px;
}

.wx-bind-step {
  font-size: 15px;
  margin-bottom: 18px;
  color: #333;
  line-height: 1.8;
}

.wx-bind-btn {
  margin-bottom: 18px;
  width: 180px;
}

.bind-qrcode-area {
  margin-top: 10px;
  display: flex;
  align-items: center;
}

.bind-qrcode-tip {
  margin-left: 15px;
  color: #67C23A;
  font-size: 14px;
}
</style>
