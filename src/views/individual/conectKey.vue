<!--
 * @Description: 个人中心
 * @Author: xu wei
 * @Date: 2020-03-07 15:43:10
 * @LastEditTime: 2020-06-16 16:24:56
 * @LastEditors: gao shuai
 -->
<template>
  <div class="partinstall communication-key-page">
    <div class="bg_fff">
      <div class="gs_listcontainer">
        <p class="tip_red">通讯密匙</p>
        <el-divider></el-divider>
        <div>
          <p class="mgb10 key-description" :style="$root.uiMode === 'modern' ? null : { color: '#909399', marginLeft: '5%', lineHeight: '50px' }">这是网站与您的充值服务器网关的通讯密匙，建议您不定期更换密匙</p>
          <div class="key-field-row" :style="$root.uiMode === 'modern' ? null : { marginLeft: '20%', width: '55%' }">
            <el-input placeholder="请输入内容" v-model="baseInfo.serverKey" :readonly="true">
              <template slot="prepend">通讯秘钥</template>
              <template slot="append">
                <el-button v-if="!isRestrictedAccount" type="primary" style="background-color: #409EFF;color: white;" @click="changeKey">更换秘钥</el-button>
              </template>
            </el-input>
          </div>
          <p class="mgb10 key-sync-note" :style="$root.uiMode === 'modern' ? null : { color: '#909399', marginLeft: '30%', lineHeight: '70px' }">系统将同步到您的充值服务器网关，请开启您的充值网关</p>
          <!-- <el-button type="danger" style="margin-left: 30%;width: 180px;">确定保存</el-button> -->
        </div>
      </div>
      <div class="gs_listcontainer">
        <p class="tip_red">接口秘钥</p>
        <el-divider></el-divider>
        <div>
          <p class="mgb10 key-description" :style="$root.uiMode === 'modern' ? null : { color: '#909399', marginLeft: '5%', lineHeight: '50px' }">这是API接口校验使用的秘钥，建议您不定期更换密匙</p>
          <div class="key-field-row" :style="$root.uiMode === 'modern' ? null : { marginLeft: '20%', width: '55%' }">
            <el-input placeholder="请输入内容" v-model="baseInfo.signKey" :readonly="true">
              <template slot="prepend">接口秘钥</template>
              <template slot="append">
                <el-button v-if="!isRestrictedAccount" type="primary" style="background-color: #409EFF;color: white;" @click="changeSignKey">更换秘钥</el-button>
              </template>
            </el-input>
          </div>
          <!-- <p class="mgb10" style="color: #909399;margin-left: 30%;line-height: 70px;">系统将同步到您的充值服务器网关，请开启您的充值网关</p> -->
          <!-- <el-button type="danger" style="margin-left: 30%;width: 180px;margin-top: 3%;">确定保存</el-button> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      baseInfo: {
        serverKey: '', // 通讯密钥
        merchantMark: '', // 商户标识
        signKey: ''// 接口秘钥
      }
    };
  },
  computed: {
    ...mapState(['settlementType']),
    isRestrictedAccount() {
      const settlementType = Number(this.settlementType);
      return settlementType === 3 || settlementType === 4;
    }
  },
  methods: {
    // 获取用户信息
    getUser() {
      this.$api.home
        .getUserinfo()
        .then((data) => {
          this.baseInfo.serverKey = data.data.secretKey;
          this.baseInfo.merchantMark = data.data.uuid;
          this.baseInfo.signKey = data.data.signKey;
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 更换密钥
    changeKey() {
      this.$api.personCenter
        .changeKey()
        .then((data) => {
          if (data.status === 200) {
            this.$messageSuccess('更新成功！');
            this.getUser();
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    changeSignKey() {
      this.$api.personCenter
        .changeSignKey()
        .then((data) => {
          if (data.status === 200) {
            this.$messageSuccess('更新成功！');
            this.getUser();
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    }
  },
  created() {
    this.getUser();
  }
};
</script>

<style lang="scss" scoped>
.gs_title {
  background: var(--theme-color);
}
.tip_red {
  color: #3c8dbc;
  // padding: 10px 0px;
  font-weight: bold;
  font-size: 15px;
}
.gs_listcontainer {
  padding-bottom: 20px;
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
