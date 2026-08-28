<template>
  <nav class="tenant-global-nav">
    <template v-for="item in visibleItems">
      <div :key="item.key" class="tenant-global-nav__group">
        <button
          class="tenant-global-nav__item"
          :class="{ active: activeSection === item.key }"
          @click="handleParentClick(item)"
        >
          <tenant-icon :name="item.icon" />
          <span>{{ item.label }}</span>
          <tenant-icon v-if="item.expandable" class="tenant-global-nav__arrow" :class="{ 'is-open': openSection === item.key }" name="chevron" />
        </button>
        <div v-if="openSection === item.key && itemsFor(item.key).length" class="tenant-global-nav__children">
          <button
            v-for="subItem in itemsFor(item.key)"
            :key="subItem.path"
            :class="{ active: isSubActive(subItem) }"
            @click="$emit('navigate', subItem.path)"
          >
            <tenant-icon :name="subItem.icon" />
            <span>{{ subItem.label }}</span>
          </button>
        </div>
      </div>
    </template>
    <slot />
  </nav>
</template>

<script>
import TenantIcon from './TenantIcon';

export default {
  name: 'TenantGlobalNav',
  components: { TenantIcon },
  props: {
    activeSection: { type: String, default: '' },
    subItems: { type: Array, default: () => [] }
  },
  data() {
    return { openSection: this.activeSection };
  },
  watch: {
    activeSection(section) {
      this.openSection = section;
    }
  },
  computed: {
    defaultSectionItems() {
      const settlementType = Number(this.$store.state.settlementType);
      const isRestrictedAccount = settlementType === 3 || settlementType === 4;
      return {
        order: [
          { label: '订单管理', path: '/main/Ordermanagement', icon: 'order' }
        ],
        partition: [
          { label: '分区模板', path: '/main/partmodules', icon: 'template', menuId: 11 },
          { label: '安装分区', path: '/main/partinstalls', icon: 'install', menuId: 12 },
          { label: '分区管理', path: '/main/Zoningmanagement', icon: 'zone', menuId: 13 },
          { label: '分组管理', path: '/main/Groupmanagement', icon: 'group', menuId: 14 },
          { label: '手动补发', path: '/main/Orderreissue', icon: 'reissue', menuId: 15 },
          { label: '整区补发', path: '/main/BetchOrderreissue', icon: 'batch', menuId: 20 },
          { label: '补发记录', path: '/main/Replacementofrecords', icon: 'record', menuId: 16 },
          { label: '定时任务', path: '/main/orderInterval', icon: 'clock', menuId: 16 },
          { label: '转区点记录', path: '/main/transfer', icon: 'transfer', menuId: 21 },
          { label: '通讯秘钥', path: '/main/conectKey', icon: 'key', menuId: 17 },
          { label: '获取代码', path: '/main/gaincode', icon: 'code', menuId: 18 }
        ].filter(item => this.canShowSideMenu(item.menuId)),
        analysis: [
          { label: '充值统计', path: '/main/DA?tab=1', icon: 'chart', tab: '1' },
          { label: '时段统计', path: '/main/DA?tab=2', icon: 'clock', tab: '2' },
          { label: '分区统计', path: '/main/DA?tab=3', icon: 'partition', tab: '3' },
          { label: '分组统计', path: '/main/DA?tab=4', icon: 'group', tab: '4' },
          { label: '模版统计', path: '/main/DA?tab=7', icon: 'template', tab: '7' },
          { label: '充值排行', path: '/main/DA?tab=5', icon: 'order', tab: '5' },
          { label: '个人IPS统计', path: '/main/DA?tab=6', icon: 'account', tab: '6', restricted: true },
          { label: '全局IPS统计', path: '/main/DA?tab=8', icon: 'chart', tab: '8', restricted: true }
        ].filter(item => !item.restricted || !isRestrictedAccount),
        account: [
          { label: '用户信息', path: '/personal/baseInfo', icon: 'account' },
          { label: '三方开户', path: '/personal/sharedetails', icon: 'document' },
          { label: '电子户转账', path: '/personal/withdrawapply1', icon: 'transfer' },
          { label: '转账记录', path: '/personal/Withdrawal', icon: 'record' },
          { label: '结算比例', path: '/personal/rateList', icon: 'chart' },
          { label: '二级密码', path: '/personal/password', icon: 'key' },
          { label: '微信绑定', path: '/personal/weixin', icon: 'account' },
          { label: '结算记录', path: '/personal/recoder', icon: 'order' },
          { label: '账号安全', path: '/personal/acountsafe', icon: 'key' },
          { label: '提现记录', path: '/personal/Withdrawalrecords', icon: 'record' },
          { label: '用户日志', path: '/personal/Userlogs', icon: 'document' },
          { label: '礼品赠送', path: '/personal/Gift', icon: 'order' },
          { label: '微信动态密保', path: '/personal/wechat', icon: 'key' }
        ],
        behalf: [
          { label: '账户概览', path: '/behalf/baseInfo', icon: 'account' },
          { label: '版本管理', path: '/behalf/version', icon: 'template' },
          { label: '余额明细', path: '/behalf/detail', icon: 'record' },
          { label: '待审核订单', path: '/audit/audit', icon: 'clock' },
          { label: '已完成订单', path: '/audit/success', icon: 'record' },
          { label: '错误账号', path: '/audit/error', icon: 'account' },
          { label: '黑名单管理', path: '/audit/blacklist', icon: 'key' },
          { label: '每日统计', path: '/rollout/everyday', icon: 'chart' },
          { label: '分区统计', path: '/rollout/partition', icon: 'partition' },
          { label: '角色统计', path: '/rollout/role', icon: 'employee' },
          { label: '支付宝统计', path: '/rollout/alipay', icon: 'transfer' }
        ],
        agent: [
          { label: '网站设置', path: '/agentsystem/setting', icon: 'account' },
          { label: '下属商户', path: '/agentsystem/merchant', icon: 'agent' },
          { label: '代理订单', path: '/agentsystem/agentOrder', icon: 'order' },
          { label: '充值记录', path: '/agentsystem/deductedlog', icon: 'record' },
          { label: '用户分组', path: '/agentsystem/userGroup', icon: 'group' },
          { label: '数据统计', path: '/agentsystem/Statistics', icon: 'chart' },
          { label: '分区管理', path: '/agentsystem/agentManagement', icon: 'partition' }
        ],
        employee: [
          { label: '员工信息', path: '/employee/setting', icon: 'employee' },
          { label: '角色管理', path: '/employee/roles', icon: 'key' }
        ]
      };
    },
    visibleItems() {
      const settlementType = Number(this.$store.state.settlementType);
      const isRegularTenant = settlementType !== 3 && settlementType !== 4;
      return [
        { key: 'home', label: '首页', icon: 'home', path: '/main/home', visible: this.hasMenu(1) || settlementType !== 3 },
        { key: 'order', label: '订单管理', icon: 'order', path: '/main/Ordermanagement', expandable: true, visible: this.canShowTopMenu(2) },
        { key: 'partition', label: '分区管理', icon: 'partition', path: '/main/Zoningmanagement', expandable: true, visible: this.canShowTopMenu(3) },
        { key: 'analysis', label: '数据分析', icon: 'chart', path: '/main/DA', expandable: true, visible: this.hasMenu(4) || isRegularTenant },
        { key: 'account', label: '账户管理', icon: 'account', path: '/personal/baseInfo', expandable: true, visible: isRegularTenant },
        { key: 'behalf', label: '代付管理', icon: 'transfer', path: '/behalf', expandable: true, visible: this.$store.state.isEnabledPaid && isRegularTenant },
        { key: 'agent', label: '代理系统', icon: 'agent', path: '/agentsystem', expandable: true, visible: this.$store.state.userType && isRegularTenant },
        { key: 'employee', label: '员工管理', icon: 'employee', path: '/employee/setting', expandable: true, visible: isRegularTenant }
      ].filter(item => item.visible);
    }
  },
  methods: {
    handleParentClick(item) {
      if (item.expandable) {
        this.openSection = this.openSection === item.key ? '' : item.key;
        return;
      }
      this.$emit('navigate', item.path);
    },
    hasMenu(menuId) {
      const menuIds = (this.$store.state.roleInfo || '').split(',').map(id => Number(id));
      return menuIds.includes(menuId);
    },
    canShowTopMenu(menuId) {
      const settlementType = Number(this.$store.state.settlementType);
      return settlementType === 3 || settlementType === 4 ? this.hasMenu(menuId) : true;
    },
    canShowSideMenu(menuId) {
      const settlementType = Number(this.$store.state.settlementType);
      if (settlementType === 4) {
        return menuId === 13 ? this.hasMenu(3) : (menuId === 15 && this.hasMenu(15));
      }
      return settlementType === 3 ? this.hasMenu(menuId) : true;
    },
    itemsFor(section) {
      if (section === this.activeSection && this.subItems.length) return this.subItems;
      return this.defaultSectionItems[section] || [];
    },
    isSubActive(item) {
      const path = this.$route.path;
      if (item.tab) {
        return path === '/main/DA' && String(this.$route.query.tab || '1') === item.tab;
      }
      return path === item.path || (item.matchPrefix && path.indexOf(item.matchPrefix) === 0);
    }
  }
};
</script>

