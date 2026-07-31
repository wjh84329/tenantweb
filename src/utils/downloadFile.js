import axios from 'axios';
import mgrs from '../assets/js/securityapi';

export function appendQuery(url, key, value) {
  if (!url) {
    return '';
  }
  const separator = url.indexOf('?') === -1 ? '?' : '&';
  return url + separator + encodeURIComponent(key) + '=' + encodeURIComponent(value);
}

export function normalizeDownloadUrl(url, preferredBaseUrl = '') {
  if (!url || typeof window === 'undefined') {
    return url || '';
  }

  try {
    const parsed = new URL(url, window.location.href);
    if (preferredBaseUrl) {
      const preferredBase = new URL(preferredBaseUrl, window.location.href);
      parsed.protocol = preferredBase.protocol;
      parsed.host = preferredBase.host;
      return parsed.toString();
    }

    if (parsed.protocol === 'http:') {
      if (window.location.protocol === 'https:') {
        parsed.protocol = 'https:';
      }
    }
    return parsed.toString();
  } catch (e) {
    return window.location.protocol === 'https:' ? url.replace(/^http:\/\//i, 'https://') : url;
  }
}

function getHeader(headers, name) {
  if (!headers) {
    return '';
  }
  const lowerName = name.toLowerCase();
  for (const key in headers) {
    if (Object.prototype.hasOwnProperty.call(headers, key) && key.toLowerCase() === lowerName) {
      return headers[key];
    }
  }
  return '';
}

export function parseDownloadMetadata(headers) {
  const contentDisposition = getHeader(headers, 'content-disposition');
  const contentLength = Number(getHeader(headers, 'content-length')) || 0;
  const fileName = getDownloadFileName(contentDisposition, safeDecode(getHeader(headers, 'x-download-file-name')) || '');
  return {
    fileName,
    total: contentLength
  };
}

function safeDecode(value) {
  if (!value) {
    return '';
  }
  try {
    return decodeURIComponent(value);
  } catch (e) {
    return value;
  }
}

export function getDownloadFileName(disposition, fallbackName) {
  if (!disposition) {
    return fallbackName || 'download';
  }

  const utf8Match = disposition.match(/filename\*=UTF-8''([^;]+)/i);
  if (utf8Match && utf8Match[1]) {
    return safeDecode(utf8Match[1].replace(/^"|"$/g, '')) || fallbackName || 'download';
  }

  const fileNameMatch = disposition.match(/filename="?([^";]+)"?/i);
  if (fileNameMatch && fileNameMatch[1]) {
    return safeDecode(fileNameMatch[1].trim()) || fallbackName || 'download';
  }

  return fallbackName || 'download';
}

function isGenericDownloadName(fileName) {
  if (!fileName) {
    return true;
  }
  return /^download(?:\.[a-z0-9]+)?$/i.test(String(fileName).trim());
}

export function fallbackDownload(url) {
  url = normalizeDownloadUrl(url);
  const iframe = document.querySelector('iframe[name="downloadIframe"]');
  if (iframe) {
    iframe.src = url;
    return;
  }
  window.location.href = url;
}

export function saveBlobResponse(response, fallbackName) {
  const contentType = getHeader(response.headers, 'content-type') || 'application/octet-stream';
  const resolvedName = getDownloadFileName(getHeader(response.headers, 'content-disposition'), fallbackName);
  const fileName = isGenericDownloadName(resolvedName) ? (fallbackName || 'download') : resolvedName;
  const blob = new Blob([response.data], { type: contentType });

  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob, fileName);
    return;
  }

  const objectUrl = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.style.display = 'none';
  link.href = objectUrl;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  window.setTimeout(() => {
    window.URL.revokeObjectURL(objectUrl);
  }, 1000);
}

export async function probeDownloadFile(url, options = {}) {
  if (!url) {
    return { fileName: options.fallbackName || '', total: 0 };
  }

  url = normalizeDownloadUrl(url);

  let header = await mgrs();
  const response = await axios({
    method: 'head',
    url: url,
    timeout: 30000,
    headers: header ? { Authorization: 'Bearer ' + header } : {}
  });

  const meta = parseDownloadMetadata(response.headers);
  return {
    fileName: isGenericDownloadName(meta.fileName) ? (options.fallbackName || '') : (meta.fileName || options.fallbackName || ''),
    total: meta.total || 0
  };
}

export async function downloadFile(url, fallbackName, options = {}) {
  if (!url) {
    return false;
  }

  url = normalizeDownloadUrl(url);

  const canUseMsSave = window.navigator && window.navigator.msSaveOrOpenBlob;
  const canUseObjectUrl = window.URL && window.URL.createObjectURL && 'download' in document.createElement('a');
  if (!canUseMsSave && !canUseObjectUrl) {
    fallbackDownload(url);
    return false;
  }

  try {
    let header = await mgrs();
    const response = await axios({
      method: 'get',
      url: url,
      responseType: 'blob',
      timeout: 100000,
      onDownloadProgress: progressEvent => {
        if (options && typeof options.onProgress === 'function') {
          const loaded = progressEvent && typeof progressEvent.loaded === 'number' ? progressEvent.loaded : 0;
          const total = progressEvent && typeof progressEvent.total === 'number' ? progressEvent.total : 0;
          options.onProgress({
            loaded,
            total,
            percentage: total > 0 ? Math.min(100, Math.round((loaded / total) * 100)) : 0
          });
        }
      },
      headers: header ? { Authorization: 'Bearer ' + header } : {}
    });
    saveBlobResponse(response, fallbackName);
    return true;
  } catch (err) {
    if (err && err.response) {
      throw err;
    }
    fallbackDownload(url);
    return false;
  }
}
