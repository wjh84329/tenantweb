<!--
 * @Description: 分区模板 — 安装脚本模板（按游戏引擎从后台读取合并后的脚本文件，支持编辑、保存）
 * 按分区真实占位符预览：可选择本模板下分区后打开与「分区管理」相同的预览弹窗（InstallScriptPartitionPreviewDialog）。
 * 依赖后台实现：/api/InstallScriptTemplate/*（见 src/api/partModule.js）
 -->
<template>
  <div class="script-edit-page">
    <div class="gs_title" style="color: white;">编辑安装脚本</div>
    <div class="bg_fff mgt10 pdl20 pdr20 pdb20">
      <div class="toolbar mgt10">
        <el-button size="small" @click="goBack">返回</el-button>
        <span class="meta">
          模板编号：<b>{{ templateId }}</b>
          <template v-if="templateName">　名称：{{ templateName }}</template>
          　游戏引擎：<b>{{ gameEngine || '加载中…' }}</b>
        </span>
        <span class="partition-preview-bar mgl10" v-if="!loading && !loadError">
          <el-select
            v-model="previewPartitionId"
            filterable
            clearable
            placeholder="选择分区…"
            size="small"
            style="min-width: 220px"
            :loading="loadingPartitionPreviewList"
          >
            <el-option
              v-for="p in partitionPreviewRows"
              :key="p.id"
              :label="partitionPreviewOptionLabel(p)"
              :value="p.id"
            />
          </el-select>
          <el-button size="small" :loading="loadingPartitionPreviewList" @click="loadPartitionPreviewOptions"
            >刷新分区</el-button
          >
          <el-button
            type="primary"
            size="small"
            plain
            :disabled="!previewPartitionId"
            @click="openPartitionInstallScriptPreview"
            >按分区预览</el-button
          >
        </span>
      </div>
      <el-alert
        v-if="loadError"
        :title="loadError"
        type="warning"
        :closable="false"
        class="mgt10"
        show-icon
      />
      <div
        v-else-if="loading"
        v-loading="true"
        element-loading-text="加载脚本模板中…"
        class="script-edit-loading mgt15"
      ></div>
      <template v-else>
        <el-tabs v-model="activeFile" type="card" class="mgt10 file-tabs">
          <el-tab-pane
            v-for="f in fileList"
            :key="f.fileName"
            :label="displayScriptTabName(f.fileName)"
            :name="f.fileName"
          >
            <div class="editor-actions mgb10">
              <el-button type="primary" size="small" :loading="saving" @click="saveCurrent">保存为模板脚本</el-button>
              <el-button
                size="small"
                type="warning"
                plain
                :disabled="!activeFile || loading"
                @click="openBatchReplace"
              >批量替换</el-button>
              <el-button
                size="small"
                type="warning"
                plain
                :loading="resetting"
                :disabled="!currentMeta || (!currentMeta.hasPlatformDefault && !currentMeta.isCustomized)"
                @click="resetCurrent"
              >恢复默认</el-button>
              <el-tag v-if="currentMeta && currentMeta.isCustomized" type="success" size="mini" class="mgl10">模板脚本</el-tag>
              <el-tag v-else-if="currentMeta && currentMeta.isGatewayBaseOverride" type="warning" size="mini" class="mgl10">来自网关底板</el-tag>
              <el-tag v-else-if="currentMeta && currentMeta.hasPlatformDefault" type="info" size="mini" class="mgl10">平台默认</el-tag>
              <el-tag v-else-if="currentMeta" type="danger" size="mini" class="mgl10">未配置</el-tag>
            </div>
            <el-alert
              v-if="currentMeta && !currentMeta.hasPlatformDefault && !currentMeta.isCustomized"
              :title="emptyScriptNotice"
              type="info"
              :closable="false"
              class="mgb10"
              show-icon
            />
            <el-alert
              v-else-if="currentMeta && currentMeta.isGatewayBaseOverride"
              title="当前内容来自网关底板。保存后将作为本模板的模板脚本覆盖。"
              type="info"
              :closable="false"
              class="mgb10"
              show-icon
            />
            <el-input
              v-model="draftContent"
              type="textarea"
              :autosize="{ minRows: 22, maxRows: 40 }"
              class="mono-input"
              :placeholder="editorPlaceholder"
              @input="onDraftInput"
            />
          </el-tab-pane>
        </el-tabs>
      </template>
    </div>

    <el-dialog
      title="当前文件 — 批量替换"
      :visible.sync="batchReplace.show"
      width="560px"
      top="12vh"
      append-to-body
      custom-class="gs_dialog"
    >
      <el-radio-group v-model="batchReplace.mode" size="small" class="mgb12">
        <el-radio-button label="single">单组替换</el-radio-button>
        <el-radio-button label="multi">多行规则</el-radio-button>
      </el-radio-group>
      <div v-if="batchReplace.mode === 'single'">
        <p class="batch-replace-hint mgb8">将下方编辑器内所有「查找内容」替换为「替换为」（仅当前页签文件）。替换后需点「保存当前文件」才会提交服务器。</p>
        <el-input
          v-model="batchReplace.find"
          placeholder="查找内容"
          size="small"
          class="mgb8"
          clearable
        />
        <el-input
          v-model="batchReplace.replace"
          placeholder="替换为（可留空表示删除匹配内容）"
          size="small"
          class="mgb8"
          clearable
        />
      </div>
      <div v-else>
        <p class="batch-replace-hint mgb8">
          从上到下依次执行；每行一条，使用 <code>⇒</code> 或 <code>=&gt;</code> 分隔（例：<code>旧路径⇒新路径</code>）。以 <code>#</code> 开头的行视为注释。
        </p>
        <el-input
          v-model="batchReplace.multiLines"
          type="textarea"
          :rows="10"
          class="mono-input batch-replace-textarea"
          placeholder="元宝消费⇒积分消费&#10;..\\QuestDiary\\A\\⇒..\\QuestDiary\\B\\"
          spellcheck="false"
        />
      </div>
      <el-checkbox v-model="batchReplace.caseSensitive" class="mgt8">区分大小写</el-checkbox>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="batchReplace.show = false">取 消</el-button>
        <el-button size="small" type="primary" @click="applyBatchReplace">应用到当前文件</el-button>
      </span>
    </el-dialog>

    <install-script-partition-preview-dialog ref="installScriptPartitionPreviewDialog" />
  </div>
</template>

<script>
import InstallScriptPartitionPreviewDialog from '../components/InstallScriptPartitionPreviewDialog.vue';

/** 与后台空脚本提示一致，仅作占位；保存时须填写实际脚本 */
const EMPTY_SCRIPT_HINT = '该脚本暂无，如需使用请自行配置脚本';

