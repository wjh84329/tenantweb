<template>
  <svg class="tenant-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path v-for="(path, index) in paths" :key="index" :d="path" />
  </svg>
</template>

<script>
const icons = {
  home: ['M3 10.5 12 3l9 7.5', 'M5 9.5V21h14V9.5', 'M9 21v-7h6v7'],
  order: ['M6 3h12v18H6z', 'M9 7h6', 'M9 11h6', 'M9 15h4'],
  partition: ['M4 5.5 12 2l8 3.5-8 3.5-8-3.5Z', 'M4 10.5 12 14l8-3.5', 'M4 15.5 12 19l8-3.5'],
  chart: ['M4 20V10', 'M10 20V4', 'M16 20v-7', 'M22 20H2'],
  account: ['M4 21V7h16v14', 'M8 7a4 4 0 1 1 8 0', 'M8 14h8', 'M8 18h5'],
  agent: ['M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z', 'M4 21a8 8 0 0 1 16 0'],
  employee: ['M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z', 'M2 21a6 6 0 0 1 12 0', 'M17 11v8', 'M13 15h8'],
  template: ['M5 3h14v18H5z', 'M8 7h8', 'M8 11h8', 'M8 15h5'],
  install: ['m14 4 6 6-3 3-6-6 3-3Z', 'm11 7-7 7a3 3 0 0 0 4 4l7-7'],
  zone: ['M4 4h7v7H4z', 'M13 4h7v7h-7z', 'M4 13h7v7H4z', 'M13 13h7v7h-7z'],
  group: ['M8 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z', 'M16 11a2.5 2.5 0 1 0 0-5', 'M2 20a6 6 0 0 1 12 0', 'M14 15a5 5 0 0 1 8 4'],
  reissue: ['M12 5V2L8 6l4 4V7a6 6 0 1 1-5.7 8', 'M5 12v5h5'],
  batch: ['M3 7h13v13H3z', 'M8 3h13v13', 'M6 12h7', 'M9.5 8.5v7'],
  record: ['M5 3h14v18H5z', 'M8 8h8', 'M8 12h8', 'M8 16h5'],
  clock: ['M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z', 'M12 7v5l3 2'],
  transfer: ['M4 8h13', 'm14 5 3 3-3 3', 'M20 16H7', 'm10-3-3 3 3 3'],
  key: ['M15 8a5 5 0 1 0-4.5 7.2L13 18h3v3h3v-3h2v-3l-3.2-3.2A5 5 0 0 0 15 8Z'],
  code: ['m8 8-4 4 4 4', 'm8 8 4 4-4 4', 'm14 5-4 14'],
  download: ['M12 3v12', 'm7 10 5 5 5-5', 'M5 21h14'],
  document: ['M6 3h8l4 4v14H6z', 'M14 3v5h5', 'M9 12h6', 'M9 16h6'],
  logout: ['M10 4H4v16h6', 'M14 8l4 4-4 4', 'M8 12h10'],
  search: ['M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z', 'm17 17 4 4'],
  bell: ['M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9', 'M10 21h4'],
  help: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z', 'M9.5 9a2.5 2.5 0 1 1 3.2 2.4c-.7.3-.7 1.1-.7 1.6', 'M12 17h.01'],
  chevron: ['m8 10 4 4 4-4'],
  menu: ['M4 7h16', 'M4 12h16', 'M4 17h16'],
  wallet: ['M4 7h16v13H4z', 'M6 7V5h11v2', 'M15 12h5v5h-5a2.5 2.5 0 0 1 0-5Z', 'M17.5 14.5h.01'],
  cash: ['M4 6h16v12H4z', 'M8 10.5h8', 'M8 13.5h8', 'M12 9v6'],
  arrowDown: ['M12 3v15', 'm6 12 6 6 6-6', 'M5 21h14'],
  send: ['M3 11.5 21 3l-6.5 18-3.6-6.4L3 11.5Z', 'm10.9 3.1 4.6-4.4']
};

export default {
  name: 'TenantIcon',
  props: {
    name: { type: String, required: true }
  },
  computed: {
    paths() {
      return icons[this.name] || icons.document;
    }
  }
};
</script>

<style scoped>
.tenant-icon {
  width: 20px;
  height: 20px;
  flex: 0 0 auto;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}
</style>
