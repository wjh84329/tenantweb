<template>
  <div class="space-page">
    <div class="page-head">
      <div><h2>网站空间</h2><p>管理静态网站文件、赠送域名和自定义域名</p></div>
      <div><el-button icon="el-icon-refresh" circle title="刷新" @click="load" /><el-button type="primary" icon="el-icon-plus" @click="showCreate">新建空间</el-button></div>
    </div>
    <div v-if="loading" class="state"><i class="el-icon-loading" /> 正在读取空间信息</div>
    <div v-else-if="loadError" class="state"><el-alert :title="loadError" type="error" :closable="false" show-icon /><el-button type="primary" plain @click="load">重新加载</el-button></div>
    <el-alert v-else-if="!status.featureEnabled" title="平台暂未开启空间功能" type="info" :closable="false" />
    <div v-else class="workspace">
      <aside class="space-list">
        <button v-for="item in spaces" :key="item.id" :class="['space-item', { active: item.id === selectedId }]" @click="selectSpace(item.id)">
          <strong>{{ item.name }}</strong><span>{{ item.categoryName }}</span><small>{{ size(item.usedBytes) }} / {{ size(item.quotaBytes) }}</small>
        </button>
        <div v-if="!spaces.length" class="no-space">尚未创建空间</div>
      </aside>
      <main v-if="current" class="space-main">
        <section class="summary">
          <div class="summary-title"><div><h3>{{ current.name }}</h3><a :href="current.url" target="_blank">{{ current.url }}</a></div><el-dropdown @command="spaceCommand"><el-button icon="el-icon-more" circle /><el-dropdown-menu slot="dropdown"><el-dropdown-item command="rename">修改名称</el-dropdown-item><el-dropdown-item command="prefix">修改赠送域名</el-dropdown-item><el-dropdown-item v-if="!current.isDefault" command="delete" divided>删除空间</el-dropdown-item></el-dropdown-menu></el-dropdown></div>
          <el-progress :percentage="percentage" :stroke-width="8" /><div class="usage">已用 {{ size(current.usedBytes) }}，共 {{ size(current.quotaBytes) }}</div>
        </section>
        <el-tabs v-model="tab" @tab-click="tabChanged">
          <el-tab-pane label="文件管理" name="files">
            <div class="file-toolbar">
              <el-breadcrumb separator-class="el-icon-arrow-right"><el-breadcrumb-item><button @click="goPath(-1)">根目录</button></el-breadcrumb-item><el-breadcrumb-item v-for="(part,index) in pathParts" :key="index"><button @click="goPath(index)">{{ part }}</button></el-breadcrumb-item></el-breadcrumb>
              <div><el-button icon="el-icon-folder-add" @click="createFolder">新建文件夹</el-button><el-button type="primary" icon="el-icon-upload2" @click="$refs.fileInput.click()">上传文件</el-button><input ref="fileInput" class="hidden-input" type="file" multiple @change="uploadFiles"></div>
            </div>
            <div class="file-browser" @contextmenu.prevent="showBlankMenu">
              <el-table v-loading="filesLoading" :data="files" empty-text="此目录暂无文件" @row-dblclick="openItem" @row-contextmenu="showItemMenu">
                <el-table-column width="48"><template slot-scope="s"><i :class="s.row.isDirectory ? 'el-icon-folder' : 'el-icon-document'" /></template></el-table-column>
                <el-table-column prop="name" label="名称" min-width="260"><template slot-scope="s"><button class="file-name" @click="openItem(s.row)">{{ s.row.name }}</button></template></el-table-column>
                <el-table-column label="大小" width="120"><template slot-scope="s">{{ s.row.isDirectory ? '-' : size(s.row.size) }}</template></el-table-column>
                <el-table-column label="操作" width="190"><template slot-scope="s"><el-button v-if="editable(s.row)" type="text" @click="editFile(s.row)">编辑</el-button><el-button type="text" @click="renameItem(s.row)">重命名</el-button><el-button type="text" class="danger" @click="deleteItem(s.row)">删除</el-button></template></el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="域名设置" name="domains">
            <section class="settings-band"><h3>赠送域名</h3><div class="domain-row"><a :href="current.url" target="_blank">{{ current.url }}</a><el-button type="text" @click="copy(current.url)">复制</el-button></div><p>域名前缀可在空间菜单中修改。</p></section>
            <section class="settings-band"><h3>绑定自定义域名</h3><p>请将自定义域名设置 CNAME 到 <strong>{{ current.cnameTarget }}</strong></p><div class="domain-add"><el-input v-model.trim="domainInput" placeholder="例如 www.example.com" /><el-button @click="copy(current.cnameTarget)">复制 CNAME</el-button><el-button type="primary" @click="addDomain">添加</el-button></div>
              <el-table :data="current.domains || []"><el-table-column prop="domain" label="域名" /><el-table-column label="状态" width="110"><template slot-scope="s"><el-tag :type="s.row.isVerified ? 'success' : 'warning'">{{ s.row.isVerified ? '已验证' : '待验证' }}</el-tag></template></el-table-column><el-table-column label="操作" width="150"><template slot-scope="s"><el-button v-if="!s.row.isVerified" type="text" @click="verifyDomain(s.row)">验证</el-button><el-button type="text" class="danger" @click="removeDomain(s.row)">删除</el-button></template></el-table-column></el-table>
            </section>
          </el-tab-pane>
          <el-tab-pane label="整站发布" name="deploy">
            <section class="settings-band"><h3>ZIP 整站发布</h3><p>上传后会整体替换当前网站文件。单个文件请使用文件管理中的上传。</p><el-upload drag action="" accept=".zip" :auto-upload="false" :limit="1" :file-list="zipList" :on-change="selectZip" :on-remove="removeZip"><i class="el-icon-upload" /><div class="el-upload__text">拖入 ZIP 文件，或<em>点击选择</em></div></el-upload><el-button type="primary" icon="el-icon-upload2" :loading="deploying" :disabled="!zipFile" @click="deployZip">上传并发布</el-button></section>
          </el-tab-pane>
          <!-- 暂时隐藏独立空间卡页签，后续需要恢复时移除 v-if 即可。 -->
          <el-tab-pane v-if="false" label="空间卡" name="card">
            <section class="settings-band"><h3>兑换空间卡</h3><p>空间卡可以延长当前空间有效期或提升配额，也可以创建新空间。</p><div class="card-redeem"><el-input v-model.trim="cardCode" placeholder="输入空间卡卡号" /><el-button type="primary" @click="redeemCard">兑换到当前空间</el-button></div></section>
          </el-tab-pane>
        </el-tabs>
      </main>
      <main v-else class="empty"><i class="el-icon-folder-opened" /><p>创建第一个网站空间开始使用</p><el-button type="primary" @click="showCreate">新建空间</el-button></main>
    </div>
    <el-dialog title="新建网站空间" :visible.sync="createVisible" width="520px"><el-form :model="createForm" label-width="110px"><el-form-item label="空间卡号" required><el-input v-model.trim="createForm.cardCode" maxlength="64" placeholder="请输入未使用的空间卡号" /></el-form-item><el-form-item label="空间名称"><el-input v-model.trim="createForm.name" maxlength="100" /></el-form-item><el-form-item label="空间分类"><el-select v-model="createForm.spaceCategoryId"><el-option v-for="item in status.categories" :key="item.id" :label="item.name" :value="item.id" /></el-select></el-form-item><el-form-item label="赠送域名"><el-input v-model.trim="createForm.hostPrefix" placeholder="自定义域名前缀"><template slot="append">.{{ selectedGiftDomain }}</template></el-input><div class="form-help">3-63 位小写字母、数字或连字符，留空时自动生成</div></el-form-item></el-form><span slot="footer"><el-button @click="createVisible=false">取消</el-button><el-button type="primary" :loading="creating" @click="createSpace">使用空间卡创建</el-button></span></el-dialog>
    <el-dialog :title="editorPath" :visible.sync="editorVisible" width="760px"><el-input v-model="editorContent" type="textarea" :rows="20" resize="vertical" /><span slot="footer"><el-button @click="editorVisible=false">取消</el-button><el-button type="primary" :loading="saving" @click="saveFile">保存</el-button></span></el-dialog>
    <div v-if="contextMenu.visible" class="file-context-menu" :style="{ left: contextMenu.x + 'px', top: contextMenu.y + 'px' }" @click.stop @contextmenu.prevent>
      <template v-if="contextMenu.item">
        <button v-if="contextMenu.item.isDirectory || editable(contextMenu.item)" @click="contextAction('open')"><i :class="contextMenu.item.isDirectory ? 'el-icon-folder-opened' : 'el-icon-edit'" />{{ contextMenu.item.isDirectory ? '打开' : '编辑' }}</button>
        <button @click="contextAction('copy')"><i class="el-icon-document-copy" />复制</button>
        <button @click="contextAction('rename')"><i class="el-icon-edit-outline" />重命名</button>
        <button class="danger" @click="contextAction('delete')"><i class="el-icon-delete" />删除</button>
      </template>
      <template v-else>
        <button @click="contextAction('new-file')"><i class="el-icon-document-add" />新建文件</button>
        <button @click="contextAction('new-folder')"><i class="el-icon-folder-add" />新建文件夹</button>
        <button @click="contextAction('upload')"><i class="el-icon-upload2" />上传文件</button>
        <button :disabled="!fileClipboard" @click="contextAction('paste')"><i class="el-icon-document-copy" />粘贴</button>
      </template>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