export default {
  name: 'PartmoduleScriptEdit',
  components: {
    InstallScriptPartitionPreviewDialog
  },
  data() {
    return {
      emptyScriptNotice: EMPTY_SCRIPT_HINT,
      templateId: null,
      templateName: '',
      gameEngine: '',
      /** 通区模板才展示「测试领取」「通区测试充值」等脚本页 */
      isTongQu: false,
      loading: true,
      loadError: '',
      fileList: [],
      activeFile: '',
      draftContent: '',
      unsavedMap: {},
      saving: false,
      resetting: false,
      /** 当前页签脚本批量查找替换（仅改本地，需再保存） */
      batchReplace: {
        show: false,
        mode: 'single',
        find: '',
        replace: '',
        caseSensitive: false,
        multiLines: ''
      },
      /** 与分区管理脚本预览共用弹窗：本模板下的分区列表 */
      partitionPreviewRows: [],
      previewPartitionId: null,
      loadingPartitionPreviewList: false
    };
  },
  computed: {
    currentMeta() {
      return this.fileList.find((x) => x.fileName === this.activeFile);
    },
    editorPlaceholder() {
      if (!this.currentMeta) return '脚本内容';
      if (!this.currentMeta.hasPlatformDefault && !this.currentMeta.isCustomized) {
        return EMPTY_SCRIPT_HINT;
      }
      return '脚本内容';
    }
  },
  watch: {
    activeFile(newName, oldName) {
      if (oldName) {
        const prev = this.fileList.find((x) => x.fileName === oldName);
        if (prev) {
          prev.content = this.draftContent;
        }
      }
      const row = this.fileList.find((x) => x.fileName === newName);
      this.draftContent = row ? row.content : '';
    }
  },
  created() {
    this.templateId = this.$route.query.id;
    this.templateName = this.$route.query.name ? String(this.$route.query.name) : '';
    const qEngine = this.$route.query.gameEngine ? String(this.$route.query.gameEngine) : '';
    if (!this.templateId) {
      this.loadError = '缺少模板编号，请从分区模板列表进入。';
      this.loading = false;
      return;
    }
    this.bootstrap(qEngine);
  },
  methods: {
    hasUnsavedServer() {
      return Object.keys(this.unsavedMap).some((k) => this.unsavedMap[k]);
    },
    partitionPreviewOptionLabel(p) {
      const name = p.name || p.Name || '';
      return name ? `${name}（#${p.id}）` : `分区 #${p.id}`;
    },
    async loadPartitionPreviewOptions() {
      if (!this.templateId) return;
      this.loadingPartitionPreviewList = true;
      try {
        const res = await this.$api.groupmange.arealist({
          Type: '0',
          GroupNameID: 0,
          TemplatesID: this.templateId,
          PageNumber: 1,
          PageSize: 500
        });
        if (res.status === 204) {
          this.partitionPreviewRows = [];
          return;
        }
        if (res.status !== 200) {
          return;
        }
        const arr = Array.isArray(res.data) ? res.data : [];
        const tid = Number(this.templateId);
        this.partitionPreviewRows = arr.filter((r) => {
          const rt = r.templateId != null ? r.templateId : r.TemplateId;
          return rt == null || Number(rt) === tid;
        });
      } catch (_) {
        this.partitionPreviewRows = [];
      } finally {
        this.loadingPartitionPreviewList = false;
      }
    },
    openPartitionInstallScriptPreview() {
      if (this.previewPartitionId == null || this.previewPartitionId === '') {
        this.$message.warning('请先选择要预览的分区');
        return;
      }
      const row = this.partitionPreviewRows.find((r) => r.id === this.previewPartitionId);
      if (!row) {
        this.$messageError('未找到该分区，请点击「刷新分区列表」后重试');
        return;
      }
      const dlg = this.$refs.installScriptPartitionPreviewDialog;
      if (dlg && typeof dlg.open === 'function') {
        dlg.open(row);
      }
    },
    goBack() {
      const prev = this.fileList.find((x) => x.fileName === this.activeFile);
      if (prev) {
        prev.content = this.draftContent;
      }
      if (this.hasUnsavedServer()) {
        this.$confirm('有文件尚未保存到服务器，确定离开？', '提示', { type: 'warning' })
          .then(() => this.$router.push({ path: '/main/partmodules' }))
          .catch(() => {});
      } else {
        this.$router.push({ path: '/main/partmodules' });
      }
    },
    onDraftInput() {
      const row = this.fileList.find((x) => x.fileName === this.activeFile);
      if (row) {
        row.content = this.draftContent;
        this.$set(this.unsavedMap, this.activeFile, true);
      }
    },
    /** 页签展示名：去掉 .txt 后缀 */
    displayScriptTabName(fileName) {
      if (!fileName) return '';
      const lower = fileName.toLowerCase();
      return lower.endsWith('.txt') ? fileName.slice(0, -4) : fileName;
    },
    openBatchReplace() {
      if (!this.activeFile) return;
      this.batchReplace.show = true;
    },
    /** @returns {{ text: string, count: number }} */
    replaceAllInString(haystack, needle, replacement, caseSensitive) {
      if (needle == null || needle === '') {
        return { text: haystack, count: 0 };
      }
      const rep = replacement == null ? '' : String(replacement);
      if (caseSensitive) {
        const parts = String(haystack).split(needle);
        return { text: parts.join(rep), count: Math.max(0, parts.length - 1) };
      }
      const esc = String(needle).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp(esc, 'gi');
      let count = 0;
      const text = String(haystack).replace(re, () => {
        count += 1;
        return rep;
      });
      return { text, count };
    },
    parseBatchReplaceRuleLine(line) {
      const trimmed = String(line || '').trim();
      if (!trimmed || trimmed.startsWith('#')) {
        return null;
      }
      const seps = ['⇒', '=>', '->'];
      for (let s = 0; s < seps.length; s += 1) {
        const sep = seps[s];
        const i = trimmed.indexOf(sep);
        if (i >= 0) {
          return {
            from: trimmed.slice(0, i).trim(),
            to: trimmed.slice(i + sep.length).trim()
          };
        }
      }
      return null;
    },
    applyBatchReplace() {
      if (!this.activeFile) return;
      let next = String(this.draftContent ?? '');
      const cs = this.batchReplace.caseSensitive;
      let total = 0;

      if (this.batchReplace.mode === 'single') {
        const find = this.batchReplace.find;
        if (find == null || String(find) === '') {
          this.$message.warning('请填写「查找内容」。');
          return;
        }
        const rep = this.batchReplace.replace == null ? '' : String(this.batchReplace.replace);
        const r = this.replaceAllInString(next, String(find), rep, cs);
        next = r.text;
        total = r.count;
      } else {
        const lines = String(this.batchReplace.multiLines || '').split(/\r\n|\n|\r/);
        for (let i = 0; i < lines.length; i += 1) {
          const rule = this.parseBatchReplaceRuleLine(lines[i]);
          if (!rule || rule.from === '') {
            continue;
          }
          const r = this.replaceAllInString(next, rule.from, rule.to, cs);
          next = r.text;
          total += r.count;
        }
      }

      if (total === 0) {
        this.$message({
          type: 'warning',
          message: '未找到可替换内容。请检查查找文本、大小写或多行分隔符（⇒ 或 =>）。',
          showClose: true,
          duration: 2800,
          offset: 350
        });
        return;
      }

      this.draftContent = next;
      this.onDraftInput();
      this.$message.success(`已替换 ${total} 处（当前文件未保存，请按需点击「保存当前文件」）`);
      this.batchReplace.show = false;
    },
    async bootstrap(qEngine) {
      this.loading = true;
      this.loadError = '';
      try {
        const detailRes = await this.$api.partmodule.moduleDetail({ id: this.templateId });
        if (detailRes.status !== 200 || !detailRes.data) {
          throw new Error('无法加载模板详情，请稍后重试。');
        }
        const d = detailRes.data;
        const engine = qEngine || d.gameEngine || d.GameEngine || '';
        if (!this.templateName) {
          this.templateName = d.name || d.Name || this.templateName;
        }
        this.isTongQu = !!(d.isTongQu ?? d.IsTongQu ?? d.tongQu);
        if (!engine) {
          throw new Error('该模板未配置游戏引擎，请先在「编辑模板」中选择引擎。');
        }
        this.gameEngine = engine;
        await this.loadFiles();
        await this.loadPartitionPreviewOptions();
      } catch (e) {
        this.loadError = e.message || '加载失败';
      } finally {
        this.loading = false;
      }
    },
    normalizeFilesPayload(data) {
      if (!data) return [];
      if (Array.isArray(data)) return data;
      if (Array.isArray(data.files)) return data.files;
      if (Array.isArray(data.Files)) return data.Files;
      return [];
    },
    async loadFiles() {
      const res = await this.$api.partmodule.getInstallScriptFiles({
        templateId: this.templateId,
        gameEngine: this.gameEngine
      });
      if (res.status !== 200) {
        throw new Error((res.data && res.data.message) || '读取脚本模板失败');
      }
      const arr = this.normalizeFilesPayload(res.data);
      const tongQuOnlyFiles = ['测试领取.txt', '通区测试充值.txt'];
      this.fileList = arr
        .map((item) => ({
          fileName: item.fileName || item.FileName,
          content: item.content != null ? item.content : item.Content != null ? item.Content : '',
          isCustomized: !!(item.isCustomized ?? item.IsCustomized),
          isGatewayBaseOverride: !!(item.isGatewayBaseOverride ?? item.IsGatewayBaseOverride),
          sourceLayer: item.sourceLayer || item.SourceLayer || '',
          /** 后台未返回时按旧版兼容：视为有平台默认 */
          hasPlatformDefault: (item.hasPlatformDefault ?? item.HasPlatformDefault ?? true) === true
        }))
        .filter((x) => {
          if (!x.fileName) return false;
          if (this.isTongQu) return true;
          const n = x.fileName.toLowerCase();
          return !tongQuOnlyFiles.some((t) => n === t.toLowerCase());
        });
      if (!this.fileList.length) {
        throw new Error('后台未返回任何脚本文件，请确认已实现接口 GetInstallScriptFiles 且数据库中有对应引擎的模板。');
      }
      this.unsavedMap = {};
      this.activeFile = this.fileList[0].fileName;
      this.draftContent = this.fileList[0].content;
    },
    async saveCurrent() {
      if (!this.activeFile) return;
      const trimmed = String(this.draftContent || '').trim();
      if (!trimmed) {
        this.$message.warning('脚本内容不能为空，请填写实际脚本后再保存');
        return;
      }
      this.saving = true;
      try {
        const res = await this.$api.partmodule.saveInstallScriptFile({
          templateId: this.templateId,
          gameEngine: this.gameEngine,
          fileName: this.activeFile,
          content: trimmed
        });
        if (res.status !== 200) {
          throw new Error((res.data && res.data.message) || '保存失败');
        }
        const row = this.fileList.find((x) => x.fileName === this.activeFile);
        if (row) {
          row.content = trimmed;
          row.isCustomized = true;
        }
        this.draftContent = trimmed;
        this.$set(this.unsavedMap, this.activeFile, false);
        this.$message.success('保存成功');
      } catch (e) {
        this.$messageError(e.message || '保存失败');
      } finally {
        this.saving = false;
      }
    },
    resetCurrent() {
      if (!this.activeFile) return;
      const meta = this.fileList.find((x) => x.fileName === this.activeFile);
      const tab = this.displayScriptTabName(this.activeFile);
      const msg = meta && !meta.hasPlatformDefault
        ? '确定清除「' + tab + '」已保存的自定义内容？清除后该脚本为空，需重新填写并保存后才能使用。'
        : '确定将「' + tab + '」恢复为平台默认内容？未保存的本地修改将丢失。';
      this.$confirm(msg, '恢复默认', { type: 'warning' })
        .then(async () => {
          this.resetting = true;
          try {
            const res = await this.$api.partmodule.resetInstallScriptFile({
              templateId: this.templateId,
              gameEngine: this.gameEngine,
              fileName: this.activeFile
            });
            if (res.status !== 200) {
              throw new Error((res.data && res.data.message) || '恢复失败');
            }
            await this.loadFiles();
            this.$message.success('已恢复默认');
          } catch (e) {
            this.$messageError(e.message || '恢复失败');
          } finally {
            this.resetting = false;
          }
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.script-edit-page .gs_title {
  background: var(--theme-color);
}
.toolbar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}
.partition-preview-bar {
  display: inline-flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}
.meta {
  font-size: 13px;
  color: #606266;
}
.mono-input ::v-deep textarea {
  font-family: Consolas, 'Courier New', monospace;
  font-size: 13px;
  line-height: 1.45;
}
.script-edit-loading {
  min-height: 260px;
}
.file-tabs ::v-deep .el-tabs__content {
  padding-top: 8px;
}
.batch-replace-hint {
  font-size: 12px;
  color: #909399;
  line-height: 1.5;
  code {
    font-family: Consolas, 'Courier New', monospace;
    background: #f4f4f5;
    padding: 0 4px;
    border-radius: 2px;
  }
}
.batch-replace-textarea ::v-deep textarea {
  font-size: 12px;
}
</style>
