<!-- src/views/login/tool.vue -->
<template>
  <div class="tool-shell">
    <login-header></login-header>

    <main class="tool-main">
      <section class="tool-hero">
        <div class="tool-hero-shell">
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
              <a class="tool-btn secondary" href="http://sms.haozs.com/web/#/615082456/257759853" target="_blank" rel="noopener noreferrer">
                <span class="tool-btn-icon tool-btn-icon-log"></span>
                帮助文档
              </a>
            </div>
          </div>

          <div class="tool-visual">
            <img src="../../assets/newUi/tool-hero-visual.png" alt="" />
          </div>
        </div>
      </section>

      <section class="tool-capability">
        <div class="tool-section-head">
          <span class="tool-section-mark" aria-hidden="true"></span>
          <h2>核心能力</h2>
          <span class="tool-section-mark" aria-hidden="true"></span>
        </div>
        <div class="tool-section-sub">
          <p>全链路自动化能力，帮助 GM 节省时间，提升运营效率。</p>
        </div>

        <div class="tool-grid">
          <div class="tool-card" v-for="item in toolFeatures" :key="item.no">
            <div class="tool-card-visual">
              <span class="tool-icon-wrap">
                <img class="tool-icon" :src="item.icon" :alt="item.title" />
              </span>
            </div>
            <div class="tool-card-copy">
              <h3>{{ item.title }}</h3>
              <ul class="tool-card-list">
                <li v-for="point in item.points" :key="point">{{ point }}</li>
              </ul>
            </div>
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
import toolCapabilityInstallIcon from '../../assets/newUi/tool-capability-install.svg';
import toolCapabilityListIcon from '../../assets/newUi/tool-capability-list.svg';
import toolCapabilityStackIcon from '../../assets/newUi/tool-capability-stack.svg';
import toolCapabilityWechatIcon from '../../assets/newUi/tool-capability-wechat.svg';

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
          points: [
            '自动开放测试区及正式区',
            '自动备份合并数据及文本',
            '自动合并登录器列表',
            '自动合并充值链接'
          ],
          icon: toolCapabilityStackIcon
        },
        {
          no: '02',
          title: '自动生成登录器列表',
          points: [
            '列表保存本地目录',
            '上传 FTP 服务器',
            '上传阿里云 OSS',
            '登录器列表自定义'
          ],
          icon: toolCapabilityListIcon
        },
        {
          no: '03',
          title: '自动安装平台',
          points: [
            '测试区多选 20%',
            '开区后自动修改充值分区名称',
            '合区后自动修改充值分区名称',
            '自动删除被合并分区充值链接'
          ],
          icon: toolCapabilityInstallIcon
        },
        {
          no: '04',
          title: '开区微信消息通知',
          points: [
            '开区信息实时微信通知',
            'GM 可及时了解开区情况'
          ],
          icon: toolCapabilityWechatIcon
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
  position: relative;
  width: 100%;
  min-height: 376px;
  margin: 0 auto;
  padding: 34px 0 18px;
  overflow: hidden;
  background:
    linear-gradient(90deg, #f7fbff 0%, #f1f7ff 22%, #eef5ff 50%, #f1f7ff 78%, #f7fbff 100%);
  box-shadow: inset 0 1px 0 #edf2fb, inset 0 -1px 0 #edf2fb;
}

.tool-hero::before,
.tool-hero::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.tool-hero::before {
  background:
    linear-gradient(145deg, rgba(224, 234, 249, 0.82) 0 16%, rgba(224, 234, 249, 0) 16% 100%),
    linear-gradient(36deg, rgba(235, 241, 252, 0.82) 0 22%, rgba(235, 241, 252, 0) 22% 100%),
    linear-gradient(152deg, rgba(220, 231, 249, 0) 0 83%, rgba(220, 231, 249, 0.6) 83% 100%);
  opacity: 0.95;
}

.tool-hero::after {
  background:
    radial-gradient(circle at 20% 44%, rgba(64, 129, 242, 0.08) 0, rgba(64, 129, 242, 0) 24%),
    radial-gradient(circle at 78% 30%, rgba(64, 129, 242, 0.07) 0, rgba(64, 129, 242, 0) 20%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0) 100%);
}

.tool-hero-shell {
  position: relative;
  z-index: 1;
  width: min(1300px, calc(100% - 48px));
  min-height: 376px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 600px;
  gap: 36px;
  align-items: center;
}

