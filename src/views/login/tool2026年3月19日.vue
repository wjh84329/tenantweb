<template>
  <div>
    <login-header></login-header>
    <div style="position: relative;top: 126px;">
      <div class="banner">
      <div class="banner-txt">
        <!-- <img src="../../assets/img/kaiqutitle.png" /> -->
         <span style="font-size: 48px;">开区助手</span>
      </div>
      <div class="banner-right">
        <!-- <img src="../../assets/img/downtxt.png" style="margin-bottom:30px;" /> -->
        <!-- <a :href="downurl" target="_blank"><img src="../../assets/img/down.png" /></a> -->
      </div>
    </div>
    <div class="youshi-box">
      <div class="wrap">
        <div class="navtitle one">
          <div class="small">CORE ADVANTAGES</div>
          <div class="title">服务能力</div>
          <div class="line"></div>
        </div>
        <div class="youshilist">
          <div class="item">
            <img src="../../assets/img/kaiquicon1.png" />
            <div class="title">定时开区合区任务</div>
            <div class="desc">
              兼容所有32/64位各种系统，绿色安全，不破坏GM服务器
            </div>
          </div>
          <div class="item">
            <img src="../../assets/img/kaiquicon2.png" />
            <div class="title">智能同步远程列表</div>
            <div class="desc">智能同步所有列表日期及固定列表模式。</div>
          </div>
          <div class="item">
            <img src="../../assets/img/kaiquicon3.png" />
            <div class="title">充值保留自动补发</div>
            <div class="desc">
              玩家测试区充值正式区自动补发及可任意设置补发比例支持双货币。
            </div>
          </div>
          <div class="item">
            <img src="../../assets/img/kaiquicon4.png" />
            <div class="title">克隆一周任务计划</div>
            <div class="desc">一次性可设置一周任务计划，实现智能托管。</div>
          </div>
          <div class="item">
            <img src="../../assets/img/kaiquicon5.png" />
            <div class="title">开区信息短信通知</div>
            <div class="desc">开区信息实时短信通知，GM可实时了解开区情况。</div>
          </div>
        </div>
        <div class="navtitle">
          <div class="small">FUNCTION INTRODUCTION</div>
          <div class="title">功能介绍</div>
          <div class="line"></div>
        </div>
      </div>
    </div>
    <div class="gongneng">
      <div class="item bg1">
        <img src="../../assets/img/kaiqui1.png" />
        <div class="title">一键克隆</div>
        <div class="desc">
          一键克隆版本<br />
          一键添加任务
        </div>
      </div>
      <div class="item bg2">
        <img src="../../assets/img/kaiqui2.png" />
        <div class="title">一键设置</div>
        <div class="desc">
          一键添加支付平台，<br />

          自动充值回放补发
        </div>
      </div>
      <div class="item bg3">
        <img src="../../assets/img/kaiqui3.png" />
        <div class="title">智能开区合区</div>
        <div class="desc">
          一键添加定时合区任务<br />

          自动改列表启动
        </div>
      </div>
      <div class="item bg4">
        <img src="../../assets/img/kaiqui4.png" />
        <div class="title">智能服务</div>
        <div class="desc">
          自动修改FTP列表<br />
          阿里OSS列表
        </div>
      </div>
      <div class="item bg5">
        <img src="../../assets/img/kaiqui5.png" />
        <div class="title">短信通知</div>
        <div class="desc">
          全部运行状态<br />
          可选择手机短信通知
        </div>
      </div>
    </div>
    <div class="contactus-box">
      <div class="wrap">
        <div class="navtitle one">
          <div class="small">CONTACT US</div>
          <div class="title">联系我们</div>
          <div class="line"></div>
        </div>
        <div class="contactus">
          <div class="bluebox">
            <p>QQ</p>
            <p>
              <a target="_blank"
                href="https://wpa.qq.com/msgrd?v=3&amp;uin=887572&amp;Site=&amp;Menu=yes">887572</a>
            </p>
          </div>
          <div class="bluebox">
            <p>QQ</p>
            <p>887572</p>
          </div>
        </div>
      </div>
    </div>
    <login-footer></login-footer>
    </div>
  </div>
