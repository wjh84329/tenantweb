<!-- src/views/login/tool.vue -->
<template>
  <div class="page-wrap">
    <login-header style="position: fixed"></login-header>

    <div class="head_box">
      <div class="banner-box"></div>
    </div>

    <!-- =============== 说明区（4 个图标 + 文字） =============== -->
    <div class="service-box">
      <div class="service">
        <div class="service-list">
          <div class="item">
            <div class="icon icon1"></div>
            <div class="title">自动开合区</div>
            <div class="desc">
              <p>自动开放测试区及正式区</p>
              <p>自动备份合并数据及文本</p>
              <p>自动合并登录器列表</p>
              <p>自动合并充值链接</p>
            </div>
          </div>

          <div class="item">
            <div class="icon icon2"></div>
            <div class="title">自动生成登录器列表</div>
            <div class="desc">
              <p>列表保存本地目录</p>
              <p>上传FTP服务器</p>
              <p>上传阿里云OSS</p>
              <p>登录器列表自定义</p>
            </div>
          </div>

          <div class="item">
            <div class="icon icon3"></div>
            <div class="title">自动安装平台</div>
            <div class="desc">
              <p>测试区多送20%</p>
              <p>开区后自动修改充值分区名称</p>
              <p>合区后自动修改充值分区名称</p>
              <p>自动删除被合并分区充值链接</p>
            </div>
          </div>

          <div class="item">
            <div class="icon icon4"></div>
            <div class="title">开区微信消息通知</div>
            <div class="desc">
              <p>开区信息实时微信通知</p>
              <p>GM及时了解开区情况</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- =============== 下载卡片区（3 个卡片） =============== -->
    <div class="ability-box">
      <div class="service">
        <div class="service-list">
          <div class="item bg1">
            <div class="info">
              <div class="title">好开区助手 - 下载地址</div>
              <div class="desc">
                支持多引擎，全智能开合区，智能辅助，释放双手，解决GM一切烦恼
              </div>
              <div class="btn-box">
                <button class="btn primary">点击下载</button>
                <button class="btn secondary">更新日志</button>
              </div>
            </div>
          </div>

          <div class="item bg2">
            <div class="info">
              <div class="title">好跨服助手 - 下载地址</div>
              <div class="desc">
                支持多引擎，全智能跨服合区，智能辅助，释放双手，解决GM一切烦恼
              </div>
              <div class="btn-box">
                <button class="btn primary">点击下载</button>
                <button class="btn secondary">更新日志</button>
              </div>
            </div>
          </div>

          <div class="item bg3">
            <div class="info">
              <div class="title">GM工具箱 - 下载地址</div>
              <div class="desc">
                文件同步、文本搜索替换，版本占用率查询，数据编辑，一个工具搞定！
              </div>
              <div class="btn-box">
                <button class="btn primary">点击下载</button>
                <button class="btn secondary">更新日志</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

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
      webName: '' // 网站信息
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/newLogin/animate.min.css";

// -------------- 通用字体 / 颜色 --------------
.page-wrap {
  font-family: "Helvetica Neue", Arial, "PingFang SC", "Microsoft Yahei", sans-serif;
  background: #fff;
  color: #333;
}
.head_box {
    background: url(../../assets/img/banner02.jpg) center center no-repeat;
    height: 500px;
    position: relative;
    // padding-top: 126px;
    // background: #fff;
}

.banner-box {
    position: relative;
    width: 100%;
    max-width: 1300px;
    margin: 0 auto;
    height: 722px;
}

.banner-link {
    position: absolute;
    top: 166px;
    left: 6%;
    display: block;
}

.banner-pic {
    max-width: 760px;
    display: block;
}

a {
  color: inherit;
}

