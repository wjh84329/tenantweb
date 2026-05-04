<template>
  <div id="app" v-if="signedIn">
    <router-view />
  </div>
</template>

<script>
import Mgr from './assets/js/SecurityService';
import { getAuthHeaders } from './assets/js/securityapi';
// import axios from 'axios';
export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload,
      getAuthHeaders: getAuthHeaders
    };
  },
  data() {
    return {
      signedIn: true,
      mgr: new Mgr()
    };
  },
  methods: {
    // 刷新
    reload() {
      this.signedIn = false;
      this.$nextTick(() => {
        this.signedIn = true;
      });
    },
    async getIp() {
      try {
        // 假设你用 axios 获取
        const resp = await fetch('https://icanhazip.com');
        if (resp.ok) {
          const txt = (await resp.text()).trim();
          if (/^\d{1,3}(\.\d{1,3}){3}$/.test(txt)) localStorage.setItem('user_ip', txt);
        }
        // localStorage.setItem('user_ip', res);
      } catch (e) {
        // 失败时可选处理
        localStorage.setItem('user_ip', '');
      }
    }
  },
  mounted() {
    this.getIp();
  },
  created() {}
};
</script>
<style>
.layui-elem-field {
  border-width: 1px;
  border-style: solid;
}

legend {
  display: block;
  padding-inline-start: 10px;
  padding-inline-end: 10px;
  border-width: initial;
  border-style: none;
  border-color: initial;
  border-image: initial;
}
</style>
<style lang="scss" scoped>
#app {
  height: 100%;
  width: 100%;
}
</style>
