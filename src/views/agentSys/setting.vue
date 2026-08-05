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
                :http-request="uploadLogo"
                :before-upload="beforeLogoUpload"
              >
                <el-button type="primary" plain :loading="uploading">选择Logo</el-button>
              </el-upload>
              <p class="field-help">支持PNG、JPG、WEBP，最大3MB，建议尺寸250×50。</p>
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
      uploading: false,
      logoUrl: '',
      logoAvailable: false,
      form: {
        siteName: '',
        domain: '',
        contactQq: ''
      },
      rules: {
        domain: [{ validator: validateDomain, trigger: 'blur' }],
        contactQq: [{ pattern: /^\d{5,11}$/, message: '请输入5-11位QQ号码', trigger: 'blur' }]
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
        this.logoUrl = this.absoluteApiUrl(data.logoUrl);
        this.logoAvailable = !!this.logoUrl;
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
    async uploadLogo(options) {
      this.uploading = true;
      const form = new FormData();
      form.append('file', options.file);
      try {
        const response = await this.$api.agent.uploadSiteLogo(form);
        this.logoUrl = this.absoluteApiUrl(response.data.logoUrl);
        this.logoAvailable = true;
        this.$messageSuccess('Logo上传成功');
      } catch (error) {
        this.$messageError(error.message || 'Logo上传失败');
      } finally {
        this.uploading = false;
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

.logo-actions {
  display: flex;
  align-items: flex-start;
  gap: 12px;

  .field-help {
    margin-top: 4px;
  }
}
</style>