.tool-hero-shell::before {
  content: '';
  position: absolute;
  left: 56px;
  right: 56px;
  bottom: 8px;
  height: 148px;
  background:
    radial-gradient(circle at 14% 76%, rgba(76, 139, 248, 0.05) 0, rgba(76, 139, 248, 0) 24%),
    radial-gradient(circle at 86% 72%, rgba(76, 139, 248, 0.05) 0, rgba(76, 139, 248, 0) 22%);
  pointer-events: none;
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
  position: relative;
  border: 2px solid currentColor;
  border-radius: 5px;
  overflow: hidden;
}

.tool-btn-icon-log::before {
  right: -1px;
  top: -1px;
  width: 8px;
  height: 8px;
  background: linear-gradient(135deg, transparent 48%, currentColor 49%, currentColor 100%);
}

.tool-btn-icon-log::after {
  left: 4px;
  top: 5px;
  width: 7px;
  height: 2px;
  background: currentColor;
  border-radius: 2px;
  box-shadow: 0 4px 0 currentColor;
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
  min-height: 336px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.tool-visual::before {
  content: none;
}

.tool-visual img {
  display: block;
  width: min(920px, 112%);
  max-width: none;
  margin-right: -18px;
  object-fit: contain;
  image-rendering: auto;
  filter: saturate(1.03) contrast(1.02) drop-shadow(0 20px 38px rgba(71, 122, 206, 0.12));
}

.tool-capability {
  width: min(1300px, calc(100% - 48px));
  margin: 0 auto;
  padding: 8px 0 78px;
}

.tool-section-head {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
}

.tool-section-head h2 {
  margin: 0;
  color: #14233d;
  font-size: 28px;
  line-height: 1.2;
}

.tool-section-mark {
  position: relative;
  width: 36px;
  height: 14px;
  flex: 0 0 auto;
}

.tool-section-mark::before,
.tool-section-mark::after {
  content: '';
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 999px;
}

.tool-section-mark::before {
  left: 0;
  width: 8px;
  height: 8px;
  background: #d8e6fb;
}

.tool-section-mark::after {
  right: 0;
  width: 10px;
  height: 10px;
  background: #1a6df0;
}

.tool-section-head .tool-section-mark:last-child::before {
  left: auto;
  right: 0;
}

.tool-section-head .tool-section-mark:last-child::after {
  right: auto;
  left: 0;
}

.tool-section-sub {
  text-align: center;
  margin: 10px 0 26px;
}

.tool-section-sub p {
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
  min-height: 0;
  padding: 22px 18px;
  background: #fff;
  border: 1px solid #e0eaf6;
  border-radius: 8px;
  box-shadow: 0 14px 36px rgba(50, 93, 152, 0.06);
  display: flex;
  align-items: flex-start;
  gap: 10px;
}

.tool-card-visual {
  position: relative;
  flex: 0 0 70px;
  min-height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tool-icon-wrap {
  width: 70px;
  height: 70px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: linear-gradient(180deg, #f2f7ff 0%, #e9f1ff 100%);
}

.tool-card-copy {
  min-width: 0;
  flex: 1 1 auto;
  width: 0;
}

.tool-icon {
  width: 44px;
  height: 44px;
  object-fit: contain;
}

.tool-card h3 {
  margin: 4px 0 10px;
  color: #14233d;
  font-size: 15px;
  line-height: 1.35;
  white-space: nowrap;
  word-break: keep-all;
  overflow-wrap: normal;
  letter-spacing: -0.2px;
}

.tool-card-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.tool-card-list li {
  position: relative;
  padding-left: 14px;
  margin-top: 7px;
  color: #687890;
  font-size: 12px;
  line-height: 1.6;
  word-break: keep-all;
  overflow-wrap: normal;
}

.tool-card-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 9px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #1a6df0;
}

@media (max-width: 1100px) {
  .tool-hero-shell {
    grid-template-columns: 1fr;
  }

  .tool-visual {
    max-width: 620px;
  }

  .tool-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 680px) {
  .tool-hero-shell,
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

  .tool-card {
    flex-direction: column;
  }

  .tool-card-visual {
    width: 100%;
    min-height: 84px;
  }

  .tool-card h3 {
    white-space: normal;
  }

  .tool-grid {
    grid-template-columns: 1fr;
  }

  .tool-visual img {
    width: 100%;
    max-width: 100%;
    margin-right: 0;
  }
}
</style>
