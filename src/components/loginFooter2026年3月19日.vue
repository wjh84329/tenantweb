<template>
  <div class="footerbox">
    <p>
    {{ about }}
    </p>
    <p>
      {{ copyright }}
    </p>
    <div style="padding-bottom: 25px;">
      <img src="../assets/newLogin/sm.png" />
      <img src="../assets/newLogin/m2.jpg" />
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
      // serviceQq: []
      about: ''
    };
  },
  methods: {
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
  background-color: #3e3e3e;
  /* height: 340px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 134px;
}
.footerbox p {
  /* margin: 15px 0; */
  padding-top: 25px;
  /* padding-bottom: 30px; */
  color: #bbbbbb;
  line-height: 20px;
  font-size: 14px;
}
</style>
