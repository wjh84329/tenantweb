<template>
    <div class="container">
        <login-header></login-header>
        <div style="position: relative;top: 126px;">
            <div class="banner">
                <div class="banner-txt">
                    <img src="../../assets/img/abouttitle.png" />
                </div>
            </div>
            <div class="wrap">
                <div class="navtitle">联系我们</div>
                <div class="about">
                    <p>
                        <img src="../../assets/img/dou1.png" class="img1" />
                        多渠道兑换平台网络兑换平台稳定运营九年，深受广大GM客户欢迎，我们致力于为客户提供安全、稳定、快捷的支付结算方案！坚决杜绝黑单掉单，长期稳定运营，支持微信、支付宝、各大银行秒到帐，满50元即可随时结算！
                        <img src="../../assets/img/dou2.png" class="img2" />
                    </p>
                </div>
            </div>
            <div class="wrap">
                <div class="navtitle blue">7*24在线客服</div>
            </div>
            <div class="wrap">
                <div class="kefu">
                    <div class="kefu_box">
                        <div class="kefuinfo" v-for="(item, idx) in mail" :key="idx">
                            <img src="../../assets/newLogin/icon8.png" alt="">
                            <div class="kefu_detail">
                                <div class="kefu-name">{{ item.name }}:{{ item.qq }}</div>
                                <!-- <div class="kefu-number">{{ item.desc }}</div> -->
                                <div style="height: 17px;margin-top: 5px;margin-bottom: 5px;">
                                    <a :href="`tencent://message/?uin=${item.qq}&Site=xxx&Menu=yes`">
                                        <img style="width: 74px;height: 23px;" src="../../assets/newLogin/QQ.gif"
                                            alt="">
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <div class="wrap">
                <div class="navtitle blue">7*24小时企业QQ</div>
            </div>
            <div class="wrap">
                <div class="qiyekefu">
                    <div class="qq"><a target="_blank"
                            :href="`https://wpa.qq.com/msgrd?v=3&amp;uin=${mail[0].qq}&amp;Site=&amp;Menu=yes`">{{mail[0].qq}}</a>
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
export default {
  components: {
    loginFooter,
    loginHeader
  },
  data() {
    return {
      address: '',
      phone: '',
      mail: []
    };
  },
  methods: {
    getinfo() {
      this.$api.login
        .contactinfo()
        .then((data) => {
          if (data.status === 200) {
            this.address = data.data.companyAddress;
            this.phone = data.data.servicePhone;
            this.mail = JSON.parse(data.data.serviceQq).filter((item) => {
              return item.type === 0;
            });
            console.log(this.mail);
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    }
  },
  created() {
    this.getinfo();
  }
};
</script>

<style scoped>
.container {}

.banner {
    background-image: url('../../assets/img/contactbanner.png');
    background-size: 100% 100%;
    height: 280px;
    display: flex;
    align-items: center;
}

.banner-txt {
    background-color: rgba(255, 255, 255, 0.3);
    height: 16px;
    display: flex;
    align-items: center;
    width: 600px;
    justify-content: center;
    padding-right: 30px;
}

.wrap {
    width: 1300px;
    margin: 0 auto;
}

.navtitle {
    margin: 50px 0;
    font-size: 24px;
    font-weight: bold;
}

.navtitle.blue {
    color: #0096ff;
}

.about {
    background-color: #F4F4F4;
    height: 210px;
    line-height: 36px;
    padding: 40px 60px 0 60px;
    box-sizing: content-box;
}

.about p {
    position: relative;
}

.about .img1 {
    margin-right: 10px;
}

.about .img2 {
    position: absolute;
    margin-left: 10px;
}

.kefu {
    background-image: url('../../assets/img/contact1.png');
    background-size: 100% 100%;
    height: 414px;
    display: flex;
    align-items: center;

}

.kefu_box {
    max-width: 59%;
    /* margin: 0 auto; */
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: space-flex-start !important;
    padding-left: 95px;
}

.kefuinfo {
    background: #fff;
    border-radius: 8px;
    padding: 4px;
    display: flex;
    gap: 12px;
    align-items: center;
    flex: 1 1 30%;
    max-width: 246px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.04);
}

.kefuinfo img {
    width: 48px;
    height: 60px;
    object-fit: contain;
}

.kefu_detail .kefu-name {
    font-weight: 700;
    font-size: 16px;
    line-height: 18px;
}

.kefu_detail .kefu-number {
    color: #666;
    font-size: 16px;
    line-height: 18px;
    letter-spacing: 1px;
}

.kefu .kefulist {
    height: 220px;
    width: 700px;
    padding: 15px;
    box-sizing: content-box;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 20px 0 0 20px;
}

.kefu .kefulist .item {
    width: 50%;

}

.kefu .kefulist .item .info {
    display: flex;
    align-items: center;

}

.qiyekefu {
    background-image: url('../../assets/img/contact2.png');
    background-size: 100% 100%;
    height: 414px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 150px;
}

.qiyekefu .qq {
    height: 100px;
}

.qiyekefu .qq a {
    text-decoration: none;
    color: #000
}
</style>
