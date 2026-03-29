<!-- eslint-disable eqeqeq -->
<!-- eslint-disable no-dupe-keys -->
<template>
    <div class="page-wrap">
        <login-header style="position: fixed"></login-header>
        <div
            style="position: fixed;top: 160px;background-color: #29A7E2;color: white;z-index: 999999;padding: 15px 10px;min-height: 180px;border-radius: 15px;">
            <div style="display: flex;">
                <div
                    style="width: 35px;display: flex;flex-direction: column;align-items: center;align-content: center;justify-content: center;">
                    <img src="../../assets/images/qq.png" style="width: 30px;height: 30px;" />
                    <span style="font-size: 22px;text-align: center;">
                        在线客服
                    </span>
                    <img v-if="qqShow" @click="qqShow = false" src="../../assets/images/right.png"
                        style="width: 30px;height: 30px;" />
                    <img v-if="!qqShow" @click="qqShow = true" src="../../assets/images/left.png"
                        style="width: 30px;height: 30px;" />
                </div>
                <div v-if="qqShow"
                    style="margin-left: 20px;background-color: white;color: grey;padding: 0 10px;justify-content: center;align-items: center;display: flex;flex-direction: column;border-radius: 15px;">
                    <div style="font-size: 16px;text-align: center;">
                        <span
                            style="font-size: 18px;font-weight: bold;color: black;text-align: center;width: 100%;">在线客服</span>
                    </div>
                    <div v-for="item in serviceQq" :key="item.qq" style="margin-top: 10px;">
                        <div
                            style="margin-top: 5px;font-size: 16px;display: flex;align-items: center;border-bottom: 1px solid #E6E4E4;padding-bottom: 10px;">
                            <span style="font-size: 14px;">{{ item.name }}:</span>
                            <a :href="`tencent://message/?uin=${item.qq}&Site=xxx&Menu=yes`"
                                style="margin-left: 10px;color: #29A7E2;font-weight: bold;">
                                <img src="../../assets/images/online.png" style="vertical-align: middle;" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="head_box">
            <div class="banner-box">
                <span class="banner-link" target="_blank">
                    <img src="../../assets/newLogin/banner-pic.png" class="banner-pic" />
                </span>

                <div class="width_new">
                    <div class="login-box right">
                        <div class="yello_line"></div>

                        <!-- 账号登录 -->
                        <div v-show="isPwdLoginShow" class="account-login" id="account-login">
                            <div class="login-box-label">
                                <span class="login-e">登录账号</span>
                                <img class="right toggle-img" src="../../assets/newLogin/login-code.png"
                                    @click="tab(2)" />
                            </div>

                            <form @submit.prevent="singin">
                                <div class="login-input">
                                    <div class="login-image-box left">
                                        <img src="../../assets/newLogin/icon4.png" alt="" />
                                    </div>
                                    <el-input placeholder="请输入登录帐号" v-model="form.username"
                                        :disabled="false"></el-input>
                                </div>

                                <div class="login-input">
                                    <div class="login-image-box left">
                                        <img src="../../assets/newLogin/icon5.png" alt="" />
                                    </div>
                                    <el-input placeholder="请输入密码" v-model="form.password" :disabled="false"
                                        show-password></el-input>
                                </div>

                                <div class="login-input code-row">
                                    <div class="code-input-box left">
                                        <div class="login-image-box left">
                                            <img src="../../assets/newLogin/icon6.png" alt="" />
                                        </div>
                                        <!-- <div><input class="inputbox code" style="width: 100px;" id="Verify" maxlength="10" placeholder="验证码" v-model="form.code" /></div> -->
                                    </div>
                                    <el-input placeholder="请输入验证码" :disabled="false" v-model="form.code"
                                        style="flex: 1"></el-input>
                                    <img class="qrcode" id="code" style="width: 100px; height: 38px" alt=""
                                        :src="randomCode" v-on:click="getQrcode()" />
                                </div>

                                <button type="button" class="submit-style" @click="singin" :disabled="isLoading">
                                    {{ isLoading ? '登录中' : '登录' }}
                                </button>

                                <div class="login-input link-row">
                                    <div class="left">
                                        <span class="no_account">还没有账号？</span>
                                        <span class="free_riget"
                                            @click="$router.push('/login/loginregister')">免费注册</span>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <!-- 二维码登录 -->
                        <div v-show="isWxQrLoginShow" class="wetch-login" id="wetch-login">
                            <div class="login-box-label">
                                <span class="login-e">二维码登录</span>
                                <img class="right toggle-img" src="../../assets/newLogin/login-pwd.png"
                                    @click="tab(1)" />
                            </div>

                            <img class="wx-image" :src="qrCodeUrl || '../../assets/images/qrcode.png'" />

                            <div class="login-input" style="margin-top: -20px;border: none;text-align: center">
                                <span class="wetch-login-tip" style="text-align: center;width: 100%;">请先绑定公众号再使用</span>
                            </div>

                            <div class="qr-actions" v-if="qrCodeUrl">
                                <button type="button" class="submit-style" @click="getwxqrImg">刷新二维码</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="select-box"
            v-hover-active="{ inView: true, inViewAnimation: 'animate__animated animate__backInUp', once: true }">
            <div class="loop-activity">
                <img src="../../assets/newLogin/icon1.png" />
                <div class="activity-detail">
                    <div class="activity-label">新程序高能</div>
                    <div class="activity-content">
                        PCI-DSS安全认证<br>
                        多节点高防服务器支持秒速链接<br>
                        365天保障平台实时流畅高效访问
                    </div>
                </div>
            </div>
            <div class="loop-activity">
                <img src="../../assets/newLogin/icon2.png" />
                <div class="activity-detail">
                    <div class="activity-label">功能强 超便捷</div>
                    <div class="activity-content">
                        稳定运营十年，诚信共赢<br>
                        全新功能待您接入<br>
                        多渠道稳定高效
                    </div>
                </div>
            </div>
            <div class="loop-activity">
                <img src="../../assets/newLogin/icon3.png" />
                <div class="activity-detail">
                    <div class="activity-label">可靠承载重托</div>
                    <div class="activity-content">更多个性化服务功能持续更新中...</div>
                </div>
            </div>
        </div>
        <section class="fixed-section core-advantage"
            v-hover-active="{ inView: true, inViewAnimation: 'animate__animated animate__backInUp', once: true }">
            <div class="label_box">
                <div class="label_title">七星·核心优势</div>
                <div class="label_content">欢迎您来电来函咨询洽谈!</div>
            </div>
            <div class="core_box">
                <div class="core" v-hover-active="{ animation: 'cores_box', enterDelay: 80 }">
                    <div><img src="../../assets/newLogin/icon11.png" height="80" alt="" /></div>
                    <div class="core_detail">
                        <div class="core-name">专业技术服务</div>
                        <div class="core-text">正规订单空中分账，按照合同规定进行订单分账，全称任何环节，不会也无法触碰到任何一
                            方的分润，且所有资金没有沉淀直接分账到各方的虚拟账户中去，有执牌三方进行结算。</div>
                    </div>
                </div>
                <div class="core" v-hover-active="{ animation: 'cores_box', enterDelay: 80 }">
                    <div><img src="../../assets/newLogin/icon10.png" height="80" alt="" /></div>
                    <div class="core_detail">
                        <div class="core-name">合规合法运营</div>
                        <div class="core-text">银联/网银进行转接清算，支付公司进行审核管理及资金清分，真正规避二清风险； 支付公司提供
                            财务认可的业务凭证，解决三流合一问题。 中国支付清算协会对系统代码审核查验，确认分账系统的合规性、真实性的同时，
                            确保游戏运营商的资金绝对归属权。</div>
                    </div>
                </div>
                <div class="core" v-hover-active="{ animation: 'cores_box', enterDelay: 80 }">
                    <div><img src="../../assets/newLogin/icon12.png" height="80" alt="" /></div>
                    <div class="core_detail">
                        <div class="core-name">超强管理守护资金安全</div>
                        <div class="core-text">轻松三步完成系统接入，让游戏数字化运营更便捷，最大程度保障客户业务稳定性和连续性。
                            准确、高效、灵活的结算方式，为广大商户提供收款后随时查账、实时对账等服务。</div>
                    </div>
                </div>
            </div>
        </section>
        <section class="fixed-section free-benefit"
            v-hover-active="{ inView: true, inViewAnimation: 'animate__animated animate__backInLeft', once: true }">
            <div class="label_box">
                <div class="label_title">免费福利</div>
                <div class="label_content"></div>
            </div>
            <div class="advantage_box">
                <div class="advantage_item" v-hover-active="{ animation: 'advantages_item', enterDelay: 80 }">
                    <img src="../../assets/newLogin/mf1.png" />
                    <div class="advantage_text">
                        <h1>全自动智能开区助手<span class="tag">(包安装)</span></h1>
                        <p>定制级自研超强助手一次简单设置无限智能循环真正解放双手开区合区无忧永久包安装包售后</p>
                    </div>
                </div>
                <div class="advantage_item" v-hover-active="{ animation: 'advantages_item', enterDelay: 80 }">
                    <img src="../../assets/newLogin/mf2.png" />
                    <div class="advantage_text">
                        <h1>新微信动态密保验证<span class="tag">(包安装)</span></h1>
                        <p>最新版微信动态密保验证速度更快更准紧跟市场不断更新</p>
                    </div>
                </div>
                <div class="advantage_item" v-hover-active="{ animation: 'advantages_item', enterDelay: 80 }">
                    <img src="../../assets/newLogin/mf3.png" />
                    <div class="advantage_text">
                        <h1>定制版超强会员站程序</h1>
                        <p>免架设，节约服务器成本，登录后台一键管理会员站程序所有网站模块，10分即可打造专属会员站。</p>
                    </div>
                </div>
            </div>
            <div class="advantage_box">
                <div class="advantage_item" v-hover-active="{ animation: 'advantages_item', enterDelay: 80 }">
                    <img src="../../assets/newLogin/mf4.png" />
                    <div class="advantage_text">
                        <h1>公众号集成便携功能</h1>
                        <p>微信公众号集成所有功能，使用便捷，每笔交易实时提醒。</p>
                    </div>
                </div>
                <div class="advantage_item" v-hover-active="{ animation: 'advantages_item', enterDelay: 80 }">
                    <img src="../../assets/newLogin/mf5.png" />
                    <div class="advantage_text">
                        <h1>免费高防空间、低价服务器</h1>
                        <p>免费400G高防空间，真实防御，无视攻击，并享受全网最低的各地机房价格。</p>
                    </div>
                </div>
                <div class="advantage_item" v-hover-active="{ animation: 'advantages_item', enterDelay: 80 }">
                    <img src="../../assets/newLogin/mf6.png" />
                    <div class="advantage_text">
                        <h1>低折扣封挂插件、登录器</h1>
                        <p>享受主流封挂插件、登录器、各类开区小工具等优惠政策</p>
                    </div>
                </div>
            </div>
            <div class="advantage_box">
                <div class="advantage_item" v-hover-active="{ animation: 'advantages_item', enterDelay: 80 }">
                    <img src="../../assets/newLogin/mf7.png" />
                    <div class="advantage_text">
                        <h1>独创发布站精准来路统计</h1>
                        <p>区别于传统来路统计，独创自研精湛统计方法，多维度统计玩家真实在线、点击、来路、充值等数据，助力高效开区快人一步。</p>
                    </div>
                </div>
                <div class="advantage_item" v-hover-active="{ animation: 'advantages_item', enterDelay: 80 }">
                    <img src="../../assets/newLogin/mf8.png" />
                    <div class="advantage_text">
                        <h1>独创交易积分兑换实物奖品</h1>
                        <p>全网唯一交易量即得积分系统，可直接兑换:手机、平板、键鼠等实物豪礼，多位作商共同见证真实有效。</p>
                    </div>
                </div>
                <div class="advantage_item" v-hover-active="{ animation: 'advantages_item', enterDelay: 80 }">
                    <img src="../../assets/newLogin/mf9.png" />
                    <div class="advantage_text">
                        <h1>游戏内扫码&一键通区充值</h1>
                        <p>独创游戏内便捷扫码付款，无需跳出 外部浏览器充值，便捷通区充值。</p>
                    </div>
                </div>
            </div>
        </section>
        <section class="fixed-section ai_box"
            v-hover-active="{ inView: true, inViewAnimation: 'animate__animated animate__backInLeft', once: true }">
            <div class="label_box">
                <div class="label_title">提供国内卓越、快速、稳定的传奇计费助手</div>
                <div class="label_content">安全可靠的支付平台程序满足你游戏支付的全面需要</div>
            </div>
            <div class="ai_content">
                <div class="ai_left">
                    <div class="item" v-hover-active="{ animation: 'ais_bg', enterDelay: 80 }">
                        <img src="../../assets/newLogin/icon_a1.png" class="icon a1">
                        <h1>多种比例模式</h1>
                        <div class="text">
                            <p>多渠道</p>
                            <p>多种收费方式</p>
                            <p>及时稳定</p>
                            <p>安全高效</p>
                            <p>PCI-DSS安全认证</p>
                        </div>
                    </div>
                    <div class="item" v-hover-active="{ animation: 'ais_bg', enterDelay: 80 }">
                        <img src="../../assets/newLogin/icon_a2.png" class="icon a1">
                        <h1>多种秒结算方式</h1>
                        <div class="text">
                            <p>24小时随提随结</p>
                            <p>最快一分钟到账</p>
                            <p>传统结算模式</p>
                            <p>秒结算模式</p>
                            <p>自由切换</p>
                        </div>
                    </div>
                    <div class="item" v-hover-active="{ animation: 'ais_bg', enterDelay: 80 }">
                        <img src="../../assets/newLogin/icon_a3.png" class="icon a1">
                        <h1>多种比例模式</h1>
                        <div class="text">
                            <p>不黑单</p>
                            <p>秒结算</p>
                            <p>九年平台</p>
                            <p>您值得拥有</p>
                            <p>支持来路统计</p>
                        </div>
                    </div>
                    <div class="item" v-hover-active="{ animation: 'ais_bg', enterDelay: 80 }">
                        <img src="../../assets/newLogin/icon_a4.png" class="icon a1">
                        <h1>急速定时整区补发</h1>
                        <div class="text">
                            <p>自动提交售卡</p>
                            <p>自动提交换卡</p>
                            <p>为您提供</p>
                            <p>多途径</p>
                            <p>点卡解决方案</p>
                        </div>
                    </div>
                    <div class="item" v-hover-active="{ animation: 'ais_bg', enterDelay: 80 }">
                        <img src="../../assets/newLogin/icon_a5.png" class="icon a1">
                        <h1>功能一步到位</h1>
                        <div class="text">
                            <p>7x24小时贴心客服</p>
                            <p>资金安全</p>
                            <p>服务省心</p>
                            <p>功能齐全</p>
                            <p>让您安心放心</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="fixed-section free-benefit"
            v-hover-active="{ inView: true, inViewAnimation: 'animate__animated animate__backInLeft', once: true }">
            <div class="label_box">
                <div class="label_title">选择我们的理由</div>
                <div class="label_content"></div>
            </div>
            <div class="advantage_box">
                <div class="advantage_item" v-hover-active="{ animation: 'advantages_item', enterDelay: 80 }">
                    <img src="../../assets/newLogin/in_icon_1.png" />
                    <div class="advantage_text">
                        <h1>高效便捷</h1>
                        <p>快速对接多种支付渠道，产品功能齐全，高效易管理的商户作业平台。</p>
                    </div>
                </div>
                <div class="advantage_item" v-hover-active="{ animation: 'advantages_item', enterDelay: 80 }">
                    <img src="../../assets/newLogin/in_icon_2.png" />
                    <div class="advantage_text">
                        <h1>降低成本</h1>
                        <p>简单快速的接入方式，缩短开发周期降低研发成本，实现快速上线。</p>
                    </div>
                </div>
                <div class="advantage_item" v-hover-active="{ animation: 'advantages_item', enterDelay: 80 }">
                    <img src="../../assets/newLogin/in_icon_3.png" />
                    <div class="advantage_text">
                        <h1>轻松对账</h1>
                        <p>轻松查看账户明细，降低企业在财务人员对账方面的投入，交易数据清晰明了。</p>
                    </div>
                </div>
            </div>
            <div class="advantage_box">
                <div class="advantage_item" v-hover-active="{ animation: 'advantages_item', enterDelay: 80 }">
                    <img src="../../assets/newLogin/in_icon_4.png" />
                    <div class="advantage_text">
                        <h1>快速服务</h1>
                        <p>成熟完善的售前与售后服务，1V1专属销售客服跟进，7X24小时提供技术支持。</p>
                    </div>
                </div>
                <div class="advantage_item" v-hover-active="{ animation: 'advantages_item', enterDelay: 80 }">
                    <img src="../../assets/newLogin/in_icon_5.png" />
                    <div class="advantage_text">
                        <h1>系统稳定</h1>
                        <p>多机房异地容灾系统，专业的运维团队值守，稳如磐石的系统保障。</p>
                    </div>
                </div>
                <div class="advantage_item" v-hover-active="{ animation: 'advantages_item', enterDelay: 80 }">
                    <img src="../../assets/newLogin/in_icon_6.png" />
                    <div class="advantage_text">
                        <h1>信息安全</h1>
                        <p>所有数据信息全程HTTPS传输加密，通过调用数字签名验证ACL权限进行控制。</p>
                    </div>
                </div>
            </div>
        </section>

        <section class="fixed-section contact"
            v-hover-active="{ inView: true, inViewAnimation: 'animate__animated animate__backInLeft', once: true }">
            <div class="label_box">
                <div class="label_title">专属客服QQ</div>
                <div class="label_content">新用户请选择某个客服进行联系，协助您完成注册并签约。</div>
            </div>
            <div class="kefu_box">
                <div class="kefu" v-for="(item, idx) in serviceQq" :key="idx"
                    v-hover-active="{ animation: 'kefus', enterDelay: 80 }">
                    <img src="../../assets/newLogin/icon8.png" alt="">
                    <div class="kefu_detail">
                        <div class="kefu-name">{{ item.name }}:{{ item.qq }}</div>
                        <div class="kefu-number">{{ item.desc }}</div>
                        <div style="height: 27px;margin-top: 15px;">
                            <a :href="`tencent://message/?uin=${item.qq}&Site=xxx&Menu=yes`">
                                <img style="width: 74px;height: 23px;" src="../../assets/newLogin/QQ.gif" alt="">
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
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
      wxqrimgurl: '',
      wxvalidKey: '',
      randomCode:
                'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==',
      appid: 'wx937e63f717108262',
      scope: 'snsapi_login',
      redirect_uri: 'http://localhost:5000/External/WeixinOpen',
      qrCodeUrl: '../../assets/images/qrcode.png',
      returnUrl: '',
      code: '',
      qqShow: true
    };
  },
  created() {
    this.footerInfo();
  },
  mounted() {
    this.getQrcode();
  },
  methods: {
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
              const userInfo = {
                userId: res.userId,
                username: res.username || '', // 若后端没返回，可以留空或再补一接口
                roles: res.roles || [], // 同上
                state: res.state || null
              };

              // 存储 token + 用户信息
              localStorage.setItem('access_token', res.access_token);
              localStorage.setItem('user_info', JSON.stringify(userInfo));
              axios.defaults.headers.common.Authorization = 'Bearer ' + res.access_token;

              const roles = userInfo.roles || [];
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
      this.$api.login.getLoginQrCode({
        returnUrl: ReturnUrl
      }).then((res) => {
        // console.log(res);
        this.qrCodeUrl = res.data.qrCodeUrl;
        this.code = res.data.code;
        this.timer = setInterval(() => {
          this.checkBindWeixi();
        }, 1000);
      }).catch((err) => {
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
      this.isLoading = true;
      // 简单前端校验
      if (!this.form.username || !this.form.password || !this.form.code) {
        this.$messageError('请输入账号、密码和验证码');
        return;
      }

      axios.defaults.withCredentials = true;

      // 获取公网 IPv4（原逻辑保留，可选）
      //   let clientIp = null;
      //   try {
      //     const resp = await fetch('https://v4.ident.me');
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

        // 2）根据角色/状态跳转，完全不再依赖 ReturnUrl/OIDC
        const user = result.user;
        const roles = user.roles || [];

        if (user.state === 'CustomRole' || roles.includes('CustomRole')) {
          this.$router.push('/employeemain/employeehome');
        } else {
          this.$router.push('/main/home');
        }
      } catch (error) {
        if (error.response && error.response.data) {
          this.$messageError(error.response.data.message || '登录失败');
        } else {
          this.$messageError(error.message || '登录失败');
        }
        this.getQrcode();
        // console.error(error);
      } finally {
        // 清理密码
        this.isLoading = false;
      }
    },

    // 微信扫码登录成功后的逻辑：这里你目前还是走 loginWechatApi + ReturnUrl，
    // 如果后端也改成返回 JSON + /connect/token，可以参照 singin 的方式再改一遍。
    async scansingin() {
      axios.defaults.withCredentials = true;

      let clientIp = null;
      try {
        const resp = await fetch('https://v4.ident.me');
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
          roles: data.roles,
          state: data.state
        };

        if (!data.access_token) {
          this.$messageError('微信登录失败：未返回 access_token');
          return;
        }

        localStorage.setItem('access_token', data.access_token);
        localStorage.setItem('user_info', JSON.stringify(userInfo));
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
    width: 440px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 20px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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

/* 顶部黄色细条 —— 示例中的 yello_line */
.login-box::before {
    content: "";
    display: block;
    height: 6px;
    width: 100%;
    border-radius: 4px 4px 0 0;
    background: linear-gradient(90deg, #ffd24d 0%, #ffb13b 100%);
    margin: -18px calc(-20px) 12px calc(-20px);
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
    background: #f5f5f5;
}

/* banner 与登录布局 */
.head_box {
    background: url(../../assets/newLogin/banner.jpg) center top no-repeat;
    height: 700px;
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
    top: 186px;
}

.login-box {
    width: 300px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    padding: 18px 20px 26px;
    box-sizing: border-box;
    position: relative;
    min-height: 355px;
}

.yello_line {
    height: 6px;
    // width: 100%;
    border-radius: 4px 4px 0 0;
    background: linear-gradient(90deg, #ffd24d 0%, #ffb13b 100%);
    margin: -18px -20px 12px -20px;
}

/* 标签栏切换图标 */
.login-box-label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
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
    display: flex;
    gap: 18px;
    flex-wrap: wrap;
    justify-content: space-between;
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
