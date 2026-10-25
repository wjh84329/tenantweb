import api from '../assets/js/apiRequestHandler';
import mgr from '../assets/js/securityapi';

async function request(config) {
  const header = await mgr();
  config.headers = { Authorization: 'Bearer ' + header };
  return api(config);
}

export default {
  status() { return request({ url: '/api/Space/Status', method: 'get' }); },
  open() { return request({ url: '/api/Space/Open', method: 'post' }); },
  uploadToken() { return request({ url: '/api/Space/UploadToken', method: 'post' }); }
};
