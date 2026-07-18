<!-- eslint-disable eqeqeq -->
<!-- eslint-disable no-dupe-keys -->
<template>
  <div class="lh-page">
    <login-header></login-header>

    <div class="lh-service" :class="{ open: qqShow }">
      <div class="lh-service-card" v-if="qqShow">
        <div class="lh-service-top">
          <img class="lh-service-headset" :src="serviceHeadsetIcon" alt="" />
          <span class="lh-service-top-title">在线客服</span>
        </div>
        <div class="lh-service-title">QQ咨询</div>
        <a
          v-for="(item, index) in serviceQq"
          :key="item.qq"
          class="lh-service-link"
          :href="`https://wpa.qq.com/msgrd?v=3&uin=${item.qq}&site=qq&menu=yes`"
          target="_blank"
          rel="noopener noreferrer"
          @click.prevent="openQqChat(item.qq)"
        >
          <span class="lh-qq-penguin">
            <img src="../../assets/newUi/qq-chat-icon.svg" alt="" />
          </span>
          <span class="lh-service-meta">
            <strong>{{ getServiceName(item, index) }}</strong>
            <em>{{ item.qq }}</em>
          </span>
        </a>
        <div class="lh-service-empty" v-if="!serviceQq.length">暂无在线客服</div>
        <button class="lh-service-close" type="button" @click="qqShow = false">
          <span class="lh-service-close-icon">‹</span>
          <span>收起</span>
        </button>
      </div>
      <button v-else class="lh-service-mini" type="button" @click="qqShow = true">在线客服</button>
    </div>

    <main class="lh-main">
      <section class="lh-hero">
        <div class="lh-hero-shell">
          <div class="lh-hero-copy">
            <div class="lh-hero-intro">
              <h1><span>商户</span>中心</h1>
              <p>
                安全、稳定、清晰的商户作业入口
              </p>
            </div>
            <img class="lh-hero-visual-img" src="../../assets/newUi/login-hero-visual.png" alt="" />
          </div>

          <div class="lh-login-card">
            <div class="lh-login-tabs">
              <button type="button" :class="{ active: isPwdLoginShow }" @click="tab(1)">密码登录</button>
              <button type="button" :class="{ active: isWxQrLoginShow }" @click="tab(2)">扫码登录</button>
            </div>

            <form v-show="isPwdLoginShow" class="lh-form" @submit.prevent="singin">
              <div class="lh-field">
                <span class="lh-field-icon">
                  <img :src="fieldUserIcon" alt="" />
                </span>
                <el-input
                  placeholder="请输入登录账号"
                  v-model="form.username"
                  :disabled="false"
                  @keyup.enter.native="singin"
                ></el-input>
              </div>
              <div class="lh-field lh-password-field">
                <span class="lh-field-icon">
                  <img :src="fieldLockIcon" alt="" />
                </span>
                <el-input
                  placeholder="请输入密码"
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  :disabled="false"
                  @keyup.enter.native="singin"
                ></el-input>
                <button
                  class="lh-password-toggle"
                  :class="{ active: showPassword }"
                  type="button"
                  :aria-label="showPassword ? '隐藏密码' : '显示密码'"
                  @click="togglePasswordVisibility"
                >
                  <img :src="showPassword ? eyeOpenIcon : eyeHideIcon" alt="" />
                </button>
              </div>
              <div class="lh-field captcha-field">
                <span class="lh-field-icon">
                  <img :src="fieldVerifyIcon" alt="" />
                </span>
                <div class="lh-captcha-row">
                  <el-input
                    placeholder="请输入验证码"
                    :disabled="false"
                    v-model="form.code"
                    @keyup.enter.native="singin"
                  ></el-input>
                  <img class="lh-captcha" id="code" :src="randomCode" alt="" @click="getQrcode()" />
                </div>
              </div>
              <button type="submit" class="lh-submit" :disabled="isLoading">
                {{ isLoading ? '登录中' : '登录' }}
              </button>
              <div class="lh-register">
                还没有账号？
                <span @click="$router.push('/login/loginregister')">免费注册</span>
              </div>
            </form>

            <div v-show="isWxQrLoginShow" class="lh-qr-login">
              <div class="lh-qr-box" :class="{ 'is-expired': qrExpired }">
                <img v-if="qrCodeUrl" class="lh-qr-image" :src="qrCodeUrl" />
                <div v-else class="lh-qr-loading">
                  <span class="lh-qr-spinner"></span>
                  <span>{{ qrLoading ? '二维码生成中...' : '点击刷新二维码' }}</span>
                </div>
                <button
                  v-if="qrExpired"
                  type="button"
                  class="lh-qr-expired-mask"
                  @click="getwxqrImg"
                >
                  <strong>二维码已过期</strong>
                  <span>点击刷新</span>
                </button>
              </div>
              <p>请先绑定公众号再使用扫码登录</p>
              <button type="button" class="lh-submit lh-refresh" @click="getwxqrImg">
                刷新二维码
              </button>
            </div>
          </div>
        </div>
      </section>

      <section class="lh-benefits">
        <div class="lh-section-head">
          <span class="lh-section-mark" aria-hidden="true"></span>
          <h2>选择我们的理由</h2>
          <span class="lh-section-mark" aria-hidden="true"></span>
        </div>
        <div class="lh-benefit-grid">
          <div
            v-for="item in benefitItems"
            :key="item.title"
            class="lh-benefit-card"
          >
            <span class="lh-benefit-icon" :class="item.iconClass">
              <img :src="item.icon" :alt="item.title" />
            </span>
            <div class="lh-benefit-copy">
              <span>{{ item.title }}</span>
              <p>{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </section>
    </main>

    <login-footer></login-footer>
  </div>
</template>

<script>
import axios from 'axios';
import loginFooter from '../../components/loginFooter';
import loginHeader from '../../components/loginHeader.vue';
import Mgr from '../../assets/js/SecurityService';
import api from '../../assets/js/apiRequestHandler';
import { authUrl } from '../../assets/js/version.js';
import wxlogin from 'vue-wxlogin';
import fieldUserIcon from '../../assets/newUi/loginhome/field-user.svg';
import fieldLockIcon from '../../assets/newUi/loginhome/field-lock.svg';
import fieldVerifyIcon from '../../assets/newUi/loginhome/field-verify.svg';
import eyeOpenIcon from '../../assets/newUi/loginhome/eye-open.svg';
import eyeHideIcon from '../../assets/newUi/loginhome/eye-hide.svg';
import benefitRocketIcon from '../../assets/newUi/loginhome/benefit-rocket.svg';
import benefitCoinIcon from '../../assets/newUi/loginhome/benefit-coin.svg';
import benefitDocIcon from '../../assets/newUi/loginhome/benefit-doc.svg';
import benefitShieldIcon from '../../assets/newUi/loginhome/benefit-shield.svg';
import serviceHeadsetIcon from '../../assets/newUi/loginhome/service-headset.svg';
export default {
  components: {
    loginFooter,
    loginHeader,
    // eslint-disable-next-line vue/no-unused-components
    wxlogin
  },
  directives: {
    // v-hover-active：通用 hover/动画指令
    // 用法示例：
    //  <div v-hover-active="{ animation: 'animate__animated animate__pulse', enterDelay:80, leaveDelay:0, once:false }"></div>
    // 或只用默认 active 类： <div v-hover-active></div>
    hoverActive: {
      inserted(el, binding = {}) {
        const opts = binding.value || {};
        const activeClass = (binding.arg || 'active');
        // 向后兼容：若只传 animation，则既可用于 inView 也用于 hover（按 inView/hovr 标志决定）
        const rawAnimation = (opts.animation || '').trim();
        const inViewAnimation = opts.inViewAnimation || (opts.inView ? rawAnimation : '');
        const hoverAnimation = opts.hoverAnimation || (!opts.inView && rawAnimation ? rawAnimation : opts.hoverAnimation || '');
        const enterDelay = opts.enterDelay || 0;
        const leaveDelay = opts.leaveDelay || 0;
        const once = !!opts.once;
        const enableInView = !!opts.inView;

        // 状态标记，分别管理视口激活与 hover 动画，避免互相干扰
        el.__ha_inview = false;
        el.__ha_inviewAnimating = false;
        el.__ha_hoverAnimating = false;

        let enterTimer = null;
        let leaveTimer = null;
        let io = null;

        const addAnimClasses = (clsStr) => {
          if (!clsStr) return;
          clsStr.split(/\s+/).forEach(c => c && el.classList.add(c));
          // 强制重绘以确保动画能重触发
          // eslint-disable-next-line no-unused-expressions, no-void
          void el.offsetWidth;
        };
        const removeAnimClasses = (clsStr) => {
          if (!clsStr) return;
          clsStr.split(/\s+/).forEach(c => c && el.classList.remove(c));
        };

        // --- in-view logic ---
        const onInView = () => {
          if (el.__ha_inview) return;
          el.__ha_inview = true;
          el.classList.add(activeClass);
          if (inViewAnimation) {
            if (el.__ha_inviewAnimating) return;
            el.__ha_inviewAnimating = true;
            addAnimClasses(inViewAnimation);
            const onEnd = () => {
              if (once) removeAnimClasses(inViewAnimation);
              el.__ha_inviewAnimating = false;
              el.removeEventListener('animationend', onEnd);
            };
            el.addEventListener('animationend', onEnd);
          }
        };

        // 如果开启 inView，则建立 IntersectionObserver（支持老浏览器可自行降级）
        if (enableInView && typeof IntersectionObserver !== 'undefined') {
          io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                onInView();
                if (once && io) {
                  io.disconnect();
                  io = null;
                }
              }
            });
          }, { threshold: 0.25 }); // 元素 25% 可见即触发
          io.observe(el);
        } else if (enableInView && inViewAnimation) {
          // 降级：若不支持 IO，立即触发（或根据需要改为窗口 scroll 监听）
          onInView();
        }

        // --- hover logic ---
        const startHoverAnim = () => {
          if (!hoverAnimation) return;
          if (el.__ha_hoverAnimating) return;
          el.__ha_hoverAnimating = true;
          addAnimClasses(hoverAnimation);
          const onEnd = () => {
            // hover 动画一般不保留类，移除以便下次可重触发
            removeAnimClasses(hoverAnimation);
            el.__ha_hoverAnimating = false;
            el.removeEventListener('animationend', onEnd);
          };
          el.addEventListener('animationend', onEnd);
        };

        const addHoverActive = () => {
          // hover 样式（transform / 阴影）通过 activeClass 控制，允许与 inView 共存
          el.classList.add(activeClass);
          startHoverAnim();
        };
        const removeHoverActive = () => {
          // 仅移除 hover 导致的 active（若元素由 inView 激活则保留 inview 状态）
          // 我们无法区分是谁加的 activeClass，若要求区分需改为不同 class 名称；
          // 这里采用：若 inView 已激活，则保留 activeClass；否则移除。
          if (el.__ha_inview) return;
          el.classList.remove(activeClass);
        };

        el.addEventListener('mouseenter', () => {
          if (leaveTimer) {
            clearTimeout(leaveTimer);
            leaveTimer = null;
          }
          if (enterTimer) clearTimeout(enterTimer);
          enterTimer = setTimeout(addHoverActive, enterDelay);
        });

        el.addEventListener('mouseleave', () => {
          if (enterTimer) {
            clearTimeout(enterTimer);
            enterTimer = null;
          }
          if (leaveTimer) clearTimeout(leaveTimer);
          leaveTimer = setTimeout(removeHoverActive, leaveDelay);
        });

        // 清理（在元素卸载时断开 observer）
        // Vue directive 没有 unbind/ beforeUnmount here because this is Vue2 file — add unbind if needed
        if (el.__vue__ && el.__vue__.$onBeforeDestroy) {
          // noop
        }
        // 为确保在卸载时释放 IO（Vue2 支持 unbind，需要在 directive 中添加 unbind）
        // 这里直接挂载到元素上，方便在 unbind 中取用
        el.__ha_io = io;
      },
      // Vue2/3 都支持 unbind / beforeUnmount 不同名字；这里实现 unbind 用于 Vue2
      unbind(el) {
        if (el.__ha_io) {
          try { el.__ha_io.disconnect(); } catch (e) { }
          el.__ha_io = null;
        }
      }
    }

  },
  data() {
    return {
      ubAccountLogin: false,
      current: 1,
      serviceQq: [],
      qrExpired: false,
      isLoading: false,
      form: {
        username: '',
        password: '',
        code: '',
        checkKey: '',
        returnUrl: ''
      },
      qqSignin: '',
      wxQrSignin: '',
      isPwdLoginShow: true,
      isWxQrLoginShow: false,
      showPassword: false,
      wxqrimgurl: '',
      wxvalidKey: '',
      randomCode:
                'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==',
      appid: 'wx937e63f717108262',
      scope: 'snsapi_login',
      redirect_uri: 'http://localhost:5000/External/WeixinOpen',
      qrLoading: false,
      qrCodeUrl: '',
      returnUrl: '',
      code: '',
      qqShow: true,
      fieldUserIcon,
      fieldLockIcon,
      fieldVerifyIcon,
      eyeOpenIcon,
      eyeHideIcon,
      serviceHeadsetIcon,
      benefitItems: [
        {
          title: '高效便捷',
          desc: '流程简化，操作便捷，让业务开展更高效。',
          icon: benefitRocketIcon,
          iconClass: 'is-blue'
        },
        {
          title: '降低成本',
          desc: '减少人力与时间成本，提升整体运营效率。',
          icon: benefitCoinIcon,
          iconClass: 'is-gold'
        },
        {
          title: '轻松对账',
          desc: '账目清晰、自动汇总，对账更轻松。',
          icon: benefitDocIcon,
          iconClass: 'is-sky'
        },
        {
          title: '系统稳定',
          desc: '高可用架构稳定运行，保障业务持续在线。',
          icon: benefitShieldIcon,
          iconClass: 'is-blue'
        }
      ]
    };
  },
  created() {
    this.footerInfo();
  },
  mounted() {
    this.applyDesktopViewport();
    this.getQrcode();
  },
  beforeDestroy() {
    this.restoreViewport();
  },
  methods: {
    applyDesktopViewport() {
      const desktopWidth = 1366;
      let viewport = document.querySelector('meta[name="viewport"]');
      if (!viewport) {
        viewport = document.createElement('meta');
        viewport.setAttribute('name', 'viewport');
        document.head.appendChild(viewport);
      }
      this._previousViewportContent = viewport.getAttribute('content') || '';
      viewport.setAttribute('content', `width=${desktopWidth},initial-scale=1.0`);
    },
    restoreViewport() {
      const viewport = document.querySelector('meta[name="viewport"]');
      if (!viewport || typeof this._previousViewportContent === 'undefined') return;
      if (this._previousViewportContent) {
        viewport.setAttribute('content', this._previousViewportContent);
      } else {
        viewport.setAttribute('content', 'width=device-width,initial-scale=1.0');
      }
      this._previousViewportContent = undefined;
    },
    normalizeScanRoles(roles) {
      if (Array.isArray(roles)) return roles;
      if (typeof roles === 'string') {
        try {
          const parsedRoles = JSON.parse(roles);
          return Array.isArray(parsedRoles) ? parsedRoles : [];
        } catch (e) {
          return [];
        }
      }
      return [];
    },
    footerInfo() {
      this.$api.login
        .footerInfo()
        .then(data => {
          if (data.status === 200) {
            this.serviceQq = JSON.parse(data.data.serviceQq);
            this.serviceQq = this.serviceQq.filter(item => item.type !== 1);
          }
        })
        .catch(err => {
          this.$messageError(err.message);
        });
    },
    async getQrcode() {
      let res = await api({
        url: '/api/Register/CreateNumCode',
        method: 'get',
        params: {}
      });
      this.randomCode = res.data.imageData;
      this.form.checkKey = res.data.validateKey;
    },
    // 轮询是否绑定微信公众号 + 直接完成登录
    async checkBindWeixi() {
      this.$api.login
        .checkBindWeixi({
          code: this.code
        })
        .then(data => {
          if (data.status === 200) {
            const res = data.data;

            // need_bind
            if (res.status === 'need_bind') {
              this.$messageError('该微信未绑定账号，请先绑定账号！');
              clearInterval(this.timer);
              this.timer = null;
              this.isPwdLoginShow = true;
              this.isWxQrLoginShow = false;
              return;
            }

            // 扫码中/取消/过期这些状态保持你原来的处理
            if (res.status === 'scanned') {
              console.log('已扫码，等待确认');
              this.qrExpired = false;
              return;
            }

            if (res.status === 'cancelled') {
              console.log('用户取消登录');
              this.qrExpired = false;
              return;
            }

            if (res.status === 'expired') {
              this.$messageError('二维码已过期，请刷新二维码！');
              this.qrExpired = true;
              this.qrLoading = false;
              if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
              }
              return;
            }

            // === 关键：status === confirmed 且后端已返回 access_token ===
            if (res.status === 'confirmed' && res.success && res.access_token) {
              if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
              }
              this.qrExpired = false;

              // 组装与密码登录一致的 user_info 结构（后端如果能一并返回用户名/角色最好）
              const roles = this.normalizeScanRoles(res.roles);
              const userInfo = {
                userId: res.userId,
                username: res.username || '', // 若后端没返回，可以留空或再补一接口
                roles,
                state: res.state || null
              };

              // 和密码登录保持一致：鉴权统一走 sessionStorage
              sessionStorage.setItem('access_token', res.access_token);
              sessionStorage.setItem('user_info', JSON.stringify(userInfo));
              axios.defaults.headers.common.Authorization = 'Bearer ' + res.access_token;

              if (userInfo.state === 'CustomRole' || roles.includes('CustomRole')) {
                this.$router.push('/employeemain/employeehome');
              } else {
                this.$router.push('/main/home');
              }
            }
          }
        })
        .catch(err => {
          this.$messageError(err.message);
        });
    },
    getwxqrImg() {
      let ReturnUrl = this.returnUrl;
      console.log('ReturnUrl:' + ReturnUrl);
      // 刷新时清理旧定时器与 expired 标识
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
      this.qrExpired = false;
      this.qrLoading = true;
      this.qrCodeUrl = '';
      this.$api.login.getLoginQrCode({
        returnUrl: ReturnUrl,
        source: 'tenantweb'
      }).then((res) => {
        // console.log(res);
        this.qrCodeUrl = res.data.qrCodeUrl;
        this.qrLoading = false;
        this.code = res.data.code;
        this.timer = setInterval(() => {
          this.checkBindWeixi();
        }, 1000);
      }).catch((err) => {
        this.qrLoading = false;
        this.loading = false;
        if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
          this.errorMsg = err.response.data;
        }
      });
    },
    // === 核心：账号密码登录改造 ===
    async singin() {
      const loginTraceStart = (typeof performance !== 'undefined' && performance.now)
        ? performance.now()
        : Date.now();
      const trace = (stage) => {
        const now = (typeof performance !== 'undefined' && performance.now)
          ? performance.now()
          : Date.now();
        const elapsed = Math.round(now - loginTraceStart);
        // 线上可直接在浏览器控制台看阶段耗时，不依赖服务端日志
        console.warn(`[LoginTrace] ${stage} ${elapsed}ms`);
      };

      // 简单前端校验
      if (!this.form.username || !this.form.password || !this.form.code) {
        this.$messageError('请输入账号、密码和验证码');
        return;
      }

      if (this.isLoading) return;
      this.isLoading = true;

      axios.defaults.withCredentials = true;

      // 获取公网 IPv4（原逻辑保留，可选）
      //   let clientIp = null;
      //   try {
      //     const resp = await fetch('https://icanhazip.com');
      //     if (resp.ok) {
      //       const txt = (await resp.text()).trim();
      //       if (/^\d{1,3}(\.\d{1,3}){3}$/.test(txt)) clientIp = txt;
      //     }
      //   } catch (e) {
      //     // 忽略获取失败
      //   }
      const clientIp = localStorage.getItem('user_ip') || null;

      const mgr = new Mgr();

      try {
        // 1）调用 LoginApi + /connect/token
        const result = await mgr.loginByPassword({
          username: this.form.username,
          password: this.form.password,
          code: this.form.code,
          checkKey: this.form.checkKey,
          rememberLogin: true,
          clientIp
        });
        trace('LoginApiDone');

        // 2）根据角色/状态跳转，完全不再依赖 ReturnUrl/OIDC
        const user = result.user;
        const roles = user.roles || [];
        const targetPath =
          user.state === 'CustomRole' || roles.includes('CustomRole')
            ? '/employeemain/employeehome'
            : '/main/home';

        // 先释放登录按钮状态，再切路由，让浏览器有机会先完成一次绘制
        this.isLoading = false;
        await this.$nextTick();
        await new Promise((resolve) => {
          if (typeof window !== 'undefined' && typeof window.requestAnimationFrame === 'function') {
            window.requestAnimationFrame(() => resolve());
            return;
          }
          setTimeout(resolve, 0);
        });

        trace(`RoutePush:${targetPath}`);
        this.$router.push(targetPath);
      } catch (error) {
        trace('LoginFailed');
        if (error.response && error.response.data) {
          this.$messageError(error.response.data.message || '登录失败');
        } else {
          this.$messageError(error.message || '登录失败');
        }
        this.getQrcode();
        // console.error(error);
      } finally {
        // 清理密码
        if (this.isLoading) {
          this.isLoading = false;
        }
      }
    },

    // 微信扫码登录成功后的逻辑：这里你目前还是走 loginWechatApi + ReturnUrl，
    // 如果后端也改成返回 JSON + /connect/token，可以参照 singin 的方式再改一遍。
    async scansingin() {
      axios.defaults.withCredentials = true;

      let clientIp = null;
      try {
        const resp = await fetch('https://icanhazip.com');
        if (resp.ok) {
          const txt = (await resp.text()).trim();
          if (/^\d{1,3}(\.\d{1,3}){3}$/.test(txt)) clientIp = txt;
        }
      } catch (e) { }

      const payload = { Code: this.code };
      const config = {};
      if (clientIp) config.headers = { 'X-Real-IP': clientIp };

      try {
        const resp = await axios.post(authUrl + '/Account/loginWechatApi', payload, config);
        const data = resp.data;

        if (!data || data.success === false) {
          this.$messageError(data.message || '微信登录失败');
          return;
        }

        // 和 SecurityService 里的结构保持一致
        const userInfo = {
          userId: data.userId,
          username: data.username,
          roles: this.normalizeScanRoles(data.roles),
          state: data.state
        };

        if (!data.access_token) {
          this.$messageError('微信登录失败：未返回 access_token');
          return;
        }

        sessionStorage.setItem('access_token', data.access_token);
        sessionStorage.setItem('user_info', JSON.stringify(userInfo));
        axios.defaults.headers.common.Authorization = 'Bearer ' + data.access_token;

        const roles = userInfo.roles || [];
        if (userInfo.state === 'CustomRole' || roles.includes('CustomRole')) {
          this.$router.push('/employeemain/employeehome');
        } else {
          this.$router.push('/main/home');
        }
      } catch (error) {
        if (error.response && error.response.data) {
          this.$messageError(error.response.data.message || '微信登录失败');
        } else {
          this.$messageError(error.message || '微信登录失败');
        }
        this.getQrcode();
      }
    },

    tab(index) {
      this.current = index;
      if (index === 1) {
        this.isPwdLoginShow = true;
        this.isWxQrLoginShow = false;
      } else {
        this.isPwdLoginShow = false;
        this.isWxQrLoginShow = true;
        this.getwxqrImg();
      }
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    getServiceName(item, index) {
      return item.name || item.title || `客服${index + 1}号`;
    },
    openQqChat(qq) {
      window.open(`https://wpa.qq.com/msgrd?v=3&uin=${qq}&site=qq&menu=yes`, '_blank', 'noopener,noreferrer');
    }
  },
  beforeCreate() {
    const mgr = new Mgr();
    mgr.getSignedIn().then(
      (user) => {
        if (!user || user === '') return;
        const roles = user.roles || [];
        if (user.state === 'CustomRole' || roles.includes('CustomRole')) {
          this.$router.push('/employeemain/employeehome');
        } else {
          this.$router.push('/main/home');
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/newLogin/animate.min.css";
// @import "../../assets/newLogin/index.css";

.lh-page {
  --hero-content-width: 1300px;
  --hero-login-column-width: 520px;
  min-width: 1366px;
  min-height: 100vh;
  background: linear-gradient(180deg, #ffffff 0%, #f5f9ff 52%, #ffffff 100%);
  color: #17233c;
  font-family: "Helvetica Neue", Arial, "PingFang SC", "Microsoft Yahei", sans-serif;
}

.lh-main {
  padding-top: 88px;
}

.lh-hero {
  position: relative;
  width: 100%;
  min-height: 560px;
  margin: 0 auto;
  padding: 28px 0 22px;
  overflow: hidden;
  background:
    linear-gradient(90deg, #f7fbff 0%, #f1f7ff 22%, #eef5ff 50%, #f1f7ff 78%, #f7fbff 100%);
  box-shadow: inset 0 1px 0 #edf2fb, inset 0 -1px 0 #edf2fb;
}

.lh-hero::before,
.lh-hero::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.lh-hero::before {
  background:
    linear-gradient(145deg, rgba(224, 234, 249, 0.82) 0 16%, rgba(224, 234, 249, 0) 16% 100%),
    linear-gradient(36deg, rgba(235, 241, 252, 0.82) 0 22%, rgba(235, 241, 252, 0) 22% 100%),
    linear-gradient(152deg, rgba(220, 231, 249, 0) 0 83%, rgba(220, 231, 249, 0.6) 83% 100%);
  opacity: 0.95;
}

.lh-hero::after {
  background:
    radial-gradient(circle at 24% 44%, rgba(64, 129, 242, 0.08) 0, rgba(64, 129, 242, 0) 24%),
    radial-gradient(circle at 82% 28%, rgba(64, 129, 242, 0.07) 0, rgba(64, 129, 242, 0) 20%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.18) 0%, rgba(255, 255, 255, 0) 100%);
}

.lh-hero-shell::before {
  content: '';
  position: absolute;
  left: 48px;
  right: 48px;
  bottom: 22px;
  height: 180px;
  background:
    radial-gradient(circle at 18% 74%, rgba(76, 139, 248, 0.05) 0, rgba(76, 139, 248, 0) 26%),
    radial-gradient(circle at 82% 72%, rgba(76, 139, 248, 0.05) 0, rgba(76, 139, 248, 0) 22%);
  pointer-events: none;
}

.lh-hero-shell {
  position: relative;
  z-index: 1;
  width: min(var(--hero-content-width), calc(100% - 48px));
  min-height: 560px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 1fr) var(--hero-login-column-width);
  gap: 40px;
  align-items: center;
  background: transparent;
}

.lh-hero-copy {
  max-width: 688px;
  padding-left: 0;
  box-sizing: border-box;
}

.lh-hero-intro {
  padding-left: 6px;
}

.lh-hero-copy h1 {
  margin: 0 0 16px;
  font-size: 62px;
  line-height: 1.05;
  letter-spacing: 0;
  color: #10213d;
}

.lh-hero-copy h1 span {
  color: #126de8;
}

.lh-hero-copy p {
  max-width: 630px;
  margin: 0;
  color: #2f405d;
  font-size: 21px;
  line-height: 1.9;
}

.lh-actions {
  display: flex;
  gap: 14px;
  margin-top: 30px;
}

.lh-primary-action,
.lh-secondary-action,
.lh-submit {
  height: 46px;
  padding: 0 22px;
  border-radius: 8px;
  border: 1px solid transparent;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.lh-primary-action,
.lh-submit {
  color: #fff;
  background: linear-gradient(90deg, #126de8 0%, #2d8cff 100%);
  box-shadow: 0 14px 28px rgba(18, 109, 232, 0.22);
}

.lh-secondary-action {
  color: #126de8;
  background: #fff;
  border-color: #cfe3fb;
}

.lh-primary-action:hover,
.lh-secondary-action:hover,
.lh-submit:hover {
  transform: translateY(-1px);
}

.lh-hero-visual-img {
  display: block;
  width: min(648px, 100%);
  margin-top: 28px;
  object-fit: contain;
}

.lh-login-card {
  padding: 30px 28px;
  min-height: 484px;
  height: 484px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid #dce8f6;
  border-radius: 8px;
  box-shadow: 0 26px 70px rgba(42, 91, 151, 0.14);
  display: flex;
  flex-direction: column;
}

.lh-login-tabs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  padding: 0;
  margin-bottom: 28px;
  background: #fff;
  border-bottom: 1px solid #dfe8f4;
  border-radius: 0;
}

.lh-login-tabs button {
  position: relative;
  height: 50px;
  border: none;
  border-radius: 0;
  background: transparent;
  color: #2f405d;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
}

.lh-login-tabs button.active {
  color: #126de8;
  background: transparent;
  box-shadow: none;
}

.lh-login-tabs button.active::after {
  content: '';
  position: absolute;
  left: 16%;
  right: 16%;
  bottom: -1px;
  height: 3px;
  border-radius: 2px;
  background: #126de8;
}

.lh-form {
  min-height: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.lh-field {
  position: relative;
  display: block;
}

.lh-field-icon {
  position: absolute;
  left: 18px;
  top: 50%;
  z-index: 2;
  width: 18px;
  height: 18px;
  transform: translateY(-50%);
}

.lh-field-icon img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.lh-field::v-deep .el-input__inner {
  height: 56px;
  line-height: 56px;
  border: 1px solid #d8e4f2;
  border-radius: 8px;
  padding-left: 54px;
  color: #17233c;
  background: #fff;
  font-size: 15px;
}

.lh-field::v-deep .el-input__inner:focus {
  border-color: #2d8cff;
}

.lh-password-field::v-deep .el-input__inner {
  padding-right: 52px;
}

.lh-password-toggle {
  position: absolute;
  right: 16px;
  top: 50%;
  z-index: 3;
  width: 24px;
  height: 24px;
  padding: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  transform: translateY(-50%);
}

.lh-password-toggle img {
  display: block;
  width: 18px;
  height: 18px;
  margin: 0 auto;
  object-fit: contain;
}

.lh-captcha-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 166px;
  gap: 10px;
}

.lh-captcha {
  width: 166px;
  height: 56px;
  object-fit: contain;
  background: #f7fbff;
  border: 1px solid #d8e4f2;
  border-radius: 8px;
  cursor: pointer;
}

.lh-submit {
  width: 100%;
  height: 58px;
  margin-top: 8px;
  font-size: 20px;
}

.lh-submit:disabled {
  cursor: not-allowed;
  opacity: 0.72;
  transform: none;
}

.lh-register {
  margin-top: auto;
  padding-top: 8px;
  text-align: center;
  color: #6d7b91;
  font-size: 14px;
}

.lh-register span {
  color: #126de8;
  font-weight: 700;
  cursor: pointer;
}

.lh-qr-login {
  min-height: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
}

.lh-qr-box {
  position: relative;
  width: 190px;
  height: 190px;
  padding: 0;
  background: #fff;
  border: 1px solid #dce8f6;
  border-radius: 8px;
  box-shadow: inset 0 0 0 1px #f5f9ff;
  overflow: hidden;
}

.lh-qr-box.is-expired .lh-qr-image {
  filter: grayscale(0.15) blur(0.4px);
}

.lh-qr-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  display: block;
}

.lh-qr-loading {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #7a8aa3;
  font-size: 13px;
  background:
    linear-gradient(180deg, #fbfdff 0%, #f4f8fe 100%);
}

.lh-qr-expired-mask {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #fff;
  background: rgba(18, 33, 61, 0.62);
  border: none;
  cursor: pointer;
  backdrop-filter: blur(2px);
}

.lh-qr-expired-mask strong {
  font-size: 18px;
  line-height: 1.2;
  font-weight: 800;
}

.lh-qr-expired-mask span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 92px;
  height: 32px;
  padding: 0 14px;
  border: 1px solid rgba(255, 255, 255, 0.78);
  border-radius: 999px;
  font-size: 13px;
  font-weight: 700;
  background: rgba(255, 255, 255, 0.08);
}

.lh-qr-spinner {
  width: 28px;
  height: 28px;
  border: 3px solid #d8e4f2;
  border-top-color: #2d8cff;
  border-radius: 50%;
  animation: lh-qr-spin 0.9s linear infinite;
}

@keyframes lh-qr-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.lh-qr-login p {
  margin: 18px 0 16px;
  color: #687890;
  font-size: 14px;
}

.lh-refresh {
  margin-top: auto;
  width: 210px;
}

.lh-benefits {
  width: min(1300px, calc(100% - 48px));
  margin: 0 auto;
  padding: 18px 0 58px;
}

.lh-section-head {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  text-align: center;
}

.lh-section-head h2 {
  margin: 0;
  color: #14233d;
  font-size: 28px;
  line-height: 1.2;
}

.lh-section-mark {
  position: relative;
  width: 56px;
  height: 18px;
  flex: 0 0 auto;
}

.lh-section-mark::before,
.lh-section-mark::after {
  content: '';
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: #1a6df0;
  border-radius: 999px;
}

.lh-section-mark::before {
  left: 0;
  width: 14px;
  height: 6px;
}

.lh-section-mark::after {
  right: 0;
  width: 30px;
  height: 3px;
}

.lh-benefit-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0;
  margin-top: 30px;
  padding: 20px 8px;
  background: #fff;
  border: 1px solid #e4edf8;
  border-radius: 8px;
  box-shadow: 0 18px 42px rgba(50, 93, 152, 0.05);
}

.lh-benefit-card {
  display: flex;
  align-items: center;
  gap: 18px;
  min-height: 138px;
  padding: 14px 18px;
  background: transparent;
}

.lh-benefit-card:not(:last-child) {
  border-right: 1px solid #e8eef7;
}

.lh-benefit-icon {
  width: 74px;
  height: 74px;
  flex: 0 0 74px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: linear-gradient(180deg, #f3f7ff 0%, #eef3ff 100%);
}

.lh-benefit-icon.is-gold {
  background: linear-gradient(180deg, #fff4e8 0%, #ffeed9 100%);
}

.lh-benefit-icon.is-sky {
  background: linear-gradient(180deg, #eff6ff 0%, #e6f0ff 100%);
}

.lh-benefit-icon img {
  width: 34px;
  height: 34px;
  object-fit: contain;
}

.lh-benefit-copy {
  min-width: 0;
}

.lh-benefit-copy span {
  display: block;
  color: #14233d;
  font-size: 18px;
  font-weight: 800;
}

.lh-benefit-copy p {
  margin: 8px 0 0;
  color: #687890;
  font-size: 14px;
  line-height: 1.65;
}

.lh-service {
  position: fixed;
  left: 18px;
  top: 216px;
  z-index: 9998;
}

.lh-service-card {
  width: 128px;
  overflow: hidden;
  background: #fff;
  border: 1px solid #d9e5f5;
  border-radius: 8px;
  box-shadow: 0 18px 42px rgba(29, 70, 126, 0.14);
}

.lh-service-top {
  height: 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  background: linear-gradient(180deg, #126de8 0%, #237df6 100%);
}

.lh-service-top-title {
  margin-top: 8px;
  font-size: 17px;
  font-weight: 800;
}

.lh-service-headset {
  width: 34px;
  height: 34px;
  display: block;
  object-fit: contain;
}

.lh-service-mini {
  width: 42px;
  min-height: 118px;
  padding: 10px 8px;
  color: #fff;
  background: #126de8;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  line-height: 1.2;
  cursor: pointer;
  writing-mode: vertical-rl;
  letter-spacing: 2px;
}

.lh-service-empty {
  padding: 12px 0 4px;
  color: #7b8799;
  font-size: 13px;
  border-top: 1px solid #eef3fa;
}

.lh-service-title {
  height: 38px;
  line-height: 38px;
  padding: 0 10px;
  color: #4c5f78;
  font-size: 12px;
  background: #fff;
  border-bottom: 1px solid #eef3fa;
}

.lh-service-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  color: #53647c;
  text-decoration: none;
  border-bottom: 1px solid #eef3fa;
}

.lh-qq-penguin {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
}

.lh-qq-penguin img {
  display: block;
  width: 24px;
  height: 24px;
  object-fit: contain;
}

.lh-service-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 0;
}

.lh-service-link strong {
  display: block;
  color: #2d3f5f;
  font-size: 13px;
  line-height: 18px;
  font-weight: 700;
  word-break: break-all;
}

.lh-service-link em {
  display: block;
  margin-top: 2px;
  color: #126de8;
  font-size: 12px;
  line-height: 18px;
  font-style: normal;
  word-break: break-all;
}

.lh-service-close {
  width: calc(100% - 16px);
  height: 32px;
  margin: 10px 8px 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  color: #126de8;
  font-size: 14px;
  font-weight: 800;
  background: #eef6ff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.lh-service-close-icon {
  display: block;
  font-size: 15px;
  line-height: 1;
  transform: translateY(-1px);
}

@media (max-width: 1100px) {
  .lh-hero-shell {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .lh-login-card {
    max-width: 520px;
  }

  .lh-benefit-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .lh-main {
    padding-top: 76px;
  }

  .lh-hero-shell,
  .lh-benefits {
    width: calc(100% - 28px);
  }

  .lh-hero {
    min-height: auto;
    padding-top: 36px;
  }

  .lh-hero-copy {
    padding-left: 0;
  }

  .lh-hero-intro {
    padding-left: 0;
  }

  .lh-hero-copy h1 {
    font-size: 42px;
  }

  .lh-actions {
    flex-direction: column;
  }

  .lh-benefit-grid {
    grid-template-columns: 1fr;
    padding: 8px 0;
  }

  .lh-benefit-card:not(:last-child) {
    border-right: none;
    border-bottom: 1px solid #e8eef7;
  }

  .lh-service {
    display: none;
  }
}

/* 小屏下禁用位移（避免重叠） */
@media (max-width: 1000px) {

    .core.active,
    .advantage_item.active,
    .ai_left .item.active,
    .kefu.active,
    .core:hover,
    .advantage_item:hover,
    .ai_left .item:hover,
    .kefu:hover {
        transform: none;
        box-shadow: none;
        z-index: 1;
    }
}

.gs_title {
    background: var(--theme-color);
}

.social-signup-container {
    width: 220px;
    margin: 0px auto;

    .sign-btn {
        display: inline-block;
        cursor: pointer;
    }

    .icon {
        color: #fff;
        font-size: 24px;
        margin-top: 8px;
    }

    .wx-svg-container,
    .reg-svg-container,
    .qq-svg-container {
        display: inline-block;
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        padding-top: 1px;
        border-radius: 4px;
        margin-bottom: 20px;
        margin-right: 5px;
        border-radius: 50%;
    }

    .wx-svg-container {
        background-color: #24da70;
    }

    .qq-svg-container {
        background-color: #6ba2d6;
        margin-left: 40px;
    }

    .reg-svg-container {
        background-color: #afc2d3;
        margin-left: 40px;
        color: #fff;
    }
}

.container {
    background: url(../../assets/img/bg.png) no-repeat top center;
    background-size: 100% 922px;
}

.wrap {
    width: 1300px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 500px;
}

.wrap-img {
    width: 780px;
}

.header-box {
    height: 922px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    width: 100%;
}

.login-bg {
    background-color: rgba(255, 255, 255, 0.3);
    height: 500px;
    padding: 0;
    width: 100%;
}

.login-box {
  width: 360px;
  padding: 22px 20px 24px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.96);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.18);
  position: absolute;
  right: 6%;
  top: 16%;
}

.login-box .tabs {
    display: flex;
    justify-content: center;
    // margin: 30px 0 10px 0;
    line-height: 50px;
}

.login-box .tabs .tab-item {
    padding-bottom: 8px;
    margin: 0 30px;
    cursor: pointer;
}

.login-box .tabs .tab-item.active {
    color: #0195ff;
    border-bottom: #0195ff 2px solid;
}

.login-box .tab-content {
    margin: 0 45px;
    outline: none;
}

.login-box .tab-content .form {
    margin-top: auto;
}

.login-box .tab-content .form .input {
    display: flex;
    box-sizing: border-box;
    margin: 25px 0;
}

.login-box .tab-content .form .input a {
    color: #fff;
    text-decoration: none;
}

.login-box .tab-content .form .qrcode {
    width: 120px;
    border-radius: 8px;
    margin-left: 10px;
}

.login-box .tab-content .form .btn {
    width: 100%;
    height: 55px;
    border-radius: 40px;
    color: #fff;
    background-color: #0195ff;
    color: #fff;
    text-align: center;
    line-height: 55px;
    cursor: pointer;
    font-size: 18px;
}

.login-box .tab-content .form .btn.active {
    border: #11ae1f 1px solid;
    color: #11ae1f;
    border-radius: 40px;
    background-color: transparent;
}

.scan-box {
    display: flex;
    flex-direction: column;
    align-items: center;
}

/* QR 顶部状态与刷新样式 */
.qr-top {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
}

.expired-text {
    color: #e53935;
    font-weight: bold;
    margin-right: 8px;
}

.qr-refresh {
    cursor: pointer;
    font-size: 18px;
    user-select: none;
}

.service-box {
    background-image: url(../../assets/img/service2.png);
    background-repeat: no-repeat;
    background-size: 100%;
    height: 940px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
}

.service-box .bg {
    position: absolute;
    right: 0;
    bottom: 0;
    background-image: url(../../assets/img/service1.png);
    height: 500px;
    width: 100%;
}

.service-box .service {
    width: 1300px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
}

.service-box .service .navtitle {
    margin-bottom: 100px;
}

.service-box .service .navtitle .title {
    font-size: 36px;
    margin-bottom: 10px;
}

.service-box .service .navtitle .small {
    font-size: 14px;
}

.service-box .service .service-list {
    display: flex;
    justify-content: space-between;
}

.service-box .service .service-list .item {
    width: 305px;
    height: 417px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.service-box .service .service-list .item .icon {
    height: 90px;
    width: 90px;
    margin: 0 auto;
}

.service-box .service .service-list .item .title {
    font-weight: bold;
    font-size: 18px;
    margin: 50px 0 30px 0;
    text-align: center;
}

.service-box .service .service-list .item .desc {
    font-size: 14px;
    color: #666;
    line-height: 22px;
    margin: 0 20px;
}

.service-box .service .service-list .item .icon.icon1 {
    background-image: url(../../assets/img/service-icon-1.png);
}

.service-box .service .service-list .item .icon.icon1:hover {
    background-image: url(../../assets/img/service-icon-11.png);
}

.service-box .service .service-list .item .icon.icon2 {
    background-image: url(../../assets/img/service-icon-2.png);
}

.service-box .service .service-list .item .icon.icon2:hover {
    background-image: url(../../assets/img/service-icon-22.png);
}

.service-box .service .service-list .item .icon.icon3 {
    background-image: url(../../assets/img/service-icon-3.png);
}

.service-box .service .service-list .item .icon.icon3:hover {
    background-image: url(../../assets/img/service-icon-33.png);
}

.service-box .service .service-list .item .icon.icon4 {
    background-image: url(../../assets/img/service-icon-4.png);
}

.service-box .service .service-list .item .icon.icon4:hover {
    background-image: url(../../assets/img/service-icon-44.png);
}

.ability-box {
    background-image: url(../../assets/img/abilitybg.png);
    background-repeat: no-repeat;
    background-size: 1440px 458px;
    background-position: left center;
    min-height: 940px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    padding: 160px 0;
    position: relative;
}

.ability-box .service {
    width: 1300px;
    margin: 0 auto;
    position: relative;
    z-index: 2;
}

.ability-box .squerbg {
    width: 608px;
    height: 475px;
    background-color: #0195ff;
    position: absolute;
    top: 550px;
    right: 0;
}

.ability-box .service .navtitle {
    margin-bottom: 100px;
}

.ability-box .service .navtitle .title {
    font-size: 36px;
    margin-bottom: 10px;
}

.ability-box .service .navtitle .small {
    font-size: 14px;
}

.ability-box .service .service-list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
}

.ability-box .service .service-list .item {
    width: 305px;
    height: 420px;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    position: relative;
    margin-bottom: 30px;
    background-repeat: no-repeat;
    background-size: cover;
}

.ability-box .service .service-list .item.bg1 {
    background-image: url(../../assets/img/ability1.png);
}

.ability-box .service .service-list .item.bg2 {
    background-image: url(../../assets/img/ability2.png);
}

.ability-box .service .service-list .item.bg3 {
    background-image: url(../../assets/img/ability3.png);
}

.ability-box .service .service-list .item.bg4 {
    background-image: url(../../assets/img/ability4.png);
}

.ability-box .service .service-list .item.bg5 {
    background-image: url(../../assets/img/ability5.png);
}

.ability-box .service .service-list .item.bg6 {
    background-image: url(../../assets/img/ability6.png);
}

.ability-box .service .service-list .item.bg7 {
    background-image: url(../../assets/img/ability7.png);
}

.ability-box .service .service-list .item.bg8 {
    background-image: url(../../assets/img/ability8.png);
}

.ability-box .service .service-list .item.center {
    align-items: center;
    justify-content: center;
}

.ability-box .service .service-list .item .info {
    position: relative;
    z-index: 2;
    color: #fff;
    padding: 40px 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    width: 305px;
    height: 420px;
}

.ability-box .service .service-list .item .info:hover {
    background-color: rgba(1, 149, 255, 0.7);
    width: 305px;
    height: 420px;
    box-sizing: border-box;
}

.ability-box .service .service-list .item .info .btn {
    border: #fff 1px solid;
    border-radius: 30px;
    width: 135px;
    cursor: pointer;
    margin: auto auto 0 auto;
    text-align: center;
    padding: 10px 0;
    display: none;
}

.ability-box .service .service-list .item .info:hover .btn {
    display: block;
}

.ability-box .service .service-list .item .info:hover .plus {
    display: none;
}

.ability-box .service .service-list .item .info .btn:hover {
    color: #ffff00;
}

.ability-box .service .service-list .item .info .title {
    font-size: 30px;
    margin-bottom: 20px;
}

.ability-box .service .service-list .item .info.bg {
    text-align: center;
}

.ability-box .service .service-list .item .info .desc {
    font-size: 16px;
    line-height: 22px;
}

.ability-box .service .service-list .item .plus {
    position: relative;
    z-index: 2;
    margin: 0 30px;
    margin-top: auto;
    text-align: right;
}

/* 使整体容器保持原有布局，同时把登录区更靠右并模拟示例的 banner + 绝对定位登录框 */
.header-box {
    height: 922px;
    box-sizing: border-box;
    width: 100%;
    position: relative;
    display: block;
}

/* 保留背景半透明层 */
.login-bg {
    background-color: rgba(255, 255, 255, 0.0);
    height: 500px;
    padding: 0;
    width: 100%;
}

/* 宽度限制并对齐：保持大图与登录框并列 */
.wrap {
    width: 1300px;
    margin: 0 auto;
    position: relative;
    height: 500px;
}

/* 大图片保持原样 */
.wrap-img {
    width: 780px;
    display: block;
}

/* 将登录框定位为示例中右侧绝对定位样式，并增加顶部黄色条 */
.login-box {
    width: 420px;
    position: absolute;
    right: 6%;
    top: 12%;
    background-color: rgba(255, 255, 255, 0.96);
    border-radius: 8px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    padding: 18px 20px 26px 20px;
    box-sizing: border-box;
    display: block;
}

/* tabs 保持横向，但微调位置 */
.login-box .tabs {
    display: flex;
    justify-content: center;
    margin-bottom: 6px;
    line-height: 40px;
}

/* tab 样式更紧凑 */
.login-box .tabs .tab-item {
    padding: 6px 18px;
    margin: 0 12px;
    cursor: pointer;
    font-weight: 600;
}

/* 选中样式保持 */
.login-box .tabs .tab-item.active {
    color: #0195ff;
    border-bottom: #0195ff 2px solid;
}

/* 表单区域风格，参考示例内的输入块 */
.login-box .tab-content {
    margin: 6px 0 0 0;
    outline: none;
}

/* 每条输入行样式（与示例靠近） */
.login-box .tab-content .form .input {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    margin: 12px 0;
    padding: 6px 8px;
    border-bottom: 1px solid #efefef;
}

/* 小图标容器（为了与示例图标对齐） */
.login-box .tab-content .form .input .login-image-box {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
}

.login-box .tab-content .form .input .login-image-box img {
    width: 22px;
    height: 22px;
}

/* 针对 element-ui 输入框内部样式调整，使其看起来像示例原生 input */
.login-box .el-input__inner {
    height: 38px;
    line-height: 38px;
    border-radius: 4px;
    padding-left: 8px;
    border: none;
    background: transparent;
    box-shadow: none;
}

/* 验证码行，使图片靠右并缩小，示例是 38px 高 */
.login-box .tab-content .form .qrcode {
    width: 100px;
    height: 38px;
    border-radius: 4px;
    margin-left: 8px;
    object-fit: cover;
    cursor: pointer;
    border: 1px solid #eee;
}

/* 登录按钮样式，参考示例 submit-style */
.login-box .tab-content .form .btn,
.login-box .submit-style {
    width: 100%;
    height: 40px;
    border-radius: 4px;
    color: #fff;
    background-color: #3c58db;
    text-align: center;
    line-height: 42px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    border: none;
    margin-top: 6px;
    display: inline-block;
    box-shadow: 0 6px 18px rgba(255, 177, 59, 0.18);
}

/* 辅助文字、注册链接样式 */
.social-signup-container {
    width: 100%;
    margin: 8px 0 0 0;
    text-align: center;
    font-size: 14px;
}

.social-signup-container span {
    cursor: pointer;
    margin-left: 8px;
}

/* 二维码登录区域样式统一调整 */
.scan-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 8px;
}

/* 顶部提示与刷新图标 */
.qr-top {
    display: flex;
    align-items: center;
    margin-bottom: 8px;
    justify-content: center;
}

.expired-text {
    color: #e53935;
    font-weight: 600;
    margin-right: 8px;
}

.qr-refresh {
    cursor: pointer;
    font-size: 18px;
    user-select: none;
}

/* 响应式：屏幕较窄时，将登录框改为相对布局 */
@media (max-width: 1200px) {
    .wrap {
        width: 100%;
        padding: 0 20px;
    }

    .login-box {
        position: relative;
        right: auto;
        top: auto;
        margin: 20px auto 0 auto;
        width: calc(100% - 40px);
    }

    .wrap-img {
        display: none;
    }
}

.page-wrap {
    font-family: "Helvetica Neue", Arial, "PingFang SC", "Microsoft Yahei", sans-serif;
    background: #fff;
}

/* banner 与登录布局 */
.head_box {
    background: url(../../assets/img/banner-home.jpg) center center no-repeat;
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

/* 登录区 */
.width_new {
    position: absolute;
    right: 6%;
    top: 122px;
}

.login-box {
    width: 300px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    padding: 18px 20px 26px;
    box-sizing: border-box;
    position: relative;
    min-height: 335px;
}

/* 标签栏切换图标 */
.login-box-label {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
}
.login-box-label .tab-item {
  flex: 1;
  text-align: center;
  padding: 10px 0;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  font-weight: 600;
}

.login-box-label .tab-item.active {
  color: #0d6efd;
  border-bottom-color: #0d6efd;
}
.login-e {
    font-size: 18px;
    font-weight: 700;
}

.toggle-img {
    height: 38px;
    cursor: pointer;
}

/* 输入行 */
.login-input {
    display: flex;
    align-items: center;
    margin: 12px 0;
    box-sizing: border-box;
}

.login-image-box {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
}

.login-image-box img {
    width: 22px;
    height: 22px;
}

.inputbox {
    flex: 1;
    height: 38px;
    line-height: 38px;
    border: 1px solid #eee;
    padding: 6px 10px;
    border-radius: 4px;
    box-sizing: border-box;
}

/* 验证码行 */
.code-row {
    border-bottom: none;
}

.verify-img {
    width: 100px;
    height: 38px;
    margin-left: 10px;
    border-radius: 4px;
    object-fit: cover;
    cursor: pointer;
    border: 1px solid #eee;
}

/* 错误/链接 */
.error-box {
    height: 20px;
    margin-top: 6px;
}

.link-row {
    margin: 10px 0 0 0;
    justify-content: center;
    font-size: 14px;
}

.free_riget {
    color: #1976ff;
    cursor: pointer;
    margin-left: 8px;
}

/* 登录按钮 */
.submit-style {
    width: 100%;
    height: 48px;
    border-radius: 24px;
    color: #fff;
    background-color: #ffb13b;
    text-align: center;
    line-height: 48px;
    cursor: pointer;
    font-size: 16px;
    font-weight: 600;
    border: none;
    margin-top: 6px;
    display: inline-block;
}

/* 二维码图 */
.wx-image {
    width: 170px;
    height: 170px;
    display: block;
    margin: 12px auto;
    object-fit: contain;
}

/* 优势小块 */
.select-box {
    // margin-top: 520px;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    display: flex;
    justify-content: space-between;
    gap: 0;
    position: relative;
    top: -80px;
    height: 220px;
    background: #fff;
    border-radius: 10px;
    box-shadow: 0px 5px 2px #ddd;
}

.loop-activity {
    display: flex;
    align-items: center;
    gap: 12px;
    background: #fff;
    padding: 18px;
    border-radius: 8px;
    // box-shadow: 0 4px 14px rgba(0,0,0,0.06);
    flex: 1;
}

.loop-activity img {
    width: 100px;
    height: 100px;
    margin-left: 15px;
}

.activity-label {
    font-weight: 700;
    margin-bottom: 6px;
}

.activity-content {
    color: #666;
    font-size: 13px;
    line-height: 18px;
}

.fixed-section {
    width: 100%;
    //   background: #fff;
    padding: 40px 0;
    box-sizing: border-box;
}

.fixed-section .label_box {
    max-width: 1200px;
    margin: 0 auto 24px;
    text-align: center;
}

.fixed-section .label_title {
    font-size: 26px;
    font-weight: 700;
    color: #222;
}

.fixed-section .label_content {
    color: #666;
    margin-top: 6px;
    font-size: 16px;
}

/* 核心优势 */
.core_box {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    gap: 20px;
    justify-content: space-between;
    flex-wrap: wrap;
}

.core {
    flex: 1;
    min-width: 280px;
    display: initial;
    gap: 16px;
    align-items: flex-start;
    background: #fafafa;
    padding: 18px;
    border-radius: 8px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.04);
    height: 390px;
}

.core div {
    text-align: center;
    margin: 16px 0;
}

.core img {
    width: 100px;
    height: 100px;
    object-fit: contain;
}

.core_detail .core-name {
    font-weight: 700;
    font-size: 18px;
    margin: 16px 0;
    color: #333333;
}

.core_detail .core-text {
    color: #333333;
    line-height: 2.0;
    font-size: 16px;
    text-align: left;
    margin: 16px 0;
}

/* 免费福利 / 优势卡片 */
.advantage_box {
  max-width: 1200px;
  margin: 0 auto 18px;
  display: grid;
  grid-template-columns: repeat(4, minmax(240px, 1fr));
  gap: 18px;
}

.advantage_item {
    background: #fff;
    border-radius: 10px;
    padding: 40px 30px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.04);
    flex: 1 1 20%;
    min-width: 240px;
    display: flex;
    gap: 14px;
    align-items: flex-start;
    height: 99px;
}

.advantage_item img {
    width: 68px;
    height: 68px;
    object-fit: contain;
}

.advantage_text h1 {
    font-size: 20px;
    margin: 0 0 6px 0;
    font-weight: 700;
}

.advantage_text p {
    margin: 0;
    color: #666;
    font-size: 15px;
    line-height: 1.8;
}

.advantage_item .tag {
    font-size: 12px;
    color: #1976ff;
    margin-left: 8px;
}

/* AI 区 */
.ai_content {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    gap: 24px;
    align-items: flex-start;
    box-sizing: border-box;
    margin-top: 60px;
}

.ai_left {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    width: 100%;
}

.ai_left .item {
    background: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.04);
    flex: 1 1 15%;
    min-width: 180px;
    text-align: center;
}

.ai_left .item .icon {
    width: 70px;
    height: 70px;
    object-fit: contain;
    margin-bottom: 8px;
}

.ai_left .item h1 {
    font-size: 20px;
    margin: 0 0 8px;
    font-weight: 700;
    border-bottom: 1px solid #ddd;
    padding-bottom: 30px;
}

.ai_left .item .text p {
    margin: 0;
    color: #666;
    font-size: 13px;
    line-height: 2.8;
}

/* 选择我们的理由（更小卡片） */
.advantage_box.small {
    gap: 12px;
}

.advantage_box.small .advantage_item {
    flex: 1 1 30%;
    min-width: 220px;
    padding: 16px;
}

/* 联系我们（客服） */
.kefu_box {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    gap: 18px;
    flex-wrap: wrap;
    justify-content: space-flex-start;
}

.kefu {
    background: #fff;
    border-radius: 8px;
    padding: 12px;
    display: flex;
    gap: 12px;
    align-items: center;
    flex: 1 1 30%;
    max-width: 368px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.04);
}

