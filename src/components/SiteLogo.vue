<template>
  <img :src="currentSrc" :alt="alt" :style="logoStyle" @error="handleError" />
</template>

<script>
import api from '../assets/js/apiRequestHandler';
import { netUrl, url as tenantApiUrl } from '../assets/js/version';

const remoteBaseUrl = String(netUrl || '').replace(/\/+$/, '');
const tenantBaseUrl = String(tenantApiUrl || '').replace(/\/+$/, '');
let brandingRequest = null;
const fallbackMap = {
  logo: require('../assets/img/logo.png'),
  logo2: require('../assets/img/logo2.png'),
  logo3: require('../assets/img/logo3.png'),
  legacy: require('../assets/images/logo.png')
};

export default {
  name: 'SiteLogo',
  props: {
    alt: {
      type: String,
      default: '网站logo'
    },
    resourceName: {
      type: String,
      default: 'logo'
    },
    variant: {
      type: String,
      default: 'logo3'
    },
    width: {
      type: [String, Number],
      default: ''
    },
    height: {
      type: [String, Number],
      default: ''
    },
    fit: {
      type: String,
      default: 'contain'
    }
  },
  data() {
    return {
      currentSrc: this.buildRemoteSrc(),
      sourceKind: 'global'
    };
  },
  mounted() {
    this.loadAgentBranding();
  },
  computed: {
    logoStyle() {
      const style = {
        display: 'block',
        objectFit: this.fit || 'contain'
      };

      if (this.width !== '' && this.width !== null && this.width !== undefined) {
        style.width = typeof this.width === 'number' ? `${this.width}px` : this.width;
      }

      if (this.height !== '' && this.height !== null && this.height !== undefined) {
        style.height = typeof this.height === 'number' ? `${this.height}px` : this.height;
      }

      return style;
    }
  },
  watch: {
    resourceName() {
      this.resetImage();
    },
    variant() {
      if (this.sourceKind === 'local') {
        this.currentSrc = this.getFallbackSrc();
      }
    }
  },
  methods: {
    buildRemoteSrc() {
      const resourceName = String(this.resourceName || 'logo').trim() || 'logo';
      return `${remoteBaseUrl}/api/Upload/ShowFile?name=${encodeURIComponent(resourceName)}`;
    },
    getFallbackSrc() {
      return fallbackMap[this.variant] || fallbackMap.logo3;
    },
    async loadAgentBranding() {
      try {
        if (!brandingRequest) {
          brandingRequest = api({
            url: '/api/About/GetTenantBaseInfoAsync',
            method: 'get',
            params: { siteDomain: window.location.host }
          }).catch(error => {
            brandingRequest = null;
            throw error;
          });
        }
        const response = await brandingRequest;
        const logoUrl = response && response.data ? response.data.logoUrl : '';
        if (!logoUrl) return;
        this.currentSrc = /^https?:\/\//i.test(logoUrl)
          ? logoUrl
          : `${tenantBaseUrl}${logoUrl.charAt(0) === '/' ? logoUrl : `/${logoUrl}`}`;
        this.sourceKind = 'agent';
      } catch (e) {
        // 公共配置不可用时继续使用平台Logo。
      }
    },
    handleError() {
      if (this.sourceKind === 'agent') {
        this.sourceKind = 'global';
        this.currentSrc = this.buildRemoteSrc();
        return;
      }
      if (this.sourceKind === 'local') {
        return;
      }
      this.sourceKind = 'local';
      this.currentSrc = this.getFallbackSrc();
    },
    resetImage() {
      this.sourceKind = 'global';
      this.currentSrc = this.buildRemoteSrc();
      this.loadAgentBranding();
    }
  }
};
</script>
