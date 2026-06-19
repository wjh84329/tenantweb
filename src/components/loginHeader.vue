<template>
  <div class="login-site-header">
    <div class="header-inner">
      <router-link class="brand" to="/login/loginHome">
        <img src="../assets/img/logo2.png" class="logo" />
      </router-link>
      <ul class="menu">
        <router-link tag="li" to="/login/loginHome" :class="{ on: $route.path.indexOf('loginHome') > 0 }">
          官方首页
        </router-link>
        <router-link tag="li" to="/login/loginTool" :class="{ on: $route.path.indexOf('loginTool') > 0 }">
          开区助手
        </router-link>
        <router-link tag="li" to="/login/logincontact" :class="{ on: $route.path.indexOf('logincontact') > 0 }">
          联系我们
        </router-link>
      </ul>
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
.login-site-header {
  --hero-content-width: 1300px;
  --hero-login-column-width: 520px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999;
  background: rgba(255, 255, 255, 0.94);
  border-bottom: 1px solid #e5edf8;
  box-shadow: 0 10px 28px rgba(27, 83, 154, 0.06);
  backdrop-filter: blur(12px);
}

.header-inner {
  width: min(var(--hero-content-width), calc(100% - 48px));
  height: 88px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1fr) var(--hero-login-column-width);
  align-items: center;
  column-gap: 40px;
}

.brand {
  display: inline-flex;
  align-items: center;
  justify-self: start;
  text-decoration: none;
}

.logo {
  width: 166px;
  height: 50px;
  object-fit: contain;
  display: block;
}

.menu {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  width: 100%;
  margin-left: 0;
  padding: 0;
  margin-top: 0;
  margin-right: 0;
  margin-bottom: 0;
  list-style: none;
  flex: 1;
}

.menu li {
  position: relative;
  flex: 1 1 0;
  height: 88px;
  line-height: 88px;
  text-align: center;
  color: #25324a;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  border-radius: 0;
  transition: color 0.2s ease, background 0.2s ease;
}

.menu li:hover {
  color: #126de8;
  background: transparent;
}

.menu li.on {
  color: #126de8;
  background: transparent;
}

.menu li.on::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  height: 3px;
  width: 78px;
  border-radius: 2px;
  background: #126de8;
  transform: translateX(-50%);
}

@media (max-width: 900px) {
  .header-inner {
    width: calc(100% - 28px);
    display: flex;
    gap: 18px;
    height: 76px;
  }

  .menu {
    width: auto;
    margin-left: 0;
    justify-content: flex-end;
  }

  .menu li {
    min-width: 74px;
    flex: 0 0 auto;
    font-size: 14px;
    height: 76px;
    line-height: 76px;
  }
}
</style>
