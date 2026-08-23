<!--
 * @Description: 提现申请
 * @Author: gao shuai
 * @Date: 2020-05-16 09:10:49
 * @LastEditTime: 2020-07-15 18:11:01
 * @LastEditors: gao shuai
-->

<template>
  <div class="home">
    <div class="gs_title" style="color: white;">电子户转账</div>
    <div class="textBox" v-if="isCro">
      <p>提现声明：请不要同一天内屡次小额提现，这种情况属于恶意提现，以免财务结算时产生错误对你造成损失。</p>
      <p>到账时间：特殊情况除外，如超过12小时不到账，请与客服联系。</p>
      <p>注意事项：系统结算时间内，提现功能暂不可使用。</p>
    </div>
    <div class="contentList" v-if="isCro">
      <span class="recordBtn">
        <el-button size="small" type="success"
          @click="$router.push({ path: '/personal/Withdrawal' })">查看转账记录</el-button>
      </span>
      <ul>
        <li class="clearfix">
          <span class="tit">账户余额：</span>
          <div class="inputbox">
            <span class="account" :class="{ 'unable': !isfrozen }">{{ account }} 元</span>
            <span class="frozen" v-if="!isfrozen">已冻结</span>
          </div>
        </li>
        <li class="clearfix">
          <span class="tit">手续费：</span>
          <div class="inputbox">
            <span style="color:red;">{{ fee }} 元</span>
          </div>
        </li>
        <li class="clearfix">
          <span class="tit">转账类型：</span>
          <el-radio-group v-model="form.type">
            <el-radio :label="0">对公</el-radio>
            <el-radio :label="1">对私</el-radio>
          </el-radio-group>
        </li>
        <li class="clearfix">
          <span class="tit">银行名称：</span>
          <div class="inputbox">
            <el-input v-model="form.bankName" placeholder="请输入内容"></el-input>
          </div>
        </li>
        <li class="clearfix">
          <span class="tit">收款人：</span>
          <div class="inputbox">
            <el-input v-model="form.player" placeholder="请输入内容"></el-input>
          </div>
        </li>
        <li class="clearfix">
          <span class="tit">银行账号：</span>
          <div class="inputbox">
            <el-input v-model="form.bankNumber" placeholder="请输入内容"></el-input>
          </div>
        </li>
        <li class="clearfix">
          <span class="tit">申请金额：</span>
          <div class="inputbox">
            <el-input style="width: 120px;" size="small" type="number" :disabled="cansettle === 0" v-model="form.money"
              @input="applyMoney" placeholder="输入金额"></el-input>
            <!-- <span class="tip" style="color:red;">帐户余额不足</span> -->
            <span class="tip" style="color:#409eff;">最低100元</span>
          </div>
        </li>
        <li class="clearfix">
          <span class="tit">支行名：</span>
          <div class="inputbox">
            <el-input v-model="form.bankBranch" placeholder="请输入支行名"></el-input>
          </div>
        </li>
        <li class="clearfix">
          <span class="tit">银联号：</span>
          <div class="inputbox">
            <el-input v-model="form.cnapsNo" placeholder="请输入银联号"></el-input>
          </div>
        </li>
        <li class="clearfix">
          <span class="tit">付款备注：</span>
          <div class="inputbox">
            <el-input v-model="form.remark" placeholder="请输入付款备注"></el-input>
          </div>
        </li>
        <li class="clearfix">
          <span class="tit">二级密码：</span>
          <div class="inputbox">
            <el-input v-model="form.payPassword" placeholder="请输入二级密码"></el-input>
          </div>
        </li>
        <li class="clearfix">
          <span class="tit"></span>
          <div class="inputbox">
            <el-button size="small" type="primary" @click="withdraw">确定提现</el-button>
          </div>
        </li>
      </ul>
    </div>
    <div v-else style="text-align: center; margin-top: 50px; font-size: 16px; color: red;">
      个人账户无电子户转账权限，如需使用请更换企业账号！
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCro: this.$store.state.isCro,
      account: 0, // 账户余额
      isfrozen: true, // 是否冻结
      fee: 0, // 手续费
      bankName: '', // 银行
      player: 0, // 收款人
      bankNumber: '', // 银行账号
      cansettle: 0, // 可提现金额
      money: '',
      form: {
        bankName: '',
        player: '',
        bankNumber: '',
        money: '',
        type: 0,
        bankBranch: '',
        cnapsNo: '',
        remark: '',
        payPassword: ''
      }
    };
  },
  methods: {
    // 获取信息
    getInfo() {
      this.$api.home
        .withdrawApply()
        .then((data) => {
          if (data.status === 200) {
            this.account = data.data.overMoney;
            this.fee = data.data.fee.toFixed(2);
            this.bankName = data.data.bankName;
            this.player = data.data.realName;
            this.bankNumber = data.data.bankNumber;
            this.cansettle = data.data.canSettlementMoney;
            this.isfrozen = data.data.activated;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 输入限制
    applyMoney(num) {
      if (num > this.cansettle) {
        this.money = this.cansettle;
      }
    },
    // 申请提现
    withdraw() {
      this.$api.home
        .TransferUsingPaid({
          amount: this.form.money,
          bankName: this.form.bankName,
          bankNumber: this.form.bankNumber,
          player: this.form.player,
          type: this.form.type,
          bankBranch: this.form.bankBranch,
          cnapsNo: this.form.cnapsNo,
          remark: this.form.remark,
          payPassword: this.form.payPassword
        })
        .then((data) => {
          if (data.status === 200) {
            this.$messageSuccess('申请成功！');
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    }
  },
  created() {
    this.getInfo();
  }
};
</script>

<style lang="scss" scoped>
.gs_title {
  background: var(--theme-color);
}

.textBox {
  margin: 10px 0;
  padding: 10px 20px;
  background: #d9edf7;
  color: #008194;
  font-size: 14px;
  border-radius: 4px;

  p {
    margin-bottom: 5px;
  }
}

.contentList {
  text-align: center;
  margin-top: 20px;
  position: relative;

  .recordBtn {
    position: absolute;
    top: 0;
    right: 10px;
  }

  ul {
    display: inline-block;
    padding-right: 80px;

    li {
      margin-bottom: 10px;

      .tit {
        float: left;
        width: 120px;
        text-align: right;
        margin-right: 15px;
        height: 32px;
        line-height: 32px;
      }

      .inputbox {
        float: left;
        height: 32px;
        line-height: 32px;

        .account {
          color: green;

          &.unable {
            text-decoration: line-through;
            color: #999;
          }
        }

        .tip {
          display: inline-block;
          vertical-align: middle;
          margin-left: 10px;
        }
      }
    }
  }
}

.frozen {
  background: red;
  margin-left: 20px;
  color: #fff;
  display: inline-block;
  padding-left: 5px;
  position: relative;
  height: 22px;
  line-height: 22px;

  &:after {
    content: '';
    position: absolute;
    border: 1px solid red;
    border-width: 11px 5px;
    top: 0;
    right: -10px;
    border-right-color: transparent;
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
</style>
