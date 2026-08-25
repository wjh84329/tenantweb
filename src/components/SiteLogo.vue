<template>
  <img v-if="currentSrc" :src="currentSrc" :alt="alt" :style="logoStyle" @error="handleError" />
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
      default: ''
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
    },
    logoType: {
      type: String,
      default: 'site'
    }
  },
  data() {
    return {
      currentSrc: '',
      sourceKind: 'loading'
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
    },
    logoType() {
      this.resetImage();
    }
  },
  methods: {
    buildRemoteSrc() {
      const defaultResource = this.logoType === 'home' ? 'HomeLogo' : 'logo';
      const resourceName = String(this.resourceName || defaultResource).trim() || defaultResource;
      return `${remoteBaseUrl}/api/Upload/ShowFile?name=${encodeURIComponent(resourceName)}`;
    },
    buildGlobalSiteLogoSrc() {
      return `${remoteBaseUrl}/api/Upload/ShowFile?name=logo`;
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
        const siteInfo = response && response.data ? response.data : {};
        const logoUrl = this.logoType === 'home'
          ? (siteInfo.homeLogoUrl || siteInfo.logoUrl || '')
          : (siteInfo.logoUrl || '');
        if (siteInfo.isAgentSite) {
          this.sourceKind = logoUrl ? 'agent' : 'empty';
          this.currentSrc = logoUrl
            ? (/^https?:\/\//i.test(logoUrl)
              ? logoUrl
              : `${tenantBaseUrl}${logoUrl.charAt(0) === '/' ? logoUrl : `/${logoUrl}`}`)
            : '';
          return;
        }
        this.showGlobalLogo();
      } catch (e) {
        // Keep the logo area neutral when site ownership cannot be determined.
        this.sourceKind = 'empty';
        this.currentSrc = '';
      }
    },
    showGlobalLogo() {
      this.sourceKind = 'global';
      this.currentSrc = this.buildRemoteSrc();
    },
    handleError() {
      if (this.sourceKind === 'agent') {
        this.sourceKind = 'empty';
        this.currentSrc = '';
        return;
      }
      if (this.sourceKind === 'local') {
        return;
      }
      if (this.sourceKind === 'global' && this.logoType === 'home') {
        this.sourceKind = 'global-site-fallback';
        this.currentSrc = this.buildGlobalSiteLogoSrc();
        return;
      }
      this.sourceKind = 'local';
      this.currentSrc = this.getFallbackSrc();
    },
    resetImage() {
      this.sourceKind = 'loading';
      this.currentSrc = '';
      this.loadAgentBranding();
    }
  }
};
</script>
