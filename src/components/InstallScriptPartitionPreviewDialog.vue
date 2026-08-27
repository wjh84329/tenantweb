<!--
  安装脚本 — 按分区预览（与分区管理「脚本预览」同一套接口与交互）
  用法：ref + open(partitionRow)，row 与分区列表行结构一致（id、name、templateId、gameEngine、tongQu、scan 等）
-->
<template>
  <div class="install-script-partition-preview-host">
    <el-dialog
      title="安装脚本预览（按当前分区）"
      :visible.sync="scriptPreview.show"
      width="75%"
      top="4vh"
      append-to-body
      custom-class="gs_dialog script-preview-install-dialog"
      @close="resetScriptPreview"
    >
      <p class="mgb10 preview-meta" v-if="scriptPreview.partitionName">
        分区：<b>{{ scriptPreview.partitionName }}</b>（编号 {{ scriptPreview.partitionId }}）　模板：{{
          scriptPreview.templateId
        }}　引擎：{{ scriptPreview.gameEngine || '—' }}　通区：<b>{{ scriptPreview.isTongQu ? '是' : '否' }}</b>　充值方式：<b>{{ scriptPreview.scanModeLabel }}</b>
      </p>
      <el-alert
        type="info"
        :closable="false"
        class="mgb10"
        title="Market_Def 脚本按分区「充值方式」生成预览：仅扫码 / 仅网页 / 网页+扫码 与网关一致；通区主脚本为「通区测试充值.txt」。NPC 扫码菜单与 InPutInteger 分段按商户商品列表展开，与网关安装一致。单份预览过长时服务端可能截断并提示。预览生成后可直接在下方编辑；再次点击「生成预览」将按当前文本重新套用分区占位符。点击「保存到分区」后网关安装该分区时会优先使用已保存正文（Market_Def 按单文件；其它为模板文件名如 NPC.txt）。切换脚本文件会清空编辑区。"
        show-icon
      />
      <div class="mgb10">
        <span class="mgr10">脚本文件</span>
        <el-select
          v-model="scriptPreview.fileName"
          filterable
          placeholder="请选择"
          size="small"
          style="min-width: 220px"
          :loading="scriptPreview.loadingFiles"
          :popper-append-to-body="false"
        >
          <el-option
            v-for="opt in scriptPreview.fileOptions"
            :key="opt.fileName"
            :label="opt.fileName"
            :value="opt.fileName"
          />
        </el-select>
        <el-tag
          v-if="currentScriptPreviewSourceText"
          size="mini"
          :type="currentScriptPreviewFile && currentScriptPreviewFile.isGatewayBaseOverride ? 'warning' : 'info'"
          class="mgl10"
        >{{ currentScriptPreviewSourceText }}</el-tag>
        <el-button
          class="mgl10"
          type="primary"
          size="small"
          :loading="scriptPreview.loadingPreview"
          :disabled="!scriptPreview.fileName"
          @click="runScriptPreview"
        >生成预览</el-button>
        <el-button
          class="mgl10"
          type="success"
          size="small"
          :loading="scriptPreview.loadingSave"
          :disabled="!scriptPreview.fileName || !scriptPreview.partitionId"
          @click="saveScriptPreviewToPartition(false)"
        >保存到分区</el-button>
        <el-button
          class="mgl10"
          type="text"
          size="small"
          :loading="scriptPreview.loadingSave"
          :disabled="!scriptPreview.fileName || !scriptPreview.partitionId"
          @click="saveScriptPreviewToPartition(true)"
        >清除本条覆盖</el-button>
        <el-button
          class="mgl10"
          type="warning"
          plain
          size="small"
          :disabled="!scriptPreview.show"
          @click="openScriptPreviewBatchReplace"
        >批量替换</el-button>
        <el-button
          class="mgl10"
          type="primary"
          plain
          size="small"
          :disabled="!scriptPreview.show || !scriptPreview.partitionId || scriptPreview.loadingPartition"
          :loading="scriptPreview.loadingPartition"
          @click="loadScriptPreviewPartitionToGateway"
        >加载分区</el-button>
        <el-button
          class="mgl10"
          size="small"
          :disabled="!scriptPreview.show || scriptPreview.fullscreen"
          @click="enterScriptPreviewFullscreen"
        >全屏</el-button>
        <el-button
          class="mgl10"
          size="small"
          :disabled="!scriptPreview.fullscreen"
          @click="exitScriptPreviewDialogFullscreen"
        >退出全屏</el-button>
      </div>
      <!-- 全屏时 el-dialog__body 需 overflow:visible 才能让下拉层不被裁切；长文滚动放在本容器内 -->
      <div class="script-preview-text-area-wrap">
        <el-input
          v-model="scriptPreview.previewText"
          type="textarea"
          :autosize="scriptPreviewTextareaAutosize"
          class="mono-preview"
          placeholder="请选择文件后点击「生成预览」；生成后可修改，再次点击「生成预览」将基于当前文本重新套用占位符"
        />
      </div>
      <!-- 嵌套在主预览弹窗内 + 不挂 body，浏览器原生全屏时仍在本全屏子树内，可与全屏同时使用 -->
      <el-dialog
        title="预览文本 — 批量替换"
        :visible.sync="scriptPreviewBatchReplace.show"
        width="560px"
        top="12vh"
        :append-to-body="false"
        :modal-append-to-body="false"
        custom-class="gs_dialog script-preview-batch-replace-dialog"
      >
        <el-radio-group v-model="scriptPreviewBatchReplace.mode" size="small" class="mgb12">
          <el-radio-button label="single">单组替换</el-radio-button>
          <el-radio-button label="multi">多行规则</el-radio-button>
        </el-radio-group>
        <div v-if="scriptPreviewBatchReplace.mode === 'single'">
          <p class="batch-replace-hint mgb8">将预览框内所有「查找内容」替换为「替换为」（整篇全文）。</p>
          <el-input
            v-model="scriptPreviewBatchReplace.find"
            placeholder="查找内容"
            size="small"
            class="mgb8"
            clearable
          />
          <el-input
            v-model="scriptPreviewBatchReplace.replace"
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
            v-model="scriptPreviewBatchReplace.multiLines"
            type="textarea"
            :rows="10"
            class="mono-preview batch-replace-textarea"
            placeholder="元宝消费⇒积分消费&#10;..\\QuestDiary\\A\\⇒..\\QuestDiary\\B\\"
            spellcheck="false"
          />
        </div>
        <el-checkbox v-model="scriptPreviewBatchReplace.caseSensitive" class="mgt8">区分大小写</el-checkbox>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="scriptPreviewBatchReplace.show = false">取 消</el-button>
          <el-button size="small" type="primary" @click="applyScriptPreviewBatchReplace">应用到当前预览</el-button>
        </span>
      </el-dialog>
      <span slot="footer" class="dialog-footer">
        <el-button @click="scriptPreview.show = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'InstallScriptPartitionPreviewDialog',
  data() {
    return {
      scriptPreview: {
        show: false,
        partitionId: null,
        partitionName: '',
        templateId: null,
        gameEngine: '',
        isTongQu: false,
        scanModeLabel: '',
        fileName: '',
        fileOptions: [],
        loadingFiles: false,
        loadingPreview: false,
        loadingSave: false,
        loadingPartition: false,
        fullscreen: false,
        previewText: ''
      },
      scriptPreviewBatchReplace: {
        show: false,
        mode: 'single',
        find: '',
        replace: '',
        caseSensitive: false,
        multiLines: ''
      }
    };
  },
  watch: {
    'scriptPreview.fileName'(newVal, oldVal) {
      if (!this.scriptPreview.show || oldVal === undefined || newVal === oldVal) return;
      this.scriptPreview.previewText = '';
    },
    'scriptPreview.show'(open) {
      if (!open) {
        this.exitScriptPreviewDialogFullscreen();
      }
    }
  },
  computed: {
    scriptPreviewTextareaAutosize() {
      if (this.scriptPreview.fullscreen) {
        return { minRows: 28, maxRows: 160 };
      }
      return { minRows: 18, maxRows: 32 };
    },
    currentScriptPreviewFile() {
      return this.scriptPreview.fileOptions.find((item) => item.fileName === this.scriptPreview.fileName);
    },
    currentScriptPreviewSourceText() {
      const item = this.currentScriptPreviewFile;
      if (!item) return '';
      if (item.sourceLayer === 'Template') return '当前来源：模板脚本';
      if (item.sourceLayer === 'GatewayBase' || item.isGatewayBaseOverride) return '当前来源：网关底板';
      if (item.sourceLayer === 'Missing') return '当前来源：未配置';
      if (item.sourceLayer === 'Partition') return '当前来源：分区脚本';
      return '当前来源：平台默认';
    }
  },
  mounted() {
    document.addEventListener('fullscreenchange', this.onScriptPreviewFullscreenEvent);
    document.addEventListener('webkitfullscreenchange', this.onScriptPreviewFullscreenEvent);
  },
  beforeDestroy() {
    document.removeEventListener('fullscreenchange', this.onScriptPreviewFullscreenEvent);
    document.removeEventListener('webkitfullscreenchange', this.onScriptPreviewFullscreenEvent);
    this.exitScriptPreviewDialogFullscreen();
  },
  methods: {
    /** 与分区列表行结构一致：id、name、templateId/TemplateId、gameEngine、TongQu、tongQu、scan/Scan */
    async open(row) {
      const tid = row.templateId != null ? row.templateId : row.TemplateId;
      const engine = row.gameEngine != null ? row.gameEngine : row.GameEngine;
      if (!tid) {
        this.$messageError('当前分区缺少模板编号，请刷新后重试。');
        return;
      }
      this.resetScriptPreview();
      this.scriptPreview.show = true;
      this.scriptPreview.partitionId = row.id;
      this.scriptPreview.partitionName = row.name || '';
      this.scriptPreview.templateId = tid;
      this.scriptPreview.gameEngine = engine != null && String(engine).trim() !== '' ? String(engine).trim() : '';
      this.scriptPreview.isTongQu = !!(row.tongQu != null ? row.tongQu : row.TongQu);
      const scanVal = row.scan != null ? row.scan : row.Scan;
      this.scriptPreview.scanModeLabel = this.formatPartitionScanLabel(scanVal);
      this.scriptPreview.loadingFiles = true;
      try {
        const res = await this.$api.partmodule.getInstallScriptPreviewFilesForPartition({
          partitionId: row.id
        });
        if (res.status !== 200) {
          throw new Error((res.data && res.data.message) || '读取脚本文件列表失败');
        }
        const arr = Array.isArray(res.data) ? res.data : [];
        const opts = arr
          .map((item) => {
            const fileName = item.fileName || item.FileName || '';
            const sourceFileName = item.sourceFileName || item.SourceFileName || fileName;
            const sourceLayer = item.sourceLayer || item.SourceLayer || '';
            const isGatewayBaseOverride = !!(item.isGatewayBaseOverride ?? item.IsGatewayBaseOverride);
            return fileName ? { fileName, sourceFileName, sourceLayer, isGatewayBaseOverride } : null;
          })
          .filter(Boolean);
        this.scriptPreview.fileOptions = opts;
        if (opts.length) {
          this.scriptPreview.fileName = opts[0].fileName;
        }
      } catch (e) {
        this.$messageError(e.message || '加载脚本列表失败');
        this.scriptPreview.show = false;
      } finally {
        this.scriptPreview.loadingFiles = false;
      }
    },
    formatPartitionScanLabel(scan) {
      const n = scan === null || scan === undefined || scan === '' ? NaN : Number(scan);
      if (n === 0) return '游戏内扫码';
      if (n === 1) return '网页 + 游戏内扫码';
      if (n === 2) return '网页充值';
      return '—';
    },
    checkBeforeLoad(id) {
      return new Promise((resolve, reject) => {
        let indexNum = 0;
        this.$api.groupmange
          .checkLink({ partitionId: id })
          .then((data) => {
            if (data.status === 200) {
              const keyValue = data.data;
              const timer = setInterval(() => {
                this.$api.groupmange
                  .timerCheck({ checkKey: keyValue })
                  .then(() => {
                    clearInterval(timer);
                    resolve();
                  })
                  .catch(() => {
                    indexNum++;
                    if (indexNum > 6) {
                      clearInterval(timer);
                      reject(new Error('检测超时'));
                    }
                  });
              }, 500);
            } else {
              reject(new Error('检测失败'));
            }
          })
          .catch(() => {
            reject(new Error('检测失败'));
          });
      });
    },
    getScriptPreviewDialogEl() {
      return document.querySelector('.el-dialog.script-preview-install-dialog');
    },
    onScriptPreviewFullscreenEvent() {
      const el = this.getScriptPreviewDialogEl();
      const fsEl = document.fullscreenElement || document.webkitFullscreenElement;
      this.scriptPreview.fullscreen = !!(el && fsEl === el);
    },
    enterScriptPreviewFullscreen() {
      this.$nextTick(() => {
        const el = this.getScriptPreviewDialogEl();
        if (!el) {
          this.$messageError('未找到预览窗口，请稍后重试');
          return;
        }
        const req = el.requestFullscreen || el.webkitRequestFullscreen;
        if (!req) {
          this.$messageError('当前浏览器不支持该预览区域全屏');
          return;
        }
        req.call(el).catch(() => {
          this.$messageError('无法进入全屏（可能被浏览器拒绝）');
        });
      });
    },
    exitScriptPreviewDialogFullscreen() {
      const fsEl = document.fullscreenElement || document.webkitFullscreenElement;
      if (fsEl && fsEl.classList && fsEl.classList.contains('script-preview-install-dialog')) {
        const ex = document.exitFullscreen || document.webkitExitFullscreen;
        if (ex) {
          ex.call(document).catch(() => {});
        }
      }
      this.scriptPreview.fullscreen = false;
    },
    resetScriptPreview() {
      this.exitScriptPreviewDialogFullscreen();
      this.scriptPreview.partitionId = null;
      this.scriptPreview.partitionName = '';
      this.scriptPreview.templateId = null;
      this.scriptPreview.gameEngine = '';
      this.scriptPreview.fileName = '';
      this.scriptPreview.fileOptions = [];
      this.scriptPreview.isTongQu = false;
      this.scriptPreview.scanModeLabel = '';
      this.scriptPreview.previewText = '';
      this.scriptPreview.loadingFiles = false;
      this.scriptPreview.loadingPreview = false;
      this.scriptPreview.loadingSave = false;
      this.scriptPreview.loadingPartition = false;
      this.scriptPreview.fullscreen = false;
      this.scriptPreviewBatchReplace.show = false;
      this.scriptPreviewBatchReplace.find = '';
      this.scriptPreviewBatchReplace.replace = '';
      this.scriptPreviewBatchReplace.multiLines = '';
      this.scriptPreviewBatchReplace.caseSensitive = false;
      this.scriptPreviewBatchReplace.mode = 'single';
    },
    openScriptPreviewBatchReplace() {
      this.scriptPreviewBatchReplace.show = true;
    },
    async loadScriptPreviewPartitionToGateway() {
      if (!this.scriptPreview.partitionId) {
        this.$messageError('未指定分区');
        return;
      }
      this.exitScriptPreviewDialogFullscreen();
      try {
        await this.$nextTick();
        await this.$confirm(
          '将向网关下发当前分区的加载指令。执行前会先检测网关通讯；默认按「增量更新」（与「加载分区」弹窗未勾选「全部更新」一致）。若需全量更新，请关闭本窗口后在分区列表行内使用「加载」并勾选「全部更新」。',
          '加载分区',
          {
            type: 'warning',
            confirmButtonText: '检测并加载',
            cancelButtonText: '取消'
          }
        );
      } catch (_) {
        return;
      }
      this.scriptPreview.loadingPartition = true;
      try {
        await this.checkBeforeLoad(this.scriptPreview.partitionId);
        const res = await this.$api.groupmange.loadingArea({
          id: this.scriptPreview.partitionId,
          partitionCmdType: 1
        });
        if (res.status !== 200) {
          throw new Error((res.data && res.data.message) || '加载失败');
        }
        this.$messageSuccess('加载成功！');
      } catch (e) {
        this.$messageError(e.message || '网关检测失败或加载失败');
      } finally {
        this.scriptPreview.loadingPartition = false;
      }
    },
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
    applyScriptPreviewBatchReplace() {
      let raw = this.scriptPreview.previewText;
      if (raw === '(空)') {
        raw = '';
      } else {
        raw = String(raw ?? '');
      }
      const cs = this.scriptPreviewBatchReplace.caseSensitive;
      let total = 0;
      let next = raw;

      if (this.scriptPreviewBatchReplace.mode === 'single') {
        const find = this.scriptPreviewBatchReplace.find;
        if (find == null || String(find) === '') {
          this.$messageError('请填写「查找内容」。');
          return;
        }
        const rep =
          this.scriptPreviewBatchReplace.replace == null ? '' : String(this.scriptPreviewBatchReplace.replace);
        const r = this.replaceAllInString(next, String(find), rep, cs);
        next = r.text;
        total = r.count;
      } else {
        const lines = String(this.scriptPreviewBatchReplace.multiLines || '').split(/\r\n|\n|\r/);
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

      this.scriptPreview.previewText = next === '' ? '(空)' : next;
      if (total === 0) {
        this.$message({
          type: 'warning',
          message: '未找到可替换内容。请检查查找文本、大小写或多行分隔符（⇒ 或 =>）。',
          showClose: true,
          duration: 2800,
          offset: 350
        });
      } else {
        this.$messageSuccess(`已替换 ${total} 处`);
        this.scriptPreviewBatchReplace.show = false;
      }
    },
    async saveScriptPreviewToPartition(clearOverride) {
      if (!this.scriptPreview.partitionId || !this.scriptPreview.fileName) return;
      const raw = String(this.scriptPreview.previewText || '');
      const trimmed = raw.trim();
      if (clearOverride) {
        this.exitScriptPreviewDialogFullscreen();
        try {
          await this.$nextTick();
          await this.$confirm('确定清除当前脚本文件在本分区的已保存覆盖？清除后安装将恢复为平台合并模板逻辑。', '清除覆盖', {
            type: 'warning'
          });
        } catch (e) {
          return;
        }
      } else if (trimmed === '' || trimmed === '(空)') {
        this.$messageError('请先生成预览或编辑正文后再保存；若需删除已保存覆盖请点击「清除本条覆盖」。');
        return;
      }
      this.scriptPreview.loadingSave = true;
      try {
        const res = await this.$api.partmodule.savePartitionInstallScriptOverride({
          partitionId: this.scriptPreview.partitionId,
          fileName: this.scriptPreview.fileName,
          content: clearOverride ? '' : raw
        });
        if (res.status !== 200) {
          throw new Error((res.data && res.data.message) || '保存失败');
        }
        this.$messageSuccess(clearOverride ? '已清除本条分区覆盖' : (res.data && res.data.message) || '已保存到当前分区');
        if (clearOverride) {
          await this.runScriptPreview();
        }
      } catch (e) {
        if (e !== 'cancel') {
          this.$messageError(e.message || '保存失败');
        }
      } finally {
        this.scriptPreview.loadingSave = false;
      }
    },
    async runScriptPreview() {
      if (!this.scriptPreview.partitionId || !this.scriptPreview.fileName) return;
      const previousDraft = String(this.scriptPreview.previewText || '').trim();
      this.scriptPreview.loadingPreview = true;
      try {
        const opt = this.scriptPreview.fileOptions.find((o) => o.fileName === this.scriptPreview.fileName);
        const payload = {
          partitionId: this.scriptPreview.partitionId,
          fileName: this.scriptPreview.fileName
        };
        if (opt && opt.sourceFileName && opt.sourceFileName !== opt.fileName) {
          payload.sourceFileName = opt.sourceFileName;
        }
        if (previousDraft && previousDraft !== '(空)') {
          payload.content = this.scriptPreview.previewText;
        }
        const res = await this.$api.partmodule.previewInstallScriptForPartition(payload);
        if (res.status !== 200 || res.data == null) {
          throw new Error((res.data && res.data.message) || '预览失败');
        }
        const body = res.data;
        const text =
          typeof body === 'string' ? body : body.previewText || body.PreviewText || '';
        this.scriptPreview.previewText = text || '(空)';
      } catch (e) {
        this.$messageError(e.message || '预览失败');
      } finally {
        this.scriptPreview.loadingPreview = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.install-script-partition-preview-host {
  display: none;
}
.preview-meta {
  font-size: 13px;
  color: #606266;
}
.mono-preview ::v-deep textarea {
  font-family: Consolas, 'Courier New', monospace;
  font-size: 12px;
  line-height: 1.45;
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

<style lang="scss">
.el-dialog.script-preview-install-dialog:fullscreen {
  margin: 0 !important;
  width: 100vw !important;
  max-width: 100vw !important;
  height: 100vh !important;
  top: 0 !important;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
}
.el-dialog.script-preview-install-dialog:fullscreen .el-dialog__header {
  flex-shrink: 0;
}
.el-dialog.script-preview-install-dialog:fullscreen .el-dialog__body {
  flex: 1;
  /* 全屏元素外不可见 body 上的浮层；下拉必须挂在对话框内，且此处不能 overflow:hidden/auto 裁切选项 */
  overflow: visible;
  display: flex;
  flex-direction: column;
  min-height: 0;
}
.el-dialog.script-preview-install-dialog:fullscreen .el-dialog__footer {
  flex-shrink: 0;
}
.el-dialog.script-preview-install-dialog:fullscreen .script-preview-text-area-wrap {
  flex: 1;
  min-height: 0;
  overflow: auto;
  margin-top: 4px;
}
.el-dialog.script-preview-install-dialog:fullscreen .script-preview-text-area-wrap .mono-preview {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
}
.el-dialog.script-preview-install-dialog:fullscreen .script-preview-text-area-wrap .mono-preview .el-textarea__inner {
  flex: 1;
  min-height: calc(100vh - 280px) !important;
  max-height: none !important;
  resize: vertical;
}
</style>
