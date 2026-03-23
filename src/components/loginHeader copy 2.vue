<template>
  <div :class="{ 'header-top': true, fixed: true }">
    <div  class="contanct1">
      <span class="tel">七星传奇游戏技术服务平台   |   7x24服务客服电话:{{ servicePhone }}</span>
    </div>
    <div class="contanct">
      <img src="../assets/img/logo3.png" style="width: 166px;height: 50px;" class="logo" />
      <ul class="menu">
        <router-link tag="li" to="/login/loginHome" :class="{ on: $route.path.indexOf('loginHome') > 0 }">
          官方首页
          <div class="after"></div>
        </router-link>
        <!-- <router-link tag="li" to="/login/loginRecharge" :class="{ on: $route.path.indexOf('loginRecharge') > 0 }">
          新闻公告
          <div class="after"></div>
        </router-link> -->
        <router-link tag="li" to="/login/loginregister" :class="{ on: $route.path.indexOf('loginregister') > 0 }">
          商户注册
          <div class="after"></div>
        </router-link>
        <router-link tag="li" to="/login/loginTool" :class="{ on: $route.path.indexOf('loginTool') > 0 }">
          开区助手
          <div class="after"></div>
        </router-link>
        <router-link tag="li" to="/login/brows" :class="{ on: $route.path.indexOf('brows') > 0 }">
          服务介绍
          <div class="after"></div>
        </router-link>
        <router-link tag="li" to="/login/logincontact" :class="{ on: $route.path.indexOf('logincontact') > 0 }">
          联系我们
          <div class="after"></div>
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import Mgr from '../assets/js/SecurityService';
export default {
  data() {
    return {
      webName: '', // 网站信息
      copyright: '', // 版权
      servicePhone: '',
      height: 0
    };
  },
  mounted() {
    window.addEventListener('scroll', this.windowScroll, true);
    this.footerInfo();
    // let mgr = new Mgr();
    // mgr.signIn();
  },
  methods: {
    windowScroll() {
      const el = document.getElementsByClassName('contentBox')[0];
      if (el) {
        this.height = el.scrollTop;
      }
    },
    singin() {
      let mgr = new Mgr();
      mgr.signIn();
      // mgr.popupLayer();
    },
    // 获取注册页面的底部信息
    footerInfo() {
      this.$api.login
        .footerInfo()
        .then(data => {
          if (data.status === 200) {
            this.webName = data.data.webName;
            this.copyright = data.data.copyright;
            this.servicePhone = data.data.servicePhone;
          }
        })
        .catch(err => {
          this.$messageError(err.message);
        });
    }
  }
};
</script>

<style scoped>
.header-top {
  /* display: flex; */
  /* justify-content: center; */
  /* align-items: center; */
  margin: 0 0 0 0;
  /* padding: 15px 0; */
  width: 100%;
}

.fixed {
  position: fixed;
  /* background-color: rgba(0, 0, 0, 0.5); */
  background-color: white;
  z-index: 9999;
}

.header-top .menu {
  display: flex;
  margin-left: 50px;
}

.header-top .menu li {
  /* color: #fff; */
  color: #333;
  cursor: pointer;
  margin: 0 40px;
}

.header-top .menu li:hover {
  color: #0195ff;
}

.header-top .menu li.on {
  color: #0195ff;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.header-top .menu li.on .after {
  height: 3px;
  width: 30px;
  background-color: #0195ff;
  margin-top: 10px;
}

.header-top .contanct {
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 18px;
  /* margin-right: 30px; */
  padding: 15px 0;
  height: 66px;
}
.header-top .contanct1 {
  background-color: #333;
  color: #fff;
  font-size: 16px;
  text-align: right;
  /* padding: 0 360px; */
  padding-right: 15%;
  line-height: 30px;
  font-size: 14px;
  /* margin-right: 30px; */
}

.header-top .contanct .tel {
  margin-right: 10px;
}

.header-top .contanct .btn1 {
  background-color: #0096ff;
  color: #333;
  border-radius: 20px;
  border: #fff 2px solid;
  margin-right: 20px;
  width: 80px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
}

.header-top .contanct .btn2 {
  background-color: #0fb203;
  color: #fff;
  border-radius: 20px;
  border: #fff 2px solid;
  margin-right: 20px;
  width: 80px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  cursor: pointer;
}
</style>
