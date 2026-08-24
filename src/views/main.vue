<!--
 * @Description: 主进入口
 * @Author: gao shuai
 * @Date: 2020-03-16 18:56:21
 * @LastEditTime: 2020-09-19 17:42:27
 * @LastEditors: gao shuai
 -->
<template>
  <div class="main" :class="{ 'tenant-ui-modern-shell': isModernUi }">
    <aside v-if="isModernUi" class="tenant-sidebar">
      <div class="tenant-brand" @click="setActive('/main/home')">
        <site-logo
          class="tenant-brand__logo"
          variant="logo3"
          logo-type="site"
          width="188px"
          height="54px"
          fit="contain"
          alt="网站logo"
        />
      </div>
      <nav class="tenant-nav tenant-nav--legacy">
        <button v-if="hasMenu(1) || $store.state.settlementType != 3"
          class="tenant-nav__item" :class="{ active: activeNav === '/main/home' }"
          @click="setActive('/main/home')">
          <tenant-icon name="home" /><span>工作台</span>
        </button>
        <button v-if="canShowTopMenu(2)" class="tenant-nav__item"
          :class="{ active: activeNav === '/main/Ordermanagement' }"
          @click="setActive('/main/Ordermanagement')">
          <tenant-icon name="order" /><span>订单管理</span><tenant-icon class="tenant-nav__arrow" name="chevron" />
        </button>
        <div v-if="canShowTopMenu(3)" class="tenant-nav__group is-open">
          <button class="tenant-nav__item" :class="{ active: activeNav === '/main/Zoningmanagement' }"
            @click="setActive('/main/Zoningmanagement')">
            <tenant-icon name="partition" /><span>分区管理</span><tenant-icon class="tenant-nav__arrow" name="chevron" />
          </button>
          <div class="tenant-nav__children">
            <button v-if="canShowSideMenu(11)" :class="{ active: $route.path === '/main/partmodules' }" @click="refresh('/main/partmodules')"><tenant-icon name="template" />分区模板</button>
            <button v-if="canShowSideMenu(12)" :class="{ active: $route.path === '/main/partinstalls' }" @click="refresh('/main/partinstalls')"><tenant-icon name="install" />安装分区</button>
            <button v-if="canShowSideMenu(13)" :class="{ active: $route.path === '/main/Zoningmanagement' }" @click="refresh('/main/Zoningmanagement')"><tenant-icon name="zone" />分区管理</button>
            <button v-if="canShowSideMenu(14)" :class="{ active: $route.path === '/main/Groupmanagement' }" @click="refresh('/main/Groupmanagement')"><tenant-icon name="group" />分组管理</button>
            <button v-if="canShowSideMenu(15)" :class="{ active: $route.path === '/main/Orderreissue' }" @click="refresh('/main/Orderreissue')"><tenant-icon name="reissue" />手动补发</button>
            <button v-if="canShowSideMenu(20)" :class="{ active: $route.path === '/main/BetchOrderreissue' }" @click="refresh('/main/BetchOrderreissue')"><tenant-icon name="batch" />整区补发</button>
            <button v-if="canShowSideMenu(16)" :class="{ active: $route.path === '/main/Replacementofrecords' }" @click="refresh('/main/Replacementofrecords')"><tenant-icon name="record" />补发记录</button>
            <button v-if="canShowSideMenu(16)" :class="{ active: $route.path === '/main/orderInterval' }" @click="refresh('/main/orderInterval')"><tenant-icon name="clock" />定时任务</button>
            <button v-if="canShowSideMenu(21)" :class="{ active: $route.path === '/main/transfer' }" @click="refresh('/main/transfer')"><tenant-icon name="transfer" />转区点记录</button>
            <button v-if="canShowSideMenu(17)" :class="{ active: $route.path === '/main/conectKey' }" @click="refresh('/main/conectKey')"><tenant-icon name="key" />通讯秘钥</button>
          </div>
        </div>
        <button v-if="hasMenu(4) || ($store.state.settlementType != 3 && $store.state.settlementType != 4)"
          class="tenant-nav__item" :class="{ active: activeNav === '/main/DA' }" @click="setActive('/main/DA')">
          <tenant-icon name="chart" /><span>数据分析</span><tenant-icon class="tenant-nav__arrow" name="chevron" />
        </button>
        <button v-if="$store.state.settlementType != 3 && $store.state.settlementType != 4"
          class="tenant-nav__item" @click="setActive('/personal/baseInfo')">
          <tenant-icon name="account" /><span>账户管理</span><tenant-icon class="tenant-nav__arrow" name="chevron" />
        </button>
        <button v-if="$store.state.isEnabledPaid && $store.state.settlementType != 3 && $store.state.settlementType != 4"
          class="tenant-nav__item" @click="setActive('/behalf')">
          <tenant-icon name="transfer" /><span>代付管理</span><tenant-icon class="tenant-nav__arrow" name="chevron" />
        </button>
        <button v-if="$store.state.userType && $store.state.settlementType != 3 && $store.state.settlementType != 4"
          class="tenant-nav__item" @click="setActive('/agentsystem')">
          <tenant-icon name="agent" /><span>代理系统</span><tenant-icon class="tenant-nav__arrow" name="chevron" />
        </button>
        <button v-if="$store.state.settlementType != 3 && $store.state.settlementType != 4"
          class="tenant-nav__item" @click="setActive('/employee')">
          <tenant-icon name="employee" /><span>员工管理</span><tenant-icon class="tenant-nav__arrow" name="chevron" />
        </button>
      </nav>
      <tenant-global-nav :active-section="activeSectionKey" @navigate="refresh" />
      <div class="tenant-sidebar__utilities">
        <button v-if="canShowSideMenu(18)" @click="refresh('/main/gaincode')"><tenant-icon name="code" /><span>获取代码</span></button>
        <button v-if="canShowSideMenu(19)" @click="startGatewayDownload"><tenant-icon name="download" /><span>下载网关</span></button>
        <button v-if="siteBrandingResolved && !isAgentSite && !isRestrictedAccount" @click="openApiDoc"><tenant-icon name="document" /><span>教程文档</span></button>
        <button class="is-danger" @click="loginOut"><tenant-icon name="logout" /><span>退出登录</span></button>
      </div>
    </aside>
    <header v-if="isModernUi" class="tenant-topbar">
      <div class="tenant-breadcrumb"><span>商户中心</span><i>/</i><strong>{{ shellTitle }}</strong></div>
      <div class="tenant-topbar__actions">
        <div class="tenant-profile"><span>{{ (nickName || 'T').slice(0, 1).toUpperCase() }}</span><strong>{{ nickName || 'Tenant' }}</strong></div>
      </div>
    </header>
    <div class="header" :style="headboxStyle">
      <div class="headbox clearfix" :style="headboxStyle" style="display: flex;">
        <div class="logo"><site-logo variant="logo3" style="width: 250px;height: 50px;" alt="网站logo" /></div>
        <ul class="navbox clearfix" style="width: 75%;">
          <li v-if="hasMenu(1) || $store.state.settlementType != 3" :class="{ active: activeNav === '/main/home' }"
            :style="activeNav === '/main/home' ? activeNavStyle : (hoverNav === '/main/home' ? hoverNavStyle : null)"
            @click="setActive('/main/home')">
            <span class="icon1">首页</span>
          </li>
          <li v-if="canShowTopMenu(2)"
            :class="{ active: activeNav === '/main/Ordermanagement' }"
            :style="activeNav === '/main/Ordermanagement' ? activeNavStyle : (hoverNav === '/main/Ordermanagement' ? hoverNavStyle : null)"
            @click="setActive('/main/Ordermanagement')">
            <span class="icon1">订单管理</span>
          </li>
          <li v-if="canShowTopMenu(3)"
            :class="{ active: activeNav === '/main/Zoningmanagement' }"
            :style="activeNav === '/main/Zoningmanagement' ? activeNavStyle : (hoverNav === '/main/Zoningmanagement' ? hoverNavStyle : null)"
            @click="setActive('/main/Zoningmanagement')">
            <span class="icon1">分区管理</span>
          </li>
          <li v-if="hasMenu(4) || ($store.state.settlementType != 3 && $store.state.settlementType != 4)" :class="{ active: activeNav === '/main/DA' }"
            :style="activeNav === '/main/DA' ? activeNavStyle : (hoverNav === '/main/DA' ? hoverNavStyle : null)"
            @click="setActive('/main/DA')">
            <span class="icon1">数据分析</span>
          </li>
          <li @click="setActive('/personal/baseInfo')" v-if="$store.state.settlementType != 3 && $store.state.settlementType != 4"
            :class="{ active: activeNav === '/personal' || activeNav === '/personal/baseInfo' }"
            :style="activeNav === '/personal' || activeNav === '/personal/baseInfo' ? activeNavStyle : (hoverNav === '/personal' ? hoverNavStyle : null)">
            <span class="icon1">账户管理</span>
          </li>
          <li v-if="$store.state.isEnabledPaid && $store.state.settlementType != 3 && $store.state.settlementType != 4" @click="setActive('/behalf')"
            :class="{ active: activeNav === '/behalf' }" :style="hoverNav === '/behalf' ? hoverNavStyle : null">
            <span class="icon1">代付管理</span>
          </li>
          <li v-if="$store.state.userType && $store.state.settlementType != 3 && $store.state.settlementType != 4" @click="setActive('/agentsystem')"
            :class="{ active: activeNav === '/agentsystem' }"
            :style="hoverNav === '/agentsystem' ? hoverNavStyle : null">
            <span class="icon1">代理系统</span>
          </li>
          <li :class="{ active: activeNav === '/employee' }"
            v-if="$store.state.settlementType != 3 && $store.state.settlementType != 4"
            :style="activeNav === '/employee' ? activeNavStyle : (hoverNav === '/employee' ? hoverNavStyle : null)"
            @click="setActive('/employee')">
            <span class="icon1">员工管理</span>
          </li>
        </ul>
        <div class="count" style="width: 6%;">{{ nickName }}</div>
      </div>
    </div>
    <div ref="mainScrollArea" class="container">
      <div class="midleContaner" style="background: #f2f2f2;width: 1280px;">
        <div class="slider" :style="sliderStyle">
          <div class="top_tit" :style="headboxStyle">控制面板</div>
          <ul>
            <li v-if="canShowSideMenu(11)" :style="sliderStyle" style="margin-top: 10px;">
              <span class="icon1" @click="refresh('/main/partmodules')">分区模板</span>
            </li>
            <li v-if="canShowSideMenu(12)" :style="sliderStyle">
              <span class="icon2" @click="refresh('/main/partinstalls')">安装分区</span>
            </li>
            <li v-if="canShowSideMenu(13)" :style="sliderStyle">
              <span class="icon3" @click="refresh('/main/Zoningmanagement')">分区管理</span>
            </li>
            <li v-if="canShowSideMenu(14)" :style="sliderStyle">
              <span class="icon4" @click="refresh('/main/Groupmanagement')">分组管理</span>
            </li>
            <li v-if="canShowSideMenu(15)" :style="sliderStyle">
              <span class="icon6" @click="refresh('/main/Orderreissue')">手动补发</span>
            </li>
            <li v-if="canShowSideMenu(20)" :style="sliderStyle">
              <span class="icon7" @click="refresh('/main/BetchOrderreissue')">整区补发</span>
            </li>
            <li v-if="canShowSideMenu(16)" :style="sliderStyle">
              <span class="icon5" @click="refresh('/main/Replacementofrecords')">补发记录</span>
            </li>
            <li v-if="canShowSideMenu(16)" :style="sliderStyle">
              <span class="icon12" @click="refresh('/main/orderInterval')">定时任务</span>
            </li>
            <li v-if="canShowSideMenu(21)" :style="sliderStyle">
              <span class="icon8" @click="refresh('/main/transfer')">转区点记录</span>
            </li>
            <li v-if="canShowSideMenu(17)" :style="sliderStyle">
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
            <li v-if="canShowSideMenu(18)" :style="sliderStyle">
              <span class="icon9" @click="refresh('/main/gaincode')">获取代码</span>
            </li>
            <!-- <li style="color: black;">
              <span class="icon8" @click="refresh('/main/fenyong')"
                >推广分佣</span
              >
            </li> -->
            <li v-if="canShowSideMenu(19)" :style="sliderStyle">
              <span class="icon10" @click="startGatewayDownload">下载网关</span>
            </li>
            <li v-if="siteBrandingResolved && !isAgentSite && !isRestrictedAccount" :style="sliderStyle">
              <span class="icon13" @click="openApiDoc">教程文档</span>
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
    <charge-link v-if="preview" :chargeUrl="chargeUrl" :styleNum="floatingpictures"
      :styletype="floatstyle"></charge-link>
    <div v-if="showDownloadOverlay" class="gateway-download-overlay">
      <div class="gateway-download-overlay__scrim"></div>
      <div class="gateway-download-card" :class="`is-${downloadPhase}`">
        <div class="gateway-download-card__top">
          <div class="gateway-download-card__heading">
            <div class="gateway-download-card__brand">商户中心</div>
            <div class="gateway-download-card__title">{{ downloadStatusTitle }}</div>
            <div class="gateway-download-card__subtitle">{{ downloadStatusText }}</div>
          </div>
          <div class="gateway-download-card__badge">{{ downloadPhaseLabel }}</div>
        </div>
        <div class="gateway-download-card__body">
          <div class="gateway-download-card__icon">
            <i :class="downloadStatusIcon"></i>
          </div>
          <div class="gateway-download-card__content">
            <div class="gateway-download-card__file">
              <span class="gateway-download-card__file-label">当前任务</span>
              <span class="gateway-download-card__file-name">{{ downloadDisplayName || '网关压缩包.zip' }}</span>
            </div>
            <div class="gateway-download-card__bar">
              <div class="gateway-download-card__track">
                <div class="gateway-download-card__fill" :style="{ width: `${displayDownloadPercentage}%` }"></div>
                <div class="gateway-download-card__glow" :style="{ width: `${displayDownloadPercentage}%` }"></div>
              </div>
              <div v-if="showDownloadPercentage" class="gateway-download-card__percent">{{ displayDownloadPercentage }}%</div>
            </div>
            <div class="gateway-download-card__meta">
              <span>{{ downloadProgressText }}</span>
              <span>{{ downloadMetaStatus }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 右侧快捷浮窗（平台技术 / 微信验证 / 下载 / 回顶） -->
    <div class="merchant-float-dock" :class="{ 'is-collapsed': floatDockCollapsed }">
      <div class="merchant-float-dock__inner">
        <div
          class="merchant-float-dock__item merchant-float-dock__item--toggle"
          role="button"
          tabindex="0"
          :title="floatDockCollapsed ? '展开' : '点击收起'"
          @click="floatDockCollapsed = !floatDockCollapsed"
          @keyup.enter="floatDockCollapsed = !floatDockCollapsed"
        >
          <i :class="floatDockCollapsed ? 'el-icon-d-arrow-left' : 'el-icon-d-arrow-right'"></i>
          <span v-show="!floatDockCollapsed" class="merchant-float-dock__label">点击收起</span>
        </div>
        <a
          class="merchant-float-dock__item"
          :href="floatDockQqHref('platform')"
          title="平台技术"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="el-icon-setting"></i>
          <span v-show="!floatDockCollapsed" class="merchant-float-dock__label">平台技术</span>
        </a>
        <a
          class="merchant-float-dock__item"
          :href="floatDockQqHref('assistant')"
          title="助手技术"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="el-icon-service"></i>
          <span v-show="!floatDockCollapsed" class="merchant-float-dock__label">助手技术</span>
        </a>
        <a
          class="merchant-float-dock__item"
          :href="floatDockPortalUrl"
          title="微信验证"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="el-icon-search"></i>
          <span v-show="!floatDockCollapsed" class="merchant-float-dock__label">微信验证</span>
        </a>
        <a
          class="merchant-float-dock__item"
          :href="floatDockPortalUrl"
          title="助手下载"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="el-icon-download"></i>
          <span v-show="!floatDockCollapsed" class="merchant-float-dock__label">助手下载</span>
        </a>
        <a
          class="merchant-float-dock__item"
          :href="floatDockPortalUrl"
          title="备用下载"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="el-icon-folder"></i>
          <span v-show="!floatDockCollapsed" class="merchant-float-dock__label">备用下载</span>
        </a>
        <div
          class="merchant-float-dock__item"
          role="button"
          tabindex="0"
          title="回到顶部"
          @click="scrollMainToTop"
          @keyup.enter="scrollMainToTop"
        >
          <i class="el-icon-arrow-up"></i>
          <span v-show="!floatDockCollapsed" class="merchant-float-dock__label">回到顶部</span>
        </div>
      </div>
    </div>
    <iframe name="downloadIframe" style="display:none;"></iframe>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import chargeLink from '../components/chargeLink';
import TenantIcon from '../components/TenantIcon';
import TenantGlobalNav from '../components/TenantGlobalNav';
import Mgr from '../assets/js/SecurityService';
import mgrs from '../assets/js/securityapi';
import { loginUrl, netUrl } from '../assets/js/version';
import axios from 'axios';
import { appendQuery, downloadFile, normalizeDownloadUrl, probeDownloadFile } from '../utils/downloadFile';
export default {
  name: 'Home',
  inject: ['reload'],
  components: {
    chargeLink,
    TenantIcon,
    TenantGlobalNav
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
        wg: '', // 网关安装包（管理端资源 key 与历来一致，如 wg）
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
      hoverNav: '', // 当前 hover 的菜单 path
      downloadLoading: false,
      downloadPhase: 'idle',
      downloadOverlayVisible: false,
      downloadProgressPercentage: 0,
      downloadProgressLoaded: 0,
      downloadProgressTotal: 0,
      downloadDisplayName: '',
      isDisablePayApi: false,
      isAgentSite: false,
      siteBrandingResolved: false,
      floatDockCollapsed: this.$root.uiMode === 'modern',
      // 微信验证 / 助手下载 / 备用下载 统一打开的站点
      floatDockPortalUrl: 'https://www.haozs.com/',
      // 平台技术、助手技术：客服 QQ 号（用于 wpa 拉起会话）；若某项填了 floatDockQqHrefOverride 则优先用完整链接
      floatDockQqUin: {
        platform: '887572',
        assistant: '284016'
      },
      floatDockQqHrefOverride: {
        platform: '',
        assistant: ''
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
    ]),
    isModernUi() {
      return this.$root.uiMode === 'modern';
    },
    activeSectionKey() {
      const path = (this.$route && this.$route.path) || '';
      if (path.startsWith('/personal')) return 'account';
      if (path.startsWith('/behalf') || path.startsWith('/audit') || path.startsWith('/rollout')) return 'behalf';
      if (path.startsWith('/agentsystem')) return 'agent';
      if (path.startsWith('/employee')) return 'employee';
      if (path === '/main/home') return 'home';
      if (path === '/main/Ordermanagement') return 'order';
      if (path === '/main/DA') return 'analysis';
      if (path.startsWith('/main/')) return 'partition';
      return '';
    },
    isRestrictedAccount() {
      const settlementType = Number(this.$store.state.settlementType);
      return settlementType === 3 || settlementType === 4;
    },
    shellTitle() {
      const titleMap = {
        '/main/home': '业务总览',
        '/main/Ordermanagement': '订单管理',
        '/main/partmodules': '分区模板',
        '/main/partinstalls': '安装分区',
        '/main/Zoningmanagement': '分区管理',
        '/main/Groupmanagement': '分组管理',
        '/main/Orderreissue': '手动补发',
        '/main/BetchOrderreissue': '整区补发',
        '/main/Replacementofrecords': '补发记录',
        '/main/orderInterval': '定时任务',
        '/main/transfer': '转区点记录',
        '/main/conectKey': '通讯秘钥',
        '/main/DA': '数据分析',
        '/main/gaincode': '获取代码'
      };
      return titleMap[this.$route.path] || '工作台';
    },
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
        case 1: return { background: '#eee2e4', color: '#303133' };
        case 2: return { background: 'var(--312143a6)', color: '#303133' };
        case 3: return { background: '#e5e6f6', color: '#303133' };
        case 4: return { background: '#f6e5e0', color: '#303133' };
        case 5: return { background: '#e9e3f4', color: '#303133' };
        case 6: return { background: '#e5e0e2', color: '#303133' };
        default: return { background: 'linear-gradient(to bottom,#f2f2f2 0,#f8f8f8 100%', color: '#303133' };
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
    },
    downloadProgressText() {
      if (!this.showDownloadStatusBox) {
        return '';
      }
      if (this.downloadPhase === 'ready') {
        return this.downloadProgressTotal > 0
          ? `即将下载 ${this.formatDownloadSize(this.downloadProgressTotal)}`
          : '正在为你准备下载资源...';
      }
      if (this.downloadPhase === 'done') {
        const finishedSize = this.downloadProgressLoaded || this.downloadProgressTotal;
        if (this.downloadDisplayName) {
          return `${this.downloadDisplayName} 已完成${finishedSize > 0 ? `，共 ${this.formatDownloadSize(finishedSize)}` : ''}`;
        }
        return `已完成 ${this.formatDownloadSize(finishedSize)}`;
      }
      if (this.downloadProgressTotal > 0) {
        return `${this.formatDownloadSize(this.downloadProgressLoaded)} / ${this.formatDownloadSize(this.downloadProgressTotal)}`;
      }
      if (this.downloadProgressLoaded > 0) {
        return `已下载 ${this.formatDownloadSize(this.downloadProgressLoaded)}`;
      }
      return '正在连接服务器...';
    },
    downloadProgressStatus() {
      if (!this.showDownloadStatusBox) {
        return '';
      }
      return this.downloadPhase === 'done' ? 'success' : '';
    },
    downloadStatusTitle() {
      switch (this.downloadPhase) {
        case 'ready':
          return '网关下载准备中';
        case 'done':
          return '网关下载已完成';
        default:
          return '网关下载中';
      }
    },
    downloadPhaseLabel() {
      switch (this.downloadPhase) {
        case 'ready':
          return '准备下载';
        case 'done':
          return '下载完成';
        default:
          return '下载中';
      }
    },
    downloadProgressColor() {
      switch (this.downloadPhase) {
        case 'done':
          return '#13ce66';
        case 'ready':
          return '#e6a23c';
        default:
          return '#409eff';
      }
    },
    showDownloadStatusBox() {
      return this.downloadPhase !== 'idle';
    },
    showDownloadOverlay() {
      return this.downloadOverlayVisible;
    },
    displayDownloadPercentage() {
      if (this.downloadPhase === 'ready') {
        return 0;
      }
      if (this.downloadPhase === 'done') {
        return 100;
      }
      return Math.max(0, Math.min(100, this.downloadProgressPercentage || 0));
    },
    showDownloadPercentage() {
      return this.downloadPhase !== 'ready';
    },
    downloadStatusText() {
      switch (this.downloadPhase) {
        case 'ready':
          return '系统正在校验资源并准备下载链路，请稍候片刻';
        case 'done':
          return '资源包已传输完成，浏览器正在为你保存文件';
        default:
          return '下载任务正在稳定传输，请尽量保持当前页面不关闭';
      }
    },
    downloadMetaStatus() {
      switch (this.downloadPhase) {
        case 'ready':
          return '准备下载';
        case 'done':
          return '传输完成';
        default:
          return '正在传输';
      }
    },
    downloadStatusIcon() {
      switch (this.downloadPhase) {
        case 'ready':
          return 'el-icon-loading';
        case 'done':
          return 'el-icon-circle-check';
        default:
          return 'el-icon-download';
      }
    }
  },
  watch: {
    '$route.path'(newPath) {
      this.updateActiveByRoute(newPath || this.$route.path);
      this.ensureRestrictedRouteAccess(newPath || this.$route.path);
    },
    skinNum() {
      this.updateThemeVars();
    },
    isModernUi(modern) {
      this.floatDockCollapsed = modern;
    }
  },
  methods: {
    preloadModernEmployeePages() {
      if (!this.isModernUi) return;

      // 复用路由本身的异步组件加载器，确保预加载的就是首次进入时需要的代码块。
      // 仅新 UI 执行；旧 UI 仍保持原有的按需加载行为。
      const employeeRoute = this.$router.options.routes.find(route => route.path === '/employee');
      if (!employeeRoute) return;

      const commonChildren = employeeRoute.children.filter(route => ['setting', 'roles'].includes(route.path));
      const routeLoaders = [employeeRoute, ...commonChildren]
        .map(route => route.component)
        .filter(loader => typeof loader === 'function');
      const preload = loader => new Promise(resolve => loader(() => resolve()));

      this.$nextTick(() => Promise.all(routeLoaders.map(preload)).catch(() => { }));
    },
    normalizeGatewayConfigUrl(url) {
      return normalizeDownloadUrl(url || '', netUrl);
    },
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
          this.isDisablePayApi = data.data.isDisablePayApi === true;
          this.$nextTick(() => this.ensureRestrictedRouteAccess(this.$route.path));
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
      try {
        const header = await mgrs();
        const data = await axios({
          method: 'get',
          url: netUrl + '/api/ManageResource/GetConfig',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + header
          }
        });

        if (data.status === 200) {
          this.dialog.cq3 = this.normalizeGatewayConfigUrl(data.data.cq3);
          this.dialog.ty = this.normalizeGatewayConfigUrl(data.data.ty);
          this.dialog.wg = this.normalizeGatewayConfigUrl(data.data.wg);
          this.dialog.sql = this.normalizeGatewayConfigUrl(data.data.sql);
          this.dialog.ltcq = this.normalizeGatewayConfigUrl(data.data.ltcq);
          this.dialog.yktl = this.normalizeGatewayConfigUrl(data.data.yktl);
          this.dialog.dslh = this.normalizeGatewayConfigUrl(data.data.dslh);
          this.dialog.ymcq = this.normalizeGatewayConfigUrl(data.data.ymcq);
          this.dialog.cqby = this.normalizeGatewayConfigUrl(data.data.cqby);
          this.dialog.xbnz = this.normalizeGatewayConfigUrl(data.data.xbnz);
          this.dialog.jxqy = this.normalizeGatewayConfigUrl(data.data.jxqy);
          return true;
        }

        this.$messageError('下载配置获取失败，请稍后再试');
        return false;
      } catch (err) {
        this.$messageError(err.message);
        return false;
      }
    },
    // 弹框初始化
    dialoginit() {
      this.dialog.cq3 = ''; // 传奇3
      this.dialog.ty = ''; // 传奇世界
      this.dialog.wg = ''; // 网关
      this.dialog.sql = ''; // sql
      this.resetDownloadProgress();
    },
    getGatewayDownloadUrl(num) {
      const map = {
        1: this.dialog.wg,
        2: this.dialog.ty,
        3: this.dialog.cq3,
        4: this.dialog.sql,
        6: this.dialog.ltcq,
        14: this.dialog.jxqy,
        15: this.dialog.xbnz,
        16: this.dialog.yktl,
        17: this.dialog.dslh,
        18: this.dialog.ymcq,
        19: this.dialog.cqby
      };
      return this.normalizeGatewayConfigUrl(map[num]);
    },
    getGatewayFallbackName(num) {
      const map = {
        1: '网关压缩包.zip',
        2: '兑换网关.zip',
        3: '传奇3网关.zip',
        4: 'SQL文件.zip'
      };
      return map[num] || '网关压缩包.zip';
    },
    // 下载
    async loadzip(num) {
      if (this.downloadLoading) {
        return;
      }

      let url = this.getGatewayDownloadUrl(num || 1);
      if (!url) {
        this.$messageError('暂无可下载的网关资源');
        return;
      }
      url = appendQuery(url, 'merchantId', this.id);

      this.downloadLoading = true;
      this.downloadOverlayVisible = true;
      this.resetDownloadProgress();
      this.downloadPhase = 'ready';
      try {
        const probe = await probeDownloadFile(url, {
          fallbackName: this.getGatewayFallbackName(num)
        }).catch(() => null);
        if (probe) {
          this.downloadDisplayName = probe.fileName || this.getGatewayFallbackName(num);
          this.downloadProgressTotal = probe.total || 0;
        } else {
          this.downloadDisplayName = this.getGatewayFallbackName(num);
        }
        await downloadFile(url, this.getGatewayFallbackName(num), {
          onProgress: progress => {
            this.downloadPhase = 'downloading';
            this.downloadProgressLoaded = progress.loaded || 0;
            this.downloadProgressTotal = progress.total || 0;
            this.downloadProgressPercentage = progress.percentage || 0;
          }
        });
        if (this.downloadProgressPercentage < 100) {
          this.downloadProgressPercentage = 100;
        }
        if (this.downloadProgressLoaded <= 0 && this.downloadProgressTotal > 0) {
          this.downloadProgressLoaded = this.downloadProgressTotal;
        }
        this.downloadPhase = 'done';
        window.setTimeout(() => {
          this.downloadOverlayVisible = false;
        }, 800);
      } catch (err) {
        this.downloadPhase = 'idle';
        this.downloadOverlayVisible = false;
        this.$messageError((err && err.message) || '下载失败，请稍后再试');
      } finally {
        window.setTimeout(() => {
          this.downloadLoading = false;
          if (this.downloadPhase === 'done') {
            this.resetDownloadProgress();
          }
        }, this.downloadPhase === 'done' ? 800 : 0);
      }
    },
    resetDownloadProgress() {
      this.downloadPhase = 'idle';
      this.downloadProgressPercentage = 0;
      this.downloadProgressLoaded = 0;
      this.downloadProgressTotal = 0;
      this.downloadDisplayName = '';
    },
    formatDownloadSize(size) {
      const value = Number(size) || 0;
      if (value >= 1024 * 1024) {
        return `${(value / (1024 * 1024)).toFixed(1)} MB`;
      }
      if (value >= 1024) {
        return `${(value / 1024).toFixed(1)} KB`;
      }
      return `${value} B`;
    },
    // 跳转路由刷新
    refresh(path) {
      if (this.$route.path.indexOf(path) > -1) {
        this.reload();
      } else {
        this.$router.push({ path: path });
      }
    },
    openApiDoc() {
      const merchantBaseUrl = (loginUrl || '').replace(/\/$/, '');
      window.open(merchantBaseUrl + '/api/doc/ApiDesc.html', '_blank');
    },
    hasMenu(menuId) {
      const menuIds = (this.$store.state.roleInfo || '').split(',').map(id => Number(id));
      return menuIds.includes(menuId);
    },
    canShowTopMenu(menuId) {
      const settlementType = Number(this.$store.state.settlementType);
      if (settlementType === 4) {
        return this.hasMenu(menuId);
      }
      if (settlementType === 3) {
        return this.hasMenu(menuId);
      }
      return true;
    },
    canShowSideMenu(menuId) {
      const settlementType = Number(this.$store.state.settlementType);
      if (settlementType === 4) {
        return menuId === 13 ? this.hasMenu(3) : (menuId === 15 && this.hasMenu(15));
      }
      return settlementType === 3 ? this.hasMenu(menuId) : true;
    },
    ensureRestrictedRouteAccess(path) {
      const settlementType = Number(this.$store.state.settlementType);
      if (settlementType === 3) {
        if (path === '/main/transfer' && !this.hasMenu(21)) {
          this.$router.replace('/main/home').catch(() => {});
        }
        return;
      }
      if (settlementType !== 4) {
        return;
      }
      const requiredMenus = {
        '/main/Ordermanagement': 2,
        '/main/Zoningmanagement': 3,
        '/main/Orderreissue': 15,
        '/main/transfer': 21
      };
      if (path === '/main/home') {
        return;
      }
      const requiredMenu = requiredMenus[path];
      if (!requiredMenu || !this.hasMenu(requiredMenu)) {
        this.$router.replace('/main/home').catch(() => {});
      }
    },
    updateThemeVars() {
      const bg = (this.headboxStyle && this.headboxStyle.background) || '#0398d6';
      const txt = (this.headboxStyle && this.headboxStyle.color) || 'white';
      document.documentElement.style.setProperty('--theme-color', bg);
      document.documentElement.style.setProperty('--theme-text', txt);
      localStorage.setItem('themeColor', bg);
    },
    floatDockQqHref(role) {
      const key = role === 'assistant' ? 'assistant' : 'platform';
      const override = (this.floatDockQqHrefOverride && this.floatDockQqHrefOverride[key]) || '';
      if (String(override).trim()) {
        return String(override).trim();
      }
      const uin = (
        key === 'assistant'
          ? (this.floatDockQqUin && this.floatDockQqUin.assistant) || ''
          : (this.floatDockQqUin && this.floatDockQqUin.platform) || ''
      )
        .toString()
        .trim();
      if (!uin) {
        return this.floatDockPortalUrl;
      }
      return `https://wpa.qq.com/msgrd?v=3&uin=${encodeURIComponent(uin)}&site=qq&menu=yes`;
    },
    async loadFloatDockSupportQq() {
      try {
        const response = await this.$api.login.footerInfo();
        const data = response.data || {};
        this.isAgentSite = data.isAgentSite === true;
        if (!this.isAgentSite) {
          return;
        }
        if (/^\d{5,11}$/.test(String(data.platformSupportQq || ''))) {
          this.floatDockQqUin.platform = String(data.platformSupportQq);
        }
        if (/^\d{5,11}$/.test(String(data.assistantSupportQq || ''))) {
          this.floatDockQqUin.assistant = String(data.assistantSupportQq);
        }
      } catch {
        // Keep platform defaults when agent branding cannot be loaded.
      } finally {
        this.siteBrandingResolved = true;
      }
    },
    scrollMainToTop() {
      const el = this.$refs.mainScrollArea;
      if (el && typeof el.scrollTo === 'function') {
        el.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (el) {
        el.scrollTop = 0;
      } else {
        window.scrollTo(0, 0);
      }
    },
    async startGatewayDownload() {
      if (this.downloadLoading) {
        return;
      }

      this.downloadOverlayVisible = true;
      this.resetDownloadProgress();
      this.downloadPhase = 'ready';
      this.downloadDisplayName = '网关压缩包.zip';

      const loaded = await this.download();
      if (!loaded) {
        this.downloadOverlayVisible = false;
        this.resetDownloadProgress();
        return;
      }

      await this.loadzip(1);
    }
  },
  created() {
    this.getUser();
    this.preloadModernEmployeePages();
    this.loadFloatDockSupportQq();
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
          padding: 0 24px;
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
      width: 1280px;
      max-width: 100%;
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

              &.icon13 {
                background-image: url(../assets/images/icons.png);
                background-repeat: no-repeat;
                background-position: 32px -480px;
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

}

.gateway-download-overlay {
  position: fixed;
  inset: 0;
  z-index: 5000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  pointer-events: none;

  &__scrim {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(circle at top, rgba(57, 148, 232, 0.14), transparent 40%),
      linear-gradient(180deg, rgba(8, 54, 92, 0.16), rgba(7, 40, 74, 0.26));
    backdrop-filter: blur(5px);
  }
}

.gateway-download-card {
  position: relative;
  width: min(820px, calc(100vw - 64px));
  padding: 0;
  border-radius: 22px;
  overflow: hidden;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(245, 250, 255, 0.98));
  box-shadow:
    0 28px 60px rgba(13, 67, 114, 0.18),
    0 8px 20px rgba(13, 67, 114, 0.08);
  border: 1px solid rgba(60, 137, 216, 0.16);
  pointer-events: auto;

  &::before {
    content: '';
    position: absolute;
    inset: 0 0 auto 0;
    height: 120px;
    background: linear-gradient(90deg, rgba(3, 152, 214, 0.96), rgba(22, 113, 193, 0.92));
  }

  &::after {
    content: '';
    position: absolute;
    inset: auto 0 0 0;
    height: 160px;
    background: linear-gradient(180deg, rgba(235, 245, 255, 0), rgba(214, 232, 248, 0.45));
  }

  &.is-ready {
    border-color: rgba(236, 184, 71, 0.32);
  }

  &.is-done {
    border-color: rgba(54, 180, 112, 0.28);
  }

  &__top {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 24px;
    padding: 28px 34px 26px;
  }

  &__heading {
    min-width: 0;
  }

  &__brand {
    position: relative;
    color: rgba(255, 255, 255, 0.74);
    font-size: 13px;
    letter-spacing: 0.18em;
  }

  &__badge {
    position: relative;
    z-index: 1;
    flex-shrink: 0;
    min-width: 104px;
    height: 38px;
    padding: 0 18px;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 14px;
    font-weight: 600;
    background: rgba(255, 255, 255, 0.16);
    border: 1px solid rgba(255, 255, 255, 0.24);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.12);
  }

  &__title {
    position: relative;
    margin-top: 12px;
    color: #fff;
    font-size: 34px;
    line-height: 1.2;
    font-weight: 700;
    letter-spacing: 0.01em;
  }

  &__subtitle {
    position: relative;
    margin-top: 12px;
    color: rgba(255, 255, 255, 0.86);
    font-size: 15px;
    line-height: 1.8;
    max-width: 560px;
  }

  &__body {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 24px;
    padding: 32px 34px 32px;
  }

  &__icon {
    position: relative;
    flex-shrink: 0;
    width: 92px;
    height: 92px;
    border-radius: 26px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(180deg, #eef7ff, #dceefe);
    border: 1px solid rgba(64, 142, 218, 0.18);
    color: #2186d4;
    font-size: 40px;
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.92),
      0 10px 22px rgba(42, 120, 190, 0.14);
  }

  &__content {
    min-width: 0;
    flex: 1;
  }

  &__file {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 18px;
    min-width: 0;
  }

  &__file-label {
    flex-shrink: 0;
    padding: 4px 10px;
    border-radius: 999px;
    background: rgba(3, 152, 214, 0.08);
    color: #1177bf;
    font-size: 12px;
    font-weight: 600;
  }

  &__file-name {
    min-width: 0;
    color: #2d4660;
    font-size: 20px;
    font-weight: 600;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__bar {
    position: relative;
    display: flex;
    align-items: center;
    gap: 22px;
  }

  &__track {
    position: relative;
    flex: 1;
    height: 16px;
    border-radius: 999px;
    overflow: hidden;
    background: linear-gradient(180deg, #e4eef8, #d4e3f1);
    box-shadow: inset 0 1px 5px rgba(54, 100, 146, 0.16);
  }

  &__fill,
  &__glow {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    border-radius: inherit;
    transition: width 0.35s ease;
  }

  &__fill {
    background: linear-gradient(90deg, #28b2ea 0%, #1d8bde 45%, #0f70ca 100%);
  }

  &__glow {
    background: linear-gradient(90deg, rgba(255, 255, 255, 0.42), rgba(255, 255, 255, 0));
  }

  &__percent {
    min-width: 86px;
    text-align: right;
    color: #0f6dbd;
    font-size: 34px;
    font-weight: 700;
    letter-spacing: 0.03em;
  }

  &__meta {
    position: relative;
    display: flex;
    justify-content: space-between;
    gap: 20px;
    margin-top: 14px;
    color: #6f86a0;
    font-size: 14px;
    line-height: 1.6;
  }
}

@media (max-width: 768px) {
  .gateway-download-card {
    width: calc(100vw - 28px);

    &__top,
    &__body {
      padding-left: 22px;
      padding-right: 22px;
    }

    &__top,
    &__body,
    &__bar,
    &__meta,
    &__file {
      display: block;
    }

    &__badge,
    &__icon {
      margin-top: 16px;
    }

    &__title {
      font-size: 28px;
    }

    &__icon {
      width: 78px;
      height: 78px;
      font-size: 34px;
    }

    &__file {
      margin-bottom: 14px;
    }

    &__file-name {
      display: block;
      margin-top: 8px;
      font-size: 18px;
      white-space: normal;
    }

    &__bar {
      margin-top: 18px;
    }

    &__percent {
      margin-top: 14px;
      text-align: left;
      font-size: 28px;
    }

    &__meta {
      margin-top: 12px;
    }
  }
}

.merchant-float-dock {
  position: fixed;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 3100;
  font-size: 13px;
  color: #fff;
  user-select: none;

  &__inner {
    background: linear-gradient(180deg, #1a9fff 0%, #0877db 100%);
    border-radius: 10px 0 0 10px;
    box-shadow: -2px 4px 16px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    min-width: 132px;
  }

  &__item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 11px 14px 11px 12px;
    cursor: pointer;
    color: #fff !important;
    text-decoration: none !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.22);
    transition: background 0.18s ease;
    line-height: 1.3;

    &:hover {
      background: rgba(255, 255, 255, 0.14);
    }

    &:last-child {
      border-bottom: none;
    }

    i {
      font-size: 17px;
      flex-shrink: 0;
      width: 20px;
      text-align: center;
    }
  }

  &__item--toggle {
    font-weight: 600;
  }

  &__label {
    white-space: nowrap;
  }

  &.is-collapsed &__inner {
    min-width: 0;
  }

  &.is-collapsed &__item {
    padding: 10px 10px;
    justify-content: center;
  }

  &.is-collapsed &__label {
    display: none;
  }
}
</style>
<style lang="scss" scoped>
.main.tenant-ui-modern-shell {
  padding: 0 !important;
  background: var(--tenant-page) !important;
}

/* 新版工具栏收起后只保留展开把手，避免整列图标遮挡页面内容 */
.main.tenant-ui-modern-shell .merchant-float-dock.is-collapsed .merchant-float-dock__inner {
  min-width: 0;
  border-radius: 10px 0 0 10px;
}

.main.tenant-ui-modern-shell .merchant-float-dock.is-collapsed .merchant-float-dock__item:not(.merchant-float-dock__item--toggle) {
  display: none;
}

.main.tenant-ui-modern-shell .merchant-float-dock.is-collapsed .merchant-float-dock__item--toggle {
  box-sizing: border-box;
  width: 40px;
  height: 40px;
  padding: 0;
  border-bottom: 0;
}

.main.tenant-ui-modern-shell > .header,
.main.tenant-ui-modern-shell .midleContaner > .slider {
  display: none !important;
}

.tenant-sidebar {
  position: fixed;
  z-index: 1200;
  inset: 0 auto 0 0;
  width: 216px;
  display: flex;
  flex-direction: column;
  color: #c7d4e8;
  background:
    radial-gradient(circle at 20% 4%, rgba(74, 123, 255, .18), transparent 24%),
    linear-gradient(180deg, var(--tenant-sidebar) 0%, var(--tenant-sidebar-deep) 100%);
  box-shadow: 14px 0 40px rgba(8, 27, 54, 0.1);
}

.tenant-brand {
  height: 64px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px solid rgba(255, 255, 255, 0.07);

  &__logo {
    max-width: 100%;
    object-position: left center;
  }
}

.tenant-nav {
  flex: 1;
  min-height: 0;
  padding: 14px 10px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(255,255,255,.15) transparent;

  button { font-family: inherit; }

  &__item,
  &__children button {
    width: 100%;
    border: 0;
    color: #aebed4;
    background: transparent;
    cursor: pointer;
    transition: color .18s, background .18s;
  }

  &__item {
    height: 46px;
    padding: 0 13px;
    display: flex;
    align-items: center;
    gap: 12px;
    border-radius: 8px;
    font-size: 14px;
    text-align: left;
  }

  &__item > span { flex: 1; }
  &__item:hover { color: #fff; background: rgba(255,255,255,.055); }
  &__item.active { color: #fff; background: linear-gradient(90deg, #3e5cf2, #5576ff); box-shadow: 0 7px 18px rgba(50, 79, 220, .28); }
  &__arrow { width: 14px !important; height: 14px !important; transition: transform .2s; }
  &__group.is-open > &__item:not(.active) { color: #d9e4f3; }
  &__group.is-open > &__item &__arrow { transform: rotate(180deg); }

  &__children {
    position: relative;
    margin: 4px 0 7px 24px;
    padding-left: 12px;
    border-left: 1px solid rgba(144, 169, 205, .22);
  }

  &__children button {
    min-height: 38px;
    padding: 7px 10px;
    display: flex;
    align-items: center;
    gap: 9px;
    border-radius: 7px;
    font-size: 13px;
    text-align: left;
  }

  &__children button .tenant-icon { width: 16px; height: 16px; }
  &__children button:hover { color: #fff; background: rgba(255,255,255,.05); }
  &__children button.active { color: #7fc7ff; background: rgba(79,107,255,.14); }
}

.tenant-nav--legacy { display: none !important; }

.tenant-sidebar__utilities {
  padding: 12px 10px 14px;
  border-top: 1px solid rgba(255,255,255,.08);

  button {
    width: 100%;
    height: 38px;
    padding: 0 13px;
    display: flex;
    align-items: center;
    gap: 11px;
    border: 0;
    border-radius: 7px;
    color: #94a9c5;
    background: transparent;
    cursor: pointer;
  }

  button:hover { color: #fff; background: rgba(255,255,255,.055); }
  button.is-danger:hover { color: #ff8f8f; background: rgba(239,68,68,.1); }
  .tenant-icon { width: 17px; height: 17px; }
}

.tenant-topbar {
  position: fixed;
  z-index: 1100;
  top: 0;
  right: 0;
  left: 216px;
  height: 64px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: rgba(255,255,255,.9);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid var(--tenant-border);
  box-shadow: 0 2px 10px rgba(31,48,80,.035);
}

.tenant-breadcrumb {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #98a2b3;

  i { color: #d0d5dd; font-style: normal; }
  strong { color: #344054; font-weight: 600; }
}

.tenant-topbar__actions { display: flex; align-items: center; gap: 8px; }

.tenant-profile {
  display: flex;
  align-items: center;
  gap: 9px;
  color: #344054;

  > span {
    width: 38px;
    height: 38px;
    display: grid;
    place-items: center;
    border-radius: 50%;
    color: #fff;
    font-size: 14px;
    font-weight: 700;
    background: linear-gradient(135deg, #45c6de, #5268f7 58%, #7658e8);
    box-shadow: 0 7px 18px rgba(82,104,247,.28);
  }

  strong { font-size: 14px; font-weight: 600; }
}

.main.tenant-ui-modern-shell > .container {
  height: 100% !important;
  padding: 84px 24px 24px 240px !important;
  box-sizing: border-box;
  overflow-y: auto;
  background:
    radial-gradient(circle at 76% -12%, rgba(82,104,247,.08), transparent 26%),
    var(--tenant-page);
}

.main.tenant-ui-modern-shell > .container .midleContaner {
  width: 100% !important;
  max-width: none !important;
  min-height: calc(100vh - 108px);
  margin: 0 !important;
  box-shadow: none !important;
  background: transparent !important;
}

.main.tenant-ui-modern-shell > .container .contentbox {
  width: 100%;
  min-height: calc(100vh - 108px) !important;
  margin-left: 0 !important;
  background: transparent !important;
}

@media (max-width: 1180px) {
  .tenant-sidebar { width: 200px; }
  .tenant-topbar { left: 200px; }
  .main.tenant-ui-modern-shell > .container { padding-left: 220px !important; padding-right: 20px !important; }
}
</style>
