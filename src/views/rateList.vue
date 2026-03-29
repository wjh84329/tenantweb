<!--
 * @Description: 结算比率
 * @Author: gao shuai
 * @Date: 2020-05-12 14:57:26
 * @LastEditTime: 2020-05-22 15:47:26
 * @LastEditors: gao shuai
 -->

 <template>
  <div class="home">
    <!-- <div class="gs_title">结算比率</div> -->
    <div class="tablebox pdb15 pdt20">
      <div class="gs_tablebox">
        <el-table ref="moduleTable" size="mini" :data="tableData" border style="width: 100%" stripe>
          <el-table-column type="index" label="序号" width="65"></el-table-column>
          <el-table-column prop="productName" label="产品名称">
          </el-table-column>
          <el-table-column prop="rate" label="结算费率(%)">
          </el-table-column>
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.state" @change="stateChange(scope.row)" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </template>
          </el-table-column>
          <el-table-column
            v-if="channelSettingEnabled"
            label="设置通道"
            align="center"
            min-width="220"
          >
            <template slot-scope="scope">
              <!-- 阻止 el-table 行点击等事件吞掉点击 -->
              <div @click.stop>
                <el-select
                  v-model="scope.row.selectedGalleryId"
                  placeholder="请选择通道"
                  clearable
                  filterable
                  style="width: 200px;"
                  @click.native.stop
                  @change="(val) => onChannelChanged(scope.row, val)"
                >
                  <el-option
                    v-for="(g, idx) in channelGalleries"
                    :key="(g.id || g.Id) + '_' + idx"
                    :label="`通道${g.id || g.Id}`"
                    :value="g.id || g.Id"
                  />
                </el-select>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [],
      channelSettingEnabled: false,
      channelGalleries: [],
      channelSelectedMap: {}, // ProductsId -> GalleryId（用于回显）

      // === 新增：下拉变更后自动保存需要的状态 ===
      savingChannel: false,
      channelSaveTimer: null,
      channelPendingMap: null
    };
  },
  watch: {
    channelGalleries() {
      this.applyChannelDefaults();
    },
    tableData() {
      this.applyChannelDefaults();
    },
    channelSelectedMap: {
      deep: true,
      handler() {
        this.applyChannelDefaults();
      }
    }
  },
  methods: {
    // 获取列表
    getlist() {
      this.$api.home
        .rankList()
        .then((data) => {
          if (data.status === 200) {
            const rows = Array.isArray(data.data) ? data.data : [];

            // 关键：Vue2 里必须提前声明该字段，否则 v-model 改了也不刷新
            rows.forEach(r => {
              if (typeof r.selectedGalleryId === 'undefined') {
                this.$set(r, 'selectedGalleryId', '');
              }
            });

            this.tableData = rows;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },

    // 改变状态切换
    stateChange(data) {
      this.$api.home
        .rankState({
          productId: data.productId,
          state: data.state
        })
        .then((data) => {
          if (data.status === 200) {
            this.$messageSuccess('状态修改成功！');
            this.getlist();
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },

    loadMerchantSwitch() {
      this.$api.home.getMerchantsInformationList({ PageNumber: 1, PageSize: 1 })
        .then((res) => {
          if (!res || res.status !== 200) return;
          const raw = res.data || {};
          // 避免覆盖 GetProductChannelSetting 的 enabled（以 setting 接口为准）
          if (this.channelSettingEnabled !== true) {
            this.channelSettingEnabled = !!(raw.isEnableProductChannelSelect || raw.IsEnableProductChannelSelect);
          }
        })
        .catch(() => {
          // 不强制改成 false，避免覆盖 setting 接口的结果
        });
    },

    // ====== 修复：产品Id字段兼容 productsId ======
    getProductId(row) {
      return row.productId || row.productsId || row.ProductsId || row.id || row.Id;
    },

    loadProductChannelSetting() {
      this.$api.home.getProductChannelSetting()
        .then((res) => {
          if (!res || res.status !== 200) return;

          this.channelSettingEnabled = !!res.data.enabled;
          this.channelGalleries = Array.isArray(res.data.galleries) ? res.data.galleries : [];

          // ====== 修复：items 字段兼容 productsId/galleryId（小写） ======
          const items = Array.isArray(res.data.items) ? res.data.items : [];
          const m = {};
          items.forEach(it => {
            const pid = it.ProductsId || it.ProductId || it.productsId;
            const gid = it.GalleryId || it.galleryId;
            if (pid && gid) m[pid] = gid;
          });
          this.channelSelectedMap = m;

          this.applyChannelDefaults();
        });
    },

    // 关键：把“未设置”的行默认选中一个通道（仅影响显示；不会触发保存）
    applyChannelDefaults() {
      if (!this.channelSettingEnabled) return;

      const rows = Array.isArray(this.tableData) ? this.tableData : [];
      const gs = Array.isArray(this.channelGalleries) ? this.channelGalleries : [];
      if (rows.length === 0 || gs.length === 0) return;

      const firstId = Number(gs[0].id ?? gs[0].Id ?? 0);
      if (!firstId) return;

      rows.forEach(row => {
        if (typeof row.selectedGalleryId === 'undefined') {
          this.$set(row, 'selectedGalleryId', '');
        }

        // 用户已选，不覆盖
        if (row.selectedGalleryId) return;

        const pid = this.getProductId(row);

        // 回显已保存映射（修复：不用 ?. 避免兼容问题）
        const mapped = pid && this.channelSelectedMap ? this.channelSelectedMap[pid] : null;
        if (mapped) {
          this.$set(row, 'selectedGalleryId', Number(mapped));
          return;
        }

        // 产品行自带默认（兼容大小写）
        const builtIn = row.galleryId || row.GalleryId;
        if (builtIn) {
          this.$set(row, 'selectedGalleryId', Number(builtIn));
          return;
        }

        // 兜底默认
        this.$set(row, 'selectedGalleryId', firstId);
      });
    },

    onChannelChanged(row, val) {
      if (!this.channelSettingEnabled) return;

      const pid = Number(this.getProductId(row));
      if (!pid) return;

      const base = this.channelPendingMap ? { ...this.channelPendingMap } : { ...(this.channelSelectedMap || {}) };

      const gid = Number(val || 0);
      if (gid > 0) base[pid] = gid;
      else delete base[pid]; // clearable 清空 => 删除映射

      this.channelPendingMap = base;

      if (this.channelSaveTimer) clearTimeout(this.channelSaveTimer);
      this.channelSaveTimer = setTimeout(() => {
        this.channelSaveTimer = null;
        this.saveChannelMapNow();
      }, 300);
    },

    saveChannelMapNow() {
      if (this.savingChannel) return;
      if (!this.channelPendingMap) return;

      const items = Object.keys(this.channelPendingMap)
        .map(k => ({
          ProductsId: Number(k),
          GalleryId: Number(this.channelPendingMap[k])
        }))
        .filter(x => x.ProductsId > 0 && x.GalleryId > 0);

      this.savingChannel = true;
      this.$api.home.saveProductChannelSetting({ Items: items })
        .then((res) => {
          if (res && res.status === 200) {
            this.channelSelectedMap = { ...this.channelPendingMap };
            this.channelPendingMap = null;

            // 新增：成功提示
            this.$messageSuccess('操作成功');
          } else {
            const msg = res?.data?.message || res?.data?.Message || '保存失败';
            this.$messageError(msg);
          }
        })
        .catch((err) => this.$messageError(err?.message || '保存失败'))
        .finally(() => {
          this.savingChannel = false;
        });
    }
  },
  created() {
    this.getlist();
    this.loadMerchantSwitch();
    this.loadProductChannelSetting();
  }
};
</script>
<style lang="scss" scoped>
.gs_title {
  background: var(--theme-color);
}
.opeartbox {
  padding: 15px 20px 5px;
  background: #fff;
  ul {
    li {
      float: left;
      margin-right: 15px;
      margin-bottom: 10px;
      .tit {
        font-size: 14px;
        color: #fff;
        margin-right: 5px;
      }
      .txtbox {
        display: inline-block;
      }
    }
  }
}
.tc pdt10 pdb10 {
  text-align: center;
}
</style>
