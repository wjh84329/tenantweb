<!--
 * @Description:获取代码
 * @Author: xu wei
 * @Date: 2020-03-13 10:54:10
 * @LastEditTime: 2020-08-25 14:37:52
 * @LastEditors: gao shuai
 -->
<template>
  <div class="home">
    <div class="gs_title" style="color: white;">获取代码</div>
    <div style="display: flex;padding-left: 1%;padding-right: 1%;">
      <div class="opeartbox">
        <div class="easttop">
          <ul>
            <li>
              <span class='tit'>游戏分组：</span>
              <span class="txtbox">
                <el-select v-model="gamegroupingpage" clearable size="small" placeholder="请选择">
                  <el-option v-for="(item, i) in gamegroupingdrow" :key="'gamegrouping' + i" :label="item.name"
                    :value="item.uuid"></el-option>
                </el-select>
              </span>
            </li>
            <li>
              <span class='tit'>充值站点：</span>
              <span class="txtbox">
                <el-select v-model="rechargesitepage" size="small" placeholder="请选择">
                  <el-option v-for="(item, i) in rechargesitedrow" :key="'rechargesite' + i" :label="item.name"
                    :value="item.url"></el-option>
                </el-select>
              </span>
            </li>
            <el-button size="small" type="primary" @click="downLink" :loading="loading">下载多线路充值文件</el-button>
          </ul>
        </div>
        <div>
          <ul>
            <li>
              <p class="tip_red">预览</p>
              <el-radio-group v-model="preview" @change="previewSwitch">
                <el-radio :label="1">开启</el-radio>
                <el-radio :label="0">关闭</el-radio>
              </el-radio-group>
            </li>
            <li>
              <p class="tip_red">飘浮样式</p>
              <el-radio-group v-model="floatstyle" @change="floatstyleChange">
                <el-radio :label="1">普通样式</el-radio>
                <el-radio :label="2">随机漂浮</el-radio>
                <el-radio :label="3">对联漂浮</el-radio>
              </el-radio-group>
            </li>
            <li>
              <p class="tip_red">飘浮图片</p>
              <el-radio-group v-model="floatingpictures" @change="floatingpicturesChange">
                <el-radio :label="0">样式一</el-radio>
                <el-radio style="margin-left: -10px;" :label="1">样式二</el-radio>
                <el-radio style="margin-left: -10px;" :label="2">样式三</el-radio>
                <el-radio :label="3">样式四</el-radio>
                <el-radio :label="4">样式五</el-radio>
                <el-radio style="margin-left: -10px;" :label="5">样式六</el-radio>
                <el-radio style="margin-left: -10px;" :label="6">样式七</el-radio>
                <el-radio :label="7">样式八</el-radio>
              </el-radio-group>
            </li>
          </ul>
          <p class="mgt15">
            <el-button size="small" type="primary" @click="copyCode">复制漂浮代码</el-button>
          </p>
        </div>
        <div class="alignmentright">
          <ul>
            <li>
              <p class="tip_red">充值链接地址</p>
              <div class="pre-code">
                <el-button class="buttonright" size="mini" @click="copy(1)">复制</el-button>
                <div class="text">{{ codeText1 }}</div>
              </div>
            </li>
            <li>
              <div class="tip_red">发布站来源统计 <el-switch style="margin-left:15px;" v-model="publishSwitch"
                  @change="publicChange" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                <div style="color:grey;margin-left:25px;font-weight:normal;font-size: 14px;">{{ text1 }}</div>
                <div style="color:grey;margin-left:25px;font-weight:normal;font-size: 14px;margin-bottom: 10px;">
                  代码功能：统计玩家从哪个广告站进的您的网站，直接进入您网站的玩家不记录访问数据
                </div>
              </div>
              <div class="pre-blue">
                <el-button class="buttonright" size="mini" @click="copy(2)">复制</el-button>
                <div class="text">{{ codeText2 }}</div>
              </div>
            </li>
            <li>
              <div class="tip_red">登录器访问统计 <el-switch style="margin-left:15px;" v-model="LoginSwitch"
                  @change="LoginChange" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                <div style="color:grey;margin-left:25px;font-weight:normal;font-size: 14px;">{{ text2 }}</div>
                <div style="color:grey;margin-left:25px;font-weight:normal;font-size: 14px;">
                  代码功能：统计玩家运行登陆器的次数。
                </div>
                <div style="color:grey;margin-left:25px;font-weight:normal;font-size: 14px;margin-bottom: 10px;">
                  主要作用：统计从哪个广告站过来的玩家进入游戏最多。
                </div>
              </div>
              <div class="pre-blue">
                <el-button class="buttonright" size="mini" @click="copy(3)">复制</el-button>
                <div class="text">{{ codeText3 }}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <!-- 商户自定义域名管理 -->
      <div class="custom-domain-box">
        <div class="custom-domain-title">商户自定义域名：</div>
        <div class="custom-domain-table">
          <div class="custom-domain-row custom-domain-header">
            <span class="custom-domain-col domain-name">域名名称</span>
            <span class="custom-domain-col domain-url">域名地址</span>
            <span class="custom-domain-col domain-action">操作</span>
          </div>
          <div v-for="(item, idx) in customDomains" :key="'domain' + idx" class="custom-domain-row">
            <span class="custom-domain-col domain-name">
              <el-input v-model="item.name" size="small" placeholder="域名"></el-input>
            </span>
            <span class="custom-domain-col domain-url">
              <el-input v-model="item.url" size="small" placeholder="域名地址"></el-input>
            </span>
            <span class="custom-domain-col domain-action">
              <el-button size="mini" type="danger" @click="removeDomain(idx)">删除</el-button>
              <el-button size="mini" :type="item.enabled ? 'warning' : 'success'" @click="toggleDomain(idx)">{{
                item.enabled ? '禁用' : '启用' }}</el-button>
            </span>
          </div>
          <div class="custom-domain-row">
            <span class="custom-domain-col domain-name">
              <el-input v-model="newDomain.name" size="small" placeholder="域名"></el-input>
            </span>
            <span class="custom-domain-col domain-url">
              <el-input v-model="newDomain.url" size="small" placeholder="域名地址"></el-input>
            </span>
            <span class="custom-domain-col domain-action">
              <el-button size="mini" type="primary" @click="addDomain">添加</el-button>
            </span>
          </div>
        </div>
        <el-button class="custom-domain-save" size="small" type="primary" @click="saveDomains">保存</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { url } from '../assets/js/version';
