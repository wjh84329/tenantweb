<!-- src/views/login/tool.vue -->
<template>
  <div class="tool-shell">
    <login-header></login-header>

    <main class="tool-main">
      <section class="tool-hero">
        <div class="tool-copy">
          <div class="tool-title-row">
            <img src="../../assets/newUi/tool-rocket-icon.png" alt="" />
            <h1>好开区助手</h1>
          </div>
          <h2>智能开区 · 自动合区 · 高效运维</h2>
          <p>覆盖开区、合区、登录器列表、平台安装与通知流程，让日常运维更轻松。</p>
          <div class="tool-actions">
            <a class="tool-btn primary" href="https://haozs.com" target="_blank" rel="noopener noreferrer">
              <span class="tool-btn-icon tool-btn-icon-download"></span>
              点击下载
            </a>
            <a class="tool-btn secondary" href="https://haozs.com" target="_blank" rel="noopener noreferrer">
              <span class="tool-btn-icon tool-btn-icon-log"></span>
              更新日志
            </a>
          </div>
        </div>

        <div class="tool-visual">
          <img src="../../assets/newUi/tool-hero-visual.png" alt="" />
        </div>
      </section>

      <section class="tool-capability">
        <div class="tool-section-head">
          <h2>核心能力</h2>
          <p>全链路自动化能力，帮助 GM 节省时间，提升运营效率。</p>
        </div>

        <div class="tool-grid">
          <div class="tool-card" v-for="item in toolFeatures" :key="item.no">
            <div class="tool-card-head">
              <span class="tool-badge">{{ item.no }}</span>
              <img class="tool-icon" :src="item.icon" :alt="item.title" />
            </div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </section>
    </main>

    <login-footer></login-footer>
  </div>
</template>

<script>
import loginFooter from '../../components/loginFooter';
import loginHeader from '../../components/loginHeader.vue';