/* ============ 4 个图标说明块 ============ */
.service-box {
  background: #fff;
  // padding: 92px 0 92px;
}
.service-box .service {
  width: 1100px;
  max-width: 100%;
  margin: 0 auto;
}
.service-box .service .navtitle {
  margin-bottom: 56px;
  text-align: center;
}
.service-box .service .navtitle .title {
  font-size: 26px;
  font-weight: 700;
  color: #1aad5b;
  margin-bottom: 10px;
}
.service-box .service .navtitle .small {
  font-size: 14px;
  color: #666;
}
.service-box .service .service-list {
  display: grid;
  grid-template-columns: repeat(4, minmax(240px, 1fr));
  gap: 22px;
  justify-items: center;
}
.service-box .service .service-list .item {
  width: 260px;
  // background: #fff;
  border-radius: 18px;
  padding: 26px 24px 22px;
  // box-shadow: 0 16px 30px rgba(0, 0, 0, 0.08);
  text-align: center;
}
.service-box .service .service-list .item .icon {
  width: 72px;
  height: 72px;
  margin: 0 auto 18px;
  border-radius: 50%;
}
.service-box .service .service-list .item .icon1 {
  background-image: url('../../assets/img/service-icon-11.png');
  background-size: 72px 72px;
}
.service-box .service .service-list .item .icon2 {
  background-image: url('../../assets/img/service-icon-22.png');
  background-size: 72px 72px;
}
.service-box .service .service-list .item .icon3 {
  background-image: url('../../assets/img/service-icon-33.png');
  background-size: 72px 72px;
}
.service-box .service .service-list .item .icon4 {
  background-image: url('../../assets/img/service-icon-44.png');
  background-size: 72px 72px;
}
.service-box .service .service-list .item .title {
  font-size: 18px;
  font-weight: 700;
  color: #1aad5b;
  margin: 0 auto 12px;
  line-height: 1.3;
  position: relative;
}
.service-box .service .service-list .item .title::after {
  content: "";
  display: block;
  width: 48px;
  height: 2px;
  margin: 10px auto 0;
  border-radius: 1px;
  background: rgba(26, 173, 91, 0.3);
}
.service-box .service .service-list .item .desc {
  margin-top: 14px;
  color: #555;
  font-size: 13px;
  line-height: 1.8;
  max-width: 180px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}
.service-box .service .service-list .item .desc p {
  margin: 6px 0;
  word-break: keep-all;
}
/* ============ 下载工具卡片区 ============ */
.ability-box {
  background: #fff;
  // padding: 100px 0 120px;
}
.ability-box .service {
  width: 1100px;
  max-width: 100%;
  margin: 0 auto;
}
.ability-box .service .navtitle {
  margin-bottom: 56px;
  text-align: center;
}
.ability-box .service .navtitle .title {
  font-size: 26px;
  font-weight: 700;
  color: #1aad5b;
  margin-bottom: 10px;
}
.ability-box .service .navtitle .small {
  font-size: 14px;
  color: #666;
}
.ability-box .service .service-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(260px, 1fr));
  gap: 22px;
  justify-items: center;
}
.ability-box .service .service-list .item {
  width: 320px;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 16px 34px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: transform 0.28s ease, box-shadow 0.28s ease;
}
.ability-box .service .service-list .item:hover {
  transform: translateY(-6px);
  box-shadow: 0 28px 48px rgba(0, 0, 0, 0.14);
}
.ability-box .service .service-list .item .info {
  position: relative;
  padding: 32px 22px 26px;
  display: flex;
  flex-direction: column;
  // min-height: 320px;
}
.ability-box .service .service-list .item .info::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 82px;
  background: linear-gradient(90deg, #1a6bf8, #2fb2ff);
  clip-path: polygon(0 0, 100% 0, 100% 75%, 0 100%);
}
.ability-box .service .service-list .item .info .title {
  position: relative;
  z-index: 1;
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 12px;
  line-height: 1.4;
}
.ability-box .service .service-list .item .info .desc {
  position: relative;
  z-index: 1;
  margin-top: 42px;
  font-size: 14px;
  color: #333;
  line-height: 1.8;
}
.ability-box .service .service-list .item .info .btn-box {
  position: relative;
  z-index: 1;
  display: flex;
  gap: 12px;
  // margin-top: auto;
}
.ability-box .service .service-list .item .info .btn {
  width: 120px;
  padding: 10px 0;
  border-radius: 999px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: transform 0.22s ease, filter 0.22s ease;
  box-shadow: 0 10px 18px rgba(0, 0, 0, 0.12);
}
.ability-box .service .service-list .item .info .btn.primary {
  background: linear-gradient(90deg, #1a6bf8, #2fb2ff);
  color: #fff;
}
.ability-box .service .service-list .item .info .btn.secondary {
  background: rgba(0, 0, 0, 0.22);
  color: rgba(255, 255, 255, 0.92);
}
.ability-box .service .service-list .item .info .btn:hover {
  transform: translateY(-2px);
  filter: brightness(1.05);
}

// ============ 响应式 ============

@media (max-width: 1100px) {
  .service-box .service .service-list,
  .ability-box .service .service-list {
    grid-template-columns: repeat(2, minmax(240px, 1fr));
  }
}

@media (max-width: 780px) {
  .service-box .service,
  .ability-box .service {
    width: 90%;
  }

  .service-box .service .service-list,
  .ability-box .service .service-list {
    grid-template-columns: 1fr;
  }
}
</style>
