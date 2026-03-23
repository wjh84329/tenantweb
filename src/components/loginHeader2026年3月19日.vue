<template>
  <div :class="{ 'header-top': true, fixed: height > 10 ? true : false }">
    <img src="../assets/img/logo.png" class="logo" />
    <ul class="menu">
      <router-link
        tag="li"
        to="/login/loginHome"
        :class="{ on: $route.path.indexOf('loginHome') > 0 }"
      >
        官方首页
        <div class="after"></div>
      </router-link>
      <router-link
        tag="li"
        to="/login/loginRecharge"
        :class="{ on: $route.path.indexOf('loginRecharge') > 0 }"
      >
        新闻公告
        <div class="after"></div>
      </router-link>
      <router-link
        tag="li"
        to="/login/loginTool"
        :class="{ on: $route.path.indexOf('loginTool') > 0 }"
      >
        开区助手
        <div class="after"></div>
      </router-link>
      <router-link
        tag="li"
        to="/login/logincontact"
        :class="{ on: $route.path.indexOf('logincontact') > 0 }"
      >
        联系我们
        <div class="after"></div>
      </router-link>
    </ul>
    <div class="contanct">
      <!-- <div class="btn1" @click="singin">
        登录
      </div> -->
      <!-- <div class="btn2" @click="$router.push('/login/loginregister')">
        注册
      </div> -->
      <img src="../assets/img/tel.png" class="tel" />
      <span>7*24小时服务热线：{{ servicePhone }}</span>
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
      this.height = document.getElementsByClassName('contentBox')[0].scrollTop;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 0 0;
  padding: 15px 0;
  width: 100%;
}
.fixed {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
}
.header-top .menu {
  display: flex;
}

.header-top .menu li {
  color: #fff;
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
  color: #fff;
  font-size: 16px;
  margin-right: 30px;
}

.header-top .contanct .tel {
  margin-right: 10px;
}

.header-top .contanct .btn1 {
  background-color: #0096ff;
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