export default {
  components: {
    loginFooter,
    loginHeader
  },
  data() {
    return {
      webName: '', // 网站信息
      toolFeatures: [
        {
          no: '01',
          title: '自动开合区',
          desc: '自动开放测试区及正式区，自动备份合并数据及文本，自动合并登录器列表和充值链接。',
          icon: require('../../assets/img/service-icon-22.png')
        },
        {
          no: '02',
          title: '自动生成登录器列表',
          desc: '列表保存本地目录，支持上传 FTP 服务器、阿里云 OSS，并支持登录器列表自定义。',
          icon: require('../../assets/img/service-icon-11.png')
        },
        {
          no: '03',
          title: '自动安装平台',
          desc: '支持测试区配置，开区/合区后自动修改充值分区名称，自动删除被合并分区充值链接。',
          icon: require('../../assets/img/service-icon-33.png')
        },
        {
          no: '04',
          title: '开区微信消息通知',
          desc: '开区信息实时微信通知，GM 可及时了解开区情况。',
          icon: require('../../assets/img/service-icon-44.png')
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/newLogin/animate.min.css";

.tool-shell {
  min-height: 100vh;
  background: linear-gradient(180deg, #ffffff 0%, #f5f9ff 56%, #ffffff 100%);
  color: #17233c;
  font-family: "Helvetica Neue", Arial, "PingFang SC", "Microsoft Yahei", sans-serif;
}

.tool-main {
  padding-top: 88px;
}

.tool-hero {
  width: min(1300px, calc(100% - 48px));
  min-height: 376px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 520px;
  gap: 60px;
  align-items: center;
  padding: 46px 0 18px;
}

.tool-title-row {
  display: flex;
  align-items: center;
  gap: 24px;
  margin: 0 0 12px;
}

.tool-title-row img {
  width: 92px;
  height: 92px;
  object-fit: contain;
  flex: 0 0 auto;
}

.tool-copy h1 {
  margin: 0;
  color: #10213d;
  font-size: 58px;
  line-height: 1.08;
  letter-spacing: 0;
}

.tool-copy h2 {
  margin: 0 0 20px;
  color: #126de8;
  font-size: 28px;
  line-height: 1.4;
  letter-spacing: 0;
}

.tool-copy p {
  max-width: 620px;
  margin: 0;
  color: #60718a;
  font-size: 17px;
  line-height: 1.9;
}

.tool-actions {
  display: flex;
  gap: 14px;
  margin-top: 30px;
}

.tool-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  height: 58px;
  min-width: 178px;
  padding: 0 28px;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 800;
  text-decoration: none;
  box-sizing: border-box;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.tool-btn-icon {
  position: relative;
  flex: 0 0 auto;
  width: 18px;
  height: 18px;
}

.tool-btn-icon::before,
.tool-btn-icon::after {
  content: '';
  position: absolute;
  box-sizing: border-box;
}

.tool-btn-icon-download::before {
  clip-path: polygon(50% 100%, 0 55%, 28% 55%, 28% 0, 72% 0, 72% 55%, 100% 55%);
  width: 18px;
  height: 12px;
  left: 0;
  top: 1px;
  background: currentColor;
}

.tool-btn-icon-download::after {
  left: 2px;
  bottom: 0;
  width: 14px;
  height: 4px;
  border: 2px solid currentColor;
  border-top: 0;
  border-radius: 0 0 4px 4px;
  background: transparent;
}

.tool-btn-icon-log {
  border: 2px solid currentColor;
  border-radius: 5px;
}

.tool-btn-icon-log::before {
  left: 7px;
  top: 3px;
  width: 2px;
  height: 8px;
  background: currentColor;
}

.tool-btn-icon-log::after {
  left: 4px;
  top: 6px;
  width: 8px;
  height: 2px;
  background: currentColor;
}

.tool-btn.primary {
  color: #fff;
  background: linear-gradient(90deg, #126de8 0%, #2d8cff 100%);
  border: none;
  box-shadow: 0 14px 28px rgba(18, 109, 232, 0.22);
}

.tool-btn.secondary {
  color: #126de8;
  background: #fff;
  border: 1px solid #cfe3fb;
}

.tool-btn:hover {
  transform: translateY(-1px);
}

.tool-visual {
  position: relative;
  min-height: 300px;
}

.tool-visual::before {
  content: none;
}

.tool-visual img {
  display: block;
  width: min(800px, 100%);
  object-fit: contain;
}

.tool-capability {
  width: min(1300px, calc(100% - 48px));
  margin: 0 auto;
  padding: 8px 0 78px;
}

.tool-section-head {
  text-align: center;
  margin-bottom: 26px;
}

.tool-section-head h2 {
  margin: 0;
  color: #14233d;
  font-size: 28px;
  line-height: 1.2;
}

.tool-section-head p {
  margin: 10px 0 0;
  color: #6d7b91;
  font-size: 15px;
}

.tool-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
}

.tool-card {
  min-height: 228px;
  padding: 22px;
  background: #fff;
  border: 1px solid #e0eaf6;
  border-radius: 8px;
  box-shadow: 0 14px 36px rgba(50, 93, 152, 0.06);
}

.tool-card-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.tool-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 34px;
  height: 30px;
  padding: 0 8px;
  color: #126de8;
  font-size: 12px;
  font-weight: 800;
  background: #eef6ff;
  border: 1px solid #d7e8fd;
  border-radius: 8px;
}

.tool-icon {
  width: 58px;
  height: 58px;
  object-fit: contain;
}

.tool-card h3 {
  margin: 18px 0 10px;
  color: #14233d;
  font-size: 18px;
  line-height: 1.4;
}

.tool-card p {
  margin: 0;
  color: #687890;
  font-size: 14px;
  line-height: 1.8;
}

@media (max-width: 1100px) {
  .tool-hero {
    grid-template-columns: 1fr;
  }

  .tool-visual {
    max-width: 560px;
  }

  .tool-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 680px) {
  .tool-hero,
  .tool-capability {
    width: calc(100% - 28px);
  }

  .tool-hero {
    min-height: auto;
    padding-top: 34px;
  }

  .tool-copy h1 {
    font-size: 40px;
  }

  .tool-actions {
    flex-direction: column;
  }

  .tool-btn {
    width: 100%;
  }

  .tool-grid {
    grid-template-columns: 1fr;
  }
}
</style>
