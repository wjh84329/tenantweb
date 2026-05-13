<template>
  <div class="home">
    <div class="settingbox clearfix">
      <div class="userinfo gs_shadow">
        <div class="gs_title">用户信息</div>
        <div class="infobox">
          <div class="avatar-uploader" accept=".jpg,.jpeg,.png" action="" :http-request="() => { }"
            :before-upload="fileSelect" :show-file-list="false">
            <!-- <img v-if="userInfo.imgurl" :src="userInfo.imgurl" class="avatar"> -->
            <!-- <img v-else src="../assets/images/header.png" class="avatar"> -->
             <img src="../assets/images/header.png" class="avatar">
          </div>
          <!-- <div class="textbox">
            <p class="acout">{{ userInfo.userName }}

            </p>
            <p class="text">{{ userInfo.id }}</p>

          </div> -->
        </div>

      </div>
      <div class="topinfo clearfix">

        <div class="chargebox gs_shadow">
          <ul>
            <li>
              <p class="tit">今日充值</p>
              <p class="num">{{ chargeInfoData.todaycharge }}</p>
            </li>
            <li>
              <p class="tit">今日收入</p>
              <p class="num">{{ chargeInfoData.todayProfit }}</p>
            </li>
            <li v-loading="chargeInfoData.waitFlag">
              <p class="tit">等待发送</p>
              <el-tooltip v-if="chargeInfoData.waitSend > 0" class="item" effect="dark" content="点击下发" placement="bottom">
                <p class="num" style="cursor:pointer;" @click="waitSentAll">{{ chargeInfoData.waitSend }}</p>
              </el-tooltip>
              <p class="num" v-else>{{ chargeInfoData.waitSend }}</p>
            </li>
            <li v-if="userInfo.type">
              <p class="tit">代理收入</p>
              <p class="num">{{ chargeInfoData.agentProfit }}</p>
            </li>
            <li v-if="userInfo.type">
              <p class="tit">下属商户</p>
              <p class="num">{{ chargeInfoData.tenantCount }}</p>
            </li>
            <li v-if="userInfo.type">
              <p class="tit">代理充值</p>
              <p class="num">{{ chargeInfoData.agentPayAmount }}</p>
            </li>
          </ul>
          <div class="carousel">
            <el-carousel height="40px" direction="vertical" :autoplay="true">
              <el-carousel-item v-for="item in noticeList" :key="item.id">
                <div class="textbox clearfix" @click="detialNotice(item)">
                  <span class="tit">{{ item.title }}</span>
                  <span class="time">{{ item.date }}</span>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
      </div>
    </div>

    <div class="tablebox mgt15">
      <div class="gs_title">最新充值订单</div>
      <div class="gs_tablebox">
        <el-table ref="moduleTable" size="mini" :data="tableData" border style="width: 100%" stripe>
          <el-table-column prop="orderNumber" label="订单号" width="180">
          </el-table-column>
          <el-table-column prop="playerAccount" label="充值账号" width="120">
          </el-table-column>
          <el-table-column prop="playerQq" label="玩家QQ" width="120">
          </el-table-column>
          <el-table-column prop="partitionsName" label="所属分区" width="230">
          </el-table-column>
          <el-table-column label="订单金额">
            <template slot-scope="scope">
              <span>{{ scope.row.amount.toFixed(2) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="收入">
            <template slot-scope="scope">
              <span>{{ scope.row.profit.toFixed(2) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="productName" label="充值方式">
          </el-table-column>
          <el-table-column prop="orderDate" label="充值时间" width="110">
            <template slot-scope="scope">
              <p style="height:18px;">{{ scope.row.orderDate ? scope.row.orderDate.split(' ')[0] : '' }}</p>
              <p style="height:18px;color:#999;">{{ scope.row.orderDate ? scope.row.orderDate.split(' ')[1] : '' }}</p>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="订单状态" width="180">
            <template slot-scope="scope">
              <!-- <span v-if="scope.row.state===1" style="color:green;">成功</span> -->
              <el-button v-if="scope.row.state === 1" size="mini" type="success">成功</el-button>
              <el-tooltip v-else class="item" effect="dark" :content="waitTableFlag ? '请稍后点击下发' : '点击下发'"
                placement="bottom">
                <el-button size="mini" type="warning"
                  @click="waitSent(scope.row.orderNumber, scope.row.partitionId, scope.$index)"><i
                    :class="{ 'el-icon-loading': waitTableFlag && waitTableIndex === scope.$index }"></i>待发送</el-button>
                <!-- <span style="color:#f56c6c;cursor:pointer;" @click="waitSent(scope.row.orderNumber,scope.$index)"><i :class="{'el-icon-loading':waitTableFlag&&waitTableIndex===scope.$index}"></i>待发送</span> -->
              </el-tooltip>
              <el-button size="mini" type="primary" plain @click="handOrder(scope.row.partitionId,scope.row.productId,scope.row.playerAccount)">补发</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      // 帐户信息
      accountInfo: {
        accout: 0.0,
        frozen: 0.0,
        withdraw: 0.0
      },
      // 提现金额，提现手续费
      cashInfo: {
        amount: 0.0,
        fee: 0.0
      },
      // 充值信息
      chargeInfoData: {
        waitFlag: false,
        todaycharge: 0.0,
        todayProfit: 0.0,
        waitSend: 0,
        agentProfit: 0.0,
        tenantCount: 0,
        agentPayAmount: 0.0
      },
      // 功能设置
      functionSet: {
        serverSwitch: false,
        gamerSwitch: false,
        phoneSwitch: false,
        serverPhone: '', // 在线客服电话
        serverQQ: [], // 客服QQ联系
        leaveCount: 0, // 留言条数
        linkurl: '' // 推广注册的链接
      },
      // 修改密码弹框
      dialog: {
        show: false,
        oldpwd: '',
        newpwd: '',
        surepwd: ''
      },
      // 公告详情弹框
      noticeDialog: {
        show: false,
        detail: {}
      },
      // 用户信息
      userInfo: {
        id: '',
        userName: '',
        type: false,
        imgurl: '',
        isSigned: false,
        signUrl: ''
      },
      noticeList: [], // 公告信息
      waitTableFlag: false, // table中的等待
      waitTableIndex: '', // table中的等待index
      tableData: [],
      dialog3: {
        show: false
      },
      dialog4: {
        show: false, // 弹框的显隐
        phone: '', // 手机号
        serverlist: []
      },
      dialogqq: {
        show: false,
        name: '', // 客服名称
        qq: '' // QQ号码
      },
      dialogcharge: {
        show: false,
        minrecharge: '',
        maxrecharge: '',
        minrechargeValue: 0,
        maxrechargeValue: 0,
        nowMincharge: 0,
        nowMaxcharge: 0
      },
      dialogSkin: {
        show: false,
        skinNum: 0
      }
    };
  },
  methods: {
    // 手动补发
    handOrder(partitionId, productId, playerAccount) {
      this.$api.reorder
        .handOrder({
          partitionId: partitionId,
          productId: productId,
          playerAccount: playerAccount,
          payAmount: 10,
          Extra: 0,
          isGiveAmount: false,
          isRedPacketAmount: false
        })
        .then((data) => {
          if (data.status === 200) {
            this.$messageSuccess('补发成功！');
            this.orderList();
            this.chargeInfo();
          } else {
            this.$messageError(data.message);
          }
        })
        .catch((err) => {
          this.handFlag = false;
          this.$messageError(err.message);
        });
    },
    // 获取用户图像
    getUserProfit() {
      this.$api.home
        .getProfile()
        .then((data) => {
          this.userInfo.imgurl = data.data;
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 图片上传之前的勾子
    fileSelect(file) {
      let form = new FormData();
      form.append('file', file);
      this.$api.home
        .uploadprofit(form)
        .then(() => {
          this.$messageSuccess('上传成功！');
          this.getUserProfit();
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 获取帐户信息
    getAccountInfo() {
      this.$api.home
        .getAccountInfo()
        .then((data) => {
          if (data.status === 200) {
            this.accountInfo.accout = data.data.accountAmount.toFixed(2);
            this.accountInfo.frozen = data.data.frozenAmount.toFixed(2);
            this.accountInfo.withdraw = data.data.withdrawableAmount.toFixed(2);
          } else if (data.status === 204) {
            this.accountInfo.accout = 0.0;
            this.accountInfo.frozen = 0.0;
            this.accountInfo.withdraw = 0.0;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },

    // 获取充值信息
    chargeInfo() {
      this.$api.home
        .chargeInfo()
        .then((data) => {
          if (data.status === 200) {
            this.chargeInfoData.todaycharge = data.data.payAmount.toFixed(2);
            this.chargeInfoData.todayProfit = data.data.profit.toFixed(2);
            this.chargeInfoData.waitSend = data.data.toBeIssuedState;
            this.chargeInfoData.agentProfit = data.data.agentProfit.toFixed(2);
            this.chargeInfoData.tenantCount = data.data.tenantCount;
            this.chargeInfoData.agentPayAmount = data.data.agentPayAmount.toFixed(
              2
            );
          } else if (data.status === 204) {
            this.chargeInfoData.todaycharge = 0.0;
            this.chargeInfoData.todayProfit = 0.0;
            this.chargeInfoData.waitSend = 0;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },

    // 最新充值订单列表
    orderList() {
      this.$api.home
        .orderList({
          PageNumber: 1,
          pageSize: 20
        })
        .then((data) => {
          if (data.status === 200) {
            this.tableData = data.data;
            console.log(this.tableData);
          } else if (data.status === 204) {
            this.tableData = [];
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },

    // 获取用户信息
    getUser() {
      this.$api.home
        .getUserinfo()
        .then((data) => {
          this.userInfo.id = data.data.id;
          this.userInfo.userName = data.data.userName;
          this.userInfo.type = data.data.type;
          this.$store.commit('saveuuid', data.data.uuid);
          this.$store.commit('saveType', data.data.type);
          this.$store.commit('changeNickName', data.data.userName);
          this.$store.commit('changeId', data.data.id);
          this.functionSet.serverSwitch = data.data.serviceState;
          this.functionSet.gamerSwitch = data.data.leaveState;
          this.functionSet.phoneSwitch = data.data.phoneState;
          this.dialogSkin.skinNum = data.data.defaultSkin;
          this.userInfo.isSigned = data.data.isSigned;
          this.userInfo.signUrl = data.data.signUrl;
          if (this.userInfo.type) {
            this.getlink();
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },

    // 订单列表等待下发接口
    waitSendOrder(orderNum) {
      this.$api.home
        .waitSent({
          orderNumber: orderNum
        })
        .then((data) => {
          if (data.status === 200) {
            setTimeout(() => {
              this.waitTableFlag = false;
              this.waitTableIndex = '';
              this.$messageSuccess('下发成功');
              this.orderList();
              this.chargeInfo();
            }, 1500);
          }
        })
        .catch((err) => {
          this.waitTableFlag = false;
          this.waitTableIndex = '';
          this.$messageError(err.message);
        });
    },
    // 等待下发（先发分区通讯检测，再调单条下发）
    waitSent(orderNum, id, index) {
      if (!this.waitTableFlag) {
        this.waitTableFlag = true;
        this.waitTableIndex = index;
        this.ensurePartitionCommunication(id)
          .then(() => {
            this.waitSendOrder(orderNum);
          })
          .catch(() => {
            this.waitTableFlag = false;
            this.waitTableIndex = '';
            this.$messageError('分区检测失败！');
          });
      }
    },
    // 等待下发全部：先通讯检测再批量下发
    async waitSentAll() {
      if (this.chargeInfoData.waitFlag) {
        return;
      }
      this.chargeInfoData.waitFlag = true;
      try {
        const listRes = await this.$api.home.orderList({
          PageNumber: 1,
          pageSize: 100
        });
        if (listRes.status !== 200 && listRes.status !== 204) {
          throw new Error('获取订单列表失败');
        }
        const rows = this.normalizeHomeOrderListPayload(listRes.data);
        const partitionIds = [
          ...new Set(
            rows
              .filter((r) => r.state === 2 && r.partitionId > 0)
              .map((r) => r.partitionId)
          )
        ];
        if (this.chargeInfoData.waitSend > 0 && partitionIds.length === 0) {
          this.$messageError(
            '未在列表中加载到待发送订单，请刷新页面后重试，或使用订单行的单条下发'
          );
          return;
        }
        for (let i = 0; i < partitionIds.length; i += 1) {
          await this.ensurePartitionCommunication(partitionIds[i]);
        }
        const data = await this.$api.home.waitSentAll();
        if (data.status === 200) {
          const msg =
            typeof data.data === 'string' ? data.data : '下发成功';
          this.$messageSuccess(msg);
          this.orderList();
          this.chargeInfo();
        } else {
          this.$messageError('批量下发失败');
        }
      } catch (e) {
        const m =
          (e && e.message) ||
          (e && e.Message) ||
          '';
        if (m === '分区检测失败' || m.indexOf('分区') >= 0) {
          this.$messageError('分区检测失败！');
        } else if (m) {
          this.$messageError(m);
        } else {
          this.$messageError('下发超时,请检测网关！');
        }
      } finally {
        this.chargeInfoData.waitFlag = false;
      }
    }

  },
  created() {
    // this.getAccountInfo();
    // this.cashWithdraw();
    this.chargeInfo();
    // this.getNotice();
    this.orderList();
    //  this.servicePhone();
    // this.getMessageCount();
    this.getUser();
    this.getUserProfit();
    // this.checkpersonInfo();
    // this.getMimicharge();
  }
};
</script>

<style lang="scss" scoped>
.gs_title {
  background: var(--theme-color);
}
.topinfo {
  float: right;
  width: 784px;

  .moneybox {
    padding: 2px 35px 1px 15px;
    position: relative;

    ul {
      border-bottom: 1px dashed #63aafa;
      padding: 20px 0 16px;

      li {
        float: left;
        width: 120px;
        text-align: center;

        &.linebox {
          width: 52px;
          text-align: center;

          .line {
            display: inline-block;
            height: 48px;
            width: 1px;
            background: #63aafa;
          }
        }

        .tit {
          font-size: 15px;
          color: #313131;
        }

        .number {
          margin-top: 9px;
          font-size: 16px;
          color: #313131;
        }
      }
    }

    .getbtn {
      position: absolute;
      right: 20px;
      top: 20px;
    }

    .btns {
      padding: 10px 0;

      span {
        display: inline-block;
        font-size: 12px;
        color: #63aafa;
        cursor: pointer;

        &.linebtn {
          padding-left: 15px;
          border-left: 1px solid #63aafa;
          margin-left: 15px;
        }
      }
    }
  }

  .chargebox {
    margin-top: 15px;
    padding: 2px 20px 1px;

    ul {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      border-bottom: 1px dashed #63aafa;
      padding: 20px 0 21px;

      li {
        width: 105px;
        text-align: center;
      }

      .tit {
        font-size: 15px;
        color: #313131;
      }

      .num {
        font-size: 16px;
        color: #313131;
        margin-top: 10px;
      }
    }

    .carousel {
      padding-left: 40px;
      background: url(../assets/images/tip.png) no-repeat 0 center;

      .textbox {
        display: flex;
        flex-flow: row nowrap;
        height: 40px;
        line-height: 40px;
        font-size: 12px;
        color: #63aafa;
        cursor: pointer;

        .tit {
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .time {
          width: 130px;
          margin-left: 5px;
          text-align: right;
        }
      }
    }
  }
}

.settingbox {
  .userinfo {
    height: 151px;
    float: left;
    width: calc(100% - 795px);

    .infobox {
      text-align: center;
      margin-top: 12px;

      .avatar-uploader {
        display: inline-block;
        width: 82px;
        height: 82px;
        border-radius: 50%;
        vertical-align: middle;

        .avatar {
          display: block;
          width: 82px;
          height: 82px;
          border-radius: 50%;
        }
      }

      .textbox {
        // display: inline-block;
        // vertical-align: middle;
        // margin-left: 15px;
        margin-top: 22px;

        .acout {
          font-size: 14px;
          color: #222;
        }

        .text {
          font-size: 12px;
          color: #222;
          margin-top: 5px;
          margin-bottom: 5px;
        }

        .range {
          span {
            display: inline-block;
            height: 26px;
            line-height: 26px;
            font-size: 12px;
            color: #434343;
            padding-left: 23px;
            padding-right: 5px;
            border-radius: 4px;
            background: #ffe931 url(../assets/images/zshi.png) no-repeat 6px center;
          }
        }
      }
    }

    .operbox {
      text-align: center;
      padding: 12px 0 24px;

      li {
        display: inline-block;
        width: 82px;
        border-right: 1px solid #63aafa;
        font-size: 12px;

        &.noboder {
          border-right: none;
        }

        span {
          cursor: pointer;
          color: #63aafa;
        }
      }
    }
  }
}

.functionbox {
  ul {
    padding: 0 28px 3px;
    margin-top: -8px;

    li {
      height: 40px;
      line-height: 40px;
      border-bottom: 1px dashed #63aafa;
      padding-left: 34px;

      .basecolor {
        color: #63aafa;
      }

      .redcolor {
        color: #f27474;
      }

      .linkspan {
        cursor: pointer;

        &:hover {
          color: #20abfc;
          text-decoration: underline;
        }
      }

      &.icon1 {
        background: url(../assets/images/set_icon1.png) no-repeat 0 center;
      }

      &.icon2 {
        background: url(../assets/images/set_icon2.png) no-repeat 0 center;
      }

      &.icon3 {
        background: url(../assets/images/set_icon3.png) no-repeat 0 center;
      }

      &.icon4 {
        background: url(../assets/images/set_icon4.png) no-repeat -2px center;
        background-size: auto 18px;
      }

      &.icon5 {
        background: url(../assets/images/set_icon5.png) no-repeat -2px center;
        background-size: auto 18px;
      }

      &.icon6 {
        background: url(../assets/images/set_icon6.png) no-repeat 0 center;
        background-size: auto 17px;
      }

      &:last-child {
        border-bottom: none;
      }
    }
  }

  .settingBtn {
    cursor: pointer;
    color: #63aafa;
    margin-right: 4px;
  }
}

.tablebox {
  background: #fff;
}

.opeartbox {
  padding: 7px 20px 5px;
  background: #fff;

  ul {
    li {
      float: left;
      margin-right: 15px;
      margin-bottom: 10px;

      .tit {
        display: inline-block;
        vertical-align: middle;
        width: 80px;
        font-size: 14px;
        color: #2d2d2d;
        margin-right: 5px;
      }

      .txtbox {
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
}

.noticeDetail {
  .title {
    text-align: center;
  }

  .time {
    text-align: center;
    margin-top: 15px;
    padding-bottom: 8px;
    border-bottom: 1px solid #ccc;
  }

  .content {
    padding: 10px 0;
    word-break: break-all;
    height: 400px;
    overflow-y: auto;
  }
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

.minichargebox {
  font-size: 16px;
  padding-left: 20px;

  .list {
    display: flex;
    flex-flow: row nowrap;

    .tit {
      width: 120px;
      height: 32px;
      line-height: 32px;
    }
  }
}

.areaContainer {
  padding-left: 20px;

  li {
    position: relative;
    float: left;
    border: 2px solid transparent;
    padding: 2px;
    cursor: pointer;
    margin-right: 18px;

    &:hover {
      border-color: #00b066;
    }

    &.on {
      border-color: #00b066;

      &:after {
        content: '';
        position: absolute;
        width: 16px;
        height: 17px;
        background: url(../assets/images/checked.png) no-repeat center center;
        bottom: 0;
        right: 0;
      }
    }

    img {
      display: block;
      width: 200px;
      height: 150px;
    }
  }
}

.stateColor {
  background: #409eff;
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

  &.color2 {
    background: #f56c6c;

    &:after {
      border-color: #f56c6c;
    }

    &:before {
      border-right-color: #f56c6c;
    }
  }

  &:after {
    content: '';
    position: absolute;
    border: 1px solid #409eff;
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
    border-right-color: #409eff;
  }
}
</style>
