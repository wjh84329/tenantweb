<!--
 * @Description: 主进入口
 * @Author: gao shuai
 * @Date: 2020-03-16 18:56:21
 * @LastEditTime: 2020-09-19 17:42:27
 * @LastEditors: gao shuai
 -->
<template>
  <div class="main">
    <div class="header" :style="headboxStyle">
      <div class="headbox clearfix" :style="headboxStyle" style="display: flex;">
        <div class="logo"><img src="../assets//img/logo3.png" style="width: 154px;height: 40px;" alt="" /></div>
        <ul class="navbox clearfix" style="width: 75%;">
          <li v-if="hasMenu(1) || $store.state.settlementType != 3" :class="{ active: activeNav === '/main/home' }"
            :style="activeNav === '/main/home' ? activeNavStyle : (hoverNav === '/main/home' ? hoverNavStyle : null)"
            @click="setActive('/main/home')">
            <span class="icon1">首页</span>
          </li>
          <li v-if="hasMenu(2) || $store.state.settlementType != 3"
            :class="{ active: activeNav === '/main/Ordermanagement' }"
            :style="activeNav === '/main/Ordermanagement' ? activeNavStyle : (hoverNav === '/main/Ordermanagement' ? hoverNavStyle : null)"
            @click="setActive('/main/Ordermanagement')">
            <span class="icon1">订单管理</span>
          </li>
          <li v-if="(hasMenu(3) && (hasMenu(12) && hasMenu(13))) || $store.state.settlementType != 3"
            :class="{ active: activeNav === '/main/Zoningmanagement' }"
            :style="activeNav === '/main/Zoningmanagement' ? activeNavStyle : (hoverNav === '/main/Zoningmanagement' ? hoverNavStyle : null)"
            @click="setActive('/main/Zoningmanagement')">
            <span class="icon1">分区管理</span>
          </li>
          <li v-if="hasMenu(4) || $store.state.settlementType != 3" :class="{ active: activeNav === '/main/DA' }"
            :style="activeNav === '/main/DA' ? activeNavStyle : (hoverNav === '/main/DA' ? hoverNavStyle : null)"
            @click="setActive('/main/DA')">
            <span class="icon1">数据分析</span>
          </li>
          <li @click="setActive('/personal/baseInfo')" v-if="$store.state.settlementType != 3"
            :class="{ active: activeNav === '/personal' || activeNav === '/personal/baseInfo' }"
            :style="activeNav === '/personal' || activeNav === '/personal/baseInfo' ? activeNavStyle : (hoverNav === '/personal' ? hoverNavStyle : null)">
            <span class="icon1">账户管理</span>
          </li>
          <li v-if="$store.state.isEnabledPaid && $store.state.settlementType != 3" @click="setActive('/behalf')"
            :class="{ active: activeNav === '/behalf' }" :style="hoverNav === '/behalf' ? hoverNavStyle : null">
            <span class="icon1">代付管理</span>
          </li>
          <li v-if="$store.state.userType && $store.state.settlementType != 3" @click="setActive('/agentsystem')"
            :class="{ active: activeNav === '/agentsystem' }"
            :style="hoverNav === '/agentsystem' ? hoverNavStyle : null">
            <span class="icon1">代理系统</span>
          </li>
          <li :class="{ active: activeNav === '/employee' }"
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
          <div class="top_tit" :style="headboxStyle">控制面板</div>
          <ul>
            <li v-if="hasMenu(11) || $store.state.settlementType != 3" :style="sliderStyle" style="margin-top: 10px;">
              <span class="icon1" @click="refresh('/main/partmodules')">分区模板</span>
            </li>
            <li v-if="hasMenu(12) || $store.state.settlementType != 3" :style="sliderStyle">
              <span class="icon2" @click="refresh('/main/partinstalls')">安装分区</span>
            </li>
            <li v-if="hasMenu(13) || $store.state.settlementType != 3" :style="sliderStyle">
              <span class="icon3" @click="refresh('/main/Zoningmanagement')">分区管理</span>
            </li>
            <li v-if="hasMenu(14) || $store.state.settlementType != 3" :style="sliderStyle">
              <span class="icon4" @click="refresh('/main/Groupmanagement')">分组管理</span>
            </li>
            <li v-if="hasMenu(15) || $store.state.settlementType != 3" :style="sliderStyle">
              <span class="icon6" @click="refresh('/main/Orderreissue')">手动补发</span>
            </li>
            <li v-if="hasMenu(20) || $store.state.settlementType != 3" :style="sliderStyle">
              <span class="icon7" @click="refresh('/main/BetchOrderreissue')">整区补发</span>
            </li>
            <li v-if="hasMenu(16) || $store.state.settlementType != 3" :style="sliderStyle">
              <span class="icon5" @click="refresh('/main/Replacementofrecords')">补发记录</span>
            </li>
            <li v-if="hasMenu(16) || $store.state.settlementType != 3" :style="sliderStyle">
              <span class="icon8" @click="refresh('/main/transfer')">转区点记录</span>
            </li>
            <li v-if="hasMenu(17) || $store.state.settlementType != 3" :style="sliderStyle">
              <span class="icon12" @click="refresh('/main/conectKey')">通讯秘钥</span>
            </li>
            <!-- <li style="color: black;">
              <span class="icon7" @click="refresh('/main/Withdrawalrecords')"
                >提现记录</span
              >
            </li>
            <li style="color: black;">
              <span class="icon12" @click="refresh('/main/orderInterval')"
                >定时任务</span
              >
            </li> -->
            <!-- <li>
              <router-link tag="span" :to="{path:'/main/Userlogs'}" class="icon8">用户日志</router-link>
            </li> -->
            <li v-if="hasMenu(18) || $store.state.settlementType != 3" :style="sliderStyle">
              <span class="icon9" @click="refresh('/main/gaincode')">获取代码</span>
            </li>
            <!-- <li style="color: black;">
              <span class="icon8" @click="refresh('/main/fenyong')"
                >推广分佣</span
              >
            </li> -->
            <li v-if="hasMenu(19) || $store.state.settlementType != 3" :style="sliderStyle">
              <span class="icon10" @click="download">下载网关</span>
            </li>
            <!-- <li>
              <span class="icon6" @click="refresh('/main/MobileGameDown')"
                >手游接口</span
              >
            </li> -->
            <li :style="sliderStyle">
              <span class="icon11" @click="loginOut">退出登录</span>
            </li>
          </ul>
        </div>
        <div class="contentbox" style="background: white;">
          <router-view />
        </div>
      </div>
    </div>
    <!-- 网关下载弹框 -->
    <el-dialog title="网关下载" :visible.sync="dialog.show" @close="dialoginit" custom-class="gs_dialog" width="350px">
      <ul class="areaContainer clearfix">
        <!-- <li>
          <a href="http://192.168.1.80:5003/GateWay_Agent.rar">
            <el-tooltip class="item" effect="dark" content="热血传奇" placement="bottom">
              <div class="imgbox">
                <img src="../assets/images/index.png" alt="">
                <span class="mask">{{dialog.wg===''?'暂无下载':'点击下载'}}</span>
              </div>
            </el-tooltip>
          </a>
        </li> -->
        <li>
          <el-tooltip class="item" effect="dark" content="热血传奇" placement="bottom">
            <div class="imgbox">
              <img src="../assets/images/index.png" alt="" />
              <span class="mask" @click="loadzip(1)">{{
                dialog.wg === '' ? '暂无下载' : '点击下载'
              }}</span>
            </div>
          </el-tooltip>
        </li>
        <!-- <li>
          <el-tooltip class="item" effect="dark" content="传奇世界" placement="bottom">
            <div class="imgbox">
              <img src="../assets/images/cs.png" alt="" />
              <span class="mask" @click="loadzip(2)">{{
                dialog.ty === '' ? '暂无下载' : '点击下载'
                }}</span>
            </div>
          </el-tooltip>
        </li> -->

        <!-- <li>
          <el-tooltip
            class="item"
            effect="dark"
            content="传奇三"
            placement="bottom"
          >
            <div class="imgbox">
              <img src="../assets/images/cq3.png" alt="" />
              <span class="mask" @click="loadzip(3)">{{
                dialog.cq3 === '' ? '暂无下载' : '点击下载'
              }}</span>
            </div>
          </el-tooltip>
        </li>
         <li>
          <el-tooltip class="item" effect="dark" content="奇迹MU" placement="bottom">
            <div class="imgbox">
              <img src="../assets/images/qiji.png" style="width: 96px;" alt="">
              <span class="mask" @click="loadzip(1)">{{dialog.wg===''?'暂无下载':'点击下载'}}</span>
            </div>
          </el-tooltip>
        </li> -->
        <!-- <li :class="{on:typeindex===4}" @click="typeChange(4)">
          <el-tooltip class="item" effect="dark" content="WEB通讯" placement="bottom">
            <img src="../assets/images/web.png" alt="">
          </el-tooltip>
        </li> -->
      </ul>
    </el-dialog>
    <charge-link v-if="preview" :chargeUrl="chargeUrl" :styleNum="floatingpictures"
      :styletype="floatstyle"></charge-link>
    <iframe name="downloadIframe" style="display:none;"></iframe>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import chargeLink from '../components/chargeLink';
