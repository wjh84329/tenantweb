<template>
  <div :class="{ 'header-top': true, fixed: height > 10 ? true : false }">
    <site-logo variant="logo" class="logo" alt="网站logo" />
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
      <img
        src="../assets/img/7e2823e5728c599aeaaa54c7242404ba.png"
        class="tel"
      />
      <span>7*24小时服务热线：{{ servicePhone }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      webName: '', // 网站信息
      copyright: '', // 版权
      servicePhone: '',
      height: 0
    };
  },
  methods: {
    windowScroll() {
      this.height = document.getElementsByClassName('contentBox')[0].scrollTop;
    },
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
  },
  created() {
    this.footerInfo();
    window.addEventListener('scroll', this.windowScroll, true);
  }
};
</script>

<style scoped>
.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 15px;
  width: 100%;
  box-sizing: border-box;
}
.fixed {
  position: fixed;
  background-color: rgba(255, 255, 255, 1);
  z-index: 9999;
}
.header-top .menu {
  display: flex;
}

.header-top .menu li {
  color: #000;
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
  color: #000;
  font-size: 16px;
}

.header-top .contanct .tel {
  margin-right: 10px;
}
</style>
