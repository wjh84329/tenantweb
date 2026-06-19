<template>
  <img :src="currentSrc" :alt="alt" :style="logoStyle" @error="handleError" />
</template>

<script>
import { netUrl } from '../assets/js/version';

const remoteBaseUrl = String(netUrl || '').replace(/\/+$/, '');
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
      hasFallenBack: false
    };
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
      if (this.hasFallenBack) {
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
    handleError() {
      if (this.hasFallenBack) {
        return;
      }
      this.hasFallenBack = true;
      this.currentSrc = this.getFallbackSrc();
    },
    resetImage() {
      this.hasFallenBack = false;
      this.currentSrc = this.buildRemoteSrc();
    }
  }
};
</script>
