<!--
 * @Description: 主进入口
 * @Author: gao shuai
 * @Date: 2020-03-16 18:56:21
 * @LastEditTime: 2020-09-19 17:42:27
 * @LastEditors: gao shuai
 -->
<template>
  <div class="main" :class="{ 'tenant-ui-modern-shell': $root.uiMode === 'modern' }">
    <aside v-if="$root.uiMode === 'modern'" class="tenant-sub-sidebar tenant-employee-sidebar">
      <div class="tenant-sub-brand" @click="refresh('/employeemain/employeehome')">
        <site-logo variant="logo3" logo-type="site" width="188px" height="54px" fit="contain" alt="网站logo" />
      </div>
      <nav class="tenant-employee-nav">
        <button :class="{ active: $route.path === '/employeemain/employeehome' }" @click="refresh('/employeemain/employeehome')">
          <tenant-icon name="home" /><span>首页</span>
        </button>
        <button :class="{ active: $route.path === '/employeemain/employeeOrdermanagement' }" @click="refresh('/employeemain/employeeOrdermanagement')">
          <tenant-icon name="order" /><span>订单管理</span>
        </button>
      </nav>
      <button class="tenant-sub-back" @click="loginOut"><tenant-icon name="logout" /><span>退出登录</span></button>
    </aside>
    <header v-if="$root.uiMode === 'modern'" class="tenant-sub-topbar">
      <div><span>员工中心</span><i>/</i><strong>{{ $route.path === '/employeemain/employeeOrdermanagement' ? '订单管理' : '首页' }}</strong></div>
      <div class="tenant-sub-profile"><span>{{ (nickName || 'T').slice(0, 1).toUpperCase() }}</span><strong>{{ nickName || 'Tenant' }}</strong></div>
    </header>
    <div class="header">
      <div class="headbox clearfix">
        <div class="logo"><site-logo variant="legacy" alt="网站logo" /></div>
        <ul class="navbox clearfix">
          <li>
            <span class="icon1" @click="refresh('/employeemain/employeehome')">首页</span>
          </li>
          <li>
            <span class="icon1" @click="refresh('/employeemain/employeeOrdermanagement')">订单管理</span>
          </li>

        </ul>
        <div class="count">{{ nickName }}</div>
      </div>
    </div>
    <div class="container">
      <div class="midleContaner">
        <div class="slider">
          <div class="top_tit">控制面板</div>
          <ul>

            <li><span class="icon11" @click="loginOut">退出登录</span></li>
          </ul>
        </div>
        <div class="contentbox">
          <router-view />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapState } from 'vuex';
