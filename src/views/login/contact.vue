<template>
  <div class="page-wrap">
    <login-header style="position: fixed"></login-header>
      <div class="head_box">
      <div class="banner-box"></div>
    </div>

      <div class="content-wrap">
        <div class="section-title">商务联系</div>
        <div class="section-subtitle">
          商务排序不分先后，每个商务服务都非常到位且专业！
        </div>

        <div class="cards-wrap">
          <div class="cards-grid" v-if="mail.length">
            <div class="contact-card" v-for="(item, idx) in mail" :key="idx">
              <div class="card-head">
                <span class="card-dot"></span>
                <span class="card-name">{{ item.name }}</span>
              </div>
              <div class="card-body">
                <div class="card-qq">{{ item.name }}：{{ item.qq }}</div>
                <a
                  class="qq-btn"
                  :href="'tencent://message/?uin=' + item.qq + '&Site=xxx&Menu=yes'"
                >
                  QQ交谈
                </a>
              </div>
            </div>
          </div>

          <div class="empty-box" v-else>
            暂无客服信息
          </div>
        </div>
      </div>

      <login-footer></login-footer>
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
  computed: {
    enterpriseQq() {
      return this.mail.length ? this.mail[0].qq : '';
    }
  },
  methods: {
    getinfo() {
      this.$api.login
        .contactinfo()
        .then((data) => {
          if (data.status === 200) {
            this.address = data.data.companyAddress;
            this.phone = data.data.servicePhone;

            let qqList = [];
            try {
              qqList = JSON.parse(data.data.serviceQq || '[]');
            } catch (e) {
              qqList = [];
            }

            this.mail = qqList.filter((item) => item.type === 0);
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
.contact-page {
  min-height: 100vh;
  background: #f5f7fb;
}

.head_box {
    background: url(../../assets/img/about.jpg) center center no-repeat;
    height: 500px;
    position: relative;
    /* padding-top: 126px; */
    /* background: #fff; */
}

.banner-box {
    position: relative;
    width: 100%;
    max-width: 1300px;
    margin: 0 auto;
    height: 722px;
}

.main-wrap {
  position: relative;
  top: 126px;
}

.banner-wrap {
  width: 1300px;
  margin: 0 auto;
}

.banner {
  height: 280px;
  background-image: url('../../assets/img/about.jpg');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
}

.content-wrap {
  width: 1300px;
  margin: 0 auto;
  padding: 24px 0 120px;
}

.section-title {
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  color: #1f8fff;
  line-height: 1;
  margin-top: 20px;
}

.section-subtitle {
  text-align: center;
  font-size: 15px;
  color: #666;
  margin-top: 12px;
  margin-bottom: 34px;
}

.cards-wrap {
  display: flex;
  justify-content: center;
}

.cards-grid {
  width: 1000px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.contact-card {
  position: relative;
  background: #fff;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 14px 34px rgba(34, 97, 176, 0.14);
}

.card-head {
  position: relative;
  height: 78px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(180deg, #3799ef 0%, #2c8fec 100%);
  z-index: 1;
}

/* 中间那层：比标题层更浅一点，形成层次 */
.card-head::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 9px;
  height: 20px;
  background: linear-gradient(180deg, #55b4ff 0%, #40a8fb 100%);
  opacity: 0.65;
  z-index: 0;
}

/* 底部白色斜切凸起层 */
.card-head::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 22px;
  background: #fff;
  clip-path: polygon(0 55%, 100% 18%, 100% 100%, 0 100%);
  z-index: 0;
}

.card-dot {
  position: relative;
  z-index: 2;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  margin-right: 10px;
  background: #ffffff;
  box-shadow: 0 0 0 4px rgba(255, 255, 255, 0.2);
}

.card-dot::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #2f94ef;
  transform: translate(-50%, -50%);
}

.card-name {
  position: relative;
  z-index: 2;
  text-shadow: 0 1px 1px rgba(0, 0, 0, 0.08);
}

.card-body {
  position: relative;
  z-index: 1;
  padding: 30px 18px 24px;
  text-align: center;
}

.card-qq {
  font-size: 16px;
  color: #333;
  line-height: 30px;
  min-height: 30px;
  margin-bottom: 28px;
  word-break: break-all;
}

.qq-btn {
  display: inline-block;
  width: 184px;
  height: 42px;
  line-height: 42px;
  border-radius: 24px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(90deg, #2990f4 0%, #33a3ff 100%);
  box-shadow: 0 8px 18px rgba(43, 142, 243, 0.28);
}

.qq-btn:hover {
  opacity: 0.92;
}

.second-title {
  margin-top: 34px;
}

.enterprise-wrap {
  display: flex;
  justify-content: center;
  margin-top: 16px;
}

.enterprise-box {
  width: 720px;
  height: 220px;
  background-image: url('../../assets/img/contact2.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.enterprise-box a,
.enterprise-box span {
  font-size: 32px;
  font-weight: 700;
  color: #111;
  text-decoration: none;
}

.empty-box {
  width: 580px;
  min-height: 120px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 10px 24px rgba(34, 97, 176, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 14px;
}

@media (max-width: 1360px) {
  .banner-wrap,
  .content-wrap {
    width: 94%;
  }

  .cards-grid {
    width: 100%;
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .empty-box {
    width: 100%;
  }
}

@media (max-width: 1100px) {
  .cards-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
  }
}

@media (max-width: 768px) {
  .main-wrap {
    top: 96px;
  }

  .banner {
    height: 160px;
  }

  .content-wrap {
    padding-bottom: 80px;
  }

  .section-title {
    font-size: 24px;
  }

  .section-subtitle {
    font-size: 13px;
    padding: 0 12px;
    line-height: 22px;
  }

  .cards-grid {
    grid-template-columns: 1fr;
  }

  .card-head {
    height: 64px;
    font-size: 17px;
  }

  .card-qq {
    font-size: 15px;
  }

  .qq-btn {
    width: 150px;
    font-size: 15px;
  }
}
</style>
