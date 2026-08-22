<!--
 * @Description: 个人中心主入口
 * @Author: gao shuai
 * @Date: 2020-06-13 11:32:01
 * @LastEditTime: 2020-08-19 14:49:10
 * @LastEditors: gao shuai
-->
<template>
  <div class="main" :class="{ 'tenant-ui-modern-shell': $root.uiMode === 'modern' }">
    <aside v-if="$root.uiMode === 'modern'" class="tenant-sub-sidebar">
      <div class="tenant-sub-brand" @click="setActive('/main/home')">
        <site-logo variant="logo3" logo-type="site" width="188px" height="54px" fit="contain" alt="网站logo" />
      </div>
      <tenant-global-nav active-section="behalf" :sub-items="behalfSubItems" @navigate="setActive" />
      <button class="tenant-sub-back" @click="setActive('/main/home')"><tenant-icon name="home" /><span>返回平台</span></button>
    </aside>
    <header v-if="$root.uiMode === 'modern'" class="tenant-sub-topbar">
      <div><span>商户中心</span><i>/</i><strong>代付管理</strong></div>
      <div class="tenant-sub-profile"><span>{{ (nickName || 'T').slice(0, 1).toUpperCase() }}</span><strong>{{ nickName || 'Tenant' }}</strong></div>
    </header>
    <div class="header" :style="headerStyle">
      <div class="headbox clearfix" :style="headerStyle" style="display: flex;">
      <div class="logo">
        <site-logo variant="logo3" style="width: 250px;height: 50px;" alt="网站logo" />
      </div>
        <ul class="navbox clearfix" style="width: 75%;">
          <li :class="{ active: activeNav === '/behalf/baseInfo' }"
          :style="activeNav === '/behalf/baseInfo' ? activeNavStyle : (hoverNav === '/behalf/baseInfo' ? hoverNavStyle : null)"

          @click="setActive('/behalf/baseInfo')">
            <span class="icon1"
              >账户管理</span
            >
          </li>
          <li :class="{ active: activeNav === '/audit/audit' }"
          :style="activeNav === '/audit/audit' ? activeNavStyle : (hoverNav === '/audit/audit' ? hoverNavStyle : null)"

         @click="setActive('/audit/audit')">
            <span class="icon1">订单管理</span>
          </li>
          <li :class="{ active: activeNav === '/rollout/everyday' }"
          :style="activeNav === '/rollout/everyday' ? activeNavStyle : (hoverNav === '/rollout/everyday' ? hoverNavStyle : null)"

          @click="setActive('/rollout/everyday')">
            <span class="icon1"
              >转出统计</span
            >
          </li>
          <li :class="{ active: activeNav === '/main/home' }"
          :style="activeNav === '/main/home' ? activeNavStyle : (hoverNav === '/main/home' ? hoverNavStyle : null)">
            <span class="icon1" @click="setActive('/main/home')">返回平台</span>
          </li>
        </ul>
        <div class="count" style="width: 6%;">{{ nickName }}</div>
      </div>
    </div>
    <div class="container">
      <div class="midleContaner" style="background: #f2f2f2;width: 1280px;">
        <div class="slider" :style="sliderStyle">
          <div class="top_tit" :style="headerStyle">账户管理</div>
          <ul>
            <li :style="sliderStyle" style="margin-top: 10px;">
              <span @click="refresh('/audit/audit')">待审核订单</span>
            </li>
            <li :style="sliderStyle">
              <span @click="refresh('/audit/success')">已完成订单</span>
            </li>
            <li :style="sliderStyle">
              <span @click="refresh('/audit/error')">错误账号</span>
            </li>
            <li :style="sliderStyle">
              <span @click="refresh('/audit/blacklist')">黑名单管理</span>
            </li>
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
import TenantIcon from '../../components/TenantIcon';
import TenantGlobalNav from '../../components/TenantGlobalNav';
export default {
  name: 'personal',
  inject: ['reload'],
  components: { TenantIcon, TenantGlobalNav },
  data() {
    return {
      name: 'baseInfo',
      activeNav: '/main/home', // 默认选中首页
      skinNum: Number(localStorage.getItem('skinNum')) || 0,
      behalfSubItems: [
        { label: '账户概览', path: '/behalf/baseInfo', icon: 'account' },
        { label: '版本管理', path: '/behalf/version', icon: 'template' },
        { label: '余额明细', path: '/behalf/detail', icon: 'record' },
        { label: '待审核订单', path: '/audit/audit', icon: 'clock' },
        { label: '已完成订单', path: '/audit/success', icon: 'record' },
        { label: '错误账号', path: '/audit/error', icon: 'account' },
        { label: '黑名单管理', path: '/audit/blacklist', icon: 'key' },
        { label: '每日统计', path: '/rollout/everyday', icon: 'chart' },
        { label: '分区统计', path: '/rollout/partition', icon: 'partition' },
        { label: '角色统计', path: '/rollout/role', icon: 'employee' },
        { label: '支付宝统计', path: '/rollout/alipay', icon: 'transfer' }
      ],
      hoverNav: '' // 当前 hover 的菜单 path
    };
  },
  computed: {
    ...mapState(['userType', 'nickName']),
    headerStyle() {
      // 根据皮肤号返回不同背景色
      switch (this.skinNum) {
        case 1: return { background: '#88434f', color: 'white' };
        case 2: return { background: '#2d3338', color: 'white' };
        case 3: return { background: '#3370ff', color: 'white' };
        case 4: return { background: '#d75f28', color: 'white' };
        case 5: return { background: '#9966cc', color: 'white' };
        case 6: return { background: '#5d4aee', color: 'white' };
        default: return { background: '#0398d6', color: 'white' };
      }
    },
    sliderStyle() {
      switch (this.skinNum) {
        case 1: return { background: '#eee2e4', color: 'grey' };
        case 2: return { background: 'var(--312143a6)', color: 'grey' };
        case 3: return { background: '#e5e6f6', color: 'grey' };
        case 4: return { background: '#f6e5e0', color: 'grey' };
        case 5: return { background: '#e9e3f4', color: 'grey' };
        case 6: return { background: '#e5e0e2', color: 'grey' };
        default: return { background: 'linear-gradient(to bottom,#f2f2f2 0,#f8f8f8 100%', color: 'grey' }; ;
      }
    },
    activeNavStyle() {
      switch (this.skinNum) {
        case 1: return { background: '#b5c9b8', color: '#fff' }; // 莫兰迪绿
        case 2: return { background: '#b5c9b8', color: '#fff' }; // 莫兰迪蓝
        case 3: return { background: '#b7afc6', color: '#fff' }; // 莫兰迪紫
        case 4: return { background: '#e6c1c5', color: '#fff' }; // 莫兰迪粉
        case 5: return { background: '#e9d7a5', color: '#fff' }; // 莫兰迪黄
        case 6: return { background: '#b4b8ab', color: '#fff' }; // 莫兰迪灰
        default: return { background: '#a7c7e7', color: '#fff' };
      }
    },
    hoverNavStyle() {
      switch (this.skinNum) {
        case 1: return { background: '#b5c9b8', color: '#fff' }; // 莫兰迪绿加深
        case 2: return { background: '#a7c7e7', color: '#fff' }; // 莫兰迪蓝加深
        case 3: return { background: '#b7afc6', color: '#fff' }; // 莫兰迪紫加深
        case 4: return { background: '#e6c1c5', color: '#fff' }; // 莫兰迪粉加深
        case 5: return { background: '#e9d7a5', color: '#fff' }; // 莫兰迪黄加深
        case 6: return { background: '#b4b8ab', color: '#fff' }; // 莫兰迪灰加深
        default: return { background: '#b5c9b8', color: '#fff' };
      }
    }
  },
  methods: {
    // 获取用户信息
    getUser() {
      this.$api.home
        .getUserinfo()
        .then(data => {
          this.$store.commit('saveuuid', data.data.uuid);
          this.$store.commit('saveType', data.data.type);
          this.$store.commit('changeNickName', data.data.userName);
          this.$store.commit('changeId', data.data.id);
        })
        .catch(err => {
          this.$messageError(err.message);
        });
    },
    // 跳转路由刷新
    refresh(path) {
      if (this.$route.path.indexOf(path) > -1) {
        this.reload();
      } else {
        this.$router.push({
          path: path
        });
      }
    },
    // 设置激活项并导航（修复点击后平台不切换的问题）
    setActive(path) {
      this.activeNav = path;
      if (this.$route.path !== path) {
        this.$router.push({ path });
      } else {
        // 已经在该路由，触发 reload（如果注入了）
        if (typeof this.reload === 'function') {
          this.reload();
        }
      }
    }
  },
  mounted() {
    console.log(this.$route);
    this.name = this.$route.name;
    // 根据当前路由初始化选中项
    this.activeNav = this.$route.path;
  },
  watch: {
    // 路由变化时同步激活状态
    $route(to) {
      this.activeNav = to.path;
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
    background: #0398d6;

    .headbox {
      width: 1280px;
      max-width: 100%;
      margin: 0 auto;
      height: 60px;

      .logo {
        flex: 0 0 250px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 250px;
        height: 60px;
        margin-top: 0;
        float: left;
        text-align: left;
      }

      .navbox {
        flex: 1 1 auto;
        width: auto !important;
        min-width: 0;
        float: left;
        // margin-top: 15px;
        margin-left: 0;

        li {
          float: left;
          padding: 0 35px;
          height: 60px;
          line-height: 60px;
          // border-right: 1px solid #fff;
          color: #fff;
          font-size: 16px;
          // position: relative;
          // &::after{
          //   content: '';
          //   position: absolute;
          //   right: 0;
          //   top: 20%;      /* 距顶部30% */
          //   height: 60%;   /* 高度为元素的40% */
          //   width: 0;
          //   border-right: 1px solid #fff;
          // }
          span {
            cursor: pointer;
          }
        }
      }

      .count {
        flex: 0 0 auto;
        width: auto !important;
        margin-left: auto;
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
      width: 1280px;
      max-width: 100%;
      margin: 20px auto 22px auto;
      position: relative;
      // box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

      // box-shadow: 0 0 10px rgba(0, 0, 0, .25);
      .slider {
        position: absolute;
        width: 160px;
        background: #f4f4f4;
        height: 100%;
        left: 0;
        top: 0;

        .top_tit {
          height: 40px;
          line-height: 40px;
          text-align: center;
          font-size: 16px;
          font-weight: bold;
          color: #fff;
          background: #0398d6;
        }

        ul {
          li {
            height: 45px;
            line-height: 45px;
            // border-bottom: 1px solid #fff;
            color: #000;
            font-size: 14px;
            text-align: center;
            position: relative;
            border-bottom: none; // 先去掉原有的
            &::after {
              content: '';
              position: absolute;
              left: 20px; // 距离左侧20px
              right: 20px; // 距离右侧20px
              bottom: 0;
              height: 1px;
              background: #f8f7f7;
            }
            span {
              display: block;
              cursor: pointer;
              height: 45px;
              border-bottom: #e8e8e8 1px solid;
              margin: 0 15px;
              &.icon1 {
                background: url(../../assets/images/p_icon1.png) no-repeat 39px
                  center;
                background-size: auto 22px;
              }

              &.icon2 {
                background: url(../../assets/images/p_icon2.png) no-repeat 39px
                  center;
                background-size: auto 20px;
              }

              &.icon3 {
                background: url(../../assets/images/p_icon3.png) no-repeat 40px
                  center;
                background-size: auto 18px;
              }

              &.icon4 {
                background: url(../../assets/images/p_icon4.png) no-repeat 39px
                  center;
                background-size: auto 20px;
              }

              &.icon5 {
                background: url(../../assets/images/p_icon5.png) no-repeat 40px
                  center;
                background-size: auto 18px;
              }

              &.icon6 {
                background: url(../../assets/images/p_icon6.png) no-repeat 39px
                  center;
                background-size: auto 19px;
              }

              &.icon7 {
                background: url(../../assets/images/p_icon7.png) no-repeat 39px
                  center;
                background-size: auto 22px;
              }
            }
          }
        }
      }

      .contentbox {
        min-height: 800px;
        margin-left: 156px;
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
