/** 二维码模版 TemplateKind：0=微信密保，1=扫码充值 */
export const WXMB_QR_TEMPLATE_KIND = 0;
export const SCAN_QR_TEMPLATE_KIND = 1;

export function qrcodeTemplateKindOf(item) {
  if (!item) return SCAN_QR_TEMPLATE_KIND;
  const k = item.templateKind !== undefined && item.templateKind !== null
    ? item.templateKind
    : item.TemplateKind;
  if (k === undefined || k === null) return SCAN_QR_TEMPLATE_KIND;
  return Number(k);
}

export function isScanQrcodeTemplate(item) {
  return qrcodeTemplateKindOf(item) === SCAN_QR_TEMPLATE_KIND;
}

export function isWxmbQrcodeTemplate(item) {
  return qrcodeTemplateKindOf(item) === WXMB_QR_TEMPLATE_KIND;
}

export function filterScanQrcodeTemplates(list) {
  return (list || []).filter(isScanQrcodeTemplate);
}

export function filterWxmbQrcodeTemplates(list) {
  return (list || []).filter(isWxmbQrcodeTemplate);
}

export function qrcodeTemplateKindLabel(kind) {
  return Number(kind) === WXMB_QR_TEMPLATE_KIND ? '微信密保' : '扫码充值';
}

export function defaultScanQrcodeForm() {
  return {
    title: '',
    templateKind: SCAN_QR_TEMPLATE_KIND,
    useStaticQrImage: false,
    resourceCode: '',
    imageCode: '',
    serial: 3,
    xOffset: '0',
    yOffset: '0'
  };
}

export function defaultWxmbQrcodeForm() {
  return {
    title: '',
    templateKind: WXMB_QR_TEMPLATE_KIND,
    useStaticQrImage: false,
    resourceCode: '',
    imageCode: '',
    serial: 3,
    xOffset: '0',
    yOffset: '0'
  };
}