</template>

<script>
import loginFooter from '../../components/loginFooter';
import loginHeader from '../../components/loginHeader';
import { netUrl } from '../../assets/js/version';
export default {
  components: {
    loginFooter,
    loginHeader
  },
  data() {
    return {
      list: [],
      downurl: netUrl + '/api/Upload/ShowFileNew?name=Wgzs'
    };
  },
  methods: {
    getlist() {
      this.$api.login
        .rechargeList()
        .then(data => {
          if (data.status === 200) {
            this.list = data.data;
          }
        })
        .catch(err => {
          this.$messageError(err.message);
        });
    }
  },
  created() {
    this.getlist();
  }
};
</script>

<style scoped>
.banner {
  background-image: url('../../assets/img/kaiqubg2.png');
  background-size: 100% 100%;
  height: 280px;
  display: flex;
  align-items: center;
}

.banner-txt {
  background-color: rgba(255, 255, 255, 0.3);
  height: 160px;
  display: flex;
  align-items: center;
  width: 60vh;
  justify-content: flex-end;
  padding-right: 30px;
}

.banner-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: 30vh;
}

.wrap {
  width: 1300px;
  margin: 0 auto;
}

.youshi-box {
  height: 900px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.navtitle {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.navtitle.one {
  margin-bottom: 75px;
}

.navtitle .title {
  font-size: 36px;
  margin-bottom: 15px;
  margin-top: 10px;
}

.navtitle .small {
  font-size: 14px;
  letter-spacing: 2px;
}

.navtitle .line {
  height: 3px;
  width: 30px;
  background-color: #0195ff;
  border-radius: 2px;
}

.youshilist {
  display: flex;
  justify-content: space-between;
  margin-bottom: 160px;
}

.youshilist .item {
  width: 18%;
  box-sizing: border-box;
  text-align: center;
}

.youshilist .item .title {
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  margin: 48px 0 27px 0;
}

.youshilist .item .desc {
  font-size: 14px;
  line-height: 24px;
  text-align: left;
}

.gongneng {
  display: flex;
  justify-content: space-between;
}

.gongneng .item {
  width: 20%;
  box-sizing: border-box;
  text-align: center;
  height: 540px;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.gongneng .item .title {
  font-weight: bold;
  font-size: 24px;
  margin: 48px 0 27px 0;
}

.gongneng .item .desc {
  font-size: 14px;
  line-height: 24px;
}

.gongneng .item.bg1 {
  background-image: url('../../assets/img/kaiquimg1.png');
  background-size: 100% 100%;
}

.gongneng .item.bg2 {
  background-image: url('../../assets/img/kaiquimg2.png');
  background-size: 100% 100%;
}

.gongneng .item.bg3 {
  background-image: url('../../assets/img/kaiquimg3.png');
  background-size: 100% 100%;
}

.gongneng .item.bg4 {
  background-image: url('../../assets/img/kaiquimg4.png');
  background-size: 100% 100%;
}

.gongneng .item.bg5 {
  background-image: url('../../assets/img/kaiquimg5.png');
  background-size: 100% 100%;
}

.contactus-box {
  padding: 75px 0 100px 0;
}

.contactus {
  background-image: url('../../assets/img/contactus.png');
  background-size: 100% 100%;
  height: 412px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.contactus .bluebox {
  background-image: url('../../assets/img/conbg.png');
  width: 376px;
  height: 155px;
  text-align: center;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.contactus .bluebox p:last-child {
  font-size: 30px;
  margin-top: 15px;
}

.contactus .bluebox a {
  color: #fff;
  text-decoration: none;
}
</style>
