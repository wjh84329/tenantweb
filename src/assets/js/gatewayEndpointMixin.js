/**
 * 安装/编辑分区：网关 IP+端口 与平台已注册设备匹配。
 * 列表仅在进入页面时拉取会导致「先校验失败、后开网关」仍提示不消失，故支持刷新与自动重检。
 */
import { Message } from 'element-ui';

export default {
  data() {
    return {
      gatewayEndpointHint: '',
      _gatewayEquipRefreshTimer: null
    };
  },
  watch: {
    gatewayIp() {
      this.onGatewayEndpointInputsChanged();
    },
    gatewayPort() {
      this.onGatewayEndpointInputsChanged();
    }
  },
  beforeDestroy() {
    if (this._gatewayEquipRefreshTimer) {
      clearTimeout(this._gatewayEquipRefreshTimer);
    }
  },
  methods: {
    shouldValidateGatewayEndpoint() {
      return (
        typeof this.gatewayTypesNeedEndpoint === 'function' &&
        this.gatewayTypesNeedEndpoint() &&
        typeof this.shouldRequireGatewayValidation === 'function' &&
        this.shouldRequireGatewayValidation()
      );
    },
    onGatewayEndpointInputsChanged() {
      this.gatewayEndpointHint = '';
      Message.closeAll();
      if (this.shouldValidateGatewayEndpoint()) {
        this.scheduleRefreshGatewayEquipList(true);
      }
    },
    scheduleRefreshGatewayEquipList(silent) {
      if (this._gatewayEquipRefreshTimer) {
        clearTimeout(this._gatewayEquipRefreshTimer);
      }
      this._gatewayEquipRefreshTimer = setTimeout(() => {
        this.refreshGatewayEquipList(silent);
      }, 350);
    },
    refreshGatewayEquipList(silent) {
      return this.$api.partinstall
        .getMachineCode()
        .then(data => {
          if (data.status === 200) {
            this.serverDrow = data.data || [];
          } else if (data.status === 204) {
            this.serverDrow = [];
          }
          if (typeof this.tryFillGatewayIpPort === 'function') {
            this.tryFillGatewayIpPort();
          }
          this.recheckGatewayEndpointHint();
          return this.serverDrow;
        })
        .catch(err => {
          if (!silent) {
            this.$messageError(err.message);
          }
          return Promise.reject(err);
        });
    },
    recheckGatewayEndpointHint() {
      if (!this.shouldValidateGatewayEndpoint()) {
        this.gatewayEndpointHint = '';
        return;
      }
      const inputIp = (this.gatewayIp || '').trim();
      const portNum = parseInt(this.gatewayPort, 10);
      if (!inputIp || Number.isNaN(portNum)) {
        return;
      }
      const r = this.resolveMachineCodeFromEndpoint();
      if (r.ok) {
        this.gatewayEndpointHint = '';
        Message.closeAll();
      }
    },
    showGatewayEndpointError(message) {
      Message.closeAll();
      this.gatewayEndpointHint = message || '';
      if (message) {
        this.$messageError(message);
      }
    },
    async ensureGatewayEndpointResolved() {
      if (!this.shouldValidateGatewayEndpoint()) {
        return { ok: true, machineCode: (this.serverIp || '').trim() };
      }
      try {
        await this.refreshGatewayEquipList(true);
      } catch (e) {
        return { ok: false, message: '刷新已注册网关列表失败' };
      }
      const r = this.resolveMachineCodeFromEndpoint();
      if (!r.ok) {
        this.showGatewayEndpointError(r.message);
      } else {
        this.gatewayEndpointHint = '';
        Message.closeAll();
      }
      return r;
    },
    normalizeGatewayIp(ip) {
      let s = (ip || '').trim();
      if (s.toLowerCase().startsWith('::ffff:')) {
        s = s.substring(7);
      }
      return s.toLowerCase();
    },
    matchEquipByEndpoint(equipIp, equipPort, inputIp, inputPort) {
      return (
        this.normalizeGatewayIp(equipIp) === this.normalizeGatewayIp(inputIp) &&
        Number(equipPort) === Number(inputPort)
      );
    },
    resolveMachineCodeFromEndpoint() {
      const inputIp = (this.gatewayIp || '').trim();
      const portNum = parseInt(this.gatewayPort, 10);
      if (!inputIp || Number.isNaN(portNum) || portNum < 1 || portNum > 65535) {
        return { ok: false, message: '请填写有效的网关 IP 与 监听端口（1-65535）' };
      }
      const list = this.serverDrow || [];
      const found = list.find(e =>
        this.matchEquipByEndpoint(
          e.ip || e.Ip,
          e.port == null ? e.Port : e.port,
          inputIp,
          portNum
        )
      );
      if (!found) {
        return {
          ok: false,
          message:
            '未找到与所填 IP、端口一致的已注册网关，请确认网关已运行且已在平台注册。'
        };
      }
      const machineCode = (found.machineCode || found.MachineCode || '').trim();
      if (!machineCode) {
        return {
          ok: false,
          message: '已找到对应网关，但平台登记记录缺少设备实例 ID，请重启网关后重试。'
        };
      }
      return { ok: true, machineCode };
    },
    gatewayTypesNeedEndpoint() {
      return this.typeindex === 1 || this.typeindex === 2 || this.typeindex === 6;
    }
  }
};