<style lang="scss" scoped>
.tenant-global-nav {
  flex: 1;
  min-height: 0;
  padding: 18px 10px;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(255,255,255,.15) transparent;
}
.tenant-global-nav__item,
.tenant-global-nav__children button {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  border: 0;
  border-radius: 10px;
  color: #aebed4;
  background: transparent;
  font: inherit;
  cursor: pointer;
}
.tenant-global-nav__item {
  height: 46px;
  padding: 0 14px;
  margin-bottom: 6px;
  font-size: 14px;
}
.tenant-global-nav__item > span,
.tenant-global-nav__children button > span { flex: 1; text-align: left; }
.tenant-global-nav__item:hover,
.tenant-global-nav__children button:hover { color: #fff; background: rgba(255,255,255,.07); }
.tenant-global-nav__item.active {
  color: #fff;
  background: linear-gradient(100deg,#4266f5 0%,#5a71fb 58%,#705bea 100%);
  box-shadow: 0 10px 24px rgba(55,83,220,.28), inset 0 1px rgba(255,255,255,.13);
}
.tenant-global-nav__item .tenant-icon { width: 19px; height: 19px; }
.tenant-global-nav__arrow { width: 14px !important; height: 14px !important; }
.tenant-global-nav__arrow.is-open { transform: rotate(180deg); }
.tenant-global-nav__children { margin: 1px 0 10px 25px; padding: 2px 0 2px 10px; border-left: 1px solid rgba(144,169,205,.2); }
.tenant-global-nav__children button { min-height: 38px; padding: 7px 10px; margin-bottom: 2px; font-size: 13px; }
.tenant-global-nav__children button .tenant-icon { width: 16px; height: 16px; }
.tenant-global-nav__children button.active { color: #9edcff; background: linear-gradient(90deg,rgba(79,107,255,.18),rgba(79,107,255,.05)); }
</style>
