<template>
    <div>
        <div>
            <div class="navbar-fixed-top" id="header">
                <div style="background-color:#c52238; width:100%; height:30px; color:#fff; line-height:30px;">
                    <div class="container">
                        <div class="col-md-12" style="text-align:right;">
                            多渠道兑换平台支付&nbsp;&nbsp; | &nbsp;&nbsp; 7x24服务热线：{{ servicePhone }}
                        </div>
                    </div>
                </div>
                <div class="container">
                    <div class="row">
                        <div class="navbar-default">
                            <div class="col-lg-2 col-md-2 col-sm-3 col-xs-7 left">
                                <a href="">
                                    <site-logo variant="legacy" alt="多渠道兑换平台支付"
                                        style="margin-top: 10px; float: left;" />
                                </a>
                            </div>
                            <div class="col-lg-10 col-md-10 col-sm-9 col-xs-12 right"
                                style="_float:left;_position: absolute;_left: -520px;_top: -10px;">
                                <button type="button" class="navbar-toggle" data-toggle="collapse"
                                    data-target="#nav-menu" style="position: absolute;left: 290px;top: -65px;">
                                    <span class="icon-bar"></span>
                                    <span class="icon-bar"></span>
                                    <span class="icon-bar"></span>
                                    <span class="icon-bar"></span>
                                </button>
                                <div class="collapse navbar-collapse" id="nav-menu">
                                    <ul class="nav navbar-nav navbar-right" style="margin-top: 20px;">
                                        <li style="_float:left" @click="$router.push({ name: 'DashboardLogin' })"><a
                                                style="text-align: center;padding: 10px 0;">首页</a></li>
                                        <li style="_float:left" @click="$router.push({ name: 'DashboardRegister' })"><a
                                                style="text-align: center;padding: 10px 0;">用户注册</a></li>
                                        <li style="_float:left" @click="$router.push({ name: 'rate' })"><a
                                                style="text-align: center;padding: 10px 0;">资费标准</a></li>
                                        <li style="_float:left" @click="$router.push({ name: 'dashboardTools' })"><a
                                                style="text-align: center;padding: 10px 0;">开区助手</a></li>
                                        <li style="_float:left" @click="$router.push({ name: 'contactus' })"><a
                                                style="text-align: center;padding: 10px 0;">联系我们</a></li>
                                    </ul>
                                    <i class="icon-colse"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <router-view></router-view>
        <footer>
            <div id="footer" style="margin-top: 50px; background-color:#f1f2f2;">
                <div class="footer-cons">
                    <p style="cursor: pointer;"><a @click="() => $router.push({ name: 'DashboardLogin' })"
                            title="传奇充值平台">首页</a>&nbsp; | <a @click="() => $router.push({ name: 'contactus' })"
                            title="传奇支付平台">&nbsp;联系我们&nbsp;</a> | <a @click="() => $router.push({ name: 'rate' })"
                            title="传奇私服支付平台">资费标准&nbsp;</a> |
                        <a @click="() => $router.push({ name: 'DashboardLogin' })" title="传奇sf支付平台">用户登陆</a> | <a
                            @click="() => $router.push({ name: 'DashboardRegister' })"
                            title="传世支付平台">&nbsp;用户注册&nbsp;</a>
                    </p><br>
                    <p>{{ copyright }} Copyright 2021-2030 All Rights Reserved </p>
                    <p>本站严禁一切钓鱼、色情、赌博、私彩、套现及违反国家法律法规等使用</p>

                </div>
            </div>
        </footer>
    </div>
</template>

<script>
import Mgr from '../../assets/js/SecurityService';
import router from '../../router';
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
  },
  // eslint-disable-next-line vue/no-unused-components
  components: { router }
};
</script>

<style scoped>
@import url(../../assets/themes/css/bootstrap.min.css);
@import url(../../assets/themes/css/animate.min.css);
@import url(../../assets/themes/css/style.min.css);
@import url(../../assets/themes/js/layui/css/layui.css);
</style>