const gatewayClient = axios.create({ timeout: 50000 });
delete gatewayClient.defaults.headers.common.Authorization;

export default {
  data() { return { status: { categories: [], spaces: [] }, selectedId: null, tab: 'files', loading: false, loadError: '', filesLoading: false, files: [], currentPath: '', gateway: null, createVisible: false, creating: false, createForm: { cardCode: '', name: '', hostPrefix: '', spaceCategoryId: null }, domainInput: '', zipFile: null, zipList: [], deploying: false, editorVisible: false, editorPath: '', editorContent: '', saving: false, cardCode: '', contextMenu: { visible: false, x: 0, y: 0, item: null }, fileClipboard: null }; },
  computed: {
    spaces() { return this.status.spaces || []; },
    current() { return this.spaces.find(x => x.id === this.selectedId) || null; },
    percentage() { return this.current ? Math.min(100, Math.round(Number(this.current.usedBytes || 0) * 100 / Number(this.current.quotaBytes || 1))) : 0; },
    pathParts() { return this.currentPath ? this.currentPath.split('/') : []; },
    selectedGiftDomain() { const item = (this.status.categories || []).find(x => x.id === this.createForm.spaceCategoryId); return item ? item.giftBaseDomain : 'haocz.com'; }
  },
  created() { this.load(); },
  mounted() { document.addEventListener('click', this.closeContextMenu); window.addEventListener('resize', this.closeContextMenu); window.addEventListener('scroll', this.closeContextMenu, true); },
  beforeDestroy() { document.removeEventListener('click', this.closeContextMenu); window.removeEventListener('resize', this.closeContextMenu); window.removeEventListener('scroll', this.closeContextMenu, true); },
  methods: {
    size(v) { const n = Number(v || 0); if (n < 1024) return n + ' B'; if (n < 1048576) return (n / 1024).toFixed(1) + ' KB'; if (n < 1073741824) return (n / 1048576).toFixed(1) + ' MB'; return (n / 1073741824).toFixed(2) + ' GB'; },
    errorText(error, fallback) { const value = error && error.response && error.response.data; return (value && (value.error || value.message)) || (typeof value === 'string' ? value : '') || fallback; },
    async load() { this.loading = true; this.loadError = ''; try { const r = await this.$api.space.status(); this.status = r.data || { categories: [], spaces: [] }; if (!this.spaces.some(x => x.id === this.selectedId)) this.selectedId = this.spaces.length ? this.spaces[0].id : null; if (this.current && this.tab === 'files') await this.listFiles(); } catch (e) { this.loadError = this.errorText(e, '空间信息加载失败，请稍后重试'); } finally { this.loading = false; } },
    showCreate() { const first = (this.status.categories || [])[0]; this.createForm = { cardCode: '', name: '我的网站', hostPrefix: '', spaceCategoryId: first ? first.id : null }; this.createVisible = true; },
    async createSpace() { if (!this.createForm.cardCode) return this.$message.warning('请输入空间卡号'); if (!this.createForm.name) return this.$message.warning('请输入空间名称'); this.creating = true; try { const r = await this.$api.space.open(this.createForm); this.createVisible = false; await this.load(); this.selectedId = r.data.id; await this.listFiles(); this.$message.success('空间创建成功'); } catch (e) { this.$message.error(this.errorText(e, '空间创建失败')); } finally { this.creating = false; } },
    async selectSpace(id) { this.closeContextMenu(); this.selectedId = id; this.currentPath = ''; this.gateway = null; if (this.tab === 'files') await this.listFiles(); },
    async gatewayAuth() { if (!this.gateway || this.gateway.spaceId !== this.selectedId || this.gateway.expiresAt * 1000 < Date.now() + 15000) { const r = await this.$api.space.accessToken(this.selectedId); this.gateway = { ...r.data, spaceId: this.selectedId }; } return this.gateway; },
    async gatewayRequest(config) { const auth = await this.gatewayAuth(); config.url = auth.gatewayUrl + config.url; config.headers = { ...(config.headers || {}), 'X-Space-Upload-Token': auth.token }; return gatewayClient(config); },
    async listFiles() { if (!this.current) return; this.filesLoading = true; try { const r = await this.gatewayRequest({ method: 'get', url: '/api/files', params: { path: this.currentPath } }); this.files = r.data.items || []; this.current.usedBytes = r.data.usedBytes; } catch (e) { this.$message.error(this.errorText(e, '文件列表读取失败')); } finally { this.filesLoading = false; } },
    join(name) { return [this.currentPath, name].filter(Boolean).join('/'); }, openItem(item) { if (item.isDirectory) { this.currentPath = this.join(item.name); this.listFiles(); } else if (this.editable(item)) this.editFile(item); },
    goPath(index) { this.currentPath = index < 0 ? '' : this.pathParts.slice(0, index + 1).join('/'); this.listFiles(); }, editable(item) { return !item.isDirectory && /\.(html?|css|js|json|txt|xml|md|csv|svg)$/i.test(item.name); },
    fileNameOptions(inputValue) { return { inputValue, inputPattern: /^[^\\/:*?"<>|.][^\\/:*?"<>|]*$/, inputErrorMessage: '名称不正确' }; },
    async createFile() { const r = await this.$prompt('请输入文件名称', '新建文件', this.fileNameOptions('index.html')); await this.gatewayRequest({ method: 'post', url: '/api/files/content', data: { path: this.join(r.value), content: '' } }); await this.listFiles(); },
    async createFolder() { const r = await this.$prompt('请输入文件夹名称', '新建文件夹', { inputPattern: /^[^\\/:*?"<>|.][^\\/:*?"<>|]*$/, inputErrorMessage: '文件夹名称不正确' }); await this.gatewayRequest({ method: 'post', url: '/api/files/directory', data: { path: this.join(r.value) } }); await this.listFiles(); },
    async uploadFiles(event) { const selected = Array.from(event.target.files || []); event.target.value = ''; if (!selected.length) return; const form = new FormData(); selected.forEach(file => form.append('files', file)); try { await this.gatewayRequest({ method: 'post', url: '/api/files/upload', params: { path: this.currentPath }, data: form }); this.$message.success('文件上传成功'); await this.listFiles(); } catch (e) { this.$message.error(this.errorText(e, '文件上传失败')); } },
    async editFile(item) { this.editorPath = this.join(item.name); try { const r = await this.gatewayRequest({ method: 'get', url: '/api/files/content', params: { path: this.editorPath } }); this.editorContent = r.data.content || ''; this.editorVisible = true; } catch (e) { this.$message.error(this.errorText(e, '文件读取失败')); } },
    async saveFile() { this.saving = true; try { await this.gatewayRequest({ method: 'post', url: '/api/files/content', data: { path: this.editorPath, content: this.editorContent } }); this.editorVisible = false; this.$message.success('文件已保存'); await this.listFiles(); } finally { this.saving = false; } },
    async renameItem(item) { const r = await this.$prompt('请输入新名称', '重命名', { inputValue: item.name }); await this.gatewayRequest({ method: 'post', url: '/api/files/move', data: { source: this.join(item.name), target: this.join(r.value) } }); await this.listFiles(); },
    async deleteItem(item) { await this.$confirm('确定删除“' + item.name + '”吗？文件夹中的内容也会被删除。', '删除确认', { type: 'warning' }); await this.gatewayRequest({ method: 'post', url: '/api/files/delete', data: { path: this.join(item.name) } }); await this.listFiles(); },
    showContextMenu(event, item) { event.preventDefault(); event.stopPropagation(); const width = 168; const height = item ? 168 : 168; this.contextMenu = { visible: true, x: Math.max(8, Math.min(event.clientX, window.innerWidth - width - 8)), y: Math.max(8, Math.min(event.clientY, window.innerHeight - height - 8)), item: item || null }; },
    showItemMenu(row, column, event) { this.showContextMenu(event, row); },
    showBlankMenu(event) { this.showContextMenu(event, null); },
    closeContextMenu() { this.contextMenu.visible = false; },
    async contextAction(action) { const item = this.contextMenu.item; this.closeContextMenu(); try { if (action === 'open') return this.openItem(item); if (action === 'copy') return this.copyItem(item); if (action === 'rename') return await this.renameItem(item); if (action === 'delete') return await this.deleteItem(item); if (action === 'new-file') return await this.createFile(); if (action === 'new-folder') return await this.createFolder(); if (action === 'upload') return this.$refs.fileInput.click(); if (action === 'paste') return await this.pasteItem(); } catch (e) { if (e !== 'cancel' && e !== 'close' && e !== 'abort') this.$message.error(this.errorText(e, '文件操作失败')); } },
    copyItem(item) { this.fileClipboard = { spaceId: this.selectedId, path: this.join(item.name), parentPath: this.currentPath, name: item.name, isDirectory: item.isDirectory }; this.$message.success('已复制，可在目标目录右键粘贴'); },
    copyName(name) { const dot = name.lastIndexOf('.'); return dot > 0 ? name.slice(0, dot) + '-副本' + name.slice(dot) : name + '-副本'; },
    async pasteItem() { if (!this.fileClipboard) return; if (this.fileClipboard.spaceId !== this.selectedId) return this.$message.warning('暂不支持跨空间复制'); const defaultName = this.fileClipboard.parentPath === this.currentPath ? this.copyName(this.fileClipboard.name) : this.fileClipboard.name; const r = await this.$prompt('请输入复制后的名称', '粘贴', this.fileNameOptions(defaultName)); const response = await this.gatewayRequest({ method: 'post', url: '/api/files/copy', data: { source: this.fileClipboard.path, target: this.join(r.value) } }); if (this.current && response.data) this.current.usedBytes = response.data.usedBytes; await this.listFiles(); this.$message.success('复制成功'); },
    async spaceCommand(command) { if (command === 'rename') { const r = await this.$prompt('请输入空间名称', '修改名称', { inputValue: this.current.name }); await this.$api.space.rename(this.current.id, r.value); await this.load(); } else if (command === 'prefix') { const r = await this.$prompt('请输入赠送域名前缀', '修改赠送域名', { inputValue: this.current.hostPrefix, inputPattern: /^[a-z0-9](?:[a-z0-9-]{1,61}[a-z0-9])$/, inputErrorMessage: '请输入 3-63 位小写字母、数字或连字符' }); await this.$api.space.changeHostPrefix(this.current.id, r.value); await this.load(); } else { await this.$confirm('删除空间会永久删除其中的全部文件，确定继续吗？', '删除空间', { type: 'warning' }); await this.$api.space.remove(this.current.id); this.selectedId = null; await this.load(); } },
    tabChanged() { if (this.tab === 'files') this.listFiles(); }, async addDomain() { if (!this.domainInput) return; await this.$api.space.addDomain(this.current.id, this.domainInput); this.domainInput = ''; await this.load(); },
    async verifyDomain(row) { try { await this.$api.space.verifyDomain(row.id); this.$message.success('域名验证成功'); } finally { await this.load(); } }, async removeDomain(row) { await this.$confirm('确定解除该域名绑定吗？', '解除绑定'); await this.$api.space.removeDomain(row.id); await this.load(); },
    selectZip(file) { this.zipFile = file.raw; this.zipList = [file]; }, removeZip() { this.zipFile = null; this.zipList = []; },
    async deployZip() { this.deploying = true; try { const form = new FormData(); form.append('file', this.zipFile); await this.gatewayRequest({ method: 'post', url: '/api/upload', data: form }); this.$message.success('网站发布成功'); this.removeZip(); await this.load(); } catch (e) { this.$message.error(this.errorText(e, '网站发布失败')); } finally { this.deploying = false; } },
    async redeemCard() { if (!this.cardCode) return; await this.$api.space.redeem({ code: this.cardCode, spaceId: this.current.id }); this.cardCode = ''; this.$message.success('空间卡兑换成功'); await this.load(); },
    async copy(value) {
      if (!value) return;
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(value);
        } else {
          const input = document.createElement('textarea');
          input.value = value;
          input.style.position = 'fixed';
          input.style.opacity = '0';
          document.body.appendChild(input);
          input.select();
          const copied = document.execCommand('copy');
          document.body.removeChild(input);
          if (!copied) throw new Error('Copy command failed');
        }
        this.$message.success('已复制');
      } catch (_) {
        this.$message.error('复制失败，请手动复制');
      }
    }
  }
};
</script>
<style scoped>
.space-page{padding:24px;min-height:calc(100vh - 90px);background:#f5f7fa;color:#263445}.page-head{display:flex;align-items:center;justify-content:space-between;margin-bottom:18px}.page-head h2{margin:0 0 5px;font-size:22px}.page-head p,.settings-band p,.form-help{margin:0;color:#778899;font-size:13px}.state{padding:70px 20px;text-align:center}.state .el-button{margin-top:16px}.workspace{display:grid;grid-template-columns:220px minmax(0,1fr);gap:16px;min-height:620px}.space-list{background:#fff;border:1px solid #dfe5ec;padding:8px}.space-item{display:block;width:100%;padding:13px 12px;border:0;border-left:3px solid transparent;background:transparent;text-align:left;cursor:pointer}.space-item:hover{background:#f5f7fa}.space-item.active{border-left-color:#1686d9;background:#edf6fd}.space-item strong,.space-item span,.space-item small{display:block}.space-item span,.space-item small{margin-top:5px;color:#778899}.no-space{padding:38px 8px;text-align:center;color:#909399}.space-main,.empty{min-width:0;background:#fff;border:1px solid #dfe5ec;padding:20px}.summary{padding-bottom:16px;border-bottom:1px solid #ebeef5}.summary-title{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:16px}.summary h3{margin:0 0 6px;font-size:18px}.summary a,.domain-row a{color:#1976bd}.usage{margin-top:8px;color:#778899;font-size:12px}.file-toolbar{display:flex;align-items:center;justify-content:space-between;padding:8px 0 16px}.file-toolbar button,.el-breadcrumb button,.file-name{padding:0;border:0;background:transparent;color:inherit;cursor:pointer}.el-breadcrumb button:hover,.file-name:hover{color:#1686d9}.file-browser{min-height:360px}.hidden-input{display:none}.danger{color:#f56c6c!important}.file-context-menu{position:fixed;z-index:4000;width:160px;padding:5px 0;border:1px solid #dcdfe6;background:#fff;box-shadow:0 6px 18px rgba(0,0,0,.16)}.file-context-menu button{display:flex;align-items:center;gap:9px;width:100%;height:38px;padding:0 16px;border:0;background:#fff;color:#303133;text-align:left;cursor:pointer}.file-context-menu button:hover{background:#f2f6fc;color:#1686d9}.file-context-menu button:disabled{color:#c0c4cc;background:#fff;cursor:not-allowed}.file-context-menu button i{width:16px;text-align:center}.settings-band{padding:8px 0 24px}.settings-band+.settings-band{border-top:1px solid #ebeef5;padding-top:24px}.settings-band h3{margin:0 0 10px;font-size:16px}.domain-row,.domain-add,.card-redeem{display:flex;align-items:center;gap:10px}.domain-add,.card-redeem{max-width:760px;margin:16px 0}.settings-band .el-upload{margin:18px 0}.empty{display:flex;flex-direction:column;align-items:center;justify-content:center;color:#778899}.empty i{font-size:52px}.empty .el-button{margin-top:10px}@media(max-width:900px){.workspace{grid-template-columns:1fr}.space-list{display:flex;overflow-x:auto}.space-item{min-width:180px}.file-toolbar{align-items:flex-start;gap:14px;flex-direction:column}.domain-add,.card-redeem{align-items:stretch;flex-direction:column}}
</style>