import Mgr from '../assets/js/SecurityService';
import mgrs from '../assets/js/securityapi';
import { netUrl } from '../assets/js/version';
import axios from 'axios';
export default {
  name: 'Home',
  inject: ['reload'],
  components: {
    chargeLink
  },
  data() {
    return {
      // nickName: '', // 用户名
      // isAgent: false, // 是否为代理
      // id: '',
      role: '',
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
      },
      activeNav: '/main/home', // 默认选中首页
      skinNum: Number(localStorage.getItem('skinNum')) || 0,
      hoverNav: '' // 当前 hover 的菜单 path
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
    ]),
    headboxStyle() {
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
        default: return { background: 'linear-gradient(to bottom,#f2f2f2 0,#f8f8f8 100%', color: 'grey' };
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
        case 2: return { background: '#b5c9b8', color: '#fff' }; // 莫兰迪蓝加深
        case 3: return { background: '#b7afc6', color: '#fff' }; // 莫兰迪紫加深
        case 4: return { background: '#e6c1c5', color: '#fff' }; // 莫兰迪粉加深
        case 5: return { background: '#e9d7a5', color: '#fff' }; // 莫兰迪黄加深
        case 6: return { background: '#b4b8ab', color: '#fff' }; // 莫兰迪灰加深
        default: return { background: '#a7c7e7', color: '#fff' };
      }
    }
  },
  watch: {
    '$route.path'(newPath) {
      this.updateActiveByRoute(newPath || this.$route.path);
    },
    skinNum() {
      this.updateThemeVars();
    }
  },
  methods: {
    // 选中事件
    setActive(path) {
      // 只做路由跳转，active 由 updateActiveByRoute 统一计算

      // 如果已经在目标路由，调用 injected reload（例如 iframe 内刷新等），并避免重复 push 导致的时序问题
      if (this.$route && this.$route.path === path) {
        console.log('setActive reload', path);
        // if (typeof this.reload === 'function') {
        //   this.reload();
        // }
        return;
      }
      // 正常跳转
      this.$router.push({ path });
    },
    // 根据当前路由更可靠地计算顶部菜单应高亮哪一项
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
    },
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
          // console.log(data);
          this.$store.commit('setEnabledPaid', data.data.isEnabledPaid);
          this.$store.commit('setEnabledWxValid', data.data.isEnabledWxValid);
          this.$store.commit('setPlatOpenWxValid', data.data.isPlatOpenWxValid);
          this.$store.commit('settlementType', data.data.settlementType);
          this.$store.commit('setRoleInfo', data.data.roleinfon);
          this.$store.commit('saveisCro', data.data.isCro);
          // this.role=data.profile.role;
          console.log(this.$store.state);
        })
        .catch(err => {
          this.$messageError(err.message);
        });
    },
    // 退出登录
    loginOut() {
      this.$api.home
        .loginOut()
        .then(() => {
          const user = new Mgr();
          user.signOut(); // 里边清 token 也可以
          this.$router.push('/login/loginHome');
        })
        .catch(err => {
          // 即便后端登出失败，也可以在前端做强制退出
          const user = new Mgr();
          user.signOut();
          this.$router.replace('/login');
          this.$messageError(err.message);
        });
      // const user = new Mgr();
      // user.signOut();
      // this.$router.push('/login/loginHome');
    },
    // 下载网关
    async download() {
      this.dialog.show = true;
      let header = await mgrs();
      axios({
        method: 'get',
        url: netUrl + '/api/ManageResource/GetConfig',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + header
        }
      })
        .then(data => {
          if (data.status === 200) {
            this.dialog.cq3 = data.data.cq3 === '' ? '' : data.data.cq3;
            this.dialog.ty = data.data.ty === '' ? '' : data.data.ty;
            this.dialog.wg = data.data.wg === '' ? '' : data.data.wg;
            this.dialog.sql = data.data.sql === '' ? '' : data.data.sql;
            this.dialog.ltcq = data.data.ltcq === '' ? '' : data.data.ltcq;
            this.dialog.yktl = data.data.yktl === '' ? '' : data.data.yktl;
            this.dialog.dslh = data.data.dslh === '' ? '' : data.data.dslh;
            this.dialog.ymcq = data.data.ymcq === '' ? '' : data.data.ymcq;
            this.dialog.cqby = data.data.cqby === '' ? '' : data.data.cqby;
            this.dialog.xbnz = data.data.xbnz === '' ? '' : data.data.xbnz;
            this.dialog.jxqy = data.data.jxqy === '' ? '' : data.data.jxqy;
          }
        })
        .catch(err => {
          this.$messageError(err.message);
        });
    },
    // 弹框初始化
    dialoginit() {
      this.dialog.cq3 = ''; // 传奇3
      this.dialog.ty = ''; // 传奇世界
      this.dialog.wg = ''; // 热血传奇
      this.dialog.sql = ''; // sql
    },
    // 下载
    loadzip(num) {
      let url = '';
      if (num === 1) {
        if (this.dialog.wg === '') {
          return;
        } else {
          url = this.dialog.wg;
        }
      } else if (num === 2) {
        if (this.dialog.ty === '') {
          return;
        } else {
          url = this.dialog.ty;
        }
      } else if (num === 3) {
        if (this.dialog.cq3 === '') {
          return;
        } else {
          url = this.dialog.cq3;
        }
      } else if (num === 4) {
        if (this.dialog.sql === '') {
          return;
        } else {
          url = this.dialog.sql;
        }
      } else if (num === 6) {
        if (this.dialog.ltcq === '') {
          return;
        } else {
          url = this.dialog.ltcq;
        }
      } else if (num === 16) {
        if (this.dialog.yktl === '') {
          return;
        } else {
          url = this.dialog.yktl;
        }
      } else if (num === 17) {
        if (this.dialog.dslh === '') {
          return;
        } else {
          url = this.dialog.dslh;
        }
      } else if (num === 18) {
        if (this.dialog.ymcq === '') {
          return;
        } else {
          url = this.dialog.ymcq;
        }
      } else if (num === 19) {
        if (this.dialog.cqby === '') {
          return;
        } else {
          url = this.dialog.cqby;
        }
      } else if (num === 15) {
        if (this.dialog.xbnz === '') {
          return;
        } else {
          url = this.dialog.xbnz;
        }
      } else if (num === 14) {
        if (this.dialog.jxqy === '') {
          return;
        } else {
          url = this.dialog.jxqy;
        }
      }
      url = url + '&merchantId=' + this.id;

      // 创建隐藏的可下载链接
      var eleLink = document.createElement('a');
      eleLink.style.display = 'none';
      eleLink.setAttribute('target', 'blank');
      // 字符内容转变成blob地址
      eleLink.href = url;
      // 触发点击
      document.body.appendChild(eleLink);
      eleLink.click();
      // 然后移除
      this.dialog.show = false;
      document.body.removeChild(eleLink);
    },
    // 跳转路由刷新
    refresh(path) {
      if (this.$route.path.indexOf(path) > -1) {
        this.reload();
      } else {
        this.$router.push({ path: path });
      }
    },
    hasMenu(menuId) {
      const menuIds = (this.$store.state.roleInfo || '').split(',').map(id => Number(id));
      return menuIds.includes(menuId);
    },
    updateThemeVars() {
      const bg = (this.headboxStyle && this.headboxStyle.background) || '#0398d6';
      const txt = (this.headboxStyle && this.headboxStyle.color) || 'white';
      document.documentElement.style.setProperty('--theme-color', bg);
      document.documentElement.style.setProperty('--theme-text', txt);
      localStorage.setItem('themeColor', bg);
    }
  },
  created() {
    this.getUser();
    // 监听皮肤切换事件
    this.$root.$on('skin-change', num => {
      this.skinNum = num;
    });
    this.updateThemeVars();
    // 监听来自个人中心的顶部菜单切换通知，立即设置主 layout 的 activeNav
    this.$root.$on('topnav-change', path => {
      // 优先使用精确 path 作为 active
      if (path && path.startsWith('/main/')) {
        this.activeNav = path;
      }
    });
    // 如果 personal 在 push 之前把目标写入 root.pending（主 layout 尚未挂载），这里读取一次并清理
    if (this.$root && this.$root.__pendingTopnav) {
      const p = this.$root.__pendingTopnav;
      if (p && p.startsWith('/main/')) {
        this.activeNav = p;
      }
      delete this.$root.__pendingTopnav;
    }
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
        width: 20%;
        text-align: right;
      }

      .navbox {
        float: left;
        // margin-top: 15px;
        margin-left: 50px;

        li {
          float: left;
          padding: 0 35px;
          height: 60px;
          line-height: 60px;
          // border-right: 1px solid #fff;
          color: #fff;
          font-size: 16px;

          // position: relative;
          span {
            cursor: pointer;
          }

          &.active {
            // background: #b5c9b8 !important; // 莫兰迪绿或你喜欢的色
            color: #fff;
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

        // & li:hover{
        //     filter: brightness(0.85);
        // }
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
        text-align: center;
        // width: 18%;
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
      margin: 20px auto 22px;
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
            // border-bottom: 1px solid #f8f7f7;
            margin-bottom: 10px;
            color: #fff;
            font-size: 14px;
            position: relative;

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
                background-image: url(../assets/images/icons.png);
                background-repeat: no-repeat;
                background-position: 32px 0;
                height: 32px;
                line-height: 32px;
              }

              &.icon2 {
                background-image: url(../assets/images/icons.png);
                background-repeat: no-repeat;
                background-position: 32px -32px;
                height: 32px;
                line-height: 32px;
              }

              &.icon3 {
                background-image: url(../assets/images/icons.png);
                background-repeat: no-repeat;
                background-position: 32px -64px;
                height: 32px;
                line-height: 32px;
              }

              &.icon4 {
                background-image: url(../assets/images/icons.png);
                background-repeat: no-repeat;
                background-position: 32px -128px;
                height: 32px;
                line-height: 32px;
              }

              &.icon5 {
                background-image: url(../assets/images/icons.png);
                background-repeat: no-repeat;
                background-position: 32px -384px;
                height: 32px;
                line-height: 32px;
              }

              &.icon6 {
                background-image: url(../assets/images/icons.png);
                background-repeat: no-repeat;
                background-position: 32px -192px;
                height: 32px;
                line-height: 32px;
              }

              &.icon7 {
                background-image: url(../assets/images/整区补发.png);
                background-repeat: no-repeat;
                background-size: 20px 20px;
                background-position: 36px 10px;
                // background-position: 32px -544px;
                // height: 32px;
                // line-height: 32px;
              }

              &.icon8 {
                background-image: url(../assets/images/转区点记录.png);
                background-repeat: no-repeat;
                background-size: 20px 20px;
                background-position: 36px 10px;
                // height: 32px;
                // line-height: 32px;
              }

              &.icon9 {
                background-image: url(../assets/images/icons.png);
                background-repeat: no-repeat;
                background-position: 32px -416px;
                height: 32px;
                line-height: 32px;
              }

              &.icon10 {
                background-image: url(../assets/images/icons.png);
                background-repeat: no-repeat;
                background-position: 32px -224px;
                height: 32px;
                line-height: 32px;
              }

              &.icon11 {
                background-image: url(../assets/images/icons.png);
                background-repeat: no-repeat;
                background-position: 32px -292px;
                height: 32px;
                line-height: 32px;
              }

              &.icon12 {
                background-image: url(../assets/images/icons.png);
                background-repeat: no-repeat;
                background-position: 32px -448px;
                height: 32px;
                line-height: 32px;
              }
            }
          }
        }
      }

      .contentbox {
        min-height: 900px;
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
