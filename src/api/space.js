import api from '../assets/js/apiRequestHandler';
import mgr from '../assets/js/securityapi';

async function request(config) {
  const header = await mgr();
  config.headers = { Authorization: 'Bearer ' + header };
  return api(config);
}

export default {
  status() { return request({ url: '/api/Space/Status', method: 'get' }); },
  open(data) { return request({ url: '/api/Space/Open', method: 'post', data }); },
  rename(id, name) { return request({ url: '/api/Space/Space/' + id + '/Rename', method: 'post', data: { name } }); },
  changeHostPrefix(id, hostPrefix) { return request({ url: '/api/Space/Space/' + id + '/HostPrefix', method: 'post', data: { hostPrefix } }); },
  remove(id) { return request({ url: '/api/Space/Space/' + id + '/Delete', method: 'post' }); },
  accessToken(id) { return request({ url: '/api/Space/Space/' + id + '/AccessToken', method: 'post' }); },
  addDomain(id, domain) { return request({ url: '/api/Space/Space/' + id + '/Domain', method: 'post', data: { domain } }); },
  verifyDomain(id) { return request({ url: '/api/Space/Domain/' + id + '/Verify', method: 'post' }); },
  removeDomain(id) { return request({ url: '/api/Space/Domain/' + id + '/Delete', method: 'post' }); },
  redeem(data) { return request({ url: '/api/Space/Redeem', method: 'post', data }); }
};
