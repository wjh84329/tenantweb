<template>
  <div class="footerbox">
    <div class="footer-inner">
      <p v-if="displayAboutHtml" v-html="displayAboutHtml"></p>
      <p v-if="displayCopyrightHtml" v-html="displayCopyrightHtml"></p>
      <p v-if="displayFilingHtml" v-html="displayFilingHtml"></p>
    </div>
    <el-backtop target=".contentBox"></el-backtop>
  </div>
</template>

<script>
export default {
  data() {
    return {
      webName: '', // 网站信息
      copyright: '', // 版权
      icpNumber: '',
      icpUrl: '',
      publicSecurityNumber: '',
      publicSecurityUrl: '',
      // serviceQq: []
      about: ''
    };
  },
  computed: {
    displayAboutHtml() {
      return this.renderFooterHtml(this.about);
    },
    displayCopyrightHtml() {
      return this.renderFooterHtml(this.copyright);
    },
    displayFilingHtml() {
      const links = [];
      const icp = this.renderLegalLink(this.icpNumber, this.icpUrl);
      const publicSecurity = this.renderLegalLink(
        this.publicSecurityNumber,
        this.publicSecurityUrl
      );
      if (icp) links.push(icp);
      if (publicSecurity) links.push(publicSecurity);
      return links.join('　');
    }
  },
  methods: {
    escapeHtml(text) {
      return String(text)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    },
    escapeAttr(text) {
      return this.escapeHtml(text).replace(/`/g, '&#96;');
    },
    normalizeFooterText(text) {
      return (text || '').replace(/钻石/g, '好充值');
    },
    renderLegalLink(text, url) {
      const label = String(text || '').trim();
      if (!label) return '';
      const href = String(url || '').trim();
      if (!/^https?:\/\//i.test(href)) return this.escapeHtml(label);
      return `<a href="${this.escapeAttr(href)}" target="_blank" rel="noopener noreferrer">${this.escapeHtml(label)}</a>`;
    },
    renderFooterHtml(raw) {
      const normalized = this.normalizeFooterText(raw);
      if (!normalized) {
        return '';
      }

      if (typeof window === 'undefined' || typeof DOMParser === 'undefined') {
        return this.escapeHtml(normalized).replace(/\r?\n/g, '<br>');
      }

      const parser = new DOMParser();
      const doc = parser.parseFromString(`<div>${normalized}</div>`, 'text/html');
      const container = doc.body.firstElementChild;

      const renderNode = (node) => {
        if (node.nodeType === window.Node.TEXT_NODE) {
          return this.escapeHtml(node.textContent);
        }

        if (node.nodeType !== window.Node.ELEMENT_NODE) {
          return '';
        }

        const tagName = node.tagName.toLowerCase();
        if (tagName === 'br') {
          return '<br>';
        }

        if (tagName === 'a') {
          const href = (node.getAttribute('href') || '').trim();
          if (!/^https?:\/\//i.test(href)) {
            return this.escapeHtml(node.textContent);
          }
          return `<a href="${this.escapeAttr(href)}" target="_blank" rel="noopener noreferrer">${this.escapeHtml(node.textContent)}</a>`;
        }

        return this.escapeHtml(node.textContent);
      };

      return Array.from(container.childNodes).map(renderNode).join('');
    },
    // 获取注册页面的底部信息
    footerInfo() {
      this.$api.login
        .footerInfo()
        .then(data => {
          if (data.status === 200) {
            this.webName = data.data.webName;
            this.copyright = data.data.copyright;
            this.serviceQq = data.data.serviceQq;
            this.about = data.data.about;
            this.icpNumber = data.data.icpNumber || '';
            this.icpUrl = data.data.icpUrl || '';
            this.publicSecurityNumber = data.data.publicSecurityNumber || '';
            this.publicSecurityUrl = data.data.publicSecurityUrl || '';
          }
        })
        .catch(err => {
          this.$messageError(err.message);
        });
    }
  },
  created() {
    this.footerInfo();
  }
};
</script>

<style scoped>
.footerbox {
  width: 100%;
  background: #f7faff;
  border-top: 1px solid #e3edf9;
}

.footer-inner {
  width: min(1300px, calc(100% - 48px));
  min-height: 96px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 24px 0;
  text-align: center;
}

.footerbox p {
  margin: 4px 0;
  color: #66758d;
  line-height: 24px;
  font-size: 14px;
}

.footerbox p /deep/ a {
  color: #1f6bff;
  text-decoration: underline;
}

.footerbox p /deep/ a:hover {
  color: #0d4ed8;
}
</style>
