<!--
 * @Description: 完善个人信息
 * @Author: xu wei
 * @Date: 2020-03-07 15:43:10
 * @LastEditTime: 2020-07-01 10:59:07
 * @LastEditors: gao shuai
 -->
<template>
  <div class="partinstall">
    <div class="bg_fff pdb15">
      <div class="gs_listcontainer personInfo mgt10 two-column-list-form">
        <p class="tip_red">完善个人信息</p>
        <dl class="clearfix">
          <dt>二级密码</dt>
          <dd>
            <el-input
              style="width: 220px"
              size="small"
              type="password"
              v-model="secondPassword"
              placeholder="请输入二次密码"
            ></el-input>
          </dd>
        </dl>
        <dl class="clearfix">
          <dt>二级密码确认</dt>
          <dd>
            <el-input
              style="width: 220px"
              size="small"
              type="password"
              v-model="surePassword"
              placeholder="请确认二次密码"
            ></el-input>
          </dd>
        </dl>
        <dl class="clearfix">
          <dt>开户银行</dt>
          <dd>
            <el-select
              style="width: 220px"
              v-model="bank"
              size="small"
              placeholder="请选择"
            >
              <el-option
                v-for="(item, i) in bankdrow"
                :key="'bankofdeposit' + i"
                :label="item.bankName"
                :value="item.bankMark"
              ></el-option>
            </el-select>
            <span class="line_tip">其他银行，请联系管理员添加</span>
          </dd>
        </dl>
        <dl class="clearfix">
          <dt>银行卡号</dt>
          <dd>
            <el-input
              style="width: 220px"
              size="small"
              v-model="bankacount"
              placeholder="请输入银行帐号"
            ></el-input>
            <span class="line_tip"
              >如果开户银行是支付宝请填写您的支付宝账号</span
            >
          </dd>
        </dl>
        <dl class="clearfix">
          <dt>开户人</dt>
          <dd>
            <el-input
              style="width: 220px"
              size="small"
              v-model="person"
              placeholder="请输入收款人"
            ></el-input>
          </dd>
        </dl>
        <dl class="clearfix">
          <dt>身份证号</dt>
          <dd>
            <el-input
              style="width: 220px"
              size="small"
              v-model="idNumber"
              placeholder="请输入身份证号"
            ></el-input>
            <span class="line_tip">提供的身份证号仅用于用户签署合同</span>
          </dd>
        </dl>
        <dl class="clearfix">
          <dt>所在地区</dt>
          <dd>
            <el-input
              style="width: 220px"
              size="small"
              v-model="local"
              placeholder="请输入所在地区"
            ></el-input>
            <span class="line_tip">开户银行所在地区、分行</span>
          </dd>
        </dl>
        <dl class="clearfix">
          <dt>网址名称</dt>
          <dd>
            <el-input
              style="width: 220px"
              size="small"
              v-model="siteName"
              placeholder="请输入网站名称"
            ></el-input>
            <span class="line_tip">商户自己的网站名称</span>
          </dd>
        </dl>
        <dl class="clearfix">
          <dt>域名</dt>
          <dd>
            <el-input
              style="width: 220px"
              size="small"
              v-model="domain"
              placeholder="请输入域名"
            ></el-input>
            <span class="line_tip">商户自己的域名</span>
          </dd>
        </dl>
      </div>
      <p class="mgt15 two-column-form-actions" :style="$root.uiMode === 'modern' ? null : { paddingLeft: '150px' }">
        <el-button size="small" type="primary" @click="setPersonInfo"
          >确定</el-button
        >
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      secondPassword: '', // 二级密码
      surePassword: '', // 确认二级密码
      bank: '', // 开户银行
      bankdrow: [], // 银行下拉
      bankacount: '', // 银行帐号
      person: '', // 收款人
      local: '', // 所在地区
      domain: '', // 域名
      siteName: '', // 网站名称
      idNumber: ''
    };
  },
  computed: {
    bankName: function () {
      if (this.bank === '') {
        return '';
      } else {
        let arr = this.bankdrow.filter((item) => {
          return item.bankMark === this.bank;
        });
        return arr[0].bankName;
      }
    }
  },
  methods: {
    // 开户银行下拉
    bankDrowList() {
      this.$api.personCenter
        .bankDrow()
        .then((data) => {
          this.bankdrow = data.data;
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 修改二级密码和账号
    setPersonInfo() {
      if (this.secondPassword === '') {
        this.$messageError('请输入二级密码');
        return;
      } else if (this.secondPassword !== this.surePassword) {
        this.$messageError('两次密码输入不一致！');
        return;
      } else if (this.bank === '') {
        this.$messageError('请选择开户银行！');
        return;
      } else if (this.idNumber === '') {
        this.$messageError('请输入身份证号！');
        return;
      } else if (this.bankacount === '') {
        this.$messageError('请输入银行卡号！');
        return;
      } else if (this.person === '') {
        this.$messageError('请输入开户人！');
        return;
      } else if (this.local === '') {
        this.$messageError('请输入所在地区！');
        return;
      } else if (this.domain === '') {
        this.$messageError('请输入域名！');
        return;
      } else if (this.siteName === '') {
        this.$messageError('请输入网站名称！');
        return;
      }
      this.$api.personCenter
        .setInfo({
          merchantCenterBankUpdateParameters: {
            bankBranch: this.local,
            bankName: this.bankName,
            bankMark: this.bank,
            bankNumber: this.bankacount,
            realName: this.person,
            domain: this.domain,
            siteName: this.siteName,
            idNumber: this.idNumber
          },
          secondaryPasswordParameters: {
            password: this.secondPassword,
            confirmPassword: this.surePassword
          }
        })
        .then((data) => {
          if (data.status === 200) {
            this.$messageSuccess('完善成功！');
            this.$router.replace({ path: '/main/home' });
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    getUserBankDetails() {
      this.$api.personCenter
        .getUserBankDetails()
        .then((data) => {
          if (data.status === 200) {
            this.domain = data.data.domain;
            this.local = data.data.bankBranch;
            this.bank = data.data.bankMark;
            this.bankacount = data.data.bankNumber;
            this.person = data.data.realName;
            this.domain = data.data.domain;
            this.siteName = data.data.siteName;
            this.idNumber = data.data.idNumber;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    }
  },
  created() {
    this.bankDrowList();
    this.getUserBankDetails();
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
      height: 42px;
      line-height: 42px;
    }
    dd {
      padding: 5px 0;
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
</style>
