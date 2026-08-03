<!--
 * @Description: 代理管理主入口
 * @Author: gao shuai
 * @Date: 2020-06-13 11:32:01
 * @LastEditTime: 2020-08-17 14:59:48
 * @LastEditors: gao shuai
-->
<template>
  <div class="main">
    <div class="header" :style="headerStyle">
      <div class="headbox clearfix" :style="headerStyle" style="display: flex;">
        <div class="logo"><site-logo variant="logo3" style="width: 154px;height: 40px;" alt="网站logo" /></div>
        <ul class="navbox clearfix" style="width: 75%;">
          <!-- <li :class="{ active: activeNav === '/main/home' }"
            :style="activeNav === '/main/home' ? activeNavStyle : (hoverNav === '/main/home' ? hoverNavStyle : null)">
            <span class="icon1" @click="refresh('/main/home')">首页</span>
          </li>
          <li :class="{ active: activeNav === '/main/Ordermanagement' }"
            :style="activeNav === '/main/Ordermanagement' ? activeNavStyle : (hoverNav === '/main/Ordermanagement' ? hoverNavStyle : null)">
            <span class="icon1" @click="refresh('/main/Ordermanagement')">订单管理</span>
          </li>
          <li :class="{ active: activeNav === '/main/Zoningmanagement' }"
            :style="activeNav === '/main/Zoningmanagement' ? activeNavStyle : (hoverNav === '/main/Zoningmanagement' ? hoverNavStyle : null)">
            <span class="icon1" @click="refresh('/main/Zoningmanagement')">分区管理</span>
          </li>
          <li :class="{ active: activeNav === '/main/DA' }"
            :style="activeNav === '/main/DA' ? activeNavStyle : (hoverNav === '/main/DA' ? hoverNavStyle : null)">
            <span class="icon1" @click="refresh('/main/DA')">数据分析</span>
          </li>
          <li :class="{ active: activeNav === '/personal' }"
            :style="activeNav === '/personal' ? activeNavStyle : (hoverNav === '/personal' ? hoverNavStyle : null)"
            @click="refresh('/personal')">
            <span>账户管理</span>
          </li> -->
          <li :class="{ active: activeNav === '/agentsystem' }"
            :style="activeNav === '/agentsystem' ? activeNavStyle : (hoverNav === '/agentsystem' ? hoverNavStyle : null)">
            <span class="icon1" @click="refresh('/agentsystem')">代理系统</span>
          </li>
          <li :class="{ active: activeNav === '/main/hom' }"
            :style="activeNav === '/main/hom' ? activeNavStyle : (hoverNav === '/main/hom' ? hoverNavStyle : null)"
            @click="refresh('/main/home')">
            <span class="icon1">返回平台</span>
          </li>
        </ul>
        <div class="count" style="width: 6%;">{{ nickName }}</div>
      </div>
    </div>
    <div class="container">
      <div class="midleContaner" style="background: #f2f2f2;width: 1280px;">
        <div class="slider" :style="sliderStyle">
          <div class="top_tit" :style="headerStyle">代理管理</div>
          <ul>
            <!-- <li :style="sliderStyle" style="margin-top: 10px;">
              <span class="icon1" @click="refresh('/agentsystem/setting')">网站设置</span>
            </li> -->
            <li :style="sliderStyle">
              <span class="icon2" @click="refresh('/agentsystem/merchant')">下属商户</span>
            </li>
            <li :style="sliderStyle">
              <span class="icon3" @click="refresh('/agentsystem/agentOrder')">代理订单</span>
            </li>
            <li :style="sliderStyle">
              <span class="icon4" @click="refresh('/agentsystem/deductedlog')">充值记录</span>
            </li>
            <li :style="sliderStyle">
              <span class="icon5" @click="refresh('/agentsystem/userGroup')">用户分组</span>
            </li>
            <li :style="sliderStyle">
              <span class="icon6" @click="refresh('/agentsystem/Statistics')">数据统计</span>
            </li>
            <li :style="sliderStyle">
              <span class="icon7" @click="refresh('/agentsystem/agentManagement')">分区管理</span>
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
export default {
  name: 'agentSystem',
  inject: ['reload'],
  data() {
    return {
      activeNav: '/agentsystem', // 默认选中首页
      skinNum: Number(localStorage.getItem('skinNum')) || 0,
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
        .then((data) => {
          this.$store.commit('saveuuid', data.data.uuid);
          this.$store.commit('saveType', data.data.type);
          this.$store.commit('changeNickName', data.data.userName);
          this.$store.commit('changeId', data.data.id);
        })
        .catch((err) => {
          this.$messageError(err.message);
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
    background: #63aafa;

    .headbox {
      width: 1280px;
      max-width: 100%;
      margin: 0 auto;
      height: 60px;

      .logo {
        flex: 0 0 178px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 178px;
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

      // box-shadow: 0 0 10px rgba(0, 0, 0, .25);
      .slider {
        position: absolute;
        width: 178px;
        // background: #f4f4f4;
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
          // background: #fff url(../../assets/images/line_big.png) no-repeat 0 center;
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
            // ...existing code...
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
                background: url(../../assets/images/shezhi.png) no-repeat 39px center;
                background-size: auto 18px;
              }

              &.icon2 {
                background: url(../../assets/images/xiashu.png) no-repeat 39px center;
                background-size: auto 18px;
              }

              &.icon3 {
                background: url(../../assets/images/dingdan.png) no-repeat 40px center;
                background-size: auto 18px;
              }

              &.icon4 {
                background: url(../../assets/images/dikou.png) no-repeat 39px center;
                background-size: auto 18px;
              }

              &.icon5 {
                background: url(../../assets/images/fenzu.png) no-repeat 40px center;
                background-size: auto 18px;
              }

              &.icon6 {
                background: url(../../assets/images/tongji.png) no-repeat 40px center;
                background-size: auto 18px;
              }

              &.icon7 {
                background: url(../../assets/images/fenqu.png) no-repeat 40px center;
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