export default {
  data() {
    return {
      customDomains: [], // 商户自定义域名列表
      newDomain: { name: '', url: '' },
      text1: '使用说明：复制该代码加入到网站首页底部的</body>前面即可',
      text2: '使用说明：复制该代码加到登陆器右边广告页面底部的</body>前面即可',
      loading: false, // 下载按钮防呆
      gamegroupingpage: '', // 游戏分组
      gamegroupingdrow: [], // 游戏分组下拉
      rechargesitepage: '', // 充值站点
      rechargesitedrow: [], // 充值站点下拉
      preview: 0, // 预览
      floatstyle: 1, // 飘浮样式
      floatingpictures: 0, // 飘浮图片
      publishSwitch: false, // 发布站来源统计
      LoginSwitch: false, // 登录器访问统计
      codeText2: '',
      codeText3: ''
    };
  },
  computed: {
    ...mapState(['uuid']),
    codeText1: function () {
      if (this.gamegroupingpage === '') {
        this.$store.commit(
          'changeUrl',
          this.rechargesitepage + '/chargepage/' + this.uuid
        );
        return this.rechargesitepage + '/chargepage/' + this.uuid;
      } else {
        this.$store.commit(
          'changeUrl',
          this.rechargesitepage + '/chargepageg/' + this.gamegroupingpage
        );
        return this.rechargesitepage + '/chargepageg/' + this.gamegroupingpage;
      }
    }
  },
  methods: {
    // 添加自定义域名
    addDomain() {
      if (!this.newDomain.name || !this.newDomain.url) {
        this.$messageError('请填写完整的域名和地址');
        return;
      }
      this.customDomains.push({
        name: this.newDomain.name,
        url: this.newDomain.url,
        enabled: true
      });
      this.newDomain = { name: '', url: '' };
    },
    // 删除自定义域名
    removeDomain(idx) {
      this.customDomains.splice(idx, 1);
    },
    // 启用/禁用自定义域名
    toggleDomain(idx) {
      this.customDomains[idx].enabled = !this.customDomains[idx].enabled;
    },
    // 保存自定义域名（这里只做本地保存，可扩展为API调用）
    saveDomains() {
      const params = this.customDomains.map((domain) => {
        let url = domain.url || '';
        if (!/^https?:\/\//i.test(url)) {
          url = 'http://' + url;
        }
        return {
          name: domain.name,
          url: url,
          state: domain.enabled
        };
      });
      // 后续逻辑不变
      this.$api.getcode
        .addCustomDomain(params)
        .then((data) => {
          if (data.status === 200) {
            this.$messageSuccess('保存成功！');
            this.getCustomDomainList();
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 获取商户自定义域名列表
    getCustomDomainList() {
      this.$api.getcode
        .getCustomDomainList()
        .then((res) => {
          if (res.status === 200 && Array.isArray(res.data)) {
            this.customDomains = res.data.map(item => ({
              name: item.name || item.Name,
              url: item.url || item.Url,
              enabled: item.state
            }));
            // this.rechargesitepage值为第一个未禁用的域名地址
            const firstEnabledDomain = this.customDomains.find(domain => domain.enabled);
            if (firstEnabledDomain) {
              this.rechargesitepage = firstEnabledDomain.url;
            }
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 获取用户信息
    getUser() {
      this.$api.home
        .getUserinfo()
        .then((data) => {
          this.publishSwitch = data.data.isIps;
          this.LoginSwitch = data.data.isLogger;
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 获取统计代码
    getCode() {
      this.$api.getcode
        .staticCode()
        .then((data) => {
          if (data.status === 200) {
            this.codeText2 = data.data.ipsData;
            this.codeText3 = data.data.loggerData;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 游戏分组下拉
    gameAreaDraw() {
      this.$api.getcode
        .gameDraw()
        .then((data) => {
          if (data.status === 200) {
            this.gamegroupingdrow = data.data;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 充值站点
    chargeStation() {
      this.$api.getcode
        .chargeStation()
        .then((data) => {
          if (data.status === 200) {
            this.rechargesitedrow = data.data;
            this.rechargesitepage = data.data[0].url;
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 发布站来源统计开关
    publicChange() {
      this.$api.getcode
        .publishSwitch()
        .then((data) => {
          if (data.status === 200) {
            this.$messageSuccess('切换成功！');
            this.getUser();
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 登录器访问开关
    LoginChange() {
      this.$api.getcode
        .loginSwitch()
        .then((data) => {
          if (data.status === 200) {
            this.$messageSuccess('切换成功！');
            this.getUser();
          }
        })
        .catch((err) => {
          this.$messageError(err.message);
        });
    },
    // 点击下载
    downLink() {
      if (!this.loading) {
        this.loading = true;
        this.$api.getcode
          .downLink({
            group: this.gamegroupingpage
          })
          .then((data) => {
            this.loading = false;
            if (data.status === 200) {
              // 创建隐藏的可下载链接
              let eleLink = document.createElement('a');
              eleLink.style.display = 'none';
              // 字符内容转变成blob地址
              eleLink.href = data.data;
              // 触发点击
              document.body.appendChild(eleLink);
              eleLink.click();
              // 然后移除
              document.body.removeChild(eleLink);
            }
          })
          .catch((err) => {
            this.loading = false;
            this.$messageError(err.message);
          });
      }
    },
    // 复制
    copy(id) {
      let Url2 = '';
      switch (id) {
        case 1:
          Url2 = this.codeText1;
          break;
        case 2:
          Url2 = this.codeText2;
          break;
        case 3:
          Url2 = this.codeText3;
          break;
      }
      let oInput = document.createElement('input');
      oInput.value = Url2;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象
      document.execCommand('Copy'); // 执行浏览器复制命令
      oInput.className = 'oInput';
      oInput.style.display = 'none';
      this.$messageSuccess('复制成功');
      document.body.removeChild(oInput);
    },
    // 预览的开启
    previewSwitch() {
      this.$store.commit('changePreview', this.preview);
    },
    // 飘浮样式
    floatstyleChange() {
      this.$store.commit('changefloatstyle', this.floatstyle);
    },
    // 飘浮的图片
    floatingpicturesChange() {
      this.$store.commit('changefloatingpictures', this.floatingpictures);
    },
    // 复制样式代码
    copyCode() {
      let texts = '';
      if (this.floatstyle === 1) {
        texts =
          '<!--if--><!--if--><div style="position: fixed; z-index: 999; top: 30%; right: 0px;"><a href="' +
          this.codeText1 +
          '" target="_blank" title="点击前往充值"><img style="border: none;" class="image-style" src="' +
          url +
          'img/style' +
          (this.floatingpictures + 1) +
          '.png"></a></div>';
      } else if (this.floatstyle === 2) {
        texts =
          '<div style="position: absolute; z-index: 999; top: 30%;"><a href="' +
          this.codeText1 +
          '" target="_blank" title="点击前往充值"><img style="border: none;" class="image-style" src="' +
          url +
          'img/style' +
          (this.floatingpictures + 1) +
          '.png"></a><script data-float-id="" type="text/javascript" src="' +
          url +
          'img/floating.js' +
          '"></sc' +
          'ript></div><!--if--><!--if-->';
      } else if (this.floatstyle === 3) {
        texts =
          '<!--if--><div style="position: fixed; z-index: 999; top: 30%;"><a href="' +
          this.codeText1 +
          '" target="_blank" title="点击前往充值"><img style="border: none;" class="image-style" src="' +
          url +
          'img/style' +
          +(this.floatingpictures + 1) +
          '.png' +
          '"></a></div><div style="position: fixed; z-index: 999; top: 30%; right: 0px;"><a href="' +
          this.codeText1 +
          '" target="_blank" title="点击前往充值"><img style="border: none;" class="image-style" src="' +
          url +
          'img/style' +
          (this.floatingpictures + 1) +
          '.png"></a></div>';
      }
      let oInput = document.createElement('input');
      oInput.value = texts;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象
      document.execCommand('Copy'); // 执行浏览器复制命令
      oInput.className = 'oInput';
      oInput.style.display = 'none';
      this.$messageSuccess('复制成功');
      document.body.removeChild(oInput);
    }
  },
  created() {
    // 初始化为空
    this.customDomains = [];
    this.getUser();
    this.getCode();
    this.gameAreaDraw();
    this.chargeStation();
    // 获取商户自定义域名列表
    this.getCustomDomainList();
  },
  beforeDestroy() {
    this.$store.commit('changePreview', 0);
    this.$store.commit('changefloatstyle', 1);
    this.$store.commit('changefloatingpictures', 0);
  }
};
</script>

<style lang="scss" scoped>
.gs_title {
  background: var(--theme-color);
}

.opeartbox {
  background: #f8fafd;
  border: 1px solid #e0e6ed;
  border-radius: 6px;
  padding: 16px 18px 10px 18px;
  // padding: 15px 20px 5px 30px;
  // background: #fff;
  width: 60%;

  .easttop li {
    margin-bottom: 15px;
  }

  .alignmentright {
    padding-bottom: 20px;

    .pre-code {
      background-color: #fff;
      color: #10c7de;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 4px;
      width: 80%;

      pre {
        min-height: 20px;
        word-break: break-all;
      }
    }

    .pre-blue {
      background-color: #fff;
      color: #10c7de;
      border: 1px solid #ccc;
      border-radius: 4px;
      padding: 10px;
      width: 80%;

      .text {
        min-height: 20px;
        word-break: break-all;
      }
    }

    .buttonright {
      float: right;
      margin-top: -11px;
      margin-right: -11px;
    }
  }
}

.tip_red {
  color: #3c8dbc;
  padding: 10px 0px;
  font-weight: bold;
  font-size: 15px;
}

.custom-domain-box {
  background: #f8fafd;
  border: 1px solid #e0e6ed;
  border-radius: 6px;
  padding: 16px 18px 10px 18px;
  // margin-bottom: 10px;
  width: 38%;
  margin-left: 2%;
  // margin-top: 6px;
}

.custom-domain-title {
  font-weight: bold;
  margin-bottom: 10px;
  color: #3c8dbc;
  font-size: 15px;
}

.custom-domain-table {
  width: 100%;
}

.custom-domain-row {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.custom-domain-header {
  font-weight: bold;
  color: #666;
  background: #f0f3f8;
  border-radius: 4px;
  padding: 4px 0;
}

.custom-domain-col {
  display: inline-block;
  padding-right: 10px;
}

.domain-name {
  width: 120px;
}

.domain-url {
  width: 320px;
}

.domain-action {
  width: 160px;
  display: flex;
}

.custom-domain-save {
  margin-top: 8px;
}
</style>
