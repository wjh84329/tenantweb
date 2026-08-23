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
      <tenant-global-nav active-section="account" :sub-items="accountSubItems" @navigate="refresh" />
      <button class="tenant-sub-back" @click="setActive('/main/home')"><tenant-icon name="home" /><span>返回平台</span></button>
    </aside>
    <header v-if="$root.uiMode === 'modern'" class="tenant-sub-topbar">
      <div><span>商户中心</span><i>/</i><strong>账户管理</strong></div>
      <div class="tenant-sub-profile"><span>{{ (nickName || 'T').slice(0, 1).toUpperCase() }}</span><strong>{{ nickName || 'Tenant' }}</strong></div>
    </header>
    <div class="header" :style="headerStyle">
      <div class="headbox clearfix" :style="headerStyle" style="display: flex;">
        <div class="logo"><site-logo variant="logo3" style="width: 250px;height: 50px;" alt="网站logo" /></div>
        <ul class="navbox clearfix" style="width: 75%;">
          <li :class="{ active: activeNav === '/main/home' }"
            :style="activeNav === '/main/home' ? activeNavStyle : (hoverNav === '/main/home' ? hoverNavStyle : null)"
            @click="setActive('/main/home')">
            <span class="icon1">首页</span>
          </li>
          <li :class="{ active: activeNav === '/main/Ordermanagement' }"
            :style="activeNav === '/main/Ordermanagement' ? activeNavStyle : (hoverNav === '/main/Ordermanagement' ? hoverNavStyle : null)"
            @click="setActive('/main/Ordermanagement')">
            <span class="icon1">订单管理</span>
          </li>
          <li :class="{ active: activeNav === '/main/Zoningmanagement' }"
            :style="activeNav === '/main/Zoningmanagement' ? activeNavStyle : (hoverNav === '/main/Zoningmanagement' ? hoverNavStyle : null)"
            @click="setActive('/main/Zoningmanagement')">
            <span class="icon1">分区管理</span>
          </li>
          <li :class="{ active: activeNav === '/main/DA' }"
            :style="activeNav === '/main/DA' ? activeNavStyle : (hoverNav === '/main/DA' ? hoverNavStyle : null)"
            @click="setActive('/main/DA')">
            <span class="icon1">数据分析</span>
          </li>
          <li @click="setActive('/personal/baseInfo')" v-if="$store.state.settlementType !=3"
            :class="{ active: activeNav === '/personal' || activeNav === '/personal/baseInfo' }"
            :style="activeNav === '/personal' || activeNav === '/personal/baseInfo' ? activeNavStyle : (hoverNav === '/personal' ? hoverNavStyle : null)">
            <span class="icon1">账户管理</span>
          </li>
          <li v-if="$store.state.isEnabledPaid && $store.state.settlementType !=3" @click="setActive('/behalf')" :class="{ active: activeNav === '/behalf' }"
            :style="hoverNav === '/behalf' ? hoverNavStyle : null">
            <span class="icon1">代付管理</span>
          </li>
          <li v-if="$store.state.userType && $store.state.settlementType !=3" @click="setActive('/agentsystem')" :class="{ active: activeNav === '/agentsystem' }"
            :style="hoverNav === '/agentsystem' ? hoverNavStyle : null">
            <span class="icon1">代理系统</span>
          </li>
          <li v-if="$store.state.settlementType !=3" :class="{ active: activeNav === '/employee' }"
            :style="activeNav === '/employee' ? activeNavStyle : (hoverNav === '/employee' ? hoverNavStyle : null)"
            @click="setActive('/employee')">
            <span class="icon1">员工管理</span>
          </li>
        </ul>
        <div class="count" style="width: 6%;">{{ nickName }}</div>
      </div>
    </div>
    <div class="container">
      <div class="midleContaner" style="background: #f2f2f2;width: 1280px;">
        <div class="slider" :style="sliderStyle">
          <div class="top_tit" :style="headerStyle">个人中心</div>
          <ul>
            <li :style="sliderStyle" style="margin-top: 10px;">
              <span class="icon1" style="" @click="refresh('/personal/baseInfo')">用户信息</span>
            </li>
            <li :style="sliderStyle">
              <span class="icon2" style="" @click="refresh('/personal/sharedetails')">三方开户</span>
            </li>
            <li :style="sliderStyle">
              <span class="icon5" style="" @click="refresh('/personal/withdrawapply1')"
              >转账</span
              >
            </li>
            <li :style="sliderStyle">
              <span class="icon5" style="" @click="refresh('/personal/Withdrawal')"
              >转账记录</span
              >
            </li>
            <li :style="sliderStyle">
              <span class="icon3" style="" @click="refresh('/personal/rateList')">结算比例</span>
            </li>
            <li :style="sliderStyle">
              <span class="icon4" style="" @click="refresh('/personal/password')">二级密码</span>
            </li>
            <!-- <li :style="sliderStyle">
              <span class="icon5" style="" @click="refresh('/personal/fenyong')">推广分佣</span>
            </li> -->
            <li :style="sliderStyle">
              <span class="icon6" style="" @click="refresh('/personal/weixin')">微信绑定</span>
            </li>
            <li :style="sliderStyle">
              <span class="icon7" style="" @click="refresh('/personal/recoder')">结算记录</span>
            </li>
            <li :style="sliderStyle">
              <span class="icon8" style="" @click="refresh('/personal/acountsafe')">账号安全</span>
            </li>

            <li :style="sliderStyle">
              <span class="icon9" style="" @click="refresh('/personal/Withdrawalrecords')">提现记录</span>
            </li>
            <li :style="sliderStyle">
              <span class="icon11" style="" @click="refresh('/personal/Userlogs')">用户日志</span>
            </li>
            <li :style="sliderStyle">
              <span class="icon11" style="" @click="refresh('/personal/Gift')">礼品赠送</span>
            </li>
            <li :style="sliderStyle">
              <span class="icon12" style="" @click="refresh('/personal/wechat')">微信动态密保</span>
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
      activeNav: '/personal', // 默认选中首页
      skinNum: Number(localStorage.getItem('skinNum')) || 0,
      accountSubItems: [
        { label: '用户信息', path: '/personal/baseInfo', icon: 'account' },
        { label: '三方开户', path: '/personal/sharedetails', icon: 'document' },
          { label: '电子户转账', path: '/personal/withdrawapply1', icon: 'transfer' },
          { label: '转账记录', path: '/personal/Withdrawal', icon: 'record' },
        { label: '结算比例', path: '/personal/rateList', icon: 'chart' },
        { label: '二级密码', path: '/personal/password', icon: 'key' },
        { label: '微信绑定', path: '/personal/weixin', icon: 'account' },
        { label: '结算记录', path: '/personal/recoder', icon: 'order' },
        { label: '账号安全', path: '/personal/acountsafe', icon: 'key' },
        { label: '提现记录', path: '/personal/Withdrawalrecords', icon: 'record' },
        { label: '用户日志', path: '/personal/Userlogs', icon: 'document' },
        { label: '礼品赠送', path: '/personal/Gift', icon: 'order' },
        { label: '微信动态密保', path: '/personal/wechat', icon: 'key' }
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
  watch: {
    // '$route.path'(newPath) {
    //   const topMenus = [
    //     '/main/Ordermanagement',
    //     '/main/Zoningmanagement',
    //     '/main/home',
    //     '/main/DA',
    //     '/personal/baseInfo',
    //     '/personal',
    //     '/behalf',
    //     '/agentsystem'
    //   ].sort((a, b) => b.length - a.length);
    //   let match = '';
    //   for (let menu of topMenus) {
    //     if (newPath === menu || newPath.startsWith(menu + '/') || newPath.startsWith(menu + '?') || newPath.startsWith(menu)) {
    //       match = menu;
    //       break;
    //     }
    //   }
    //   // 根据当前路由决定 active，避免在个人页点其他菜单后回落到 /main/home
    //   if (match) {
    //     this.activeNav = match;
    //   } else if (newPath.startsWith('/personal')) {
    //     this.activeNav = '/personal/baseInfo';
    //   } else if (newPath.startsWith('/main')) {
    //     this.activeNav = '/main/home';
    //   }
    // }
    '$route.path'(newPath) {
      this.updateActiveByRoute(newPath || this.$route.path);
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
      // 如果是主业务菜单，先通知主 layout 更新高亮，再跳转
      if (path.startsWith('/main/')) {
        // 通知主 layout（立即设置 active），避免时序导致回落到首页
        this.$root.$emit('topnav-change', path);
        this.$router.push({ path }); // 切换到主 layout，由主 layout 的 watch 更新内容
        return;
      }
      // 个人中心菜单正常跳转（不在此处直接修改 activeNav）
      if (this.$route.path.indexOf(path) > -1) {
        this.reload();
      } else {
        this.$router.push({ path });
      }
    },
    setActive(path) {
      console.log('setActive', path);
      // 只做路由跳转，active 由 updateActiveByRoute 统一计算
      if (this.$route && this.$route.path === path) {
        if (typeof this.reload === 'function') {
          this.reload();
        }
        return;
      }
      // 若跳回主业务布局，先通知主 layout 立即设置高亮，避免时序问题回落到首页
      if (path && path.startsWith('/main/')) {
        this.$root.$emit('topnav-change', path);
        this.$root.__pendingTopnav = path;
      }
      this.$router.push({ path });
    },
    updateActiveByRoute(newPath) {
      const path = newPath || (this.$route && this.$route.path) || '';

      // 优先使用 route.name 映射（更稳定）
      const nameMap = {
        Ordermanagement: '/main/Ordermanagement',
        Zoningmanagement: '/main/Zoningmanagement',
        home: '/main/home',
        DA: '/main/DA',
        conectKey: '/main/conectKey'
        // 若路由名与菜单不一致，按需补充
      };
      console.log(this.$route.name);
      if (this.$route && this.$route.name && nameMap[this.$route.name]) {
        this.activeNav = nameMap[this.$route.name];
        return;
      }

      // 兜底：按最长前缀匹配 topMenus
      const topMenus = [
        '/main/Ordermanagement',
        '/main/Zoningmanagement',
        '/main/home',
        '/main/DA',
        '/personal/baseInfo',
        '/personal',
        '/behalf',
        '/agentsystem',
        '/employee'
      ].sort((a, b) => b.length - a.length); // 长到短

      for (const menu of topMenus) {
        if (path === menu || path.startsWith(menu + '/') || path.startsWith(menu + '?') || path.startsWith(menu)) {
          this.activeNav = menu;
          return;
        }
      }

      // 保持当前 layout 上的默认项，不盲目回首页
      if (path.startsWith('/main')) {
        this.activeNav = '/main/home';
      } else if (path.startsWith('/personal')) {
        this.activeNav = '/personal/baseInfo';
      } else if (path.startsWith('/behalf')) {
        this.activeNav = '/behalf';
      } else if (path.startsWith('/agentsystem')) {
        this.activeNav = '/agentsystem';
      } else if (path.startsWith('/employee')) {
        this.activeNav = '/employee';
      }
    }
  },
  created() {
    this.getUser();
    // 监听皮肤切换事件
    // this.$root.$on('skin-change', num => {
    //   this.skinNum = num;
    // });
    this.$root.$on('topnav-change', path => {
      // 优先使用精确 path 作为 active
      if (path && path.startsWith('/main/')) {
        this.activeNav = path;
      }
    });
    this.updateActiveByRoute(this.$route && this.$route.path ? this.$route.path : '');
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
    background: #63dcfa;

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
        text-align: center;
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
      margin: 20px auto 22px;
      position: relative;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

      // box-shadow: 0 0 10px rgba(0, 0, 0, .25);
      .slider {
        position: absolute;
        width: 178px;
        // background: #0398d6;
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
          // margin-top: 30px;

          li {
            height: 35px;
            line-height: 35px;
            // border-bottom: 1px solid #fff;
            margin-bottom: 10px;
            color: #fff;
            font-size: 14px;
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
              height: 35px;
              padding-left: 66px;

              &.icon1 {
                background: url(../../assets/images/xinxi.png) no-repeat 39px center;
                background-size: auto 18px;
              }

              &.icon2 {
                background: url(../../assets/images/kaihu.png) no-repeat 39px center;
                background-size: auto 18px;
              }

              &.icon3 {
                background: url(../../assets/images/jiesuan.png) no-repeat 40px center;
                background-size: auto 18px;
              }

              &.icon4 {
                background: url(../../assets/images/ejmm.png) no-repeat 39px center;
                background-size: auto 18px;
              }

              &.icon5 {
                background: url(../../assets/images/tgfy.png) no-repeat 40px center;
                background-size: auto 18px;
              }

              &.icon6 {
                background: url(../../assets/images/wxbd.png) no-repeat 39px center;
                background-size: auto 18px;
              }

              &.icon7 {
                background: url(../../assets/images/jsjl.png) no-repeat 39px center;
                background-size: auto 18px;
              }

              &.icon8 {
                background: url(../../assets/images/zhaq.png) no-repeat 39px center;
                background-size: auto 18px;
              }

              &.icon9 {
                background: url(../../assets/images/txjl.png) no-repeat 39px center;
                background-size: auto 18px;
              }

              &.icon10 {
                background: url(../../assets/images/dsrw.png) no-repeat 39px center;
                background-size: auto 18px;
              }

              &.icon11 {
                background: url(../../assets/images/yhrz.png) no-repeat 39px center;
                background-size: auto 18px;
              }

              &.icon12 {
                background: url(../../assets/images/dtmb.png) no-repeat 39px center;
                background-size: auto 18px;
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

<style lang="scss" scoped>
.tenant-sub-sidebar {
  position: fixed; z-index: 50; inset: 0 auto 0 0; width: 232px;
  display: flex; flex-direction: column; color: #c7d4e8;
  background: linear-gradient(180deg, var(--tenant-sidebar) 0%, var(--tenant-sidebar-deep) 100%);
  box-shadow: 10px 0 30px rgba(8,27,54,.08);
}
.tenant-sub-brand {
  min-height: 78px; padding: 0 20px; display: flex; align-items: center;
  cursor: pointer; border-bottom: 1px solid rgba(255,255,255,.08);
  img { max-width: 100%; object-position: left center; }
}
.tenant-sub-nav {
  flex: 1; min-height: 0; padding: 14px 10px; overflow-y: auto;
  scrollbar-width: thin; scrollbar-color: rgba(255,255,255,.16) transparent;
  button {
    width: 100%; min-height: 40px; padding: 8px 14px; margin-bottom: 3px;
    display: flex; align-items: center; gap: 11px; text-align: left;
    border: 0; border-radius: 8px; color: #aebed4; background: transparent;
    font: inherit; font-size: 13px; cursor: pointer;
    svg { width: 17px; height: 17px; flex: 0 0 auto; }
    &:hover { color: #fff; background: rgba(255,255,255,.06); }
    &.active { color: #fff; background: linear-gradient(90deg, #526dff, #6a5cff); box-shadow: 0 8px 18px rgba(79,107,255,.2); }
  }
}
.tenant-sub-back {
  height: 46px; margin: 10px; padding: 0 16px; display: flex; align-items: center; gap: 12px;
  border: 0; border-radius: 8px; color: #aebed4; background: rgba(255,255,255,.04);
  font: inherit; cursor: pointer;
  svg { width: 18px; height: 18px; }
  &:hover { color: #fff; background: rgba(255,255,255,.08); }
}
.tenant-sub-topbar {
  position: fixed; z-index: 40; top: 0; right: 0; left: 232px; height: 64px;
  padding: 0 24px; display: flex; align-items: center; justify-content: space-between;
  border-bottom: 1px solid var(--tenant-border); background: rgba(255,255,255,.96);
  box-shadow: 0 4px 18px rgba(16,24,40,.03);
  > div:first-child { display: flex; align-items: center; gap: 10px; color: var(--tenant-text-secondary); font-size: 13px; }
  i { color: #c4cad4; font-style: normal; }
  strong { color: var(--tenant-text); font-weight: 600; }
}
.tenant-sub-profile { display: flex; align-items: center; gap: 9px; }
.tenant-sub-profile > span {
  width: 32px; height: 32px; display: grid; place-items: center; border-radius: 50%;
  color: #fff; font-weight: 700; background: linear-gradient(135deg, #20c4d9, #4f6bff);
}
.main.tenant-ui-modern-shell { padding: 0 !important; background: var(--tenant-page) !important; }
.main.tenant-ui-modern-shell > .header { display: none !important; }
.main.tenant-ui-modern-shell > .container { height: 100% !important; padding: 84px 20px 24px 252px !important; background: var(--tenant-page); overflow-y: auto; }
.main.tenant-ui-modern-shell > .container .midleContaner { width: 100% !important; max-width: none !important; margin: 0 !important; background: transparent !important; box-shadow: none !important; }
.main.tenant-ui-modern-shell > .container .slider { display: none !important; }
.main.tenant-ui-modern-shell > .container .contentbox { margin-left: 0 !important; min-height: calc(100vh - 108px); }
</style>