import chargeLink from '../components/chargeLink';
import Mgr from '../assets/js/SecurityService';
import TenantIcon from '../components/TenantIcon';
// import mgrs from '../assets/js/securityapi';
// import { netUrl } from '../assets/js/version';
// import axios from 'axios';
export default {
  name: 'Home',
  inject: ['reload'],
  components: {
    // eslint-disable-next-line vue/no-unused-components
    chargeLink,
    TenantIcon
  },
  data() {
    return {
      // nickName: '', // 用户名
      // isAgent: false, // 是否为代理
      // id: '',
      dialog: {
        show: false,
        cq3: '', // 传奇3
        ty: '', // 传奇世界
        wg: '', // 热血传奇
        sql: '', // sql
        ltcq: '',
        yktl: '',
        dslh: '',
        ymcq: '',
        cqby: '',
        xbnz: '',
        jxqy: ''
      }
    };
  },
  computed: {
    ...mapState([
      'preview',
      'floatstyle',
      'floatingpictures',
      'chargeUrl',
      'userType',
      'id',
      'nickName'
    ])
  },
  watch: {
    floatingpictures(n) {
      console.log(n);
    }
  },
  methods: {
    // 获取用户信息
    getUser() {
      this.$api.home
        .getUserinfo()
        .then(data => {
          // this.nickName = data.data.userName;
          // this.isAgent = data.data.type;
          // this.id = data.data.id;
          this.$store.commit('saveuuid', data.data.uuid);
          this.$store.commit('saveType', data.data.type);
          this.$store.commit('changeNickName', data.data.userName);
          this.$store.commit('changeId', data.data.id);
          console.log(data.data);
          this.$store.commit('setEnabledPaid', data.data.isEnabledPaid);
          this.$store.commit('setEnabledWxValid', data.data.isEnabledWxValid);
          this.$store.commit('setPlatOpenWxValid', data.data.isPlatOpenWxValid);
        })
        .catch(err => {
          this.$messageError(err.message);
        });
    },
    // 退出登录
    loginOut() {
      // this.$api.home
      //   .loginOut()
      //   .then((data) => {})
      //   .catch((err) => {
      //     this.$messageError(err.message);
      //   });
      // 如果是从代理进入则直接关闭
      if (window.sessionStorage.getItem('agentMerchantId')) {
        window.opener = null;
        window.open('', '_self');
        window.close();
        return;
      }
      // 判断用户信息
      let user = new Mgr();
      user
        .getUser()
        .then(data => {
          if (
            data.profile.role === 'SuperAdmin' ||
            data.profile.role === 'Admin'
          ) {
            window.opener = null;
            window.open('', '_self');
            window.close();
          } else {
            user.signOut();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    // 跳转路由刷新
    refresh(path) {
      if (this.$route.path.indexOf(path) > -1) {
        this.reload();
      } else {
        this.$router.push({ path: path });
      }
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
.main {
  position: relative;
  padding-top: 60px;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  overflow: hidden;
  background: #e6edf5;

  .header {
    position: absolute;
    width: 100%;
    height: 60px;
    top: 0;
    left: 0;
    background: #24adec;

    .headbox {
      width: 80vw;
      margin: 0 auto;
      height: 60px;

      .logo {
        margin-top: 13px;
        float: left;
      }

      .navbox {
        float: left;
        margin-top: 15px;
        margin-left: 50px;

        li {
          float: left;
          padding: 0 35px;
          height: 28px;
          line-height: 28px;
          border-right: 1px solid #fff;
          color: #fff;
          font-size: 16px;
          // position: relative;
          span {
            cursor: pointer;
          }
          // &::after{
          //   content: '';
          //   position: absolute;
          //   right: 0;
          //   top: 20%;      /* 距顶部30% */
          //   height: 60%;   /* 高度为元素的40% */
          //   width: 0;
          //   border-right: 1px solid #fff;
          // }
        }
      }

      .count {
        float: right;
        height: 28px;
        line-height: 28px;
        padding: 0 20px;
        margin-right: 30px;
        font-size: 19px;
        color: #fff;
        margin-top: 15px;
      }
    }
  }

  .container {
    height: 100%;
    box-sizing: border-box;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
    }

    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.5);
      border-radius: 10px;
    }

    .midleContaner {
      width: 80vw;
      margin: 20px auto 22px auto;
      position: relative;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

      //width: 1286px;
      //margin: 20px auto 22px;
      //position: relative;
      // box-shadow: 0 0 10px rgba(0, 0, 0, .25);
      .slider {
        position: absolute;
        width: 178px;
        background: #0398d6;
        height: 100%;
        left: 0;
        top: 0;

        .top_tit {
          height: 20px;
          line-height: 50px;
          text-align: center;
          font-size: 18px;
          font-weight: bold;
          color: #3c4386;
          background: #0398d6;
          background: url(../assets/images/line_big.png) no-repeat 0 center;
        }

        ul {
          margin-top: 30px;

          li {
            height: 35px;
            line-height: 35px;
            margin-bottom: 10px;
            color: #fff;
            font-size: 14px;

            span {
              display: block;
              cursor: pointer;
              height: 35px;
              padding-left: 66px;

              &.icon1 {
                background: url(../assets/images/s_icon1.png) no-repeat 39px center;
              }

              &.icon2 {
                background: url(../assets/images/s_icon2.png) no-repeat 39px center;
              }

              &.icon3 {
                background: url(../assets/images/s_icon3.png) no-repeat 39px center;
              }

              &.icon4 {
                background: url(../assets/images/s_icon4.png) no-repeat 39px center;
              }

              &.icon5 {
                background: url(../assets/images/s_icon5.png) no-repeat 39px center;
              }

              &.icon6 {
                background: url(../assets/images/s_icon6.png) no-repeat 39px center;
              }

              &.icon7 {
                background: url(../assets/images/s_icon7.png) no-repeat 39px center;
              }

              &.icon8 {
                background: url(../assets/images/s_icon8.png) no-repeat 39px center;
              }

              &.icon9 {
                background: url(../assets/images/s_icon9.png) no-repeat 39px center;
              }

              &.icon10 {
                background: url(../assets/images/s_icon10.png) no-repeat 39px center;
              }

              &.icon11 {
                background: url(../assets/images/s_icon11.png) no-repeat 39px center;
              }
            }
          }
        }
      }

      .contentbox {
        min-height: 800px;
        margin-left: 178px;
      }
    }
  }

  .areaContainer {
    padding: 0 0 20px 15px;

    li {
      position: relative;
      float: left;
      border: 1px solid #ddd;
      padding: 4px;
      cursor: pointer;
      margin-right: 17px;

      .imgbox {
        padding: 15px 8px;
      }

      .mask {
        display: none;
        position: absolute;
        top: 4px;
        left: 4px;
        width: 112px;
        height: 90px;
        background: rgba(0, 0, 0, 0.7);
        color: #fff;
        text-align: center;
        line-height: 90px;
      }

      &:hover {
        border-color: #00b066;

        .mask {
          display: block;
        }
      }

      img {
        display: block;
      }
    }
  }
}
</style>
