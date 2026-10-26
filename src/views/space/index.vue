<template>
  <div class="space-page">
    <div class="space-head"><h2>网站空间</h2><el-button icon="el-icon-refresh" circle @click="load" /></div>
    <div v-if="loading" class="loading"><i class="el-icon-loading" /> 正在读取空间信息</div>
    <div v-else-if="loadError" class="load-error">
      <el-alert :title="loadError" type="error" :closable="false" show-icon />
      <el-button type="primary" plain @click="load">重新加载</el-button>
    </div>
    <el-alert v-else-if="!status.featureEnabled" title="平台暂未开启空间功能" type="info" :closable="false" />
    <div v-else-if="!status.opened" class="empty">
      <i class="el-icon-folder-opened" /><p>尚未开通网站空间</p>
      <el-button type="primary" :loading="opening" @click="open">开通空间</el-button>
    </div>
    <template v-else>
      <div class="summary">
        <div><span>访问地址</span><a :href="status.url" target="_blank">{{ status.url }}</a></div>
        <div><span>空间标识</span><strong>{{ status.merchantUuid }}</strong></div>
        <div><span>已用容量</span><strong>{{ size(status.usedBytes) }} / {{ size(status.quotaBytes) }}</strong></div>
        <el-progress :percentage="percentage" :stroke-width="10" />
      </div>
      <div class="upload">
        <h3>发布网站</h3>
        <el-upload drag action="" accept=".zip" :auto-upload="false" :limit="1" :on-change="select" :on-remove="remove">
          <i class="el-icon-upload" /><div class="el-upload__text">将 ZIP 文件拖到此处，或<em>点击选择</em></div>
        </el-upload>
        <el-button type="primary" icon="el-icon-upload2" :loading="uploading" :disabled="!file" @click="upload">上传并发布</el-button>
      </div>
    </template>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      status: {},
      file: null,
      loading: false,
      loadError: '',
      opening: false,
      uploading: false
    };
  },
  computed: { percentage() { return Math.min(100, Math.round(Number(this.status.usedBytes || 0) * 100 / Number(this.status.quotaBytes || 1))); } },
  created() { this.load(); },
  methods: {
    size(v) { const n = Number(v || 0); return n >= 1073741824 ? (n / 1073741824).toFixed(2) + ' GB' : (n / 1048576).toFixed(2) + ' MB'; },
    async load() {
      this.loading = true;
      this.loadError = '';
      try {
        const r = await this.$api.space.status();
        this.status = r.data || {};
      } catch (error) {
        this.loadError = (error && error.message) || '空间信息加载失败，请稍后重试';
      } finally {
        this.loading = false;
      }
    },
    async open() { this.opening = true; try { await this.$api.space.open(); this.$message.success('空间开通成功'); await this.load(); } finally { this.opening = false; } },
    select(file) { this.file = file.raw; },
    remove() { this.file = null; },
    async upload() {
      this.uploading = true;
      try {
        const r = await this.$api.space.uploadToken();
        const form = new FormData(); form.append('file', this.file);
        await axios.post(r.data.uploadUrl, form, { headers: { 'X-Space-Upload-Token': r.data.token } });
        this.$message.success('网站发布成功'); this.file = null; await this.load();
      } catch (error) {
        const message = error && error.response && error.response.data && error.response.data.error;
        this.$message.error(message || '网站发布失败');
      } finally { this.uploading = false; }
    }
  }
};
</script>
<style scoped>
.space-page{padding:28px;max-width:900px}.space-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:22px}.space-head h2{margin:0;font-size:22px}.loading{padding:70px 20px;text-align:center;color:#66788a}.load-error .el-button{margin-top:16px}.empty{padding:70px 20px;text-align:center;background:#fff;border:1px solid #e7ebf0}.empty i{font-size:52px;color:#8aa0b8}.empty p{color:#66788a}.summary,.upload{background:#fff;border:1px solid #e7ebf0;padding:24px;margin-bottom:18px}.summary>div{display:flex;margin-bottom:16px}.summary span{width:110px;color:#778899}.summary a{color:#2869d8}.upload h3{margin:0 0 18px}.upload .el-button{margin-top:18px}
</style>
