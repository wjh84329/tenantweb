<template>
  <div class="site-setting-page">
    <div class="gs_title">网站设置</div>
    <div class="setting-card" v-loading="loading">
      <div class="setting-intro">
        <strong>代理独立站点</strong>
        <span>配置后，代理域名访问商户端时优先使用这里的名称、Logo 和联系QQ。</span>
      </div>

      <el-form ref="settingForm" :model="form" :rules="rules" label-width="120px" class="setting-form">
        <el-form-item label="网站名称" prop="siteName">
          <el-input v-model.trim="form.siteName" maxlength="100" placeholder="例如：某某充值服务" />
          <p class="field-help">未填写时显示平台默认名称。</p>
        </el-form-item>

        <el-form-item label="代理域名" prop="domain">
          <el-input v-model.trim="form.domain" placeholder="例如：https://pay.example.com" />
          <p class="field-help">域名会写入数据库，并自动加入商户端和授权服务的跨域白名单；请同时完成DNS和Nginx解析。</p>
        </el-form-item>

        <el-form-item label="联系QQ" prop="contactQq">
          <el-input v-model.trim="form.contactQq" maxlength="11" placeholder="请输入5-11位QQ号码" />
          <p class="field-help">代理域名的登录首页、注册页和联系我们页面会优先显示此QQ。</p>
        </el-form-item>

        <el-form-item label="平台技术QQ" prop="platformSupportQq">
          <el-input v-model.trim="form.platformSupportQq" maxlength="11" placeholder="请输入5-11位QQ号码" />
          <p class="field-help">代理商户端右侧“平台技术”入口使用；留空时使用平台默认QQ。</p>
        </el-form-item>

        <el-form-item label="助手技术QQ" prop="assistantSupportQq">
          <el-input v-model.trim="form.assistantSupportQq" maxlength="11" placeholder="请输入5-11位QQ号码" />
          <p class="field-help">代理商户端右侧“助手技术”入口使用；留空时使用平台默认QQ。</p>
        </el-form-item>

        <div class="setting-section-title">底部主体与备案</div>
        <p class="legal-tip">代理域名不会继承平台的主体和备案信息。未填写的项目不会在代理网站底部显示。</p>

        <el-form-item label="版权所有信息" prop="footerCopyright">
          <el-input
            v-model.trim="form.footerCopyright"
            maxlength="300"
            placeholder="例如：某某网络科技有限公司 版权所有"
          />
        </el-form-item>

        <el-form-item label="ICP备案号" prop="icpNumber">
          <el-input v-model.trim="form.icpNumber" maxlength="100" placeholder="例如：鄂ICP备XXXXXXXX号-X" />
          <p class="field-help">填写后自动跳转到工信部备案查询网站。</p>
        </el-form-item>

        <el-form-item label="公安备案号" prop="publicSecurityNumber">
          <el-input
            v-model.trim="form.publicSecurityNumber"
            maxlength="100"
            placeholder="例如：鄂公网安备 XXXXXXXXXXXXXX号"
          />
          <p class="field-help">没有公安备案可留空；填写后会按其中数字生成公安备案查询链接。</p>
        </el-form-item>

        <el-form-item label="首页Logo">
          <div class="logo-setting">
            <div class="logo-preview logo-preview--light">
              <img v-if="homeLogoUrl && homeLogoAvailable" :src="homeLogoUrl" alt="代理首页Logo" @error="homeLogoAvailable = false" />
              <span v-else>暂未上传</span>
            </div>
            <div class="logo-actions">
              <el-upload
                action="#"
                :show-file-list="false"
                :http-request="options => uploadLogo(options, 'home')"
                :before-upload="beforeLogoUpload"
              >
                <el-button type="primary" plain :loading="uploadingHomeLogo">选择Logo</el-button>
              </el-upload>
              <p class="field-help">用于未登录首页、登录页等白色背景场景，支持PNG、JPG、WEBP，最大3MB，建议尺寸250×50。</p>
            </div>
          </div>
        </el-form-item>

        <el-form-item label="网站Logo">
          <div class="logo-setting">
            <div class="logo-preview">
              <img v-if="logoUrl && logoAvailable" :src="logoUrl" alt="代理网站Logo" @error="logoAvailable = false" />
              <span v-else>暂未上传</span>
            </div>
            <div class="logo-actions">
              <el-upload
                action="#"
                :show-file-list="false"
                :http-request="options => uploadLogo(options, 'site')"
                :before-upload="beforeLogoUpload"
              >
                <el-button type="primary" plain :loading="uploadingSiteLogo">选择Logo</el-button>
              </el-upload>
              <p class="field-help">用于登录后的商户后台、代理后台等主题色背景场景，支持PNG、JPG、WEBP，最大3MB，建议尺寸250×50。</p>
            </div>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" :loading="saving" @click="saveSetting">保存网站设置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { url as tenantApiUrl } from '../../assets/js/version';

const apiBase = String(tenantApiUrl || '').replace(/\/+$/, '');

