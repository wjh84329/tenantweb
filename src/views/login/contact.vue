<template>
  <div class="contact-shell">
    <login-header></login-header>

    <main class="contact-main">
      <section class="contact-hero">
        <div class="contact-hero-copy">
          <h1>商务联系</h1>
          <p>专业团队为您提供高效、贴心的服务与支持<br />快速响应每一个问题，助力您的业务稳健增长</p>
        </div>
        <img class="contact-visual-img" src="../../assets/newUi/contact-hero-visual.png" alt="" />
      </section>

      <section class="contact-content">
        <aside class="contact-info-panel">
          <h2>联系信息</h2>
          <div class="contact-info-row">
            <div class="contact-info-icon time"></div>
            <div>
              <span>服务时间</span>
              <strong>周一至周日 00:00 - 24:00</strong>
              <p>全年无休</p>
            </div>
          </div>
        </aside>

        <div class="contact-service-panel">
          <div class="contact-section-head">
            <h2>商务客服</h2>
            <p>您可以直接联系在线客服，或选择合适的同事为您服务。</p>
          </div>

          <div class="contact-grid" v-if="contactCards.length">
            <div class="contact-card" v-for="item in contactCards" :key="item.qq">
              <img class="contact-avatar" :src="item.avatar" :alt="item.name" />
              <div class="contact-info">
                <h3>{{ item.name }}</h3>
                <p>QQ：{{ item.qq }}</p>
                <em>{{ item.label }}</em>
              </div>
              <a
                class="contact-btn"
                :href="'https://wpa.qq.com/msgrd?v=3&uin=' + item.qq + '&site=qq&menu=yes'"
                target="_blank"
                rel="noopener noreferrer"
                @click.prevent="openQqChat(item.qq)"
              >
                <img src="../../assets/newUi/qq-chat-icon.svg" alt="" />
                QQ交谈
              </a>
            </div>
          </div>

          <div class="contact-empty" v-else>
            暂无可用的商务客服
          </div>
        </div>
      </section>
    </main>

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
      mail: []
    };
  },
  computed: {
    contactCards() {
      const avatars = [
        require('../../assets/newUi/contact-avatar-1.png'),
        require('../../assets/newUi/contact-avatar-2.png'),
        require('../../assets/newUi/contact-avatar-3.png'),
        require('../../assets/newUi/contact-avatar-4.png')
      ];
      const labels = [
        '商务合作 ｜ 平台入驻',
        '产品咨询 ｜ 功能对接',
        '技术支持 ｜ 接口对接',
        '售后服务 ｜ 问题反馈'
      ];
      return this.mail.map((item, idx) => ({
        ...item,
        avatar: avatars[idx % avatars.length],
        label: labels[idx % labels.length]
      }));
    }
  },
  methods: {
    openQqChat(qq) {
      window.open(`https://wpa.qq.com/msgrd?v=3&uin=${qq}&site=qq&menu=yes`, '_blank', 'noopener,noreferrer');
    },
    getinfo() {
      this.$api.login
        .contactinfo()
        .then((data) => {
          if (data.status === 200) {
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
.contact-shell {
  min-height: 100vh;
  background: linear-gradient(180deg, #ffffff 0%, #f6f9ff 56%, #ffffff 100%);
  color: #17233c;
  font-family: "Helvetica Neue", Arial, "PingFang SC", "Microsoft Yahei", sans-serif;
}

.contact-main {
  padding-top: 88px;
}

.contact-hero {
  position: relative;
  width: 100%;
  min-height: 286px;
  margin: 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 620px;
  gap: 28px;
  align-items: center;
  padding: 42px max(24px, calc((100% - 1300px) / 2)) 36px;
  box-sizing: border-box;
  background:
    linear-gradient(90deg, #f7fbff 0%, #f1f7ff 22%, #eef5ff 50%, #f1f7ff 78%, #f7fbff 100%);
  border-bottom: 1px solid #dbe8f7;
  overflow: hidden;
  box-shadow: inset 0 1px 0 #edf2fb;
}

.contact-hero::before,
.contact-hero::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.contact-hero::before {
  background:
    linear-gradient(145deg, rgba(224, 234, 249, 0.82) 0 16%, rgba(224, 234, 249, 0) 16% 100%),
    linear-gradient(36deg, rgba(235, 241, 252, 0.82) 0 22%, rgba(235, 241, 252, 0) 22% 100%),
    linear-gradient(152deg, rgba(220, 231, 249, 0) 0 83%, rgba(220, 231, 249, 0.58) 83% 100%);
  opacity: 0.95;
}

.contact-hero::after {
  background:
    radial-gradient(circle at 18% 42%, rgba(64, 129, 242, 0.08) 0, rgba(64, 129, 242, 0) 24%),
    radial-gradient(circle at 77% 28%, rgba(64, 129, 242, 0.07) 0, rgba(64, 129, 242, 0) 20%),
    radial-gradient(78% 88% at 18% 100%, rgba(104, 164, 255, 0.12) 0%, rgba(104, 164, 255, 0.02) 64%, transparent 74%),
    radial-gradient(72% 80% at 84% 100%, rgba(104, 164, 255, 0.09) 0%, rgba(104, 164, 255, 0.01) 60%, transparent 72%);
}

.contact-hero-copy {
  position: relative;
  z-index: 1;
  max-width: 610px;
}

.contact-hero-copy::before {
  content: '';
  position: absolute;
  left: -78px;
  top: 42px;
  width: 74px;
  height: 106px;
  background-image: radial-gradient(rgba(70, 136, 255, 0.16) 2px, transparent 2px);
  background-size: 18px 18px;
  pointer-events: none;
}

.contact-hero h1 {
  margin: 0 0 18px;
  color: #10213d;
  font-size: 48px;
  line-height: 1.1;
  letter-spacing: 0;
}

.contact-hero p {
  position: relative;
  max-width: 620px;
  margin: 0;
  color: #60718a;
  font-size: 16px;
  line-height: 2;
}

.contact-hero p::after {
  content: '';
  display: block;
  width: 44px;
  height: 3px;
  margin-top: 22px;
  background: #126de8;
  border-radius: 2px;
}

.contact-visual-img {
  display: block;
  width: min(760px, 112%);
  max-width: none;
  margin-left: auto;
  margin-right: -20px;
  object-fit: contain;
  position: relative;
  z-index: 1;
  image-rendering: auto;
  filter: saturate(1.03) contrast(1.02) drop-shadow(0 20px 38px rgba(71, 122, 206, 0.12));
}

.contact-content {
  width: min(1300px, calc(100% - 48px));
  margin: 0 auto;
  padding: 22px 0 78px;
  display: grid;
  grid-template-columns: 340px minmax(0, 1fr);
  gap: 24px;
  align-items: start;
}

.contact-info-panel,
.contact-service-panel {
  background: #fff;
  border: 1px solid #dce8f6;
  border-radius: 8px;
  box-shadow: 0 18px 48px rgba(42, 91, 151, 0.08);
}

.contact-info-panel {
  padding: 30px;
}

.contact-info-panel h2,
.contact-service-panel h2 {
  margin: 0;
  color: #14233d;
  font-size: 22px;
  line-height: 1.3;
}

.contact-info-row {
  display: flex;
  gap: 16px;
  padding: 24px 0;
  border-bottom: 1px solid #edf3fb;
}

.contact-info-row:last-child {
  border-bottom: none;
}

.contact-info-icon {
  position: relative;
  width: 62px;
  height: 62px;
  background: #eef6ff;
  border: 1px solid #d9eafe;
  border-radius: 50%;
  flex: 0 0 auto;
}

.contact-info-icon::before,
.contact-info-icon::after {
  content: '';
  position: absolute;
}

.contact-info-icon.time::before {
  left: 17px;
  top: 17px;
  width: 24px;
  height: 24px;
  border: 3px solid #126de8;
  border-radius: 50%;
}

.contact-info-icon.time::after {
  left: 30px;
  top: 23px;
  width: 3px;
  height: 13px;
  background: #126de8;
  border-radius: 2px;
  box-shadow: -6px 6px 0 0 #126de8;
  transform-origin: bottom center;
}

.contact-info-row span,
.contact-info-row strong,
.contact-info-row p {
  display: block;
}

.contact-info-row span {
  color: #53647d;
  font-size: 15px;
  font-weight: 800;
}

.contact-info-row strong {
  margin-top: 8px;
  color: #10213d;
  font-size: 17px;
  line-height: 1.6;
  word-break: break-word;
}

.contact-info-row p {
  margin: 6px 0 0;
  color: #6d7b91;
  font-size: 14px;
}

.contact-service-panel {
  padding: 30px;
}

.contact-section-head {
  text-align: left;
  margin-bottom: 22px;
}

.contact-section-head h2 {
  margin: 0;
  color: #14233d;
  font-size: 28px;
  line-height: 1.2;
}

.contact-section-head p {
  margin: 10px 0 0;
  color: #6d7b91;
  font-size: 15px;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.contact-card {
  min-height: 118px;
  padding: 22px 24px;
  display: grid;
  grid-template-columns: 70px minmax(0, 1fr) 116px;
  gap: 18px;
  align-items: center;
  background: #fff;
  border: 1px solid #e0eaf6;
  border-radius: 8px;
  box-shadow: 0 14px 36px rgba(50, 93, 152, 0.06);
}

.contact-avatar {
  width: 64px;
  height: 64px;
  object-fit: contain;
}

.contact-info {
  margin-top: 0;
}

.contact-info h3 {
  margin: 0;
  color: #14233d;
  font-size: 18px;
}

.contact-info p {
  margin: 8px 0 0;
  color: #64758d;
  font-size: 14px;
  word-break: break-all;
}

.contact-info em {
  display: block;
  margin-top: 8px;
  color: #6d7b91;
  font-size: 13px;
  font-style: normal;
}

.contact-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 42px;
  margin-top: 0;
  color: #fff;
  text-align: center;
  text-decoration: none;
  font-size: 15px;
  font-weight: 800;
  background: linear-gradient(90deg, #126de8 0%, #2d8cff 100%);
  border-radius: 8px;
  box-shadow: 0 12px 24px rgba(18, 109, 232, 0.18);
}

.contact-btn img {
  width: 18px;
  height: 18px;
  object-fit: contain;
}

.contact-empty {
  min-height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #718098;
  background: #fff;
  border: 1px dashed #c8d9ee;
  border-radius: 8px;
}

@media (max-width: 1080px) {
  .contact-hero {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .contact-visual-img {
    width: min(700px, 100%);
    max-width: 100%;
    margin-right: 0;
    margin-left: auto;
  }

  .contact-content {
    grid-template-columns: 1fr;
  }

  .contact-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 680px) {
  .contact-hero,
  .contact-content {
    width: calc(100% - 28px);
  }

  .contact-hero {
    min-height: auto;
    padding-top: 34px;
  }

  .contact-hero h1 {
    font-size: 38px;
  }

  .contact-grid {
    grid-template-columns: 1fr;
  }
}
</style>
