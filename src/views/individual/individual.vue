<!--
 * @Description: 个人中心
 * @Author: xu wei
 * @Date: 2020-03-07 15:43:10
 * @LastEditTime: 2020-06-02 17:52:47
 * @LastEditors: gao shuai
 -->
<template>
  <div class="partinstall">
    <div class="bg_fff">
      <div class="gs_title" style="color: white;">个人中心</div>
      <div class="gs_listcontainer">
        <p class="tip_red">基本信息</p>
        <dl class="clearfix">
          <dt>昵称</dt>
          <dd>{{ baseInfo.name }}</dd>
        </dl>
        <dl class="clearfix">
          <dt>账号</dt>
          <dd>{{ baseInfo.account }}</dd>
        </dl>
        <dl class="clearfix">
          <dt>结算类型</dt>
          <dd>{{ 'T+' + baseInfo.type }}</dd>
        </dl>
        <dl class="clearfix">
          <dt>联系ＱＱ</dt>
          <dd>{{ baseInfo.linkQQ }}</dd>
        </dl>
        <dl class="clearfix">
          <dt>联系电话</dt>
          <dd>{{ baseInfo.linkphone }}</dd>
        </dl>
        <dl class="clearfix">
          <dt>注册时间</dt>
          <dd>{{ baseInfo.registerTime }}</dd>
        </dl>
        <dl class="clearfix">
          <dt>最后登录</dt>
          <dd>{{ baseInfo.lastLogin }}</dd>
        </dl>
        <dl class="clearfix">
          <dt>商户标识</dt>
          <dd>{{ baseInfo.merchantMark }}</dd>
        </dl>
        <dl class="clearfix">
          <dt>通讯密钥</dt>
          <dd>{{ baseInfo.serverKey }}</dd>
          <span class="mgl20" style="margin-top: 2px;margin-right: -11px;">
            <el-button size="mini" type="primary" @click="changeKey"
              >更换</el-button
            >
          </span>
        </dl>
      </div>
      <div class="gs_listcontainer">
        <p class="tip_red">
          在线客服
          <el-switch
            v-model="onlineServe.switch"
            @change="serverOff"
          ></el-switch>
          <span class="right">
            <el-button size="mini" type="primary" @click="editserve"
              >编辑</el-button
            >
          </span>
        </p>
        <dl class="clearfix">
          <dt>客服电话</dt>
          <dd>{{ onlineServe.serverphone }}</dd>
        </dl>
        <dl class="clearfix">
          <dt>客服ＱＱ</dt>
          <dd>
            <span
              style="margin-right:5px;"
              v-for="(item, i) in onlineServe.serverQQ"
              :key="'qq' + i"
              >{{ item.name + ':' + item.qq }}</span
            >
          </dd>
        </dl>
      </div>
      <div class="gs_listcontainer">
        <p class="tip_red">服务绑定</p>
        <dl class="clearfix">
          <dt>微信</dt>
          <dd>
            {{ isBindWei ? '已绑定' : '绑定微信公众号可查询玩家订单信息' }}
          </dd>
          <dd style="float: right;color: #3c8dbc;cursor: pointer;">
            <span v-if="isBindWei" @click="handleClose">解绑</span>
            <span v-else @click="bindWei">绑定</span>
          </dd>
        </dl>
        <p style="font-size: 14px;margin-top:8px;">
          注：更多精彩内容请关注平台
          微信公众号，我们将在第一时间为您推送平台最新消息！
        </p>
      </div>
      <div class="gs_listcontainer">
        <p class="tip_red">账户信息</p>
        <div class="opeartbox" style="margin-bottom: 10px;">
          <el-form class="compact-two-column-form" label-width="100px">
            <el-form-item label="开户银行：">
              <el-select
                v-model="accountInfo.bank"
                size="small"
                placeholder="请选择"
              >
                <el-option
                  v-for="(item, i) in accountInfo.bankDrow"
                  :key="'bankofdeposit' + i"
                  :label="item.bankName"
                  :value="item.bankMark"
                ></el-option> </el-select
              ><span class="line_tip">其他银行，请联系管理员添加</span>
            </el-form-item>
            <el-form-item label="开户人：">
              <el-input
                style="width: 19%;"
                size="small"
                v-model="accountInfo.userName"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
            <el-form-item label="银行卡号：">
              <el-input
                style="width: 19%;"
                type="number"
                size="small"
                v-model="accountInfo.bankcard"
                placeholder="请输入游戏账号"
              ></el-input>
              <span class="line_tip"
                >如果开户银行是支付宝请填写您的支付宝账号</span
              >
            </el-form-item>
            <el-form-item label="所在地区：">
              <el-input
                style="width: 19%;"
                size="small"
                v-model="accountInfo.location"
                placeholder="充值金额"
              ></el-input>
              <span class="line_tip">开户银行所在地区、分行</span>
            </el-form-item>
            <el-form-item>
              <el-button size="small" type="primary" @click="editBankInfo"
                >保存</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <!-- 编辑客服信息弹框 -->
    <el-dialog
      title="编辑客服信息"
      :visible.sync="dialog.show"
      @close="dialogInit"
      custom-class="gs_dialog"
      width="440px"
    >
      <div class="editserverBox">
        <div class="list clearfix">
          <span class="tit">客服电话：</span>
          <div class="content">
            <el-input
              size="small"
              v-model="dialog.phone"
              placeholder="请输入内容"
            ></el-input>
          </div>
        </div>
        <div class="list clearfix">
          <span class="tit">客服QQ：</span>
          <div class="content tr">
            <el-button size="mini" type="success" @click="dialogqq.show = true"
              >添加</el-button
            >
          </div>
        </div>
        <ul class="serveList clearfix">
          <li v-for="(item, i) in dialog.serverlist" :key="'serve' + i">
            <p class="tit">{{ item.name }}</p>
            <p class="numberbox">{{ item.qq }}</p>
            <div class="mask" @click="delqqserve(i)">删除</div>
          </li>
        </ul>
        <p class="tc pdb10 mgt15">
          <el-button size="mini" type="primary" @click="editsubmit"
            >确定</el-button
          >
          <el-button size="mini" type="info" @click="dialog.show = false"
            >取消</el-button
          >
        </p>
      </div>
    </el-dialog>
    <!-- 添加客服QQ -->
    <el-dialog
      title="添加客服QQ"
      :visible.sync="dialogqq.show"
      @close="dialogqqinit"
      custom-class="gs_dialog"
      width="420px"
    >
      <div class="editserverBox">
        <div class="list clearfix">
          <span class="tit">客服名称：</span>
          <div class="content">
            <el-input
              size="small"
              v-model="dialogqq.name"
              placeholder="请输入内容"
            ></el-input>
          </div>
        </div>
        <div class="list clearfix">
          <span class="tit">QQ号码：</span>
          <div class="content">
            <el-input
              size="small"
              type="number"
              v-model="dialogqq.qq"
              placeholder="请输入内容"
            ></el-input>
          </div>
        </div>
      </div>
      <p class="tc pdb10">
        <el-button size="small" type="primary" @click="addserver"
          >确定</el-button
        >
        <el-button size="small" type="info" @click="dialogqq.show = false"
          >取消</el-button
        >
      </p>
    </el-dialog>
    <!-- 绑定信息二维码 -->
    <el-dialog
      title=""
      :visible.sync="dialogCode.show"
      @close="dialogCodeInit"
      custom-class="gs_dialog"
      width="300px"
    >
      <div class="tc pdt20 pdb25">
        <img style="width:200px;height:200px;" :src="imgurl" alt="" />
        <p class="mgt5">
          请用微信扫码关注后回复:
          <span style="color:green; fontsize:20px">{{ valCode }}</span>
        </p>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      baseInfo: {
        name: '', // 昵称
        account: '', // 账号
        type: '', // 结算类型
        linkQQ: '', // 联系qq
        linkphone: '', // 联系电话
        registerTime: '', // 注册时间
        lastLogin: '', // 最后登录
        merchantMark: '', // 商户标识
        serverKey: '' // 通讯密钥
      },
      onlineServe: {
        switch: false, // swith开关
        serverphone: '', // 客服电话
        serverQQ: [] // 客服QQ
      },
      serverBind: {
        weixin: ''
      },
      accountInfo: {
        bank: '', // 开户银行
        bankDrow: [], // 开户银行下拉
        userName: '', // 开户人
        bankcard: '', // 银行卡号
        location: '' // 所在地区
      },
      isBindWei: false, // 是否绑定微信
      imgurl: '',
      valCode: '',
      dialog: {
        show: false, // 弹框的显隐
        phone: '', // 手机号
        serverlist: []
      },
      dialogqq: {
        show: false,
        name: '', // 客服名称
        qq: '' // QQ号码
      },
      dialogCode: {
        show: false
      },
      timer: null
    };
  },
  computed: {
    bankMark: function() {
      if (JSON.stringify(this.accountInfo.bankDrow) === '[]') {
        return '';
      } else {
        let item = this.accountInfo.bankDrow.filter(li => {
          return li.bankMark === this.accountInfo.bank;
        })[0];
        return item.bankName;
      }
    }
  },
  methods: {
    // 获取用户信息
    getUser() {
      this.$api.home
        .getUserinfo()
        .then(data => {
          this.baseInfo.name = data.data.nickname;
          this.baseInfo.account = data.data.userName;
          this.baseInfo.type = data.data.settlementType;
          this.baseInfo.linkQQ = data.data.qqNumber;
          this.baseInfo.linkphone = data.data.phoneNumber;
          this.baseInfo.registerTime = data.data.joinDate;
          this.baseInfo.lastLogin = data.data.finalDate;
          this.baseInfo.merchantMark = data.data.uuid;
          this.baseInfo.serverKey = data.data.secretKey;
          this.onlineServe.switch = data.data.serviceState;
          this.onlineServe.serverphone = data.data.servicePhone;
          this.onlineServe.serverQQ =
            data.data.serviceQq === null ? [] : JSON.parse(data.data.serviceQq);
        })
        .catch(err => {
          this.$messageError(err.message);
        });
    },
    // 查询是否绑定微信公众号
    isBindWeixi() {
      this.$api.personCenter
        .isBandweixi()
        .then(data => {
          this.isBindWei = data.data;
          this.valCode = data.headers.ValCode;
          console.log(this.valCode);
        })
        .catch(err => {
          this.$messageError(err.message);
        });
    },
    // 轮询是否绑定微信公众号
    checkBindWeixi() {
      this.$api.personCenter
        .isBandweixi()
        .then(data => {
          if (data.data) {
            clearInterval(this.timer);
            this.timer = null;
            this.dialogCode.show = false;
            this.$messageSuccess('绑定成功！');
            this.isBindWeixi();
          }
        })
        .catch(err => {
          this.$messageError(err.message);
        });
    },
    // 绑定微信
    bindWei() {
      this.$api.personCenter
        .userCode()
        .then(data => {
          if (data.status === 200) {
            this.imgurl = data.data;
            this.dialogCode.show = true;
            this.timer = setInterval(() => {
              this.checkBindWeixi();
            }, 1000);
          }
        })
        .catch(err => {
          this.$messageError(err.message);
        });
    },
    // 解绑提示
    handleClose() {
      this.$confirm('是否确定要解除微信绑定?')
        .then(() => {
          this.unbindWei();
        })
        .catch(() => {});
    },
    // 解绑微信
    unbindWei() {
      this.$api.personCenter
        .unbindwei()
        .then(data => {
          this.$messageSuccess('解绑成功！');
          this.isBindWeixi();
        })
        .catch(err => {
          this.$messageError(err.message);
        });
    },
    // 绑定微信二维码的弹框初始化
    dialogCodeInit() {
      this.imgurl = '';
      clearInterval(this.timer);
      this.timer = null;
    },
    // 获取用户银行信息
    getBankInfo() {
      this.$api.personCenter
        .bankInfo()
        .then(data => {
          this.accountInfo.bank = data.data.bankName;
          this.accountInfo.userName = data.data.realName;
          this.accountInfo.bankcard = data.data.bankNumber;
          this.accountInfo.location = data.data.bankBranch;
        })
        .catch(err => {
          this.$messageError(err.message);
        });
    },
    // 开户银行下拉
    bankDrowList() {
      this.$api.personCenter
        .bankDrow()
        .then(data => {
          this.accountInfo.bankDrow = data.data;
        })
        .catch(err => {
          this.$messageError(err.message);
        });
    },
    // 在线客服off/on
    serverOff() {
      this.$api.home
        .serviceOff()
        .then(data => {
          if (data.status === 200) {
            if (this.onlineServe.switch) {
              this.$messageSuccess('开启：【在线客服】');
            } else {
              this.$messageSuccess('关闭：【在线客服】');
            }
          }
        })
        .catch(err => {
          this.onlineServe.switch = !this.onlineServe.switch;
          this.$messageError(err.message);
        });
    },
    // 更换密钥
    changeKey() {
      this.$api.personCenter
        .changeKey()
        .then(data => {
          if (data.status === 200) {
            this.$messageSuccess('更新成功！');
            this.getUser();
          }
        })
        .catch(err => {
          this.$messageError(err.message);
        });
    },
    // 编辑在线客服
    editserve() {
      this.dialog.serverlist = JSON.parse(
        JSON.stringify(this.onlineServe.serverQQ)
      );
      this.dialog.phone = this.onlineServe.serverphone;
      this.dialog.show = true;
    },
    // 添加客服
    addserver() {
      if (this.dialogqq.name === '') {
        this.$messageError('客服名必填！');
        return;
      } else if (this.dialogqq.qq === '') {
        this.$messageError('qq必填！');
        return;
      }
      this.dialog.serverlist.push({
        name: this.dialogqq.name,
        qq: this.dialogqq.qq
      });
      this.dialogqq.show = false;
    },
    // 删除qq客服
    delqqserve(index) {
      this.dialog.serverlist.splice(index, 1);
    },
    // 编辑在线客服提交
    editsubmit() {
      this.$api.personCenter
        .editlLineQQ({
          servicePhone: this.dialog.phone,
          serviceQq: JSON.stringify(this.dialog.serverlist)
        })
        .then(data => {
          this.$messageSuccess('编辑成功！');
          this.dialog.show = false;
          this.getUser();
        })
        .catch(err => {
          this.$messageError(err.message);
        });
    },
    // 弹框的初始化
    dialogInit() {
      this.dialog.phone = '';
      this.dialog.serverlist = [];
    },
    // 添加客服qq
    dialogqqinit() {
      this.dialogqq.name = '';
      this.dialogqq.qq = '';
    },
    // 保存银行帐户信息
    editBankInfo() {
      this.$api.personCenter
        .savebankInfo({
          bankBranch: this.accountInfo.location,
          bankMark: this.accountInfo.bank,
          bankName: this.bankMark,
          bankNumber: this.accountInfo.bankcard,
          realName: this.accountInfo.userName
        })
        .then(data => {
          if (data.status === 200) {
            this.$messageSuccess('操作成功！');
            this.getBankInfo();
          }
        })
        .catch(err => {
          this.$messageError(err.message);
        });
    }
  },
  created() {
    this.getUser();
    this.getBankInfo();
    this.bankDrowList();
    this.isBindWeixi();
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
  padding-bottom: 1px;
  margin-left: 20px;
  .clearfix {
    border: 1px solid #d9edf7;
    width: 95%;
    margin-bottom: 1px;
    padding-left: 0px;
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
</style>