.kefu img {
    width: 106px;
    height: 113px;
    object-fit: contain;
}

.kefu_detail .kefu-name {
    font-weight: 700;
    font-size: 18px;
    line-height: 36px;
}

.kefu_detail .kefu-number {
    color: #666;
    font-size: 18px;
    line-height: 26px;
    letter-spacing: 1px;
}

/* 页脚 */
.foot_box {
    background: #0f1724;
    color: #cbd5e1;
    padding: 30px 0;
}

.footer {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    gap: 20px;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
}

.footer-cons {
    max-width: 720px;
}

.footer-cons p {
    margin: 4px 0;
    color: #9aa6b2;
    font-size: 13px;
    line-height: 1.6;
}

.footer-cons img {
    max-height: 56px;
    margin-right: 8px;
}

/* 小屏适配 */
@media (max-width: 1000px) {

    .core_box,
    .advantage_box,
    .ai_left,
    .kefu_box {
        flex-direction: column;
        gap: 12px;
    }

    .fixed-section {
        padding: 28px 12px;
    }

    .footer {
        padding: 0 12px;
    }
}

.animate__pulse {
    -webkit-animation-name: pulse;
    animation-name: pulse;
    -webkit-animation-timing-function: ease-in-out;
    animation-timing-function: ease-in-out
}

.kefus:hover {
    transform: translateY(-8px);
    transition: 0.2s;
}

.advantages_item:hover {
    transform: translateY(-8px);
}

.cores_box:hover {
    transform: translateY(-8px);
    transition: 0.2s;
}

.ais_bg:hover {
    width: 220px;
    background-color: rgb(0, 144, 255);
    text-align: center;
    padding: 20px;
    box-shadow: 1px 2px 10px rgba(100, 100, 100, 0.2);
    transition: all 0.3s;
    animation-fill-mode: none;
}

/* AI 卡片 hover/选中：文字强制白色 */
.ai_left .item.ais_bg:hover,
.ai_left .item.active {
    color: #fff;
}

.ai_left .item.ais_bg:hover .text p,
.ai_left .item.active .text p,
.ai_left .item.ais_bg:hover h1,
.ai_left .item.active h1 {
    color: #fff !important;
}

.ai_left .item.ais_bg:hover h1,
.ai_left .item.active h1 {
    border-bottom-color: rgba(255, 255, 255, 0.35);
}
</style>