export default {
  name: 'AgentSiteSetting',
  data() {
    const validateDomain = (rule, value, callback) => {
      if (!value) return callback();
      const candidate = value.indexOf('://') > -1 ? value : `https://${value}`;
      try {
        const parsed = new URL(candidate);
        if (!/^https?:$/.test(parsed.protocol) || !parsed.hostname) throw new Error('invalid');
        callback();
      } catch (e) {
        callback(new Error('请输入正确的网站域名'));
      }
    };
    return {
      loading: false,
      saving: false,
      uploadingHomeLogo: false,
      uploadingSiteLogo: false,
      logoUrl: '',
      logoAvailable: false,
      homeLogoUrl: '',
      homeLogoAvailable: false,
      form: {
        siteName: '',
        domain: '',
        contactQq: '',
        platformSupportQq: '',
        assistantSupportQq: '',
        footerCopyright: '',
        icpNumber: '',
        publicSecurityNumber: ''
      },
      rules: {
        domain: [{ validator: validateDomain, trigger: 'blur' }],
        contactQq: [{ pattern: /^\d{5,11}$/, message: '请输入5-11位QQ号码', trigger: 'blur' }],
        platformSupportQq: [{ pattern: /^\d{5,11}$/, message: '请输入5-11位QQ号码', trigger: 'blur' }],
        assistantSupportQq: [{ pattern: /^\d{5,11}$/, message: '请输入5-11位QQ号码', trigger: 'blur' }]
      }
    };
  },
  created() {
    this.loadSetting();
  },
  methods: {
    absoluteApiUrl(path) {
      if (!path) return '';
      if (/^https?:\/\//i.test(path)) return path;
      return `${apiBase}${path.charAt(0) === '/' ? path : `/${path}`}`;
    },
    async loadSetting() {
      this.loading = true;
      try {
        const response = await this.$api.agent.getSiteSetting();
        const data = response.data || {};
        this.form.siteName = data.siteName || '';
        this.form.domain = data.domain || '';
        this.form.contactQq = data.contactQq || '';
        this.form.platformSupportQq = data.platformSupportQq || '';
        this.form.assistantSupportQq = data.assistantSupportQq || '';
        this.form.footerCopyright = data.footerCopyright || '';
        this.form.icpNumber = data.icpNumber || '';
        this.form.publicSecurityNumber = data.publicSecurityNumber || '';
        this.logoUrl = this.absoluteApiUrl(data.logoUrl);
        this.logoAvailable = !!this.logoUrl;
        this.homeLogoUrl = this.absoluteApiUrl(data.homeLogoUrl);
        this.homeLogoAvailable = !!this.homeLogoUrl;
      } catch (error) {
        this.$messageError(error.message || '网站设置加载失败');
      } finally {
        this.loading = false;
      }
    },
    saveSetting() {
      this.$refs.settingForm.validate(async valid => {
        if (!valid) return;
        this.saving = true;
        try {
          await this.$api.agent.saveSiteSetting(this.form);
          this.$messageSuccess('网站设置保存成功');
          await this.loadSetting();
        } catch (error) {
          this.$messageError(error.message || '网站设置保存失败');
        } finally {
          this.saving = false;
        }
      });
    },
    beforeLogoUpload(file) {
      const allowed = ['image/png', 'image/jpeg', 'image/webp'].includes(file.type);
      if (!allowed) {
        this.$messageError('Logo仅支持PNG、JPG或WEBP格式');
        return false;
      }
      if (file.size > 3 * 1024 * 1024) {
        this.$messageError('Logo图片不能超过3MB');
        return false;
      }
      return true;
    },
    async uploadLogo(options, logoType) {
      const isHomeLogo = logoType === 'home';
      if (isHomeLogo) {
        this.uploadingHomeLogo = true;
      } else {
        this.uploadingSiteLogo = true;
      }
      const form = new FormData();
      form.append('file', options.file);
      form.append('logoType', isHomeLogo ? 'home' : 'site');
      try {
        const response = await this.$api.agent.uploadSiteLogo(form);
        if (isHomeLogo) {
          this.homeLogoUrl = this.absoluteApiUrl(response.data.logoUrl);
          this.homeLogoAvailable = true;
        } else {
          this.logoUrl = this.absoluteApiUrl(response.data.logoUrl);
          this.logoAvailable = true;
        }
        this.$messageSuccess('Logo上传成功');
      } catch (error) {
        this.$messageError(error.message || 'Logo上传失败');
      } finally {
        if (isHomeLogo) {
          this.uploadingHomeLogo = false;
        } else {
          this.uploadingSiteLogo = false;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.site-setting-page {
  min-height: 800px;
  background: #fff;
}

.gs_title {
  height: 40px;
  line-height: 40px;
  padding-left: 22px;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  background: var(--theme-color);
}

.setting-card {
  padding: 32px 54px 48px;
}

.setting-intro {
  display: flex;
  align-items: baseline;
  gap: 14px;
  margin-bottom: 30px;
  padding: 16px 20px;
  color: #526078;
  background: #f4f8ff;
  border-left: 4px solid var(--theme-color);

  strong {
    color: #17233d;
    font-size: 16px;
  }
}

.setting-form {
  width: 760px;
  max-width: 100%;

  ::v-deep .el-input {
    width: 430px;
    max-width: 100%;
  }
}

.field-help {
  margin: 7px 0 0;
  color: #8a94a6;
  font-size: 12px;
  line-height: 1.5;
}

.setting-section-title {
  margin: 30px 0 8px 120px;
  color: #17233d;
  font-size: 15px;
  font-weight: 600;
}

.legal-tip {
  margin: 0 0 18px 120px;
  color: #d97706;
  font-size: 12px;
  line-height: 1.6;
}

.logo-setting {
  display: flex;
  align-items: center;
  gap: 20px;
}

.logo-preview {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 250px;
  height: 50px;
  box-sizing: border-box;
  overflow: hidden;
  color: #a1a9b8;
  background: #f8fafc;
  border: 1px dashed #cdd6e5;
  border-radius: 4px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.logo-preview--light {
  background: #fff;
}

.logo-actions {
  display: flex;
  align-items: flex-start;
  gap: 12px;

  .field-help {
    margin-top: 4px;
  }
}
</style>
